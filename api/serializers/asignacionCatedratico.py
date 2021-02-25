# AsignacionCatedratico Serializer
from rest_framework import serializers
from api.models import AsignacionCatedraticoCurso

class AsignacionCatedraticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionCatedraticoCurso
        fields = (
            'id',
            'titular',
            'catedratico',
            'curso',
            'ciclo',
            'grado',
            'seccion'
        )
        depth = 2

class AsignacionCatedraticoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionCatedraticoCurso
        fields = (
            'titular',
            'catedratico',
            'curso',
            'grado',
            'seccion'
        )

