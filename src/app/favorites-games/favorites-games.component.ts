import { Component, OnInit } from '@angular/core';
import { UserVideoGame } from '../models/user-video-game';
import { VideoGame } from '../models/video-game';
import { FavoritesGamesService } from '../service/favorites-games.service';

@Component({
  selector: 'app-favorites-games',
  templateUrl: './favorites-games.component.html',
  styleUrls: ['./favorites-games.component.scss']
})
export class FavoritesGamesComponent implements OnInit {

  userVideoGames: VideoGame[] = [];

  constructor(private _favoritesGamesService: FavoritesGamesService) { }

  ngOnInit(): void {
    this._favoritesGamesService.getVideoGamesByUserId(3).subscribe(
      (data) => this.userVideoGames = data
    )
  }

}
