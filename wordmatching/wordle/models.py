from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime

class User(AbstractUser):
    games_played = models.IntegerField(default=0)
    games_won = models.IntegerField(default=0)
    percentage_of_win = models.DecimalField(max_digits = 10, decimal_places = 2, default = 0.00)
    best_try = models.IntegerField(default=10)
    current_streak = models.IntegerField(default=0)
    max_streak = models.IntegerField(default=0)
    average_duration = models.DurationField(default=datetime.timedelta(0))
    best_tries_1 = models.IntegerField(default=0)
    best_tries_2 = models.IntegerField(default=0)
    best_tries_3 = models.IntegerField(default=0)
    best_tries_4 = models.IntegerField(default=0)
    best_tries_5 = models.IntegerField(default=0)
    best_tries_5 = models.IntegerField(default=0)
    best_tries_6 = models.IntegerField(default=0)
    
    def serialize(self):
        return {
            "games_played" : self.games_played,
            "games_won" : self.games_won,
            "percentage_of_win" : self.percentage_of_win,
            "best_try" : self.best_try,
            "current_streak" : self.current_streak,
            "max_streak" : self.max_streak,
            "best_tries_1" : self.best_tries_1,
            "best_tries_2" : self.best_tries_2,
            "best_tries_3" : self.best_tries_3,
            "best_tries_4" : self.best_tries_4,
            "best_tries_5" : self.best_tries_5,
            "best_tries_6" : self.best_tries_6,
            "average_time" : self.average_duration.total_seconds(),
        }


class Word(models.Model):
    word = models.CharField(max_length=10)
    row = models.IntegerField()
    col = models.IntegerField()
    level = models.IntegerField()

    def __str__(self):
        return f"{self.word} Level {self.level}"

