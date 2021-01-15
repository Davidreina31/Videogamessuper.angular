import { Component, OnInit } from '@angular/core';
import { VideoGame } from '../models/video-game';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  videoGamesList: VideoGame[] = [];

  constructor(private _videogameService: VideogameService) { }

  ngOnInit(): void {
    this._videogameService.getAll().subscribe(
      (data: VideoGame[]) => this.videoGamesList = data
    )
  }

}
