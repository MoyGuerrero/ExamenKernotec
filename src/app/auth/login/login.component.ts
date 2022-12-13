import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public formSubmitted: boolean = false;
  public mostrarError: boolean = false;

  public msgError: string = '';

  public loginForm = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required],
    recuerdame: false
  });
  ngOnInit(): void {

    // if (localStorage.getItem('usuario') != '') {
    //   this.loginForm.setValue({
    //     usuario: localStorage.getItem('usuario'),
    //     password: '',
    //     recuerdame: true
    //   });
    // }
    // console.log(localStorage.getItem('usuario'));
  }

  constructor(private fb: FormBuilder,
    private loginService: LoginService, private router: Router) { }


  acceder() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.get('recuerdame')?.value != false) {
      let nombre = this.loginForm.get('usuario')?.value;
      localStorage.setItem('usuario', nombre);
    }

    this.loginService.acceder(this.loginForm.value).subscribe({
      next: (resp: any) => {
        this.router.navigateByUrl('/dashboard')
      },
      error: (err: any) => {
        this.mostrarError = true;
        this.msgError = err.error.msgerror;
      }
    });
  }

  validarCampo(campo: string): boolean {

    if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    };
  }

}
