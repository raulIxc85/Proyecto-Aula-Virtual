#Model Nivel
from django.db import models

class Nivel(models.Model):

    nombre = models.CharField(
        unique=True,
        max_length=50,
        error_messages={
            'unique': 'Nivel ya existe'
        }
    )
    descripcion = models.TextField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.nombre


    def delete(self, *args):
        self.activo = False
        self.save()
        return True