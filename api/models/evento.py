#Model Evento
from django.db import models
from api.models.ciclo import Ciclo

class Evento(models.Model):

    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha = models.DateField()
    hora = models.TimeField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    

    ciclo = models.ForeignKey(
        Ciclo, 
        related_name='cicloEvento',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.titulo + "-" + self.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True