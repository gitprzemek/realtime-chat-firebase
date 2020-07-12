import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent implements OnInit {
  email: string;
  password: string;
  userName: string;
  errorMessage: string;
  loginEmail: string;
  loginPassword: string;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }
  signUp(): void {
    this.authService.signUpFn(this.email, this.password, this.userName)
      .then( resolve => this.router.navigate(['chat']))
      .catch(error => this.errorMessage = error.message);
  }

}
