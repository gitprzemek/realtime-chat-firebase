import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatMessage} from '../models/message.model';
import {resolve} from 'url';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  onChatChange$: BehaviorSubject<any> = new BehaviorSubject(null);
  userData: User;
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  selectedChat: any;
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( response => {
        if (response) {
          this.user = response;
          console.log(this.user);
          console.log(this.user.uid);
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
    this.chatMessages = this.db.list( `messages/${this.selectedChat.key}`);
    this.chatMessages.push( {
      chatKey: this.selectedChat.key,
      message: text,
      sendBy: this.user.uid ? this.user.uid : '',
      messageDate: new Date().toISOString(),
      unread: false
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
    if (this.selectedChat && this.selectedChat.key) {
      return this.db.list( `messages/${this.selectedChat.key}`,  ref => ref.orderByKey().limitToLast(25)).valueChanges();
    } else {
      return null;
    }
  }
  getChat(contact?): any {
    console.log(this.user, contact);
    const chatList = this.db.list('chats');
    this.selectedChat = chatList.push({
      id: this.user.uid + '__' + contact.id,
      members: [this.user.uid, contact.id],
      lastMessage: '',
      lastMessageDate: null
    });
    console.log(this.selectedChat, this.selectedChat.key);
    this.onChatChange$.next(this.selectedChat.key);
    console.log(this.onChatChange$);
  }
}
