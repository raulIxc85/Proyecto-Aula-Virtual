#Tarea Serializer
from rest_framework import serializers
from api.models import Tarea
from api.serializers.nivel import NivelSerializer

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'id',
            'tituloTarea',
            'valorTarea',
            'descripcion',
            'fechaHoraEntrega',
            'aceptaDocumento',
            
        )
        

class TareaRegistroSerializer(serializers.ModelSerializer):
     class Meta:
        model = Tarea
        fields = (
            'tituloTarea',
            'descripcion',
            'fechaHoraEntrega',
            'aceptaDocumento',
            'valorTarea'
        )
