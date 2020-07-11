import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() dataMessage: ChatMessage;
  text: string;
  date: string;
  constructor() { }

  ngOnInit() {
    this.text = this.dataMessage.message;
    this.date = this.dataMessage.messageDate;
  }

}
