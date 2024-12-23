import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuperHero } from '../../models/super-hero.model';
import { SuperHeroService } from '../../services/super-hero.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, HeroCardComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})
export class HeroListComponent {
  private heroService = inject(SuperHeroService);
  heroes = signal<SuperHero[]>([]);

  filteredHeroes: SuperHero[] = [];
  paginatedHeroes: SuperHero[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes.set(heroes);
      this.filteredHeroes = heroes;
      this.updatePagination();
    });
  }

  filterHeroes(): void {
    this.filteredHeroes = this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredHeroes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedHeroes = this.filteredHeroes.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  addHero(): void {
    console.log('Añadir héroe');
  }

  deleteHero(heroId: number): void {
    this.heroService.deleteHero(heroId).subscribe(() => {
      this.heroes.set(this.heroes().filter((hero) => hero.id !== heroId));
      this.loadHeroes();
    });
  }
}