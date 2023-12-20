import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';


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
            },
          }
      );

      const fetchedfriends = await response.json();
      setFriends(fetchedfriends);

      } catch (error) {
      console.error('Error fetching friends:', error);
      }
    };
    // Fetch all users from database when comoonent mounts for the first time
    // and store them in the users array. We don't want to fetch the users
    // each time the user types a letter in the input field.
    // We also fetch the friends of the logged in user and store them in the friends array
    useEffect(() => {

      fetchUsersFromDatabase();
      fetchFriendsFromDatabase();
    }, [],)
    
    const handleFriendNameChange = (text) => {
        setFriendName(text);
        // Perform logic to find friends that match the text inputted so far by
        // using the firstName and surName fields of the users in the users array
        const matchedUsers = [];
        users.forEach((user) => {
            // If the user's first name or surname or entire name contains the text inputted so far,
            // add the user to the matchedUsers array
            if (user.id == loggedInUser.id) {
                // Use return to skip to the next iteration of the forEach loop not continue
                return;
            }
            if (user.firstName.toLowerCase().includes(text.toLowerCase()) ||
                user.surname.toLowerCase().includes(text.toLowerCase())   ||
                (user.firstName + ' ' + user.surname).toLowerCase().includes(text.toLowerCase())) {
                matchedUsers.push(user);
            }
        });

        setMatchedUsers(matchedUsers);
    };

    const handleUserSelect = (selectedUser) => {
        // Store the selected user information in state
        setSelectedUser(selectedUser);
        // Reset the input field and matched friends list
        setFriendName(selectedUser.firstName + ' ' + selectedUser.surname);
        setMatchedUsers([]);
    };

    const handleAddFriend = async () => {
      try {
        let loggedInUserId = loggedInUser.id;
        let selectedUserId = selectedUser.id;
        const response = await fetch(
            'https://labflowbackend.azurewebsites.net/api/friends?',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loggedInUserId, selectedUserId }),
            }
        );

        if (response.status === 200) {
            // Fetch the updated list of friends after adding a friend
            await fetchFriendsFromDatabase();
            setFriendName('');
            setMatchedUsers([]);
        }
        else if (response.status === 409) {
            setErrorMessage('You are already friends with this user');
        } 
        else {
            console.error('Error registering friend, error code: ', response.status);
        }
      } catch (error) {
          console.error('Error:', error);
      }
    };

    const handleDeleteFriend = async (friendId) => {
      let loggedInUserId = loggedInUser.id;
      console.log(friendId);
      console.log(loggedInUserId);
      try {
        const response = await fetch(
          `https://labflowbackend.azurewebsites.net/api/friends?loggedInUserId=${loggedInUserId}&friendId=${friendId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            // Fetch the updated list of friends after deleting a friend
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
            <Text>Welcome, {loggedInUser.firstName}</Text>
          <Text style={styles.headerText}>Enter a user to add as a friend</Text>
          <TextInput
            value={friendName}
            onChangeText={handleFriendNameChange}
            placeholder="Type a friend's name"
            style={styles.input}
          />
          <FlatList
            data={friendName && matchedUsers}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserSelect(item)}>
                <Text style={styles.matchedUserText}>{item.firstName + ' ' + item.surname}</Text>
            </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
          />
          <Button title="Add Friend" onPress={handleAddFriend} />
          
          {/* Display the friends of the logged in user */}
            <Text style={styles.headerText}>Your Friends</Text>
            <Text style={styles.matchedUserText}>You have {friends.length} friends</Text>
            <FlatList
                data={friends}
                renderItem={({ item }) => (
                    <View style={styles.friendItem}>
                        <Text style={styles.matchedUserText}>
                            {item.friendFirstName + ' ' + item.friendSurname + ' ' + item.friendEmail +
                                (item.labName ? ' in lab ' + item.labName : '')
                            }
                        </Text>
                        <TouchableOpacity onPress={() => handleDeleteFriend(item.friendId)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.friendId.toString()}
                style={styles.flatList}
            />
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
      },
      flatList: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
      },
      matchedUserText: {
        fontSize: 18,
        marginBottom: 15,
      },
      friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      deleteButton: {
          color: 'red',
          fontSize: 16,
      },
    });
    
    export default Friends;