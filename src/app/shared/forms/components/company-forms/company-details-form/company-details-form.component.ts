import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-details-form',
  templateUrl: './company-details-form.component.html',
})
export class CompanyDetailsFormComponent {

  @Input() detailsForm: FormGroup | undefined

  protected employeesSize: DropdownOptionsList[] = [
    { name: '(1 - 10 colaboradores)' },
    { name: '(20 - 50 colaboradores)' },
    { name: '(50 - 100 colaboradores)' },
    { name: '(100 - 250 colaboradores)' },
    { name: 'Mais de 500 colaboradores' },
  ];

  protected legalNature: DropdownOptionsList[] = [
    { name: 'LTDA' },
    { name: 'ME' },
    { name: 'MEI' },
    { name: 'SA' },
    { name: 'EIRELI' },
  ];

}
