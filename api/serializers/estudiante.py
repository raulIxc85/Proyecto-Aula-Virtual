#Estudiante Serializers
from rest_framework import serializers
from api.models import Estudiante
from api.models import Profile
from django.contrib.auth.models import User

class UserSerializerEstudiante(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username'
        )

class ProfileSerializerEstudiante(serializers.ModelSerializer):
    user = UserSerializerEstudiante()
    class Meta:
        model = Profile
        fields = (
            'nombres',
            'apellidos',
            'direccion',
            'telefono',
            'gender',
            'rol',
            'user'
        )

class EstudianteSerializer(serializers.ModelSerializer):
    perfil = ProfileSerializerEstudiante()
    class Meta:
        model = Estudiante
        fields = (
            'id',
            'carnet',
            'nombreContacto',
            'direccionContacto',
            'telefonoContacto',
            'perfil'
        )


class EstudianteRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = (
            'carnet',
            'nombreContacto',
            'telefonoContacto',
            'direccionContacto'    
        )

