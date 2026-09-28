@echo off
REM KnightTrader BloFin — launch installed app (used by post-update relaunch loop)
cd /d "%~dp0"
start "" "%~dp0KnightTrader Blofin.exe" --updated
exit /b 0
