import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuListadoComponent } from './side-menu-listado.component';

describe('SideMenuListadoComponent', () => {
  let component: SideMenuListadoComponent;
  let fixture: ComponentFixture<SideMenuListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
