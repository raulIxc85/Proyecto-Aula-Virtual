#Estudiante View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


from api.models import Estudiante
from api.serializers import EstudianteSerializer, EstudianteRegistroSerializer
from api.serializers import UserSerializer

class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("carnet", "perfil")
    search_fields = ("carnet")
    ordering_fields = ("carnet")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return UserSerializer
    

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]