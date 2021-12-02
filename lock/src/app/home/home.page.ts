import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  psw : string;
  // auth;

  constructor(
    private auth : Auth
  ) {
    // this.auth = getAuth()
  }

  async login(){

    // let res = await this.auth.signInWithEmailAndPassword(this.email, this.psw);
    signInWithEmailAndPassword(this.auth, this.email, this.psw)
    .then(res => {
      console.log(res);
      console.log(res.user?.uid);

    })
    .catch(error => console.log(error))
  }

}
