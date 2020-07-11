import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AngularFireList} from '@angular/fire/database';
import {ChatMessage} from '../../models/message.model';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, OnChanges {
  feed: any;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed, this.feed.value);
    this.chatService.getMessages().subscribe(res => {
      console.log(res);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.feed = this.chatService.getMessages();
    console.log(this.feed);
  }

}
