import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInput]',
})
export class UppercaseInputDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const uppercaseValue = input.value.toUpperCase();
    input.value = uppercaseValue;

    this.control.control?.setValue(uppercaseValue);

    input.setSelectionRange(start, end);
  }
}
