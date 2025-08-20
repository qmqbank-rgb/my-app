Write-Host "Stopping old Node.js processes..."
taskkill /F /IM node.exe /T > $null 2>&1

Write-Host "Cleaning Next.js cache..."
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
if (Test-Path .turbo) { Remove-Item -Recurse -Force .turbo }

Write-Host "Checking node_modules..."
if (-Not (Test-Path node_modules)) {
    Write-Host "node_modules not found. Installing dependencies..."
    pnpm install
}

Write-Host "Starting Next.js server..."
pnpm dev
