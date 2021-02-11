#Modelo Material Clase
from django.db import models
from api.models.asignacionCatedraticoCurso import AsignacionCatedraticoCurso

class MaterialClase(models.Model):

    tituloMaterial = models.CharField(
        unique=True,
        max_length=50,
        error_messages={
            'unique': 'Titulo del material ya existe'
        }
    )
    descripcionMaterial = models.TextField()
    documentoAdjunto = models.BinaryField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
     
    curso = models.ForeignKey(
        AsignacionCatedraticoCurso, 
        related_name='materialCatedraticoCurso', 
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.tituloMaterial + "-" + self.descripcionMaterial


    def delete(self, *args):
        self.activo = False
        self.save()
        return True