from django.db import models
from django.contrib.auth.models import User

from board.models import Board
# Create your models here.
class Card(models.Model):
    board_id=models.ForeignKey(Board,on_delete=models.CASCADE)
    type=models.CharField(max_length=20,null=False)
    title=models.CharField(max_length=50,null=False)
    description=models.TextField(null=False)
    assigned=models.OneToOneField(User,on_delete=models.CASCADE)
    label=models.CharField(max_length=10,null=True)
    def __str__(self):
        return self.title