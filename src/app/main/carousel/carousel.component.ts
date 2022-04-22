import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { Controllers } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() type: string
  contacts = []
  public serverFileUrl: string;

  public customOptions: OwlOptions = {
    dots: false,
    loop: true,
    rewind: false,
    autoplay: true,
    nav: true,
    rtl:true,
    stagePadding: 0,
    margin: 4,
    navText: ["<img src='../../../assets/icons/leftArrow.svg'>","<img src='../../../assets/icons/rightArrow.svg'>"],
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      768: {
        items: 3,
        slideBy: 1
      },
      1024: {
        items: 5,
        slideBy: 1
      }
    }
  }

  clients = []


  partners = []

  slides = []

  constructor(private baseService:BaseServiceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.serverFileUrl = environment.imagesUrl;
    this.spinner.show();
    this.getAllContacts()

  }

  getAllContacts(){
    this.baseService.getAllItems(Controllers.Contacts).subscribe(res =>{
      this.contacts = res as any[]
      this.partners.push(this.contacts.filter(x=>x.isClient == false))
      this.clients.push(this.contacts.filter(x=>x.isClient == true))
      if (this.type == "clients") {
        this.slides =this.clients[0];
        console.log(this.slides);

      } else {
        this.slides = this.partners[0]
        console.log(this.slides);
      }
      this.spinner.hide();
    })
  }
}
