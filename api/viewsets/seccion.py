#Seccion View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Seccion
from api.serializers import SeccionSerializer, SeccionRegistroSerializer

class SeccionViewset(viewsets.ModelViewSet):
    queryset = Seccion.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("descripcion",)
    search_fields = ("descripcion",)
    ordering_fields = ("descripcion",)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SeccionSerializer
        if self.action == 'update':
            return SeccionRegistroSerializer

    def create(self, request):
        try:
            user = request.user
            datos = request.data

            #validacion de los datos al serializer
            serializer = SeccionRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Seccion.objects.create(
                    descripcion = datos.get("descripcion"),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

