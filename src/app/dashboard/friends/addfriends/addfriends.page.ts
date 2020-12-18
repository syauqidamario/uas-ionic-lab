import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AccountService} from '../../../services/account.service';
import {FriendsService} from '../../../services/friends.service';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.page.html',
  styleUrls: ['./addfriends.page.scss'],
})
export class AddfriendsPage implements OnInit {
  userId: string;
  length: number;
  user: any;
  tabUserEmail: any;
  tabFriendEmail: any;
  tmpFriend: any;
  friendList = [];
  cekFriend = false;
  allUser: any;

  constructor(
      private friendSrv: FriendsService,
      private userSrv: AccountService,
      private authSrv: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      console.log(res.uid);
      this.userId = res.uid;
      this.userSrv.getUser(this.userId).subscribe(profile => {
        this.user = profile;
      });
    });
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    this.userSrv.getUser(this.userId).subscribe(profile => {
      this.tabUserEmail = profile;
      console.log(this.tabUserEmail.email, f.value.email);
      if (this.tabUserEmail.email === f.value.email){
        console.log('Cannot add yourself!');
      }
      else {
        this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(data => {
          this.tmpFriend = data;
          console.log(this.tmpFriend);
          if (this.tmpFriend.length === 0){
            console.log(f.value.email, this.userId, this.tmpFriend.length);
            this.friendSrv.newFriend(f.value.email, this.userId, this.tmpFriend.length).then(res => {
              console.log(res);
              this.router.navigateByUrl('dashboard/friends');
            }).catch(error => console.log(error));
          }
          if (this.tmpFriend.length > 0){
            // @ts-ignore
            // @ts-ignore
            this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
                map(changes =>
                    changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
                )
                // tslint:disable-next-line:no-shadowed-variable
            ).subscribe(data => {
              this.tabFriendEmail = data;
              console.log(this.tabFriendEmail);
              for (let i = 0; i < this.tabFriendEmail.length;){
                if (this.tabFriendEmail[i].email === f.value.email){
                  this.cekFriend = false;
                  console.log('Friend has been added!');
                  break;
                } else {
                  this.cekFriend = true;
                  i++;
                }
              }
              if (this.cekFriend === true){
                this.friendSrv.newFriend(f.value.email, this.userId, this.tmpFriend.length).then(res => {
                  console.log(res);
                  this.router.navigateByUrl('dashboard/friends');
                }).catch(error => console.log(error));
              }
            });
          }
        });
      }
    });
  }
}
