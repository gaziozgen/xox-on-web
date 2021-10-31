import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor() {}

  users;
  keys;
  data;

  ngOnInit() {
    firebase.database().ref('users').once('value', snapshot => {
      this.data = snapshot.val();
      this.keys = Object.keys(this.data);
      this.users = [];
      for (let i = 0; i < this.keys.length; i++) {
        this.users.push(this.data[this.keys[i]]);
        this.users[i]['key'] = this.keys[i];
      }
      console.log(this.data);
      console.log(this.keys);
      console.log(this.users);

      // for (let i = 1; i < this.users.length; i++) {
      //   const copy = this.users[i];
      //   if (this.users[i].score > this.users[i - 1].score) {
      //     this.users[i] = this.users[i - 1];
      //     this.users[i - 1] = copy;
      //   }
      // }

      this.users.sort(function(o1, o2) {
        if (o1.score > o2.score) {
          return -1;
        } else if (o1.score < o2.score) {
          return  1;
        } else {
          return  0;
        }
      });
    });
  }

  // users;

  // ngOnInit() {
  //   firebase.database().ref('users').orderByChild('score').once('value', snapshot => {
  //     this.users = [];
  //     snapshot.forEach(child => { this.users.push({ ...child.val(), key: child.key });
  //   });

  //   console.log(this.users);
  //   });
  // }

  // arr;
  // keys;

  // ngOnInit() {
  //   firebase.database().ref().child('users').on('value', snapshot => {
  //     const users = snapshot.val();
  //     console.log(users);
  //     if (users !== null) {
  //       this.arr  = [],
  //       this.keys = Object.keys(users);

  //       console.log(this.keys);
  //       console.log(this.arr);

  //       for (let i = 0; i < this.keys.length; i++) {
  //         const key  = this.keys[i];
  //         this.arr.push(users[key]);
  //         this.arr[i]['id'] = key;
  //       }
  //       console.log(this.arr);

  //       this.arr.sort(function(o1, o2) {
  //         if (o1.score > o2.score) {
  //           return -1;
  //         } else if (o1.score < o2.score) {
  //           return  1;
  //         } else {
  //           return  0;
  //         }
  //       });

  //       console.log(this.arr);
  //     }
  //   });
  // }

}
