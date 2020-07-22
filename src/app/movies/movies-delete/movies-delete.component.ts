import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movies-delete',
  templateUrl: './movies-delete.component.html',
  styleUrls: ['./movies-delete.component.css'],
  // providers: [DatabaseService]
})
export class MoviesDeleteComponent implements OnInit {
  optionsmovies: any;
  selected4: number[] = [];
  constructor(private databaseservice: DatabaseService) { }

  ngOnInit() {
    this.databaseservice.exploreMovie().subscribe(
      responseData => {
        this.optionsmovies = responseData;
      }
    );
  }
  onSubmit(form: NgForm) {
    form.value.type = 'movies';
    console.log(form.value);
    this.databaseservice.delete(form).subscribe(
      responsedata => {
        console.log(responsedata);
      }
    );
  }

}
