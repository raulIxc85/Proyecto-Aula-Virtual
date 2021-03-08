# AsignacionCatedratico Viewset
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.files import File
from rest_framework.pagination import PageNumberPagination

from api.models import AsignacionCatedraticoCurso
from api.models import Catedratico
from api.models import Curso
from api.models import Ciclo
from api.models import Grado
from api.models import Seccion
from api.models import Profile
from api.serializers import AsignacionCatedraticoSerializer, AsignacionCatedraticoRegistroSerializer

class AsignacionCatedraticoViewset(viewsets.ModelViewSet):
    queryset = AsignacionCatedraticoCurso.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("catedratico", "curso")
    search_fields = ("catedratico", "curso")
    ordering_fields = ("catedratico", "curso")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionCatedraticoSerializer
        

    def create(self, request):
        try:
            user = request.user
            datos = request.data
            #validacion de los datos al serializer
            serializer = AsignacionCatedraticoRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                cicloActivo = Ciclo.objects.get(activo=True)
                AsignacionCatedraticoCurso.objects.create(
                    titular = datos.get("titular"),
                    catedratico = Catedratico.objects.get(pk = datos.get("catedratico")),
                    curso = Curso.objects.get(pk = datos.get("curso")),
                    grado = Grado.objects.get(pk = datos.get("grado")),
                    seccion = Seccion.objects.get(pk = datos.get("seccion")),
                    ciclo = Ciclo.objects.get(pk = cicloActivo.id),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def curso(self, request, *args, **kwargs):
        user = request.user
        perfil = Profile.objects.get(user=user)
        catedratico = Catedratico.objects.get(perfil=perfil.id)
        cursos = AsignacionCatedraticoCurso.objects.filter(catedratico=catedratico.id, activo=True)
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(cursos, request)
        serializer = AsignacionCatedraticoSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    def update(self, request, pk):
        try:
            data = request.data
            archivo = data.get("imagenPortada")
            imagen = AsignacionCatedraticoCurso.objects.get(pk = pk)
            imagen.imagenPortada = File(archivo)
            imagen.save()
            return Response({"imagen actualizada"}, status = status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status = status.HTTP_400_BAD_REQUEST)


    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

