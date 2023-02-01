import { Injectable } from '@angular/core';
import { LoggedInfo } from '../models/logged-info';
import jwt_decode from "../../../node_modules/jwt-decode";
import { UserService } from './user.service';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { LoginCredentials } from '../models/loginCredentials';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  decryptedToken: any;
  email: string;
  result: boolean;
  user: any;
  public loginCredentials: LoginCredentials;
  private _tokenUrl: string = "https://dev-c4fngek5.us.auth0.com/oauth/token"

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _client: HttpClient
  ) {
    this.loginCredentials = new LoginCredentials();
    this.loginCredentials.client_id = "la8wSUQBhWoFVI2912q2DOYKVwgWtLXB";
    this.loginCredentials.client_secret = "eyCgRHM_-ER-qPtIHzbbsWK54gozDC4QKzGSjThdsiik9RMr8B_9GE2-Iig91ouF";
    this.loginCredentials.audience = "http://localhost:5081";
    this.loginCredentials.grant_type = "client_credentials";
   }

  public getToken(lc: LoginCredentials): any{
    return this._client.post<LoginCredentials>(this._tokenUrl, lc);
  }

  public getCurrentUserSub(): any{
    this._authService.user$.subscribe(data =>{
      this.user = data;
      return this.user.sub;
    })
  }

  public getUserId(): number{
    this._authService.user$.subscribe(data => {
      this.user = data;
      this._userService.getBySub(this.user.sub).subscribe(data => {
        console.log(this.user);
        this.user.id = data.id
      });
    })
    return this.user.id;
  }

  public getUserRole(): string{
    this._authService.user$.subscribe(data => {
      this.user = data;
      this._userService.getBySub(this.user.sub).subscribe(data => {
        this.user.role = data.role
      });
    })
    return this.user.role;
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

  public getEmail(): string{
    this._userService.getOne(this.getUserId()).subscribe(
      (data) => this.email = data.email
    )
    return this.email;
  }

  public isLogged(): boolean{
    // if(sessionStorage.getItem("userInfo")!=null){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    this._authService.isAuthenticated$.subscribe(data =>{
      this.result = data;
    });
    return this.result;
  }

  public logout(){
    // sessionStorage.removeItem("userInfo");
    // sessionStorage.clear();
    // location.reload();
    sessionStorage.removeItem("jwt");
    this._authService.logout();
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
