#EntregaTarea View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models import Entrega
from django.contrib.auth.models import User
from api.models import Profile
from api.serializers import EntregaSerializer

class EntregaViewset(viewsets.ModelViewSet):
    queryset = Entrega.objects.filter()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante",)
    search_fields = ("estudiante",)
    ordering_fields = ("estudiante",)

    def retrieve(self, request, pk=None):
        user = request.user
        estudiante = User.objects.get(username=user)
        perfil = Profile.objects.get(pk = estudiante.id)
        tarea = Entrega.objects.filter(tarea=pk, estudiante__estudiante=perfil.id)
        serializer = EntregaSerializer(tarea, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
        
    
    def list(self, request):
        id = request.query_params.get("id_tarea")
        listar = Entrega.objects.filter(tarea = id)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar, request)
        serializer = EntregaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)

    
    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

