import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SuperHeroService } from './super-hero.service';
import { SuperHero } from '../models/super-hero.model';
import { provideHttpClient } from '@angular/common/http';

describe('SuperHeroService', () => {
  let service: SuperHeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SuperHeroService,
      ],
    });
    service = TestBed.inject(SuperHeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all heroes (GET)', () => {
    const mockHeroes: SuperHero[] = [
      {
        id: '1',
        name: 'Spiderman',
        description: 'Superhéroe arácnido',
        powers: ['trepar paredes'],
        avatar: 'https://robohash.org/Spiderman',
      },
      {
        id: '2',
        name: 'Batman',
        description: 'Detective oscuro',
        powers: ['inteligencia'],
        avatar: 'https://robohash.org/Batman.png',
      },
    ];

    service.getHeroes().subscribe((heroes: SuperHero[]) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should retrieve a hero by id (GET)', () => {
    const mockHero: SuperHero = {
      id: '1',
      name: 'Spiderman',
      description: 'Superhéroe arácnido',
      powers: ['trepar paredes'],
      avatar: 'https://robohash.org/Spiderman',
    };

    service.getHeroById('1').subscribe((hero: SuperHero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should add a new hero (POST)', () => {
    const newHero: SuperHero = {
      id: '4',
      name: 'Ironman',
      description: 'Genio millonario',
      powers: ['tecnología'],
      avatar: 'https://robohash.org/Ironman.png',
    };

    service.addHero(newHero).subscribe((hero: SuperHero) => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('should update a hero (PUT)', () => {
    const updatedHero: SuperHero = {
      id: '1',
      name: 'Spiderman',
      description: 'Actualizado',
      powers: ['trepar paredes'],
      avatar: 'https://robohash.org/Spiderman',
    };

    service.updateHero(updatedHero).subscribe((hero: SuperHero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('should delete a hero (DELETE)', () => {
    const heroId = '1';

    service.deleteHero(heroId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/heroes/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
