import subprocess


try:
    subprocess.Popen(["python", "app.py"])  # Cambia "app.py" por el nombre de tu archivo principal
    print("Backend iniciado correctamente")
except Exception as e:
    print(f"Error al iniciar el backend: {e}")