import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {BModel} from '../models/mbModel';

@Injectable({
  providedIn: 'root'
})
export class BmManagementService {

  public token;

  selectedBom: BModel;
  boms: BModel[];

  constructor(private http: HttpClient) { }

  postBom(bom: BModel) {

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    var params = JSON.stringify(bom)

    return this.http.post(environment.apiBaseUrl + '/addBM', params, {headers: header})

  }

  getBomsList(): Observable<any> {

    var header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(environment.apiBaseUrl + '/getBOM', {headers: header})

  }

  putBom(bom: BModel) {

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    var params = JSON.stringify(bom)
    return this.http.put(environment.apiBaseUrl + `/editBOM/${bom._id}`, bom,  {headers: header});

  }


  deleteBom(_id: string){

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
  
    return this.http.delete(environment.apiBaseUrl + `/deleteBom/${_id}`,  {headers: header});

  }

  getToken() {

    var tokenAlt = localStorage.getItem('token');

    if(tokenAlt != "undefined") {
      this.token = tokenAlt
    }else{
      this.token = null;
    }
    return this.token
  }
}
