#MaterialClase View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import MaterialClase
from api.models import AsignacionCatedraticoCurso
from api.serializers import MaterialClaseSerializer, MaterialClaseRegistroSerializer

class MaterialClaseViewset(viewsets.ModelViewSet):
    queryset = MaterialClase.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("tituloMaterial",)
    search_fields = ("tituloMaterial",)
    ordering_fields = ("tituloMaterial",)

    def create(self, request):
        try:
            user = request.user
            datos = request.data
            #validacion de los datos al serializer
            serializer = MaterialClaseRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                MaterialClase.objects.create(
                    tituloMaterial = datos.get("tituloMaterial"),
                    descripcionMaterial = datos.get("descripcionMaterial"),
                    documentoAdjunto = datos.get("documentoAdjunto"),
                    curso = AsignacionCatedraticoCurso.objects.get(pk = datos.get("id"))
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'Registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return MaterialClaseSerializer
        else:
            return MaterialClaseRegistroSerializer
    
    
    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


