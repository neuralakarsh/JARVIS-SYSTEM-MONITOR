import subprocess
import shutil


def get_gpu_info():
    """Get actual NVIDIA GPU information using nvidia-smi."""

    if shutil.which("nvidia-smi") is None:
        return {
            "available": False,
            "message": "NVIDIA GPU or nvidia-smi not available"
        }

    try:
        result = subprocess.run(
            [
                "nvidia-smi",
                "--query-gpu=name,utilization.gpu,temperature.gpu,memory.used,memory.total",
                "--format=csv,noheader,nounits"
            ],
            capture_output=True,
            text=True,
            timeout=5
        )

        if result.returncode != 0:
            return {
                "available": False,
                "message": "GPU information could not be read"
            }

        values = result.stdout.strip().split(",")

        if len(values) != 5:
            return {
                "available": False,
                "message": "Unexpected GPU information format"
            }

        return {
            "available": True,
            "name": values[0].strip(),
            "usage_percent": float(values[1]),
            "temperature_c": float(values[2]),
            "memory_used_mb": float(values[3]),
            "memory_total_mb": float(values[4])
        }

    except (subprocess.TimeoutExpired, ValueError, OSError):
        return {
            "available": False,
            "message": "GPU information could not be read"
        }