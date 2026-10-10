@echo off
setlocal EnableExtensions EnableDelayedExpansion
REM Started by the NSIS installer. Waits until setup exits, then launches the app.
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
timeout /t 3 /nobreak >nul
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader\"
)
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader Blofin\"
)
if not exist "%EXE%" (
  for /f "delims=" %%P in ('dir /s /b "%LOCALAPPDATA%\Programs\%EXE_NAME%" 2^>nul') do (
    set "EXE=%%P"
    for %%I in ("%%P") do set "INSTDIR=%%~dpI"
    goto have_exe
  )
)
:have_exe
if exist "!EXE!" (
  >>"%LOG%" echo relaunch-after Start-Process !EXE!
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '!EXE!' -ArgumentList '--updated' -WorkingDirectory '!INSTDIR!'" >>"%LOG%" 2>&1
  timeout /t 2 /nobreak >nul
  start "" /D "!INSTDIR!" "!EXE!" --updated
) else (
  >>"%LOG%" echo relaunch-after missing exe %EXE%
)
exit /b 0
