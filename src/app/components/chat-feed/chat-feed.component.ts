import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ChatMessage} from '../../models/message.model';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss'],
})
export class ChatFeedComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @ViewChild('feedContainer', {static: false}) private feedContainer: ElementRef;
  feed: ChatMessage[];
  userLogIn: firebase.User;
  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
    this.chatService.onChatChange$.subscribe( res => {
      console.log(res);
      if (res) {
        this.getMessageFn();
      }
    });
    this.authService.authUser().subscribe( (response: firebase.User) => {
      this.userLogIn = response;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
  }
  ngOnDestroy(): void {
    this.feed = [];
  }
  ngAfterViewChecked(): void {

    this.scrollToBottom();
  }
  getMessageFn(): void {
    if (this.chatService.getMessages()) {
      this.chatService.getMessages().subscribe(messages => {
        this.feed = messages;
        this.feed = this.feed.reverse();
        console.log(messages);
      });
    }
  }
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

}
