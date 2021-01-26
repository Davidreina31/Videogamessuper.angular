import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVideoGame } from '../models/user-video-game';
import { VideoGame } from '../models/video-game';
import { FavoritesGamesService } from '../service/favorites-games.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-favorites-games',
  templateUrl: './favorites-games.component.html',
  styleUrls: ['./favorites-games.component.scss']
})
export class FavoritesGamesComponent implements OnInit {

  videoGamesFavorites: VideoGame[] = [];
  userVideoGame: UserVideoGame[] = [];


  constructor(
    private _favoritesGamesService: FavoritesGamesService,
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this._favoritesGamesService.getAllByUser(this._sessionService.getUserId()).subscribe(
      (dataUv) => this.userVideoGame = dataUv
    )

    this._favoritesGamesService.getVideoGamesByUserId(this._sessionService.getUserId()).subscribe(
      (data) => this.videoGamesFavorites = data
    )
  }

  public deleteVideoGame(id: number) {
    this._favoritesGamesService.deleteVideoGame(id).subscribe({
      next: () => this._router.navigate(["/home"]),
      error: (error) => console.log(error)
    })
  }

}
