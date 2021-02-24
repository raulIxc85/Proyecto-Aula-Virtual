#Modelo Grado
from django.db import models
from api.models.nivel import Nivel
from django.contrib.auth.models import User

class Grado(models.Model):

    descripcion = models.CharField(
        max_length=50,
        unique=True,
         error_messages={
            'unique': 'Ya existe el grado'
        }
    )
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    
    nivel = models.ForeignKey(
        Nivel, 
        related_name='gradoNivel', 
        on_delete=models.PROTECT
    )
    usuario = models.ForeignKey(
        User, 
        related_name='usuarioGrado',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True