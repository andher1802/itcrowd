import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../services/database.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [DatabaseService]
})
export class LoginComponent implements OnInit {
  constructor(private databaseservice: DatabaseService) {

  }

  ngOnInit() {
  }

  onSubmit( form: NgForm ) {
    this.databaseservice.login(form).subscribe(
      responseData => {
        console.log(responseData);
      },
      errorData => {
        console.log(errorData);
      }
    );
  }

}
