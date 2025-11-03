@echo off
echo ========================================
echo Neural Network Classifier
echo Starting Both Servers...
echo ========================================
echo.
echo Starting Backend Server...
start cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"
echo.
echo ========================================
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to open browser...
pause > nul
start http://localhost:5173
