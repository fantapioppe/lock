import { Component, OnInit } from '@angular/core';
import { set, Database, list, getDatabase, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewServizioLockPage } from '../new-servizio-lock/new-servizio-lock.page';
import { MessaggieroService } from '../service/messaggiero.service';
import { UserManagerService } from '../service/userManager/user-manager.service';
import { ServizioLock } from '../shared/models';
import { ROTTE } from '../shared/rotte';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.page.html',
  styleUrls: ['./list-screen.page.scss'],
})
export class ListScreenPage implements OnInit {

  listaServiziLock: ServizioLock[] = [];
  uid: string;

  constructor(
    private userManager: UserManagerService,
    private messaggiero: MessaggieroService,
    private router: Router,
    private databese: Database,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.uid = this.userManager.getUid();
    if(!this.uid)
    {
      console.log(this.uid);

      this.messaggiero.presentToast("Errore dati","danger", 3000)
      this.router.navigate([ROTTE.login]);
      return;
    }
    console.log(this.databese);
  }

  async addServizioLock(){
    let modal = await this.modalController.create({
      component: NewServizioLockPage,
      cssClass: "myModal",
      swipeToClose: true
    });
    modal.onDidDismiss().then(data => {
      console.log(data.data);
      let servizio : ServizioLock = data.data;
      let path = servizio.nome;
      let dati = {
        user:  CryptoJS.AES.encrypt(servizio.user, 'abc').toString(),
        password: servizio.password,
        note: servizio.note,
        image: servizio.image
      }
      console.log(dati);
      console.log(CryptoJS.AES.decrypt(dati.user, 'abc').toString(CryptoJS.enc.Utf8));


      this.sendData(path, dati)
    });
    modal.present();
  }

  sendData(path: string, data: any){
    set(ref(this.databese,this.uid+"/"+path), data)
  }

  cripta(dato): string{
    return CryptoJS.AES.encrypt(dato, environment.assicura).toString()
  }
  decripta(dato): string{
    return CryptoJS.AES.decrypt(dato, environment.assicura).toString()
  }

}
