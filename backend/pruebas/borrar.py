
import mysql.connector


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="pandemic"
)
mycursor = mydb.cursor()

try:
    

    mycursor.execute("SELECT COUNT(*) FROM usuarios")
    total_registros = mycursor.fetchone()[0]


    sql = "TRUNCATE TABLE usuarios"
    mycursor.execute(sql)
    
    mydb.commit()
    print(f"{total_registros} registros eliminados")
except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    mycursor.close()
    mydb.close()