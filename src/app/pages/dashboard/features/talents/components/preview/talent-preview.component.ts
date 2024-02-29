import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'talent-preview',
  templateUrl: './talent-preview.component.html',
})
export class TalentPreviewComponent {

  @Input() talents: Talent[] = [];
  @Input() loading: boolean = false;

  // @Output() openInNewWindow = new EventEmitter<string>();

  protected maxStackChip: number = 10;

  protected formatListWithLineBreaks(list: string[], maxItems: number = this.maxStackChip) {
    return list.slice(maxItems, list.length).map((item, idx) => idx === list.length - 1 ? item : item + '\n').join('');
  }

}
