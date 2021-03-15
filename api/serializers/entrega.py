#Entregas serializer
from rest_framework import serializers
from api.models import Entrega
from api.serializers.entregaTarea import EntregaTareaSerializer
from api.serializers.tarea import TareaSerializer

class EntregaSerializer(serializers.ModelSerializer):
    estudiante = EntregaTareaSerializer()
    tarea = TareaSerializer()
    class Meta:
        model = Entrega
        fields = (
            'estudiante',
            'tarea'
        )

