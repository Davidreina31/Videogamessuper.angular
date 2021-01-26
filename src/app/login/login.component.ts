import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedInfo } from '../models/logged-info';
import jwt_decode from "../../../node_modules/jwt-decode";
import { SessionService } from '../service/session.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin: Boolean;
  loginForm: FormGroup;
  decryptedToken: any;
  errorMsg: string;


  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _sessionService: SessionService,
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  public login(form: NgForm){
    const credentials = {
      'EmailAdress': form["email"],
      'Password': form["pwd"]      
    }
    this._loginService.userLogin(credentials).subscribe(response =>
      {
        this.EncodingTokenInSession(response);
      }, err =>{
        this.invalidLogin = true;      
        this.errorMsg = "Email ou mot de passe invalide";
      });
  }

  private EncodingTokenInSession(response: any) : void {    
    const token = (<any>response).token;
    sessionStorage.setItem("jwt",token);
    this.invalidLogin = false;
    this.decryptedToken = jwt_decode(token);
    this.
    _sessionService.connectedUser = new LoggedInfo(
      this.decryptedToken["UserId"],
      this.decryptedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      this.decryptedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      this.decryptedToken["exp"]
      );           
    sessionStorage.setItem("userInfo",JSON.stringify(this._sessionService.connectedUser));
    this._router.navigate(["/home"]);
  }

}
