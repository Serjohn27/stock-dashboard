import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  sendMessage(message: string) {
      this.messageSource.next(message);
  }
}