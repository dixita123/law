import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  itemsCollection!: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  itemDoc!:AngularFirestoreDocument<any>
  id=localStorage.getItem('id');
 
  constructor(
    public afs:AngularFirestore,
    private userService:UsersService,
    private auth:AuthService
  ) { 
    
    console.log("--------"+this.id);
    
     this.itemsCollection=this.afs.collection('users', ref=>ref.orderBy('createdAt','asc')).doc(this.id!).collection('letter');
    this.items=this.afs.collection('users',ref=>ref.orderBy('createdAt','asc')).doc(this.id!).collection('letter').snapshotChanges().pipe(
      map((changes)=>{
        return changes.map(a=>{
          const data=a.payload.doc.data() as any;
          data.id=a.payload.doc.id;
          
          return data;
        })
  }));
  
  
  }
  
  getItems(){
    return this.items.pipe(catchError(this.handleError));
    
  }

  handleError(error:any){
    console.log(error+"this is my error"); 
    return throwError(error.message||"Something went wrong");
  }

  addItem(item:any){
    try{
      console.log(item);
      
      item.createdAt=new Date();
      item.updatedAt=new Date();
      this.itemsCollection.add(item);
    }
    catch(error){
      alert(error)
    }
  }
  deleteItem(item:any){
      try{
        console.log(`users/${this.id}/letter/${item.id}`);
        
        this.itemDoc=this.afs.doc(`users/${this.id}/letter/${item.id}`);
      this.itemDoc.delete();
      }
      catch(error){
        alert(error);
      }
  }
  
  updateItem(item:any){
    try{
      item.updatedAt=new Date();
      this.itemDoc=this.afs.doc(`users/${this.id}/letter/${item.id}`);
      this.itemDoc.update(item)
    }
     catch(error){
       alert(error);
    }
  }
}
