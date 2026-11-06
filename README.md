\# J.A.R.V.I.S. System Monitor V1



A local system monitoring dashboard built using Python, FastAPI, HTML, CSS, and JavaScript.



\## Features



\- CPU usage monitoring

\- RAM usage monitoring

\- GPU usage and temperature monitoring

\- Disk usage monitoring

\- Network data usage

\- Network connection status

\- System uptime

\- Automatic dashboard refresh every 2 seconds



\## Technologies Used



\### Backend

\- Python

\- FastAPI

\- Uvicorn

\- psutil

\- NVIDIA nvidia-smi



\### Frontend

\- HTML

\- CSS

\- JavaScript

\- Fetch API



\### Testing

\- Pytest

\- FastAPI TestClient



\## Installation



1\. Install Python.

2\. Open CMD inside the project folder.

3\. Create a virtual environment:



&#x20;  `py -m venv .venv`



4\. Activate it:



&#x20;  `.venv\\Scripts\\activate`



5\. Install dependencies:



&#x20;  `python -m pip install -r backend\\requirements.txt`



\## Run the Application



Start the server:



`python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000`



Open the dashboard:



http://127.0.0.1:8000/



## API Documentation

Interactive API documentation:

http://127.0.0.1:8000/docs

### Available API Endpoints

- GET /api/status - API status
- GET /api/cpu - CPU usage
- GET /api/memory - RAM usage
- GET /api/uptime - System uptime
- GET /api/disk - Disk usage
- GET /api/network - Network information
- GET /api/gpu - GPU information
- GET /api/system - Complete system information

Dashboard:

http://127.0.0.1:8000/

\## Run Tests



`python -m pytest tests -v`



\## Project Safety



\- Runs locally on localhost.

\- Does not execute arbitrary system commands.

\- Displays actual system monitoring information.

\- GPU monitoring uses NVIDIA nvidia-smi when available.



\## Version



JARVIS System Monitor V1

