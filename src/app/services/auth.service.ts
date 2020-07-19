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
  user: Observable<firebase.User>;
  authState: any;
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
        this.user = afAuth.authState;
  }
  authUser(): any {
    return this.user;
  }
  loginFn(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((resolve) => {
        this.authState = resolve;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
        console.log(this.authState);
      })
      .catch(error => console.log(error));
  }
  signUpFn(email: string, password: string, userName: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( user => {
        this.authState = user;
        console.log(this.authState);
        const status = 'online';
        this.setUserData(email, userName, status);
      })
      .catch(error => console.log(error));
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }
  setUserData(email, userName, status): void {
    const path = `users/${this.loadedUserId}`;
    console.log(path);
    const userData = {
      id: this.loadedUserId,
      email,
      userName,
      status
    };
    console.log(userData);
    this.db.object(path).update(userData)
      .then( resolve => console.log(resolve))
      .catch(error => console.log(error));
  }
  setUserStatus(status): void {
    const path = `users/${this.loadedUserId}`;
    const userData = {
      status
    };
    this.db.object(path).update(userData)
      .then( resolve => console.log(resolve))
      .catch(error => console.log(error));
  }
  get loadedUserId(): string {
    console.log(this.authState);
    return this.authState ? this.authState.user.uid : '';
  }
}
