import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  

  constructor(
    public _sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

}
