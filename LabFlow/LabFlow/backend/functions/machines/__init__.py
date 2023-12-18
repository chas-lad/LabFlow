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

            labID = req_body.get('labID')

            cursor.execute("""
                           SELECT
                                *
                           FROM 
                                machines
                           WHERE
                                labID = ?
                           """, (labID))
                           
            machines = cursor.fetchall()

             # Convert the result to a list of dictionaries
            machines_list = [dict(zip([column[0] for column in cursor.description], row)) for row in machines]

            logging.info(machines_list)
            cursor.close()
            connection.close()

            # Return the result as JSON
            return func.HttpResponse(json.dumps(machines_list), mimetype="application/json", status_code=200)
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse("Failed to retrieve machines data", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use POST.',
            status_code=400
        )
