import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';

import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-user-dashboard',

  standalone: true,

  imports: [
    CommonModule,

    FormsModule,

    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
  ],

  templateUrl: './user-dashboard.component.html',

  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent
  implements OnInit
{
  tasks: any[] = [];

  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'update',
  ];

  statuses = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
  ];

  constructor(
    private authService: AuthService,

    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getMyTasks().subscribe({
      next: (response: any) => {
        this.tasks = response;
      },
    });
  }

  updateStatus(task: any) {
    this.taskService
      .updateTaskStatus(task.id, task.status)
      .subscribe({
        next: () => {
          alert('Task updated');

          this.loadTasks();
        },
      });
  }

  logout() {
    this.authService.logout();
  }
}