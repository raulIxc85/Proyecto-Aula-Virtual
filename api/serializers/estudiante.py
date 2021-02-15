#Estudiante Serializers
from rest_framework import serializers
from api.models import Estudiante
from api.models import Profile

class ProfileSerializerEstudiante(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'nombres',
            'apellidos',
            'direccion',
            'telefono',
            'gender'
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

