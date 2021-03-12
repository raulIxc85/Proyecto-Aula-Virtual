#Entregas serializer
from rest_framework import serializers
from api.models import Entrega
from api.serializers.entregaTarea import EntregaTareaSerializer

class EntregaSerializer(serializers.ModelSerializer):
    estudiante = EntregaTareaSerializer()
    class Meta:
        model = Entrega
        fields = (
            'estudiante',
        )

