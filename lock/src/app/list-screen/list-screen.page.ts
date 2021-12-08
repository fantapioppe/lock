import { Component, OnInit } from '@angular/core';
import { set, Database, ref, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewServizioLockPage } from '../new-servizio-lock/new-servizio-lock.page';
import { MessaggieroService } from '../service/messaggiero.service';
import { UserManagerService } from '../service/userManager/user-manager.service';
import { campiServizio, ServizioLock } from '../shared/models';
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
      this.messaggiero.presentToast("Errore dati","danger", 3000)
      this.router.navigate([ROTTE.login]);
      return;
    }
    const dbReference = ref(this.databese,this.uid)
    onValue(dbReference, (lista) => {
      console.log("LISTA", lista.val());
      let objectValue: Record<string,campiServizio> = lista.val();
      this.listaServiziLock = [];
      Object.keys(objectValue).forEach( key => {
        const servizioLock = new ServizioLock();
        servizioLock.nome = key;
        servizioLock.user = this.decripta(objectValue[key].user);
        servizioLock.password = this.decripta(objectValue[key].password);
        servizioLock.note = this.decripta(objectValue[key].note);
        servizioLock.image = this.decripta(objectValue[key].image);

        this.listaServiziLock.push(servizioLock);
      });
    })
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
        user:  this.cripta(servizio.user),
        password: this.cripta(servizio.password),
        note: this.cripta(servizio.note),
        image: this.cripta(servizio.image)
      }
      this.sendData(path, dati)
    });
    modal.present();
  }

  async modificaServizio(){
    let modal = await this.modalController.create({
      component: NewServizioLockPage,
      componentProps: {modify: true},
      cssClass: "myModal",
      swipeToClose: true
    });
    modal.onDidDismiss().then(data => {
      console.log(data.data);
      let servizio : ServizioLock = data.data;
      let path = servizio.nome;
      let dati = {
        user:  this.cripta(servizio.user),
        password: this.cripta(servizio.password),
        note: this.cripta(servizio.note),
        image: this.cripta(servizio.image)
      }
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
