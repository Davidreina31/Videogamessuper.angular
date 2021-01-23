import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsCommentComponent } from './details-comment/details-comment.component';
import { DetailsVideogamesComponent } from './details-videogames/details-videogames.component';
import { FavoritesGamesComponent } from './favorites-games/favorites-games.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'favorites-games',
    component: FavoritesGamesComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'detailsvg/:id',
    component: DetailsVideogamesComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'detailscomment/:id',
    component: DetailsCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
