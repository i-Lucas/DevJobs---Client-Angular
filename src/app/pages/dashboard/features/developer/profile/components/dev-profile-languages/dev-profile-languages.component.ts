import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DeveloperProfileService } from '../../services/developer-profile.service';
import { CommonComponentService } from '@app-services/components/base-component.service';
import { DeveloperFormService } from '@app-shared-forms/services/builder/developer-forms/developer-form.service';

type LanguageLevel = 'Básico' | 'Avançado' | 'Intermediário' | 'Proficiente';

@Component({
  selector: 'dev-profile-languages',
  templateUrl: './dev-profile-languages.component.html',
})
export class DevProfileLanguagesComponent implements OnChanges {

  @Input() loading: boolean = false;
  @Input() isOwner: boolean = false;
  @Input() languagesList: DeveloperProfile['languages'] | undefined;

  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  protected editLoading: boolean = false;
  protected isModalOpen: boolean = false;
  protected languagesFormList: FormGroup[] | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
  ) { }

  protected menuOptions: PMenuOptions[] = [
    {
      label: 'Editar', icon: 'pi pi-file-edit',
      command: () => this.isModalOpen = true
    }
  ]

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['languagesList'] && changes['languagesList'].currentValue) {
      if (this.languagesList) {

        this.languagesList = this.getLanguageListWithRating(this.languagesList); // here

        if (this.isOwner) {
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

  protected updateLanguage(form: FormGroup) {

    this.editLoading = true

    this.onEdit.emit({
      data: form.value,
      identifier: 'DEVELOPER_LANGUAGES',
      onSuccess: (response) => {

        this.editLoading = false
        this.developerProfileService.updateDeveloperProfileLanguages(form.value);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    });

  }

  protected confirmDelete(event: Event, id: string) {
    this.componentService.confirmEvent(event, undefined, () => {
      this.deleteLanguage(id);
    });
  };

  protected deleteLanguage(id: string) {

    this.editLoading = true

    this.onDelete.emit({
      body: { id, identifier: 'DEVELOPER_LANGUAGES' },
      onError: (error) => {
        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      },
      onSuccess: (response) => {
        this.editLoading = false
        this.removeFormFromList(id);
        this.developerProfileService.deleteDeveloperProfileLanguage(id);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      }
    })
  }

  private removeFormFromList(id: string) {

    if (this.languagesFormList) {
      this.languagesFormList = this.languagesFormList.filter(form => form.value.id !== id);
      this.languagesList = this.languagesList!.filter(item => item.id !== id); // important, why the list being reassigned locally
      this.cdr.detectChanges();
    }
  }

}