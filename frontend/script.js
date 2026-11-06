const API_URL = "http://127.0.0.1:8000";

async function updateDashboard() {
    try {
        const response = await fetch(`${API_URL}/api/system`);

        if (!response.ok) {
            throw new Error("API connection failed");
        }

        const data = await response.json();

        // CPU
        document.getElementById("cpu-value").textContent =
            data.cpu.usage_percent + "%";

        // RAM
        document.getElementById("ram-value").textContent =
            data.memory.usage_percent + "%";

        // GPU
        if (data.gpu.available) {
            document.getElementById("gpu-value").textContent =
                data.gpu.usage_percent + "%";

            document.getElementById("gpu-temperature").textContent =
                "Temperature: " + data.gpu.temperature_c + " °C";
        } else {
            document.getElementById("gpu-value").textContent =
                "Not Available";

            document.getElementById("gpu-temperature").textContent =
                data.gpu.message;
        }

        // Disk
        document.getElementById("disk-value").textContent =
            data.disk.usage_percent + "%";

        // Network
        document.getElementById("network-status").textContent =
            data.network.status.connected ? "Connected" : "Disconnected";

        document.getElementById("download-value").textContent =
            "Download: " + data.network.usage.received_mb + " MB";

        document.getElementById("upload-value").textContent =
            "Upload: " + data.network.usage.sent_mb + " MB";

        // Uptime
        const seconds = data.uptime.uptime_seconds;

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        document.getElementById("uptime-value").textContent =
            hours + "h " + minutes + "m";

        document.getElementById("connection-status").textContent =
            "● SYSTEM ONLINE";

    } catch (error) {
        document.getElementById("connection-status").textContent =
            "● SYSTEM OFFLINE";

        console.error("JARVIS Error:", error);
    }
}

// First update
updateDashboard();

// Refresh every 2 seconds
setInterval(updateDashboard, 2000);