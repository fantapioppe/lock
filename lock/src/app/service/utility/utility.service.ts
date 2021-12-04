import { Injectable } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  focusInput(ref : IonInput)
  {
    ref.setFocus();
    ref.color = "danger"
    setTimeout(()=> ref.color = null, 1000)
  }
}
