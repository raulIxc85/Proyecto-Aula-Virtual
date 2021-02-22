#Grado View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Grado
from api.models import Nivel
from api.serializers import GradoSerializer, GradoRegistroSerializer

class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("descripcion",)
    search_fields = ("descripcion")
    ordering_fields = ("descripcion")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        

    def create(self, request):
        try:
            user = request.user
            datos = request.data

            #validacion de los datos al serializer
            serializer = GradoRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Grado.objects.create(
                    descripcion = datos.get("descripcion"),
                    nivel = Nivel.objects.get(pk = datos.get("nivel")),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                datos = request.data
              
                #Modificar datos Grado
                grado = Grado.objects.get(pk=datos.get("id"))
                grado.descripcion = datos.get("descripcion")
                grado.nivel = Nivel.objects.get(pk = datos.get("nivel"))
                grado.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

