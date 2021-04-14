import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ErrWrsService {

  constructor(private http: HttpClient) { }


  getAllErrWrs() {
    return this.http.get(`${api}errwrs`);
  }

  postErrWrs(data) {
    return this.http.post(`${api}errwrs`, data);
  }

  getNotReported() {
    return this.http.get(`${api}errwrs/notreported`);
  }

  getAlreadyReported() {
    return this.http.get(`${api}errwrs/alreadyreported`);
  }

  editErrWrs(id, data) {
    return this.http.put(`${api}errwrs/${id}`, data);
  }

  /*sendEmail() {
    return this.http.get(`${api}errwrs/email`);
  }*/
}
