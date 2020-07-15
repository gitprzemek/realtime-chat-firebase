import {Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService} from '../../services/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss']
})
export class LoginAndRegisterComponent implements OnInit {
  @ViewChild('logForm', null) logForm: NgForm;
  email: string;
  password: string;
  userName: string;
  errorMessage: string;
  toggleViewFlag = false;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }
  signUp(): void {
    console.log(this.logForm);
    if (this.checkRegValidation()) {
      this.authService.signUpFn(this.email, this.password, this.userName)
        .then( resolve => this.router.navigate(['chat']))
        .catch(error => this.errorMessage = error.message);
    }
  }
  signIn(): void {
    console.log(this.logForm);
    if (this.checkRegValidation()) {
      this.authService.loginFn(this.email, this.password);
    }
  }
  toggleView(): void {
    this.toggleViewFlag = !this.toggleViewFlag;
    this.logForm.resetForm();
  }
  checkRegValidation(): boolean {
    return !(this.logForm.form.status === 'INVALID');
  }
}
