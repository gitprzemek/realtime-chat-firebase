import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageComponent } from './components/message/message.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginAndRegisterComponent,
    ChatroomComponent,
    ChatFormComponent,
    ChatListComponent,
    MessageComponent,
    ChatFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
