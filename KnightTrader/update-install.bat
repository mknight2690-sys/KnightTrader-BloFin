@echo off
setlocal EnableDelayedExpansion
REM Wait for app exit → silent NSIS update → find exe → single relaunch.
set "INSTALLER=%~1"
set "INSTDIR=%~2"
set "EXE=%~3"
set "OLD_PID=%~4"
set "FLAG=%~5"
set "LOG=%TEMP%\knighttrader-update.log"
set "LOCK=%TEMP%\knighttrader-update.lock"
set "EXE_NAME=KnightTrader Blofin.exe"

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
if "%EXE%"=="" set "EXE=%INSTDIR%%EXE_NAME%"
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
taskkill /F /IM "%EXE_NAME%" /T >nul 2>&1
taskkill /F /IM "hermes.exe" /T >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command "for($i=0;$i -lt 3;$i++){ Get-CimInstance Win32_Process | Where-Object { $_.ProcessId -ne $PID -and ((($_.ExecutablePath + ' ' + $_.CommandLine) -like '*Programs\KnightTrader*') -or (($_.ExecutablePath + ' ' + $_.CommandLine) -like '*knight-trader\hermes*')) } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Start-Sleep -Milliseconds 1500 }" >nul 2>&1
timeout /t 3 /nobreak >nul

REM Never pass /D= — spaces break NSIS argv splitting.
>>"%LOG%" echo running installer /S /CURRENTUSER
start /wait "" "%INSTALLER%" /S /CURRENTUSER
set "RC=!ERRORLEVEL!"
>>"%LOG%" echo installer exit code !RC!
set /a _try=0
:retry_install
if not "!RC!"=="0" if !_try! LSS 2 (
  set /a _try+=1
  >>"%LOG%" echo installer failed rc=!RC! - force-killing app tree and retrying !_try!
taskkill /F /IM "%EXE_NAME%" /T >nul 2>&1
taskkill /F /IM "hermes.exe" /T >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command "for($i=0;$i -lt 3;$i++){ Get-CimInstance Win32_Process | Where-Object { $_.ProcessId -ne $PID -and ((($_.ExecutablePath + ' ' + $_.CommandLine) -like '*Programs\KnightTrader*') -or (($_.ExecutablePath + ' ' + $_.CommandLine) -like '*knight-trader\hermes*')) } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Start-Sleep -Milliseconds 1500 }" >nul 2>&1
  timeout /t 3 /nobreak >nul
  start /wait "" "%INSTALLER%" /S /CURRENTUSER
  set "RC=!ERRORLEVEL!"
  >>"%LOG%" echo retry installer exit code !RC!
  goto retry_install
)

timeout /t 4 /nobreak >nul

call :resolve_exe
if not exist "!EXE!" (
  >>"%LOG%" echo ERROR exe missing after install
  del "%LOCK%" 2>nul
  exit /b 1
)

>>"%LOG%" echo install ok — launching once: !EXE!
del "%FLAG%" 2>nul

REM One launch only — multiple Start-Process calls caused single-instance quit flicker.
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '!EXE!' -ArgumentList '--updated' -WorkingDirectory '!INSTDIR!'" >>"%LOG%" 2>&1

set /a N=0
:retry_check
set /a N+=1
if !N! GTR 15 (
  >>"%LOG%" echo WARN process not confirmed — launch was attempted
  del "%LOCK%" 2>nul
  exit /b 0
)
timeout /t 2 /nobreak >nul
tasklist /FI "IMAGENAME eq %EXE_NAME%" 2>nul | find /I "%EXE_NAME%" >nul
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
if !N! EQU 6 (
  >>"%LOG%" echo retry Start-Process
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '!EXE!' -ArgumentList '--updated' -WorkingDirectory '!INSTDIR!'" >>"%LOG%" 2>&1
)
goto retry_check

:resolve_exe
if exist "%EXE%" (
  for %%I in ("%EXE%") do set "INSTDIR=%%~dpI"
  goto :eof
)
if exist "%INSTDIR%%EXE_NAME%" (
  set "EXE=%INSTDIR%%EXE_NAME%"
  goto :eof
)
if exist "%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader\"
  >>"%LOG%" echo resolved under Programs\KnightTrader
  goto :eof
)
if exist "%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%" (
  set "EXE=%LOCALAPPDATA%\Programs\KnightTrader Blofin\%EXE_NAME%"
  set "INSTDIR=%LOCALAPPDATA%\Programs\KnightTrader Blofin\"
  >>"%LOG%" echo resolved under Programs\KnightTrader Blofin
  goto :eof
)
for /f "delims=" %%P in ('dir /s /b "%LOCALAPPDATA%\Programs\%EXE_NAME%" 2^>nul') do (
  set "EXE=%%P"
  for %%I in ("%%P") do set "INSTDIR=%%~dpI"
  >>"%LOG%" echo resolved via dir search: %%P
  goto :eof
)
goto :eof
