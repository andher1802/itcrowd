import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { DatabaseService } from '../../services/database.services';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  // providers: [DatabaseService]
})
export class PersonListComponent implements OnInit {
  people: Person [] = [
  ];
  constructor( private databaseservice: DatabaseService) {

  }
  ngOnInit() {
    this.databaseservice.explorePerson().subscribe(
      ResponseData => {
        this.people = ResponseData;
        console.log(this.people);
      }
    );
  }
}
