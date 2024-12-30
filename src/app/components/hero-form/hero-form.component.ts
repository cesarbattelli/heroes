import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroService } from '../../services/super-hero.service';
import { UppercaseInputDirective } from '../../directives/uppercase-input.directive';
import { SuperHero } from '../../models/super-hero.model';

@Component({
  selector: 'app-hero-form',
  imports: [CommonModule, ReactiveFormsModule, UppercaseInputDirective],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  heroForm!: FormGroup;
  isEditing = false;
  hero: SuperHero | null = null;

  constructor(
    private fb: FormBuilder,
    private heroService: SuperHeroService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.heroService.getHeroById(id).subscribe((hero) => {
        this.hero = hero;
        this.heroForm.patchValue({
          name: hero.name,
          description: hero.description,
          powers: hero.powers.join(', '),
        });
      });
    }
  }

  initializeForm(): void {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      powers: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    if (this.heroForm.valid) {
      const formValue = this.heroForm.value;
      const heroData: SuperHero = {
        name: formValue.name,
        description: formValue.description,
        powers: formValue.powers.split(',').map((p: string) => p.trim()),
        id: '',
      };

      if (this.isEditing) {
        heroData.avatar = this.hero?.avatar;
        const id = this.route.snapshot.paramMap.get('id')!;
        this.heroService
          .updateHero({ ...heroData, id })
          .subscribe(() => this.router.navigate(['/']));
      } else {
        this.heroService
          .addHero(heroData)
          .subscribe(() => this.router.navigate(['/']));
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
