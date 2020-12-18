import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {User} from './users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private dbPath = '/users';
    userRef: AngularFireList<User> = null;
    constructor(
        private db: AngularFireDatabase
    ) {
        this.userRef = db.list(this.dbPath);
    }

    create(user: User): any{
        return this.userRef.push(user);
    }

    getUser(userid: string){
        return this.db.object('users/' + userid).valueChanges();
    }

    upLatLng(lat: number, lng: number, userId: string){
        this.userRef = this.db.list('/users');
        return this.userRef.update(userId, {
            lat,
            lng
        });
    }

    getAllUser(){
        return this.userRef;
    }
}
