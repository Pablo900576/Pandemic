import mysql.connector

def conexionBBDD():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pandemic"
    )