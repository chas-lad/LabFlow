import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';
import { useAuth } from './AuthContext';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const LabUsageChart = ({ labUsageData }) => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Extract data from labUsageData for each day
    const data = daysOfWeek.map((day) => labUsageData[`totalHoursSpent${day}`]);

    const labels = daysOfWeek;

    const contentInset = { top: 20, bottom: 20 };

    return (
        <View style={styles.chartContainer}>
            <YAxis
                data={data}
                contentInset={contentInset}
                svg={{ fill: 'grey', fontSize: 10 }}
                numberOfTicks={5}
                formatLabel={(value) => `${value}h`}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                    <Line />
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    formatLabel={(value, index) => labels[index]}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>
        </View>
    );
};

const MachineUsage = () => {
    const [loggedInUserLabUsage, setloggedInUserLabUsage] = useState([]);
    const [averageLabUsageLoggedInUser, setAverageLabUsageLoggedInUser] = useState(null);
    const [averageLabUsageAllUsers, setAverageLabUsageAllUsers] = useState(null);
    const [busiestDay, setBusiestDay] = useState(null);
    const { loggedInUser } = useAuth();

    useEffect(() => {
        const fetchLabUsageFromDatabase = async () => {
            try {
                const response = await fetch(
                    'https://labflowbackend.azurewebsites.net/api/labUsage?',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': apiKey,
                        },
                    }
                );

                const fetchedLabUsage = await response.json();
                const loggedInUserLabUsage = filterLabUsageByUser(fetchedLabUsage, loggedInUser.id);
                setloggedInUserLabUsage(loggedInUserLabUsage[0]);

                const totalLabUsageLoggedInUser = calculateTotalLabUsage(loggedInUserLabUsage);
                const averageLabUsageLoggedInUser = totalLabUsageLoggedInUser / 7;
                setAverageLabUsageLoggedInUser(averageLabUsageLoggedInUser);

                const { totalLabUsageAllUsers, busiestDayOfWeek } = calculateAllUsersLabUsage(fetchedLabUsage);
                const averageLabUsageAllUsers = totalLabUsageAllUsers / (fetchedLabUsage.length * 7);
                setAverageLabUsageAllUsers(averageLabUsageAllUsers);

                setBusiestDay(busiestDayOfWeek);
                
            } catch (error) {
                console.error('Error fetching labs:', error);
            }
        };

        fetchLabUsageFromDatabase();
    }, []);

    const filterLabUsageByUser = (labUsageData, userId) => {
        return labUsageData.filter((labUsage) => labUsage.id === userId);
    };

    const calculateTotalLabUsage = (labUsageData) => {
        return labUsageData.reduce((total, labUsage) => {
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            daysOfWeek.forEach((day) => {
                total += labUsage[`totalHoursSpent${day}`];
            });
            return total;
        }, 0);
    };
    

    const calculateAllUsersLabUsage = (labUsageData) => {
        let totalLabUsageAllUsers = 0;
        let busiestDayTotal = 0;
        let busiestDayOfWeek = '';

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        labUsageData.forEach((labUsage) => {
            daysOfWeek.forEach((day) => {
                totalLabUsageAllUsers += labUsage[`totalHoursSpent${day.slice(0, 3)}`];

                if (labUsage[`totalHoursSpent${day.slice(0, 3)}`] > busiestDayTotal) {
                    busiestDayTotal = labUsage[`totalHoursSpent${day.slice(0, 3)}`];
                    busiestDayOfWeek = day;
                }
            });
        });
        return { totalLabUsageAllUsers, busiestDayOfWeek };
    };

    const formatTime = (hours) => {
        const totalMinutes = hours * 60;
        const formattedHours = Math.floor(totalMinutes / 60);
        const formattedMinutes = Math.ceil(totalMinutes % 60);

        let result = '';
        if (formattedHours > 0) {
            result += `${formattedHours} ${formattedHours === 1 ? 'Hour' : 'Hours'}`;
        }

        if (formattedHours > 0 && formattedMinutes > 0) {
            result += ' and ';
        }

        if (formattedMinutes > 0) {
            result += `${formattedMinutes} ${formattedMinutes === 1 ? 'Minute' : 'Minutes'}`;
        }

        return result;
    };

      
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your daily lab machine usage:</Text>
            <View style={styles.chartContainer}>
                <LabUsageChart labUsageData={loggedInUserLabUsage} />
            </View>
            <Text style={styles.text}>Your average weekly lab machine usage:</Text>
            <Text style={styles.averageText}>{formatTime(averageLabUsageLoggedInUser)}</Text>
            <Text style={styles.text}>Average from all users of the app:</Text>
            <Text style={styles.averageText}>{formatTime(averageLabUsageAllUsers)}</Text>
            <Text style={styles.text}>Busiest day in the labs:</Text>
            <Text style={styles.busiestDay}>{busiestDay}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', // Change background color as needed
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Change text color as needed
    },
    chartContainer: {
        flexDirection: 'row',
        height: 200,
        width: '80%',
        marginLeft: 10,
    },
    chart: {
        flex: 1,
    },
    text: {
        marginVertical: 10,
        fontSize: 18,
        color: '#555', // Change text color as needed
    },
    averageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Change text color as needed
    },
    busiestDay: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green', // Change text color as needed
    },
});

export default MachineUsage;
