# Script de configuración para el Frontend
$envPath = Join-Path $PSScriptRoot "frontend\.env"

if (-not (Test-Path $envPath)) {
    Write-Host "Creando el archivo .env para el frontend..." -ForegroundColor Cyan
    "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" | Out-File -FilePath $envPath -Encoding utf8
    Write-Host "Archivo .env creado con éxito en $envPath" -ForegroundColor Green
} else {
    Write-Host "El archivo .env ya existe. No se realizaron cambios." -ForegroundColor Yellow
}
