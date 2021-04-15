import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/api/auth.service';
import { NavbarService } from '../../core/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private navBarService: NavbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    // console.log('FormGroup: ', this.formGroup.value);
    if (this.formGroup.invalid)
      return;

    this.authService.login(this.formGroup.value).subscribe((res: any) => {
      console.log('login: ', res)
      if (res.token && res.token != '') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
        this.navBarService.changeRole(res.role);
        this.navBarService.changeUsername(res.username);
        if (res.role && res.role != '') {
          switch (res.role) {
            case 'ADO PL': this.router.navigate(['home']); break;
            case 'ADO Tech': this.router.navigate(['upload']); break;
          }
        }
      }
    });
  }
}
