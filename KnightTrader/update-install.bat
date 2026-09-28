@echo off
setlocal EnableDelayedExpansion
REM Single-shot update: wait for app exit, run NSIS /S, wait for finish, relaunch.
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
>>"%LOG%" echo waiting for file locks to clear
timeout /t 3 /nobreak >nul

>>"%LOG%" echo running installer /S /CURRENTUSER
start /wait "" "%INSTALLER%" /S /CURRENTUSER
set "RC=!ERRORLEVEL!"
>>"%LOG%" echo installer exit code !RC!

timeout /t 2 /nobreak >nul

if exist "%INSTDIR%START.bat" (
  >>"%LOG%" echo relaunch via START.bat
  del "%FLAG%" 2>nul
  call "%INSTDIR%START.bat"
) else if exist "%EXE%" (
  >>"%LOG%" echo relaunch via exe
  del "%FLAG%" 2>nul
  start "" "%EXE%" --updated
) else (
  >>"%LOG%" echo ERROR exe not found at %EXE%
  del "%LOCK%" 2>nul
  exit /b 1
)

>>"%LOG%" echo relaunch spawned
del "%LOCK%" 2>nul
exit /b 0
