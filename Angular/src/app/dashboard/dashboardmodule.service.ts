import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/sessionmodule.service';
import { Observable } from 'rxjs';


// const url = `${environment.apiUrl}/productos`;
// const url2 = `${environment.apiUrl}/categorias`;
// const url3 = `${environment.apiUrl}/user`;
// const url4 = `${environment.apiUrl}/tipo`;

@Injectable({
  providedIn: 'root'
})
export class DashboardmoduleService {

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }


}
