@echo off
cd /d "%~dp0"
start "" "http://localhost:4173"
..\.venv\Scripts\python.exe -m http.server 4173 --bind 127.0.0.1 --directory "%~dp0"
