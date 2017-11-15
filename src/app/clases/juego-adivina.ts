import { Juego } from '../clases/juego'

export class JuegoAdivina extends  Juego {
    numeroSecreto: number = 0;
    numeroIngresado:number = 0;
    constructor(nombre?: string, gano?: boolean, jugador?:string) {
        super(nombre,gano,jugador);
        console.log("Ganó? Constructor juego adivina",this.resultado);
      }
    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.resultado = true;
        }
        if (this.resultado) {
          return true;
        } else {
          return false;
        }
     }
     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.resultado = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasaste";
      }
}
