#Dashboard View
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count

from api.models import Catedratico
from api.models import AsignacionCatedraticoCurso
from api.models import Profile
from api.models import Catedratico
from api.models import Evento
from api.models import Ciclo
from api.models import EntregaTarea
from api.models import Entrega
from api.models import Tarea

from django.contrib.auth.models import User
from api.serializers import AsignacionCatedraticoSerializer, EventoSerializer

class DashboardCatedraticoViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.filter(activo=True)


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
    def tareas_pendientes(self, request):
        user = request.user
        perfil = Profile.objects.get(user=user)
        catedratico = Catedratico.objects.get(perfil=perfil.id)
        detalle_tareas = Entrega.objects.values('tarea__asignacion__curso__nombre').annotate(Count('tarea__asignacion__curso')).filter(estudiante__calificado=0)
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(detalle_tareas, request)
        serializer = resultado_pagina
        return paginador.get_paginated_response(serializer)
    

    @action(methods=["get"], detail=False)
    def cantidad_tareas(self, request):
        cantidad = EntregaTarea.objects.filter(calificado=0, activo=True).count()
        datos = {
            'tareas': cantidad,
        }
        return Response(datos, status=status.HTTP_200_OK) 


    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
