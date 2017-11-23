export abstract class Juego {
  public nombre:string = 'Sin Nombre'; //nombre del juego
  public identificador:string;
  public jugador: string;
  public resultado:any;//lo declaro como any debido a que resultado puede ser diferentes valores segun el juego gano, perdió, empate, correcto, incorrecto etc
  public observacion:string = 'N/A';
  public fechajuego:string;
  public horajuego:string;

  constructor(nombre?: string, resultado?: any,jugador?:string) {
    if (nombre)
      this.nombre = nombre; 
    if (resultado)
      this.resultado = resultado;
    if(jugador)
      this.jugador=jugador;
    else
      this.jugador= "natalia natalia";
  }

  public abstract verificar():boolean; 
  
  public retornarAyuda() {
    
    return "NO HAY AYUDA DEFINIDA";
  }
}
