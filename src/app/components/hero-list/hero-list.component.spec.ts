import { TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';

describe('HeroListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'heroes' title`, () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('heroes');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, heroes'
    );
  });
});
