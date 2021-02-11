#Modelo Ciclo
from django.db import models
from django.contrib.auth.models import User

class Ciclo(models.Model):

    ciclo = models.PositiveIntegerField(
        unique=True,
        error_messages={
            'unique': 'Ya existe el ciclo'
        }
    )
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    usuario = models.ForeignKey(
        User, 
        related_name='usuarioCiclo', 
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.ciclo


    def delete(self, *args):
        self.activo = False
        self.save()
        return True
