import { TestBed, inject } from '@angular/core/testing';

import { MiFirebaseJuegoServicioService } from './mi-firebase-juego-servicio.service';

describe('MiFirebaseJuegoServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiFirebaseJuegoServicioService]
    });
  });

  it('should be created', inject([MiFirebaseJuegoServicioService], (service: MiFirebaseJuegoServicioService) => {
    expect(service).toBeTruthy();
  }));
});
