import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-advance-search-result',
  templateUrl: './advance-search-result.component.html',
  styleUrls: ['./advance-search-result.component.scss']
})
export class AdvanceSearchResultComponent implements OnInit {
@Input() businessSearchObject
@Input() personSearchObject
@Input() isPerson
@Input() isBusiness



  public bordOfDirectorsDataSource: MatTableDataSource<any>;
  public contactDataSource: MatTableDataSource<any>;
  public partnersDataSource: MatTableDataSource<any>;

  bordOfDirectorsDisplayedColumns: string[] = [
    'memberName',
    'description',
    'dateOfElection',
    'represnted',
  ];

  contactDisplayedColumns: string[] = ['title', 'name', 'email'];

  partnerDisplayedColumns: string[] = ['memberName', 'nationality', 'share'];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
