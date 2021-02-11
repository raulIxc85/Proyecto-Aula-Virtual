#Modelo Seccion
from django.db import models
from django.contrib.auth.models import User

class Seccion(models.Model):

    descripcion = models.CharField(
        max_length=50,
        unique=True,
         error_messages={
            'unique': 'Ya existe la seccion'
        }
    )
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
        
    usuario = models.ForeignKey(
        User, 
        related_name='usuarioSeccion',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.descripcion
    

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
