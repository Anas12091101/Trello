from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Board(models.Model):
    title=models.CharField(max_length=100,null=False)
    description=models.TextField(null=False)
    owner=models.ForeignKey(User,on_delete=models.CASCADE)
    # member=models.ManyToManyField(User,related_name="board_members")

    def __str__(self):
        return self.title

class Member(models.Model):
    member=models.ForeignKey(User,on_delete=models.CASCADE)
    board=models.ForeignKey(Board,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.member}-{self.board}"
