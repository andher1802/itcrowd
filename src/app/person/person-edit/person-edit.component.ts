import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../../services/database.services';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
  // providers: [DatabaseService]
})
export class PersonEditComponent implements OnInit {
  token: string;
  movieList: string[] = [];
  optionsmovies: any;
  optionspeople: any;
  selected: number[] = [];
  selected2: number[] = [];
  selected3: number[] = [];
  selected4: number[] = [];
  constructor(private databaseservice: DatabaseService ) {

  }

  ngOnInit() {
    this.databaseservice.explorePerson().subscribe(
      responseData => {
        this.optionspeople = responseData;
      }
    );
    this.databaseservice.exploreMovie().subscribe(
      responseData => {
        this.optionsmovies = responseData;
      }
    );
  }

  onSubmit( form: NgForm ) {
    console.log(form.value);
    console.log(this.token);

    if (form.value.idmovie !== 'new') {
      form.value.id = String(form.value.idmovie);
    } else {
      console.log("idnew", this.optionspeople);
      form.value.id = String(Number(this.optionspeople[this.optionspeople.length - 1].id) + 1);
    }
    let castemp: string = '[';
    if (form.value.testc.length === 1) {
      castemp = castemp + String(Number(form.value.testc[0]));
    }
    if (form.value.testc.length > 1) {
      castemp = castemp + String(Number(form.value.testc[0]));
      console.log(form.value.testc);
      const newtest = form.value.testc.splice(1);
      for (const num of newtest) {
        castemp = castemp + ',' + String(Number(num));
      }
    }
    castemp = castemp + ']';
    form.value.casting = castemp;

    let dirtemp: string = '[';
    if (form.value.testd.length === 1) {
      dirtemp = dirtemp + String(Number(form.value.testd[0]));
    }
    if (form.value.testd.length > 1) {
      dirtemp = dirtemp + String(Number(form.value.testd[0]));
      console.log(form.value.testd);
      const newtest = form.value.testd.splice(1);
      for (const num of newtest) {
        dirtemp = dirtemp + ',' + String(Number(num));
      }
    }
    dirtemp = dirtemp + ']';
    form.value.director = dirtemp;
    let protemp: string = '[';
    if (form.value.testp.length === 1) {
      protemp = protemp + String(Number(form.value.testp[0]));
    }
    if (form.value.testp.length > 1) {
      protemp = protemp + String(Number(form.value.testp[0]));
      console.log(form.value.testp);
      const newtest = form.value.testp.splice(1);
      for (const num of newtest) {
        protemp = protemp + ',' + String(Number(num));
      }
    }
    protemp = protemp + ']';
    form.value.producer = protemp;
    console.log(form.value);
    this.databaseservice.createPerson(form).subscribe(
        responseData => {
          const message = responseData;
          console.log(message);
        }
      );
    }
}
