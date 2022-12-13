import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Kernotec } from '../model/kernotec.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public kernotec!: Kernotec;

  constructor(private http: HttpClient) { }


  acceder(usuario: any) {

    let objecto = {
      email: '',
      password: '',
      idunique: "qwertyuiop",
      idfirebase: "qwertyuiop"
    };
    objecto.email = usuario.usuario;
    objecto.password = usuario.password;
    console.log(objecto);

    return this.http.post('https://examen-dev.kernotek.mx/ateneaweb/services/ateneaapp/getSessionToken', objecto).pipe(
      tap((resp: any) => {
        console.log(resp);
        this.kernotec = new Kernotec(resp.iderror, resp.msgerror, resp.name, resp.email, resp.recoverpsw, resp.phone, resp.sendsms, resp.verify, resp.flginvoice, '', '');

        localStorage.setItem('token', resp.token);
      })
    )
  }
}
