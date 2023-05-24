import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { map } from 'rxjs';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id?:string;
  log?:string;

  constructor(private fireauth : AngularFireAuth, private router : Router,
    private usersService:UsersService,private confirmationService:ConfirmationService,
    private messageService:MessageService
    ) {

     }
rows:any;r:any;

   async check(email:any){
    const verification:any=await this.usersService.getUser(email).pipe(
      map((changes)=>{
        return changes.docs.map(a=>{
          const data=a.data() as any ;
          data.uid=a.id;
          return data;
        
         
        })
        
      })
    ).toPromise();
    console.log(verification[0]);
    
    if(verification.length>0){
      return verification[0];
    }
    else{
      return false;
    }
   }


   async login(email : string, password : string) {
     let verification:any=await this.check(email);
      console.log(verification);
      if(verification.isBlocked){
        console.log("block2");
        
        this.router.navigate(['/block']);
      }
      else{
      this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        
        if(res.user?.email=='dixitamali6318@gmail.com'){
          localStorage.setItem('token','true');
          localStorage.setItem('email','dixitamali6318@gmail.com')
          this.router.navigate(['/admin-dashboard']);
          this.messageService.add({severity:'success', summary:'Login', detail:'You Logged in successfully'});
        }
         else  if(res.user?.emailVerified == true ) {
            localStorage.setItem('token','true');
             this.log=res.user.uid;        
            localStorage.setItem('id',res.user.uid);
           this.router.navigate(['/dashboard']);
           this.messageService.add({severity:'success', summary:'Login', detail:'You Logged in successfully'});
          
         } else {
           this.router.navigate(['/verify']);
         }


     }, err => {
         alert(err.message);
         this.router.navigate(['/login']);
     })
    }
  }

 
async register(email : string, password : string,value?:any) {
    try{
       const data= await this.fireauth.createUserWithEmailAndPassword(email, password)
       this.messageService.add({severity:'success', summary:'Registration', detail:'You resgistered successfully'});
       this.sendEmailForVarification(data.user);
       this.id=data.user?.uid;
       value.uid=data.user?.uid;
       //this.usersService.addUser(value);
       return value;
      
     }
     catch(error){
       alert("Somthing went wrong");
     }

}


  async logout() {
    await this.fireauth.signOut().then( () => {
      
       localStorage.clear();
       //window.location.reload();
       this.router.navigate(['/login']);
      
     }, err => {
       alert(err.message);
     })
  }


  forgotPassword(email : string) {
       this.fireauth.sendPasswordResetEmail(email).then(() => {
         this.router.navigate(['/verify']);
       }, err => {
         alert('Something went wrong');
       })
   }


  sendEmailForVarification(user : any) {
     console.log(user);
      user.sendEmailVerification().then((res : any) => {
       this.router.navigate(['/verify']);
     }, (err : any) => {
       alert('Something went wrong. Not able to send mail to your email.')
     })
  }

 
   googleSignIn() {
    
    
     return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(async res => {
       this.log=res.user!.uid;
       let verification:any=await this.check(res.user!.email);
       console.log(verification);
       if(verification.isBlocked){
         console.log("block2");
      
        this.router.navigate(['/block']);
       }
       else  if(res.user?.email=='dixitamali6318@gmail.com'){
        localStorage.setItem('token','true');
        localStorage.setItem('email','dixitamali6318@gmail.com')
        this.router.navigate(['/admin-dashboard']);
        this.messageService.add({severity:'success', summary:'Login', detail:'You Logged in successfully'});
      }
      else{
       this.router.navigate(['/dashboard']);
       localStorage.setItem('token','true');
       localStorage.setItem('id',res.user!.uid);
       this.messageService.add({severity:'success', summary:'Login', detail:'You Logged in successfully'});
      }

     }, err => {
       alert(err.message);
     })
    
  }

   isLoggedIn(){
     return !!localStorage.getItem('token');
   }
   isAdmin(){
    if(localStorage.getItem('email')=='dixitamali6318@gmail.com'){
      return true;
    }
    return false;
   }
}
