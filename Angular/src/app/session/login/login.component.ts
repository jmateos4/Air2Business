import { Component, OnInit } from '@angular/core';
import { SessionService } from '../sessionmodule.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators , FormBuilder} from '@angular/forms';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { LoginDto } from '../../dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required ] )],
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  doLogin() {
    const loginDto: LoginDto = this.form.value;
    this.sessionService.login(loginDto).subscribe(loginResp => {
      this.sessionService.setLoginData(loginResp);
      if (this.sessionService.isAdmin()) {
        console.log(loginResp);
        this.router.navigate(['/home']);
      } else {
        localStorage.clear();
        console.log('No eres administrador, no tienes acceso');
      }
    }, error => {
      console.log('error');
    }
    );
  }



}
