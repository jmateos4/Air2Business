import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private idSource = new BehaviorSubject('default id');
  currentId = this.idSource.asObservable();

  constructor() { }

  changeId(id: string) {
    this.idSource.next(id);
  }


}
