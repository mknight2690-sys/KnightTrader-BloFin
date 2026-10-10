@echo off
setlocal EnableExtensions EnableDelayedExpansion
REM Started by the installer. Waits until setup exits, then launches the app.
set "INSTDIR=%~1"
if "%INSTDIR%"=="" set "INSTDIR=%~dp0"
if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"
set "LOG=%TEMP%\knighttrader-update.log"
set "EXE=%INSTDIR%KnightTrader Blofin.exe"
>>"%LOG%" echo === relaunch-after %date% %time% instdir=%INSTDIR%
set /a N=0
:waitsetup
set /a N+=1
if %N% GTR 180 goto launch
tasklist | find /I "KnightTrader-Blofin-Setup" >nul
if errorlevel 1 goto launch
timeout /t 2 /nobreak >nul
goto waitsetup
:launch
timeout /t 3 /nobreak >nul
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader Blofin\KnightTrader Blofin.exe" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader Blofin\KnightTrader Blofin.exe"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader Blofin\"
)
if exist "%EXE%" (
  >>"%LOG%" echo relaunch-after Start-Process %EXE%
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%EXE%' -ArgumentList '--updated' -WorkingDirectory '%INSTDIR%'" >>"%LOG%" 2>&1
) else (
  >>"%LOG%" echo relaunch-after missing exe %EXE%
)
exit /b 0
