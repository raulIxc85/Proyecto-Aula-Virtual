#Catedratico Serializers
from rest_framework import serializers
from api.models import Catedratico
from api.models import Profile
from django.contrib.auth.models import User

class UserSerializerCatedratico(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username'
        )

class ProfileSerializerCatedratico(serializers.ModelSerializer):
    user = UserSerializerCatedratico()
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

class CatedraticoSerializer(serializers.ModelSerializer):
    perfil = ProfileSerializerCatedratico()
    class Meta:
        model = Catedratico
        fields = (
            'id',
            'perfil',
            'profesion'
        )
        depth = 1

class CatedraticoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catedratico
        fields = ('profesion',)

