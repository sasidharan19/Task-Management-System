import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(data: any) {
    return this.http.post(
      `${this.apiUrl}/users`,
      data
    );
  }

  getUsers() {
    return this.http.get(
      `${this.apiUrl}/users`
    );
  }
}