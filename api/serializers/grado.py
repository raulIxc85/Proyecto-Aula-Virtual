#Grado Serializer
from rest_framework import serializers
from api.models import Grado
from api.serializers.nivel import NivelSerializer

class GradoSerializer(serializers.ModelSerializer):
    nivel = NivelSerializer()
    class Meta:
        model = Grado
        fields = (
            'id',
            'descripcion',
            'nivel',
        )
        depth = 1

class GradoRegistroSerializer(serializers.ModelSerializer):
     class Meta:
        model = Grado
        fields = ('descripcion',)
