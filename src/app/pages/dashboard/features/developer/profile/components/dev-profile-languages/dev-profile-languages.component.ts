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

  @Output() onAdd = new EventEmitter<RequestDeveloperProfileAdd<any>>();
  @Output() onEdit = new EventEmitter<RequestDeveloperProfileUpdate<any>>();
  @Output() onDelete = new EventEmitter<RequestDeveloperProfileDelete<any>>();

  private identifier: DeveloperProfileEditFieldsIdentifier = 'DEVELOPER_LANGUAGES'

  protected editLoading: boolean = false;
  protected isModalOpen: boolean = false;
  protected languagesFormList: FormGroup[] | undefined;

  protected addingNewField: boolean = false;
  protected newFieldForm: FormGroup | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: DeveloperFormService,
    private componentService: CommonComponentService,
    private developerProfileService: DeveloperProfileService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['languagesList'] && changes['languagesList'].currentValue) {
      if (this.languagesList) {

        this.languagesList = this.getLanguageListWithRating(this.languagesList); // here

        if (this.isOwner) {
          this.createLanguageForm(this.languagesList)
        }
      }
    }
  }

  protected onCloseModal() {
    this.isModalOpen = false
    this.addingNewField = false
    this.newFieldForm = undefined
  }

  protected onAdding() {
    this.isModalOpen = true
    this.addingNewField = true
    this.newFieldForm = this.formService.buildDeveloperLanguagesForm();
  }

  protected addNewField(form: FormGroup) {

    this.editLoading = true

    this.onAdd.emit({
      data: form.value, identifier: this.identifier,
      onSuccess: (response) => {

        this.editLoading = false
        this.newFieldForm?.reset();

        this.developerProfileService.addDeveloperProfileLanguageToList(response.data);
        this.componentService.showMessage({ detail: response.message, type: 'success' });
      },
      onError: (error) => {

        this.editLoading = false
        this.componentService.showMessage({ detail: error.message, type: 'error' });
      }
    })
  }

  private getLanguageListWithRating(languageList: DeveloperProfileLanguages[]) {

    function getLevel(level: LanguageLevel) {
      const levelMapping = { 'Básico': 2, 'Intermediário': 3, 'Avançado': 4, 'Proficiente': 5 }
      return levelMapping[level];
    }

    return languageList.map(language => {
      const rating = getLevel(language.level as LanguageLevel);
      return { ...language, rating: rating };
    })

  }

  private createLanguageForm(languageList: DeveloperProfileLanguages[]) {

    this.languagesFormList = languageList.map(language => {

      const EDIT_MODE: boolean = true;
      const form = this.formService.buildDeveloperLanguagesForm(EDIT_MODE);

      form.patchValue(language);
      return form;

    });
  }

  protected updateLanguage(form: FormGroup) {

    this.editLoading = true

    this.onEdit.emit({
      data: form.value,
      identifier: this.identifier,
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
      body: { id, identifier: this.identifier },
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