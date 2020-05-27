import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm: FormGroup;

  countries = {
    IN: {
      code: "IN",
      name: "INDIA",
      states: {
        "TN" :{
          code: "TN",
          name: "TAMILNADU",
          cities: [
            {
              code: "CH",
              name: "CHENNAI"
            },
            {
              code: "MD",
              name: "MADURAI"
            }
          ]
        },
        "KL":{
          code: "KL",
          name: "KERALA",
          cities: [
            {
              code: "PD",
              name: "PALAKKAD"
            },
            {
              code: "KO",
              name: "COCHIN"
            }
          ]
        }
      }
    },
    US: {
      code: "US",
      name: "UNITED STATES OF AMERICA",
      states: {
        "NY":{
          code: "NY",
          name: "NEWYORK",
          cities: [
            {
              code: "QU",
              name: "QUEENS"
            },
            {
              code: "NYC",
              name: "NEW YORK CITY"
            }

          ]

        },
        "MI":{
          code: "MI",
          name: "MIAMI",
          cities: [
            {
              code: "MI1",
              name: "MIAMI CITY 1"
            },
            {
              code: "MI2",
              name: "MIAMI CITY 2"
            }
          ]
        }
      }
    }
  };

  countryList;
  stateList;
  cityList;

  constructor() {
    this.userForm = new FormGroup({
      'Name': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      "Password": new FormControl("", Validators.required),
      "ConfirmPassword": new FormControl("", Validators.required),
      "country": new FormControl("", Validators.required),
      "state": new FormControl("", Validators.required),
      "city": new FormControl("", Validators.required),
      "gender": new FormControl("", Validators.required),
      "Marital-Status": new FormControl("", Validators.required),
      "Fav-Food": new FormControl("", Validators.required),
      "Fav-color": new FormControl("", Validators.required),
    });
    let countryKeys = Object.keys(this.countries);
    this.countryList = countryKeys.map((keys) => this.countries[keys]);
    console.log(this.countryList);

    this.userForm.get('country').valueChanges.subscribe((data) => {
      console.log(data);
      this.stateList=Object.keys(this.countries[data].states).map((keys)=>{
        return this.countries[data].states[keys];
      });
      //this.stateList = this.countries[data].states;
      console.log(this.stateList);
    });
    this.userForm.get("state").valueChanges.subscribe((data) => {
      this.cityList=this.countries[this.userForm.get('country').value]["states"][data]["cities"];
      console.log(this.cityList);
    })
  }


  submitform() {
    console.log(this.userForm.value);
    console.log(this.userForm.valid);
  }
}
