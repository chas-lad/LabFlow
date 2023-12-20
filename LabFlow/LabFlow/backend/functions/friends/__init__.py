import azure.functions as func
from  db import db_connector
import logging
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    if req.method == 'POST':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            req_body = req.get_json()

            loggedInUserId = req_body.get('loggedInUserId')
            selectedUserId = req_body.get('selectedUserId')
            status       = req_body.get('status')

            # Deal with removing a friend from the users friends list
            if status == 0:
                cursor.execute("""
                               DELETE FROM
                                    friends
                               WHERE
                                    friend1 = ?
                               AND
                                    friend2 = ?
                               """, (loggedInUserId, selectedUserId))
            elif status == 1:

                # Check if the user is already friends with the selected user
                cursor.execute("""
                                 SELECT
                                        1
                                    FROM
                                        friends
                                    WHERE
                                        friend1 = ?
                                    AND
                                        friend2 = ?
                                """, (loggedInUserId, selectedUserId))
                if cursor.fetchone() is not None:
                    return func.HttpResponse("Users are already friends", status_code=409)

                cursor.execute("""
                               INSERT INTO friends
                                (
                                    friend1,
                                    friend2
                                )
                               VALUES
                                (
                                    ?,
                                    ?
                                )
                               """, (loggedInUserId, selectedUserId))
                
            connection.commit()
            cursor.close()
            connection.close()
            return func.HttpResponse("Friend registered or removed", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to register or remove friend", status_code=500)
    elif req.method == 'GET':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            loggedInUserId = req.params.get('loggedInUserId')

            # Select all friends of the logged in user extracting their details and 
            # also check if they are logged in, we also want to provide what lab they are in
            # If they are not logged in then we want to provide a null value for the lab

            cursor.execute("""
                            SELECT
                                u.id AS friendId,
                                u.firstName AS friendFirstName,
                                u.surname AS friendSurname,
                                u.email AS friendEmail,
                                u.userName AS friendUserName,
                                l.labName AS labName
                            FROM
                                friends f
                            JOIN
                                users u ON f.friend2 = u.id
                            LEFT JOIN
                                machines m ON u.id = m.userID
                            LEFT JOIN
                                labs l ON m.labID = l.id
                            WHERE
                                f.friend1 = ?;
                            """, loggedInUserId)

            
            friends = cursor.fetchall()
            logging.info("friends:" + str(friends))
            # Convert the result to a list of dictionaries
            friends_list = [dict(zip([column[0] for column in cursor.description], row)) for row in friends]
            logging.info(friends_list)
            cursor.close()
            connection.close()

            # Return the result as JSON
            return func.HttpResponse(json.dumps(friends_list), mimetype="application/json", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to fetch logged in user's friends", status_code=500)
    else:
        return func.HttpResponse(
                'Invalid request method. Use POST or GET.',
                status_code=400
            )
