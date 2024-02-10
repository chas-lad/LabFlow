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

    if req.method == 'POST':
        try:
            connection = db_connector()
            cursor = connection.cursor()

            req_body = req.get_json()
            machineID = req_body.get('machineID')
            userID = req_body.get('userID')
            issueDescription = req_body.get('issueDescription')
            issueStatus = req_body.get('issueStatus')
            dateCreated = req_body.get('dateCreated')
            dateResolved = req_body.get('dateResolved')

            cursor.execute("""
                           INSERT INTO tickets
                            (
                                machineID,
                                userID,
                                issueDescription,
                                issueStatus,
                                dateCreated,
                                dateResolved
                            )
                            VALUES
                            (
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?
                            )
                            """, (
                                machineID,
                                userID,
                                issueDescription,
                                issueStatus,
                                dateCreated,
                                dateResolved
                            ))
            
            connection.commit()

            cursor.close()
            connection.close()

            return func.HttpResponse("Ticket created", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to create a ticket", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use POST.',
            status_code=400
        )

