#Rol View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


from api.models import Rol
from api.serializers import RolSerializer, RolRegistroSerializer


class RolViewset(viewsets.ModelViewSet):
    queryset = Rol.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("descripcion",)
    search_fields = ("descripcion")
    ordering_fields = ("descripcion")
    

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return RolSerializer
        else:
            return RolRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]