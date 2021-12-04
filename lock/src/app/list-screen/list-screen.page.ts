import { Component, OnInit } from '@angular/core';
import { set, Database, list, getDatabase, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewServizioLockPage } from '../new-servizio-lock/new-servizio-lock.page';
import { MessaggieroService } from '../service/messaggiero.service';
import { UserManagerService } from '../service/userManager/user-manager.service';
import { ServizioLock } from '../shared/models';
import { ROTTE } from '../shared/rotte';

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

    });
    modal.present();
  }


}
