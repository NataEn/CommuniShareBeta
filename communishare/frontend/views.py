from django.shortcuts import render


def index(request,s=''):
    return render(request, 'frontend/index.html')
