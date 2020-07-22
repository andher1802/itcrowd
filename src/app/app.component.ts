import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.services';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [DatabaseService]
})
export class AppComponent implements OnInit {
  title = 'IT-Crowd-Challenge';
  personList: any;
  token: any;
  constructor(private databaseaccess: DatabaseService) {
    this.databaseaccess.tokenUpdated.subscribe(
      (responsedata: any) => {
        this.token = responsedata;
      }
    );
  }

  ngOnInit() {
  }

}
