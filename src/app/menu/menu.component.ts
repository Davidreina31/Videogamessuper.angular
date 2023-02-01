import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  userInfo: any;
  currentUser: User;

  constructor(
    public _sessionService: SessionService,
    public _authService: AuthService,
    public _usersService: UserService
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  public loadData(){
    this._usersService.getBySub(this.userInfo.sub).subscribe(data =>{
      this.currentUser = data;
    })
  }
  public getUserRole(): string{
    return this.currentUser.role;
  }
}
