import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const Friends = () => {
    const [friendName, setFriendName] = useState('');
    const [matchedFriends, setMatchedFriends] = useState([]);

    const handleFriendNameChange = (text) => {
        setFriendName(text);
        // Perform matching logic here to filter friends based on user input
        // const matched = friends.filter((friend) =>
        //     friend.toLowerCase().includes(text.toLowerCase())
        // );
        // setMatchedFriends(matched);
    };

    const handleAddFriend = () => {
        // Perform logic to add friend to your data structure
        // Reset the input field and matched friends list
        setFriendName('');
        setMatchedFriends([]);
    };

    return (
        <View>
            <Text>Friends Component</Text>
            <TextInput
                value={friendName}
                onChangeText={handleFriendNameChange}
                placeholder="Type a friend's name"
            />
            <Button title="Add" onPress={handleAddFriend} />
            <FlatList
                data={matchedFriends}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

export default Friends;
