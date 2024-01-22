import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

type LanguageLevel = 'Básico' | 'Avançado' | 'Intermediário' | 'Proficiente';

@Component({
  selector: 'dev-profile-languages',
  templateUrl: './dev-profile-languages.component.html',
})
export class DevProfileLanguagesComponent {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;

  @Output() onSave = new EventEmitter<DeveloperEditModeOnSave>();
  @Input() languagesList: DeveloperProfile['languages'] | undefined;

  protected isModalOpen: boolean = false;
  protected languagesFormList: FormGroup[] | undefined;

  constructor(private formService: DeveloperFormService) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOwner) {
      if (changes['languagesList'] && changes['languagesList'].currentValue) {
        if (this.languagesList) {
          this.languagesList = this.getLanguageListWithRating(this.languagesList)
          this.updateLanguageFormsList(this.languagesList)
        }
      }
    }
  }

  private getLanguageListWithRating(languageList: DeveloperProfileLanguages[]) {

    function getLevel(level: LanguageLevel) {
      const levelMapping = { 'Básico': 2, 'Avançado': 3, 'Intermediário': 4, 'Proficiente': 5 }
      return levelMapping[level];
    }

    return languageList.map(language => {
      const rating = getLevel(language.level as LanguageLevel);
      return { ...language, rating: rating };
    })

  }

  private updateLanguageFormsList(languageList: DeveloperProfileLanguages[]) {

    this.languagesFormList = languageList.map(language =>
      this.createLanguageForm(language)
    );
  }

  private createLanguageForm(language: DeveloperProfileLanguages): FormGroup {

    const EDIT_MODE: boolean = true;
    const form = this.formService.buildDeveloperLanguagesForm(EDIT_MODE);

    form.patchValue(language);
    return form;

  }

}