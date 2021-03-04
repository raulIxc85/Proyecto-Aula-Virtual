#Curso View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum

from api.models import Tarea
from api.models import AsignacionCurso
from api.serializers import TareaSerializer, TareaRegistroSerializer

class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("tituloTarea",)
    search_fields = ("tituloTarea",)
    ordering_fields = ("tituloTarea",)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'retrieve':
            return TareaSerializer
        

    def create(self, request):
        try:
            user = request.user
            datos = request.data
            #validacion de los datos al serializer
            serializer = TareaRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Tarea.objects.create(
                    tituloTarea = datos.get("tituloTarea"),
                    descripcion = datos.get("descripcion"),
                    aceptaDocumento = datos.get("aceptaDocumento"),
                    fechaHoraEntrega = datos.get("fechaHoraEntrega"),
                    valorTarea = datos.get("valorTarea"),
                    curso = AsignacionCurso.objects.get(pk = datos.get("id"))
                )
                
            else:
                print("error en la validacion de datos")
            
            return Response({'Registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, *args, **kwargs):
        try:
            
            datos = request.data
            #Modificar datos
            tarea = Tarea.objects.get(pk=datos.get("id"))
            tarea.tituloTarea = datos.get("tituloTarea")
            tarea.descripcion = datos.get("descripcion")
            tarea.aceptaDocumento = datos.get("aceptaDocumento")
            tarea.fechaHoraEntrega = datos.get("fechaHoraEntrega")
            tarea.valorTarea = datos.get("valorTarea")
            tarea.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request):
        id = request.query_params.get("id")
        listar = Tarea.objects.filter(curso = id, activo=True)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar, request)
        serializer = TareaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    @action(detail=False, methods=["get"])
    def sumarTarea(self, request):
        id=request.query_params.get("id")
        suma = Tarea.objects.filter(curso = id, activo=True).aggregate(Sum('valorTarea'))
        return Response(suma, status = status.HTTP_200_OK)


    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

