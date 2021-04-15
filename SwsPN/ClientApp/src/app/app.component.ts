import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from './core/services/navbar.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';


export let browserRefresh = false;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app-version10';
  subscription: Subscription;

  constructor(private navBarService: NavbarService, private router: Router) {
    console.log('<------ App Component ------->')
    this.navBarService.changeRole(localStorage.getItem('role'));
    this.navBarService.changeUsername(localStorage.getItem('username'));
    /*this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Event ------> ', event);
        console.log('Router ------> ', this.router.navigated);
        browserRefresh = !router.navigated;
      }
    });*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
