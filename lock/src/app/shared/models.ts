export type LoginMode = "register" | "login"

export type TipiDiFirebaseError = "auth/user-not-found" | "auth/invalid-email" |
                  "auth/email-already-in-use" | "auth/weak-password" | "auth/wrong-password"
