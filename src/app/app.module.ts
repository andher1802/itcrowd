import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { MoviesDeleteComponent } from './movies/movies-delete/movies-delete.component';
import { PersonDeleteComponent } from './person/person-delete/person-delete.component';



@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    MoviesComponent,
    MoviesListComponent,
    MoviesEditComponent,
    PersonListComponent,
    PersonEditComponent,
    NavBarComponent,
    LoginComponent,
    MoviesDeleteComponent,
    PersonDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
