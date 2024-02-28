###########################################################
## Title:       SignUP API
## Methods:     POST, DELETE
###########################################################

import os
import azure.functions as func
from  db import db_connector
import logging
import hashlib
import json

API_KEY = os.environ.get("API_KEY")

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    api_key = req.headers.get("x-api-key")

    # Check if the API key is valid
    if api_key != API_KEY:
        return func.HttpResponse("Unauthorized: Invalid API key", status_code=401)

    if req.method == 'POST':
        try:
            connection = db_connector()
            cursor = connection.cursor()
    
            req_body = req.get_json()

            firstName = req_body.get('firstName')
            surname = req_body.get('surname')
            email = req_body.get('email')
            userName = req_body.get('userName')
            password = req_body.get('password')

            if firstName is None or surname is None or email is None or userName is None or password is None:
                return func.HttpResponse("First name, surname, email, username, and password are required", status_code=400)

            # Check if the username already exists in the database
            cursor.execute("""
                            SELECT
                                *
                            FROM
                                users
                            WHERE
                                userName = ?
                            """, userName)
            
            user = cursor.fetchone()

            # If the username already exists, return an error
            if user is not None:
                return func.HttpResponse("Username already exists", status_code=409)

            hashedPassword = hashlib.sha256(password.encode('utf-8')).hexdigest()

            cursor.execute(""" 
                    INSERT INTO users
                    (
                        firstName,
                        surname,   
                        email,     
                        userName,  
                        pass      	  
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )
                    """, (firstName, surname, email, userName, hashedPassword))
            
            connection.commit()

            cursor.execute("""
                            SELECT
                                id,
                                firstName,
                                surname,
                                email,
                                userName
                            FROM
                                users
                            WHERE
                                userName = ?
                           """, userName)
            
            user = cursor.fetchone()

            cursor.close()
            connection.close()

            user_info = {
                "id": user[0],
                "firstName": user[1],
                "surname": user[2],
                "email": user[3],
                "userName": user[4]
            }

            return func.HttpResponse(json.dumps(user_info), mimetype="application/json", status_code=200)

        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to register user", status_code=500)
    elif req.method == 'DELETE':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            user_id = req.params.get('user_id')

            if user_id is None:
                return func.HttpResponse("User ID is required", status_code=400)

            # check if the user exists
            cursor.execute("""
                            SELECT
                                *
                            FROM
                                users
                            WHERE
                                id = ?
                            """, user_id)
            
            user = cursor.fetchone()
            if user is None:
                return func.HttpResponse("User does not exist", status_code=404)
            
            cursor.execute("""
                            DELETE FROM
                                users
                            WHERE
                                id = ?
                            """, user_id)
            
            connection.commit()

            cursor.close()
            connection.close()

            return func.HttpResponse("User deleted successfully", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to delete user", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use POST or DELETE.',
            status_code=400
        )
