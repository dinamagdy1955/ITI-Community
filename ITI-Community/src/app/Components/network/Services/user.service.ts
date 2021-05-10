import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  data ={
    id:localStorage.getItem("uid"),
    firstName:localStorage.getItem("firstName"),
    lastName:localStorage.getItem("lastName"),
    jobTitle:localStorage.getItem("jobTitle"),
    avatar:localStorage.getItem("avatar"),
  
  } ;
  constructor(private db: AngularFirestore) { }
  

 getUserData(uid): Observable<any> {
    return this.db.collection('users-details').doc(uid).snapshotChanges();
  }
// ////////////////////////////////////
getAllUserData() {
  return this.db.collection('users-details').snapshotChanges();
}

notINCard(arr:any[]){
  let uid=localStorage.getItem("uid");
  arr.push(uid)
  return  this.db.collection('users-details' , ref=> ref.where('__name__','not-in',arr)).snapshotChanges()      
}

notINCardRequests(arr:any[]){
  let uid=localStorage.getItem("uid");
  arr.push(uid)
  return  this.db.collection('users-details' , ref=> ref.where('__name__','not-in',arr)).snapshotChanges()      
}
getAllFriendRequests() {
  let uid=localStorage.getItem("uid");

  return this.db.collection('users-details').doc(uid).collection('friendRequest').snapshotChanges()
  
}

// Ignore friend Request
ignore(id){
  let uid=localStorage.getItem("uid");
  this.db.collection('users-details').doc(uid).collection('friendRequest').doc(id).delete()
  this.db.collection('users-details').doc(id).collection('MySentfriendRequests').doc(uid).delete()

}

deleteFriend(id){
  let uid=localStorage.getItem("uid");
   this.db.collection('users-details').doc(uid).collection('friendList').doc(id).delete()
   this.db.collection('users-details').doc(id).collection('friendList').doc(uid).delete()
   return
}

deleteSentFriendReq(req){
  let uid=localStorage.getItem("uid");
 this.db.collection('users-details').doc(uid).collection('MySentfriendRequests').doc(req.id).delete()
 this.db.collection('users-details').doc(req.id).collection('friendRequest').doc(uid).delete()
  return 
}

// Accept friend Request
AcceptRequest(item){
  let uid=localStorage.getItem("uid");
  let id =item.id;
  item ={
    "firstName":item.firstName,
    'lastName':item.lastName,
    "avatar":item.avatar,
    "jobTitle":item.jobTitle,
  }
  const friend ={
    "firstName":this.data.firstName,
    'lastName':this.data.lastName,
    "avatar":this.data.avatar,
    "jobTitle":this.data.jobTitle,
  }
  
  this.ignore(id)
 
 this.db.collection('users-details').doc(uid).collection('friendList').doc(id).set({...item});
 this.db.collection('users-details').doc(id).collection('friendList').doc(uid).set({...friend})
  return 
}

//friendList
getAllFriendsList() {
  let uid=localStorage.getItem("uid");

  return this.db.collection('users-details').doc(uid).collection('friendList').snapshotChanges()
}

//create request
create_NewRequest(user) {
  let data = this.data
  console.log(data);
  const Request =
   {
     "firstName":data.firstName,
     'lastName':data.lastName,
     "avatar":data.avatar,
     "jobTitle":data.jobTitle,
     "id":data.id,
     "reqState":false};
   this.db.collection('users-details').doc(data.id).collection('MySentfriendRequests').doc(user.id).set(user)
   this.db.collection('users-details').doc(user.id).collection('friendRequest').doc(data.id).set({ ...Request })
   return
}

getMySentfriendRequests(){
  let uid=localStorage.getItem("uid");
return this.db.collection('users-details').doc(uid).collection('MySentfriendRequests').snapshotChanges()
}

  getAllUsersData(): Observable<any> {
    return this.db.collection('users-details').snapshotChanges();
  }

  getUserBasic(uid): Observable<any> {
    return this.db.collection('users-basics').doc(uid).snapshotChanges();
  }

  getUserDataList(arr): Observable<any> {
    return this.db
      .collection('users-details', (ref) => ref.where('__name__', 'in', arr))
      .get();
  }

}


