import { LoginService } from '../services/login/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if(!token) {
      this.naoAutenticado();
    }

    return new Promise(async (res) => {
      const usuarioLogado = await this.loginService.login();

      if(usuarioLogado) 
        res(true);
      else 
        res(this.naoAutenticado())
    })
  }

  naoAutenticado() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

}
