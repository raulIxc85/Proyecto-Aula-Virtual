#Modelo Rol
from django.db import models

class Rol(models.Model):

    descripcion = models.CharField(
        max_length=60,
        unique=True,
        error_messages={
            'unique': 'El rol ya existe'
        }
    )
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.descripcion
    

    def delete(self, *args):
        self.activo = False
        self.save()
        return True