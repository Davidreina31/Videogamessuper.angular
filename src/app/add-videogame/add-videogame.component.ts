import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Developer } from '../models/developer';
import { Plateform } from '../models/plateform';
import { Plateform_VideoGame } from '../models/plateform_VideoGame';
import { Publisher } from '../models/publisher';
import { VideoGame } from '../models/video-game';
import { DeveloperService } from '../service/developer.service';
import { PlateformVideogameService } from '../service/plateform-videogame.service';
import { PlateformService } from '../service/plateform.service';
import { PublisherService } from '../service/publisher.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: ['./add-videogame.component.scss']
})
export class AddVideogameComponent implements OnInit {

  form: FormGroup;
  videoGame: VideoGame;
  developer: Developer;
  publisher: Publisher;

  constructor(private _builder: FormBuilder, private _videoGameService: VideogameService
    , private _router: Router, private _publisherService: PublisherService,
     private _developerService: DeveloperService) { }

  ngOnInit() {
    this.form = this._builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      developer: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      jacketUrl: ['', [Validators.required]],
      1 : [false, []],
      2 : [false, []],
      3 : [false, []],
      4 : [false, []],
      5 : [false, []],
      6 : [false, []],
      7 : [false, []],
      8 : [false, []],
      9 : [false, []]
    })
  }

  public insertVideoGame(){
    if(this.form.valid){
      this.videoGame = new VideoGame();

      this.publisher = new Publisher();
      this.publisher.name = this.form.controls['publisher'].value;
      this.publisher.cityId = 1;
      this._publisherService.createPublisher(this.publisher).subscribe(data => {
        this.videoGame.publisher = data;
      })

      this.developer = new Publisher();
      this.developer.name = this.form.controls['developer'].value;
      this.developer.cityId = 1;
      this._developerService.createDeveloper(this.developer).subscribe(data => {
        this.videoGame.developer = data;
      })
      this.videoGame.name = this.form.controls['name'].value;
      this.videoGame.description = this.form.controls['description'].value;
      this.videoGame.releaseDate = this.form.controls['releaseDate'].value;
      this.videoGame.jacketUrl = this.form.controls['jacketUrl'].value;

      this.addGame(this.videoGame);
    }
  }

  public addGame(videoGame: VideoGame){
    videoGame.publisher = this.publisher;
    videoGame.developer = this.developer;
    console.log(this.videoGame);
    this._videoGameService.AddGame(videoGame).subscribe({
      next: () => this._router.navigateByUrl("/games"),
      error: (error) => console.log(error)
    })
  }
}
