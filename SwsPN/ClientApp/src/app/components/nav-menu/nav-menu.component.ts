import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { browserRefresh } from '../../../app/app.component';



@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  role;
  username;
  //public browserRefresh: boolean;

  constructor(public navBarService: NavbarService, private router: Router) {
    // console.log(':::', this.role);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    this.navBarService.role.subscribe(res => {
      console.log('Res: ', res);
      this.role = res;
    });
    this.navBarService.username.subscribe(res => this.username = res);
    //console.log('Refresh: ', browserRefresh);
    //this.browserRefresh = browserRefresh;
    // this.role = localStorage.getItem('role');
    // this.username = localStorage.getItem('username');
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
