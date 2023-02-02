import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
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
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';
import { VideogameService } from '../service/videogame.service';

@Component({
  selector: 'app-details-videogames',
  templateUrl: './details-videogames.component.html',
  styleUrls: ['./details-videogames.component.scss']
})
export class DetailsVideogamesComponent implements OnInit {

  user: any;
  currentUser: User;
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
  isLogged: boolean;
  


  constructor(private _videoGameService: VideogameService,
    public _route: ActivatedRoute,
    private _commentService: CommentService,
    private _questionService: QuestionService,
    private _userService: UserService,
    private _answerService: AnswerService,
    public _favoritesGamesService: FavoritesGamesService,
    private _builder: FormBuilder,
    private _authService: AuthService,
    public _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.isLogged = this._sessionService.isLogged();
    this.videoGameId = this._route.snapshot.paramMap.get("id");

    this._videoGameService.getOne(this.videoGameId).subscribe( data=>{
      this.videoGame = data
      console.log(this.videoGame.comments);
      for(let i =0; i<this.videoGame.comments.length; i++){
        this._userService.getOne(this.videoGame.comments[i].userId).subscribe(userData =>{
          this.videoGame.comments[i].user = userData;
        })
      }
    })

    this._authService.user$.subscribe(data =>{
      this.user = data;
      this._userService.getBySub(this.user.sub).subscribe(data => {
        this.currentUser = data;
        this.userId = this.currentUser.id;
        console.log(this.currentUser);
      })
    })


    this.form = this._builder.group({
      note: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })

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
      this.comment.userId = this.userId;
      this.comment.note = this.form.controls['note'].value;
      this.comment.commentText = this.form.controls['comment'].value;
      this.comment.videoGameId = this.videoGameId;
      this._commentService.createComment(this.comment).subscribe({
        next: () => this.loadData(),
        error: (error) => console.log(error)
      })
    }
  }

  public deleteVideoGame(id: number){
    this._videoGameService.delete(id).subscribe({
      next: () => this._router.navigate(["/games"]),
      error: (error) => console.log(error)
    })
  }

  public deleteComment(id: number) {
    this._commentService.deleteComment(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }


  public insertQuestion() {
    if (this.formQuestion.valid) {
      this.question = new Question();
      this.question.userId = this._sessionService.getUserId();
      this.question.questionText = this.formQuestion.controls['question'].value;
      this.question.videoGameId = this.videoGameId;
      this._questionService.createQuestion(this.question).subscribe({
        next: () => location.reload(),
        error: (error) => console.log(error)
      })
    }
  }

  public insertAnswer(id: number) {
    if (this.formAnswer.valid) {
      this.answer = new Answer();
      this.answer.userId = this._sessionService.getUserId();
      this.answer.answerText = this.formAnswer.controls['answer'].value;
      this.answer.questionId = id;
      this._answerService.createAnswer(this.answer).subscribe({
        next: () => location.reload(),
        error: (error) => console.log(error)
      })
    }
  }

  public deleteAnswer(id: number){
    this._answerService.deleteAnswer(id).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

  public deleteQuestion(id: number) {
    this._questionService.deleteQuestion(id).subscribe({
      next: () => location.reload(),
      error: (error) => console.log(error)
    })
  }

  public addVideoGame() {
    this.userVideoGame = new UserVideoGame();
    this.userVideoGame.userId = this.userId;
    this.userVideoGame.videoGameId = this.videoGameId;
    this._favoritesGamesService.AddVideoGame(this.userVideoGame).subscribe({
      next: () => this._router.navigate(["/favorites-games"]),
      error: (error) => console.log(error)
    })
  }

  public getUserRole(): string{
    return this.currentUser.role;
  }


}
