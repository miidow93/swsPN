import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  role: BehaviorSubject<string> = new BehaviorSubject<string>('');

  username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  visible: boolean;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  changeRole(role: string) {
    this.role.next(role);
  }

  changeUsername(username: string) {
    this.username.next(username);
  }

}
