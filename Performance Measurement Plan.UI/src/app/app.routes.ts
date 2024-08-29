import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { Table1Component } from './table1/table1.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
   { path: '' , component : LoginFormComponent },
   {path :'table1/:id' , component : Table1Component} 
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class Approutingmodule{

}