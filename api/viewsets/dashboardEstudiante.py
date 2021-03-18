#Dashboard View
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models import Estudiante
from api.models import AsignacionCatedraticoCurso
from api.models import Profile
from api.models import Evento
from api.models import Ciclo
from api.models import AsignacionCurso
from api.models import Tarea

from django.contrib.auth.models import User
from api.serializers import AsignacionEstudianteSerializer, EventoSerializer, TareaSerializer

class DashboardEstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)


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
    def eventos(self, request, *args, **kwargs):
        cicloActivo = Ciclo.objects.get(activo=True)
        eventos = Evento.objects.filter(activo = True, ciclo = cicloActivo).order_by('-creado')[:10]
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(eventos, request)
        serializer = EventoSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    @action(methods=["get"], detail=False)
    def tareas(self, request, *args, **kwargs):
        user = request.user
        perfil = Profile.objects.get(user=user)
        estudiante = Estudiante.objects.get(perfil=perfil.id)
        cursos = AsignacionCurso.objects.filter(estudiante=estudiante.id, activo=True)
        tareas = Tarea.objects.filter(activo=True).select_related('asignacion').order_by('-fechaHoraEntrega','-creado')[:7]
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(tareas, request)
        serializer = TareaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)



    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
