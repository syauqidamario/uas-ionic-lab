import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // tslint:disable-next-line:variable-name
  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  // tslint:disable-next-line:variable-name
  validation_message = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Enter a valid email.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'}
    ]
  };

  constructor(
      private navCtrl: NavController,
      private authSrv: AuthService,
      private formBuilder: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      if (res !== null){
        this.router.navigateByUrl('/dashboard');
      }
    });

    this.validations_form = this.formBuilder.group( {
      email: new FormControl('', Validators.compose( [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose( [
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  loginUser(value) {
    this.authSrv.loginUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.navCtrl.navigateForward('/dashboard');
        }, err => {
          this.errorMessage = 'Username or password is incorrect. Try again!';
          this.successMessage = '';
        });
  }

  logout(){
    this.authSrv.logoutUser();
  }

}
