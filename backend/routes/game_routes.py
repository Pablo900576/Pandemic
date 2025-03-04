import json
from flask import Blueprint, jsonify, request
from db import conexionBBDD

game_routes= Blueprint("game_routes", __name__)

@game_routes.route('/nuevaPartida', methods=['POST'])
def nuevaPartida():
    mydb = conexionBBDD()
    data = request.json
    mycursor = mydb.cursor(dictionary=True)

    email = data.get("email")
    ciudades = data.get("ciudades", [])  

    if not email or not ciudades:
        return jsonify({"error": "Faltan datos (email o ciudades)"}), 400

    sql = "SELECT id FROM USUARIOS WHERE email = %s"
    sql2 = "INSERT INTO partidas (usuario_id) VALUES (%s)"
    sql3 = "SELECT id FROM partidas WHERE usuario_id = %s ORDER BY id DESC LIMIT 1"
    sql4 = "INSERT INTO estado_ciudades (partida_id, ciudad) VALUES (%s, %s)"
    

    mycursor.execute(sql, (email,))
    resultado = mycursor.fetchone()

    if not resultado:
        return jsonify({"error": "Usuario no encontrado"}), 404

    id_usuario = resultado["id"]


    mycursor.execute(sql2, (id_usuario,))
    mydb.commit()  


    mycursor.execute(sql3, (id_usuario,))
    resultadoPartida = mycursor.fetchone()

    if not resultadoPartida:
        return jsonify({"error": "Error al obtener ID de la partida"}), 500

    idPartida = resultadoPartida["id"]
    print("Partida creada con ID:", idPartida)


    try:
        for ciudad in ciudades:
            nombreCiudad = ciudad["name"]
            mycursor.execute(sql4, (idPartida, nombreCiudad))

        mydb.commit()  
        print("Ciudades insertadas correctamente")

    except Exception as e:
        print("Error al insertar ciudades:", e)
        return jsonify({"error": "Error al insertar ciudades"}), 500

    return jsonify({"status": "success", "message": "Partida y ciudades guardadas correctamente"}), 201


@game_routes.route('/guardarPartida', methods=['POST'])
def guardarEstado():
    mydb = conexionBBDD()
    mycursor = mydb.cursor(dictionary=True)

    data = request.json
    partida_id = data.get("partida_id")
    ciudades = data.get("ciudades")  
    numeroRonda= data.get("numeroRonda")

    if not partida_id or not ciudades:
        return jsonify({"error": "Faltan datos!"}), 400

    sql_update = """
        UPDATE estado_ciudades 
        SET virus_rojo = %s, virus_verde = %s, virus_azul = %s, virus_amarillo = %s, 
            brote_rojo = %s, brote_verde = %s, brote_azul = %s, brote_amarillo = %s
        WHERE partida_id = %s AND ciudad = %s
    """
    sql="update partidas set numero_ronda= %s where id = %s"

    for ciudad in ciudades:
        mycursor.execute(sql_update, (
            ciudad["diseaseCount"]["red"],
            ciudad["diseaseCount"]["green"],
            ciudad["diseaseCount"]["blue"],
            ciudad["diseaseCount"]["yellow"],
            ciudad["brotes"]["red"],
            ciudad["brotes"]["green"],
            ciudad["brotes"]["blue"],
            ciudad["brotes"]["yellow"],
            partida_id,
            ciudad["name"]
        ))
        mycursor.execute(sql,(numeroRonda, partida_id))

    mydb.commit()
    return jsonify({"status": "success", "message": "Estado de la partida guardado"}), 200


@game_routes.route('/cargarPartida/<int:partida_id>', methods=['GET'])
def cargarPartida(partida_id):
    mydb = conexionBBDD()
    mycursor = mydb.cursor(dictionary=True)

    sql = """
        SELECT ciudad, virus_rojo, virus_verde, virus_azul, virus_amarillo, 
               brote_rojo, brote_verde, brote_azul, brote_amarillo
        FROM estado_ciudades WHERE partida_id = %s
    """
    sql2="select numero_ronda from partidas where id = %s"
    mycursor.execute(sql, (partida_id,))
    ciudades_estado = mycursor.fetchall()

    if not ciudades_estado:
        return jsonify({"error": "No se encontró la partida"}), 404

    mycursor.execute(sql2,(partida_id,))
    numeroRonda= mycursor.fetchone()
    print(numeroRonda)
    # Transformar los datos al formato esperado
    ciudades_formateadas = []
    for ciudad in ciudades_estado:
        ciudades_formateadas.append({
            "name": ciudad["ciudad"],
            "diseaseCount": {
                "red": ciudad["virus_rojo"],
                "green": ciudad["virus_verde"],
                "blue": ciudad["virus_azul"],
                "yellow": ciudad["virus_amarillo"]
            },
            "brotes": {
                "red": ciudad["brote_rojo"],
                "green": ciudad["brote_verde"],
                "blue": ciudad["brote_azul"],
                "yellow": ciudad["brote_amarillo"]
            }
        })

    return jsonify({"status": "success", "partida_id": partida_id, "ciudades_estado": ciudades_formateadas, "numeroRonda": numeroRonda}), 200


@game_routes.route('/listarPartidas/<string:email>', methods=['GET'])
def listarPartidas(email):
    mydb = conexionBBDD()
    mycursor = mydb.cursor(dictionary=True)

    sql = """
        SELECT id, fecha_inicio FROM partidas 
        WHERE usuario_id = (SELECT id FROM usuarios WHERE email = %s)
    """

    mycursor.execute(sql, (email,))
    partidas = mycursor.fetchall()

    if not partidas:
        print("error")
        return jsonify({"error": "No se encontraron partidas para este usuario"}), 404

    return jsonify({"status": "success", "partidas": partidas}), 200


@game_routes.route('/obtenerPartida/<email>', methods=['GET'])
def obtener_partida(email):
    mydb = conexionBBDD()
    mycursor = mydb.cursor(dictionary=True)

    sql = "SELECT p.id FROM partidas p join usuarios u on p.usuario_id = u.id  WHERE u.email = %s ORDER BY fecha_inicio DESC LIMIT 1"
    mycursor.execute(sql, (email,))
    partida = mycursor.fetchone()

    if partida:
        return jsonify({"partida_id": partida["id"]}), 200
    else:
        return jsonify({"message": "No hay partida activa para este usuario"}), 404