; Close every running app instance AND every child process before install /
; uninstall. "Failed to uninstall old files" happens when the old uninstaller
; can't delete $INSTDIR because a process still holds a file there (tray-hidden
; Electron, orphaned Hermes python/hermes.exe from the venv, node helpers).

!macro ktKillAll
  DetailPrint "KnightTrader: closing app and child processes..."
  ExecWait 'cmd /c taskkill /F /IM "${APP_EXECUTABLE_FILENAME}" /T 2>nul' $0
  ExecWait 'cmd /c taskkill /F /IM "${PRODUCT_NAME}.exe" /T 2>nul' $0
  ExecWait 'cmd /c taskkill /F /IM "hermes.exe" /T 2>nul' $0
  ; Any process (python, node, camoufox, cmd...) whose exe or command line lives
  ; under the install dir or the app's Hermes venv. Repeated so respawns die too.
  ExecWait `powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "$$d='$INSTDIR'; for($$i=0;$$i -lt 3;$$i++){ Get-CimInstance Win32_Process | Where-Object { $$_.ProcessId -ne $$PID -and ((($$_.ExecutablePath + ' ' + $$_.CommandLine) -like ('*'+$$d+'*')) -or (($$_.ExecutablePath + ' ' + $$_.CommandLine) -like '*knight-trader\hermes*') -or (($$_.ExecutablePath + ' ' + $$_.CommandLine) -like '*Programs\KnightTrader\*')) } | ForEach-Object { Stop-Process -Id $$_.ProcessId -Force -ErrorAction SilentlyContinue }; Start-Sleep -Milliseconds 1500 }"` $0
  Sleep 1500
!macroend

!macro customInit
  !insertmacro ktKillAll
!macroend

!macro customUnInit
  !insertmacro ktKillAll
!macroend

; Launch a detached waiter. It returns immediately so NSIS does not block,
; then starts the app only after this installer process has exited.
!macro customInstall
  IfFileExists "$INSTDIR\relaunch-after.bat" 0 kt_no_relaunch
    Exec '"$WINDIR\System32\cmd.exe" /c start "" /MIN "$INSTDIR\relaunch-after.bat" "$INSTDIR"'
  kt_no_relaunch:
!macroend
