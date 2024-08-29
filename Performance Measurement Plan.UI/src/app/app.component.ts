import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table1Component } from './table1/table1.component';
import { LoginFormComponent } from './login-form/login-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  Table1Component,  LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projecttwo';
}
