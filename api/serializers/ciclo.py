#Ciclo Serializer
from rest_framework import serializers
from api.models import Ciclo

class CicloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo
        fields = (
            'id',
            'ciclo'
        )


class CicloRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo
        fields = ('ciclo',)

