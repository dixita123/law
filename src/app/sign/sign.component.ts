import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signUpForm = new FormGroup(
    {
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      
    },
  
  );

  constructor(private auth:AuthService,private router:Router,
    private user:UsersService) { }

  ngOnInit(): void {
  }
  async register() {
     console.log("i am in");
     
    if (!this.signUpForm.valid) return;

    const response=await this.auth.register(this.signUpForm.value.email!,this.signUpForm.value.password!,this.signUpForm.value);
    console.log(response);
    
    this.user.addUser(response);
    this.router.navigate(['/login']);

   this.signUpForm.reset();
  }
}
