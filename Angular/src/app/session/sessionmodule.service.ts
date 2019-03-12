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
    constructor(private http: HttpClient) {}
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Acces-Control-Allow-Origin': '*'

    });
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

      isAdmin() {
        if (!(this.getTokenDecode() == null)) {
          if (this.getTokenDecode().role === 'admin') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      isUser() {
        if (!(this.getTokenDecode() == null)) {
          if (this.getTokenDecode().role === 'user') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }


    login(loginDto: LoginDto): Observable<LoginResponse> {
        // tslint:disable-next-line:no-shadowed-variable
        const requestOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`),
            'Access-Control-Allow-Origin': '*'
          })
        };
        class Metakey {
          // tslint:disable-next-line:variable-name
          access_token: string;

          // tslint:disable-next-line:variable-name
          constructor(access_token: string) {
            this.access_token = access_token;
          }
        }
        const metaKey = new Metakey('2ASUdJE0bhSCDs7h9Z96BDoeQ7MGBPuk');
        return this.http.post<LoginResponse>(`${authUrl}/auth`, metaKey, requestOptions);
      }

    setLoginData(loginResponse: LoginResponse) {
        localStorage.setItem('token', loginResponse.token);
        localStorage.setItem('name' , loginResponse.name);
        localStorage.setItem('email', loginResponse.email);
        localStorage.setItem('password', loginResponse.password);
        localStorage.setItem('phone', loginResponse.phone);
    }


}



