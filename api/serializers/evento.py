#Evento Serializer
from rest_framework import serializers
from api.models import Evento

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'id',
            'titulo',
            'descripcion'
        )

class EventoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'titulo',
            'descripcion'
        )


        