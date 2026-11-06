from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.monitor import (
    get_cpu_usage,
    get_memory_usage,
    get_system_uptime,
    get_disk_usage
)
from backend.network_monitor import (
    get_network_usage,
    get_network_status
)
from backend.gpu_monitor import get_gpu_info


app = FastAPI(
    title="JARVIS System Monitor",
    description="Local system monitoring API",
    version="1.0.0"
)


@app.get("/api/status")
def home():
    return {
        "message": "JARVIS System Monitor API is running"
    }


@app.get("/api/cpu")
def cpu():
    return get_cpu_usage()


@app.get("/api/memory")
def memory():
    return get_memory_usage()


@app.get("/api/uptime")
def uptime():
    return get_system_uptime()


@app.get("/api/disk")
def disk():
    return get_disk_usage()


@app.get("/api/network")
def network():
    return {
        "usage": get_network_usage(),
        "status": get_network_status()
    }


@app.get("/api/gpu")
def gpu():
    return get_gpu_info()


@app.get("/api/system")
def system():
    return {
        "cpu": get_cpu_usage(),
        "memory": get_memory_usage(),
        "uptime": get_system_uptime(),
        "disk": get_disk_usage(),
        "network": {
            "usage": get_network_usage(),
            "status": get_network_status()
        },
        "gpu": get_gpu_info()
    }
app.mount(
    "/",
    StaticFiles(directory="frontend", html=True),
    name="frontend"
)