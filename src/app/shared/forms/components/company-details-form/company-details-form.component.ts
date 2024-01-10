import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseFormService } from '@app-shared-forms/services/base-form.service';

@Component({
  selector: 'app-company-details-form',
  templateUrl: './company-details-form.component.html',
})
export class CompanyDetailsFormComponent extends BaseFormService implements OnInit {

  protected detailsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit(): void {

    this.detailsForm = this.formBuilder.group({
      fantasy_name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      foundedIn: ['', [Validators.required, this.validatePattern(/^(19|20)\d{2}$/)]],
      teamSize: ['', [Validators.required]],
      marketArea: ['', [Validators.required]],
      legalNature: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      socialReason: ['', [Validators.required]],
      about: ['', [Validators.required]]
    })
  }

  protected getLegalNature(): DropdownOptionsList[] {

    return [
      { name: 'LTDA' },
      { name: 'ME' },
      { name: 'MEI' },
      { name: 'SA' },
      { name: 'EIRELI' },
    ];
  }

  protected getEmployeesSize(): DropdownOptionsList[] {

    return [
      { name: '(1 - 10 colaboradores)' },
      { name: '(20 - 50 colaboradores)' },
      { name: '(50 - 100 colaboradores)' },
      { name: '(100 - 250 colaboradores)' },
      { name: 'Mais de 500 colaboradores' },
    ];
  }

  public getForm() {
    return this.detailsForm
  }
}
