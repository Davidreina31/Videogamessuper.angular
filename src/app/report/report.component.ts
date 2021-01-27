import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../models/comment';
import { Report } from '../models/report';
import { User } from '../models/user';
import { CommentService } from '../service/comment.service';
import { ReportService } from '../service/report.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: Report[] = [];



  constructor(
    private _reportService: ReportService,
    private _userService: UserService,
    private _commentService: CommentService,
    private _videoGameService: VideogameService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._reportService.getAll().subscribe(
      (dataReport) => {
        this.report = dataReport;
        this.report.forEach(r => {
          this._userService.getOne(r.reporterUserId).subscribe(
            (dataReporterUser) => r.reporterUser = dataReporterUser
          ),
            this._commentService.getOne(r.commentId).subscribe(
              (dataComment) => {
                r.comment = dataComment;
                this._userService.getOne(r.comment.userId).subscribe(
                  (dataUser) => r.comment.user = dataUser
                ),
                  this._videoGameService.getOne(r.comment.videoGameId).subscribe(
                    (dataVideoGame) => r.comment.videoGame = dataVideoGame
                  )
              }
            )
        })
      })
  }

  public deleteReport(id: number) {
    this._reportService.deleteReport(id).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

}




