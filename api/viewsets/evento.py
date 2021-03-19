#Evento View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.permisos import Administrador

from api.models import Evento
from api.models import Ciclo
from api.serializers import EventoSerializer, EventoRegistroSerializer

class EventoViewset(viewsets.ModelViewSet):
    queryset = Evento.objects.filter(activo=True)
    #define permiso para este recurso
    permission_classes = (Administrador,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("titulo",)
    search_fields = ("titulo",)
    ordering_fields = ("titulo",)


    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventoSerializer
        if self.action == 'update':
            return EventoRegistroSerializer
    
    
    def create(self, request):
        try:
            user = request.user
            datos = request.data
            #validacion de los datos al serializer
            serializer = EventoRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                cicloActivo = Ciclo.objects.get(activo=True)
                Evento.objects.create(
                    titulo = datos.get("titulo"),
                    descripcion = datos.get("descripcion"),
                    fecha = datos.get("fecha"),
                    hora = datos.get("hora"),
                    ciclo = Ciclo.objects.get(pk = cicloActivo.id),
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

