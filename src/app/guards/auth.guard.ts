import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "@app-services/auth/auth.service";
import { CommonComponentService } from "@app-services/components/base-component.service";

@Injectable()
export class AuthGuard {

  constructor(
    private authService: AuthenticationService,
    private componentService: CommonComponentService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) return true;

    this.authService.removeToken();
    this.componentService.goTo('/auth');
    this.componentService.showMessage({ detail: 'Não Autenticado!', type: 'info' })
    return false;

  }

}