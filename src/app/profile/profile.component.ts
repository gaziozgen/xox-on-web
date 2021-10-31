import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private location: Location,
    private auth: AngularFireAuth
  ) {
    auth.authState.subscribe(user => {
      if (user !== null) {
        console.log('kullanıcı varmış');
        firebase.database().ref('users/' + user.uid).once('value', snapshot => {
          console.log('kullanıcı değerleri çekildi');
          this.user = snapshot.val();
        });
      }
    });
    }

  user;

  ngOnInit() {
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.location.back();
    });
  }

  goBack() {
    this.location.back();
  }

  delete() {
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
      win: 0,
      lose: 0,
      total: 0,
      draw: 0,
      score: 0
    }).then(() => {
      location.reload();
    });
  }
}



