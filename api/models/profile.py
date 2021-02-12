#Modelo Profile
from django.db import models
from django.contrib.auth.models import User
from api.models.rol import Rol

class Profile(models.Model):

    MALE = 0
    FEMALE = 1

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    direccion = models.CharField(max_length=50,blank=True, null=True)
    telefono = models.CharField(max_length=10,blank=True, null=True)

    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    rol = models.ForeignKey(Rol, on_delete=models.PROTECT, related_name="rol")


    def __unicode__(self):
        return self.user.username


    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
