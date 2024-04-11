from django.db import models
from account.models import UserData  

class Todo(models.Model):
    user = models.ForeignKey(UserData, on_delete=models.CASCADE, related_name='todos',null=True)
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.body
