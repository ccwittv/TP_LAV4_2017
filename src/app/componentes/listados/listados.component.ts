import { Component, OnInit } from '@angular/core';
import { MiFirebaseJuegoServicioService } from '../../servicios/mi-firebase-juego-servicio.service';
import { Juego } from '../../clases/juego'

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {
  
  private listadoJuegos:Array<any>;
  public listadoParaCompartirPPT: Array<any>;
  public listadoParaCompartirAA: Array<any>;
  public listadoParaCompartirAN: Array<any>;
  public listadoParaCompartirAG: Array<any>;
  public listadoParaCompartirMT: Array<any>;
  public listadoParaCompartirTodo: Array<any>;
  public miServicioJuego:MiFirebaseJuegoServicioService
 
  constructor(servicioJuego:MiFirebaseJuegoServicioService) { 
   this.miServicioJuego = servicioJuego;}
 
 ngOnInit() {
   
 }
 
 borrarTodo() {
  this.listadoParaCompartirAA = this.listadoJuegos;
  this.listadoParaCompartirAN = this.listadoJuegos;
  this.listadoParaCompartirAG = this.listadoJuegos;
  this.listadoParaCompartirPPT = this.listadoJuegos;
  this.listadoParaCompartirMT = this.listadoJuegos; 
  this.listadoParaCompartirTodo = this.listadoJuegos; 
 }

 listadoTodo(){
  this.borrarTodo();
  this.listadoParaCompartirTodo = this.miServicioJuego.dameLosJuegos();
 }


 listadoPPT(){
  this.borrarTodo();
  this.listadoParaCompartirPPT = this.miServicioJuego.dameLosJuegos();
 }

 listadoAA(){
  this.borrarTodo();
  this.listadoParaCompartirAA = this.miServicioJuego.dameLosJuegos();
 }

 listadoAN(){
  console.log("paso por listadoAN");
  this.borrarTodo();
  this.listadoParaCompartirAN = this.miServicioJuego.dameLosJuegos();
 }

 listadoAG(){
  this.borrarTodo();
  this.listadoParaCompartirAG = this.miServicioJuego.dameLosJuegos();
 }

 listadoMT(){
  this.borrarTodo();
  this.listadoParaCompartirMT = this.miServicioJuego.dameLosJuegos();
 }

}
