import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {NavController} from '@ionic/angular';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    // tslint:disable-next-line:variable-name
    user_id: string;

    constructor(
        private fireAuth: AngularFireAuth,
        private db: AngularFireDatabase
    ) {}

    registerUser(value){
        return firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then((user) => {
            if (user){
                console.log(user);
                this.user_id = user.user.uid;

                firebase.database().ref('user/' + this.user_id).set({
                    nama: value.nama,
                    email: value.email,
                    foto: 'https://firebasestorage.googleapis.com/v0/b/uaslab-ad764.appspot.com/o/foto%2Fdefault%2Fiu.jpg?alt=media&token=d98355df-bdd1-4390-bd59-bc5a9182c4b8'
                });
            }
        });
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
    }

    logoutUser() {
        return new Promise<void>((resolve, reject) => {
            if (this.fireAuth.currentUser) {
                this.fireAuth.signOut()
                    .then(() => {
                        console.log('Log Out');
                        resolve();
                    }).catch((error) => {
                    reject();
                });
            }
        });
    }

    userDetails(){
        return this.fireAuth.user;
    }
}

