import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { VideoGame } from '../models/video-game';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  videoGamesList: VideoGame[] = [];
  user: any;
  currentUser: User;

  constructor(private _videogameService: VideogameService
    , private _authService: AuthService, public _sessionService: SessionService
    , private _userService: UserService) { }

  ngOnInit(): void {

    this._authService.user$.subscribe(data =>{
      this.user = data;
      this._userService.getBySub(this.user.sub).subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
      })
    })

    this._videogameService.getAll().subscribe(data=>{
      this.videoGamesList = data,
      console.log(this.videoGamesList);
    }
    )
  }

  public getUserRole(): string{
    return this.currentUser.role;
  }
}
