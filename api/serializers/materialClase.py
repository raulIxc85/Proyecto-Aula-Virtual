#MaterialClase Serializer
from rest_framework import serializers
from api.models import MaterialClase

class MaterialClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
            'id',
            'tituloMaterial',
            'descripcionMaterial',
            'archivo'
        )


class MaterialClaseRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
            'tituloMaterial',
            'descripcionMaterial',
        )

