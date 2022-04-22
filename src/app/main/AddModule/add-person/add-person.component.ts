import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {
  Actions,
  Controllers,
} from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { map, startWith } from 'rxjs/operators';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';
import { Location } from '@angular/common';
import * as introJs from 'intro.js';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
})
export class AddPersonComponent implements OnInit {
  introJS = introJs();

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  myBusinessControl = new FormControl();
  filteredBusinessOptions: Observable<any[]>;

  displayedColumns: string[] = [
    'companyName',
    'jobTitle',
    'phoneExtension',
    'Email',
    'action',
  ];
  public dataSource: MatTableDataSource<any>;
  public personJobList = [];
  public jobTitleList = [];
  public BusinessList = [];

  public personForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    thirdName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    saluation: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^07[789]\d{7}$/g),
    ]),
    personalEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  public personJobForm = new FormGroup({
    personId: new FormControl(0),
    businessId: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
    phoneExtention: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });
  constructor(
    private baseService: BaseServiceService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private notification: NotificationServiceService,
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getJobTitleList();
    this.getBusinessList();
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.jobTitleList.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _Businessfilter(value: string): any[] {

    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.BusinessList.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  BusinessSelected(event) {
    const businessId = this.BusinessList.find(
      (x) => x.name === event.option.value
    ).id;
    this.personJobForm.get('businessId').setValue(businessId);
  }

  getBusinessName(id) {
    const business = this.BusinessList.find((x) => x.id == id);
    return business ? business.name : business;
  }

  jobTitleSelected(event) {
    this.personJobForm.get('jobTitle').setValue(event.option.value);
  }

  getJobTitleList() {
    this.baseService.getAllItems(Controllers.JobTitle).subscribe((res) => {
      this.jobTitleList = res as any[];
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      console.log(this.jobTitleList);
    });
  }

  getBusinessList() {
    this.baseService.getAllItems(Controllers.Business).subscribe((res) => {
      this.BusinessList = res as any[];
      this.filteredBusinessOptions = this.myBusinessControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._Businessfilter(value))
      );
      console.log(this.BusinessList);
    });
  }

  onAddPersonJob() {
    this.personJobList.push(this.personJobForm.value);
    this.personJobForm.reset();
    this.myControl.setValue('');
    this.myBusinessControl.setValue('');
    this.personJobForm.get('personId').setValue(0);
    this.dataSource = new MatTableDataSource(this.personJobList);
  }

  onDeletePersonJob(element) {
    this.personJobList = this.personJobList.filter((x) => x != element);
    this.dataSource = new MatTableDataSource(this.personJobList);
  }

  onSave() {
    if (this.personForm.invalid) {
      this.spinner.hide();
      this.personForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Person' : 'شخص', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة', 'warn')
    }
    else {
      const form = this.personForm.getRawValue();
      form.personJob = this.personJobList;
      this.spinner.show();
      this.baseService
        .postItem(Controllers.WebPerson, Actions.PostItem, form)
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.notification.showNotification(
              this.translate.currentLang == 'EN' ? 'Person' : 'شخص',
              this.translate.currentLang == 'EN' ? 'Person has been Added Successfully' : 'تمت اضافة الشخص بنجاح',
              'success'
            );
            this.router.navigate(['/main/home'])
          },
          (error) => {
            this.spinner.hide();
            this.notification.showNotification(
              this.translate.currentLang == 'EN' ? 'Person' : 'شخص',
              this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما',
              'error'
            );
          }
        );
    }
  }

  onCancel() {
    this.location.back()
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
        intro: this.translate.instant('Intro.Person.PersonForm'),
        position: 'top'
      },
      {
        element: '#step2',
        intro: this.translate.instant('Intro.Person.Submit'),
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
