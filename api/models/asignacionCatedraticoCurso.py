#Modelo Asignacion Catedratico
from django.db import models
from api.models.catedratico import Catedratico
from api.models.curso import Curso
from api.models.ciclo import Ciclo
from api.models.grado import Grado
from api.models.seccion import Seccion
from django.contrib.auth.models import User

class AsignacionCatedraticoCurso(models.Model):

    titular = models.BooleanField(default=True)
    imagenPortada = models.TextField(null=True, blank=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    catedratico = models.ForeignKey(
        Catedratico, 
        related_name='asignacionCatedratico', 
        on_delete=models.PROTECT
    )
    curso = models.ForeignKey(
        Curso, 
        related_name='asignacionCurso', 
        on_delete=models.PROTECT
    )
    ciclo = models.ForeignKey(
        Ciclo,
        related_name='asignacionCiclo', 
        on_delete=models.PROTECT
    )
    grado = models.ForeignKey(
        Grado, 
        related_name='asignacionGrado',
        on_delete=models.PROTECT
    )
    seccion = models.ForeignKey(
        Seccion,
        related_name='asignacionSeccion', 
        on_delete=models.PROTECT
    )
    usuario = models.ForeignKey(
        User,
        related_name='usuarioAsignacionCatedratico', 
        on_delete=models.PROTECT
    )


    def __str__(self):
        return self.catedratico + "-" + curso.nombre + "-" + ciclo.ciclo + "-" + seccion.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True