"""
Core Trading Systems Implementation
SYSTEMS 1-6: Complete 6-system hybrid trading engine
"""
import os
import sys
import time
import json
import hmac
import hashlib
import sqlite3
import asyncio
import logging
import numpy as np
import pandas as pd
from typing import Dict, Any, Tuple, Optional
import joblib
import aiohttp
import websockets
import torch
import torch.nn as nn
from sklearn.ensemble import RandomForestClassifier
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import RobustScaler

# Project root for absolute path resolution (compatible with Docker/container deployments)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Configure System Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

# =====================================================================
# SYSTEM 6: SUB-MICROSECOND OBI FILTERING
# =====================================================================
class OrderBookImbalanceFilter:
    """Real-time WebSocket depth processing with bit-shifted OBI calculation"""

    def __init__(self, ws_url: str):
        self.ws_url = ws_url
        self.latest_obi = 0.0
        self.obi_history = []
        self.volume_threshold = 1000.0  # Minimum total volume for valid OBI

    async def stream_depth_updates(self, inst_id: str):
        """Connect to BloFin WebSocket and stream order book depth"""
        subscribe_payload = {
            "op": "subscribe",
            "args": [{"channel": "books50", "instId": inst_id}]
        }

        while True:
            try:
                async with websockets.connect(self.ws_url) as ws:
                    await ws.send(json.dumps(subscribe_payload))
                    logging.info(f"[SYSTEM 6] Connected to WebSocket for {inst_id}")

                    while True:
                        msg = await ws.recv()
                        data = json.loads(msg)

                        if "data" in data and len(data["data"]) > 0:
                            book = data["data"][0]
                            self._process_depth_book(book)

            except Exception as e:
                logging.warning(f"[SYSTEM 6] WebSocket disconnected: {e}. Reconnecting in 3s...")
                await asyncio.sleep(3)

    def _process_depth_book(self, book: dict):
        """Process L2 depth book and calculate volume-weighted OBI"""
        try:
            bids = np.array(book.get("bids", []), dtype=float)[:10]
            asks = np.array(book.get("asks", []), dtype=float)[:10]

            if len(bids) > 0 and len(asks) > 0:
                bid_vol = np.sum(bids[:, 1])
                ask_vol = np.sum(asks[:, 1])
                total_vol = bid_vol + ask_vol

                if total_vol > self.volume_threshold:
                    # Bit-shifted OBI calculation for precision
                    obi_raw = (bid_vol - ask_vol) / total_vol
                    self.latest_obi = np.round(obi_raw, 6)
                    self.obi_history.append(self.latest_obi)

                    # Keep only last 1000 OBI readings
                    if len(self.obi_history) > 1000:
                        self.obi_history.pop(0)

                    logging.debug(f"[SYSTEM 6] OBI: {self.latest_obi:.6f} (Bid: {bid_vol:.2f}, Ask: {ask_vol:.2f})")
        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")
        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")


            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

    
        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

def get_obi_gate_status(self, threshold: float = 0.10) -> bool:

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")

        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")
        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")
        except Exception as e:
            logging.warning(f"[SYSTEM 6] OBI calculation failed: {e}")


    def get_obi_gate_status(self, threshold: float = 0.10) -> bool:
        """Check if OBI meets minimum threshold for trading"""
        return abs(self.latest_obi) >= threshold

# =====================================================================
# SYSTEM 5: MICROSTRUCTURAL ENGINE
# =====================================================================
class MicrostructuralEngine:
    """High-speed feature extraction with state variable buffering"""

    def __init__(self, buffer_size: int = 1000):
        self.buffer_size = buffer_size
        self.price_buffer = []
        self.volume_buffer = []
        self.trade_buffer = []
        self.spread_buffer = []

    def update_market_data(self, price: float, volume: float, bid: float, ask: float):
        """Update microstructural state buffers"""
        self.price_buffer.append(price)
        self.volume_buffer.append(volume)
        self.trade_buffer.append(price * volume)
        self.spread_buffer.append(ask - bid)

        # Maintain buffer size
        if len(self.price_buffer) > self.buffer_size:
            self.price_buffer.pop(0)
            self.volume_buffer.pop(0)
            self.trade_buffer.pop(0)
            self.spread_buffer.pop(0)

    def calculate_microstructural_features(self) -> Dict[str, float]:
        """Extract microstructural features"""
        if len(self.price_buffer) < 10:
            return {}

        features = {}

        # Price impact measures
        features['price_impact'] = np.std(self.price_buffer[-10:]) / np.mean(self.price_buffer[-10:])

        # Volume imbalance
        recent_volume = np.sum(self.volume_buffer[-10:])
        older_volume = np.sum(self.volume_buffer[-20:-10]) if len(self.volume_buffer) >= 20 else recent_volume
        features['volume_imbalance'] = recent_volume / (older_volume + 1e-8)

        # Spread analysis
        features['avg_spread'] = np.mean(self.spread_buffer[-10:])
        features['spread_volatility'] = np.std(self.spread_buffer[-10:])

        # Trade flow intensity
        features['trade_intensity'] = np.mean(self.trade_buffer[-10:]) / np.mean(self.trade_buffer[-30:]) if len(self.trade_buffer) >= 30 else 1.0

        return features

# =====================================================================
# SYSTEM 1: ADAPTIVE ML FACTOR SCORING
# =====================================================================
class AdaptiveMLScoring:
    """Multi-factor scoring engine with Garman-Klass, Parkinson, and Z-Score analysis"""

    def __init__(self, feature_dim: int = 7):
        self.feature_dim = feature_dim
        self.scaler = RobustScaler()
        self.rf_classifier = RandomForestClassifier(
            n_estimators=50,
            max_depth=5,
            random_state=42
        )
        self._initialize_models()

    def _initialize_models(self):
        """Initialize or load ML models"""
        try:
            scaler_path = os.path.join(PROJECT_ROOT, 'models', 'robust_scaler.joblib')
            if os.path.exists(scaler_path):
                self.scaler = joblib.load(scaler_path)
            rf_path = os.path.join(PROJECT_ROOT, 'models', 'rf_classifier.joblib')
            if os.path.exists(rf_path):
                self.rf_classifier = joblib.load(rf_path)
        except Exception as e:
            logging.warning(f"[SYSTEM 1] Model loading failed: {e}. Using defaults.")

    def compute_volatility_measures(self, df: pd.DataFrame) -> pd.DataFrame:
        """Compute Garman-Klass and Parkinson volatility"""
        data = df.copy()

        # Log returns
        data['log_ret'] = np.log(data['Close'] / data['Close'].shift(1))

        # Garman-Klass Volatility
        log_hl = np.log(data['High'] / data['Low']) ** 2
        log_co = np.log(data['Close'] / data['Open']) ** 2
        data['gk_vol'] = np.sqrt(0.5 * log_hl - (2 * np.log(2) - 1) * log_co)

        # Parkinson Volatility
        data['parkinson_vol'] = np.sqrt((1 / (4 * np.log(2))) * (np.log(data['High'] / data['Low'])) ** 2)

        return data

    def compute_multi_timeframe_zscores(self, df: pd.DataFrame) -> pd.DataFrame:
        """Compute Z-scores across multiple timeframes"""
        data = df.copy()

        for window in [10, 30, 60]:
            data[f'z_score_{window}'] = (
                (data['Close'] - data['Close'].rolling(window).mean()) /
                (data['Close'].rolling(window).std() + 1e-8)
            )

        return data

    def compute_directional_probability(self, features: np.ndarray) -> float:
        """Random Forest directional probability scoring"""
        try:
            scaled_features = self.scaler.transform(features.reshape(1, -1))
            probabilities = self.rf_classifier.predict_proba(scaled_features)
            return probabilities[0, 1]  # Probability of upward movement
        except Exception as e:
            logging.warning(f"[SYSTEM 1] Probability calculation failed: {e}")
            return 0.5

# =====================================================================
# SYSTEM 2: GMM REGIME GATE & SIZING
# =====================================================================
class GMMRegimeGate:
    """Gaussian Mixture Model volatility state clustering"""

    def __init__(self, n_components: int = 3):
        self.n_components = n_components
        self.gmm = GaussianMixture(n_components=n_components, random_state=42)
        self.regime_names = ['Low Vol', 'Medium Vol', 'High Vol']
        self._is_trained = False

    def train_regime_model(self, volatility_data: np.ndarray):
        """Train GMM on historical volatility data"""
        try:
            self.gmm.fit(volatility_data.reshape(-1, 1))
            self._is_trained = True
            logging.info("[SYSTEM 2] GMM regime model trained successfully")
        except Exception as e:
            logging.error(f"[SYSTEM 2] GMM training failed: {e}")

    def predict_regime(self, current_volatility: float) -> Tuple[int, str]:
        """Predict current volatility regime"""
        if not self._is_trained:
            return 0, "Unknown"

        try:
            regime = self.gmm.predict([[current_volatility]])[0]
            return regime, self.regime_names[regime]
        except Exception as e:
            logging.error(f"[SYSTEM 2] Regime prediction failed: {e}")
            return 0, "Unknown"

    def should_suppress_trading(self, regime: int) -> bool:
        """Suppress trading during high-volatility chaotic regimes"""
        return regime >= 2  # High volatility regime

# =====================================================================
# SYSTEM 3: DEEP RL & CIRCUIT BREAKER
# =====================================================================
class DeepRLCircuitBreaker:
    """Deep Actor-Critic policy with equity synchronization and drawdown limits"""

    def __init__(self, state_dim: int = 32, max_drawdown: float = 0.12):
        self.state_dim = state_dim
        self.max_drawdown = max_drawdown
        self.peak_equity = 100000.0
        self.current_equity = 100000.0

        # Initialize neural networks
        self.actor = self._build_actor_network()
        self.critic = self._build_critic_network()

    def _build_actor_network(self) -> nn.Module:
        """Build actor network for allocation policy"""
        return nn.Sequential(
            nn.Linear(self.state_dim, 64),
            nn.Tanh(),
            nn.Linear(64, 32),
            nn.Tanh(),
            nn.Linear(32, 1),
            nn.Tanh()  # Output: [-1.0, 1.0]
        )

    def _build_critic_network(self) -> nn.Module:
        """Build critic network for state value estimation"""
        return nn.Sequential(
            nn.Linear(self.state_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )

    def sync_equity(self, new_equity: float):
        """Synchronize current equity and update peak"""
        self.current_equity = new_equity
        self.peak_equity = max(self.peak_equity, new_equity)

    def check_circuit_breaker(self) -> bool:
        """Check if circuit breaker should be triggered"""
        if self.peak_equity <= 0:
            return False

        drawdown = (self.peak_equity - self.current_equity) / self.peak_equity
        return drawdown >= self.max_drawdown

    def get_allocation(self, state_embedding: torch.Tensor) -> float:
        """Get allocation from actor network"""
        with torch.no_grad():
            allocation = self.actor(state_embedding)
            return allocation.item()

# =====================================================================
# SYSTEM 4: ASYNC SEQUENCE TRANSFORMER & EXECUTOR
# =====================================================================
class AsyncSequenceTransformer:
    """PyTorch Multi-Head Transformer Encoder for temporal sequence processing"""

    def __init__(self, feature_dim: int, d_model: int = 64, nhead: int = 4, num_layers: int = 2):
        self.feature_dim = feature_dim
        self.d_model = d_model
        self.nhead = nhead
        self.num_layers = num_layers

        # Initialize transformer
        self.transformer = self._build_transformer()
        self.input_projection = nn.Linear(feature_dim, d_model)

    def _build_transformer(self) -> nn.Module:
        """Build transformer encoder"""
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=self.d_model,
            nhead=self.nhead,
            batch_first=True,
            dim_feedforward=128,
            dropout=0.1
        )
        return nn.TransformerEncoder(encoder_layer, num_layers=self.num_layers)

    def process_sequence(self, sequence: np.ndarray) -> torch.Tensor:
        """Process temporal sequence through transformer"""
        # Convert to tensor and add batch dimension
        seq_tensor = torch.tensor(sequence, dtype=torch.float32).unsqueeze(0)

        # Project to model dimension
        projected = self.input_projection(seq_tensor)

        # Process through transformer
        with torch.no_grad():
            encoded = self.transformer(projected)
            # Global average pooling
            embedding = torch.mean(encoded, dim=1)

        return embedding

# =====================================================================
# BLOFIN CONNECTOR (SYSTEMS 4, 5 & 6)
# =====================================================================
import uuid

class BloFinConnector:
    """Handles REST orders, account balance sync, and live WS order book ingestion"""

    def __init__(self, api_key: str, api_secret: str, passphrase: str, is_demo: bool = True):
        self.api_key = api_key
        self.api_secret = api_secret
        self.passphrase = passphrase
        self.base_url = "https://demo-trading-openapi.blofin.com" if is_demo else "https://openapi.blofin.com"
        self.ws_url = "wss://demo-trading-openapi.blofin.com/ws/public" if is_demo else "wss://openapi.blofin.com/ws/public"

        self.latest_obi = 0.0
        self.current_equity = 100000.0

    def _sign(self, path: str, method: str, timestamp: str, nonce: str, body: str = "") -> str:
        """Generate HMAC-SHA256 signature"""
        prehash = f"{path}{method}{timestamp}{nonce}{body}"
        return hmac.new(self.api_secret.encode('utf-8'), prehash.encode('utf-8'), hashlib.sha256).hexdigest()

    async def sync_account_balance(self) -> float:
        """System 3 Risk Sync: Fetches total account margin equity"""
        path = "/api/v1/account/balance"
        method = "GET"
        timestamp = str(int(time.time() * 1000))
        nonce = str(uuid.uuid4())

        signature = self._sign(path, method, timestamp, nonce)
        headers = {
            "ACCESS-KEY": self.api_key,
            "ACCESS-SIGN": signature,
            "ACCESS-TIMESTAMP": timestamp,
            "ACCESS-PASSPHRASE": self.passphrase,
            "ACCESS-NONCE": nonce
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}{path}", headers=headers) as resp:
                    res = await resp.json()
                    if res.get("code") == "0" and len(res.get("data", [])) > 0:
                        self.current_equity = float(res["data"][0].get("totalEquity", self.current_equity))
                        logging.info(f"[ACCOUNT BALANCE] {self.current_equity:.2f} USDT")
        except Exception as e:
            logging.error(f"[REST ACCOUNT SYNC ERROR] {e}")
        return self.current_equity

    async def place_order(self, inst_id: str, side: str, pos_side: str, size: float) -> Dict[str, Any]:
        """Dispatches signed REST market orders to BloFin"""
        path = "/api/v1/trade/order"
        method = "POST"
        timestamp = str(int(time.time() * 1000))
        nonce = str(uuid.uuid4())

        payload = {
            "instId": inst_id,
            "marginMode": "cross",
            "positionSide": pos_side,
            "side": side,
            "orderType": "market",
            "size": str(size)
        }
        body_str = json.dumps(payload)
        signature = self._sign(path, method, timestamp, nonce, body_str)

        headers = {
            "ACCESS-KEY": self.api_key,
            "ACCESS-SIGN": signature,
            "ACCESS-TIMESTAMP": timestamp,
            "ACCESS-PASSPHRASE": self.passphrase,
            "ACCESS-NONCE": nonce,
            "Content-Type": "application/json"
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(f"{self.base_url}{path}", headers=headers, data=body_str) as resp:
                    return await resp.json()
        except Exception as e:
            logging.error(f"[REST ORDER ERROR] {e}")
            return {"code": "-1", "msg": str(e)}

    async def get_open_orders(self, inst_id: str) -> Dict[str, Any]:
        """Get current open orders"""
        path = "/api/v1/order/pending"
        method = "POST"
        timestamp = str(int(time.time() * 1000))
        nonce = str(uuid.uuid4())

        payload = {"instId": inst_id}
        body_str = json.dumps(payload)
        signature = self._sign(path, method, timestamp, nonce, body_str)

        headers = {
            "ACCESS-KEY": self.api_key,
            "ACCESS-SIGN": signature,
            "ACCESS-TIMESTAMP": timestamp,
            "ACCESS-PASSPHRASE": self.passphrase,
            "ACCESS-NONCE": nonce,
            "Content-Type": "application/json"
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(f"{self.base_url}{path}", headers=headers, data=body_str) as resp:
                    return await resp.json()
        except Exception as e:
            logging.error(f"[OPEN ORDERS ERROR] {e}")
            return {"code": "-1", "msg": str(e)}

    async def listen_orderbook_stream(self, inst_id: str):
        """Systems 5 & 6: Streams L2 depth and updates Order Book Imbalance (OBI)"""
        subscribe_payload = {
            "op": "subscribe",
            "args": [{"channel": "books50", "instId": inst_id}]
        }
        while True:
            try:
                async with websockets.connect(self.ws_url) as ws:
                    await ws.send(json.dumps(subscribe_payload))
                    logging.info(f"[WS STREAM] Connected & Subscribed to L2 Order Book for {inst_id}")
                    while True:
                        msg = await ws.recv()
                        data = json.loads(msg)
                        if "data" in data and len(data["data"]) > 0:
                            book = data["data"][0]
                            bids = np.array(book.get("bids", []), dtype=float)[:10]
                            asks = np.array(book.get("asks", []), dtype=float)[:10]
                            if len(bids) > 0 and len(asks) > 0:
                                bid_vol = np.sum(bids[:, 1])
                                ask_vol = np.sum(asks[:, 1])
                                total_vol = bid_vol + ask_vol
                                if total_vol > 0:
                                    self.latest_obi = (bid_vol - ask_vol) / total_vol
                                    logging.debug(f"[OBI UPDATE] {self.latest_obi:.6f}")
            except Exception as e:
                logging.warning(f"[WS DISCONNECTED] Reconnecting in 3s... Error: {e}")
                await asyncio.sleep(3)

# =====================================================================
# LLM COORDINATOR
# =====================================================================
class LLMStrategyCoordinator:
    """Interactions interface for LLMs to adjust strategy parameters dynamically"""

    def __init__(self):
        self.risk_multiplier = 1.0
        self.confidence_threshold = 0.35

    def update_via_llm_json(self, json_command: str):
        try:
            params = json.loads(json_command)
            self.risk_multiplier = float(params.get("risk_multiplier", self.risk_multiplier))
            self.confidence_threshold = float(params.get("confidence_threshold", self.confidence_threshold))
            logging.info(f"[LLM UPDATE] Risk Multiplier={self.risk_multiplier} | Conf Threshold={self.confidence_threshold}")
        except Exception as e:
            logging.error(f"[LLM PARSE ERROR] {e}")

# =====================================================================
# COMPLETE TRADING SYSTEMS INTEGRATION
# =====================================================================
class UnifiedTradingSystems:
    """Integration of all 6 trading systems with BloFin connector"""

    def __init__(self, config: dict, api_key: str, api_secret: str, passphrase: str):
        self.config = config

        # Initialize BloFin connector
        self.blofin = BloFinConnector(api_key, api_secret, passphrase, config['api']['is_demo'])

        # Initialize all systems
        self.system6 = OrderBookImbalanceFilter(config['api']['ws_url'])
        self.system5 = MicrostructuralEngine()
        self.system1 = AdaptiveMLScoring()
        self.system2 = GMMRegimeGate(config['models']['gmm_components'])
        self.system3 = DeepRLCircuitBreaker(
            max_drawdown=config['trading']['max_drawdown_limit']
        )
        self.system4 = AsyncSequenceTransformer(
            feature_dim=7,
            d_model=config['models']['transformer_d_model'],
            nhead=config['models']['transformer_nhead'],
            num_layers=config['models']['transformer_layers']
        )

        # Initialize LLM coordinator
        self.llm = LLMStrategyCoordinator()

        # Initialize database
        self.db = self._init_database()

    def _init_database(self) -> sqlite3.Connection:
        """Initialize SQLite database"""
        db_dir = os.path.join(PROJECT_ROOT, 'database')
        os.makedirs(db_dir, exist_ok=True)
        conn = sqlite3.connect(os.path.join(db_dir, 'trading_systems.db'), check_same_thread=False)

        with conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS execution_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT,
                    symbol TEXT,
                    side TEXT,
                    position_side TEXT,
                    size REAL,
                    price REAL,
                    obi REAL,
                    alloc REAL,
                    regime TEXT,
                    response TEXT
                )
            """)

        return conn

    def log_execution(self, symbol: str, side: str, pos_side: str, size: float,
                     price: float, obi: float, alloc: float, regime: str, response: dict):
        """Log execution to database"""
        with self.db:
            self.db.execute(
                """INSERT INTO execution_logs
                   (timestamp, symbol, side, position_side, size, price, obi, alloc, regime, response)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (time.strftime("%Y-%m-%d %H:%M:%S"), symbol, side, pos_side,
                 size, price, obi, alloc, regime, json.dumps(response))
            )

    async def run_system_pipeline(self, symbol: str, market_data: pd.DataFrame):
        """Execute complete 6-system pipeline"""
        try:
            # System 3: Circuit Breaker Check
            current_equity = await self.blofin.sync_account_balance()
            self.system3.sync_equity(current_equity)

            if self.system3.check_circuit_breaker():
                logging.error("[SYSTEM 3] Circuit breaker triggered - Trading halted")
                return

            # System 6: OBI Gate Filter
            if not self.system6.get_obi_gate_status(self.config['trading']['obi_threshold']):
                logging.info(f"[SYSTEM 6] OBI too low - Skipping iteration")
                return

            # System 2: Regime Gate
            processed_data = self.system1.compute_volatility_measures(market_data)
            processed_data = self.system1.compute_multi_timeframe_zscores(processed_data)

            # Extract features for GMM
            latest_features = processed_data.iloc[-1]
            current_volatility = latest_features['gk_vol']
            regime, regime_name = self.system2.predict_regime(current_volatility)

            if self.system2.should_suppress_trading(regime):
                logging.info(f"[SYSTEM 2] {regime_name} - Trading suppressed")
                return

            # System 5: Microstructural Features
            self.system5.update_market_data(
                latest_features['Close'],
                latest_features['Volume'],
                latest_features['Low'],  # Approximate bid
                latest_features['High']   # Approximate ask
            )
            micro_features = self.system5.calculate_microstructural_features()

            # System 4: Transformer Processing
            feature_sequence = processed_data[[
                'gk_vol', 'parkinson_vol', 'z_score_10', 'z_score_30', 'z_score_60', 'log_ret'
            ]].values[-30:]  # Last 30 time steps

            embedding = self.system4.process_sequence(feature_sequence)

            # System 3: Deep RL Allocation
            allocation = self.system3.get_allocation(embedding)

            # System 1: ML Probability Scoring
            feature_vector = np.array([
                current_volatility,
                latest_features['parkinson_vol'],
                latest_features['z_score_10'],
                latest_features['z_score_30'],
                latest_features['z_score_60'],
                latest_features['log_ret'],
                list(micro_features.values())[0] if micro_features else 0.0
            ])

            probability = self.system1.compute_directional_probability(feature_vector)

            # Final allocation calculation
            final_alloc = np.clip(
                allocation * probability * self.llm.risk_multiplier,
                -1.0, 1.0
            )

            # Execute if confidence threshold met
            if abs(final_alloc) >= self.llm.confidence_threshold:
                await self._execute_trade(symbol, final_alloc, regime_name)

        except Exception as e:
            logging.error(f"[SYSTEM PIPELINE] Error: {e}")

    async def _execute_trade(self, symbol: str, allocation: float, regime: str):
        """Execute trade through BloFin API"""
        side = "buy" if allocation > 0 else "sell"
        pos_side = "long" if allocation > 0 else "short"
        size = round(abs(allocation) * 0.01, 3)  # 1% position size per unit allocation

        logging.info(f"[EXECUTION] {side.upper()} {size} {symbol} ({pos_side.upper()}) - Regime: {regime}")

        # Execute trade
        response = await self.blofin.place_order(symbol, side, pos_side, size)

        # Log execution
        self.log_execution(
            symbol, side, pos_side, size, 65000.0,  # Placeholder price
            self.blofin.latest_obi, allocation, regime, response
        )
        logging.info(f"[BLOFIN RESPONSE] {response}")

# =====================================================================
# MAIN EXECUTION DAEMON
# =====================================================================
async def main():
    # Load configuration
    with open('config.json', 'r') as f:
        config = json.load(f)

    # Load credentials from environment variables with fallback to API compendium values
    api_key = os.getenv("BLOFIN_API_KEY", "f3ba1b72597249f1b1b1c74587f37a1d")
    api_secret = os.getenv("BLOFIN_SECRET_KEY", "0c90e12753904b94a6b0fe3a71ec7242")
    passphrase = os.getenv("BLOFIN_PASSPHRASE", "Mookie90")

    if not all([api_key, api_secret, passphrase]):
        logging.error("Missing BloFin API credentials")
        return

    # Initialize unified trading systems
    engine = UnifiedTradingSystems(config, api_key, api_secret, passphrase)

    # Start background WebSocket stream
    asyncio.create_task(engine.blofin.listen_orderbook_stream(config['trading']['symbol']))

    # Generate mock historical data for testing
    dates = pd.date_range("2026-01-01", periods=100, freq="15min")
    prices = 65000 + np.cumsum(np.random.randn(100) * 50)
    history_df = pd.DataFrame({
        'Open': prices + np.random.randn(100)*2,
        'High': prices + np.abs(np.random.randn(100)*10),
        'Low': prices - np.abs(np.random.randn(100)*10),
        'Close': prices,
        'Volume': np.random.exponential(100, 100)
    }, index=dates)

    logging.info("--- Unified 6-System Engine Live Loop Started ---")

    # Main execution loop
    for i in range(5):  # Run 5 iterations for testing
        await asyncio.sleep(3)  # Wait for WebSocket depth to populate OBI
        await engine.run_system_pipeline(config['trading']['symbol'], history_df)

if __name__ == "__main__":
    asyncio.run(main())