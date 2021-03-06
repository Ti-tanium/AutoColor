# Generated by Django 2.2 on 2019-04-08 12:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ColoredDesigns',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Designs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('design', models.CharField(max_length=4096)),
            ],
        ),
        migrations.CreateModel(
            name='Palettes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('palette', models.CharField(max_length=512)),
            ],
        ),
        migrations.CreateModel(
            name='PostedPalettes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('likeCount', models.IntegerField()),
                ('collectCount', models.IntegerField()),
                ('ownerId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('paletteId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autoColorApp.Palettes')),
            ],
        ),
        migrations.CreateModel(
            name='PostedDesigns',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thumbUrl', models.CharField(max_length=256)),
                ('coloredDesignId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autoColorApp.ColoredDesigns')),
                ('like', models.ManyToManyField(related_name='likes', to=settings.AUTH_USER_MODEL)),
                ('ownerId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='coloreddesigns',
            name='designId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='autoColorApp.Designs'),
        ),
        migrations.AddField(
            model_name='coloreddesigns',
            name='paletteId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='autoColorApp.Palettes'),
        ),
    ]
