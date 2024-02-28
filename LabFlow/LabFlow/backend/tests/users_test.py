import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/users"
API_KEY = "815ebfed-2b15-4fc4-bd78-9e408ab1d13a"

def test_valid_users_retrieval():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 200, f"Expected status code 200 for valid users retrieval, but got {response.status_code}"
    users = response.json()
    assert isinstance(users, list), "Response data should be a list"
    assert len(users) > 0, "Expected at least one user in the response"
    for user in users:
        assert "id" in user, "User should have an 'id' field"
        assert "firstName" in user, "User should have a 'firstName' field"
        assert "surname" in user, "User should have a 'surname' field"
        assert "email" in user, "User should have an 'email' field"
        assert "userName" in user, "User should have a 'userName' field"

def test_unauthorized_access():
    response = requests.get(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

def test_invalid_method():
    response = requests.post(API_URL)
    assert response.status_code == 401, f"Expected status code 400 for invalid request method, but got {response.status_code}"

if __name__ == "__main__":
    pytest.main([__file__])
