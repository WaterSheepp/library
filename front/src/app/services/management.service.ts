import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserM } from '../models/management.model';
import { BModel } from '../models/mbModel';
import { UserService } from '../services/user.service';
import { User } from '../models/userLogin';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  public token;

  selectedEmployee: UserM;
  employees: UserM[];
  
  constructor(private http: HttpClient, private userService: UserService) { }

  postEmployee(emp: UserM) {
    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    var params = JSON.stringify(emp)

    return this.http.post(environment.apiBaseUrl + '/addUser', params, {headers: header})
  }

  getEmployeeList()  {
    var header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(environment.apiBaseUrl + '/getUsers', {headers: header})
  }

  putEmployee(emp: UserM) {

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    var params = JSON.stringify(emp)
    return this.http.put(environment.apiBaseUrl + `/editUser/${emp._id}`, emp,  {headers: header});
  }

  deleteEmployee(_id: string) {

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this.http.delete(environment.apiBaseUrl + `/deleteUser/${_id}`, {headers: header});
  }

  putBorrowBook( bom: BModel) {

    var emp = this.getUserId();

    var header = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    console.log(emp);
    console.log(bom);
    
    
    return this.http.put(environment.apiBaseUrl + `/borrowBook/${bom}/${emp}`,  {headers: header});
    
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

  getUserId() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      var decodedData = JSON.parse(userPayload) 
      var id = decodedData.sub

      return id

    }else{
      return null;
    }
  }



}
