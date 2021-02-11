#Modelo Catedratico
from django.db import models
from api.models.profesion import Profesion
from api.models.profile import Profile

class Catedratico(models.Model):

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    profesion = models.ForeignKey(
        Profesion, 
        related_name='catedraticoProfesion',
        on_delete=models.PROTECT
    )

    perfil = models.OneToOneField(
        Profile,
        on_delete=models.PROTECT, 
        related_name="profileCatedratico"
    )
   

    def __str__(self):
        return profesion.descripcion + "-" + perfil.nombres + "-" + perfil.apellidos


    def delete(self, *args):
        self.activo = False
        self.save()
        return True