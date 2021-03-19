#Tarea View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum
from django.core.files import File
from api.permisos import CatedraticoUser, EstudianteUser

from api.models import Tarea
from api.models import AsignacionCatedraticoCurso
from api.serializers import TareaSerializer, TareaRegistroSerializer

class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)
    #definer permisos para este recurso
    permission_classes = [CatedraticoUser | EstudianteUser ]

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
            data = request.data
            archivo = data.get("archivo")
            datos = json.loads(data["data"])
            
            #validacion de los datos al serializer
            serializer = TareaRegistroSerializer(data=datos)
         
            if serializer.is_valid():
                #insertar los datos luego de validar
                Tarea.objects.create(
                    tituloTarea = datos.get("tituloTarea"),
                    descripcion = datos.get("descripcion"),
                    fechaHoraEntrega = datos.get("fechaHoraEntrega"),
                    valorTarea = datos.get("valorTarea"),
                    archivo = File(archivo),
                    asignacion = AsignacionCatedraticoCurso.objects.get(pk = datos.get("id"))
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
            tarea = Tarea.objects.get(pk=pk)
            if archivo is not None:
                if tarea.archivo is not None:
                    tarea.archivo.delete()
                    tarea.archivo = File(archivo)
            
            tarea.tituloTarea = datos.get("tituloTarea")
            tarea.descripcion = datos.get("descripcion")
            tarea.fechaHoraEntrega = datos.get("fechaHoraEntrega")
            tarea.valorTarea = datos.get("valorTarea")
            tarea.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request):
        id = request.query_params.get("id")
        listar = Tarea.objects.filter(asignacion = id, activo=True)
        #paginando resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(listar, request)
        serializer = TareaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    def destroy(self, request, pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
            if tarea.archivo is not None:
                tarea.archivo.delete()
            tarea.delete()
            return Response({'registro eliminado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=["get"])
    def sumarTarea(self, request):
        id=request.query_params.get("id")
        suma = Tarea.objects.filter(asignacion = id, activo=True).aggregate(Sum('valorTarea'))
        return Response(suma, status = status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def tarea_curso(self, request):
        id = request.query_params.get("id_asignacion")
        tareas = Tarea.objects.filter(asignacion = id, activo = True).order_by('-creado')
        
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(tareas, request)
        serializer = TareaSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    @action(methods=["get"], detail=False)
    def nota_tarea(self, request):
        id = request.query_params.get("id_tarea")
        nota = Tarea.objects.get(pk=id)
        dato = {
            'nota': nota.valorTarea
        }
        return Response(dato, status=status.HTTP_200_OK)

