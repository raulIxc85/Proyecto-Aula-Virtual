#Catedratico View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Catedratico
from api.models import Profile
from api.models import Rol
from api.models import Profesion
from api.serializers import CatedraticoSerializer
from api.serializers import UserSerializerCatedratico

class CatedraticoViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.filter(activo=True).select_related("perfil")

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("activo",)
    search_fields = ("activo")
    ordering_fields = ("activo")

 
    def get_serializer_class(self):
            #Define serializer for API listar
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoSerializer
    
        
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                datos = request.data
                
                #validacion de los datos al serializer
                serializer = UserSerializerCatedratico(data=datos)
                
                if serializer.is_valid():
                    #insertar los datos luego de validar
                    user = User.objects.create(
                        username = datos.get("username")
                    )
                    #encriptar contraseña
                    usuario = User.objects.get(username=datos.get("username"))
                    usuario.set_password(datos.get("password"))
                    usuario.save()
                    profile = Profile.objects.create(
                        user = user,
                        nombres = datos.get("profile").get("nombres"),
                        apellidos = datos.get("profile").get("apellidos"),
                        direccion = datos.get("profile").get("direccion"),
                        telefono = datos.get("profile").get("telefono"),
                        gender = datos.get("profile").get("gender"),
                        rol = Rol.objects.get(pk = datos.get("profile").get("rol"))
                    )
                    catedratico = Catedratico.objects.create(
                            perfil = profile,
                            profesion = Profesion.objects.get(pk = datos.get("profile").get("catedratico").get("profesion"))
                    )
                else:
                    print("error en la validacion de datos")
            
            return Response({'registro creado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                datos = request.data
                #Modificar datos Usuario
                usuario = User.objects.get(pk=datos.get("id"))
                usuario.username = datos.get("username")
                #encriptar contraseña
                #usuario.set_password(datos.get("password"))
                usuario.save()
                #Modificar datos Profile
                profile = Profile.objects.get(user=datos.get("id"))
                profile.nombres = datos.get("profile").get("nombres")
                profile.apellidos = datos.get("profile").get("apellidos")
                profile.direccion = datos.get("profile").get("direccion")
                profile.telefono = datos.get("profile").get("telefono")
                profile.gender = datos.get("profile").get("gender")
                profile.save()
                #Modificar datos Estudiante
                catedratico = Catedratico.objects.get(pk=datos.get("idCa"))
                catedratico.profesion = datos.get("profile").get("catedratico").get("profesion")
                catedratico.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
   
    def destroy(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                #Cambio de estado
                catedratico = self.get_object()
                catedratico.activo = False
                catedratico.save()

                profile = Profile.objects.get(pk = estudiante.perfil_id)
                profile.activo = False
                profile.save()

                user = User.objects.get(pk = profile.user_id)
                user.is_active = False
                user.save()

            return Response({'registro borrado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]