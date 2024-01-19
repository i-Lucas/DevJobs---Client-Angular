import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidebarService {

  private sidebarProps = new BehaviorSubject<SidebarProps | null>(null);
  private sidebarList = new BehaviorSubject<SidebarOptions[] | []>([]);

  private getDefaultOptions(): SidebarOptions[] {
    return [
      {
        link: { path: '/dashboard' },
        icon: 'home', label: 'Início', tooltip: 'Início',
      },
      {
        link: { path: '/dashboard' },
        icon: 'forum', label: 'Mensagens',
        tooltip: 'Acesse sua caixa de mensagens'
      },
      {
        link: { path: '/dashboard' },
        label: 'Suporte', icon: 'contact_support',
        tooltip: 'Dúvidas ou problemas ? Contate o suporte'
      },
      {
        link: { path: '/dashboard' },
        label: 'Feedback', icon: 'feedback',
        tooltip: 'Ajude-nos a melhorar com sua opinião'
      },
      {
        link: { path: '/dashboard' },
        icon: 'warning', label: 'Avisos',
        tooltip: 'Veja se algo deu errado e como resolver'
      }
    ]
  }

  private getProfileOption(mode: AccountType, profileId: string): SidebarOptions {

    const option: SidebarOptions = {
      link: { path: '', sub_path: profileId },
      icon: '', label: '', tooltip: ''
    }

    if (mode === 'CANDIDATE') {
      option.label = 'Perfil'
      option.icon = 'contact_page'
      option.link.path = '/dashboard/developer/profile'
      option.tooltip = 'Acesse o seu perfil'
    }
    if (mode === 'COMPANY') {
      option.label = 'Empresa'
      option.icon = 'apartment'
      option.link.path = '/dashboard/company/profile'
      option.tooltip = 'Acesse o perfil da sua empresa'
    }

    return option
  }

  private getCompanyOptions(profileId: string): SidebarOptions[] {
    const profile_field = this.getProfileOption('COMPANY', profileId);

    return [
      profile_field,
      {
        icon: 'work', label: 'Recrutamento',
        link: { path: '/dashboard' },
        tooltip: 'Visualize ou inicie processos seletivos'
      },
      {
        icon: 'search', label: 'Talentos',
        link: { path: '/dashboard' },
        tooltip: 'Encontre perfis e habilidades'
      }
    ]
  }

  private getDeveloperOptions(profileId: string): SidebarOptions[] {
    const profile_field = this.getProfileOption('CANDIDATE', profileId);

    return [
      profile_field,
      {
        icon: 'work', label: 'Vagas',
        link: { path: '/dashboard' },
        tooltip: 'Procure por vagas'
      },
      {
        icon: 'fact_check', label: 'Candidaturas',
        link: { path: '/dashboard' },
        tooltip: 'Acompanhe e gerencie suas candidaturas'
      }
    ]
  }

  protected buildList(props: SidebarProps) {
    if (props) {
      const options = props.mode === 'COMPANY' ?
        this.getCompanyOptions(props.profileId) :
        this.getDeveloperOptions(props.profileId);

      this.updateSidebarList([
        ...this.getDefaultOptions().slice(0, 1),
        ...options,
        ...this.getDefaultOptions().slice(1)
      ])
    }
  }

  private updateSidebarList(list: SidebarOptions[]): void {
    this.sidebarList.next(list)
  }

  public getSidebarList(): Observable<SidebarOptions[] | []> {
    return this.sidebarList.asObservable();
  }

  public updateSidebarProps(props: SidebarProps): void {
    this.sidebarProps.next(props);
    this.buildList(props);
  }

}