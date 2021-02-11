#Modelo Profesion
from django.db import models
from django.contrib.auth.models import User

class Profesion(models.Model):
    
    descripcion = models.CharField(
        unique=True,
        max_length=50,
        error_messages={
            'unique': 'Profesion ya existe'
        }
    )
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    usuario = models.ForeignKey(
        User, 
        related_name='usuarioProfesion',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True