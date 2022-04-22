import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as introJs from 'intro.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actions, Controllers } from 'src/app/shared/global-variables/api-config';
import { BusinessStatus, NoOfEmployee, BasicModel, CorporateType, AccountType, Filters, Groups, Sector, SubSector, Country, Nationality, City, JobTitle } from 'src/app/shared/models/loockups.model';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { StateService } from 'src/app/shared/services/State.Service';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss'],
})
export class AdvanceSearchComponent implements OnInit {
  introJS = introJs();

  public filterControl = new FormControl();

  constructor(private baseService: BaseServiceService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private stateService: StateService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.filterControl.setValue(1);
  }


  public onSearchPerson(form) {
    this.spinner.show()
    this.baseService.postItem(Controllers.Search, Actions.PersonAdvanceSearch, form).subscribe(res => {
      this.spinner.hide()
      this.stateService.setPersonSearchResults((res as any),form);
      this.route.navigate(['/main/person-search-result'])

    }, error => {
      this.spinner.hide()
      console.log(error)
    })
  }

  public onSearchBuiness(form) {
    this.spinner.show()
    this.baseService.postItem(Controllers.Search, Actions.BusinessAdvanceSearch, form).subscribe(res => {
      this.spinner.hide()
      this.stateService.setBusinessSearchResults((res as any),form)
      this.route.navigate(['/main/business-search-result'])

    }, error => {
      this.spinner.hide()
    })

  }

    //demoo
defineIntroSteps() {
  this.introJS.setOptions({
    exitOnOverlayClick: false,
    showStepNumbers: false,
    overlayOpacity: 0.6,
    steps: [
      {
        element: '#step1',
        intro: this.translate.instant('Intro.AdvanceSearch.AdvancePage'),
        position: 'top'
      },
      {
        element: '#step2',
        intro: this.translate.instant('Intro.AdvanceSearch.DataType'),
        position: 'bottom'
      },
    ]
  })
}

OnStartDemo() {
this.defineIntroSteps()
this.introJS.start();
}
}
