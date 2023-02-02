import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plateform } from '../models/plateform';
import { Plateform_VideoGame } from '../models/plateform_VideoGame';
import { VideoGame } from '../models/video-game';
import { PlateformVideogameService } from '../service/plateform-videogame.service';
import { PlateformService } from '../service/plateform.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-add-plateforms-videogames',
  templateUrl: './add-plateforms-videogames.component.html',
  styleUrls: ['./add-plateforms-videogames.component.scss']
})
export class AddPlateformsVideogamesComponent implements OnInit {

  form: FormGroup;
  plateforms: Plateform[] = [];
  plalteformVg: Plateform_VideoGame[] = [];
  plalteformVgToDelete: Plateform_VideoGame[] = [];
  plateformIds: number[] = [];
  videoGameId: any;
  videoGame: VideoGame;
  formReady: boolean = false;

  constructor(private _builder: FormBuilder, private _plateformService: PlateformService,
    private _plateformVideoGameService: PlateformVideogameService, private _router: Router,
    public _route: ActivatedRoute, private _videoGameService: VideogameService) { }

  ngOnInit() {
    this.videoGameId = this._route.snapshot.paramMap.get("id");
    this._plateformService.getAll().subscribe((data) => {
      this.plateforms = data;
      console.log(this.plateforms);
    })
    this._videoGameService.getOne(this.videoGameId).subscribe(data => {
      this.videoGame = data;
      for (let i = 0; i < this.videoGame.plateformVideoGame.length; i++) {
        this.plateformIds.push(this.videoGame.plateformVideoGame[i].plateformId);
      }
      this.initializeForm();
    })
  }

  initializeForm() {
    this.form = this._builder.group({
      1: [this.isSelected(1), []],
      2: [this.isSelected(2), []],
      3: [this.isSelected(3), []],
      4: [this.isSelected(4), []],
      5: [this.isSelected(5), []],
      6: [this.isSelected(6), []],
      7: [this.isSelected(7), []],
      8: [this.isSelected(8), []],
      9: [this.isSelected(9), []],
    })
  }

  isSelected(id: number) {
    console.log(this.plateformIds);
    if (this.plateformIds.includes(id)) {
      return true;
    }
    else {
      return false;
    }
  }

  public addPlateforms() {
    let trueTab: any[] = [];
    for (let i = 1; i < 10; i++) {
      if (this.form.controls[i].value == true) {
        trueTab.push(i);
      }
    }

    this._plateformVideoGameService.getAllForVideoGameId(this.videoGameId).subscribe(data => {
      this.plalteformVgToDelete = data;
      console.log("avant" + this.plalteformVgToDelete);
      for(let i = 0; i < this.plalteformVgToDelete.length; i++){
        this._plateformVideoGameService.delete(this.plalteformVgToDelete[i].id).subscribe();
      }
      console.log("après" + this.plalteformVgToDelete);
    })

    for (let i = 0; i < trueTab.length; i++) {
      this.plalteformVg[i] = new Plateform_VideoGame();
      this.plalteformVg[i].plateformId = trueTab[i];
      this.plalteformVg[i].videoGameId = this.videoGameId;
      this._plateformVideoGameService.createPlateformVideoGame(this.plalteformVg[i]).subscribe();
    }
    this._router.navigate(["/games"]);
  }
}
