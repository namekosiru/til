from django.db import models

# Create your models here.

CHOICE =(('danger', 'high'), ('warning', 'normal'), ('primary', 'low'))

class TodoModel(models.Model):
    title = models.CharField(max_length=100)
    memo = models.TextField()
    priority = models.CharField(
        max_length=50,
        choices = CHOICE
        )
    duedata = models.DateField(auto_now=True)

    def __str__(self):
        return f"title : {self.title} memo : {self.memo}"
