import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import {HttpClient} from "@angular/common/http"
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new Headers({ "Content-Type": "application/json" })
// };

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: HttpClient) { }

    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,{observe:'response'});
    }

    getfitnessdata() : Observable<Result[]> {
      return this.http.get<Result[]>(UserService.BaseUrl+'allfriends');
    }

    postContactDetails(contactData){
      return this.http.post(UserService.BaseUrl+'contacts',contactData,{observe:'response'});

    }

    deleteAppointment(id){
      return this.http.delete(UserService.BaseUrl+'allfriends/'+id,{observe:'response'});
    }

    getAppointmentById(id) :Observable<Result>{
      return this.http.get<Result>(UserService.BaseUrl+'allfriends/'+id);
    }

    updateAppointmentDetails(id,updatedData){
      return this.http.put(UserService.BaseUrl+'allfriends/'+id,updatedData);
    }
}

interface Result{
  firstname:string,
  lastname:string, 
  age:Number,
  phonenumber:Number,
  email:string,
  streetaddress:string ,
  city: string,
  state: string,
  country: string,
  pincode: Number,
  trainerpreference:string,
  physiotherapist: string,
  packages: string,
  inr: Number,
  paisa:Number,
}