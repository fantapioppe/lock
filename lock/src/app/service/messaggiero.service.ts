import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessaggieroService {

  constructor(
    private toast: ToastController
  ) { }

  async presentToast(mgs: string, color: string = "success" ,durata: number = 2000){
    let x = await this.toast.create({message: mgs, color: color ,duration: durata})
    x.present();
  }
}
