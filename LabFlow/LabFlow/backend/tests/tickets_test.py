import pytest
import requests
from datetime import datetime
from datetime import timedelta

API_URL = "https://labflowbackend.azurewebsites.net/api/tickets"
API_KEY = "815ebfed-2b15-4fc4-bd78-9e408ab1d13a"

def test_valid_ticket_creation():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "machineID": 1,
        "labID": 1,
        "userID": 1,
        "issueDescription": "Machine not working",
        "issueStatus": False,
        "dateCreated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "dateResolved": None
    }
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 200, f"Expected status code 200 for valid ticket creation, but got {response.status_code}"

def test_date_ahead_of_current_date():
    # Calculate the date 7 days from now
    future_date = datetime.now() + timedelta(days=7)
    formatted_date = future_date.strftime("%Y-%m-%d %H:%M:%S")
    headers = {
        "x-api-key": API_KEY,
    }
    data = {
        "machineID": 1,
        "labID": 1,
        "userID": 1,
        "issueDescription": "Machine not working",
        "issueStatus": False,
        "dateCreated": formatted_date,
        "dateResolved": None
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 400, f"Expected status code 400 for date ahead of current date, but got {response.status_code}"

def test_missing_fields():
    headers = {
        "x-api-key": API_KEY,
    }
    data = {}  # Missing required fields
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 400, f"Expected status code 400 for missing fields, but got {response.status_code}"

def test_invalid_method():
    response = requests.get(API_URL)
    assert response.status_code == 401, f"Expected status code 400 for invalid request method, but got {response.status_code}"

def test_unauthorized_access():
    response = requests.post(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

if __name__ == "__main__":
    pytest.main([__file__])
