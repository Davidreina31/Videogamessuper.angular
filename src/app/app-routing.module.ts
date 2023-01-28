import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVideogameComponent } from './add-videogame/add-videogame.component';
import { DetailsCommentComponent } from './details-comment/details-comment.component';
import { DetailsVideogamesComponent } from './details-videogames/details-videogames.component';
import { FavoritesGamesComponent } from './favorites-games/favorites-games.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginAuth0Component } from './login-auth0/login-auth0.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { RegisterComponent } from './register/register.component';
import { ReportComponent } from './report/report.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UsersComponent } from './users/users.component';

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
    component: LoginAuth0Component
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
  },
  {
    path: 'update-account',
    component: UpdateAccountComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'add-game',
    component: AddVideogameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
