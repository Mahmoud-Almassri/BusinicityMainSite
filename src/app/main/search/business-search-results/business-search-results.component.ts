import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthorizeServiceService } from 'src/app/auth/authorize-service.service';
import { Controllers, Actions } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { StateService } from 'src/app/shared/services/State.Service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-business-search-results',
  templateUrl: './business-search-results.component.html',
  styleUrls: ['./business-search-results.component.scss'],
})
export class BusinessSearchResultsComponent implements OnInit {
  scrHeight: any;
  scrWidth: any;
  @ViewChild('pdfTable') pdfTable: ElementRef;
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
  public itemsPerPage = 10;
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
    if (this.state.getBusinessSearchData().data != null) {
      var data = this.state.getBusinessSearchData();
      console.log(data);

      data.data.subscribe(res => {
        console.log(res);
        this.searchResults = data.data;
        this.totalCount = data.totalCount;
        this.searchParams = data.searchParams;
        this.searchResults.subscribe(res => {
          this.businesses = res;
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
    this.baseService.postItem(Controllers.Search, Actions.BusinessAdvanceSearch, this.searchParams).subscribe(res => {
      this.pageSize = this.itemsPerPage * (page - 1);

      this.businesses = res.entities;
      this.currentPage = page;
      this.pageSize = this.itemsPerPage * (page - 1);
      this.spinner.hide()
    }, error => {
      this.spinner.hide()
    })

  }
  public exportToPdf() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {
      header: 'Businesses Result     ' + new Date().toLocaleString(),
      alignment: 'left',
      fontSize: 24,
      bold: true,
      content: html,
      styles: {
        "card": {
          "color": "#00838f",
          "user-select":'none',
          alignment: 'left'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  /*   setTimeout(() => {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.download();
      popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
    },500); */
  }
  public trackByFn(index, business) {
    return business.id;
  }
}
