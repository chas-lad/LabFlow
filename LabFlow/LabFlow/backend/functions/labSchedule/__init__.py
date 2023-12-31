import os
import logging
from  db import db_connector
import json
import azure.functions as func

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
                                ts.id,
                                ts.module,
                                ts.lecturerName,
                                ts.dayOfWeek,
                                FORMAT(ts.startTime, 'HH:mm') AS startTime,
                                CONVERT(VARCHAR, CAST(DATEDIFF(MINUTE, ts.startTime, ts.endTime) / 60 AS VARCHAR(2))) + ':' +
                                RIGHT('0' + CAST(DATEDIFF(MINUTE, ts.startTime, ts.endTime) % 60 AS VARCHAR(2)), 2) AS classLength,
                                l.labName
                            FROM
                                teachingSchedule ts
                            JOIN
                                labs l ON ts.labId = l.id;
                            """)
                schedule = cursor.fetchall()

                # Convert the result to a list of dictionaries
                schedule_list = [dict(zip([column[0] for column in cursor.description], row)) for row in schedule]

                cursor.close()
                connection.close()

                # Return the result as JSON
                return func.HttpResponse(json.dumps(schedule_list), mimetype="application/json", status_code=200)

            except Exception as e:
                logging.error(f"Error: {str(e)}")
                return func.HttpResponse("Failed to retrieve lab schedules", status_code=500)
    else:
        return func.HttpResponse(
            'Invalid request method. Use GET.',
            status_code=400
        )
