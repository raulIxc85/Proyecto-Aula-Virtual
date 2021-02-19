from rest_framework import serializers
from django.contrib.auth.models import User
from api.serializers.profile import ProfileRegistroSerializer, ProfileRegistroSerializerCatedratico, ProfileSerializer


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileRegistroSerializer()
      
    class Meta:
        model = User
        fields = (
            'username',
            'password',
            'profile'
        )


class UserSerializerCatedratico(serializers.ModelSerializer):

    profile = ProfileRegistroSerializerCatedratico()
      
    class Meta:
        model = User
        fields = (
            'username',
            'password',
            'profile'
        )



class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
            'last_login'
        )
