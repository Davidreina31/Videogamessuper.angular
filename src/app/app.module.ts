import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FavoritesGamesComponent } from './favorites-games/favorites-games.component';
import { GamesComponent } from './games/games.component';

import { QuestionsComponent } from './questions/questions.component';
import { DetailsVideogamesComponent } from './details-videogames/details-videogames.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ReportComponent } from './report/report.component';
import { DetailsCommentComponent } from './details-comment/details-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    FavoritesGamesComponent,
    GamesComponent,
    QuestionsComponent,
    DetailsVideogamesComponent,
    CreateCommentComponent,
    ReportComponent,
    DetailsCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
