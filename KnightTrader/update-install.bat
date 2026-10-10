@echo off
setlocal EnableDelayedExpansion
REM Wait for app exit → silent NSIS update → relaunch with retries.
set "INSTALLER=%~1"
set "INSTDIR=%~2"
set "EXE=%~3"
set "OLD_PID=%~4"
set "FLAG=%~5"
set "LOG=%TEMP%\knighttrader-update.log"
set "LOCK=%TEMP%\knighttrader-update.lock"

>>"%LOG%" echo === update-install %date% %time% ===
>>"%LOG%" echo installer=%INSTALLER%
>>"%LOG%" echo instdir=%INSTDIR%
>>"%LOG%" echo exe=%EXE%
>>"%LOG%" echo oldpid=%OLD_PID%

if exist "%LOCK%" del "%LOCK%" 2>nul
echo %date% %time% > "%LOCK%"

if not exist "%INSTALLER%" (
  >>"%LOG%" echo ERROR installer missing
  del "%LOCK%" 2>nul
  exit /b 1
)

if "%INSTDIR%"=="" (
  >>"%LOG%" echo ERROR instdir empty
  del "%LOCK%" 2>nul
  exit /b 1
)

if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"
if "%EXE%"=="" set "EXE=%INSTDIR%KnightTrader Blofin.exe"
if "%FLAG%"=="" set "FLAG=%APPDATA%\knight-trader\kt-relaunch-ok.flag"

if not "%OLD_PID%"=="" if not "%OLD_PID%"=="0" (
  >>"%LOG%" echo waiting for old pid %OLD_PID%
  set /a _w=0
  :wait_pid
  tasklist /FI "PID eq %OLD_PID%" 2>nul | find "%OLD_PID%" >nul
  if !ERRORLEVEL!==0 (
    set /a _w+=1
    if !_w! GTR 120 goto after_wait
    timeout /t 1 /nobreak >nul
    goto wait_pid
  )
)

:after_wait
>>"%LOG%" echo killing leftover app / hermes
taskkill /F /IM "KnightTrader Blofin.exe" /T >nul 2>&1
taskkill /F /IM "hermes.exe" /T >nul 2>&1
timeout /t 3 /nobreak >nul

REM Do NOT pass /D= — paths with spaces break NSIS argv splitting.
REM Same productId installs into the previous INSTDIR from the registry.
>>"%LOG%" echo running installer /S /CURRENTUSER
start /wait "" "%INSTALLER%" /S /CURRENTUSER
set "RC=!ERRORLEVEL!"
>>"%LOG%" echo installer exit code !RC!

timeout /t 3 /nobreak >nul

if not exist "%EXE%" if exist "%INSTDIR%KnightTrader Blofin.exe" set "EXE=%INSTDIR%KnightTrader Blofin.exe"
if not exist "%EXE%" if exist "%LOCALAPPDATA%\Programs\KnightTrader Blofin\KnightTrader Blofin.exe" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader Blofin\KnightTrader Blofin.exe"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader Blofin\"
)

if not exist "%EXE%" (
  >>"%LOG%" echo ERROR exe missing after install: %EXE%
  del "%LOCK%" 2>nul
  exit /b 1
)

>>"%LOG%" echo install ok — launching with retries: %EXE%
del "%FLAG%" 2>nul

REM Prefer relaunch-loop (retries until process/flag). Fall back to PowerShell Start-Process.
if exist "%INSTDIR%relaunch-loop.bat" (
  >>"%LOG%" echo using relaunch-loop.bat
  start "" /MIN cmd.exe /d /c call "%INSTDIR%relaunch-loop.bat" "%INSTDIR%" "0" "%FLAG%" "KnightTrader-Blofin-Setup"
  del "%LOCK%" 2>nul
  exit /b 0
)

set /a N=0
:retry_launch
set /a N+=1
if !N! GTR 30 (
  >>"%LOG%" echo ERROR gave up launching after !N! tries
  del "%LOCK%" 2>nul
  exit /b 1
)
>>"%LOG%" echo launch attempt !N!
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%EXE%' -ArgumentList '--updated' -WorkingDirectory '%INSTDIR%'" >>"%LOG%" 2>&1
timeout /t 8 /nobreak >nul
tasklist /FI "IMAGENAME eq KnightTrader Blofin.exe" 2>nul | find /I "KnightTrader Blofin.exe" >nul
if !ERRORLEVEL!==0 (
  >>"%LOG%" echo SUCCESS process running
  del "%LOCK%" 2>nul
  exit /b 0
)
if exist "%FLAG%" (
  >>"%LOG%" echo SUCCESS flag written
  del "%LOCK%" 2>nul
  exit /b 0
)
timeout /t 2 /nobreak >nul
goto retry_launch
