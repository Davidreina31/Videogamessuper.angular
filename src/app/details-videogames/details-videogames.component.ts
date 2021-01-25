import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';
import { Question } from '../models/question';
import { User } from '../models/user';
import { UserVideoGame } from '../models/user-video-game';
import { VideoGame } from '../models/video-game';
import { AnswerService } from '../service/answer.service';
import { CommentService } from '../service/comment.service';
import { FavoritesGamesService } from '../service/favorites-games.service';
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
  userVideoGame: UserVideoGame;
  comments: Comment[] = [];
  comment: Comment;
  commentId: any;
  questions: Question[] = [];
  question: Question;
  userName: any;
  videoGameId: any;
  userId: any;
  questionId: any;
  answers: Answer[] = [];
  answer: Answer;
  answerText: string;
  form: FormGroup;
  formQuestion: FormGroup;
  formAnswer: FormGroup;


  constructor(private _videoGameService: VideogameService,
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _questionService: QuestionService,
    private _userService: UserService,
    private _answerService: AnswerService,
    private _favoritesGamesService: FavoritesGamesService,
    private _builder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.videoGameId = this._route.snapshot.paramMap.get("id");

    this._videoGameService.getOne(this.videoGameId).subscribe(
      (data: VideoGame) => this.videoGame = data
    )

    this._commentService.getCommentFromVideoGameId(this.videoGameId).subscribe(
      (data: Comment[]) => {
        this.comments = data;
        this.comments.forEach(c => {
          this._userService.getOne(c.userId).subscribe(
            (dataComment) => c.user = dataComment
          )
        })
      })

    this.form = this._builder.group({
      note: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })


    this._questionService.getAllFromVideoGame(this.videoGameId).subscribe(
      (data: Question[]) => {
        this.questions = data;
        this.questions.forEach(q => {
          this._userService.getOne(q.userId).subscribe(
            (dataUser) => q.user = dataUser
          ),
            this._answerService.getAllFromOneQuestion(q.questionId).subscribe(
              (dataAnswers) => {
                q.answers = dataAnswers;
                q.answers.forEach(a => {
                  this._userService.getOne(a.userId).subscribe(
                    (dataAnswers) => a.user = dataAnswers
                  )
                })
              })
        });
      }
    )

    this.formQuestion = this._builder.group({
      question: ['', [Validators.required]]
    })

    this.formAnswer = this._builder.group({
      answer: ['', [Validators.required]]
    })

  }

  public insertComment() {
    if (this.form.valid) {
      this.comment = new Comment();
      this.comment.userId = 1;
      this.comment.note = this.form.controls['note'].value;
      this.comment.commentText = this.form.controls['comment'].value;
      this.comment.videoGameId = this.videoGameId;
      this._commentService.createComment(this.comment).subscribe({
        next: () => this._router.navigate(["/games"]),
        error: (error) => console.log(error)
      })
    }
  }

  public deleteComment(id: number) {
    this._commentService.deleteComment(id).subscribe({
      next: () => this._router.navigate(["/games"]),
      error: (error) => console.log(error)
    })
  }

  public insertQuestion() {
    if (this.formQuestion.valid) {
      this.question = new Question();
      this.question.userId = 13;
      this.question.questionText = this.formQuestion.controls['question'].value;
      this.question.videoGameId = this.videoGameId;
      this._questionService.createQuestion(this.question).subscribe({
        next: () => this._router.navigate(["/games"]),
        error: (error) => console.log(error)
      })
    }
  }

  public insertAnswer(id: number) {
    if (this.formAnswer.valid) {
      this.answer = new Answer();
      this.answer.userId = 16;
      this.answer.answerText = this.formAnswer.controls['answer'].value;
      this.answer.questionId = id;
      this._answerService.createAnswer(this.answer).subscribe({
        next: () => this._router.navigate(["/games"]),
        error: (error) => console.log(error)
      })
    }
  }

  public deleteQuestion(id: number) {
    this._questionService.deleteQuestion(id).subscribe({
      next: () => this._router.navigate(["/games"]),
      error: (error) => console.log(error)
    })
  }

  public addVideoGame() {
    this.userVideoGame = new UserVideoGame();
    this.userVideoGame.userId = 1;
    this.userVideoGame.videoGameId = this.videoGameId;
    this._favoritesGamesService.AddVideoGame(this.userVideoGame).subscribe({
      next: () => this._router.navigate(["/favorites-games"]),
      error: (error) => console.log(error)
    })
  }


}
