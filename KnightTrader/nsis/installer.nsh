; Close every running app instance before install/update — including windows
; hidden in the system tray. Without this, NSIS cannot replace the exe while
; Electron is still alive (tray icon keeps the process running).

!macro customInit
  DetailPrint "KnightTrader: closing running app instances (including tray)..."
  ; Primary executable name from electron-builder (${APP_EXECUTABLE_FILENAME}).
  ExecWait 'cmd /c taskkill /F /IM "${APP_EXECUTABLE_FILENAME}" /T 2>nul' $0
  ; Product-name fallback (same as APP_EXECUTABLE_FILENAME for this app).
  ExecWait 'cmd /c taskkill /F /IM "${PRODUCT_NAME}.exe" /T 2>nul' $0
  ; Hermes child processes can hold locks under %APPDATA%\knight-trader\hermes.
  ExecWait 'cmd /c taskkill /F /IM "hermes.exe" /T 2>nul' $0
  Sleep 2000
!macroend

; Launch a detached waiter. It returns immediately so NSIS does not block,
; then starts the app only after this installer process has exited.
!macro customInstall
  IfFileExists "$INSTDIR\relaunch-after.bat" 0 kt_no_relaunch
    Exec '"$WINDIR\System32\cmd.exe" /c start "" /MIN "$INSTDIR\relaunch-after.bat" "$INSTDIR"'
  kt_no_relaunch:
!macroend
