@echo off
setlocal EnableDelayedExpansion
REM Retry START.bat until KnightTrader BloFin is running (post-update relaunch)
set "INSTDIR=%~1"
if "%INSTDIR%"=="" set "INSTDIR=%~dp0"
if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"
set "OLD_PID=%~2"
set "EXE_NAME=KnightTrader Blofin.exe"
set "FLAG=%APPDATA%\knight-trader\kt-relaunch-ok.flag"
set "LOG=%TEMP%\knighttrader-relaunch.log"
set "LOCK=%TEMP%\knighttrader-relaunch.lock"
set "MAX=45"

if exist "%LOCK%" (
  >>"%LOG%" echo skip already-running loop
  exit /b 0
)
echo %date% %time% > "%LOCK%"

>>"%LOG%" echo === relaunch-loop %date% %time% instdir=%INSTDIR% oldpid=%OLD_PID% ===

if not exist "%INSTDIR%START.bat" (
  >>"%LOG%" echo ERROR missing START.bat
  exit /b 1
)

if not "%OLD_PID%"=="" if not "%OLD_PID%"=="0" (
  >>"%LOG%" echo waiting for old pid %OLD_PID%
  set /a _w=0
  :wait_old
  tasklist /FI "PID eq %OLD_PID%" 2>nul | find "%OLD_PID%" >nul
  if !ERRORLEVEL!==0 (
    set /a _w+=1
    if !_w! GTR 180 goto wait_installer
    timeout /t 1 /nobreak >nul
    goto wait_old
  )
)

:wait_installer
>>"%LOG%" echo waiting for NSIS installer to finish
set /a _i=0
:wait_setup_loop
set /a _i+=1
if !_i! GTR 180 goto post_install_cooldown
tasklist 2>nul | find /I "KnightTrader-Blofin-Setup" >nul
if !ERRORLEVEL!==0 (
  timeout /t 2 /nobreak >nul
  goto wait_setup_loop
)
tasklist 2>nul | find /I "KnightTrader Blofin Setup" >nul
if !ERRORLEVEL!==0 (
  timeout /t 2 /nobreak >nul
  goto wait_setup_loop
)
:post_install_cooldown
>>"%LOG%" echo installer idle — cooldown before START.bat
timeout /t 5 /nobreak >nul

set /a N=0
:retry
set /a N+=1
if !N! GTR %MAX% (
  >>"%LOG%" echo gave-up after !N! attempts
  del "%LOCK%" 2>nul
  exit /b 1
)

del "%FLAG%" 2>nul
>>"%LOG%" echo attempt !N! calling START.bat
call "%INSTDIR%START.bat"
timeout /t 12 /nobreak >nul

if exist "%FLAG%" (
  >>"%LOG%" echo success relaunch-ok flag
  del "%LOCK%" 2>nul
  exit /b 0
)

tasklist /FI "IMAGENAME eq %EXE_NAME%" 2>nul | find /I "%EXE_NAME%" >nul
if !ERRORLEVEL!==0 (
  >>"%LOG%" echo success process seen
  del "%LOCK%" 2>nul
  exit /b 0
)

>>"%LOG%" echo not running yet, retry
timeout /t 4 /nobreak >nul
goto retry
