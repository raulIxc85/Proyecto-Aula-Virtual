#MaterialClase View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files import File
from rest_framework.pagination import PageNumberPagination
from api.permisos import CatedraticoUser, EstudianteUser

from api.models import MaterialClase
from api.models import AsignacionCatedraticoCurso
from api.serializers import MaterialClaseSerializer, MaterialClaseRegistroSerializer

class MaterialClaseViewset(viewsets.ModelViewSet):
    queryset = MaterialClase.objects.filter(activo=True)
    #define permiso para este recurso
    permission_classes = [CatedraticoUser | EstudianteUser]

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("tituloMaterial",)
    search_fields = ("tituloMaterial",)
    ordering_fields = ("tituloMaterial",)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'retrieve':
            return MaterialClaseSerializer
  

    def create(self, request):
        try:
            data = request.data
            archivo = data.get("archivo")
            datos = json.loads(data["data"])

            #validacion de los datos al serializer
            serializer = MaterialClaseRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                MaterialClase.objects.create(
                    tituloMaterial = datos.get("tituloMaterial"),
                    descripcionMaterial = datos.get("descripcionMaterial"),
                    archivo = File(archivo),
                    curso = AsignacionCatedraticoCurso.objects.get(pk = datos.get("id"))
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'Registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk):
        try:
            
            data = request.data
            archivo = data.get("archivo")
            datos = json.loads(data["data"])

            #Modificar datos
            material = MaterialClase.objects.get(pk=pk)
            if archivo is not None:
                if material.archivo is not None:
                    material.archivo.delete()
                    material.archivo = File(archivo)
            
            material.tituloMateria = datos.get("tituloMaterial")
            material.descripcionMaterial = datos.get("descripcionMaterial")
            material.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    def list(self, request):
        id = request.query_params.get("id")
        listar = MaterialClase.objects.filter(curso = id, activo=True)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar, request)
        serializer = MaterialClaseSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)



    def destroy(self, request, pk):
        try:
            material = MaterialClase.objects.get(pk=pk)
            if material.archivo is not None:
                material.archivo.delete()
            material.delete()
            return Response({'registro eliminado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
    @action(methods=["get"], detail=False)
    def material_curso(self, request):
        id = request.query_params.get("id_asignacion")
        material = MaterialClase.objects.filter(curso = id, activo = True).order_by('-creado')
        
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(material, request)
        serializer = MaterialClaseSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)

