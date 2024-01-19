import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {

  @Input() isOpen: boolean = false;
  @Input() props: SidebarProps | null = null
  
  @Output() onHide = new EventEmitter<void>();

  private defaultOptions: SidebarOptions[] = [
    {
      icon: 'home', label: 'Início', tooltip: 'Início',
      link: { path: '/dashboard' }
    },
    {
      icon: 'forum', label: 'Mensagens',
      link: { path: '/dashboard' },
      tooltip: 'Acesse sua caixa de mensagens'
    },
    {
      label: 'Suporte', icon: 'contact_support',
      link: { path: '/dashboard' },
      tooltip: 'Dúvidas ou problemas ? Contate o suporte'
    },
    {
      label: 'Feedback', icon: 'feedback',
      link: { path: '/dashboard' },
      tooltip: 'Ajude-nos a melhorar com sua opinião'
    },
    {
      icon: 'warning', label: 'Avisos',
      link: { path: '/dashboard' },
      tooltip: 'Veja se algo deu errado e como resolver'
    }
  ];

  private companyOptions: SidebarOptions[] = [
    {
      icon: 'apartment', label: 'Empresa',
      link: {
        path: '/dashboard/company/profile',
        sub_path: this.props?.profileId
      },
      tooltip: 'Acesse o perfil da sua empresa'
    },
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

  private developerOptions: SidebarOptions[] = [
    {
      icon: 'contact_page',
      label: 'Perfil',
      link: {
        path: '/dashboard/developer/profile',
        sub_path: this.props?.profileId
      },
      tooltip: 'Acesse o seu perfil'
    },
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

  protected getSidebarOptions() {

    let options: SidebarOptions[] = [];

    if (this.props?.mode === 'COMPANY') {
      options = [
        ...this.defaultOptions.slice(0, 1),
        ...this.companyOptions,
        ...this.defaultOptions.slice(1)
      ];
    }

    else if (this.props?.mode === 'CANDIDATE') {
      options = [
        ...this.defaultOptions.slice(0, 1),
        ...this.developerOptions,
        ...this.defaultOptions.slice(1)
      ];
    }

    return options
  }

}