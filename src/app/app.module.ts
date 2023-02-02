import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { InterceptorService } from './service/interceptor.service';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UsersComponent } from './users/users.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginAuth0Component } from './login-auth0/login-auth0.component';
import { AddVideogameComponent } from './add-videogame/add-videogame.component';
import { AddPlateformsVideogamesComponent } from './add-plateforms-videogames/add-plateforms-videogames.component';

export function tokenGetter() {
  return sessionStorage.getItem("jwt");
}

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
    DetailsCommentComponent,
    UpdateAccountComponent,
    UsersComponent,
      LoginAuth0Component,
      AddVideogameComponent,
      AddPlateformsVideogamesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-c4fngek5.us.auth0.com',
      clientId: 'TgKVsBzNfNeARkHabuCyaAci07P0zkTM'
    }),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
