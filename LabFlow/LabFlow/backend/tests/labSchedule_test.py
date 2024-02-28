import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/labSchedule"
API_KEY = "815ebfed-2b15-4fc4-bd78-9e408ab1d13a"

# Test cases for the LabSchedule API
def test_get_lab_schedule():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 200, f"Expected status code 200 for getting lab schedule, but got {response.status_code}"
    schedule = response.json()
    for item in schedule:
        assert "id" in item, "Each lab schedule should have an id"
        assert "module" in item, "Each lab schedule should have a module"
        assert "lecturerName" in item, "Each lab schedule should have a lecturerName"
        assert "dayOfWeek" in item, "Each lab schedule should have a dayOfWeek"
        assert "startTime" in item, "Each lab schedule should have a startTime"
        assert "classLength" in item, "Each lab schedule should have a classLength"
        assert "labName" in item, "Each lab schedule should have a labName"


def test_invalid_method():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.post(API_URL, headers=headers)
    assert response.status_code == 400, f"Expected status code 400 for invalid request method, but got {response.status_code}"

def test_unauthorized_access():
    response = requests.get(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

if __name__ == "__main__":
    pytest.main([__file__])
