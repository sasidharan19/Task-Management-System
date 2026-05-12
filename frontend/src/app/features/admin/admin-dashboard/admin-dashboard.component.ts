import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';

import { MatSelectModule } from '@angular/material/select';

import { AuthService } from '../../../core/services/auth.service';

import { UserService } from '../../../core/services/user.service';

import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
  ],

  templateUrl: './admin-dashboard.component.html',

  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent
  implements OnInit
{
  userForm: FormGroup;

  taskForm: FormGroup;

  users: any[] = [];

  tasks: any[] = [];

  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'assignedTo',
  ];

  constructor(
    private fb: FormBuilder,

    private authService: AuthService,

    private userService: UserService,

    private taskService: TaskService,

    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],

      email: ['', Validators.required],

      password: ['', Validators.required],

      role: ['USER', Validators.required],
    });

    this.taskForm = this.fb.group({
      title: ['', Validators.required],

      description: ['', Validators.required],

      assignedToId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();

    this.loadTasks();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
    });
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response: any) => {
        this.tasks = response;
      },
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.userService
      .createUser(this.userForm.value)
      .subscribe({
        next: () => {
          alert('User created');

          this.userForm.reset({
            role: 'USER',
          });

          this.loadUsers();
        },
      });
  }

  createTask() {
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService
      .createTask(this.taskForm.value)
      .subscribe({
        next: () => {
          alert('Task created');

          this.taskForm.reset();

          this.loadTasks();
        },
      });
  }

  logout() {
    this.authService.logout();
  }
}