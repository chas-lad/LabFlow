###########################################################
## Title:       ResetHistory Cron Job
## Description: This function is triggered every night at
##              23:50 to reset the totalHoursSpent<day>
##              field for all users to 0, where <day> is
##              the next day of the week. This way we can
##              keep track of a 7 day history.
###########################################################

import datetime
import time
import logging
from db import db_connector
import azure.functions as func

def main(mytimer: func.TimerRequest) -> None:
    for retry_count in range(1, 6):
        try:
            logging.info('Python timer trigger function starting.')
            utc_timestamp = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()

            connection = db_connector()
            cursor = connection.cursor()

            # Get all users
            cursor.execute("""
                SELECT 
                    id
                FROM 
                    users
                """)
            
            users_to_reset = cursor.fetchall()
            # Extract the userIDs from the list of tuples into a list
            users_to_reset = [i[0] for i in users_to_reset]

            logging.info(f"Users to reset: {users_to_reset}")
            
            # Get the tomorrow's day in the form 'Mon', 'Tue', etc.
            tomorrow = datetime.datetime.today() + datetime.timedelta(days=1)
            tomorrow = tomorrow.strftime("%a")

            day_column = f'totalHoursSpent{tomorrow}'

            for user_id in users_to_reset:
                # Reset tomorrow's field to 0 (this function is run at 23:50 every night) this way we can keep track
                # of a 7 day history
                cursor.execute(f"""
                    UPDATE users
                    SET 
                        {day_column} = 0
                    WHERE 
                        id = ?
                            """, user_id)
            
            connection.commit()
            
            if mytimer.past_due:
                logging.info('The timer is past due!')

            logging.info('Python timer trigger function ran at %s', utc_timestamp)

            # If we get here, no exception was raised, so we can exit the retry loop
            break
        except Exception as ex:
            # Log the error or handle it as needed
            logging.error(f"Error: {str(ex)}")

            # If this is the last attempt, log a message 
            if retry_count == 5:
                logging.info("Maximum retry attempts reached.")
            else:
                # Otherwise, wait for a delay before retrying
                logging.info(f"Retrying in {30} seconds...")
                time.sleep(30)
