@echo off
setlocal EnableExtensions EnableDelayedExpansion
REM NSIS backup relaunch — only if the app is not already running.
set "INSTDIR=%~1"
if "%INSTDIR%"=="" set "INSTDIR=%~dp0"
if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"
set "LOG=%TEMP%\knighttrader-update.log"
set "EXE_NAME=KnightTrader Blofin.exe"
set "EXE=%INSTDIR%%EXE_NAME%"
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
timeout /t 5 /nobreak >nul
tasklist /FI "IMAGENAME eq %EXE_NAME%" 2>nul | find /I "%EXE_NAME%" >nul
if !ERRORLEVEL!==0 (
  >>"%LOG%" echo relaunch-after skip — app already running
  exit /b 0
)
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader\"
)
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader Blofin\"
)
if exist "!EXE!" (
  >>"%LOG%" echo relaunch-after Start-Process !EXE!
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '!EXE!' -ArgumentList '--updated' -WorkingDirectory '!INSTDIR!'" >>"%LOG%" 2>&1
) else (
  >>"%LOG%" echo relaunch-after missing exe
)
exit /b 0
