# Generated by Django 4.0.3 on 2022-03-24 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='label',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
