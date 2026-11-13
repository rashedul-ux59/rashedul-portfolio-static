@echo off
setlocal
cd /d "%~dp0"
title Build Rashedul Portfolio for Cloudflare Pages

echo ================================================
echo   Rashedul Karim - Cloudflare Pages Build
echo ================================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js and npm were not found.
  echo Install Node.js 22 LTS from https://nodejs.org/ and run this file again.
  echo.
  pause
  exit /b 1
)

echo [1/3] Installing project packages...
call npm install
if errorlevel 1 goto failed

echo.
echo [2/3] Building the static website...
call npm run build
if errorlevel 1 goto failed

if not exist "out\index.html" (
  echo ERROR: Build finished but out\index.html was not created.
  goto failed
)

echo.
echo [3/3] Creating Cloudflare upload ZIP...
if exist "Cloudflare-Upload.zip" del /q "Cloudflare-Upload.zip"
powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path 'out\*' -DestinationPath 'Cloudflare-Upload.zip' -Force"
if errorlevel 1 goto failed

echo.
echo SUCCESS! Your upload file is:
echo %~dp0Cloudflare-Upload.zip
echo.
echo Upload this ZIP in Cloudflare Pages - Direct Upload.
echo Do NOT upload this source project ZIP.
echo.
pause
exit /b 0

:failed
echo.
echo BUILD FAILED. Please copy the error shown above and send it here.
echo.
pause
exit /b 1
