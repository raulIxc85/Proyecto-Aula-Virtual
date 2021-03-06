#Tarea Serializer
from rest_framework import serializers
from api.models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'id',
            'tituloTarea',
            'valorTarea',
            'descripcion',
            'fechaHoraEntrega',
            'asignacion',
            'archivo'
        )
        depth = 1

class TareaRegistroSerializer(serializers.ModelSerializer):
     class Meta:
        model = Tarea
        fields = (
            'tituloTarea',
            'descripcion',
            'fechaHoraEntrega',
            'valorTarea'
        )
