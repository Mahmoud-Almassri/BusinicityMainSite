import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Controllers } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss'],
})
export class SearchDetailsComponent implements OnInit {
  public bordOfDirectorsDataSource
  public contactDataSource
  public partnersDataSource
  public businessClassficationList
  public businessSearchObject;
  public personSearchObject: any = {};
  public isLoading=true;
  public numberT:number;

  public isPerson: boolean = false;
  public isBusiness: boolean = false;
  bordOfDirectorsDisplayedColumns: string[] = [
    'memberName',
    'description',
    'dateOfElection',
    'represnted',
  ];

  contactDisplayedColumns: string[] = ['title', 'name', 'email'];

  partnerDisplayedColumns: string[] = ['memberName', 'nationality', 'share'];

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private baseService: BaseServiceService
  ) { }
location:Location
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (
        this.activatedRoute.snapshot.queryParams['detailsFor'] === 'business'
      ) {
        this.isBusiness = true
        this.getBusiness(param.id);
      } else if (this.activatedRoute.snapshot.queryParams['detailsFor'] === 'person') {
        this.isPerson = true
        this.getPerson(param.id)
      }
    });
  }

  getBusiness(id) {
    this.spinner.show();

    this.baseService.getById(Controllers.Business, id).subscribe((res) => {
      this.spinner.hide();
      this.businessSearchObject = res as any;
      this.bordOfDirectorsDataSource = this.businessSearchObject.boardOfDirectors;
      this.partnersDataSource = this.businessSearchObject.businessPartners;
      this.businessClassficationList = this.businessSearchObject.businessClassifications;
      this.businessSearchObject.latitude=this.convertToNumber(this.businessSearchObject.latitude,18)
      this.businessSearchObject.longitude=this.convertToNumber(this.businessSearchObject.longitude,18)
      console.log(this.businessSearchObject)
      this.isLoading=false;
    },error =>{
      this.spinner.hide()
    });
  }

  getPerson(id) {
    this.spinner.show();
    this.baseService.getById(Controllers.Person, id).subscribe((res) => {
      this.spinner.hide();
      this.personSearchObject = res as any;
      this.isLoading=false;
    },error=>{
      this.spinner.hide()
    });
  }

  public convertToNumber(theform: string,lenth) {
    var num = theform;
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,10})?/)[0];
    console.log(with2Decimals)
    //this.numberT=parseFloat(theform).toFixed(theform.split('.')[1].length);

    return Number(with2Decimals);
  }
}
