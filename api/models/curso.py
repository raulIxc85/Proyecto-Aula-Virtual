#Modelo Curso
from django.db import models
from django.contrib.auth.models import User

class Curso(models.Model):

    nombre = models.PositiveIntegerField(
        unique=True,
        error_messages={
            'unique': 'Ya existe el curso'
        }
    )
    descripcion = models.TextField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    usuario = models.ForeignKey(
        User, 
        related_name='usuarioCurso',
        on_delete=models.PROTECT
    )
  

    def __str__(self):
        return self.nombre
    

    def delete(self, *args):
        self.activo = False
        self.save()
        return True