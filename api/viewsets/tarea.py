#Curso View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
        if self.action == 'list' or self.action == 'retrieve':
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
            print("datos: ", datos)
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
    

    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

