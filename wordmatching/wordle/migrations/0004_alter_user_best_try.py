# Generated by Django 4.1.6 on 2023-02-28 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordle', '0003_alter_user_percentage_of_win'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='best_try',
            field=models.IntegerField(default=10),
        ),
    ]
