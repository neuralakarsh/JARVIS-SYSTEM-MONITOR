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
def test_cpu_usage():
    result = get_cpu_usage()
    assert "usage_percent" in result
    assert 0 <= result["usage_percent"] <= 100


def test_memory_usage():
    result = get_memory_usage()
    assert "total_gb" in result
    assert "used_gb" in result
    assert "available_gb" in result
    assert "usage_percent" in result
    assert result["total_gb"] > 0
    assert result["used_gb"] >= 0
    assert result["available_gb"] >= 0
    assert 0 <= result["usage_percent"] <= 100


def test_system_uptime():
    result = get_system_uptime()
    assert "uptime_seconds" in result
    assert result["uptime_seconds"] > 0


def test_disk_usage():
    result = get_disk_usage()
    assert "total_gb" in result
    assert "used_gb" in result
    assert "free_gb" in result
    assert "usage_percent" in result
    assert result["total_gb"] > 0
    assert result["used_gb"] >= 0
    assert result["free_gb"] >= 0
    assert 0 <= result["usage_percent"] <= 100
def test_network_usage():
    result = get_network_usage()

    assert "bytes_sent" in result
    assert "bytes_received" in result
    assert "sent_mb" in result
    assert "received_mb" in result

    assert result["bytes_sent"] >= 0
    assert result["bytes_received"] >= 0


def test_network_status():
    result = get_network_status()

    assert "connected" in result
    assert isinstance(result["connected"], bool)
def test_gpu_info():
    result = get_gpu_info()

    assert "available" in result
    assert isinstance(result["available"], bool)

    if result["available"]:
        assert "name" in result
        assert "usage_percent" in result
        assert "temperature_c" in result
        assert "memory_used_mb" in result
        assert "memory_total_mb" in result

        assert 0 <= result["usage_percent"] <= 100
        assert result["temperature_c"] >= 0
        assert result["memory_used_mb"] >= 0
        assert result["memory_total_mb"] > 0