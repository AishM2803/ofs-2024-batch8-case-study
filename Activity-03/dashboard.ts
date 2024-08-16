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
import 'oj-c/input-password';
import "oj-c/input-date-text";
import "ojs/ojknockout";
import "ojs/ojformlayout";
import "oj-c/button";
import 'oj-c/message-banner';
import { MessageBannerItem, CMessageBannerElement } from 'oj-c/message-banner';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type DemoMessageBannerItem = MessageBannerItem & {
  id: string;
};


class DashboardViewModel {
  value: ko.Observable<string>;
  firstname: ko.Observable<string> | ko.Observable<any>; // any means can have null values
  salary:ko.Observable<number> | ko.Observable<any>;
  password:ko.Observable<any>;
  date:ko.Observable<any>;

  readonly personalInformationMessages: MutableArrayDataProvider<string, DemoMessageBannerItem>;

  private counter: number;

  readonly updatePersonalInfo = () => {
    // remove the message from the data to close it
    let data = this.personalInformationMessages.data.slice();
    data.push({
      id: message-${++this.counter},
      severity: 'confirmation',
      summary: 'Updated personal information',
      detail: 'The provided personal information of the employee has been updated in the database.'
    });
    this.personalInformationMessages.data = data;
  };
  
    /**
     * Handles ojClose event and removes the corresponding message from the personalInformationMessages.
     * @param event The ojClose event
     */
    readonly closePersonalInformationMessage = (
      event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>
    ) => {
      // remove the message from the data to close it
      let data = this.personalInformationMessages.data.slice();
      const closeMessageKey = event.detail.key;
  
      data = data.filter((message) => (message as any).id !== closeMessageKey);
      this.personalInformationMessages.data = data;
    };
  
  
  constructor() {
    this.value = ko.observable("Green");
    this.firstname = ko.observable(null)
    this.salary = ko.observable(null);
    this.password = ko.observable(null);
    this.date = ko.observable(null);
    this.counter = 0;
  }



 
}

export = DashboardViewModel;