from .user import UserSerializer, UserReadSerializer, UserSerializerCatedratico
from .profile import ProfileSerializer, ProfileRegistroSerializer,ProfileRegistroSerializerCatedratico
from .rol import RolSerializer, RolRegistroSerializer
from .estudiante import EstudianteSerializer, EstudianteRegistroSerializer, ProfileSerializerEstudiante, UserSerializerEstudiante
from .profesion import ProfesionSerializer, ProfesionRegistroSerializer
from .catedratico import CatedraticoSerializer, CatedraticoRegistroSerializer, ProfileSerializerCatedratico, UserSerializerCatedratico
from .nivel import NivelSerializer, NivelRegistroSerializer
from .grado import GradoSerializer, GradoRegistroSerializer
from .seccion import SeccionSerializer, SeccionRegistroSerializer
from .ciclo import CicloSerializer, CicloRegistroSerializer
from .curso import CursoSerializer, CursoRegistroSerializer
from .asignacionCatedratico import AsignacionCatedraticoSerializer, AsignacionCatedraticoRegistroSerializer
from .asignacionEstudiante import AsignacionEstudianteSerializer, AsignacionEstudianteRegistroSerializer
from .tarea import TareaSerializer, TareaRegistroSerializer
from .materialClase import MaterialClaseSerializer, MaterialClaseRegistroSerializer
from .entregaTarea import EntregaTareaSerializer, EntregaTareaRegistroSerializer
from .entrega import EntregaSerializer
from .evento import EventoSerializer, EventoRegistroSerializer