from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("level", views.index, name="index"),
    path("", views.home, name="home"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("get_info/<int:user_id>/<str:status>/<int:tries>", views.get_info, name="get_info"),
    path("get_info", views.get_inf, name="get_inf"),
]