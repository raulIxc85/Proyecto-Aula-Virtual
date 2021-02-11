#Modelo Asignacion Curso
from django.db import models
from api.models.asignacionCatedraticoCurso import AsignacionCatedraticoCurso
from api.models.estudiante import Estudiante
from django.contrib.auth.models import User

class AsignacionCurso(models.Model):

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    asignacionCatedratico = models.ManyToManyField(
        AsignacionCatedraticoCurso,
        related_name="cursoEstudiante"
    )

    estudiante = models.ForeignKey(
        Estudiante, 
        related_name='asignacionEstudiante', 
        on_delete=models.PROTECT
    )
    usuario = models.ForeignKey(
        User, 
        related_name='usuarioAsignacionCurso', 
        on_delete=models.PROTECT
    )


    def __str__(self):
        return self.asignacionCatedratico + "-" + self.estudiante + "-"


    def delete(self, *args):
        self.activo = False
        self.save()
        return True