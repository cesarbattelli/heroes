import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercaseInput]',
})
export class UppercaseInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.value = input.value.toUpperCase();

    input.setSelectionRange(start, end);
  }
}
