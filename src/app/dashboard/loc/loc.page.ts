import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/operators';
import {FriendsService} from '../../services/friends.service';
import {Router} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-loc',
  templateUrl: './loc.page.html',
  styleUrls: ['./loc.page.scss'],
})
export class LocPage implements OnInit{
  map: any;
  infoWindow: any = new google.maps.InfoWindow();
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  getLoc: any;
  userId: string;
  pos: any = {
    lat: -6.256081,
    lng: 106.618755
  };

  friend: any;
  userData: any;
  friendList = [];
  userFriend = [];
  userList = [];

  constructor(
      private db: AngularFireDatabase,
      private authSrv: AuthService,
      private userSrv: AccountService,
      private friendSrv: FriendsService,
      private router: Router
  ) {}

  ngOnInit(){

  }

  ionViewDidEnter(){
    this.authSrv.userDetails().subscribe(res => {
      if (res != null){
        this.userId = res.uid;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const posUser = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(posUser.lat, posUser.lng, this.userId);
          this.userSrv.upLatLng(posUser.lat, posUser.lng, this.userId);
          const location = new google.maps.LatLng(posUser.lat, posUser.lng);
          const options = {
            center: location,
            zoom: 13,
            disableDefaultUI: true
          };

          this.map = new google.maps.Map(this.mapRef.nativeElement, options);
          console.log(posUser);
          this.map.setCenter(posUser);

          const marker = new google.maps.Marker({
            position: posUser,
            map: this.map,
          });

          this.friendSrv.getAllFriend(this.userId).snapshotChanges().pipe(
              map(changes =>
                  changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
              )
          ).subscribe(data => {
            this.friend = data;
            this.userFriend = this.friend;

            this.userSrv.getAllUser().snapshotChanges().pipe(
                map(changes =>
                    changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
                )
                // tslint:disable-next-line:no-shadowed-variable
            ).subscribe(data => {
              this.userData = data;
              this.userList = this.userData;
              let j = 0;
              for (let i = 0; i < this.userList.length;){
                // tslint:disable-next-line:triple-equals
                if (this.userList[i].email == this.userFriend[j].email){
                  this.friendList[j] = this.userData[j];
                  const posFriend = {
                    lat: this.friendList[j].lat,
                    lng: this.friendList[j].lng
                  };
                  // tslint:disable-next-line:no-shadowed-variable
                  const marker = new google.maps.Marker({
                    position: posFriend,
                    map: this.map,
                  });

                  console.log(this.friendList[j]);
                  i = 0;
                  j++;
                  // tslint:disable-next-line:triple-equals
                  if (j == this.userFriend.length){
                    break;
                  }
                }else{
                  i++;
                }
              }
              console.log(this.friendList);
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.friendList.length; i++){

              }
            });
          });
        });
      }
    });
  }

  showCurrentLocation(){
    console.log('Ada Syauqi');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
        this.map.setCenter(pos);
      });
    }
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
