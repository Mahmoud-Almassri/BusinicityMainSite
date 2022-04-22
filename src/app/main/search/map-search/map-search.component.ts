import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as introJs from 'intro.js';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from 'src/app/shared/global-variables/api-config';
import { MapSearchModel } from 'src/app/shared/models/map-search.model';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { StateService } from 'src/app/shared/services/State.Service';
declare const google: any;
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {
  introJS = introJs();

  public mapSearchModel: MapSearchModel = new MapSearchModel();
  constructor(
    private searchService: BaseServiceService,
    private spinner: NgxSpinnerService,
    private stateService: StateService,
    private router: Router,
    public translate:TranslateService
  ) {
    this.setCurrentLocation();
  }
  ngOnInit(): void {
    this.mapSearchModel.pageNumber = 1;
    this.mapSearchModel.pageSize = 10;
  }

  zoom: number = 8;
  public radius: number = 500;
  // initial center position for the map
  lat = 51.67305834361137;
  lng = 7.818610564834589;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.mapSearchModel.centerLatitude = this.lat.toString();
        this.mapSearchModel.centerLongitude = this.lng.toString();
        this.mapSearchModel.radius = this.radius;
        this.zoom = 14;
      });
    }
  }

  mapClicked($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.mapSearchModel.centerLatitude = this.lat.toString();
    this.mapSearchModel.centerLongitude = this.lng.toString();
  }
  public search() {
    console.log(this.mapSearchModel);

    this.spinner.show();
    this.searchService.postItem(Controllers.Search, Actions.MapsSearch, this.mapSearchModel).subscribe(res => {
      this.spinner.hide();
      this.stateService.setMapSearchResults((res as any), this.mapSearchModel);
      this.router.navigate(['/main/map-search-result'])
    })
  }
  markerDragEnd($event: any) {
    console.log('dragEnd', $event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.mapSearchModel.centerLatitude = this.lat.toString();
    this.mapSearchModel.centerLongitude = this.lng.toString();
  }
  radiusChange($event: any) {
    console.log('dragEnd', $event);
    this.mapSearchModel.radius = $event;
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
          intro: this.translate.instant('Intro.MapSearch.Map'),
          position: 'top'
        },
        {
          element: '#step2',
          intro: this.translate.instant('Intro.MapSearch.SearchButton'),
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
