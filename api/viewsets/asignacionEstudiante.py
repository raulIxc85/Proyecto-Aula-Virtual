# AsignacionCatedratico Viewset
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import AsignacionCurso
from api.models import Estudiante
from api.serializers import AsignacionEstudianteSerializer, AsignacionEstudianteRegistroSerializer

class AsignacionEstudianteViewset(viewsets.ModelViewSet):
    queryset = AsignacionCurso.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante", )
    search_fields = ("estudiante", )
    ordering_fields = ("estudiante", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionEstudianteSerializer
        

    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                datos = request.data
        
                #validacion de los datos al serializer
                serializer = AsignacionEstudianteRegistroSerializer(data=datos)
                print(serializer)
                if serializer.is_valid():
                    #insertar los datos luego de validar
                    curso = AsignacionCurso(
                        estudiante = Estudiante.objects.get(pk = datos.get("estudiante")),
                        usuario = user
                    )
                    curso.save()
                    curso.asignacionCatedratico.add(datos.get("asignacionCatedratico"))
                else:
                    print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

