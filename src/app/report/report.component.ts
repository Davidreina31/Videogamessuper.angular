import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../models/comment';
import { Report } from '../models/report';
import { User } from '../models/user';
import { CommentService } from '../service/comment.service';
import { ReportService } from '../service/report.service';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: any;

  constructor(
    private _reportService: ReportService,
    private _userService: UserService,
    private _commentService: CommentService,
    private _videoGameService: VideogameService,
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._reportService.getAll().subscribe((data) => {
      this.report = data;
      console.log(this.report[0]);
    })
  }

  public deleteReport(id: number) {
    this._reportService.deleteReport(id).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

}




