#EntregaTarea View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.files import File
from django.db import transaction

from api.models import EntregaTarea
from api.models import Entrega
from django.contrib.auth.models import User
from api.models import Profile
from api.models import Estudiante
from api.models import Tarea
from api.serializers import EntregaTareaSerializer, EntregaTareaRegistroSerializer

class EntregaTareaViewset(viewsets.ModelViewSet):
    queryset = EntregaTarea.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("texto",)
    search_fields = ("texto",)
    ordering_fields = ("texto",)


    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                data = request.data
                archivo = data.get("archivo_tarea")
                datos = json.loads(data["data"])
                #validacion de los datos al serializer
                serializer = EntregaTareaRegistroSerializer(data=datos)
                if serializer.is_valid():
                    estudiante = User.objects.get(username=user)
                    perfil = Profile.objects.get(user = estudiante.id)
                    id_estudiante = Estudiante.objects.get(perfil = perfil.id)
                    #insertar los datos luego de validar
                    EntregaTarea.objects.create(
                        texto = datos.get("texto"),
                        notaTarea = 0,
                        fechaEntrega = datos.get("fechaHora"),
                        archivo = File(archivo),
                        estudiante = Estudiante.objects.get(pk = id_estudiante.id)
                    )
                    id_entrega = EntregaTarea.objects.get(estudiante = id_estudiante.id, fechaEntrega=datos.get("fechaHora"))
                    Entrega.objects.create(
                        tarea = Tarea.objects.get(pk = datos.get("id")),
                        estudiante = id_entrega
                    )
                else:
                    print("error en la validacion de datos")
            
            return Response({'Registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def update(self, request, pk):
        try:
            data = request.data
            archivo = data.get("archivo_tarea")
            datos = json.loads(data["data"])
            entrega = EntregaTarea.objects.get(pk=pk)
                        
            entrega.texto = datos.get("texto")
            if archivo is not None:
                if entrega.archivo is not None:
                    entrega.archivo.delete()
                    entrega.archivo = File(archivo)
            
            entrega.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["put"], detail=False)
    def calificar(self, request):
        try:
            datos = request.data
            tarea = EntregaTarea.objects.get(pk=datos.get("id"))
            tarea.notaTarea = datos.get("notaTarea")
            tarea.save()
            return Response({'Tarea calificada'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def get_permissions(self):
        """Define permisos para este recurso"""
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
