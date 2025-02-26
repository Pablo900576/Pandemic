import bcrypt
from flask import Blueprint, jsonify, request
from db import conexionBBDD
from hash import hashPw, verificarPw

auth_routes= Blueprint("auth_routes", __name__)




@auth_routes.route('/registro', methods=['POST'])
def registrarUsuario():
  mydb= conexionBBDD()
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

  

@auth_routes.route('/login', methods=['POST'])
def logearUsuario():
  data= request.json
  mydb= conexionBBDD()
  mycursor = mydb.cursor(dictionary=True)

  email=data.get("email")
  password=data.get("pw")


  if not all([email,password]):
    return jsonify({"error": "Faltan datos!!"}), 400



  sql = "select email, password, nombre, nick from usuarios where email = %s"


  mycursor.execute(sql, (email,))

  resultado= mycursor.fetchone()

  if resultado is not None:
    nombre= resultado['nombre']
    nick= resultado['nick']

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
      print(resultado)
      print("No logueado")
      return jsonify({"status": "error", "message": "Error al loguear" }), 401
  else:
    print("No logueado, no encontrado")
    return jsonify({"status":"error", "message": "Usuario no encontrado" }), 402
