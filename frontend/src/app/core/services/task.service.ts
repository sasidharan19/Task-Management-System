import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createTask(data: any) {
    return this.http.post(
      `${this.apiUrl}/tasks`,
      data
    );
  }

  getAllTasks() {
    return this.http.get(
      `${this.apiUrl}/tasks`
    );
  }

  getMyTasks() {
    return this.http.get(
      `${this.apiUrl}/tasks/my-tasks`
    );
  }

  updateTaskStatus(id: number, status: string) {
    return this.http.patch(
      `${this.apiUrl}/tasks/${id}/status`,
      { status }
    );
  }
}