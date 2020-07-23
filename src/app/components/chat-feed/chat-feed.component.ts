import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AngularFireList} from '@angular/fire/database';
import {ChatMessage} from '../../models/message.model';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, OnChanges, OnDestroy {
  feed: ChatMessage[];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
    this.chatService.onChatChange$.subscribe( res => {
      console.log(res);
      if (res) {
        this.getMessageFn();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
  }
  ngOnDestroy(): void {
    this.feed = [];
  }
  getMessageFn(): void {
    if (this.chatService.getMessages()) {
      this.chatService.getMessages().subscribe(messages => {
        this.feed = messages;
        console.log(messages);
      });
    }
  }

}
