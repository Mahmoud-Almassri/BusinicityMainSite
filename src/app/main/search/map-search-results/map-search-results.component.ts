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
  selector: 'app-map-search-results',
  templateUrl: './map-search-results.component.html',
  styleUrls: ['./map-search-results.component.scss'],
})
export class MapSearchResultsComponent implements OnInit {
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

  public searchParams;
  public totalCount: number;
  public pageSize: number;
  public currentPage = 1;
  public itemsPerPage = 100;
  public isLoggedInUser: boolean = false;
  public searchResults: Observable<any[]>;
  public businesses: any[];

  constructor(
    private baseService: BaseServiceService,
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
      if (this.state.getMapSearchData().data != null) {
        var data = this.state.getMapSearchData();
        console.log(data);

        data.data.subscribe(res => {
          console.log(res);
          this.searchResults=data.data;
          this.totalCount = data.totalCount;
          this.searchParams = data.searchParams;
          this.searchResults.subscribe(res=>{
            this.businesses=res;
          })
          this.spinner.hide();
        })

        console.log(this.totalCount);
        console.log(this.businesses)
      }
      this.spinner.hide();
  }
  public onBusinessDetails(id) {
    this.router.navigate(['/main/search-details/' + id], { queryParams: { detailsFor: 'business' } })
  }

  public onPageChange(page: number) {
      this.onSearchBusiness(page);
  }

  public onSearchBusiness(page) {
    //this.spinner.show()
    this.searchParams.pageNumber = page;
    this.baseService.postItem(Controllers.Search, Actions.MapsSearch, this.searchParams).subscribe(res => {
      this.pageSize = this.itemsPerPage * (page -1);

        this.businesses = res.entities;
        this.currentPage = page;
        this.pageSize = this.itemsPerPage * (page -1);
      this.spinner.hide()
    }, error => {
      this.spinner.hide()
    })

  }
  public trackByFn(index, business) {
    return business.id;
  }
}
