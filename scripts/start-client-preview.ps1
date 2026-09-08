$ErrorActionPreference = 'Stop'
$projectDir = Split-Path $PSScriptRoot -Parent
$tunnelPath = Join-Path $projectDir 'tmp/tools/cloudflared.exe'
if (-not (Test-Path -LiteralPath $tunnelPath)) { throw 'A ferramenta de compartilhamento não está instalada em tmp/tools/cloudflared.exe.' }
Push-Location $projectDir
try {
  & node scripts/package-preview.js
  if ($LASTEXITCODE -ne 0) { throw 'Não foi possível preparar a prévia.' }
  $serverOnline = $false
  try { $response = Invoke-WebRequest 'http://127.0.0.1:8081' -UseBasicParsing; $serverOnline = $response.Headers['X-Robots-Tag'] -eq 'noindex, nofollow, noarchive' } catch {}
  if (-not $serverOnline) {
    Start-Process -FilePath 'node' -ArgumentList 'scripts/share-server.js' -WorkingDirectory $projectDir -WindowStyle Hidden
    Start-Sleep -Seconds 2
  }
  Write-Host 'Compartilhe o endereço https://...trycloudflare.com que aparecer abaixo.'
  Write-Host 'Mantenha este computador ligado e esta janela aberta. Ctrl+C encerra o link.'
  & $tunnelPath tunnel --url http://127.0.0.1:8081 --protocol http2 --no-autoupdate
} finally { Pop-Location }
