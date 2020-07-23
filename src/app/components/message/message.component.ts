import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../models/message.model';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() dataMessage: ChatMessage;
  text: string;
  date: string;
  myMessage = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authUser().subscribe( (response: firebase.User) => {
      console.log(this.dataMessage, response);
      this.myMessage = this.dataMessage.sendBy === response.uid;
      console.log(this.myMessage);
    });
    this.text = this.dataMessage.message;
    this.date = this.dataMessage.messageDate;
  }

}
