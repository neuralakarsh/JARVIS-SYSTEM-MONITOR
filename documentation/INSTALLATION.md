\# JARVIS System Monitor - Installation Guide



\## Requirements



\- Windows 10 or Windows 11

\- Python 3.10 or newer

\- Internet connection for installing packages

\- NVIDIA GPU and nvidia-smi for NVIDIA GPU monitoring (optional)



\## Step 1: Open Project Folder



Open CMD and run:



cd /d C:\\Users\\offic\\JARVIS-SYSTEM-MONITOR



\## Step 2: Create Virtual Environment



py -m venv .venv



\## Step 3: Activate Virtual Environment



.venv\\Scripts\\activate



\## Step 4: Install Dependencies



python -m pip install -r backend\\requirements.txt



\## Step 5: Start JARVIS



python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000



\## Step 6: Open Dashboard



Open your browser and visit:



http://127.0.0.1:8000/



\## API Documentation



http://127.0.0.1:8000/docs



\## Run Tests



python -m pytest tests -v



\## Stop Server



Press CTRL + C in the server CMD window.

