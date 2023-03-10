# Generated by Django 4.1.6 on 2023-02-28 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordle', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='best_tries_6',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_tries_1',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_tries_2',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_tries_3',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_tries_4',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_tries_5',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='best_try',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='current_streak',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='games_played',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='games_won',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='max_streak',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='percentage_of_win',
            field=models.IntegerField(default=0),
        ),
    ]
