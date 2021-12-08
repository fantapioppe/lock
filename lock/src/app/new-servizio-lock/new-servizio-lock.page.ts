import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { MessaggieroService } from '../service/messaggiero.service';
import { UtilityService } from '../service/utility/utility.service';
import { ServizioLock } from '../shared/models';

@Component({
  selector: 'app-new-servizio-lock',
  templateUrl: './new-servizio-lock.page.html',
  styleUrls: ['./new-servizio-lock.page.scss'],
})
export class NewServizioLockPage implements OnInit {

  servizioLock: ServizioLock;
  showPassword: boolean = false;

  @Input("modifyMode") modifyMode = false;
  @Input("servizio") servizio:ServizioLock;

  @ViewChild("nome",{static: false}) nome: IonInput;

  constructor(
    private modalController:ModalController,
    private messaggiero: MessaggieroService,
    private utility: UtilityService
  ) {
    this.servizioLock = new ServizioLock();
  }

  ngOnInit() {
    console.log("init", this.servizio, this.modifyMode);
    if(this.servizio){
      this.servizioLock = this.servizio.clone();
    }
  }

  save(){
    if(!this.servizioLock.nome)
    {
      this.utility.focusInput(this.nome);
      this.messaggiero.presentToast("Inserire nome servizio","danger")
      return;
    }
    this.modalController.dismiss(this.servizioLock)
  }

  close(){
    this.modalController.dismiss();
  }

}
