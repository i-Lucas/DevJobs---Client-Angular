import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidebarService {

  private sidebarProps = new BehaviorSubject<SidebarProps | null>(null);
  private sidebarList = new BehaviorSubject<SidebarListOptions[] | []>([]);

  private getDefaultOptions(mode: AccountType): SidebarListOptions[] {

    const baseHome = '/dashboard/'.concat((mode === 'COMPANY' ? 'company' : 'developer'), '/');

    return [
      { link: { path: baseHome.concat('home') }, icon: 'home', label: 'Início', tooltip: 'Início' },
      { link: { path: '/dashboard/notifications' }, icon: 'forum', label: 'Mensagens', tooltip: 'Acesse sua caixa de mensagens', badge: true },
      { link: { path: '/dashboard' }, disabled: true, label: 'Suporte', icon: 'contact_support', tooltip: 'Dúvidas ou problemas? Contate o suporte' },
      { link: { path: '/dashboard' }, disabled: true, label: 'Feedback', icon: 'feedback', tooltip: 'Ajude-nos a melhorar com sua opinião' },
      { link: { path: '/dashboard' }, disabled: true, icon: 'warning', label: 'Avisos', tooltip: 'Veja se algo deu errado e como resolver' },
    ];
  }

  private getProfileOption(mode: AccountType, profileId: string): SidebarListOptions {

    const option: SidebarListOptions = {
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

  private getCompanyOptions(profileId: string): SidebarListOptions[] {
    const profile_field = this.getProfileOption('COMPANY', profileId);

    return [
      profile_field,
      {
        icon: 'work', label: 'Recrutamento',
        link: { path: '/dashboard/company/recruitment' },
        tooltip: 'Gerencie ou inicie processos seletivos'
      },
      {
        icon: 'search', label: 'Talentos',
        link: { path: '/dashboard/talents' },
        tooltip: 'Encontre perfis e habilidades'
      }
    ]
  }

  private getDeveloperOptions(profileId: string): SidebarListOptions[] {
    const profile_field = this.getProfileOption('CANDIDATE', profileId);

    return [
      profile_field,
      {
        icon: 'work', label: 'Vagas',
        link: { path: '/dashboard/hiring/jobs' },
        tooltip: 'Procure por vagas'
      },
      {
        icon: 'fact_check', label: 'Candidaturas',
        link: { path: '/dashboard/developer/applications' },
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
        ...this.getDefaultOptions(props.mode).slice(0, 1),
        ...options,
        ...this.getDefaultOptions(props.mode).slice(1)
      ])
    }
  }

  private updateSidebarList(list: SidebarListOptions[]): void {
    this.sidebarList.next(list)
  }

  public getSidebarList(): Observable<SidebarListOptions[] | []> {
    return this.sidebarList.asObservable();
  }

  public updateSidebarProps(props: SidebarProps): void {
    this.sidebarProps.next(props);
    this.buildList(props);
  }

}