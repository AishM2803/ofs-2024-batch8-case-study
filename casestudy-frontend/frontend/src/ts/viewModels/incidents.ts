/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import * as Bootstrap from "ojs/ojbootstrap";
import "oj-c/input-number";
import "oj-c/input-text";
import "ojs/ojknockout";
import "ojs/ojknockout";
import Message = require("ojs/ojmessaging");
import 'oj-c/input-password';
import "ojs/ojlabel";
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import { ojDatePicker } from 'ojs/ojdatetimepicker';
import 'ojs/ojknockout';
import 'ojs/ojdatetimepicker';
import 'ojs/ojlabel';
import "oj-c/form-layout";
import "knockout";
import "ojs/ojknockout";
import "oj-c/button";

class IncidentsViewModel {
  firstname: ko.Observable<string> | ko.Observable<any>;
  lastname: ko.Observable<string> | ko.Observable<any>;
  username: ko.Observable<string> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;
  dob: ko.Observable<string> | ko.Observable<any>;
  address: ko.Observable<string> | ko.Observable<any>;
  email: ko.Observable<string> | ko.Observable<any>;
  mobileno: ko.Observable<string> | ko.Observable<any>;
  successMessage: ko.Observable<string>;
  errorMessage: ko.Observable<string>;




  constructor() {

    this.firstname = ko.observable("");
    this.lastname = ko.observable("");
    this.username = ko.observable("");
    this.password = ko.observable("");
    this.dob = ko.observable("");
    this.address = ko.observable("");
    this.email = ko.observable("");
    this.mobileno = ko.observable("");
    this.successMessage = ko.observable("");
    this.errorMessage = ko.observable("");

  }
  connected(): void {
    AccUtils.announce("Incidents page loaded.");
    document.title = "Incidents";
    // implement further logic if needed
  }
 register=async(event:Event) => {
    const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.firstname(),
          lastName: this.lastname(),
          username: this.username(),
          password: this.password(),
          dateOfBirth: this.dob(),
          address: this.address(),
          email: this.email(),
          phoneNumber: this.mobileno()

        })
    });

    if (response.ok) {
        const user = await response.text();
        console.log('Registration successful:', user);
        this.successMessage("Registration successful");
        this.errorMessage("")
       window.location.href="?ojr=dashboard"
    } else {
        console.error('Registration failed');
        this.successMessage("");
        this.errorMessage("Registration failed")
    }
}

}

export = IncidentsViewModel;
