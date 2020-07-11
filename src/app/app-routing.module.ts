import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginAndRegisterComponent} from './components/login-and-register/login-and-register.component';
import {ChatroomComponent} from './components/chatroom/chatroom.component';


const routes: Routes = [
  {path: 'login', component: LoginAndRegisterComponent},
  {path: 'chat', component: ChatroomComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
