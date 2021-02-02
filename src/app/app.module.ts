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
import { JwtModule } from '@auth0/angular-jwt';
import { InterceptorService } from './service/interceptor.service';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UsersComponent } from './users/users.component';

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:4200"],
        disallowedRoutes:[]
      }
    })

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
