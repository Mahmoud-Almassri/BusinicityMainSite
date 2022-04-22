import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AddPersonComponent } from './AddModule/add-person/add-person.component';
import { AddBusinessComponent } from './AddModule/add-business/add-business.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { AdvanceSearchComponent } from './search/advance-search/advance-search.component';
import { AdvanceSearchResultComponent } from './search/advance-search-result/advance-search-result.component';
import { MapSearchComponent } from './search/map-search/map-search.component';
import { AgmCoreModule } from '@agm/core';
import { SearchDetailsComponent } from './search/search-details/search-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BaseAppSettingsComponent } from './base-app-settings/base-app-settings.component';
import { PersonsAdvancedSearchComponent } from './search/persons-advanced-search/persons-advanced-search.component';
import { BusinessesAdvancedSearchComponent } from './search/businesses-advanced-search/businesses-advanced-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { PersonSearchResultsComponent } from './search/person-search-results/person-search-results.component';
import { BusinessSearchResultsComponent } from './search/business-search-results/business-search-results.component';
import { MapSearchResultsComponent } from './search/map-search-results/map-search-results.component';

import { CarouselComponent } from './carousel/carousel.component'
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    CarouselComponent,
    MainLayoutComponent,
    HomeComponent,
    AddPersonComponent,
    AddBusinessComponent,
    SearchResultsComponent,
    AdvanceSearchComponent,
    AdvanceSearchResultComponent,
    SearchDetailsComponent,
    ContactUsComponent,
    AboutUsComponent,
    BaseAppSettingsComponent,
    MapSearchComponent,
    PersonsAdvancedSearchComponent,
    BusinessesAdvancedSearchComponent,
    UserProfileComponent,
    PersonSearchResultsComponent,
    BusinessSearchResultsComponent,
    MapSearchResultsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MainRoutingModule,
    CarouselModule,
    SharedModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSamngRk_CQ_vlRLbYNtO00MtUkm0bXmE'
    }),
  ]
})
export class MainModule { }
