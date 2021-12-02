import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendEmailVerification } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { MessaggieroService } from '../service/messaggiero.service';
import { LoginMode, TipiDiFirebaseError } from '../shared/models';
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
  loginMode : LoginMode = "login"

  constructor(
    private auth : Auth,
    private route: Router,
    private messaggiero: MessaggieroService
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
      sendEmailVerification(res.user)
      .then(data => {
        this.switchLoginMode();
        this.messaggiero.presentToast("Mail inviata")
      })
      .catch(error => this.messaggiero.presentToast("Errore, riprova più tardi", "danger"));
    })
    .catch((error: FirebaseError) => {
      this.messaggiero.presentToast("Errore, riprova più tardi", "danger");
      console.log(error.code, error.customData, error.message)
      let err : TipiDiFirebaseError = <any>error.code;
      switch (err) {
        case "auth/email-already-in-use":
          this.messaggiero.presentToast("Mail già registrata", "danger");
          break;
        case "auth/invalid-email":
          this.messaggiero.presentToast("Mail non valida", "danger");
          break
        case "auth/weak-password":
          this.messaggiero.presentToast("Password non valida", "danger");
          break
        default:
          break;
      }
    })
  }

}
