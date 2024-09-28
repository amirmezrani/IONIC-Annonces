import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionAnnoncesPage } from './gestion-annonces.page';

describe('GestionAnnoncesPage', () => {
  let component: GestionAnnoncesPage;
  let fixture: ComponentFixture<GestionAnnoncesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestionAnnoncesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
