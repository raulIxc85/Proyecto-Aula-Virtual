#Modelo Estudiante
from django.db import models
from api.models.profile import Profile

class Estudiante(models.Model):

    carnet = models.CharField(max_length=25)
    nombreContacto = models.CharField(max_length=100, null=True, blank=True)
    telefonoContacto = models.CharField(max_length=10, null=True, blank=True)
    direccionContacto = models.CharField(max_length=50, null=True, blank=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    perfil = models.OneToOneField(
        Profile,
        on_delete=models.PROTECT, 
        related_name="profileEstudiante"
    )

    def __str__(self):
        return self.carnet


    def delete(self, *args):
        self.activo = False
        self.save()
        return True