import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperHero } from '../models/super-hero.model';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService {
  private apiUrl = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(this.apiUrl);
  }

  getHeroById(id: string): Observable<SuperHero> {
    return this.http.get<SuperHero>(`${this.apiUrl}/${id}`);
  }

  addHero(hero: SuperHero): Observable<SuperHero> {
    hero.id = new Date().getTime().toString();
    hero.avatar = 'https://robohash.org/' + hero.name;
    return this.http.post<SuperHero>(this.apiUrl, hero);
  }

  updateHero(hero: SuperHero): Observable<SuperHero> {
    return this.http.put<SuperHero>(`${this.apiUrl}/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
