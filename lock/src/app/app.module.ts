import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAd0cx75SypZXIo6de9b1r7QbbcvpfJzjo",
  authDomain: "lock-7d8f1.firebaseapp.com",
  databaseURL: "https://lock-7d8f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lock-7d8f1",
  storageBucket: "lock-7d8f1.appspot.com",
  messagingSenderId: "290165431405",
  appId: "1:290165431405:web:74c528977afc0786f47364",
  measurementId: "G-76L84T15H7"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
