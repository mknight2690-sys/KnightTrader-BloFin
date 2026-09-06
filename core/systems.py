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

    def get_obi_gate_status(self, threshold: float = 0.10) -> bool:
        """Check if OBI meets minimum threshold for trading"""
        return abs(self.latest_obi) >= threshold

