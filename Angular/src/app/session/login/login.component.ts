import { Component, OnInit } from '@angular/core';
import { SessionService } from '../sessionmodule.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  loginForm: FormGroup;

  constructor(private sessionService: SessionService, private router: Router ) { }

  ngOnInit() {
    this.loginForm = new FormGroup( {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',  [Validators.required, Validators.minLength(4)])
    });
  }

  doLogin() {
    const userLogin: LoginResponse = this.loginForm.value as LoginResponse;
    console.log(userLogin);
    this.sessionService.login(userLogin).subscribe(loginResp => {
      console.log(loginResp);
      this.sessionService.setLoginData(loginResp);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    }
    );
}


}
