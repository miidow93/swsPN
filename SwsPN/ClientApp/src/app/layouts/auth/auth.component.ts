import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public navBarService: NavbarService) { }

  ngOnInit(): void {
    /*var html = document.getElementsByTagName("html")[0];
    console.log(html);
    var body = document.getElementsByTagName("body")[0];
    console.log(body);*/
    this.navBarService.hide();
  }

}
