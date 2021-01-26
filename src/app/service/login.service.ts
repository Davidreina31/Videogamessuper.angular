import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string = "http://localhost:5001/api/Login/";

  constructor(private _client: HttpClient) { }

  public userLogin(credentials: any): Observable<any>{
    return this._client.post<any>(this._url, credentials);
  }
  
  
}
