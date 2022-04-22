import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actions, Controllers, httpOptions } from '../global-variables/api-config';
const apiPreLink = environment.apiPreLink;
@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private http: HttpClient) { }

  public postItem(controllerName: string, actionName: string, postObject: any): Observable<any> {
    return this.http.post(apiPreLink + controllerName + actionName, JSON.stringify(postObject), httpOptions);
  }
  public getAllItems(controllerName: string): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetAllItems);
  }

  public search(search){
    return this.http.post(apiPreLink+ Controllers.Search + Actions.Search,JSON.stringify(search),httpOptions)
  }

  public getById(controller , id){
    return this.http.get(apiPreLink + controller + Actions.GetById + id)
  }

  public getAppSettings(){
    return this.http.get(apiPreLink + 'AppSettings/GetAppSettings')
  }

  public getPersonById(id:number){
    return this.http.get(apiPreLink + Controllers.WebPerson + 'GetPersonById?Id='+id, httpOptions)
  }
}
