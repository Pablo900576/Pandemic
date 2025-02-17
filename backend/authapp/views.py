from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer
from django.contrib.auth.hashers import make_password
# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        data = request.data
        data['contraseña'] = make_password(data['contraseña']) 
        serializer = UsuarioSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Usuario registrado correctamente'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)