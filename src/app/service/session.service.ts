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
    this.loginCredentials.client_id = "wtk2m79yJig4L5LyfgNi5fox0enazV53";
    this.loginCredentials.client_secret = "tkNF720XWflWJGBxUNztvMKKDWQNEXmaSrXIdzD6dAsji5N88rL1y2SL_WyS2QVa";
    this.loginCredentials.audience = "http://localhost:5001";
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
    // this._authService.user$.subscribe(data => {
    //   this.user = data;
    //   this._userService.getBySub(this.user.sub).subscribe(data => {
    //     this.user.role = data.role
    //   });
    // })
    // return this.user.role;
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
