import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/machines"

API_KEY = "INSERT_API_KEY_HERE"

def test_get_machines_for_lab3():
    labID = 3
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "labID": labID
    }
    response = requests.get(API_URL, headers=headers, params=params)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    machines = response.json()
    assert isinstance(machines, list), "Response data should be a list"
    for machine in machines:
        assert machine["labID"] == labID, f"Expected machines for lab {labID}, but found a machine for lab {machine['labID']}"
        assert "machineID" in machine, "Each machine should have a 'machineID' field"
        assert "xPos" in machine, "Each machine should have a 'xPos' field"
        assert "yPos" in machine, "Each machine should have a 'yPos' field"
        assert "commonIssues" in machine, "Each machine should have a 'commonIssues' field"
        assert "userID" in machine, "Each machine should have a 'userID' field"
        assert "VRHeadset" in machine, "Each machine should have a 'VRHeadset' field"
        assert "CPU" in machine, "Each machine should have a 'CPU' field"
        assert "GPU" in machine, "Each machine should have a 'GPU' field"
        assert "RAM" in machine, "Each machine should have a 'RAM' field"

def test_no_labID_provided():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 400, f"Expected status code 400 for no labID provided, but got {response.status_code}"

def test_non_integer_labID():
    labID = "abc"
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "labID": labID
    }
    response = requests.get(API_URL, headers=headers, params=params)
    assert response.status_code == 500, f"Expected status code 500 for non-integer labID, but got {response.status_code}"

def test_unauthorized_access():
    response = requests.get(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

def test_invalid_request_method():
    response = requests.post(API_URL)
    assert response.status_code == 404, f"Expected status code 405 for invalid request method, but got {response.status_code}"

def test_get_machines_for_nonexistent_lab():
    labID = 9999  # Lab with ID 9999 doesn't exist
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "labID": labID
    }
    response = requests.get(API_URL, headers=headers, params=params)
    assert response.status_code == 500, f"Expected status code 500, but got {response.status_code}"


if __name__ == "__main__":
    pytest.main([__file__])
