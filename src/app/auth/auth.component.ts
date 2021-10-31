import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  selection = 'login';
  nickname;
  password;
  email;
  date = Date.now();

  realTimeListener() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser.uid);
      } else {
        console.log('not logged in');
      }
    });
  }

  ngOnInit() {
    this.realTimeListener();
  }

  chooseLogin() {
    this.selection = 'login';
  }

  chooseSignUp() {
    this.selection = 'signup';
  }

  login() {
    const email = this.email;
    const password = this.password;
    const promise = firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.location.back();
    });
    promise.catch(e => console.log(e.message));
  }

  signUp() {
    const email = this.email;
    const password = this.password;
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        nickname: this.nickname,
        email: this.email,
        score: 0,
        total: 0,
        win: 0,
        draw: 0,
        lose: 0,
        date: this.date
      });
    }).then(() => {
      this.location.back();
    });
    promise.catch(error => console.log(error.message));
  }

}
