import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-auth0',
  templateUrl: './login-auth0.component.html',
  styleUrls: ['./login-auth0.component.scss']
})
export class LoginAuth0Component implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() : any{
    this._authService.loginWithRedirect();
  }
}
