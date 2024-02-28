import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/labUsage"
API_KEY = "815ebfed-2b15-4fc4-bd78-9e408ab1d13a"

# Test cases for the LabUsage API
def test_get_lab_usage():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 200, f"Expected status code 200 for getting lab usage data, but got {response.status_code}"
    lab_usage = response.json()
    for usage in lab_usage:
        assert "id" in usage, "Each lab usage should have an id"
        assert "totalHoursSpentMon" in usage, "Each lab usage should have a totalHoursSpentMon"
        assert "totalHoursSpentTue" in usage, "Each lab usage should have a totalHoursSpentTue"
        assert "totalHoursSpentWed" in usage, "Each lab usage should have a totalHoursSpentWed"
        assert "totalHoursSpentThu" in usage, "Each lab usage should have a totalHoursSpentThu"
        assert "totalHoursSpentFri" in usage, "Each lab usage should have a totalHoursSpentFri"
        assert "totalHoursSpentSat" in usage, "Each lab usage should have a totalHoursSpentSat"
        assert "totalHoursSpentSun" in usage, "Each lab usage should have a totalHoursSpentSun"

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
