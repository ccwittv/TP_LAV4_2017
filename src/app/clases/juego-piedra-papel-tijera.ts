import { Juego } from '../clases/juego'

export class JuegoPiedraPapelTijera extends Juego {
    
    eleccionMaquina: string;
    eleccionHumano:string;
    constructor(nombre?: string, resultado?: string, jugador?:string) {
        super(nombre,resultado,jugador);        
      }

    public generarEleccionMaquina() {
        let numeroSecreto:number;
        numeroSecreto = Math.floor((Math.random() * 3) + 1);        
        switch(numeroSecreto)
          {
            case 1:
                this.eleccionMaquina="piedra";
                break;
            case 2:
                this.eleccionMaquina="papel";
                break;
            case 3:
                this.eleccionMaquina="tijera";
                break;
          }

      }  

    public verificar() {
        return false
     }
}
