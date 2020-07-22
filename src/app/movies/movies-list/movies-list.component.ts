import { Component, OnInit } from '@angular/core';
import { Movies } from '../movies.model';
import { DatabaseService } from '../../services/database.services';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  // providers: [DatabaseService]
})
export class MoviesListComponent implements OnInit {
  movielist: Movies[] = [];
  constructor( private databaseservice: DatabaseService ) {

  }

  ngOnInit() {
    this.databaseservice.exploreMovie().subscribe(
      ResponseData => {
        this.movielist = ResponseData;
      }
    );
  }
}
