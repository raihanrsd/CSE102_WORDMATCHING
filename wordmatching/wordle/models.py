from django.contrib.auth.models import AbstractUser
from django.db import models


class Word(models.Model):
    word = models.CharField(max_length=10)
    row = models.IntegerField()
    col = models.IntegerField()
    level = models.IntegerField()

