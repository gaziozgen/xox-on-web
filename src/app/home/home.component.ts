import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth
  ) {
      auth.authState.subscribe(user => {
        if (user !== null) {
          console.log('kullanıcı varmış');
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/nickname').once('value', snapshot => {
            this.username = snapshot.val();
          });
        }
      });
   }

  username;

  ngOnInit() {
  }
}
