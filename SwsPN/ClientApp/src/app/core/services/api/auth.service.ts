import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${api}auth/login`, data);
  }

  regitser(data) {
    return this.http.post(`${api}auth/register`, data);
  }
}
