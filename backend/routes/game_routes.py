import json
from flask import Blueprint, jsonify, request
from db import conexionBBDD

game_routes= Blueprint("game_routes", __name__)

@game_routes.route('/nuevaPartida', methods=['POST'])
def nuevaPartida():

    mydb=conexionBBDD()
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