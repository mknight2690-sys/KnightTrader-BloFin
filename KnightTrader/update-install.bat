@echo off
setlocal EnableDelayedExpansion
REM Single-shot update: wait for app exit, run NSIS /S into INSTDIR, verify, relaunch.
set "INSTALLER=%~1"
set "INSTDIR=%~2"
set "EXE=%~3"
set "OLD_PID=%~4"
set "FLAG=%~5"
set "LOG=%TEMP%\knighttrader-update.log"
set "LOCK=%TEMP%\knighttrader-update.lock"

if exist "%LOCK%" del "%LOCK%" 2>nul
echo %date% %time% > "%LOCK%"

>>"%LOG%" echo === update-install %date% %time% ===
>>"%LOG%" echo installer=%INSTALLER%
>>"%LOG%" echo instdir=%INSTDIR%
>>"%LOG%" echo exe=%EXE%
>>"%LOG%" echo oldpid=%OLD_PID%

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

REM Ensure INSTDIR ends with backslash for NSIS /D=
if not "%INSTDIR:~-1%"=="\" set "INSTDIR=%INSTDIR%\"

if not "%OLD_PID%"=="" if not "%OLD_PID%"=="0" (
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
>>"%LOG%" echo killing leftover app / hermes processes
taskkill /F /IM "KnightTrader Blofin.exe" /T >nul 2>&1
taskkill /F /IM "hermes.exe" /T >nul 2>&1
timeout /t 3 /nobreak >nul

>>"%LOG%" echo running installer /S /CURRENTUSER /D=%INSTDIR%
REM /D= must be last. Path after /D= must not be quoted (NSIS rule).
start /wait "" "%INSTALLER%" /S /CURRENTUSER /D=%INSTDIR%
set "RC=!ERRORLEVEL!"
>>"%LOG%" echo installer exit code !RC!

if not "!RC!"=="0" (
  >>"%LOG%" echo ERROR installer failed — NOT relaunching old build
  del "%LOCK%" 2>nul
  exit /b !RC!
)

timeout /t 2 /nobreak >nul

if not exist "%EXE%" if exist "%INSTDIR%KnightTrader Blofin.exe" (
  set "EXE=%INSTDIR%KnightTrader Blofin.exe"
)

if not exist "%EXE%" (
  >>"%LOG%" echo ERROR exe missing after install: %EXE%
  del "%LOCK%" 2>nul
  exit /b 1
)

>>"%LOG%" echo install ok — relaunching %EXE%
del "%FLAG%" 2>nul
if exist "%INSTDIR%START.bat" (
  call "%INSTDIR%START.bat"
) else (
  start "" "%EXE%" --updated
)

>>"%LOG%" echo relaunch spawned
del "%LOCK%" 2>nul
exit /b 0
