import mysql.connector
import bcrypt
import json
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

def hashPw(password: str) -> str:
  salt= bcrypt.gensalt()
  pwHasheada = bcrypt.hashpw(password.encode('utf-8'), salt)
  return pwHasheada.decode('utf-8')

def verificarPw(password: str, hash: str):
  return bcrypt.checkpw(password.encode('utf-8'), hash.encode('utf-8'))


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


    pwHash= hashPw(password)
    print(password)
    print(pwHash)
    sql = "INSERT INTO usuarios (email, nombre, password, apellido, nick) values (%s, %s, %s, %s, %s)"

    valores=(email, nombre, pwHash, apellido, nick)

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
    print(password)
    resultado= mycursor.fetchone()
    print(resultado)
    if resultado is not None:
      nombre= resultado['nombre']
      nick= resultado['nick']
      print(nombre)
      print(nick)
      correcta= verificarPw(password, resultado['password'])
      if correcta:
        print("Logueado")
        return jsonify({
          "status": "success", 
          "message": f"Se logeo correctamente a:  {email} ", 
          "nombre": nombre, 
          "nick": nick, 
          "email": email}), 200
      
      else: 
        print("No logueado")
        return jsonify({"status": "error", "message": "Error al loguear" }), 401
    else:
      print("No logueado, no encontrado")
      return jsonify({"status":"error", "message": "Usuario no encontrado" }), 402

  except Exception as ex:
    return jsonify({"error": str(ex)}), 500
  


@app.route('/nuevaPartida', methods=['POST'])
def nuevaPartida():

  try:
    data= request.json
    mycursor = mydb.cursor(dictionary=True)

    email=data.get("email")
    print(data)
    if not all([email]):
      return jsonify({"error": "Faltan datos!!"}), 400



    sql = "SELECT id FROM USUARIOS where email = %s"
    sql2="Insert into partidas (usuario_id) values(%s)"
    sql3="select id from partidas where usuario_id = %s"
    sql4="insert into estado_ciudades(partida_id, ciudad) values(%s, %s)"
    
    mycursor.execute(sql, (email,))

    resultado = mycursor.fetchone()
    id=resultado["id"]
    if resultado is not None:
      insertPartida= mycursor.execute(sql2, id)
      mydb.commit()
      selectID=mycursor.execute(sql3, id)
      if insertPartida is not None:
        print("partida subida")
        resultadoPartida= selectID.fetchone()
        idPartida= resultadoPartida["id"]
        print("Partida creada con ID:", idPartida)

        with open("ciudadesEuropa.json", "r", encoding="utf-8") as file:
          data= json.load(file)
        for ciudad in data:
          nombreCiudad = ciudad["name"]
          mycursor.execute(sql4,(idPartida,nombreCiudad))
        mydb.commit
        print("Ciudades insertadas")
      else:
        print("Error con el ID de la partida!!!")
    else:
      print("usuario no encontrado")



    mydb.commit()

    return jsonify({"status": "success", "message": f"Se inserto correctamente a:  {email} "}), 201

  except Exception as ex:
    return jsonify({"error": str(ex)}), 500



@app.route('/guardarPartida', methods=['POST'])
def guardarPartida():

  try:
    data= request.json
    mycursor = mydb.cursor(dictionary=True)

    email=data.get("email")


    if not all([email]):
      return jsonify({"error": "Faltan datos!!"}), 400



    sql = "SELECT FROM USUARIOS (id) where email = %s"
    sql2="select id from partidas where usuario_id = %s"
    sql3=""
    mycursor.execute(sql, (email),)

    resultado = mycursor.fetchone()
    id=resultado["id"]
    if resultado is not None:
      mycursor.execute(sql2, id)
      mycursor.execute(sql3, id)
      print("partida subida")
      resultadoPartida= mycursor.fetchone()
      idPartida= resultadoPartida["id"]



    else:
      print("usuario no encontrado")



    mydb.commit()

    return jsonify({"status": "success", "message": f"Se inserto correctamente a:  {email} "}), 201

  except Exception as ex:
    return jsonify({"error": str(ex)}), 500



  
if __name__ == '__main__':
    app.run(debug=True)



