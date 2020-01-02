import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();


  private navigationToggle = new BehaviorSubject<boolean>(false);
  currentState = this.navigationToggle.asObservable();

  constructor() { }

  sendMessage(message: string) {
      this.messageSource.next(message);
  }

  toggleNavigationMenu() {
      if(this.navigationToggle.getValue()==false){
          this.navigationToggle.next(true);
      }
      else{
        this.navigationToggle.next(false);
      }
  }
}
