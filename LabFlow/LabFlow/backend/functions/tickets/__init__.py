###########################################################
## Title:       Tickets API
## Methods:     POST
###########################################################

import os
import logging
from db import db_connector
import azure.functions as func
from datetime import datetime

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
            labID = req_body.get('labID')
            issueDescription = req_body.get('issueDescription')
            issueStatus = req_body.get('issueStatus')
            dateCreated = req_body.get('dateCreated')
            dateResolved = req_body.get('dateResolved')

            if machineID is None or userID is None or issueDescription is None or issueStatus is None or dateCreated is None:
                return func.HttpResponse("Machine ID, user ID, issue description, issue status, and date created are required", status_code=400)
            
            dateCreated = datetime.fromisoformat(dateCreated)
            
            # Compare with the current datetime
            if dateCreated > datetime.now():
                return func.HttpResponse("Date created cannot be ahead of the current date", status_code=400)

            cursor.execute("""
                           INSERT INTO tickets
                            (
                                machineID,
                                labID,
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
                                ?,
                                ?
                            )
                            """, (
                                machineID,
                                labID,
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
            status_code=401
        )
    