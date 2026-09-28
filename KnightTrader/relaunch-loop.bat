@echo off
setlocal EnableDelayedExpansion
REM Post-update relaunch — wait for installer exit, then retry START.bat until app is up.
set "INSTDIR=%~1"
if "%INSTDIR%"=="" set "INSTDIR=%~dp0"
if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"
set "OLD_PID=%~2"
set "FLAG=%~3"
if "%FLAG%"=="" set "FLAG=%APPDATA%\knight-trader\kt-relaunch-ok.flag"
set "SETUP_MATCH=%~4"
if "%SETUP_MATCH%"=="" set "SETUP_MATCH=KnightTrader-Blofin-Setup"
set "LOOPDIR=%~dp0"
set "EXE_NAME=KnightTrader Blofin.exe"
set "LOG=%TEMP%\knighttrader-relaunch.log"
set "LOCK=%TEMP%\knighttrader-relaunch.lock"
set "MAX=60"

if exist "%LOCK%" (
  for %%A in ("%LOCK%") do set "LOCK_AGE=%%~tA"
  >>"%LOG%" echo skip lock exists since !LOCK_AGE!
  exit /b 0
)
echo %date% %time% > "%LOCK%"

>>"%LOG%" echo === relaunch-loop %date% %time% ===
>>"%LOG%" echo instdir=%INSTDIR% oldpid=%OLD_PID% flag=%FLAG% setup=%SETUP_MATCH%

if exist "%LOOPDIR%START.bat" (
  set "START_SCRIPT=%LOOPDIR%START.bat"
) else if exist "%INSTDIR%START.bat" (
  set "START_SCRIPT=%INSTDIR%START.bat"
) else (
  >>"%LOG%" echo ERROR missing START.bat in loopdir and instdir
  del "%LOCK%" 2>nul
  exit /b 1
)

if not "%OLD_PID%"=="" if not "%OLD_PID%"=="0" (
  >>"%LOG%" echo waiting for old app pid %OLD_PID%
  set /a _w=0
  :wait_old
  tasklist /FI "PID eq %OLD_PID%" 2>nul | find "%OLD_PID%" >nul
  if !ERRORLEVEL!==0 (
    set /a _w+=1
    if !_w! GTR 120 goto wait_installer
    timeout /t 1 /nobreak >nul
    goto wait_old
  )
)

:wait_installer
>>"%LOG%" echo waiting for installer process matching %SETUP_MATCH%
set /a _i=0
:wait_setup_loop
set /a _i+=1
if !_i! GTR 240 goto post_install_cooldown
tasklist 2>nul | find /I "%SETUP_MATCH%" >nul
if !ERRORLEVEL!==0 (
  timeout /t 2 /nobreak >nul
  goto wait_setup_loop
)
goto post_install_cooldown

:post_install_cooldown
>>"%LOG%" echo installer finished — cooldown before launch
timeout /t 4 /nobreak >nul

set /a N=0
:retry
set /a N+=1
if !N! GTR %MAX% (
  >>"%LOG%" echo gave-up after !N! attempts
  del "%LOCK%" 2>nul
  exit /b 1
)

del "%FLAG%" 2>nul
>>"%LOG%" echo attempt !N! via !START_SCRIPT!
call "!START_SCRIPT!"
timeout /t 10 /nobreak >nul

if exist "%FLAG%" (
  >>"%LOG%" echo success flag=%FLAG%
  del "%LOCK%" 2>nul
  exit /b 0
)

tasklist /FI "IMAGENAME eq %EXE_NAME%" 2>nul | find /I "%EXE_NAME%" >nul
if !ERRORLEVEL!==0 (
  >>"%LOG%" echo success process=%EXE_NAME%
  del "%LOCK%" 2>nul
  exit /b 0
)

>>"%LOG%" echo not running yet — retry
timeout /t 3 /nobreak >nul
goto retry
