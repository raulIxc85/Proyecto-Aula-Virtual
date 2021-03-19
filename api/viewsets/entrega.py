#Entrega View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from django.db.models import Sum
from api.permisos import CatedraticoUser,EstudianteUser

from api.models import Entrega
from django.contrib.auth.models import User
from api.models import Profile
from api.models import Estudiante
from api.serializers import EntregaSerializer

class EntregaViewset(viewsets.ModelViewSet):
    queryset = Entrega.objects.filter()
    #definer permisos para este recurso
    permission_classes = [CatedraticoUser | EstudianteUser ]

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante",)
    search_fields = ("estudiante",)
    ordering_fields = ("estudiante",)

    def retrieve(self, request, pk=None):
        user = request.user
        estudiante = User.objects.get(username=user)
        perfil = Profile.objects.get(user = estudiante.id)
        id_estudiante = Estudiante.objects.get(perfil = perfil.id)
        tarea = Entrega.objects.filter(tarea=pk, estudiante__estudiante=id_estudiante.id)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(tarea, request)
        serializer = EntregaSerializer(tarea, many=True)
        return paginador.get_paginated_response(serializer.data)
        
    
    def list(self, request):
        id = request.query_params.get("id_tarea")
        listar = Entrega.objects.filter(tarea = id)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar, request)
        serializer = EntregaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    @action(methods=["get"], detail=False)
    def notas(self, request):
        user = request.user
        id = request.query_params.get("id_asignacion")
        estudiante = User.objects.get(username=user)
        perfil = Profile.objects.get(user = estudiante.id)
        id_estudiante = Estudiante.objects.get(perfil = perfil.id)
        listar_tarea_nota = Entrega.objects.filter(estudiante__estudiante = id_estudiante,tarea__asignacion = id).order_by('-tarea__creado')
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar_tarea_nota, request)
        serializer = EntregaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    @action(methods=["get"], detail=False)
    def sumarNotas(self, request):
        user = request.user
        id = request.query_params.get("id_asignacion")
        estudiante = User.objects.get(username=user)
        perfil = Profile.objects.get(user = estudiante.id)
        id_estudiante = Estudiante.objects.get(perfil = perfil.id)
        totalNota = Entrega.objects.filter(estudiante__estudiante = id_estudiante, tarea__asignacion = id).aggregate(Sum('estudiante__notaTarea'))
        return Response(totalNota, status = status.HTTP_200_OK)


