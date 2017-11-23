import { Juego } from '../clases/juego';

export class JuegoMemotest extends Juego {
    tiempoCalculoSegundos:number;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super(nombre,gano,jugador);
      }
    
    public verificar() {
          return false;
     }
     
}
