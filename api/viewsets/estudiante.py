#Estudiante View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.permisos import Administrador, CatedraticoUser

from api.models import Estudiante
from api.models import Profile
from api.models import Rol
from api.serializers import EstudianteSerializer
from api.serializers import UserSerializer

class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True).select_related("perfil")
    #definer permiso para este recurso
    permission_classes = [ Administrador | CatedraticoUser ]
 
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("perfil__nombres","perfil__apellidos")
    search_fields = ("perfil__nombres","perfil__apellidos")
    ordering_fields = ("perfil__nombres","perfil__apellidos")

 
    def get_serializer_class(self):
            #Define serializer for API listar
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
    
        
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                datos = request.data

                #validacion de los datos al serializer
                serializer = UserSerializer(data=datos)

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
                    estudiante = Estudiante.objects.create(
                        perfil = profile,
                        carnet = datos.get("profile").get("estudiante").get("carnet"),
                        nombreContacto = datos.get("profile").get("estudiante").get("nombreContacto"),
                        direccionContacto = datos.get("profile").get("estudiante").get("direccionContacto"),
                        telefonoContacto = datos.get("profile").get("estudiante").get("telefonoContacto")
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
               
                #Modificar datos Profile
                profile = Profile.objects.get(user=datos.get("id"))
                profile.nombres = datos.get("profile").get("nombres")
                profile.apellidos = datos.get("profile").get("apellidos")
                profile.direccion = datos.get("profile").get("direccion")
                profile.telefono = datos.get("profile").get("telefono")
                profile.gender = datos.get("profile").get("gender")
                profile.save()
                #Modificar datos Estudiante
                estudiante = Estudiante.objects.get(pk=datos.get("idEs"))
                estudiante.nombreContacto = datos.get("profile").get("estudiante").get("nombreContacto")
                estudiante.direccionContacto = direccionContacto = datos.get("profile").get("estudiante").get("direccionContacto")
                estudiante.telefonoContacto = telefonoContacto = datos.get("profile").get("estudiante").get("telefonoContacto")
                estudiante.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
   
    def destroy(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                #Cambio de estado
                estudiante = self.get_object()
                estudiante.activo = False
                estudiante.save()

                profile = Profile.objects.get(pk = estudiante.perfil_id)
                profile.activo = False
                profile.save()

                user = User.objects.get(pk = profile.user_id)
                user.is_active = False
                user.save()

            return Response({'registro borrado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
