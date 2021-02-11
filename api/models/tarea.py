#Modelo Tarea
from django.db import models
from api.models.asignacionCurso import AsignacionCurso

class Tarea(models.Model):

    tituloTarea = models.CharField(
        unique=True,
        max_length=50,
        error_messages={
            'unique': 'Titulo de la tarea ya existe'
        }
    )
    descripcion = models.TextField()
    documentoAdjunto = models.BinaryField()
    fechaHoraEntrega = models.DateTimeField(auto_now_add=True)
    aceptaDocumento = models.BooleanField(default=True)
    valorTarea = models.DecimalField(max_digits=4,decimal_places=2)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    

    curso = models.ForeignKey(
        AsignacionCurso, 
        related_name='tareaCurso',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.descripcion + "-" + self.curso


    def delete(self, *args):
        self.activo = False
        self.save()
        return True

