import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as introJs from 'intro.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  introJS = introJs();
  searchControl = new FormControl();

  constructor(private router : Router , public translate: TranslateService) { }

  ngOnInit(): void {
  }
public getCurrentLang(){
  return this.translate.currentLang;
}
  onSearch(){
    this.router.navigate(['/main/search'],{queryParams : {searchWord:this.searchControl.value?this.searchControl.value:''}})
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
        intro: this.translate.instant('Intro.Home.BusinessCity'),
        position: 'top'
      },
      {
        element: '#step2',
        intro: this.translate.instant('Intro.Home.Search'),
        position: 'bottom'
      },
      {
        element: '#step3',
        intro: this.translate.instant('Intro.Home.AdvanceSearch'),
        position: 'bottom'
      },
      {
        element: '#step4',
        intro: this.translate.instant('Intro.Home.MapSearch'),
        position: 'bottom'
      },
      {
        element: '#step5',
        intro: this.translate.instant('Intro.Home.BasicSearch'),
        position: 'bottom'
      },
      {
        element: '#step6',
        intro: this.translate.instant('Intro.Home.AddBusiness'),
        position: 'bottom'
      },
      {
        element: '#step7',
        intro: this.translate.instant('Intro.Home.AddPerson'),
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
