export type LoginMode = "register" | "login"

export type TipiDiFirebaseError = "auth/user-not-found" | "auth/invalid-email" |
                  "auth/email-already-in-use" | "auth/weak-password" | "auth/wrong-password"

export class ServizioLock {
  nome: string = "";
  user: string = "";
  password: string = "";
  note: string = "";
  image: string = "";

  isEmpty(): boolean {
    return !this.nome && !this.user && !this.password && !this.note
  }
}
