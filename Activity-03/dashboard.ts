/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

  /**
   * Optional ViewModel method inv
   * oked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
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
  import "oj-c/form-layout"
  import "knockout";
  import "ojs/ojknockout";
  import "oj-c/button";
  import { whenDocumentReady } from 'ojs/ojbootstrap';
  import { MessageBannerItem, CMessageBannerElement } from 'oj-c/message-banner';
  import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
  
  import 'ojs/ojformlayout';
  import 'oj-c/input-text';
  import 'ojs/ojknockout';
  import 'oj-c/message-banner';
  import 'oj-c/button';
  import "ojs/ojknockout";
  import "oj-c/progress-bar";
  import "ojs/ojbutton";
  
  type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
  };
 
  
  class DashboardViewModel {
    value: ko.Observable<string>;
    firstname: ko.Observable<string> | ko.Observable<any>; // any means can have null values
    salary:ko.Observable<number> | ko.Observable<any>;
    password:ko.Observable<any> | ko.Observable<any>;
    date:ko.Observable<Date> | ko.Observable<any>;

    button2Text: string;
    clickedButton: ko.Observable<string>;
    
    readonly personalInformationMessages: MutableArrayDataProvider<string, DemoMessageBannerItem>;
    
    private counter: number;
    readonly closePersonalInformationMessage = (
      event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>
    ) => {
      // remove the message from the data to close it
      let data = this.personalInformationMessages.data.slice();
      const closeMessageKey = event.detail.key;
  
      data = data.filter((message) => (message as any).id !== closeMessageKey);
      this.personalInformationMessages.data = data;
    };

    readonly updatePersonalInfo = () => {
      // remove the message from the data to close it
      let data = this.personalInformationMessages.data.slice();
      data.push({
        id: `message-${++this.counter}`,
        severity: 'confirmation',
        summary: 'information added successfully',
        detail: 'The provided personal information of the employee has been updated in the database.'
      });
      this.personalInformationMessages.data = data;
    };

    private readonly step = ko.observable(0);
    readonly progressValue = ko.pureComputed(() => {
      return Math.min(this.step(), 100);
    });
    constructor() {
      this.value = ko.observable("Green");
      this.firstname = ko.observable(null)
      this.salary = ko.observable(null);
      this.password=ko.observable(null);
      this.date=ko.observable(null);
      this.button2Text = "SUBMIT";
      this.clickedButton = ko.observable("(None clicked yet)");

      const initialPersonalSectionData = [
        {
          id: 'message',
          severity: 'confirmation',
          summary: 'information added successfully',
          detail:
            'The provided personal information of the employee has been updated in the database.',
          timestamp: new Date().toISOString()
        }
        
      ];
      this.counter = 0;
      this.personalInformationMessages = new MutableArrayDataProvider(initialPersonalSectionData, {
        keyAttributes: 'id'
      });

      window.setInterval(() => {
        this.step((this.step() + 1) % 200);
      }, 30);
    
    }
    
    public buttonClick = (event: Event) => {
      this.clickedButton((event.currentTarget as HTMLElement).id);
      return true;
    };

    
    }
      
  Bootstrap.whenDocumentReady().then(() => {
    ko.applyBindings(
      new DashboardViewModel(),
      document.getElementById("buttons-container")
    );
  });
  
  whenDocumentReady().then(() => {
    ko.applyBindings(
      new DashboardViewModel(),
      document.getElementById("progressBarWrapper")
    );
  });
  
export = DashboardViewModel;

