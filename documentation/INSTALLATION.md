# JARVIS System Monitor — Installation Guide

This guide explains how to run JARVIS System Monitor on Windows 10 or Windows 11.

## Requirements

- Windows 10 or Windows 11
- Python 3.10 or newer
- Internet connection for installing Python packages
- NVIDIA drivers and `nvidia-smi` for NVIDIA GPU details (optional)

## 1. Open the project folder

Open Command Prompt and change to the folder where you downloaded or extracted the project. For example:

```cmd
cd /d C:\path\to\JARVIS-SYSTEM-MONITOR
```

Replace the example path with your actual project folder.

## 2. Create a virtual environment

```cmd
py -m venv .venv
```

## 3. Activate the virtual environment

```cmd
.venv\Scripts\activate
```

If activation is successful, you should see `.venv` at the start of the command prompt.

## 4. Install dependencies

```cmd
python -m pip install --upgrade pip
python -m pip install -r backend\requirements.txt
```

## 5. Start the JARVIS server

Run this command from the project root:

```cmd
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

Keep this Command Prompt window open while using the dashboard.

## 6. Open the dashboard

Open a browser and visit:

- Dashboard: http://127.0.0.1:8000/
- Interactive API docs: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/api/health

## 7. Run the tests

Open a second Command Prompt in the project root, activate the virtual environment, and run:

```cmd
.venv\Scripts\activate
python -m pytest tests -v
```

## 8. Stop the server

Return to the Command Prompt window running Uvicorn and press **Ctrl + C**.

## Troubleshooting

- **`py` is not recognized:** Install Python from the official Python website and enable the option to add Python to PATH.
- **Port 8000 is already in use:** Stop the other process using that port, or start JARVIS on another port and use that port in the browser URL.
- **GPU information is unavailable:** The GPU endpoint may return limited/unavailable information when NVIDIA `nvidia-smi` is not installed or the system does not have a supported NVIDIA GPU. CPU, memory, disk, and network monitoring can still work.
- **Dashboard does not load:** Confirm the Uvicorn server started without errors and that you opened the URL shown above.

For endpoint details, see [API Documentation](API.md).
