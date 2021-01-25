import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string = "http://localhost:5001/api/auth/login";

  constructor(private _client: HttpClient) { }

  
  
}
