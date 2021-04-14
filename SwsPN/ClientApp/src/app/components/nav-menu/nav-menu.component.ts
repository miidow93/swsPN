import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  role;
  username;
  constructor(public navBarService: NavbarService, private router: Router) {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    console.log(':::', this.role);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    let token = localStorage.getItem('token');

    if (token)
      localStorage.removeItem('token');
    if (this.role)
      localStorage.removeItem('role');
    if (this.username)
      localStorage.removeItem('username');

    this.router.navigate(['login']);
  }

}
