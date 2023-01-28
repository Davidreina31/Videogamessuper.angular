import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoGame } from '../models/video-game';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.scss']
})
export class AddVideogameComponent implements OnInit {

  form: FormGroup;
  videoGame: VideoGame;

  constructor(private _builder: FormBuilder, private _videoGameService: VideogameService
    , private _router: Router) { }

  ngOnInit() {
    this.form = this._builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      jacketUrl: ['', [Validators.required]]
    })
  }

  public insertVideoGame(){
    if(this.form.valid){
      this.videoGame = new VideoGame();
      this.videoGame.name = this.form.controls['name'].value;
      this.videoGame.description = this.form.controls['description'].value;
      this.videoGame.jacketUrl = this.form.controls['jacketUrl'].value;
      this.videoGame.developerId = 1;
      this.videoGame.publisherId = 1;
      this._videoGameService.AddGame(this.videoGame).subscribe({
        next: () => this._router.navigateByUrl("/games"),
        error: (error) => console.log(error)
      })
    }
  }

}
