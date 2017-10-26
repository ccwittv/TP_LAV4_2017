import { MiHttpService } from './mi-http.service';
import { Injectable } from '@angular/core';
import { Juego } from '../clases/Juego';
import { JuegoAdivina } from '../clases/juego-adivina';
//import {} from './mi-http.service';
@Injectable()
export class JuegoServiceService {

  constructor(public miserviciohttp:MiHttpService) { }

  //constructor() { }  

  public listar(): Array<Juego> {

    this.miserviciohttp.dameUnaPromesa("http://localhost/APIREST-PHP-POO-JWT-MIDDLEWARE-Documentar/apirestV6-JWT-MW-POO/cd/").then(datos=>{console.log(datos);})
    .catch(error=>{console.log(error);});

    this.miserviciohttp.dameUnaPromesa("https://restcountries.eu/rest/v2/all").then(datos=>{console.log(datos);})
    .catch(error=>{console.log(error);});

    this.miserviciohttp.dameUnaPromesa("http://www.mocky.io/v2/59bb278b0f00004e07622a83").then(datos=>{console.log(datos);})
    .catch(error=>{console.log(error);});
    

    let miArray: Array<Juego> = new Array<Juego>();

    miArray.push(new JuegoAdivina("Juego 1", false));
    miArray.push(new JuegoAdivina("Pepe", true));
    miArray.push(new JuegoAdivina("Juego 3", false));
    miArray.push(new JuegoAdivina("Juego 4", false));
    miArray.push(new JuegoAdivina("Juego 5", false));
    miArray.push(new JuegoAdivina("Juego 6", false));

    return miArray;
  }

  public listarPromesa(): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) =>
      {
       let miArray: Array<Juego> = new Array<Juego>();
       miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
       miArray.push(new JuegoAdivina("PepePromesa", true));
       miArray.push(new JuegoAdivina("JuegoPromesa 3", false));
       miArray.push(new JuegoAdivina("JuegoPromesa 4", false));
       miArray.push(new JuegoAdivina("JuegoPromesa 5", false));
       miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
       resolve(miArray);
     }
    );

    return promesa;
  }

}
