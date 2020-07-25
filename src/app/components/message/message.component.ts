import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../models/message.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() dataMessage: ChatMessage;
  @Input() userLogIn;
  @Input() lastMessage = false;
  text: string;
  date: Date;
  myMessage = false;
  constructor() { }

  ngOnInit() {
    console.log(this.dataMessage);
    this.myMessage = this.dataMessage.sendBy === this.userLogIn.uid;
    this.text = this.dataMessage.message;
    this.date = new Date(this.dataMessage.messageDate * 1000);
  }

}
