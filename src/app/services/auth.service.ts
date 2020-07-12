import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  authUser: any;
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
        this.user = afAuth.authState;
  }
  loginFn(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((resolve) => {
        this.authUser = resolve;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      });
  }
  signUpFn(email: string, password: string, userName: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( user => {
        this.authUser = user;
        console.log(this.authUser);
        const status = 'online';
        this.setUserData(email, userName, status);
      })
      .catch(error => console.log(error));
  }
  setUserData(email, userName, status): void {
    const path = `users/${this.loadedUserId}`;
    console.log(path);
    const userData = {
      email: email,
      userName: userName,
      status: status
    };
    console.log(userData);
    this.db.object(path).update(userData)
      .then( resolve => console.log(resolve))
      .catch(error => console.log(error));
  }
  setUserStatus(status): void {
    const path = `users/${this.loadedUserId}`;
    const userData = {
      status: status
    };
    this.db.object(path).update(userData)
      .then( resolve => console.log(resolve))
      .catch(error => console.log(error));
  }
  get loadedUserId(): string {
    console.log(this.authUser);
    return this.authUser ? this.authUser.user.uid : '';
  }
}
