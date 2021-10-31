import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HomeComponent } from './home/home.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyC6WLIDOXyyBlSsjCQmsoos5VxH4cGgCl8',
  authDomain: 'xox-online.firebaseapp.com',
  databaseURL: 'https://xox-online.firebaseio.com',
  projectId: 'xox-online',
  storageBucket: '',
  messagingSenderId: '301574697929'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScoreBoardComponent,
    GameComponent,
    ProfileComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
