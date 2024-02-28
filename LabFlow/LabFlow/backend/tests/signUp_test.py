import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/signUp"
API_KEY = "815ebfed-2b15-4fc4-bd78-9e408ab1d13a"

userToDelete = ""

# Test cases for the SignUp API
def test_valid_signup():
    global userToDelete
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "firstName": "signUpTest",
        "surname": "User",
        "email": "sign.up@example.com",
        "userName": "SignUpTestUser",
        "password": "Password1010!!"
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 200, f"Expected status code 200 for valid signup, but got {response.status_code}"
    user_info = response.json()
    userToDelete = user_info["id"]

    assert "id" in user_info, "User ID should be returned in the response"
    assert "firstName" in user_info, "First name should be returned in the response"
    assert "surname" in user_info, "Surname should be returned in the response"
    assert "email" in user_info, "Email should be returned in the response"
    assert "userName" in user_info, "Username should be returned in the response"

def test_duplicate_username():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "firstName": "Jane",
        "surname": "Doe",
        "email": "jane.doe@example.com",
        "userName": "johndoe",  # Using the same username as the previous test
        "password": "password123"
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 409, f"Expected status code 409 for duplicate username, but got {response.status_code}"

def test_delete_user():
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "user_id": userToDelete
    }
    response = requests.delete(API_URL, headers=headers, params=params)
    assert response.status_code == 200, f"Expected status code 200 for deleting user, but got {response.status_code}"

def test_missing_credentials():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {}
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 400, f"Expected status code 400 for missing credentials, but got {response.status_code}"

def test_invalid_method():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.get(API_URL, headers=headers)
    assert response.status_code == 400, f"Expected status code 400 for invalid request method, but got {response.status_code}"

def test_unauthorized_access():
    response = requests.post(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

if __name__ == "__main__":
    pytest.main([__file__])
