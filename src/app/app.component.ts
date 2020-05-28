import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { stringify } from 'querystring';


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
        "TN": {
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
        "KL": {
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
        "NY": {
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
        "MI": {
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

  countryList=[];
  stateList=[];
  cityList=[];
  i:string;

  constructor(private fb: FormBuilder) {
    /*this.userForm = new FormGroup({
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
    });*/
    
    this.countryList = Object.keys(this.countries);
    console.log(this.countryList);

    this.userForm = this.fb.group({
      name: this.fb.control("",Validators.required),
      email: this.fb.control("", [Validators.required, Validators.email]),
      Password: this.fb.control("",Validators.required),
      ConfirmPassword: this.fb.control("",Validators.required),
      address: this.fb.array([
        this.fb.group({
          country:this.fb.control("",Validators.required),
          state:this.fb.control("",Validators.required),
          city:this.fb.control("",Validators.required),
        }),
        this.fb.group({
          country:this.fb.control("",Validators.required),
          state:this.fb.control("",Validators.required),
          city:this.fb.control("",Validators.required),
        }),
      ]),
      gender:this.fb.control("",Validators.required),
      Marital:this.fb.control("",Validators.required),
      Food:this.fb.control("",Validators.required),
      Color: this.fb.control("",Validators.required),

    });

    console.log(this.userForm.get("address").value);

    for(let  i in this.userForm.get('address').value){
      console.log(this.userForm.get('address').get(i).get('country').valueChanges);
      this.userForm.get('address').get(i).get('country').valueChanges.subscribe((data) => {
        this.stateList[i] = Object.keys(this.countries[data].states).map((item) => {
          console.log(this.countries[data].states[item]);
          return this.countries[data].states[item];
        });
      });
    }
    for(let i in this.userForm.get('address').value){
      // console.log( this.myForm.get('address').get(i).get('state'))
      this.userForm.get('address').get(i).get('state').valueChanges.subscribe((data) => {
        console.log(data);
        this.cityList[i] = this.countries[this.userForm.get('address').get(i).get('country').value]['states'][data]['cities'];
        // console.log(this.cityList);
      });
    }

    /*this.userForm.get("address").get("country").valueChanges.subscribe((data) => {
      console.log(data);
      this.stateList = Object.keys(this.countries[data].states).map((keys) => {
        return this.countries[data].states[keys];
      });
      //this.stateList = this.countries[data].states;
      console.log(this.stateList);
    });
    this.userForm.get("address").get("state").valueChanges.subscribe((data) => {
      this.cityList = this.countries[this.userForm.get("address").get("country").value]["states"][data]["cities"];
      console.log(this.cityList);
    })*/
  }


  submitform() {
    console.log(this.userForm.value);
    console.log(this.userForm.valid);
  }
}
