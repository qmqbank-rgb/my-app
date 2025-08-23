@echo off
REM -------------------------------
REM Windows safe Git workflow: commit + merge + push
REM -------------------------------

REM 1️⃣ Ensure safe line endings
git config --global core.autocrlf true

REM 2️⃣ Switch to main branch
git checkout main

REM 3️⃣ Stage all changes
git add .

REM 4️⃣ Commit changes
git commit -m "Save current changes before merge"

REM 5️⃣ Merge landing branch into main
git merge landing

REM 6️⃣ Check for conflicts
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Merge conflicts detected! Please resolve them manually.
    echo After resolving, run:
    echo git add . && git commit -m "Resolve merge conflicts from landing branch"
    pause
    exit /b
)

REM 7️⃣ Push main branch
git push origin main

echo.
echo ✅ Landing branch merged into main successfully!
pause
