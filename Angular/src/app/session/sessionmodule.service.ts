import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../interfaces/login-response.interface';
import { environment } from '../../environments/environment.prod';

const jwtDecode = require('jwt-decode');

const authUrl = `${environment.apiUrl}`;

const requestOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Acces-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})

export class SessionService {
  constructor(private http: HttpClient) { }
  request(email: string, password: string) {
    let emailPass: string;
    emailPass = btoa(email + ':' + password);
    // tslint:disable-next-line:no-shadowed-variable
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': `Basic ${emailPass}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return requestOptions;
  }


    getToken(): string {
        return localStorage.getItem('token');
    }

    setToken(token) {
        localStorage.setItem('accessToken', token);
    }

    getTokenDecode() {
        if (!(this.getToken() == null)) {
          return jwtDecode(this.getToken());
        } else {
          return null;
        }
      }

      login(loginDto: LoginDto): Observable<LoginResponse> {
        // tslint:disable-next-line:no-shadowed-variable
        const requestOptions = this.request(loginDto.email, loginDto.password);
        return this.http.post<LoginResponse>(`${authUrl}/auth`, environment.masterKey, requestOptions);
      }
    setLoginData(loginResponse: LoginResponse) {
        localStorage.setItem('token', loginResponse.token);
        localStorage.setItem('name' , loginResponse.user.name);
        localStorage.setItem('email', loginResponse.user.email);
        localStorage.setItem('role', loginResponse.user.role);
    }

    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
    isUser() {
      return localStorage.getItem('role') === 'user';
    }
}



