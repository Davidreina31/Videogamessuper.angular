import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user';
import { UserVideoGame } from '../models/user-video-game';
import { VideoGame } from '../models/video-game';
import { FavoritesGamesService } from '../service/favorites-games.service';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-favorites-games',
  templateUrl: './favorites-games.component.html',
  styleUrls: ['./favorites-games.component.scss']
})
export class FavoritesGamesComponent implements OnInit {

  user: any;
  currentUser: User;
  videoGamesFavorites: VideoGame[] = [];
  userVideoGame: UserVideoGame[] = [];


  constructor(
    private _favoritesGamesService: FavoritesGamesService,
    public _sessionService: SessionService,
    private _userService: UserService,
    private _videoGameService: VideogameService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    // if(this._sessionService.getUserId() == undefined || this._sessionService.getUserRole() == "Admin"){
    //   this._router.navigate(["/home"]);
    // }
    this._authService.user$.subscribe(data =>{
      this.user = data;
      this._userService.getBySub(this.user.sub).subscribe(data => {
        this.currentUser = data;
        console.log(this.currentUser);
        this.loadData();
      })
    })
  }

  loadData(){
    this._favoritesGamesService.getAllByUser(this.currentUser.id).subscribe(data => {
      this.userVideoGame = data;
      for(let i = 0; i < this.userVideoGame.length; i++){
        this._videoGameService.getOne(this.userVideoGame[i].videoGameId).subscribe(vgData => {
          this.videoGamesFavorites.push(vgData);
        })
      }
      console.log(this.videoGamesFavorites);
    })    
  }

  public deleteVideoGame(userId: number, videoGameId: number) {
    this._favoritesGamesService.deleteVideoGame(userId, videoGameId ).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

 

}
