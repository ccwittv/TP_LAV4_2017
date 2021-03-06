import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthData } from '../../providers/auth-data';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  clase="progress-bar progress-bar-info progress-bar-striped ";
  public misUsuarios = ['tito@mail.com','jugador1@mail.com','jugador2@mail.com'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authData: AuthData) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
//si ingresa nuevamente al login se desloguea el usuario que estaba logueado previamente    
    this.desloguear();
  }

  Entrar() {
    /*if (this.usuario === 'admin' && this.clave === 'admin') {
      this.router.navigate(['/Principal']);
    }*/
    // Inicio sesion en Firebase.
    switch (this.usuario) {
      case 'tito@mail.com':
        this.clave = 'titocosa';
      break;
      case 'jugador1@mail.com':
        this.clave = '123456';
      break;
      case 'jugador2@mail.com':
        this.clave = '123456';
      break;
      default:
        break;
    }

     this.authData.loginUser(this.usuario, this.clave).then(authData => {
      console.log("Se logueo correctamente!");
      localStorage.usuarioLogueado = this.usuario;
      this.router.navigate(['/Principal']);
    },
    error => { 
        console.log('loginError: ', error);  
        alert("Usuario o clave incorrecta");
        this.logeando=true;  
    });
    this.progreso=0;
    this.ProgresoDeAncho="0%";
  }
  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="NSA spy..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando ADN..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Instalando KeyLogger..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
    //this.logeando=true;
  }

  desloguear()
  {
      this.authData.logoutUser().then(authData => {
        console.info("se deslogueó correctamente!");
        //this.logueando=false;
        localStorage.removeItem("usuarioLogueado");
      },
      error => { 
          console.log('Error en logout: ', error);  
          alert("Deslogueo incorrecto del usuario");  
      });
  }

}
