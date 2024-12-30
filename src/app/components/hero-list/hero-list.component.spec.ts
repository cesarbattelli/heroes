import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { SuperHeroService } from '../../services/super-hero.service';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HeroCardComponent } from '../hero-card/hero-card.component';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroService: jasmine.SpyObj<SuperHeroService>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('SuperHeroService', [
      'getHeroes',
      'deleteHero',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeroCardComponent],
      providers: [
        provideRouter([
          { path: 'hero/edit/:id', component: HeroListComponent },
          { path: '', component: HeroListComponent },
        ]),
        provideHttpClientTesting(),
        { provide: SuperHeroService, useValue: mockHeroService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes and update the list', () => {
    const mockHeroes = [
      { id: '1', name: 'Superman', description: '', powers: [], avatar: '' },
      { id: '2', name: 'Batman', description: '', powers: [], avatar: '' },
    ];

    mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

    component.loadHeroes();

    expect(mockHeroService.getHeroes).toHaveBeenCalled();
    expect(component.heroes()).toEqual(mockHeroes);
    expect(component.filteredHeroes).toEqual(mockHeroes);
  });

  it('should filter heroes based on search term', () => {
    const mockHeroes = [
      { id: '1', name: 'Superman', description: '', powers: [], avatar: '' },
      { id: '2', name: 'Batman', description: '', powers: [], avatar: '' },
    ];

    component.heroes.set(mockHeroes);
    component.searchTerm = 'man';
    component.filterHeroes();

    expect(component.filteredHeroes).toEqual(mockHeroes);
  });

  it('should update pagination correctly', () => {
    component.filteredHeroes = Array(10).fill({
      id: '1',
      name: 'Hero',
      description: '',
      powers: [],
      avatar: '',
    });
    component.itemsPerPage = 4;

    component.updatePagination();

    expect(component.totalPages).toBe(3);
    expect(component.paginatedHeroes.length).toBe(4);
  });

  it('should go to the previous page', () => {
    component.currentPage = 2;
    spyOn(component, 'updatePagination');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should not go to the previous page if already on the first page', () => {
    component.currentPage = 1;
    spyOn(component, 'updatePagination');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(component.updatePagination).not.toHaveBeenCalled();
  });

  it('should go to the next page', () => {
    component.currentPage = 1;
    component.totalPages = 2;
    spyOn(component, 'updatePagination');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(component.updatePagination).toHaveBeenCalled();
  });

  it('should not go to the next page if already on the last page', () => {
    component.currentPage = 2;
    component.totalPages = 2;
    spyOn(component, 'updatePagination');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(component.updatePagination).not.toHaveBeenCalled();
  });

  it('should delete a hero and reload the list', () => {
    const mockHeroes = [
      { id: '1', name: 'Superman', description: '', powers: [], avatar: '' },
      { id: '2', name: 'Batman', description: '', powers: [], avatar: '' },
    ];

    mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
    mockHeroService.deleteHero.and.returnValue(of(void 0));

    component.loadHeroes();
    component.deleteHero('1');

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith('1');
    expect(mockHeroService.getHeroes).toHaveBeenCalledTimes(2);
  });

  it('should navigate to edit hero page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const hero = {
      id: '1',
      name: 'Superman',
      description: '',
      powers: [],
      avatar: '',
    };
    component.onEditHero(hero);

    expect(router.navigate).toHaveBeenCalledWith(['/hero/edit', '1']);
  });

  it('should filter heroes case-insensitively', () => {
    const mockHeroes = [
      { id: '1', name: 'Superman', description: '', powers: [], avatar: '' },
      { id: '2', name: 'Batman', description: '', powers: [], avatar: '' },
    ];

    component.heroes.set(mockHeroes);
    component.searchTerm = 'SUPERMAN';
    component.filterHeroes();

    expect(component.filteredHeroes).toEqual([
      { id: '1', name: 'Superman', description: '', powers: [], avatar: '' },
    ]);
  });

  it('should call loadHeroes on initialization', () => {
    spyOn(component, 'loadHeroes');
    component.ngOnInit();
    expect(component.loadHeroes).toHaveBeenCalled();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(8);
    expect(component.filteredHeroes).toEqual([]);
    expect(component.paginatedHeroes).toEqual([]);
    expect(component.totalPages).toBe(0);
  });
});
