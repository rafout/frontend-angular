import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { Login } from 'src/app/interfaces/login/Login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(@Inject(HttpClient) httpClient: HttpClient) { 
    super(httpClient);
  }

  public login(credentials: Login) {
    const endpoint = 'auth/login';

    const response = this.post(endpoint, credentials);
    console.log(response);
    return response;
  }

  async verifyToken() {
       
    const token = localStorage.getItem('token') as string;

    if(!token)
      return false;

    try {
      this.refreshToken(token);
      return true;
    } catch (error){
      return false;
    }
  }

  async refreshToken(token: string) {
    const url = 'http://localhost:3000/refresh-token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    });

    const data = await response.json();

    localStorage.setItem('token', data.token);
  }
}
