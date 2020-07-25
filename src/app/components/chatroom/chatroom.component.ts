import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.chatService.onChatChange$.next(null);
  }

}
