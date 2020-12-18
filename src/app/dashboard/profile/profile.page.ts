import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: string;
  user: any;

  constructor(
      private authSrv: AuthService,
      private userSrv: AccountService,
      private router: Router
  ) {}

  ngOnInit(){
    this.authSrv.userDetails().subscribe(res => {
      console.log(res);
      if (res !== null){
        this.userId = res.uid;
        this.userSrv.getUser(this.userId).subscribe(profile => {
          this.user = profile;
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout() {
    this.authSrv.logoutUser()
        .then(res => {
          console.log(res);
          this.router.navigateByUrl('/login');
        })
        .catch(error => {
          console.log(error);
        });
  }
}
