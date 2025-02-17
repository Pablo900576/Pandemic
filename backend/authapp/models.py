from django.db import models

# Create your models here.

class Usuario(models.Model):
    nombre= models.CharField(max_length=50)
    apellido= models.CharField(max_length=50)
    nick = models.CharField(max_length=50, unique=True)
    email= models.EmailField(unique=True)
    contraseña=models.CharField(max_length=255)

    class Meta:
        db_table='usuarios'

    def __str__(self):
        return self.nick
    
    