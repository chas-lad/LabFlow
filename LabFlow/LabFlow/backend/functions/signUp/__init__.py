import azure.functions as func
from  db import db_connector
import logging
import hashlib

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

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
            cursor.close()
            connection.close()

            return func.HttpResponse("User registered successfully", status_code=200)

        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to register user", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use POST.',
            status_code=400
        )
