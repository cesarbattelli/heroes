import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { SuperHero } from '../../models/super-hero.model';
import { By } from '@angular/platform-browser';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when editHero is called', () => {
    spyOn(component.edit, 'emit');

    component.editHero();

    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should confirm deletion and emit delete event when deleteHero is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.delete, 'emit');

    component.deleteHero();

    expect(window.confirm).toHaveBeenCalledWith(
      '¿Estás seguro de que deseas borrar este héroe?'
    );
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should not emit delete event if deletion is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.delete, 'emit');

    component.deleteHero();

    expect(window.confirm).toHaveBeenCalledWith(
      '¿Estás seguro de que deseas borrar este héroe?'
    );
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
