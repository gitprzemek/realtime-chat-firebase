import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

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
  authUser: any;
  user: User;
  constructor(private chatService: ChatService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.authUser().subscribe(userLog => {
      this.authUser = userLog;
      this.getLoggedUserData();
    });
    this.chatService.getUsersData().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }
  getLoggedUserData(): void {
    this.chatService.getUserData().subscribe( (res: User) => {
      this.user = res;
      console.log(this.user);
    });
  }
  showAvatarList(): void {
    this.showAvatarDropdown = !this.showAvatarDropdown;
  }
  selectAvatar(avatar): void {
    this.selectedAvatar = avatar;
  }
  logout(): void {
    this.authService.logout();
  }
}
