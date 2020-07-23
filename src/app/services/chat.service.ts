import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatMessage} from '../models/message.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  onChatChange$: BehaviorSubject<any> = new BehaviorSubject(null);
  userData: User;
  user: any;
  chatMessages: Array<ChatMessage>;
  chatMessage: ChatMessage;
  selectedChat: any;
  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore,
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
    return  this.afs.collection('users').doc(userId).valueChanges();
  }
  getUsersData(): any {
    return this.afs.collection('users').valueChanges();
  }
  sendMessage(text: string): void {
    console.log(text);
    this.afs.collection( `chats`).doc(`${this.selectedChat.id}`).collection('messages').add({
      message: text,
      sendBy: this.user.uid ? this.user.uid : '',
      messageDate: new Date().toISOString(),
      unread: false
    }).then(res => {
      console.log(res);
    });
  }
  getMessages(): any {
    if (this.selectedChat && this.selectedChat.id) {
      return this.afs.collection( `chats`).doc(`${this.selectedChat.id}`).collection('messages').valueChanges();
    } else {
      return null;
    }
  }
  getChat(contact?): any {
    console.log(this.user, contact);
    let chatExist;
    if (this.user.uid === contact.id) {
        alert('You cant talk with you');
    } else {
      chatExist = this.afs.collection(`chats`, ref => ref
        .where(`members.${this.user.uid}`, '==', true)
        .where(`members.${contact.id}`, '==', true)).valueChanges();
    }
    console.log(chatExist);
    console.log(chatExist.subscribe( r => console.log(r)));
    console.log(chatExist.subscribe( (res) => console.log(res)));
    // xxx.subscribe( res => {
    //   console.log(res)
    // });
    console.log(`members.${this.user.uid}`, `members.${contact.id}`);
    // const chatList = this.db.list('chats');
    chatExist.subscribe( res => {
      console.log(res);
      if (res && res.length) {
        console.log('CHAT EXIST');
        this.selectedChat = res[0];
        this.onChatChange$.next(this.selectedChat.id);
      } else {
        this.createChat(this.user.uid, contact.id);
      }
    });
    // console.log(this.selectedChat, this.selectedChat.key);
    // this.onChatChange$.next(this.selectedChat.key);
    // console.log(this.onChatChange$);
  }
  createChat(userId, contactId): any {
    this.selectedChat = this.afs.collection('chats').doc(userId + '__' + contactId).set({
      id: userId + '__' + contactId,
      members: {
        [userId]: true,
        [contactId]: true
      },
      lastMessage: '',
      lastMessageDate: null
    });
    console.log(this.selectedChat );
    console.log(this.selectedChat.id );
  }
}
