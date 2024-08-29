import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../model1/Details';
import { User } from '../model1/User';


@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private apiurl = 'https://localhost:7136/api';

  constructor(private http : HttpClient) { }

  login(username: string , password :string): Observable<User>{
    console.log("ok" , username,password)
    return this.http.post<any>(`${this.apiurl}/Users/login` , {username :username , password :password});
  }
  Details(Details : Details): Observable<Details>{
    const url = `${this.apiurl}/Details`;
    return this.http.post<any>(url, Details);
  }

  GetUserById (id:string ):Observable<User>
  {
    const url = `${this.apiurl}/Users/GetUser/`+id;
    return this.http.get<any>(url);
 
  }
}
