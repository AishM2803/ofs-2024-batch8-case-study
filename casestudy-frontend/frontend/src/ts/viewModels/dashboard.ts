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

class DashboardViewModel {
    username: ko.Observable<string>;
    password: ko.Observable<string>;
    successMessage: ko.Observable<string>;
    errorMessage: ko.Observable<string>;
  
  
    
    constructor() {
      this.username = ko.observable("");
      this.password=ko.observable("");
      this.successMessage = ko.observable("");
      this.errorMessage = ko.observable("");
  
    }
    connected(): void {
        AccUtils.announce("Dashboard page loaded.");
        document.title = "Dashboard";
        
    }

    login = async(event:Event) => {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.username(),
                password: this.password()
            })
        });

        if (response.ok) {
            const user = await response.text();
            console.log('Login successful:', user);
            this.successMessage("Login successful");
            this.errorMessage("")
            window.location.href="?ojr=incidents"
        } else {
            console.error('Login failed');
            this.successMessage("");
            this.errorMessage("login failed")
        }
    }
}

export = DashboardViewModel;
