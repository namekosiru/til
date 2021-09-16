from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from .models import BoardModel


def signupfunc(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        try:
            user = User.objects.create_user(username, '',password)
            return render(request, 'list.html')
        except IntegrityError:
            return render(request, 'signup.html', {'error':'このユーザーは既に登録されています'})

    return render(request, 'signup.html', {'some':100})

def loginfunc(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('list')
        else:
            return render(request, 'login.html', {})
    return render(request, 'login.html', {})

def listfunc(request):
    object_list = BoardModel.objects.all()
    print("aaa")
    return render(request, 'list.html', {'object_list':object_list})

def logoutfunc(request):
    logout(request)
    return redirect('login')

def detailfunc(request, pk):
    object = get_object_or_404(BoardModel, pk=pk)
    return render(request, 'detail.html', {'object': object})

def goodfunc(request, pk):
    object = BoardModel.objects.get(pk=pk)
    object.good += 1
    object.save()
    return redirect('list')