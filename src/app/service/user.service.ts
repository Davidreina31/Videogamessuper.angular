import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscribable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://localhost:5001/api/user/";

  constructor(
    private _client: HttpClient,
    private _router: Router
    ) { }

  public getAll() : Observable<User[]>{
    return this._client.get<User[]>(this._url);
  }
  public getOne(id: number) : Observable<User>{
    return this._client.get<User>(this._url + id);
  }
  
  public createUser(u: User) : Observable<void>{
    return this._client.post<void>(this._url, u);
    }
  
  public updateUser(id: number, u:User): Observable<void>{
    return this._client.put<void>(this._url + id, u);
  }

  public deleteUser(id: number): Observable<void>{
    return this._client.delete<void>(this._url + id);
  }

  }

  

