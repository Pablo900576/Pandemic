import csv
import json
import os

# Obtener la ruta absoluta del directorio actual
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Subir un nivel para llegar donde está ciudades.txt
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

def ensure_directories():
    # Crear el directorio assets/data si no existe
    output_dir = os.path.join(PROJECT_ROOT, 'assets', 'data')
    os.makedirs(output_dir, exist_ok=True)
    return output_dir

def transform_cities():
    # Ruta al archivo de entrada (ahora al mismo nivel que scripts)
    input_file = os.path.join(PROJECT_ROOT, 'ciudades.txt')
    
    # Verificar si el archivo existe
    if not os.path.exists(input_file):
        print(f"Error: No se encuentra el archivo {input_file}")
        print(f"Por favor, coloca el archivo ciudades.txt en: {PROJECT_ROOT}")
        return
    
    try:
        # Asegurar que existe el directorio de salida
        output_dir = ensure_directories()
        cities_data = []
        
        with open(input_file, 'r', encoding='utf-8') as txt_file:
            reader = csv.reader(txt_file, delimiter=";")
            
            for row in reader:
                if len(row) >= 3:
                    coordinates = list(map(int, row[2].split(',')))
                    city_data = {
                        "name": row[0].strip(),
                        "region": int(row[1]),
                        "coordinates": {
                            "x": coordinates[0],
                            "y": coordinates[1]
                        },
                        "connectedCities": [city.strip() for city in row[3].split(',')] if len(row) > 3 else [],
                        "characters": [],
                        "researchCenter": False,
                        "diseaseCount": {
                            "green": 0,
                            "red": 0,
                            "blue": 0,
                            "yellow": 0
                        }
                    }
                    cities_data.append(city_data)
        
        # Guardar el JSON
        output_file = os.path.join(output_dir, 'cities.json')
        with open(output_file, 'w', encoding='utf-8') as json_file:
            json.dump({"cities": cities_data}, json_file, indent=2, ensure_ascii=False)
            
        print(f"Transformación completada. Archivo generado en: {output_file}")
        print(f"Se procesaron {len(cities_data)} ciudades.")
        
    except Exception as e:
        print(f"Error durante la transformación: {str(e)}")

if __name__ == "__main__":
    transform_cities()