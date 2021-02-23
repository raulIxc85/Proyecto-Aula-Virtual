#Ciclo View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Ciclo
from api.serializers import CicloSerializer, CicloRegistroSerializer

class CicloViewset(viewsets.ModelViewSet):
    queryset = Ciclo.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("ciclo",)
    search_fields = ("ciclo")
    ordering_fields = ("ciclo")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CicloSerializer
        

    def create(self, request):
        try:
            user = request.user
            datos = request.data

            #validacion de los datos al serializer
            serializer = CicloRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                ciclo = Ciclo.objects.latest('ciclo')
                ciclo.activo = False
                ciclo.save()
                Ciclo.objects.create(
                    ciclo = datos.get("ciclo"),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'detail': 'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

