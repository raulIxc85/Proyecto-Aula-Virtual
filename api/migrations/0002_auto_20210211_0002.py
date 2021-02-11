# Generated by Django 2.2.13 on 2021-02-11 00:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AsignacionCatedraticoCurso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titular', models.BooleanField(default=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='AsignacionCurso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('asignacionCatedratico', models.ManyToManyField(related_name='cursoEstudiante', to='api.AsignacionCatedraticoCurso')),
            ],
        ),
        migrations.CreateModel(
            name='Ciclo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ciclo', models.PositiveIntegerField(error_messages={'unique': 'Ya existe el ciclo'}, unique=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioCiclo', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Nivel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(error_messages={'unique': 'Nivel ya existe'}, max_length=50, unique=True)),
                ('descripcion', models.TextField()),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tituloTarea', models.CharField(error_messages={'unique': 'Titulo de la tarea ya existe'}, max_length=50, unique=True)),
                ('descripcion', models.TextField()),
                ('documentoAdjunto', models.BinaryField()),
                ('fechaHoraEntrega', models.DateTimeField(auto_now_add=True)),
                ('aceptaDocumento', models.BooleanField(default=True)),
                ('valorTarea', models.DecimalField(decimal_places=2, max_digits=4)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tareaCurso', to='api.AsignacionCurso')),
            ],
        ),
        migrations.CreateModel(
            name='Seccion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(error_messages={'unique': 'Ya existe la seccion'}, max_length=50, unique=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioSeccion', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profesion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(error_messages={'unique': 'Profesion ya existe'}, max_length=50, unique=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioProfesion', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MaterialClase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tituloMaterial', models.CharField(error_messages={'unique': 'Titulo del material ya existe'}, max_length=50, unique=True)),
                ('descripcionMaterial', models.TextField()),
                ('documentoAdjunto', models.BinaryField()),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='materialCatedraticoCurso', to='api.AsignacionCatedraticoCurso')),
            ],
        ),
        migrations.CreateModel(
            name='Grado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(error_messages={'unique': 'Ya existe el grado'}, max_length=50, unique=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('nivel', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='gradoNivel', to='api.Nivel')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioGrado', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('fecha', models.DateField()),
                ('hora', models.TimeField()),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('ciclo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cicloEvento', to='api.Ciclo')),
            ],
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carnet', models.CharField(max_length=25)),
                ('nombreContacto', models.CharField(blank=True, max_length=100, null=True)),
                ('telefonoContacto', models.CharField(blank=True, max_length=10, null=True)),
                ('direccionContacto', models.CharField(blank=True, max_length=50, null=True)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('perfil', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='profileEstudiante', to='api.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='EntregaTarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notaTarea', models.DecimalField(decimal_places=2, max_digits=4)),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='entregaTareaEstudiante', to='api.Estudiante')),
            ],
        ),
        migrations.CreateModel(
            name='Entrega',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='idEntrega', to='api.EntregaTarea')),
                ('tarea', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='idTarea', to='api.Tarea')),
            ],
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.PositiveIntegerField(error_messages={'unique': 'Ya existe el curso'}, unique=True)),
                ('descripcion', models.TextField()),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('grado', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cursoGrado', to='api.Grado')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioCurso', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Catedratico',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('perfil', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='profileCatedratico', to='api.Profile')),
                ('profesion', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='catedraticoProfesion', to='api.Profesion')),
            ],
        ),
        migrations.AddField(
            model_name='asignacioncurso',
            name='estudiante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asignacionEstudiante', to='api.Estudiante'),
        ),
        migrations.AddField(
            model_name='asignacioncurso',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioAsignacionCurso', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='asignacioncatedraticocurso',
            name='catedratico',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asignacionCatedratico', to='api.Catedratico'),
        ),
        migrations.AddField(
            model_name='asignacioncatedraticocurso',
            name='ciclo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asignacionCiclo', to='api.Ciclo'),
        ),
        migrations.AddField(
            model_name='asignacioncatedraticocurso',
            name='curso',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asignacionCurso', to='api.Curso'),
        ),
        migrations.AddField(
            model_name='asignacioncatedraticocurso',
            name='seccion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='asignacionSeccion', to='api.Seccion'),
        ),
        migrations.AddField(
            model_name='asignacioncatedraticocurso',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuarioAsignacionCatedratico', to=settings.AUTH_USER_MODEL),
        ),
    ]
