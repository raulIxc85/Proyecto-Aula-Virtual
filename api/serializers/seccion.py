#Seccion Serializer
from rest_framework import serializers
from api.models import Seccion

class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = (
            'id',
            'descripcion'
        )

class SeccionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = ('descripcion',)

