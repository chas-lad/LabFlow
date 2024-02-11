###########################################################
## Title:       Users API
## Methods:     GET
###########################################################

import os
import logging
from db import db_connector
import azure.functions as func
import json

API_KEY = os.environ.get("API_KEY")

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    api_key = req.headers.get("x-api-key")

    # Check if the API key is valid
    if api_key != API_KEY:
        return func.HttpResponse("Unauthorized: Invalid API key", status_code=401)

    if req.method == 'GET':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            cursor.execute("""
                           SELECT
                                id,
                                firstName,
                                surname,
                                email,
                                userName
                           FROM 
                                users
                           """)
                           
            users = cursor.fetchall()

            # Convert the result to a list of dictionaries
            users_list = [dict(zip([column[0] for column in cursor.description], row)) for row in users]

            cursor.close()
            connection.close()

            # Return the result as JSON
            return func.HttpResponse(json.dumps(users_list), mimetype="application/json", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to retrieve users data", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use GET.',
            status_code=400
        )
