import { Component, ViewChild } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendEmailVerification } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { IonInput } from '@ionic/angular';
import { MessaggieroService } from '../service/messaggiero.service';
import { UserManagerService } from '../service/userManager/user-manager.service';
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

  @ViewChild("mail",{static: false}) inputEmail: IonInput
  @ViewChild("psw1",{static: false}) inputPsw1: IonInput
  @ViewChild("psw2",{static: false}) inputPsw2: IonInput

  constructor(
    private auth : Auth,
    private route: Router,
    private messaggiero: MessaggieroService,
    private userManager: UserManagerService
  ) {
  }

  switchLoginMode(){
    this.loginMode = this.loginMode == "login" ? "register" : "login";
  }

  controlButtonClick()
  {
    console.log(!this.email, this.email ,!this.psw);

    if(!this.email)
    {
      this.focusInput(this.inputEmail)
      return;
    }
    else if(!this.psw)
    {
      this.focusInput(this.inputPsw1)
      return;
    }

    if(this.loginMode == "login")
    {
      this.login();
    }
    else
    {
      if(!this.pswTwo)
      {
        this.focusInput(this.inputPsw2)
        return;
      }
      this.register();
    }
  }

  login(){
    // let res = await this.auth.signInWithEmailAndPassword(this.email, this.psw);
    signInWithEmailAndPassword(this.auth, this.email, this.psw)
    .then(res => {
      console.log(res);
      console.log(res.user?.uid);
      this.userManager.user = res.user;
      this.route.navigate([ROTTE.listScreen])
    })
    .catch((error: FirebaseError) => {
      this.handleFirebaseErrors(<any>error.code);
    })
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
      let err : TipiDiFirebaseError = <any>error.code;
      this.handleFirebaseErrors(err);
    })
  }

  handleFirebaseErrors(err: TipiDiFirebaseError)
  {
    console.log(err, "ELIMINAREEEE");

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
      case "auth/user-not-found":
      case "auth/wrong-password":
        this.messaggiero.presentToast("Autenticazione fallita", "danger")
        break

      default:
        break;
    }
  }

  focusInput(ref : IonInput)
  {
    ref.setFocus();
    ref.color = "danger"
    setTimeout(()=> ref.color = null, 1000)
  }

}
