from django.conf import settings
from django.conf.urls import url, include

from normandy.control import views as control_views
from django.contrib.auth.views import login, logout_then_login

app_name = 'control'
urlpatterns = []

if settings.ADMIN_ENABLED:
    urlpatterns += [
        url(r'^control/', include([
            url('login', login, {'template_name': 'control/admin/login.html'}, name='login'),
            url('logout', logout_then_login, {'login_url': '/control/login.html'}, name='logout'),
            url(r'^.*$', control_views.IndexView, name='index'),
        ]))
    ]
