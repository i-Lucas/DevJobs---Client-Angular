import { Component, Input } from '@angular/core';

@Component({
  selector: 'jobs-search-panel',
  templateUrl: './search-panel.component.html',
})
export class SearchPanelComponent {

  @Input() loading: boolean = false;

}
