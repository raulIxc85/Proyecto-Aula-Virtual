# AsignacionCatedratico Serializer
from rest_framework import serializers
from api.models import AsignacionCurso

class AsignacionEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionCurso
        fields = (
            'id',
            'estudiante',
            'asignacionCatedratico'
        )
        depth = 2

class AsignacionEstudianteRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionCurso
        fields = (
            'estudiante',
        )

