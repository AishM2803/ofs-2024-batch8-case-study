/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
// import * as Bootstrap from "ojs/ojbootstrap";
import "oj-c/input-text";
import "ojs/ojknockout";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/form-layout";
import 'ojs/ojdatetimepicker';
import { ojDatePicker } from 'ojs/ojdatetimepicker';
import 'oj-c/button';
import 'oj-c/message-toast';
import { ojMessage } from 'ojs/ojmessage';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import * as Bootstrap from 'ojs/ojbootstrap';
import "ojs/ojprogress-bar";
import "ojs/ojtable";
import 'ojs/ojmessages';
import { whenDocumentReady } from "ojs/ojbootstrap";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import { ObservableKeySet } from "ojs/ojknockout-keyset";
import { KeySetImpl } from "ojs/ojkeyset";
import { RESTDataProvider } from 'ojs/ojrestdataprovider';

import "ojs/ojknockout-keyset";
import "ojs/ojknockout";
import "ojs/ojlabel";
import "oj-c/avatar";


type D = { id: number; name: string; email: string , username:string };
type K = D['id'];


interface EmployeeData {
  id: number;
  name: string;
  title: string;
  image: string;
}

class DashboardViewModel {

  value: ko.Observable<string>;
  firstname: ko.Observable<string> | ko.Observable<any>;
  lastname: ko.Observable<string> | ko.Observable<any>;
  salary: ko.Observable<string> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;

  readonly dataprovider: RESTDataProvider<K, D>;
  readonly keyAttributes = 'id';

  messages: ojMessage.Message[];
  messagesDataprovider: ArrayDataProvider<null, ojMessage.Message>;

  readonly progressValue = ko.observable(20);
  readonly indeterminate = ko.observableArray();

  // private readonly deptArray =   [
  //   {
  //     "DepartmentId": 10,
  //     "DepartmentName": "Finance 9",
  //     "LocationId": 300,
  //     "ManagerId": 7001,
  //     "StartDate": "2014-06-13",
  //     "EmployeeCount": 335,
  //     "Type": "Sales",
  //     "Currency": "EUR",
  //     "Primary": [],
  //     "Rating": 3,
  //     "TargetComplete": 90
  //   },
  //   {
  //     "DepartmentId": 20,
  //     "DepartmentName": "Control And Credit 9",
  //     "LocationId": 300,
  //     "ManagerId": 7001,
  //     "StartDate": "2019-09-10",
  //     "EmployeeCount": 206,
  //     "Type": "HR",
  //     "Currency": "USD",
  //     "Primary": [],
  //     "Rating": 1,
  //     "TargetComplete": 90
  //   },
  // ] 
  // readonly dataprovider = new ArrayDataProvider(this.deptArray, {
  //   keyAttributes: "DepartmentId",
  //   implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
  // });
    

  private readonly data: Array<EmployeeData> = [
    {
      id: 1,
      name: "Chris Black",
      title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
      image: "../images/hcm/placeholder-male-01.png",
    },
    {
      id: 2,
      name: "Christine Cooper",
      title: "Senior Principal Escalation Manager",
      image: "../images/hcm/placeholder-female-01.png",
    },
    {
      id: 3,
      name: "Chris Benalamore",
      title: "Area Business Operations Director EMEA & JAPAC",
      image: "../images/hcm/placeholder-male-03.png",
    },
    {
      id: 4,
      name: "Christopher Johnson",
      title: "Vice-President HCM Application Development",
      image: "../images/hcm/placeholder-male-04.png",
    },
  ];

  readonly selectedItems = new ObservableKeySet(); // observable bound to selection option to monitor current selections
    readonly selectedIds = ko.observable();
  
    getDisplayValue(set: KeySetImpl<number>) {
      return JSON.stringify(Array.from(set.values()));
    }

    handleSelectedChanged = (event: any) => {
      this.selectedIds(
        this.getDisplayValue(event.detail.value as KeySetImpl<number>)
      ); // show selected list item elements' ids
    };
    readonly dataProvider = new ArrayDataProvider<
      EmployeeData["id"],
      EmployeeData
    >(this.data, { keyAttributes: "id" });
  
  
    constructor() {
      this.value = ko.observable("Green");
      //initialization
      this.firstname = ko.observable(null);
      this.lastname = ko.observable(null);
      this.salary = ko.observable(null);
      this.password = ko.observable(null);


      const isoTimeYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      this.messages = [
        {severity: 'confirmation',
          summary: 'Confirmation message summary no detail',
          timestamp: isoTimeYesterday
        }
      ];this.messagesDataprovider = new ArrayDataProvider(this.messages);

      this.dataprovider = new RESTDataProvider({
        keyAttributes: this.keyAttributes,
        url: "https://jsonplaceholder.typicode.com/users",
        // fetchByOffset and fetchByKeys delegate to fetchFirst if their capabilities are not defined
        // so at minimum we must specify transforms for fetchFirst
        transforms: {
          fetchFirst: {
            request: async (options) => {
              const url = new URL(options.url);
              const { size, offset } = options.fetchParameters;
              url.searchParams.set('limit', String(size));
              url.searchParams.set('offset', String(offset));
              return new Request(url.href);
            },
            response: async ({ body }) => {
              // The mock server sends back a response body with shape { hasMore, totalSzie, data } so
              // we need to extract and return them
              const { data, totalSize, hasMore } = body;
              // console.log(body);
              return {'data' : body}
            }
          }
        }
      });

    }

    

    public buttonAction = async(event:Event)=>{
      let elementName = (event.currentTarget as HTMLElement).tagName;
      // alert("You clicked on a button :" +elementName);
      alert("Name = " +this.firstname() +", Salary ="+this.salary());
    
      let id = parseInt(this.firstname());
      let URL = "https://jsonplaceholder.typicode.com/users/"+id;
      let res = await fetch(URL);
      let jsonData = await res.json();
      console.log(jsonData);
    }

  // constructor() {

  // }

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  // connected(): void {
  //   AccUtils.announce("Dashboard page loaded.");
  //   document.title = "Dashboard";
  //   // implement further logic if needed
  // }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  // disconnected(): void {
  //   // implement if needed
  // }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  // transitionCompleted(): void {
  //   // implement if needed
  // }
}

Bootstrap.whenDocumentReady().then(() => {
  ko.applyBindings(new DashboardViewModel(), document.getElementById('formLayoutOptions'));
});



export = DashboardViewModel;
