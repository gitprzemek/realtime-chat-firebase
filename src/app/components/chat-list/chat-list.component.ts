import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  avatarsList = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
  showAvatarDropdown = false;
  selectedAvatar = '1-1';
  users: User[];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getUsersData().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }
  showAvatarList(): void {
    this.showAvatarDropdown = !this.showAvatarDropdown;
  }
  selectAvatar(avatar): void {
    this.selectedAvatar = avatar;
  }
}
