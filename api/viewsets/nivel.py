#Nivel View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from api.permisos import Administrador

from api.models import Nivel
from api.serializers import NivelSerializer, NivelRegistroSerializer

class NivelViewset(viewsets.ModelViewSet):
    queryset = Nivel.objects.filter(activo=True)
    #define permiso para este recurso
    permission_classes = (Administrador,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return NivelSerializer
        else:
            return NivelRegistroSerializer
