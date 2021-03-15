#EntregaTarea serializer
from rest_framework import serializers
from api.models import EntregaTarea
from api.serializers import EstudianteSerializer

class EntregaTareaSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer()
    class Meta:
        model = EntregaTarea
        fields = (
            'id',
            'archivo',
            'texto',
            'notaTarea',
            'estudiante'
        )
    depth = 1

class EntregaTareaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntregaTarea
        fields = (
            'archivo',
            'texto',
        )

