import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.services';

import { Person } from './person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  // providers: [DatabaseService]
})
export class PersonComponent implements OnInit {
  PersonList: Person[] = [];
  constructor(private databaseaccess: DatabaseService) {

  }

  ngOnInit() {

  }

}
