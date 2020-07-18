import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/message.model';
import {resolve} from 'url';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userData: User;
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( response => {
        if (response) {
          this.user = response;
          console.log(this.user);
          this.getUserData();
        }
    });
  }
  getUserData(): Observable<any> {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    console.log(path);
    return  this.db.object(path).valueChanges();
  }
  getUsersData(): any {
    const path = `/users`;
    return this.db.list(path).valueChanges();
  }
  sendMessage(text: string): void {
    console.log(text);
    this.chatMessages = this.getMessages();
    this.chatMessages.push( {
      message: text,
      sendBy: this.userData.userName ? this.userData.userName : 'Zdzisław',
      messageDate: new Date().toISOString(),
      unread: true
    }).then(res => {
      console.log(res);
    });
    // this.db.list('messages').push( {
    //   message: text,
    //   sendBy: this.userName ? this.userName : '',
    //   messageDate: new Date().toISOString(),
    //   unread: true
    // }).then(res => {
    //   console.log(res);
    // });
  }
  getMessages(): any {
    return this.db.list( 'messages',  ref => ref.orderByKey().limitToLast(25)).valueChanges();
  }
}
