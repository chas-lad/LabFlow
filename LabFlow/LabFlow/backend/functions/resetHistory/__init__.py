import datetime
import logging
from db import db_connector
import azure.functions as func

def main(mytimer: func.TimerRequest) -> None:
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
        # Reset tomorrow's field to 0 (this function is run at 23:59 every night) this way we can keep track
        # of a 7 day history
        cursor.execute(f"""
            UPDATE users
            SET 
                {day_column} = 0
            WHERE 
                id = {user_id}
                    """)
    
    connection.commit()
    
    if mytimer.past_due:
       logging.info('The timer is past due!')

    logging.info('Python timer trigger function ran at %s', utc_timestamp)
