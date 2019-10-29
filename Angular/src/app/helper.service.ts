import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public tokenSubscription = new Subject<string>();
  public token: string;

  constructor(private http: HttpClient) { 
    
  }

  registerUser(req: any) {
    return this.http.post('http://localhost:3000/users/register', req)
  }

  login(req: any) {
    return this.http.post('http://localhost:3000/users/login', req, {responseType: 'text'})
  }

  getUserName(params) {
    return this.http.get('http://localhost:3000/users/username', {params})
  }

  setSessionToken(token: string) {
    localStorage.setItem('token', token);
    let subscribe = this.tokenSubscription.subscribe(token => {
      this.token = token;
    });
    this.tokenSubscription.next(token);
    subscribe.unsubscribe();
  }

}
