import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public navBarService: NavbarService) { }

  ngOnInit(): void {
    this.navBarService.show();
  }

}
