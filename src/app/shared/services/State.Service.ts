import { EventListenerFocusTrapInertStrategy } from "@angular/cdk/a11y";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StateService {
  public personsDataObject:Observable<any[]>;
  public personsDataLength:number;
  public personsSearchParams:number;
  public businessDataObject:Observable<any[]>;
  public businessDataLength:number;
  public businessSearchParams:number;
  public mapDataObject:Observable<any[]>;
  public mapDataLength:number;
  public mapSearchParams:number;

  public setPersonSearchResults(object, searchParams) {
      this.personsDataObject =  of(object.entities)
      this.personsDataLength = object.totalCount
      this.personsSearchParams = searchParams;
  }
  public setBusinessSearchResults(object, searchParams) {
      this.businessDataObject =  of(object.entities)
      this.businessDataLength = object.totalCount
      this.businessSearchParams = searchParams;
  }
  public setMapSearchResults(object, searchParams) {
      this.mapDataObject =  of(object.entities)
      this.mapDataLength = object.totalCount
      this.mapSearchParams = searchParams;
  }

public getPersonSearchData(){
  return {
    data:this.personsDataObject,
    totalCount:this.personsDataLength,
    searchParams:this.personsSearchParams
  };
}
public getBusinessSearchData(){
  return {
    data:this.businessDataObject,
    totalCount:this.businessDataLength,
    searchParams:this.businessSearchParams
  };
}
public getMapSearchData(){
  return {
    data:this.mapDataObject,
    totalCount:this.mapDataLength,
    searchParams:this.mapSearchParams
  };
}
}
