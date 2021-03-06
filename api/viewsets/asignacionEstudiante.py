# AsignacionEstudiante Viewset
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from api.permisos import CatedraticoUser, EstudianteUser

from api.models import AsignacionCurso
from api.models import Estudiante
from api.models import Profile
from api.models import AsignacionCatedraticoCurso
from api.serializers import AsignacionEstudianteSerializer, AsignacionEstudianteRegistroSerializer

class AsignacionEstudianteViewset(viewsets.ModelViewSet):
    queryset = AsignacionCurso.objects.filter(activo=True)
    #define permiso para este recurso
    permission_classes = [CatedraticoUser | EstudianteUser ]

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante", )
    search_fields = ("estudiante", )
    ordering_fields = ("estudiante", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list':
            return AsignacionEstudianteSerializer


    def retrieve(self, request, pk=None):
        consulta = AsignacionCurso.objects.filter(activo=True, asignacionCatedratico=pk)
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(consulta, request)
        serializer = AsignacionEstudianteSerializer(consulta, many=True)
        return paginador.get_paginated_response(serializer.data)
       

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


    @action(methods=["get"], detail=False)
    def curso(self, request, *args, **kwargs):
        user = request.user
        perfil = Profile.objects.get(user=user)
        estudiante = Estudiante.objects.get(perfil=perfil.id)
        cursos = AsignacionCurso.objects.filter(estudiante=estudiante.id, activo=True)
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(cursos, request)
        serializer = AsignacionEstudianteSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)
    

    @action(methods=["get"], detail=False)
    def curso_detalle(self, request):
        id = request.query_params.get("id")
        curso = AsignacionCurso.objects.filter(pk=id)
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(curso, request)
        serializer = AsignacionEstudianteSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)

