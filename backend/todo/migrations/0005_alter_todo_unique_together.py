# Generated by Django 5.0.4 on 2024-04-10 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_alter_todo_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='todo',
            unique_together=set(),
        ),
    ]
