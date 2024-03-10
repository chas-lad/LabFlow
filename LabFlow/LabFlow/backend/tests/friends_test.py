import pytest
import requests

API_URL = "https://labflowbackend.azurewebsites.net/api/friends"
API_KEY = "INSERT_API_KEY_HERE"

# Helper function to check if a friendship exists in the database
def friendship_exists(friend1, friend2):
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "loggedInUserId": friend1
    }
    response = requests.get(API_URL, headers=headers, params=params)
    friends = response.json()
    for friend in friends:
        if friend["friendId"] == friend2:
            return True
    return False

def test_user_not_friends_with_themselves():
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "loggedInUserId": 1,
        "selectedUserId": 1
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 400, f"Expected status code 400 for user trying to add themselves as a friend, but got {response.status_code}"

def test_non_integer_user_ids():
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "loggedInUserId": None,
        "selectedUserId": None
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 400, f"Expected status code 400 for non-integer user IDs, but got {response.status_code}"


# Test cases for the Friends API
def test_add_friend():
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "loggedInUserId": 1,
        "selectedUserId": 2
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 200, f"Expected status code 200 for adding a friend, but got {response.status_code}"
    assert friendship_exists(1, 2), "Expected friendship to be added to the database"

def test_add_existing_friend():
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "loggedInUserId": 1,
        "selectedUserId": 2
    }
    response = requests.post(API_URL, headers=headers, json=data)
    assert response.status_code == 409, f"Expected status code 409 for adding an existing friend, but got {response.status_code}"

def test_get_friends():
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "loggedInUserId": 1
    }
    response = requests.get(API_URL, headers=headers, params=params)
    assert response.status_code == 200, f"Expected status code 200 for getting friends, but got {response.status_code}"
    friends = response.json()
    assert isinstance(friends, list), "Response data should be a list"
    userId2Found = False
    for friend in friends:
        if friend["friendId"] == 2:
            userId2Found = True
        assert "friendId" in friend, "Each friend should have a 'friendId' field"
        assert "friendFirstName" in friend, "Each friend should have a 'friendFirstName' field"
        assert "friendSurname" in friend, "Each friend should have a 'friendSurname' field"
        assert "friendEmail" in friend, "Each friend should have a 'friendEmail' field"
        assert "friendUserName" in friend, "Each friend should have a 'friendUserName' field"
        assert "labName" in friend, "Each friend should have a 'labName' field"
    assert userId2Found, "Expected friend with ID 2 to be in the list of friends"
     
def test_remove_friend():
    headers = {
        "x-api-key": API_KEY,
    }
    params = {
        "loggedInUserId": 1,
        "friendId": 2
    }
    response = requests.delete(API_URL, headers=headers, params=params)
    assert response.status_code == 200, f"Expected status code 200 for removing a friend, but got {response.status_code}"
    assert not friendship_exists(1, 2), "Expected friendship to be removed from the database"

def test_invalid_method():
    headers = {
        "x-api-key": API_KEY,
    }
    response = requests.put(API_URL, headers=headers)
    assert response.status_code == 404, f"Expected status code 404 for invalid request method, but got {response.status_code}"

def test_unauthorized_access():
    response = requests.get(API_URL)
    assert response.status_code == 401, f"Expected status code 401 for unauthorized access, but got {response.status_code}"

if __name__ == "__main__":
    pytest.main([__file__])
