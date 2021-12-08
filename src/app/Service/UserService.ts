import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../Model/User";
import { Users } from "../Model/Users";

@Injectable()
export class UserService {
  Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:5020/WeatherForecast/';
  }

  //Add user
  AddUser(token: string, aUser: User) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'request-key': '12345678910'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    var body = { aUser }
    var a = this.Url + 'AddUser';

    return this.http.post<User>(a, aUser, requestOptions);
  }

  //Change pay type
  ChangeStaus(aUser: Users) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'request-key': '12345678910'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    var body = { aUser }
    var a = this.Url + 'ChangePayType';

    return this.http.post<User>(a, aUser, requestOptions);
  }

  //Get users
  GetUsers() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'request-key': '12345678910'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    var a = this.Url + 'GetUsers';

    return this.http.get<any>(a, requestOptions);
  }
}
