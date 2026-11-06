from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_dashboard_homepage():
    response = client.get("/")

    assert response.status_code == 200
    assert "J.A.R.V.I.S." in response.text


def test_system_api():
    response = client.get("/api/system")

    assert response.status_code == 200

    data = response.json()

    assert "cpu" in data
    assert "memory" in data
    assert "disk" in data
    assert "network" in data
    assert "gpu" in data
    assert "uptime" in data