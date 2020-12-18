import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // tslint:disable-next-line:variable-name
  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  // tslint:disable-next-line:variable-name
  validation_message = {
    email: [
      { type: 'required', message: 'Email harus diisi' },
      { type: 'pattern', message: 'Masukkan email yang terdaftar' }
    ],
    password: [
      { type: 'required', message: 'Password harus diisi.' },
      { type: 'minLength', message: 'Minimal password 5 karakter.' }
    ]
  };

  constructor(
      private navCtrl: NavController,
      private authSrv: AuthService,
      private formBuilder: FormBuilder,
      private userSrv: AccountService
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group( {
      email: new FormControl('', Validators.compose( [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose( [
        Validators.minLength(5),
        Validators.required
      ])),
      nama: new FormControl('', Validators.compose([
        Validators.required
      ])),
      foto: new FormControl('', Validators.compose([

      ]))
    });
  }

  tryRegister(value){
    this.authSrv.registerUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Your account has been successfully made!';
          this.navCtrl.navigateForward('/login');
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
  }

  onSubmit(form: NgForm){
    console.log(form);
    this.userSrv.create(form.value).then(res => {
      this.navCtrl.navigateForward('/login');
    });

    form.reset();
  }
}
