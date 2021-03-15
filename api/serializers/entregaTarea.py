#EntregaTarea serializer
from rest_framework import serializers
from api.models import EntregaTarea

class EntregaTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntregaTarea
        fields = (
            'id',
            'archivo',
            'texto',
            'notaTarea'
        )


class EntregaTareaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntregaTarea
        fields = (
            'archivo',
            'texto',
        )

