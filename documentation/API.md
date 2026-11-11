# JARVIS System Monitor API Documentation

Base URL:

http://127.0.0.1:8000

## 1. API Status

GET /api/status

Returns a message confirming that the API is running.

## 2. Dashboard

GET /

Serves the JARVIS System Monitor dashboard in the browser.

## 3. CPU Monitoring

GET /api/cpu

Returns CPU usage percentage.

Example:

{
  "usage_percent": 5.5
}

## 4. Memory Monitoring

GET /api/memory

Returns:
- Total RAM
- Used RAM
- Available RAM
- RAM usage percentage

## 5. Uptime

GET /api/uptime

Returns system uptime in seconds.

## 6. Disk Monitoring

GET /api/disk

Returns:
- Total disk space
- Used disk space
- Free disk space
- Disk usage percentage

## 7. Network Monitoring

GET /api/network

Returns:
- Bytes sent
- Bytes received
- Sent MB
- Received MB
- Connection status

Note: Network counters are cumulative data totals, not live transfer speed.

## 8. GPU Monitoring

GET /api/gpu

Returns NVIDIA GPU information when nvidia-smi is available.

Information includes:
- GPU name
- GPU usage
- Temperature
- Used GPU memory
- Total GPU memory

## 9. Complete System Monitoring

GET /api/system

Returns combined CPU, RAM, uptime, disk, network, and GPU information.

## 10. Health Check

GET /api/health

Returns the backend health status.

Example response:

{
  "status": "healthy",
  "message": "JARVIS System Monitor API is running"
}

## API Interactive Documentation

http://127.0.0.1:8000/docs
