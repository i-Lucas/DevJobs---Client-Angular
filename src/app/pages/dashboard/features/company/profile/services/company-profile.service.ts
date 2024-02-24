import { Injectable } from '@angular/core';
import { SharedDashboardService } from '@app-services/dashboard/user/user-dashboard.service';

@Injectable()
export class CompanyProfileService {

  constructor(private dashboardService: SharedDashboardService) { }

  private getNow() {
    return new Date().getTime().toString();
  }

  public updateCompanyContact(contact: CompanyProfileSupport) {

    const currentProfile = this.dashboardService.getProfileSubject() as CompanyProfile;

    this.dashboardService.updateProfile({
      ...currentProfile,
      suportInfo: {
        ...contact,
        updatedAt: this.getNow(),
      },
      type: 'COMPANY'
    })
  }

  public updateCompanyAddress(address: CompanyProfileAddress) {

    const currentProfile = this.dashboardService.getProfileSubject() as CompanyProfile;

    this.dashboardService.updateProfile({
      ...currentProfile,
      address: {
        ...address,
        updatedAt: this.getNow(),
      },
      type: 'COMPANY'
    })
  }

  public updateCompanyDetails(details: CompanyProfileDetails) {

    const currentProfile = this.dashboardService.getProfileSubject() as CompanyProfile;

    this.dashboardService.updateProfile({
      ...currentProfile,
      details: {
        ...details,
        updatedAt: this.getNow(),
      },
      type: 'COMPANY'
    })
  }

  public updateCompanySocial(social: CompanyProfileSocial) {

    const currentProfile = this.dashboardService.getProfileSubject() as CompanyProfile;

    this.dashboardService.updateProfile({
      ...currentProfile,
      socialNetwork: {
        ...social,
        updatedAt: this.getNow(),
      },
      type: 'COMPANY'
    })
  }

}
