import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "@app-services/auth/auth.service";
import { CommonComponentService } from "@app-services/components/base-component.service";
import { SharedDashboardService } from "@app-services/dashboard/user/user-dashboard.service";

@Injectable()
export class AuthGuard {

  constructor(
    private authService: AuthenticationService,
    private dashboardService: SharedDashboardService,
    private componentService: CommonComponentService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isNotAuthenticated = () => {
      this.authService.removeToken();
      this.componentService.navigate('/auth');
      this.componentService.showMessage({ detail: 'Não Autenticado!', type: 'info' });
      return false;
    };

    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {

      const userJwtPayload = this.authService.extractUserJwtPayload();
      if (!userJwtPayload) return isNotAuthenticated();

      else {

        this.dashboardService.updateUserJwtPayload(userJwtPayload as UserJwtPayload);
        return true;
      }

    }

    return isNotAuthenticated();
  }

}