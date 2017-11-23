import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Juego } from '../clases/juego'

@Injectable()
export class MiFirebaseJuegoServicioService {

  dato: FirebaseListObservable<any[]>;
  
  constructor( private af: AngularFireDatabase ) { 
    this.dato = this.af.list('/juego');
  }

  dameLosJuegos():any{
    //console.log(this.dato);
    return this.dato;
  }

  guardarJuego(nuevoJuego:Juego) {
    console.log("estoy en guardarJuego, el objeto nuevoJuego es ",nuevoJuego);
    /*console.log("estoy en guardarJuego, el json strubguify es", JSON.stringify(nuevoJuego));
    console.log("estoy en guardarJuego, el json parse es", JSON.parse(JSON.stringify(nuevoJuego)));*/
    this.dato.push(nuevoJuego);
  }

}
