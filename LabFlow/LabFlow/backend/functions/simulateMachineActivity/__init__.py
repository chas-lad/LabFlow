###########################################################
## Title:       SimulateMachineActivity Cron Job
## Description: This function is triggered at a set
##              interval to simulate machine activity by
##              assigning users to machines. It also
##              updates the total hours spent for each user
##              in the users table for the current day of
##              the week.
###########################################################

import datetime
import logging
from db import db_connector
import random
import azure.functions as func

def main(mytimer: func.TimerRequest) -> None:
    logging.info('Python timer trigger function starting.')
    utc_timestamp = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()

    connection = db_connector()
    cursor = connection.cursor()

    # Set all machines to have no users (fresh slate for all machines - ready for new users)
    cursor.execute("""
                UPDATE machines
                SET userID = NULL
                """)
    connection.commit()

    # Extract all user IDs from the users table into a list
    cursor.execute("""
                SELECT id
                FROM users
                """)
    userIDs = cursor.fetchall()

    # Extract the userIDs from the list of tuples into a list and randomise the list
    # This list will be used to keep track of which users have been assigned to machines
    # We will only assign users from this list
    userIDs = [i[0] for i in userIDs]
    random.shuffle(userIDs)
    userIDIndex = len(userIDs) - 1

    # Lets deal with assignments lab by lab, first we need to get all the labIDs
    cursor.execute("""
                SELECT id
                FROM labs
                """)
    labIDs = cursor.fetchall()

    # Loop through the labIDs and assign users to machines in each lab
    for labID in labIDs:
        # Get all the machineIDs for the current labID (each lab potentially has different amounts of machines)
        cursor.execute("""
                    SELECT machineID
                    FROM machines
                    WHERE labID = ?
                    """, (labID[0],))
        machineIDs = cursor.fetchall()

        # randomise the machineIDs lists
        random.shuffle(machineIDs)

        # Pick a random number of machines to assign users to (between 0 and the number of machines)
        # This is to simulate some machines being offline
        numMachines = random.randint(0, len(machineIDs))

        # Loop through the randomised machineIDs list and assign a random user to each machine
        # the same user can't be assigned to multiple machines. The same user can't be assigned to
        # the same machine across different labs. A user can only be assigned to one machine in a 
        # single lab so we want to distrubute the users across the labs.

        for i in range(numMachines):
            # Check if a user exists (this case arises when there are more machines than users)
            # I have designed the database so that there are always more users than machines
            # but this is just a precaution
            if userIDIndex >= 0:
                cursor.execute("""
                            UPDATE machines
                            SET userID = ?
                            WHERE machineID = ?
                            AND labID = ?
                            """, (userIDs[userIDIndex], machineIDs[i][0], labID[0]))
                userIDIndex -= 1
            else:
                break
    
    connection.commit()

    # Get the current day of the week as a string (e.g., "Mon", "Tue", ...)
    dayOfWeek = datetime.datetime.today().strftime('%a')
    day_column = f'totalHoursSpent{dayOfWeek}'

    # Add 0.5 to the total hours spent (found in the users table) for each user which
    # has a userID in the machines table.

    cursor.execute(f"""
        UPDATE users
        SET {day_column} = {day_column} + 0.5
        WHERE id IN (SELECT userID FROM machines WHERE userID IS NOT NULL)
    """)

    connection.commit()
    
    if mytimer.past_due:
       logging.info('The timer is past due!')

    logging.info('Python timer trigger function ran at %s', utc_timestamp)
