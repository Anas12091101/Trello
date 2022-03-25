from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [path('createuser',views.createuser,name="create-user"),
path('createboard',views.createboard,name="create-board"),
path('addmembers',views.addmembers,name="add-members"),
path('createcard',views.createcard,name="create-card"),
path('getboard',views.getBoard,name="get-board"),
path('getallboards',views.getAllBoards,name="get-all-boards"),
# path('/token',TokenObtainPairView(serializer_class=MyTokenObtainPairSerializer).as_view)
]