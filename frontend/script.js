const API_URL = "http://127.0.0.1:8000";

async function updateDashboard() {
    try {
        const response = await fetch(`${API_URL}/api/system`);

        if (!response.ok) {
            throw new Error("API connection failed");
        }

        const data = await response.json();
// Live Network Speed
const networkResponse = await fetch(`${API_URL}/api/network`);
const networkData = await networkResponse.json();
// JARVIS V2.5 - Network Activity Indicator
const downloadSpeed = networkData.speed.download_mbps;
const uploadSpeed = networkData.speed.upload_mbps;

const activityDot = document.getElementById("network-activity-dot");
const activityText = document.getElementById("network-activity-text");

const isTransferring =
    downloadSpeed > 0.01 || uploadSpeed > 0.01;

if (isTransferring) {
    activityDot.className = "transferring";
    activityText.textContent = "DATA TRANSFERRING";
} else {
    activityDot.className = "idle";
    activityText.textContent = "NETWORK IDLE";
}
// JARVIS V2.4 - Network Connection Status
const statusElement = document.getElementById("internet-status");
const interfacesElement = document.getElementById("network-interfaces");

statusElement.textContent = networkData.status.connected
    ? "CONNECTED"
    : "DISCONNECTED";

statusElement.style.color = networkData.status.connected
    ? "#00ff88"
    : "#ff4444";

interfacesElement.textContent =
    "Active Interfaces: " +
    networkData.status.active_interfaces.join(", ");
// JARVIS V2.3 - Network Live Graphs
updateLiveChart(downloadChart, networkData.speed.download_mbps);
updateLiveChart(uploadChart, networkData.speed.upload_mbps);
document.getElementById("download-speed").textContent =
    networkData.speed.download_mbps.toFixed(2) + " Mbps";

document.getElementById("upload-speed").textContent =
    networkData.speed.upload_mbps.toFixed(2) + " Mbps";
        // CPU
        document.getElementById("cpu-value").textContent =
            data.cpu.usage_percent + "%";

        // RAM
        document.getElementById("ram-value").textContent =
            data.memory.usage_percent + "%";

// JARVIS V3.5 - CPU & RAM Holographic Meters
document.getElementById("cpu-meter").style.width =
    Math.min(100, Math.max(0, data.cpu.usage_percent)) + "%";

document.getElementById("ram-meter").style.width =
    Math.min(100, Math.max(0, data.memory.usage_percent)) + "%";

// LIVE GRAPHS
updateLiveChart(cpuChart, data.cpu.usage_percent);
updateLiveChart(ramChart, data.memory.usage_percent);
        // GPU
        if (data.gpu.available) {
            document.getElementById("gpu-value").textContent =
                data.gpu.usage_percent + "%";
document.getElementById("gpu-meter").style.width =
    Math.min(100, Math.max(0, data.gpu.usage_percent)) + "%";
updateLiveChart(gpuChart, data.gpu.usage_percent);
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
// JARVIS V2 - Live Charts

const chartOptions = {
    responsive: true,
    animation: {
        duration: 500
    },
    scales: {
        y: {
            min: 0,
            max: 100,
            ticks: {
                color: "#ffffff"
            },
            grid: {
                color: "#29415f"
            }
        },
        x: {
            ticks: {
                color: "#ffffff"
            },
            grid: {
                color: "#29415f"
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: "#ffffff"
            }
        }
    }
};

function createLiveChart(canvasId, label) {
    return new Chart(document.getElementById(canvasId), {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: [],
                borderColor: "#00e5ff",
                backgroundColor: "rgba(0, 229, 255, 0.15)",
                fill: true,
                tension: 0.4
            }]
        },
        options: chartOptions
    });
}

const cpuChart = createLiveChart("cpu-chart", "CPU Usage %");
const ramChart = createLiveChart("ram-chart", "RAM Usage %");
const gpuChart = createLiveChart("gpu-chart", "GPU Usage %");
// JARVIS V2.3 - Network Live Graphs
const downloadChart = createLiveChart("download-chart", "Download Mbps");
const uploadChart = createLiveChart("upload-chart", "Upload Mbps");
function updateLiveChart(chart, value) {
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(value);

    if (chart.data.labels.length > 15) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}
// First update
updateDashboard();

// Refresh every 2 seconds
setInterval(updateDashboard, 2000);

// ==================================
// JARVIS V3.2 - SYSTEM BOOT SEQUENCE
// ==================================

const bootScreen = document.getElementById("jarvis-boot");
const bootBar = document.getElementById("boot-progress-bar");
const bootPercent = document.getElementById("boot-percent");
const bootMessage = document.getElementById("boot-message");

const bootMessages = [
    "INITIALIZING SYSTEM...",
    "CHECKING HARDWARE...",
    "LOADING CPU MONITOR...",
    "LOADING GPU MONITOR...",
    "CONNECTING NETWORK...",
    "JARVIS SYSTEM ONLINE"
];

let bootProgress = 0;
let messageIndex = 0;

const bootTimer = setInterval(() => {
    bootProgress += 2;

    if (bootBar) {
        bootBar.style.width = bootProgress + "%";
    }

    if (bootPercent) {
        bootPercent.textContent = bootProgress + "%";
    }

    const newMessageIndex = Math.min(
        Math.floor(bootProgress / 18),
        bootMessages.length - 1
    );

    if (newMessageIndex !== messageIndex) {
        messageIndex = newMessageIndex;
        if (bootMessage) {
            bootMessage.textContent = bootMessages[messageIndex];
        }
    }

    if (bootProgress >= 100) {
        clearInterval(bootTimer);

        if (bootMessage) {
            bootMessage.textContent = "WELCOME BACK, SIR.";
        }

        setTimeout(() => {
            if (bootScreen) {
                bootScreen.classList.add("boot-hidden");
            }
        }, 700);
    }
}, 60);
