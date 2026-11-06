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
    """Check whether any network interface is connected."""
    interfaces = psutil.net_if_stats()

    connected = any(
        interface.isup
        for interface in interfaces.values()
    )

    return {
        "connected": connected
    }