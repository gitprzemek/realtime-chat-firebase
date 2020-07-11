import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }
  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
  enterSendMessage(event): void {
    if (event.key === 13) {
      this.sendMessage();
    }
  }
}
