import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddBusinessComponent } from './AddModule/add-business/add-business.component';
import { AddPersonComponent } from './AddModule/add-person/add-person.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdvanceSearchComponent } from './search/advance-search/advance-search.component';
import { BusinessSearchResultsComponent } from './search/business-search-results/business-search-results.component';
import { MapSearchResultsComponent } from './search/map-search-results/map-search-results.component';
import { MapSearchComponent } from './search/map-search/map-search.component';
import { PersonSearchResultsComponent } from './search/person-search-results/person-search-results.component';
import { SearchDetailsComponent } from './search/search-details/search-details.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
  path: '',
  component: MainLayoutComponent,

  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: HomeComponent,
    },

    {
      path: 'add-person',
      component: AddPersonComponent,
    },
    {
      path: 'add-business',
      component: AddBusinessComponent,
    },
    {
      path: 'search',
      component: SearchResultsComponent,
    },
    {
      path: 'person-search-result',
      component: PersonSearchResultsComponent,
    },
    {
      path: 'map-search-result',
      component: MapSearchResultsComponent,
    },
    {
      path: 'business-search-result',
      component: BusinessSearchResultsComponent,
    },

    {
      path: 'advance-search',
      component: AdvanceSearchComponent,
    },
    {
      path: 'map-search',
      component: MapSearchComponent},
    {
      path: 'search-details/:id',
      component: SearchDetailsComponent,
    },


    {
      path: 'contact-us',
      component: ContactUsComponent,
    },

    {
      path: 'about-us',
      component: AboutUsComponent,
    },{
      path: 'user-profile',
      component: UserProfileComponent,
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
