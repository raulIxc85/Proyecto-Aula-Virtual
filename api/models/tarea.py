#Modelo Tarea
from django.db import models
from api.models.asignacionCatedraticoCurso import AsignacionCatedraticoCurso

class Tarea(models.Model):

    tituloTarea = models.CharField(
        unique=True,
        max_length=50
    )
    descripcion = models.TextField()
    fechaHoraEntrega = models.DateTimeField()
    archivo = models.FileField(upload_to='tareas', blank=True , null=True)
    valorTarea = models.DecimalField(max_digits=4,decimal_places=2)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    asignacion = models.ForeignKey(
        AsignacionCatedraticoCurso, 
        related_name='tareaCurso',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.tituloTarea


    def delete(self, *args):
        self.activo = False
        self.save()
        return True

