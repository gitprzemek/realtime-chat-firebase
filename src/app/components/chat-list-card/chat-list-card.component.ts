import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-list-card',
  templateUrl: './chat-list-card.component.html',
  styleUrls: ['./chat-list-card.component.scss']
})
export class ChatListCardComponent implements OnInit {
  @Input() contact: User;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }
  getChat(): void {
    this.chatService.getChat(this.contact);
  }
}
