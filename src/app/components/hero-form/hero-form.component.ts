import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Input() hero: any | null = null;
  @Output() saveHero = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  heroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: [
        this.hero?.name || '',
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.hero?.description || '',
        [Validators.required, Validators.maxLength(200)],
      ],
      powers: [this.hero?.powers?.join(', ') || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const formValue = this.heroForm.value;
      const heroData = {
        ...this.hero,
        ...formValue,
        powers: formValue.powers.split(',').map((p: string) => p.trim()),
      };
      this.saveHero.emit(heroData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
