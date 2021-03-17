#Dashboard View
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models import Ciclo
from django.contrib.auth.models import User
from api.models import Profile
from api.models import Grado
from api.models import Seccion
from api.models import Nivel
from api.serializers import NivelSerializer

class DashboardViewset(viewsets.ModelViewSet):
    queryset = Ciclo.objects.filter(activo=True)

    @action(methods=["get"], detail=False)
    def datos_admin(self, request):
        # mostrar ciclo
        ciclo = Ciclo.objects.get(activo=True)
        # cantidad de usuarios
        cantidadUsuarios = User.objects.all().count()
        # cantidad de catedraticos
        cantidadCatedraticos = Profile.objects.filter(rol=1).count()
        # cantidad estudiantes
        cantidadEstudiantes = Profile.objects.filter(rol=2).count()
        # cantidad grados
        cantidadGrados = Grado.objects.filter(activo=True).count()
        # cantidad secciones
        cantidadSecciones = Seccion.objects.filter(activo=True).count()
        datos = { 
            'ciclo': ciclo.ciclo,
            'cantidadUser': cantidadUsuarios,
            'cantidadCatedratico': cantidadCatedraticos,
            'cantidadEstudiante': cantidadEstudiantes,
            'cantidadGrados': cantidadGrados,
            'cantidadSecciones': cantidadSecciones,
        }
        return Response(datos, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def niveles(self, request):
        # niveles
        niveles = Nivel.objects.filter(activo=True)
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(niveles, request)
        serializer = NivelSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
