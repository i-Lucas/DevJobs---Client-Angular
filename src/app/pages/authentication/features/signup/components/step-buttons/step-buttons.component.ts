import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'signup-step-buttons',
  templateUrl: './step-buttons.component.html',
})
export class StepButtonsComponent {

  @Input() loading: boolean = false;
  @Input() disabled: boolean = true;
  @Input() optional: boolean = false;

  @Input() showNextButton: boolean = true;
  @Input() showSaveButton: boolean = false;
  @Input() showPreviousButton: boolean = true;

  @Output() saveClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
  @Output() previousClick = new EventEmitter<void>();
  
  protected onPreviousClick() {
    this.previousClick.emit();
  }

  protected onNextClick() {
    this.nextClick.emit();
  }

  protected onSave() {
    this.saveClick.emit();
  }

}