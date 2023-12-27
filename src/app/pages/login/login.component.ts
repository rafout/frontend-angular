
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LoginComponent,
    }
  ]
})
export class LoginComponent implements OnInit {
  
  erro: boolean = false;
  mostrar: boolean = true;
  titulo: string = 'Erro!';
  mensagem: string = '';
  carregando: boolean = false;

  loginForm = this.fb.group({
    username: this.fb.control('', Validators.minLength(3)),
    password: this.fb.control('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login() {
    this.carregando = true;
    this.service.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.erro = false;
        this.carregando = false;
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.mensagem = err.error.message;
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  public fechar() {
    this.erro = false;
  }
}
