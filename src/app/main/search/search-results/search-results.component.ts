import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizeServiceService } from 'src/app/auth/authorize-service.service';
import { Controllers, Actions } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { StateService } from 'src/app/shared/services/State.Service';
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }
  public searchWord

  public isToggeled: boolean = false;
  public isBasicSearch: boolean = false;
  public isAdvanceSearch: boolean = false;

  public advanceSearchObject;
  public businessSearchObject;
  public personSearchObject;
  public isPerson: boolean = false;
  public isBusiness: boolean = false;
  public isMap: boolean = false;

  viewControl = new FormControl(1);
  businessDataSource: MatTableDataSource<any>;
  businessDisplayedColumns: string[] = [
    'nationalNumber',
    'name',
    'mobileNo',
    'fax',
    'email',
  ];
  event: any;
  personDataSource: MatTableDataSource<any>;
  personDisplayedColumns: string[] = [
    'name',
    'gender',
    'mobileNo',
    'saluation',
    'personalEmail',
  ];
  public searchList;
  public searchParams;
  public resultsFound: number;
  public totalCount: number;
  public pageSize: number;
  public isLoading=true;
  public currentPage = 1;
  public itemsPerPage = 100;
  public personDataSours;
  public isLoggedInUser: boolean = false;
  public personDTOs: any[] = [];

  constructor(
    private baseService: BaseServiceService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthorizeServiceService,
    public translate: TranslateService,
    private router: Router,
    private state: StateService,
    private spinner: NgxSpinnerService
  ) {
    this.isLoggedInUser = this.auth.isAuthenticated();
    this.getScreenSize()
  }

  ngOnInit(): void {
      this.isBasicSearch = true

       this.searchWord = {
          search: this.activatedRoute.snapshot.queryParams['searchWord'],
          pageNumber : 1
        };
        this.getSearchList(this.searchWord);

  }

  getSearchList(search) {
    this.spinner.show();
    this.baseService.search(search).subscribe((res) => {
      this.searchList = res as any;
      this.totalCount = this.searchList.totalCount
      this.pageSize = this.itemsPerPage * (search.pageNumber - 1);
      this.currentPage = search.pageNumber;
      this.spinner.hide();
      console.log(this.currentPage);
    },error=>{
      this.spinner.hide()
    });
  }

  openContent(evt, contentName) {
    console.log(contentName);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tabsLi');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(contentName).style.display = 'block';
    if (this.scrWidth < 500) {
      document.getElementById('menu').style.display = 'none'

    } else {
      evt.currentTarget.className += ' active';
    }
    //
  }

  onTaggle() {
    if (this.isToggeled) {
      document.getElementById('menu').style.display = 'none'

    } else {
      document.getElementById('menu').style.display = 'inline'

    }
    this.isToggeled = !this.isToggeled
  }

  onBusinessDetails(id) {
    this.router.navigate(['/main/search-details/' + id], { queryParams: { detailsFor: 'business' } })
  }
  onPersonDetails(id) {
    this.router.navigate(['/main/search-details/' + id], { queryParams: { detailsFor: 'person' } })
  }
  public convertToNumber(value: string) {
    return Number(value);
  }
  public onPageChange(page: number) {
    debugger;
    this.searchWord ={
      search : this.searchWord.search,
      pageNumber : page
    }
      this.getSearchList( this.searchWord);

  }
  public onSearchBuiness(page) {
    this.spinner.show()
    this.searchParams.pageNumber = page;
    this.baseService.postItem(Controllers.Search, Actions.BusinessAdvanceSearch, this.searchParams).subscribe(res => {
      this.spinner.hide()
      this.pageSize = this.itemsPerPage * (page - 1);
      this.currentPage = page;
    }, error => {
      this.spinner.hide()
    })

  }
  public onSearchMap(page) {
    this.spinner.show()
    this.searchParams.pageNumber = page;
    this.baseService.postItem(Controllers.Search, Actions.MapsSearch, this.searchParams).subscribe(res => {
      this.spinner.hide()
      this.pageSize = this.itemsPerPage * (page - 1);
      this.currentPage = page;
    }, error => {
      this.spinner.hide()
    })

  }



}
