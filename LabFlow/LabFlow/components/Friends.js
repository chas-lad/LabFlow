import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const Friends = () => {
  const [friendName, setFriendName] = useState('');
  const [users, setUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { loggedInUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUsersFromDatabase = async () => {
    try {
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/users?',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
        }
      );

      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchFriendsFromDatabase = async () => {
    try {
      let loggedInUserId = loggedInUser.id;
      const response = await fetch(
        `https://labflowbackend.azurewebsites.net/api/friends?loggedInUserId=${loggedInUserId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
        }
      );

      const fetchedfriends = await response.json();
      setFriends(fetchedfriends);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  useEffect(() => {
    fetchUsersFromDatabase();
    fetchFriendsFromDatabase();
  }, []);

  const handleFriendNameChange = (text) => {
    if (!text.trim()) {
      // Clear selected user and matched users if input is empty
      setSelectedUser(null);
      setMatchedUsers([]);
      setFriendName(''); // Clear the input field as well
      return;
    }

    setFriendName(text);
    const matchedUsers = users.filter((user) =>
      user.id !== loggedInUser.id &&
      (user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.surname.toLowerCase().includes(text.toLowerCase()) ||
        (user.firstName + ' ' + user.surname).toLowerCase().includes(text.toLowerCase()))
    );
    setMatchedUsers(matchedUsers);
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    setFriendName(selectedUser.firstName + ' ' + selectedUser.surname);
    setMatchedUsers([]);
  };

  const handleAddFriend = async () => {
    try {
      if (!selectedUser) {
        setErrorMessage('Please select a user to add as a friend');
        return;
      }
      let loggedInUserId = loggedInUser.id;
      let selectedUserId = selectedUser.id;
      const response = await fetch(
        'https://labflowbackend.azurewebsites.net/api/friends?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify({ loggedInUserId, selectedUserId }),
        }
      );

      if (response.status === 200) {
        await fetchFriendsFromDatabase();
        setFriendName('');
        setMatchedUsers([]);
      } else if (response.status === 409) {
        setErrorMessage('You are already friends with this user');
      } else {
        console.error('Error registering friend, error code: ', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteFriend = async (friendId) => {
    let loggedInUserId = loggedInUser.id;
    try {
      const response = await fetch(
        `https://labflowbackend.azurewebsites.net/api/friends?loggedInUserId=${loggedInUserId}&friendId=${friendId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
        }
      );

      if (response.status === 200) {
        await fetchFriendsFromDatabase();
      } else {
        console.error('Error deleting friend, error code: ', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hi {loggedInUser.firstName}</Text>
      <Text style={styles.headerText}>Enter a user to add as a friend</Text>
      <TextInput
        value={friendName}
        onChangeText={handleFriendNameChange}
        placeholder="Type a friend's name"
        style={styles.input}
      />
      {matchedUsers.length > 0 && (
        <ScrollView style={styles.scrollView}>
          {matchedUsers.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleUserSelect(item)}>
              <Text style={styles.matchedUserText}>{item.firstName + ' ' + item.surname}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
        <Text style={styles.addButtonText}>Add Friend</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Your Friends</Text>
      <Text style={styles.friendsCountText}>
        You have {friends.length} friends, {friends.filter((friend) => friend.labName).length} in labs
      </Text>
      <ScrollView style={styles.scrollView}>
        {friends.map((item) => (
          <View key={item.friendId} style={styles.friendItem}>
            <View style={styles.friendInfoContainer}>
              <Text style={styles.friendName}>{`${item.friendFirstName} ${item.friendSurname}`}</Text>
              <Text style={styles.friendEmail}>{item.friendEmail}</Text>
              <Text style={styles.labName}>{item.labName ? 'Currently in Lab: ' + item.labName : 'Not in labs'}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteFriend(item.friendId)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
  },
  matchedUserText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  friendInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  friendEmail: {
    fontSize: 16,
    color: '#666',
  },
  labName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
  },
});

export default Friends;
