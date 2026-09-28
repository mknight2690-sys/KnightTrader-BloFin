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

; Post-update relaunch is handled by a detached relaunch-loop.bat spawned
; from the app AFTER the silent installer starts. Running it here via Exec()
; deadlocks because the installer is still running during customInstall.
; Interactive installs still use the finish-page "Run" checkbox.
