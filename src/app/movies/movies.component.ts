import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.services';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  // providers: [DatabaseService]
})
export class MoviesComponent implements OnInit {
  constructor(private databaseaccess: DatabaseService) {

  }

  ngOnInit() {

  }

}
