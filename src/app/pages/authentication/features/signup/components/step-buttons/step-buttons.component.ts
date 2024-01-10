import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-buttons',
  templateUrl: './step-buttons.component.html',
})
export class StepButtonsComponent {

  @Input() loading: boolean = false;
  @Input() disabled: boolean = true;

  @Input() showNextButton: boolean = true;
  @Input() showPreviousButton: boolean = true;

  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();

  protected onPreviousClick() {
    this.previousClick.emit();
  }

  protected onNextClick() {
    this.nextClick.emit();
  }

}
