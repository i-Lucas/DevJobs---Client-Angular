import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-root',
  templateUrl: './signup-root.component.html',
  styleUrl: './signup-root.component.scss'
})
export class SignupRootComponent {

  private signupUrl: string = '/auth/signup/developer';
  protected mode: 'DEV' | 'COMPANY' = location.pathname === this.signupUrl ? 'DEV' : 'COMPANY';

  protected changeMode(selectedMode: 'DEV' | 'COMPANY'): void {
    this.mode = selectedMode;
  }
}
