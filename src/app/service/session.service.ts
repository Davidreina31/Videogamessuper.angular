import { Injectable } from '@angular/core';
import { LoggedInfo } from '../models/logged-info';
import jwt_decode from "../../../node_modules/jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  decryptedToken: any;

  constructor() { }

  public getUserId(): number{
    if(sessionStorage.getItem("userInfo") != null){
      let userId;
      userId = JSON.parse(sessionStorage.getItem("userInfo"));
      return userId["userId"];
    }
    return null;
  }

  public getUserRole(): string{
    if(sessionStorage.getItem("userInfo") != null)
    {
      let role;
      role = JSON.parse(sessionStorage.getItem("userInfo"))
      return role["role"];
    }
    return null;
  }

  public getUserName(): string{
    if(sessionStorage.getItem("userInfo") != null)
    {
      let userName;
      userName = JSON.parse(sessionStorage.getItem("userInfo"))
      return userName["userName"];
    }
    return null;
  }

  public isLogged(): boolean{
    if(sessionStorage.getItem("userInfo")!=null){
      return true;
    }
    else{
      return false;
    }
  }

  private _connectedUser: LoggedInfo;

  get connectedUser(): LoggedInfo{
    return this._connectedUser;
  }

  set connectedUser(value: LoggedInfo){
    this._connectedUser = value;
  }

  updateSessionInfo(response: any){
    const token = (<any>response).token;
    sessionStorage.setItem("jwt",token);
    this.decryptedToken = jwt_decode(token);
    let dt = new LoggedInfo(
      this.decryptedToken["UserId"],
      this.decryptedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      this.decryptedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      this.decryptedToken["exp"]
      );           
    sessionStorage.setItem("userInfo",JSON.stringify(dt));
  }
}
