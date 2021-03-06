from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'rol', viewsets.RolViewset)
router.register(r'estudiante', viewsets.EstudianteViewset)
router.register(r'profesion', viewsets.ProfesionViewset)
router.register(r'catedratico', viewsets.CatedraticoViewset)
router.register(r'nivel', viewsets.NivelViewset)
router.register(r'grado', viewsets.GradoViewset)
router.register(r'seccion', viewsets.SeccionViewset)
router.register(r'ciclo', viewsets.CicloViewset)
router.register(r'curso', viewsets.CursoViewset)
router.register(r'asignacion', viewsets.AsignacionCatedraticoViewset)
router.register(r'asignacion-curso', viewsets.AsignacionEstudianteViewset)
router.register(r'tarea', viewsets.TareaViewset)
router.register(r'material', viewsets.MaterialClaseViewset)
router.register(r'entrega_tarea', viewsets.EntregaTareaViewset)
router.register(r'entregas', viewsets.EntregaViewset)
router.register(r'dashboard', viewsets.DashboardViewset)
router.register(r'evento', viewsets.EventoViewset)
router.register(r'dashboard_catedratico', viewsets.DashboardCatedraticoViewset)
router.register(r'dashboard_estudiante', viewsets.DashboardEstudianteViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
