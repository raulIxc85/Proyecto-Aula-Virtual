#Model Entrega Tarea
from django.db import models
from api.models.estudiante import Estudiante

class EntregaTarea(models.Model):

    notaTarea = models.DecimalField(max_digits=4,decimal_places=2)
    archivo = models.FileField(upload_to='entrega_tareas', blank=True, null=True)
    texto = models.TextField(blank=True, null=True)
    fechaEntrega = models.DateTimeField()
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    
    estudiante = models.ForeignKey(
        Estudiante, 
        related_name='entregaTareaEstudiante', 
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.estudiante + "-" + self.notaTarea


    def delete(self, *args):
        self.activo = False
        self.save()
        return True