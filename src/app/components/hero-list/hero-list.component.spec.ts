import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroListComponent } from './hero-list.component';
import { SuperHeroService } from '../../services/super-hero.service';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SuperHero } from '../../models/super-hero.model';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<SuperHeroService>;

  const mockHeroes: SuperHero[] = [
    {
      id: 1,
      name: 'Superman',
      description: 'Man of Steel',
      powers: ['Fly'],
      avatar: 'superman.jpg',
    },
    {
      id: 2,
      name: 'Batman',
      description: 'Dark Knight',
      powers: ['Detective'],
      avatar: 'batman.jpg',
    },
  ];

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('SuperHeroService', [
      'getHeroes',
      'deleteHero',
      'updateHero',
      'addHero',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, HeroListComponent], // HeroListComponent va aquí
      providers: [{ provide: SuperHeroService, useValue: heroServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(
      SuperHeroService
    ) as jasmine.SpyObj<SuperHeroService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    heroService.getHeroes.and.returnValue(of(mockHeroes));

    component.ngOnInit();

    expect(heroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes()).toEqual(mockHeroes);
    expect(component.filteredHeroes).toEqual(mockHeroes);
  });

  it('should filter heroes based on search term', () => {
    component.heroes.set(mockHeroes);
    component.searchTerm = 'Superman';

    component.filterHeroes();

    expect(component.filteredHeroes).toEqual([
      {
        id: 1,
        name: 'Superman',
        description: 'Man of Steel',
        powers: ['Fly'],
        avatar: 'superman.jpg',
      },
    ]);
  });

  it('should update an existing hero', () => {
    const updatedHero = { ...mockHeroes[0], name: 'Superman Updated' };
    heroService.updateHero.and.returnValue(of(updatedHero));
    heroService.getHeroes.and.returnValue(of([updatedHero, mockHeroes[1]]));

    component.saveHero(updatedHero);

    expect(heroService.updateHero).toHaveBeenCalledWith(updatedHero);
    expect(heroService.getHeroes).toHaveBeenCalled();
  });

  it('should cancel editing', () => {
    component.editingHero = mockHeroes[0];

    component.cancelEdit();

    expect(component.editingHero).toBeNull();
  });
});
