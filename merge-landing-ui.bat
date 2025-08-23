@echo off
REM -------------------------------
REM Windows safe Git workflow: commit + merge landing-ui branch + push
REM -------------------------------

REM 1️⃣ Switch to project root (adjust path if needed)
cd /d D:\Projects\my-app

REM 2️⃣ Ensure safe line endings
git config --global core.autocrlf true

REM 3️⃣ Switch to main branch
git checkout main

REM 4️⃣ Stage all changes
git add .

REM 5️⃣ Commit changes
git commit -m "Save current changes before merge"

REM 6️⃣ Merge landing-ui branch into main
git merge landing-ui

REM 7️⃣ Handle merge conflicts if any
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Merge conflicts detected! Please resolve them manually.
    echo After resolving, run:
    echo git add . && git commit -m "Resolve merge conflicts from landing-ui branch"
    pause
    exit /b
)

REM 8️⃣ Push main branch
git push origin main

echo.
echo ✅ landing-ui branch merged into main successfully!
pause
