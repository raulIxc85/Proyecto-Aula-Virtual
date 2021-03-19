from rest_framework.permissions import BasePermission

class Administrador(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return False
        else: 
            return False


class CatedraticoUser(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol.id == 1:
                return True
            else:
                return False
        else:
            return False


class EstudianteUser(BasePermission):
    def has_permission(self, request, view):
        if request.user.profile.rol.id == 2:
            return True
        else:
            return False


