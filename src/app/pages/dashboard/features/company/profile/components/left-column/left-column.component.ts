import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'company-profile-left-column',
  templateUrl: './left-column.component.html',
})
export class LeftColumnComponent {
  
  @Input() openOffers: JobOfferData[] | undefined;
  @Input() currentProfile: CompanyProfile | undefined;
  @Output() onNavigate = new EventEmitter<OnPreviewNavigate>()

}