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

    return response;
  }

  async verifyToken() {
       
    const refresh_token = localStorage.getItem('refresh_token') as string;

    if(!refresh_token)
      return false;

    try {
      await this.refreshToken(refresh_token);
      return true;
    } catch (error){
      return false;
    }
  }

  async refreshToken(refresh_token: string) {
    const endpoint = 'auth/refresh';

    const response = this.post(endpoint, { refresh_token });

    response.subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        return true;
      },
      error: (err) => {
        return false;
      }
    });
  
  }
}
