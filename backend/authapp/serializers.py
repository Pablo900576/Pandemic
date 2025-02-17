from rest_framework import serializers 
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'nick', 'email', 'contraseña']
        extra_kwargs = {'contraseña': {'write_only': True}} 