import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormControl} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {FriendsService} from '../../services/friends.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friend: any;
  userId: string;
  userData: any;
  searchControl: FormControl;
  friendList = [];
  userFriend = [];
  userList = [];
  resetFriend = [];

  constructor(
      private authSrv: AuthService,
      private friendSrv: FriendsService,
      private userSrv: AccountService,
      private fireDb: AngularFireDatabase
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(){
    this.authSrv.userDetails().subscribe(res => {
      console.log(res);
      if (res !== null){
        this.userId = res.uid;

        this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(data => {
          console.log("Data1: ", data);
          this.friend = data;
          this.userFriend = this.friend;
          console.log('UserFrined: ', this.userFriend);

          this.userSrv.getAllUser().snapshotChanges().pipe(
              map(changes =>
                  changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
              )
              // tslint:disable-next-line:no-shadowed-variable
          ).subscribe(data => {

            console.log("Data: ", data[0]['key']);
            

            data.forEach(uid => {
              console.log('UID: ', uid);
              this.fireDb.object('user/' + uid['key']).valueChanges().pipe().subscribe(datas => {
                console.log('Datas: ', datas);
                this.friendList.push({
                  name: datas['nama'],
                  email: datas['email'],
                  foto: datas['foto']
                });
              })
            });

            

            // this.fireDb.object('users/' + uid).valueChanges();

            // this.userData = data;
            // this.userList = this.userData;
            // console.log(this.userList, this.userFriend[0].email);
            // let j = 0;
            // for (let i = 0; i < this.userList.length;){
            //   // tslint:disable-next-line:triple-equals
            //   if (this.userList[i].email == this.userFriend[j].email){
            //     console.log('same email');
            //     this.friendList[j] = this.userData[j];
            //     this.resetFriend[j] = this.userData[j];
            //     console.log(this.friendList[j]);
            //     i = 0;
            //     j++;
            //     if (j === this.userFriend.length){
            //       break;
            //     }
            //   }else{
            //     i++;
            //   }
            // }

            this.setFilteredItems('');
            this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(search => {
              this.setFilteredItems(search);
            });
          });
        });
      }
    });

    console.log("Friend List:", this.friendList);
  }

  setFilteredItems(searchTerm: string) {
    this.friendList = this.resetFriend;
    this.friendList = this.friendList.filter(item => {
      return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
