import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {
    primerNumero:number;
    segundoNumero:number;
    operacion:string;
    totalOperacion: number;
    respuestaOperacion:number;
    tiempoCalculoSegundos:number;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super(nombre,gano,jugador);
      }
    
    public verificar() {
        console.log("Respuesta:",this.respuestaOperacion);
        console.log("Total:",this.totalOperacion);
        if (this.respuestaOperacion == this.totalOperacion) 
          this.resultado = true;
        else
          this.resultado = false;
        if (this.resultado) {
          return true;
        } else {
          return false;
        }
     }

    public generarNumero(limite:number):number {
        return Math.floor((Math.random() * limite) + 1);
      }
    
    public generarOperador(limite:number):string {
        let codigoOperacion:number;
        let operacion:string;
        codigoOperacion = Math.floor((Math.random() * limite) + 1);
        switch(codigoOperacion)
        {
          case 1:       
            operacion = "Suma";
            break;
          case 2:
            operacion = "Resta";
            break;
          case 3:
            operacion="Multiplicación";
            break;
          case 4:
            operacion="División";
            break;
        }
        return operacion;
      }  
     
    public efectuarOperacion(x:number,y:number,operacion:string):number {
        let respuesta:number;
        switch(operacion)
        {
          case "Suma":       
            respuesta=x+y;
            break;
          case "Resta":
            respuesta = x-y;
            break;
          case "Multiplicación":
            respuesta=x*y;
            break;
          case "División":
            respuesta = x/y;
            break;
        }
        return respuesta;
    }
    
    public retornarAyuda() {
        return this.totalOperacion.toString();
    }  

}
