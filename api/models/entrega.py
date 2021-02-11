from django.db import models
from api.models.tarea import Tarea
from api.models.entregaTarea import EntregaTarea

class Entrega(models.Model):

    tarea = models.ForeignKey(
        Tarea, 
        related_name='idTarea',
        on_delete=models.PROTECT
    )

    estudiante = models.ForeignKey(
        EntregaTarea,
        related_name='idEntrega',
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.tarea + "-" + self.estudiante 

