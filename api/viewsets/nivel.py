#Nivel View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from api.models import Nivel
from api.serializers import NivelSerializer, NivelRegistroSerializer

class NivelViewset(viewsets.ModelViewSet):
    queryset = Nivel.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre")
    ordering_fields = ("nombre")

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return NivelSerializer
        else:
            return NivelRegistroSerializer
    

    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

