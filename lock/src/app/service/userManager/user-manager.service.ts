import { Injectable } from '@angular/core';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  public user : User

  constructor() {}

  getUid(): string {
    return this.user?.uid ? this.user.uid : '';
  }
}
