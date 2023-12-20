import azure.functions as func
from  db import db_connector
import logging
import hashlib
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    if req.method == 'POST':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            req_body = req.get_json()

            userName = req_body.get('userName')
            plain_password_from_client = req_body.get('password')

            # Retrieve user info and hashed password from the database for the given username
            cursor.execute("""
                            SELECT
                                id,
                                firstName,
                                surname,
                                email,
                                userName,
                                pass
                            FROM
                                users
                            WHERE
                                userName = ?
                           """, userName)
            
            user = cursor.fetchone()

            cursor.close()
            connection.close()

            if user is not None:
                hashed_password_from_db = user[5]

                # Check if hashed_password_from_db is not None before comparing
                if hashed_password_from_db is not None:
                    # Compare plain password from the client with the hashed password from the database
                    logging.info(f"plain_password_from_client: {plain_password_from_client}")
                    logging.info(f"hashed_password_from_db: {hashed_password_from_db}")
                    if hashlib.sha256(plain_password_from_client.encode('utf-8')).hexdigest() == hashed_password_from_db:
                        user_info = {
                            "id": user[0],
                            "firstName": user[1],
                            "surname": user[2],
                            "email": user[3],
                            "userName": user[4]
                        }
                        return func.HttpResponse(json.dumps(user_info), mimetype="application/json", status_code=200)
                    else:
                        logging.warning("Password mismatch: Incorrect password")
                        return func.HttpResponse("Invalid username or password", status_code=401)
                else:
                    logging.warning("Password mismatch: Hashed password from DB is None")
                    return func.HttpResponse("Invalid username or password", status_code=401)
            else:
                return func.HttpResponse("Invalid username or password", status_code=401)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to check if user exists", status_code=500)
    else:
        return func.HttpResponse(
                'Invalid request method. Use POST.',
                status_code=400
            )
