import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://localhost:5001/api/user/";

  constructor(private _client: HttpClient) { }

  public getAll() : Observable<User[]>{
    return this._client.get<User[]>(this._url);
  }
  public getOne(id: number) : Observable<User>{
    return this._client.get<User>(this._url + id);
  }
  
}
