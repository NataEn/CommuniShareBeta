from django.contrib.auth import login, authenticate,get_user_model
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render, redirect
from accounts.forms import SignUpForm
User = get_user_model()


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return HttpResponseRedirect('home')
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})
