@echo off
setlocal
cd /d "%~dp0"

if exist api\register.js (
  echo API detected. Starting Vercel dev server...
  if not exist .env.local (
    echo.
    echo WARNING: .env.local not found.
    echo Create .env.local based on .env.local.example before testing email flow.
    echo.
  )
  start "" http://127.0.0.1:4321
  call npx vercel dev --listen 4321
  goto :end
)

if exist package.json (
  if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
      echo.
      echo Failed to install dependencies.
      pause
      exit /b 1
    )
  )
  echo Starting FEIGIN dev server ^(npm^)...
  start "" http://127.0.0.1:4321
  call npm run dev -- --host 0.0.0.0 --port 4321
) else (
  echo package.json not found. Starting static server...
  start "" http://127.0.0.1:8080/index.html
  python -m http.server 8080
)

:end
endlocal
