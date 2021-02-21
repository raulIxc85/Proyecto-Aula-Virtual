#Nivel Serializer
from rest_framework import serializers
from api.models import Nivel

class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'id',
            'nombre',
            'descripcion'
        )

class NivelRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'nombre',
            'descripcion'
        )
