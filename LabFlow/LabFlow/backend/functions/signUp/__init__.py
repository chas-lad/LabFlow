import azure.functions as func
from  db import db_connector
import logging
import bcrypt

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
            userName = req_body.get('username')
            password = req_body.get('hashedPassword')

            # Hash the password
            # In the context of password storage, "salting" a password means appending or prepending a random string to the password
            # before hashing it. This makes the hash output unique even for identical input passwords, which adds an extra layer of security.
            # When a user logs in, you would hash the password they provide with the same salt you used when you stored their password.
            # The bcrypt library handles this for you: when you hash a password with bcrypt, the salt is included in the resulting hash string.
            # This means you can store the hash string directly in your database, and bcrypt will be able to check a provided password against the
            # hashed password correctly.
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

            cursor.execute(""" 
                    INSERT INTO users
                    (
                        firstName,
                        surname,   
                        email,     
                        userName,  
                        password      	  
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )
                    """, (firstName, surname, email, userName, hashed_password))

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
