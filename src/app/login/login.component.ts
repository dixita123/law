import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
    
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
   
    })
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  async login() {
    
   
    this.auth.login(this.loginForm.value.email!,this.loginForm.value.password!);
    this.router.navigate(['/dashboard'])
    this.loginForm.reset();


  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}
