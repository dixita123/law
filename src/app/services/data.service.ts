import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  itemsCollection!: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  itemDoc!:AngularFirestoreDocument<any>
 
  constructor(
    public afs:AngularFirestore,

  ) { 
  
     this.itemsCollection=this.afs.collection('users');
     this.items=this.afs.collection('users').snapshotChanges().pipe(
       map((changes)=>{
         return changes.map(a=>{
           const data=a.payload.doc.data() as any;
           data.id=a.payload.doc.id;
           return data;
         })
  }));
  
  
  }
  getItems(){
    console.log(this.items);
    
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
     
  }
  
  blockItem(item:any){
    this.itemDoc=this.afs.doc(`users/${item.id}`);
    item.isBlocked=true;
    this.itemDoc.update(item)
  }
  unblockItem(item:any){
    this.itemDoc=this.afs.doc(`users/${item.id}`);
    item.isBlocked=false;
    this.itemDoc.update(item)
  }
}