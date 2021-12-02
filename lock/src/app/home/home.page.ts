import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendEmailVerification } from '@firebase/auth';
import { loginMode } from '../shared/models';
import { ROTTE } from '../shared/rotte';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  psw : string;
  pswTwo: string;
  loginMode : loginMode = "login"

  constructor(
    private auth : Auth,
    private route: Router
  ) {
  }

  switchLoginMode(){
    this.loginMode = this.loginMode == "login" ? "register" : "login";
  }

  login(){
    // let res = await this.auth.signInWithEmailAndPassword(this.email, this.psw);
    signInWithEmailAndPassword(this.auth, this.email, this.psw)
    .then(res => {
      console.log(res);
      console.log(res.user?.uid);

      this.route.navigate([ROTTE.listScreen])
    })
    .catch(error => console.log(error))
  }

  register(){
    createUserWithEmailAndPassword(this.auth, this.email, this.psw)
    .then(res => {
      console.log(res);
      sendEmailVerification(res.user);
    })
    .catch(error => console.log(error))
  }

}
