export type LoginMode = "register" | "login"

export type TipiDiFirebaseError = "auth/user-not-found" | "auth/invalid-email" |
                  "auth/email-already-in-use" | "auth/weak-password" | "auth/wrong-password"

export interface campiServizio{
  user: string;
  password: string;
  note: string;
  image: string;
}

export class ServizioLock implements campiServizio {
  nome: string = "";
  user: string = "";
  password: string = "";
  note: string = "";
  image: string = "";

  isEmpty(): boolean {
    return !this.nome && !this.user && !this.password && !this.note
  }
}
