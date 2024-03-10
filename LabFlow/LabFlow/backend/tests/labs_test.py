import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/labs"
API_KEY = "INSERT_API_KEY_HERE"


# Test cases for the Labs API
def test_get_labs():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 200, f"Expected status code 200 for getting labs, but got {response.status_code}"
    labs = response.json()
    for lab in labs:
        assert "id" in lab, "Each lab should have an id"
        assert "locationDescription" in lab, "Each lab should have a locationDescription"
        assert "labName" in lab, "Each lab should have a labName"
        assert "wheelchairAccess" in lab, "Each lab should have a wheelchairAccess"
        assert "latitude" in lab, "Each lab should have a latitude"
        assert "longitude" in lab, "Each lab should have a longitude"


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
