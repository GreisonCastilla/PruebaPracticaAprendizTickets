$BackendDir = "c:\Users\Familia castilla\Documents\greison\Codigos\PruebaPracticaAprendizTickets\Backend"
Set-Location $BackendDir

Write-Host "Resetting database..." -ForegroundColor Cyan
python reset_db.py

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database reset successfully!" -ForegroundColor Green
} else {
    Write-Host "Database reset failed with exit code $LASTEXITCODE" -ForegroundColor Red
}
