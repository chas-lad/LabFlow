import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/login"
API_KEY = "INSERT_API_KEY_HERE"

# Test cases for the Login API
def test_valid_login():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "userName": "TestUser",
        "password": "Password1010!!"
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 200, f"Expected status code 200 for valid login, but got {response.status_code}"
    user_info = response.json()
    assert "id" in user_info, "User ID should be returned in the response"
    assert "firstName" in user_info, "First name should be returned in the response"
    assert "surname" in user_info, "Surname should be returned in the response"
    assert "email" in user_info, "Email should be returned in the response"
    assert "userName" in user_info, "Username should be returned in the response"

def test_invalid_username():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "userName": "invalidUsername",
        "password": "Password1010!!"
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 401, f"Expected status code 401 for invalid username, but got {response.status_code}"

def test_invalid_password():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "userName": "TestUser",
        "password": "invalidPassword"
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 401, f"Expected status code 401 for invalid password, but got {response.status_code}"

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
