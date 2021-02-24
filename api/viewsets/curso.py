#Curso View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Curso
from api.serializers import CursoSerializer, CursoRegistroSerializer

class CursoViewset(viewsets.ModelViewSet):
    queryset = Curso.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre")
    ordering_fields = ("nombre")

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CursoSerializer
        if self.action == 'update':
            return CursoRegistroSerializer


    def create(self, request):
        try:
            user = request.user
            datos = request.data
            #validacion de los datos al serializer
            serializer = CursoRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Curso.objects.create(
                    nombre = datos.get("nombre"),
                    descripcion = datos.get("descripcion"),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'Registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)




    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

