import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {userLogin} from '../model1/User';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  UserId : string;
  userLogin : userLogin;

  constructor(
    private router: Router,
    private services: UsersDataService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.services.login(email, password).subscribe({
        next: (res) => this.router.navigate(['/table1/'+res.userId]),
        error: (err) => {
          console.error('Login Failed', err);
          alert('Login Failed. Please check your credentials.');
        }
      });
    } else {
      alert('Please fill in both username and password');
    }
  }


}
