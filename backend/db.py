# connect to mysql
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="172.235.35.200",
        user="elevateApp",
            password="StrongPassword123!",
                database="elevateBase"
)