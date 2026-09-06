"""
Main Execution Daemon
Unified 6-System Trading Engine Entry Point
"""
import os
import sys
import json
import asyncio
import signal
import logging
import pandas as pd
import numpy as np

# Add core modules to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'core'))

from core.systems import UnifiedTradingSystems

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

async def main():
    """Main execution entry point"""
    try:
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

        # Graceful shutdown handling for cloud platforms (SIGTERM)
        _shutdown = False
        def _handle_shutdown(signum, frame):
            global _shutdown
            logging.info(f"Shutdown signal received (signal {signum}), stopping...")
            _shutdown = True

        signal.signal(signal.SIGINT, _handle_shutdown)
        signal.signal(signal.SIGTERM, _handle_shutdown)

        # Continuous execution loop for cloud deployment
        cycle_interval = int(os.getenv("KNIGHTTRADER_CYCLE_SEC", "10"))

        while not _shutdown:
            await asyncio.sleep(cycle_interval)
            await engine.run_system_pipeline(config['trading']['symbol'], history_df)

        logging.info("Trading engine stopped gracefully.")

    except Exception as e:
        logging.error(f"Main execution error: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(main())