import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/api/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('FormGroup: ', this.formGroup.value);
    if (this.formGroup.invalid)
      return;

    this.authService.login(this.formGroup.value).subscribe((res: any) => {
      console.log('login: ', res)
      if (res.token && res.token != '') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
        if (res.role && res.role != '') {
          switch (res.role) {
            case 'Admin': this.router.navigate(['home']); break;
            case 'Tech': this.router.navigate(['upload']); break;
          }
        }
      }
    });
  }
}
