import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-job-offer-preview',
  templateUrl: './job-offer-preview.component.html',
})
export class JobOfferPreviewComponent {

  @Input() loading: boolean = false;
  @Input() jobOffersList: JobOfferData[] = [];
  @Input() currentProfileId: string | undefined;

  @Output() onNavigate = new EventEmitter<OnPreviewNavigate>()

  protected maxStackChip: number = 15;

  protected formatListWithLineBreaks(stacklist: string[]) {
    return stacklist.slice(this.maxStackChip, stacklist.length).map((item, idx) => idx === stacklist.length - 1 ? item : item + '\n').join('');
  }

}