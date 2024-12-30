import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuperHero } from '../../models/super-hero.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent {
  @Input() hero: SuperHero = {
    id: '',
    name: '',
    description: '',
    powers: [],
    avatar: '',
  };

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  editHero(): void {
    this.edit.emit();
  }

  deleteHero(): void {
    const confirmDelete = confirm(
      '¿Estás seguro de que deseas borrar este héroe?'
    );
    if (confirmDelete) {
      this.delete.emit();
    }
  }
}
