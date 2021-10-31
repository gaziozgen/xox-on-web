import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { variable } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    auth: AngularFireAuth
  ) {
    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      auth.authState.subscribe(user => {
        if (user !== null) {
          console.log('kullanıcı varmış');
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/nickname').once('value', snapshot => {
            this.username = snapshot.val();
          });
        }
      });
    });
   }

  score;
  draw;
  win;
  lose;
  total;
  user;
  username;
  mode;
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  primary = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]];
  secondary = [[0, 1], [1, 0], [1, 2], [2, 1]];
  possibilities = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]];
  round = true;
  final = false;
  finalText;

  myInterval = setInterval(function() {
    $('.unit').css('height', $('.unit').css('width'));
    let height = $('.unit').css('height');
    height = $('.unit').css('height');
    height = height.slice(0, -2);
    height = Number(height);
    const size = (height * (0.67));
    $('.icon').css('font-size', size);
  }, 100);

  ngOnInit() {
    if (this.mode === 'ai') {
      this.ai();
      // $(window).resize(function() {console.log('çalıştı')});
    } else if (this.mode === 'pvp') {
      this.pvp();
    }
  }

  choice(i, j) {
    if (this.round) {
      console.log(i, j);
      this.round = false;
      this.editBoard(i, j);
      if (this.finalControl(1)) {
        console.log('player 1 win!');
        this.finalShow(1);
      } else {
        if (this.fullControl()) {
          console.log('board is full!');
          this.finalShow(3);
        } else {
          this.makeMove();
          if (this.finalControl(2)) {
            console.log('player 2 win!');
            this.finalShow(2);
          } else {
            if (this.fullControl()) {
              console.log('board is full!');
              this.finalShow(3);
            } else {
              this.round = true;
            }
          }
        }
      }
    }
  }

  makeMove() {
    let move = false;
    for (let i = 0; i < this.possibilities.length; i ++) {
      let counter = 0;
      let position = null;
      if (this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] === 2) {
        counter ++;
      } else if (this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] === 1) {
        continue;
      } else {
        position = [this.possibilities[i][0][0], this.possibilities[i][0][1]];
      }

      if (this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] === 2) {
        counter ++;
      } else if (this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] === 1) {
        continue;
      } else {
        position = [this.possibilities[i][1][0], this.possibilities[i][1][1]];
      }

      if (this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] === 2) {
        counter ++;
      } else if (this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] === 1) {
        continue;
      } else {
        position = [this.possibilities[i][2][0], this.possibilities[i][2][1]];
      }

      if (counter === 2) {
        this.board[position[0]][position[1]] = 2;
        move = true;
        return null;
      }
    }

    if (move === false) {
      for (let i = 0; i < this.possibilities.length; i ++) {
        let counter = 0;
        let position = null;
        if (this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] === 1) {
          counter ++;
        } else if (this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] === 2) {
          continue;
        } else {
          position = [this.possibilities[i][0][0], this.possibilities[i][0][1]];
        }

        if (this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] === 1) {
          counter ++;
        } else if (this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] === 2) {
          continue;
        } else {
          position = [this.possibilities[i][1][0], this.possibilities[i][1][1]];
        }

        if (this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] === 1) {
          counter ++;
        } else if (this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] === 2) {
          continue;
        } else {
          position = [this.possibilities[i][2][0], this.possibilities[i][2][1]];
        }

        if (counter === 2) {
          this.board[position[0]][position[1]] = 2;
          move = true;
          return null;
        }
      }
    }

    if (move === false) {
      const random = Math.floor(Math.random() * this.primary.length);
      if (this.board[this.primary[random][0]][this.primary[random][1]] === 0) {
        this.board[this.primary[random][0]][this.primary[random][1]] = 2;
        move = true;
        return null;
      }
      for (let i = 0; i < this.primary.length; i++) {
        if (this.board[this.primary[i][0]][this.primary[i][1]] === 0) {
          this.board[this.primary[i][0]][this.primary[i][1]] = 2;
          move = true;
          return null;
        }
      }
      for (let i = 0; i < this.secondary.length; i++) {
        if (this.board[this.secondary[i][0]][this.secondary[i][1]] === 0) {
          this.board[this.secondary[i][0]][this.secondary[i][1]] = 2;
          move = true;
          return null;
        }
      }
    }
  }

  editBoard(i, j) {
    this.board[i][j] = 1;
  }

  finalControl(side) {
    for (let i = 0; i < this.possibilities.length; i++) {
      if (
        (this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] === side) &&
        (this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] === side) &&
        (this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] === side) ) {
          this.board[this.possibilities[i][0][0]][this.possibilities[i][0][1]] = (side + 2);
          this.board[this.possibilities[i][1][0]][this.possibilities[i][1][1]] = (side + 2);
          this.board[this.possibilities[i][2][0]][this.possibilities[i][2][1]] = (side + 2);
          return true;
      }
    }
    return false;
  }

  fullControl() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  finalShow(side) {
    this.final = true;
    if (side === 2) {
      if (this.mode === 'ai') {
        this.finalText = 'computer win!';
      } else if (this.mode === 'pvp') {
        this.finalText = 'player 2 win!';
      }
      this.updateUser(2);
    } else if (side === 1) {
      if (this.username) {
        this.finalText = this.username + ' win!';
        this.updateUser(1);
      } else {
        this.finalText = 'you win!';
      }
    } else if (side === 3) {
      this.finalText = 'draw, board is full!';
      this.updateUser(3);
    }
  }

  updateUser(side) {
    if (this.username) {
      firebase.database().ref().child('users/' + firebase.auth().currentUser.uid).once('value', snapshot => {
        this.win = snapshot.val().win;
        this.lose = snapshot.val().lose;
        this.total = snapshot.val().total;
        this.draw = snapshot.val().draw;
        this.score = snapshot.val().score;
        if (side === 1) {
          this.win ++;
          this.total ++;
          this.score += 100;
        } else if (side === 2) {
          this.lose ++;
          this.total ++;
          this.score -= 10;
        } else if (side === 3) {
          this.total ++;
          this.draw ++;
          this.score += 50;
        }
      }).then( () => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          win: this.win,
          lose: this.lose,
          total: this.total,
          draw: this.draw,
          score: this.score
        });
      });
    }
  }

  newGame() {
    location.reload();
  }

  quit() {
    clearInterval(this.myInterval);
  }

  pvp() {
    console.log('pvp');
  }

  ai() {
    console.log('ai');
  }
}
