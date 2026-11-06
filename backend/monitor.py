
import psutil
import time
import os

def get_cpu_usage():
    """Return actual CPU usage percentage."""
    return {
        "usage_percent": psutil.cpu_percent(interval=1)
    }


def get_memory_usage():
    """Return actual RAM usage information."""
    memory = psutil.virtual_memory()

    return {
        "total_gb": round(memory.total / (1024 ** 3), 2),
        "used_gb": round(memory.used / (1024 ** 3), 2),
        "available_gb": round(memory.available / (1024 ** 3), 2),
        "usage_percent": memory.percent
    }


def get_system_uptime():
    """Return system uptime in seconds."""
    boot_time = psutil.boot_time()
    uptime_seconds = int(time.time() - boot_time)

    return {
        "uptime_seconds": uptime_seconds
    }
def get_disk_usage():
    """Return actual disk usage information."""
    disk = psutil.disk_usage(os.path.abspath(os.sep))

    return {
        "total_gb": round(disk.total / (1024 ** 3), 2),
        "used_gb": round(disk.used / (1024 ** 3), 2),
        "free_gb": round(disk.free / (1024 ** 3), 2),
        "usage_percent": disk.percent
    }
