; Close every running app instance AND every child process before install /
; uninstall. "Failed to uninstall old files" happens when the old uninstaller
; can't delete $INSTDIR because a process still holds a file there (tray-hidden
; Electron, orphaned Hermes python/hermes.exe from the venv, node helpers).

!macro ktKillAll
  DetailPrint "KnightTrader: closing app and child processes..."
  nsExec::Exec 'cmd /c taskkill /F /IM "${APP_EXECUTABLE_FILENAME}" /T 2>nul'
  Pop $0
  nsExec::Exec 'cmd /c taskkill /F /IM "${PRODUCT_NAME}.exe" /T 2>nul'
  Pop $0
  nsExec::Exec 'cmd /c taskkill /F /IM "hermes.exe" /T 2>nul'
  Pop $0
  ; Any process (python, node, camoufox, cmd...) whose exe or command line lives
  ; under the install dir or the app's Hermes venv. Repeated so respawns die too.
  nsExec::Exec `powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "$$d='$INSTDIR'; for($$i=0;$$i -lt 3;$$i++){ Get-CimInstance Win32_Process | Where-Object { $$_.ProcessId -ne $$PID -and $$_.Name -notmatch '^(Un_|Au_|Uninstall|KnightTrader-Blofin-Setup)' -and $$_.CommandLine -notlike '*_?=*' -and ((($$_.ExecutablePath + ' ' + $$_.CommandLine) -like ('*'+$$d+'*')) -or (($$_.ExecutablePath + ' ' + $$_.CommandLine) -like '*knight-trader\hermes*') -or (($$_.ExecutablePath + ' ' + $$_.CommandLine) -like '*Programs\KnightTrader\*')) } | ForEach-Object { Stop-Process -Id $$_.ProcessId -Force -ErrorAction SilentlyContinue }; Start-Sleep -Milliseconds 1500 }"`
  Pop $0
  Sleep 1500
!macroend

!macro customInit
  !insertmacro ktKillAll
  ; v1.2.59: the v1.2.57 uninstaller kills itself (its _?= command line matched
  ; the cleanup filter) and aborts with "failed to uninstall old files".
  ; Everything is already closed, and this install overwrites all files, so
  ; remove the old uninstaller so electron-builder skips that step.
  Delete "$INSTDIR\Uninstall ${PRODUCT_NAME}.exe"
  Delete "$LOCALAPPDATA\Programs\KnightTrader\Uninstall ${PRODUCT_NAME}.exe"
!macroend

!macro customUnInit
  !insertmacro ktKillAll
!macroend

; Launch a detached waiter. It returns immediately so NSIS does not block,
; then starts the app only after this installer process has exited.
!macro customInstall
  IfFileExists "$INSTDIR\relaunch-after.bat" 0 kt_no_relaunch
    ExecShell "" "$INSTDIR\relaunch-after.bat" '"$INSTDIR"' SW_HIDE
  kt_no_relaunch:
!macroend
