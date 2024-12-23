import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { error } from 'console';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  
  constructor(private auth:AuthService,private route:Router){}
  onRegister(user:NgForm){
    console.log(user.value)
    this.auth.register({
      name : user.value.name,
      email : user.value.email,
      password : user.value.password,
      role : "student",
      department : user.value.department,
      year : user.value.year
    }).subscribe({
      next: (v)=>{console.log(v)},
      error: (e)=>{console.log(e)}
    });

    user.reset()
    
  }
  onLogin(user:NgForm){
    console.log(user)
    this.auth.login({
      email : user.value.email,
      password: user.value.password
    }).subscribe({
      next: (v)=>{
        localStorage.setItem('authUser',v.user.id);
        console.log(v)
        this.route.navigateByUrl('/api/home')
      },
      error: (e)=>{console.log(e)}
    });
  }

}
