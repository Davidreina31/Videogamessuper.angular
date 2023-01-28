import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Description } from '../models/description';
import { User } from '../models/user';
import { CommentService } from '../service/comment.service';
import { DescriptionServiceService } from '../service/description-service.service';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo: any;
  user: User;
  description: Description;

  constructor(private auth: AuthService, private _userService: UserService, private _router: Router
    , private _sessionService: SessionService, private _descriptionService: DescriptionServiceService) { }

  ngOnInit(): void {
    this._descriptionService.get().subscribe(data => {
      this.description = data;
      console.log(data);
    })
    this.auth.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  loadData(): any{
    this.user = new User();
    this.user.userName = this.userInfo.nickname;
    this.user.email = this.userInfo.name;
    this.user.sub = this.userInfo.sub;
    this.user.role = "user";

    console.log(this.user);

    this._userService.createUser(this.user).subscribe({
      next: () => this._router.navigate(["/home"]),
      error: (error) => console.log(error)
    });

    this._sessionService.getToken(this._sessionService.loginCredentials).subscribe(data=> {
      console.log(data);
      sessionStorage.setItem("jwt",data.access_token);
    })

    
    
  }
  
}
