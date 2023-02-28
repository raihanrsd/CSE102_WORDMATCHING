from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.forms import ModelForm
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Word, User
import random
from datetime import timedelta


def home(request):
    return render(request, "wordle/home.html")

def index(request):
    count = Word.objects.all().count()
    word = Word.objects.get(pk=random.randint(1, count))
    return render(request, "wordle/index.html", {
        "word" : word,
    })


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "wordle/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "wordle/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("home"))
    else:
        return render(request, "wordle/register.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("home"))
        else:
            return render(request, "wordle/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "wordle/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("home"))

@csrf_exempt
def get_info(request, user_id, status, tries):
    user = User.objects.get(pk=user_id)
    user.games_played += 1
    if status == "win":
        user.games_won += 1
        user.percentage_of_win = (user.games_won / user.games_played) * 100
        if user.current_streak + 1 > user.max_streak:
            user.max_streak  = user.current_streak + 1
        data = json.loads(request.body)
        total_seconds = user.average_duration.total_seconds()
        total_seconds *= user.games_won 
        print(data.get("duration", ""))
        print(total_seconds)
        total_seconds += data.get("duration", "")
    

        avg_seconds = total_seconds / (user.games_won + 1)


        
        
        user.average_duration = timedelta(seconds=avg_seconds)
        print(user.average_duration)

        if user.best_try > tries:
            user.best_try = tries

        if tries == 1:
            user.best_tries_1+=1
        if tries == 2:
            user.best_tries_2+=1
        if tries == 3:
            user.best_tries_3+=1
        if tries == 4:
            user.best_tries_4+=1
        if tries == 5:
            user.best_tries_5+=1
        if tries == 6:
            user.best_tries_6+=1
        
        user.current_streak += 1
    if status == "lose":
        user.percentage_of_win = (user.games_won / user.games_played) * 100
        user.current_streak = 0
    user.save()
    return JsonResponse(user.serialize())


def get_inf(request):
    user = request.user
    return JsonResponse(user.serialize())

