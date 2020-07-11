import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userName: Observable<string>;
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( response => {
        if (response) {
          this.user = response;
        }
    });
  }
  sendMessage(text: string): void {
    console.log(text);
    // this.chatMessages = this.getMessages();
    // this.chatMessages.push( {
    //   message: text,
    //   sendBy: this.userName ? this.userName : 'Zdzisław',
    //   messageDate: new Date().toISOString(),
    //   unread: true
    // });
    this.db.list('messages').push( {
      message: text,
      sendBy: this.userName ? this.userName : 'Zdzisław',
      messageDate: new Date().toISOString(),
      unread: true
    }).then(res => {
      console.log(res);
    });
  }
  getMessages(): any {
    return this.db.list( 'messages',  ref => ref.orderByKey().limitToLast(25)).valueChanges();
  }
}
