; Silent auto-update relaunch.
;
; Assisted NSIS (oneClick: false) only relaunches on --force-run via
; StdUtils.ExecShellAsUser. That call no-ops when electron-updater spawned
; the installer detached, so the app quits, the update installs, and nothing
; comes back. Exec() starts the exe directly and works from that context.
; Interactive installs still use the finish-page "Run" checkbox.
!macro customInstall
  IfSilent kt_silent_relaunch kt_skip_relaunch
  kt_silent_relaunch:
    SetOutPath "$INSTDIR"
    Exec '"$INSTDIR\${APP_EXECUTABLE_FILENAME}"'
  kt_skip_relaunch:
!macroend
