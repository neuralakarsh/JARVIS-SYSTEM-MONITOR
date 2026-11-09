import psutil


def get_network_usage():
    """Return actual network data usage."""
    network = psutil.net_io_counters()

    return {
        "bytes_sent": network.bytes_sent,
        "bytes_received": network.bytes_recv,
        "sent_mb": round(network.bytes_sent / (1024 ** 2), 2),
        "received_mb": round(network.bytes_recv / (1024 ** 2), 2)
    }
def get_network_status():
    """Check network interface connection status."""
    interfaces = psutil.net_if_stats()

    active_interfaces = [
        name
        for name, interface in interfaces.items()
        if interface.isup
    ]

    return {
        "connected": len(active_interfaces) > 0,
        "active_interfaces": active_interfaces
    }

# JARVIS V2.2 - Live Network Speed

_previous_network_sample = None


def get_network_speed():
    """Calculate live download and upload speed in Mbps."""
    import time

    global _previous_network_sample

    network = psutil.net_io_counters()
    current_time = time.monotonic()

    current_sample = {
        "time": current_time,
        "sent": network.bytes_sent,
        "received": network.bytes_recv
    }

    if _previous_network_sample is None:
        upload_mbps = 0
        download_mbps = 0
    else:
        elapsed = current_time - _previous_network_sample["time"]

        if elapsed > 0:
            upload_mbps = max(
                0,
                (current_sample["sent"] - _previous_network_sample["sent"])
                * 8 / elapsed / 1_000_000
            )

            download_mbps = max(
                0,
                (current_sample["received"] - _previous_network_sample["received"])
                * 8 / elapsed / 1_000_000
            )
        else:
            upload_mbps = 0
            download_mbps = 0

    _previous_network_sample = current_sample

    return {
        "download_mbps": round(download_mbps, 2),
        "upload_mbps": round(upload_mbps, 2)
    }