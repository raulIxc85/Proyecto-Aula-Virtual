import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.core import mail

from api.models import Profile
from api.serializers import UserSerializer, UserReadSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token" or self.action =="verificar_correo" or self.action=="cambiar_pass_token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def perform_create(self, serializer):
        serializer.save()


    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}


    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            user = request.user
            profile = Profile.objects.get(user=user)
            profile.nombres = data.get("profile").get("nombres")
            profile.apellidos = data.get("profile").get("apellidos")
            profile.direccion = data.get("profile").get("direccion")
            profile.telefono = data.get("profile").get("telefono")
            profile.gender = data.get("profile").get("gender")
            profile.save()
            return Response({"detail": {"Perfil modificado"}}, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)


    #cambiar password
    @action(methods=["put"], detail=False)
    def editar(self, request, *args, **kwargs):
        try:
            usuario = User.objects.get(pk=request.user.id)
            usuario.set_password(request.data["password"])
            usuario.last_login = datetime.now()
            usuario.save()
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"detail","registro modificado"}, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)


    #verificar si existe el correo
    @action(methods=["put"], detail=False)
    def verificar_correo(self, request):
        try:
            datos = request.data
            correo = User.objects.get(username=datos.get("correo"))
            if correo is not None:
                self.enviar_email_confirmacion(correo, request)
            
            return Response({'detail','correo verificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status = status.HTTP_400_BAD_REQUEST)


    def enviar_email_confirmacion(self, user, request):
        """Envio de link para cambiar contraseña"""
        datos = request.data
        generar_token_recuperacion = self.generar_token(user)
       
        html_content = render_to_string(
            'email/recuperar.html',
            {   'token': generar_token_recuperacion, 
                'user':user, 
                'url': datos.get("url"),
                'id': user.id
            }
            
        )
        subject =  'Cambio de password'
        from_email = 'Administrador <noreply>@colegio.com'
        usuario = user.username
        send_mail( 
            subject, 
            html_content, 
            from_email,
            [ usuario ,],            
            fail_silently=False,
        )
        

    def generar_token(self, user):
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        return token
  

    #cambiar password utilizando Token
    @action(methods=["put"], detail=False)
    def cambiar_pass_token(self, request):
        try:
            datos = request.data
            token_generator = PasswordResetTokenGenerator()
            usuario = User.objects.get(pk=datos.get("id"))
            #validar si pertenece token al usuario
            is_valid = token_generator.check_token(usuario, datos.get("token") )
            if is_valid:
                #cambiar contraseña
                usuario = User.objects.get(pk=datos.get("id"))
                usuario.set_password(request.data["password"])
                usuario.last_login = datetime.now()
                usuario.save()
            return Response({"detail","registro modificado"}, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
