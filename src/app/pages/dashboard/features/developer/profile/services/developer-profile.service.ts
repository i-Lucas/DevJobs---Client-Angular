import { Injectable } from '@angular/core';
import { SharedDashboardService } from '@app-services/dashboard/user/user-dashboard.service';

@Injectable()
export class DeveloperProfileService {

  constructor(private dashboardService: SharedDashboardService) { }

  private getNow() {
    return new Date().getTime().toString();
  }

  // update

  public updateDeveloperContact(contact: DeveloperProfileContact) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;

    this.dashboardService.updateProfile({
      ...currentProfile,
      contact: {
        ...contact,
        updatedAt: this.getNow(),
      },
      type: 'CANDIDATE'
    })
  }

  public updateDeveloperProfileAddress(address: DeveloperAddress) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    // const currentAddress = currentProfile.address;

    this.dashboardService.updateProfile({
      ...currentProfile,
      address: {
        ...address,
        updatedAt: this.getNow(),
      },
      type: 'CANDIDATE'
    })
  }

  public updateDeveloperProfileAbout(about: DeveloperProfileAbout) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    const currentAbout = currentProfile.about;

    // don't update the photo yet

    this.dashboardService.updateProfile({
      ...currentProfile,
      type: 'CANDIDATE',
      about: {
        ...currentAbout,
        age: about.age,
        name: about.name,
        resume: about.resume,
        updatedAt: this.getNow(),
        occupation: about.occupation,
      }
    })
  }

  public updateDeveloperProfileEducation(education: DeveloperProfileAcademicEducation) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentEducationList = currentProfile.academic_education || [];

    const educationToUpdate = currentEducationList.find(edu => edu.id === education.id);

    if (educationToUpdate) {

      const updatedEducationList = currentEducationList.map(edu =>
        edu.id === education.id ? { ...edu, ...education, updatedAt: this.getNow() } : edu
      );

      updatedEducationList.sort((a, b) => (a.from > b.from ? -1 : 1));

      this.dashboardService.updateProfile({
        ...currentProfile,
        academic_education: updatedEducationList,
        type: 'CANDIDATE'
      });
    }
  };

  public updateDeveloperProfileJobExperiences(experience: DeveloperProfileJobExperiences) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentExperiencesList = currentProfile.professional_experiences || [];

    const experienceToUpdate = currentExperiencesList.find(exp => exp.id === experience.id);

    if (experienceToUpdate) {

      const updatedExperienceList = currentExperiencesList.map(edu =>
        edu.id === experience.id ? { ...edu, ...experience, updatedAt: this.getNow() } : edu
      );

      updatedExperienceList.sort((a, b) => (a.from > b.from ? -1 : 1));

      this.dashboardService.updateProfile({
        ...currentProfile,
        professional_experiences: updatedExperienceList,
        type: 'CANDIDATE'
      });
    }
  }

  public updateDeveloperProfileCertificates(certificate: DeveloperProfileCertificates) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentCertificatesList = currentProfile.certificates || [];

    const certificateToUpdate = currentCertificatesList.find(item => item.id === certificate.id);

    if (certificateToUpdate) {

      const updatedCertificatesList = currentCertificatesList.map(item =>
        item.id === certificate.id ? { ...item, ...certificate, updatedAt: this.getNow() } : item
      );

      updatedCertificatesList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

      this.dashboardService.updateProfile({
        ...currentProfile,
        certificates: updatedCertificatesList,
        type: 'CANDIDATE'
      });
    }
  }

  public updateDeveloperProfileLanguages(language: DeveloperProfileLanguages) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentLanguagesList = currentProfile.languages || [];

    const languageToUpdate = currentLanguagesList.find(item => item.id === language.id);

    if (languageToUpdate) {

      const updatedLanguagesList = currentLanguagesList.map(item =>
        item.id === language.id ? { ...item, ...language, updatedAt: this.getNow() } : item
      );

      updatedLanguagesList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

      this.dashboardService.updateProfile({
        ...currentProfile,
        languages: updatedLanguagesList,
        type: 'CANDIDATE'
      });
    }
  }

  public updateDeveloperProfileProjects(project: DeveloperProfileProjects) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentProjectsList = currentProfile.projects || [];

    const projectToUpdate = currentProjectsList.find(item => item.id === project.id);

    if (projectToUpdate) {

      const updatedProjectList = currentProjectsList.map(item =>
        item.id === project.id ? { ...item, ...project, updatedAt: this.getNow() } : item
      );

      this.dashboardService.updateProfile({
        ...currentProfile,
        projects: updatedProjectList,
        type: 'CANDIDATE'
      });
    }
  }

  public updateDeveloperProfileStackList(stack: DeveloperProfileStackList) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentStackList = currentProfile.stack || [];

    const stackToUpdate = currentStackList.find(item => item.id === stack.id);

    if (stackToUpdate) {

      const updatedStackList = currentStackList.map(item =>
        item.id === stack.id ? { ...item, ...stack, updatedAt: this.getNow() } : item
      );

      updatedStackList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

      this.dashboardService.updateProfile({
        ...currentProfile,
        stack: updatedStackList,
        type: 'CANDIDATE'
      });
    }
  }

  // delete

  public deleteDeveloperProfileEducation(educationId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentEducationList = currentProfile.academic_education || [];

    const educationIndexToDelete = currentEducationList.findIndex(edu => edu.id === educationId);

    if (educationIndexToDelete !== -1) {

      currentEducationList.splice(educationIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        academic_education: currentEducationList,
        type: 'CANDIDATE'
      });
    }

  };

  public deleteDeveloperProfileCertificate(certificateId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentCertificatesList = currentProfile.certificates || [];

    const certificateIndexToDelete = currentCertificatesList.findIndex(edu => edu.id === certificateId);

    if (certificateIndexToDelete !== -1) {

      currentCertificatesList.splice(certificateIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        certificates: currentCertificatesList,
        type: 'CANDIDATE'
      });
    }

  };

  public deleteDeveloperProfileProject(projectId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentProjectList = currentProfile.projects || [];

    const projectIndexToDelete = currentProjectList.findIndex(edu => edu.id === projectId);

    if (projectIndexToDelete !== -1) {

      currentProjectList.splice(projectIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        projects: currentProjectList,
        type: 'CANDIDATE'
      });
    }

  };

  public deleteDeveloperProfileJobExperience(experienceId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentExperiencesList = currentProfile.professional_experiences || [];

    const experienceIndexToDelete = currentExperiencesList.findIndex(exp => exp.id === experienceId);

    if (experienceIndexToDelete !== -1) {
      currentExperiencesList.splice(experienceIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        professional_experiences: currentExperiencesList,
        type: 'CANDIDATE'
      });
    }
  };

  public deleteDeveloperProfileLanguage(languageId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentLanguageList = currentProfile.languages || [];

    const languageIndexToDelete = currentLanguageList.findIndex(item => item.id === languageId);

    if (languageIndexToDelete !== -1) {
      currentLanguageList.splice(languageIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        languages: currentLanguageList,
        type: 'CANDIDATE'
      });
    }
  };

  public deleteDeveloperProfileStackList(stackId: string) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentStackList = currentProfile.stack || [];

    const stackIndexToDelete = currentStackList.findIndex(exp => exp.id === stackId);

    if (stackIndexToDelete !== -1) {
      currentStackList.splice(stackIndexToDelete, 1);

      this.dashboardService.updateProfile({
        ...currentProfile,
        stack: currentStackList,
        type: 'CANDIDATE'
      });
    }
  };

  // add

  public addDeveloperProfileJobExperienceToList(experience: DeveloperProfileJobExperiences) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentExperiencesList = currentProfile.professional_experiences || [];

    const updatedExperienceList = [...currentExperiencesList, { ...experience }];
    updatedExperienceList.sort((a, b) => (a.from > b.from ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      professional_experiences: updatedExperienceList,
      type: 'CANDIDATE'
    });
  }

  public addDeveloperProfileAcademicEducationToList(education: DeveloperProfileAcademicEducation) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentAcademicList = currentProfile.academic_education || [];

    const updatedAcademicList = [...currentAcademicList, { ...education }];
    updatedAcademicList.sort((a, b) => (a.from > b.from ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      academic_education: updatedAcademicList,
      type: 'CANDIDATE'
    });
  }


  public addDeveloperProfileLanguageToList(language: DeveloperProfileLanguages) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentLanguageList = currentProfile.languages || [];

    const updatedLanguageList = [...currentLanguageList, { ...language }];
    updatedLanguageList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      languages: updatedLanguageList,
      type: 'CANDIDATE'
    });
  }

  public addDeveloperProfileCertificateToList(certificate: DeveloperProfileCertificates) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentCertificatesList = currentProfile.certificates || [];

    const updatedCertificatesList = [...currentCertificatesList, { ...certificate }];
    updatedCertificatesList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      certificates: updatedCertificatesList,
      type: 'CANDIDATE'
    });
  }

  public addDeveloperProfileProjectToList(project: DeveloperProfileProjects) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentProjectsList = currentProfile.projects || [];

    const updatedProjectsList = [...currentProjectsList, { ...project }];
    updatedProjectsList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      projects: updatedProjectsList,
      type: 'CANDIDATE'
    });
  }


  public addDeveloperProfileStackToList(project: DeveloperProfileStackList) {

    const currentProfile = this.dashboardService.getProfileSubject() as DeveloperProfile;
    let currentStackList = currentProfile.stack || [];

    const updatedStackList = [...currentStackList, { ...project }];
    updatedStackList.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    this.dashboardService.updateProfile({
      ...currentProfile,
      stack: updatedStackList,
      type: 'CANDIDATE'
    });
  }


}