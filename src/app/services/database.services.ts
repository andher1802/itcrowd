import { Person } from '../person/person.model';
import { Movies } from '../movies/movies.model';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  people: Person [] = [];
  movielist: Movies [] = [];
  token = '';
  tokenUpdated = new EventEmitter<string>();
  user = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) {
  }

  explorePerson() {
    const params = new HttpParams().set('type', 'person');
    const heads = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    const httpOptions = {
      headers: heads,
      params: params
    };
    return this.http.get('http://127.0.0.1:8080/search', httpOptions)
    .pipe(
      map(
        responseData => {
          console.log(responseData);
          const peopleArray: any = [];
          const people: Person [] = [];
          for (const key in responseData) {
            peopleArray.push({...responseData[key], idfire: key});
          }
          for (const personInstance of peopleArray) {
          const casting: any[] = [];
          if (typeof personInstance.casting !== 'undefined' && personInstance.casting.length > 0) {
            for (let cast in personInstance.casting) {
              const temp_el = [personInstance.casting[cast].title, personInstance.casting[cast].relyear]
              // console.log(temp_el);
              casting.push(temp_el);
            }
          }
          const producer: any[] = [];
          if (typeof personInstance.producer !== 'undefined' && personInstance.producer.length > 0) {
            for (let prod in personInstance.producer){
              const temp_el = [personInstance.producer[prod].title, personInstance.producer[prod].relyear]
              producer.push(temp_el);
            }
          }
          const director: any[] = [];
          if (typeof personInstance.director !== 'undefined' && personInstance.director.length > 0) {
            for (let dire in personInstance.director){
              const temp_el = [personInstance.director[dire].title, personInstance.director[dire].relyear]
              director.push(temp_el);
            }
          }
          const tempPerson = new Person(
            personInstance.idfire,
            personInstance.firstName,
            personInstance.lastName,
            casting,
            producer,
            director
          );
          people.push(tempPerson);
          }
          return(people);
        }
      )
    );
  }

  exploreMovie() {
      const params = new HttpParams().set('type', 'movies');
      const heads = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      });
      const httpOptions = {
        headers: heads,
        params: params
      };
      return this.http.get('http://127.0.0.1:8080/search', httpOptions)
      .pipe(
        map(
          responseData => {
            const moviesArray: any = [];
            for (const key in responseData) {
              moviesArray.push({...responseData[key], idfire: key});
            }
            for (const movieInstance of moviesArray) {
              const casting: any[] = [];
              if (typeof movieInstance.casting !== 'undefined' && movieInstance.casting.length > 0) {
                for (let cast in movieInstance.casting) {
                  const temp_el = [movieInstance.casting[cast].firstName, movieInstance.casting[cast].lastName]
                  casting.push(temp_el);
                }
              }
              const producer: any[] = [];
              if (typeof movieInstance.producer !== 'undefined' && movieInstance.producer.length > 0) {
                for (let prod in movieInstance.producer) {
                  const temp_el = [movieInstance.producer[prod].firstName, movieInstance.producer[prod].lastName]
                  producer.push(temp_el);
                }
              }
              const director: any[] = [];
              if (typeof movieInstance.director !== 'undefined' && movieInstance.director.length > 0) {
                for (let dire in movieInstance.director) {
                  const temp_el = [movieInstance.director[dire].firstName, movieInstance.director[dire].lastName]
                  director.push(temp_el);
                }
              }
              const tempMovies = new Movies(
                movieInstance.idfire,
                movieInstance.title,
                movieInstance.relyear,
                casting,
                producer,
                director
                );
              this.movielist.push(tempMovies);
              }
            return(this.movielist);
          }
        )
      );
    }

  login(form: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*'
        })
      };
      return  this.http.post('http://127.0.0.1:8080/login', form.value, httpOptions)
      .pipe(
        map(
          responseData => {
            const token = responseData['token'];
            console.log(token);
            return(token);
          }
      )
    );
  }

  createPerson(form: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      })
    };
    return this.http.post('http://127.0.0.1:8080/create', form.value, httpOptions);
  }

  createMovie(form: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      })
    };
    return this.http.post('http://127.0.0.1:8080/create_movies', form.value, httpOptions);
  }

  delete(form: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      })
    };
    return this.http.post('http://127.0.0.1:8080/delete', form.value, httpOptions);
  }

}
