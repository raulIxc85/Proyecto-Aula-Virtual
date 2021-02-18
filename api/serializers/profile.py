#Profile serializers
from rest_framework import serializers
from api.models import Profile
from api.serializers.estudiante import EstudianteRegistroSerializer
from api.serializers.catedratico import CatedraticoRegistroSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileRegistroSerializer(serializers.ModelSerializer):
    
    estudiante = EstudianteRegistroSerializer()

    class Meta:
        model = Profile
        fields = (
            'nombres', 
            'apellidos',
            'direccion',
            'telefono',
            'gender',
            'estudiante',
            'rol'
        )


class ProfileRegistroSerializerCatedratico(serializers.ModelSerializer):
    
    catedratico = CatedraticoRegistroSerializer()

    class Meta:
        model = Profile
        fields = (
            'nombres', 
            'apellidos',
            'direccion',
            'telefono',
            'gender',
            'catedratico',
            'rol'
        )