Write-Host "Starting Next.js server in background..."

# পুরোনো Node.js প্রসেস বন্ধ করা
taskkill /F /IM node.exe /T > $null 2>&1

# Next.js cache ক্লিন
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }

# node_modules চেক
if (-Not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..."
  npm install
}

# সার্ভার ব্যাকগ্রাউন্ডে চালানো
Start-Process "powershell" -WindowStyle Hidden -ArgumentList "-NoLogo -NoProfile -Command cd D:\Projects\my-app; npm run dev"
