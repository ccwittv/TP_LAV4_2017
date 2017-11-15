import { Juego } from '../clases/juego';

export class JuegoAnagrama extends Juego {
    palabraOrdenada:string;
    respuestaPalabra:string;
    tiempoCalculoSegundos:number;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super(nombre,gano,jugador);
      }
    
    public verificar() {
        if (this.respuestaPalabra.toLowerCase() == this.palabraOrdenada.toLowerCase()) 
          this.resultado = true;
        else
          this.resultado = false;
        if (this.resultado) {
          return true;
        } else {
          return false;
        }
     }
     
    public elegirPalabra(arrayPalabras:Array<string>): string {
        let posicionPalabra:number;
        let limite:number;
        limite = arrayPalabras.length;
        posicionPalabra = Math.floor((Math.random() * limite) + 0);
        return arrayPalabras[posicionPalabra];
      } 
    
    public generarAnagrama(palabra:string):string {
        let arrayPalabra:Array<string>;
        let arrayPalabraDesordenada:Array<string>;
        let palabraDevuelta:string;
        arrayPalabra= palabra.split(""); //se pasa la palabra a un vector de letras
        console.log(arrayPalabra);
        arrayPalabraDesordenada = arrayPalabra.sort(function() {return Math.random() - 0.5});
        console.log(arrayPalabraDesordenada);
        palabraDevuelta = arrayPalabraDesordenada.toString(); //el vector se transforma en una cadena
        let re = /,/gi;
        palabraDevuelta = palabraDevuelta.replace(re,""); //la palabra desordenada se devuelve sin las comas que la separaban (antes era un vector)
        console.log(palabraDevuelta);
        return palabraDevuelta.toLowerCase(); 
    }

    public retornarAyuda() {
        return this.palabraOrdenada.toUpperCase();
    }  
}
