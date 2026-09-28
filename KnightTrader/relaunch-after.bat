@echo off
setlocal EnableExtensions
REM Started by the installer. Waits until the setup process exits, then launches the app.
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
if exist "%EXE%" (
  >>"%LOG%" echo relaunch-after starting app
  start "" "%EXE%" --updated
) else (
  >>"%LOG%" echo relaunch-after missing exe %EXE%
)
exit /b 0
