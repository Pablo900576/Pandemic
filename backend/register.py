import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="pandemic"
)


@app.route('/registro', methods=['POST'])
def registrarUsuario():

  try:
    data= request.json
    mycursor = mydb.cursor(dictionary=True)

    email=data.get("email")
    nombre=data.get("nombre")
    password=data.get("pw")
    apellido=data.get("apellido")
    nick=data.get("nick")

    if not all([email, nombre, password, apellido, nick]):
      return jsonify({"error": "Faltan datos!!"}), 400



    sql = "INSERT INTO usuarios (email, nombre, password, apellido, nick) values (%s, %s, %s, %s, %s)"

    valores=(email, nombre, password, apellido, nick)

    mycursor.execute(sql, valores)

    mydb.commit()

    return jsonify({"status": "success", "message": f"Se inserto correctamente a:  {email} "}), 201

  except Exception as ex:
    return jsonify({"error": str(ex)}), 500
  

@app.route('/login', methods=['POST'])
def logearUsuario():

  try:
    data= request.json

    mycursor = mydb.cursor(dictionary=True)
    email=data.get("email")
    password=data.get("pw")


    if not all([email,password]):
      return jsonify({"error": "Faltan datos!!"}), 400



    sql = "select email, password, nombre, nick from usuarios where email = %s"


    mycursor.execute(sql, (email,))

    resultado= mycursor.fetchone()
    for row in resultado:
      print(resultado)
      print("hola")


   
    return jsonify({"status": "success", "message": f"Se logeo correctamente a:  {email} "}), 201

  except Exception as ex:
    return jsonify({"error": str(ex)}), 500
  

  
if __name__ == '__main__':
    app.run(debug=True)



