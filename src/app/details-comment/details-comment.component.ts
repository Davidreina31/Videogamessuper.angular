import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../models/comment';
import { Report } from '../models/report';
import { CommentService } from '../service/comment.service';
import { ReportService } from '../service/report.service';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-details-comment',
  templateUrl: './details-comment.component.html',
  styleUrls: ['./details-comment.component.scss']
})
export class DetailsCommentComponent implements OnInit {

  commentId: any;
  comment: Comment;
  form: FormGroup;
  report: Report;

  constructor(
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _userService: UserService,
    private _videoGameService: VideogameService,
    private _builder: FormBuilder,
    private _reportService: ReportService,
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.commentId = this._route.snapshot.paramMap.get("id");
    this._commentService.getOne(this.commentId).subscribe(
      (data) => {
        this.comment = data;
        this._userService.getOne(this.comment.userId).subscribe(
          (dataUser) => this.comment.user = dataUser
        )
        this._videoGameService.getOne(this.comment.videoGameId).subscribe(
          (dataVideoGame) => this.comment.videoGame = dataVideoGame
        )
      })

    this.form = this._builder.group({
      report: ['', [Validators.required]]
    })
  }

  public insertReport() {
    if (this.form.valid) {
      this.report = new Report();
      this.report.commentId = this.commentId;
      this.report.reporterUserId = this._sessionService.getUserId();
      this.report.reason = this.form.controls['report'].value;
      this._reportService.createReport(this.report).subscribe({
        next: () => this._router.navigate(["/detailsvg/" + this.comment.videoGameId]),
        error: (error) => console.log(error)
      })
    }
  }

}
