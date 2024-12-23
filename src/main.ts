import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeroListComponent } from './app/components/hero-list/hero-list.component';

bootstrapApplication(HeroListComponent, appConfig).catch((err) =>
  console.error(err)
);
