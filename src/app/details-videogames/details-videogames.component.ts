import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';
import { Question } from '../models/question';
import { User } from '../models/user';
import { VideoGame } from '../models/video-game';
import { AnswerService } from '../service/answer.service';
import { CommentService } from '../service/comment.service';
import { QuestionService } from '../service/question.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-details-videogames',
  templateUrl: './details-videogames.component.html',
  styleUrls: ['./details-videogames.component.scss']
})
export class DetailsVideogamesComponent implements OnInit {

  videoGame: VideoGame;
  comments: Comment[] = [];
  questions: Question[] = [];
  userName: any;
  videoGameId: any;
  userId: any;
  questionId: any;
  answers : Answer[] = [];
 

  constructor(private _videoGameService: VideogameService,
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _questionService: QuestionService,
    public _userService: UserService,
    private _answerService : AnswerService
  ) { }

  ngOnInit(): void {

    this.videoGameId = this._route.snapshot.paramMap.get("id");

    this._videoGameService.getOne(this.videoGameId).subscribe(
      (data: VideoGame) => this.videoGame = data
    )

    this._commentService.getCommentFromVideoGameId(this.videoGameId).subscribe(
      (data: Comment[]) => this.comments = data
    )

    this._questionService.getAllFromVideoGame(this.videoGameId).subscribe(
      (data: Question[]) => this.questions = data
    )

  }
  

}
