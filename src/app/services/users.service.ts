import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  u!:string;
  UsersCollection!: AngularFirestoreCollection<any>;
  users!: Observable<any[]>;
  userDoc!:AngularFirestoreDocument<any>

  constructor(
    public afs:AngularFirestore
  ) { 
  this.UsersCollection=this.afs.collection('users', ref=>ref.orderBy('updatedAt','asc'));
  this.users=this.afs.collection('users').snapshotChanges().pipe(
    map((changes)=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as any ;
        data.uid=a.payload.doc.id;
       
        return data;
      })
}));

}

getUser(emailId:any){
  return this.afs.collection('users', ref=>ref.where("email","==",emailId)).get();
}
getUsers(){
 
  return this.users.pipe(catchError(this.handleError));
  
}

handleError(error:any){
  console.log(error+"this is my error");
  
  return throwError(error.message||"Something went wrong");
}

async addUser(user:any){
  try
  {
    user.createdAt=new Date();
    //user.uid=this.auth.id;
    console.log("here i am"+user+user.uid);
    await this.afs.collection("users").doc(user.uid).set(user);
  }
  catch(error){
    alert(error)
  }
}
updateStorage(user:any){
  try{
  
    
    this.userDoc=this.afs.doc(`users/${user.uid}`);
  
  }
   catch(error){
     alert(error);
  }
}
isBlocked(user:any){
  this.userDoc=this.afs.doc(`users/${user.uid}.isBlocked`);
 
  
}

}

