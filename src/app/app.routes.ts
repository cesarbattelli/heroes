import { Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

export const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'hero/new', component: HeroFormComponent },
  { path: 'hero/edit/:id', component: HeroFormComponent },
];
