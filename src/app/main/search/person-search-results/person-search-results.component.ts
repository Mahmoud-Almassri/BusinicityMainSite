import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthorizeServiceService } from 'src/app/auth/authorize-service.service';
import { Controllers, Actions } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { StateService } from 'src/app/shared/services/State.Service';

@Component({
  selector: 'app-person-search-results',
  templateUrl: './person-search-results.component.html',
  styleUrls: ['./person-search-results.component.scss'],
})
export class PersonSearchResultsComponent implements OnInit {
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  public isToggeled: boolean = false;


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
  public searchParams;
  public totalCount: number;
  public pageSize: number;
  public currentPage = 1;
  public itemsPerPage = 100;
  public isLoggedInUser: boolean = false;
  public searchResults: Observable<any[]>;
  public persons: any[];

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
    this.spinner.show();
      if (this.state.getPersonSearchData().data != null) {
        var data = this.state.getPersonSearchData();
        console.log(data);

        data.data.subscribe(res => {
          console.log(res);
          this.searchResults=data.data;
          this.totalCount = data.totalCount;
          this.searchParams = data.searchParams;
          this.searchResults.subscribe(res=>{
            this.persons=res;
          })
          this.spinner.hide();
        })

        console.log(this.totalCount);
        console.log(this.persons)
      }
      this.spinner.hide();
  }
  public onPersonDetails(id) {
    this.router.navigate(['/main/search-details/' + id], { queryParams: { detailsFor: 'person' } })
  }

  public onPageChange(page: number) {
      this.onSearchPerson(page);
  }

  public onSearchPerson(page) {
    //this.spinner.show()
    this.searchParams.pageNumber = page;
    this.baseService.postItem(Controllers.Search, Actions.PersonAdvanceSearch, this.searchParams).subscribe(res => {
      this.pageSize = this.itemsPerPage * (page -1);

        this.persons = res.entities;
        this.currentPage = page;
        this.pageSize = this.itemsPerPage * (page -1);
      this.spinner.hide()
    }, error => {
      this.spinner.hide()
    })

  }
  public trackByFn(index, person) {
    return person.id;
  }
}
