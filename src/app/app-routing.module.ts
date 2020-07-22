import { PersonComponent } from './person/person.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { LoginComponent } from './login/login.component';

import { PersonDeleteComponent } from './person/person-delete/person-delete.component';
import { MoviesDeleteComponent } from './movies/movies-delete/movies-delete.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'person', component: PersonComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'person/create', component: PersonEditComponent},
  { path: 'person/explore', component: PersonListComponent},
  { path: 'person/delete', component: PersonDeleteComponent},
  { path: 'movies/explore', component: MoviesListComponent},
  { path: 'movies/create', component: MoviesEditComponent},
  { path: 'movies/delete', component: MoviesDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
