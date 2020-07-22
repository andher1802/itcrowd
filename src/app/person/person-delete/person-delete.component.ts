import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.services';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css'],
  // providers: [DatabaseService]
})
export class PersonDeleteComponent implements OnInit {
  optionspeople: any;
  selected4: number[] = [];

  constructor(private databaseservice: DatabaseService) { }

  ngOnInit() {
    this.databaseservice.explorePerson().subscribe(
      responseData => {
        this.optionspeople = responseData;
      }
    );
  }

  onSubmit(form: NgForm) {
    form.value.type = 'person';
    console.log(form.value);
    this.databaseservice.delete(form).subscribe(
      responsedata => {
        console.log(responsedata);
      }
    );
  }
}
