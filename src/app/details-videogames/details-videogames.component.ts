import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoGame } from '../models/video-game';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-details-videogames',
  templateUrl: './details-videogames.component.html',
  styleUrls: ['./details-videogames.component.scss']
})
export class DetailsVideogamesComponent implements OnInit {

  videoGame : VideoGame;
  id : any;

  constructor(private _videoGameService : VideogameService,
    private _route : ActivatedRoute) { }

  ngOnInit(): void {

    this.id=this._route.snapshot.paramMap.get("id");

    this._videoGameService.getOne(this.id).subscribe(
      (data : VideoGame) => this.videoGame = data
    )
  }

}
