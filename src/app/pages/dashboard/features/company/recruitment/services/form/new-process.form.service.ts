import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class HiringProcessFormService {

  constructor(private formBuilder: FormBuilder) { }

  public getNewProcessForm() {
    return this.createForm();
  }

  public getWorkloadList() {
    return this.workloadList
  }

  public getCategoryList() {
    return this.categoryList
  }

  public getSeniorityList() {
    return this.seniorityList
  }

  public getSuggestionsDifferentials(): string[] {
    return this.differentials
  }

  public getContractTypes() {
    return this.contractTypeList
  }

  public getLocationTypes() {
    return this.locationTypeList
  }

  public getSuggestionsBenefits(): string[] {
    return this.benefits
  }

  public getSuggestionsRequirements(seniority: SeniorityLevels): string[] {
    return this.requirements[seniority]
  }

  public getSuggestionsStacklist(category: CategoryList): string[] {

    if (category === 'Full-Stack') {

      return [
        ...this.stacklist['DevOps'],
        ...this.stacklist['Back-End'],
        ...this.stacklist['Front-End'],
        ...this.stacklist['Banco de Dados']
      ]
    }

    else return this.stacklist[category]
  }

  private createForm() {

    return this.formBuilder.group({

      // id: [''], 

      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]], // devops, QA, frontend, backend, fullstack ..
      seniority: ['', [Validators.required]], // júnior, pleno, sênior ...

      differences: new FormControl<string[]>([]), // lista de diferenciais ex ( Graduação em Telecomunicações )

      stacklist: new FormControl<HiringStackListForm[]>([], [control => this.minArrayLength(control, 3)]), // .. node, typescript, docker
      requirements: new FormControl<string[]>([], [control => this.minArrayLength(control, 3)]), // ... git,  metodologias ágeis
      benefits: new FormControl<string[]>([], [control => this.minArrayLength(control, 3)]),  //  ...  plano de saúde, vale refeição

      salaryRange: [''], // faixa salarial ex ( R$ 7.000,00 - R$ 8.000,00 )
      salaryRange_from: [''],
      salaryRange_to: [''],
      negotiable: [true], // salário negociável

      contractType: ['', [Validators.required]], // ...CLT, PJ, Flex, Freelance
      locationType: ['', [Validators.required]], // ... remoto, híbrido, presencial 
      workload: ['', [Validators.required]], // ... full-time, meio período 

      enableSuggestions: [true], // autocomplete

      deadline: ['', [Validators.required]], // prazo limite para inscrição,
      pcd: [false],

      // createdAt: [''],
      // updatedAt: [''],
    })
  }

  /*
  private validateMinMaxDate(minDays: number, maxDays: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const minDate = new Date();
      const maxDate = new Date();
      minDate.setDate(minDate.getDate() + minDays);
      maxDate.setDate(maxDate.getDate() + maxDays);
      if (selectedDate < minDate) {
        return { minDate: true };
      } else if (selectedDate > maxDate) {
        return { maxDate: true };
      } else {
        return null;
      }
    };
  }

  private validateMinDate(days: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + days);
      return selectedDate < minDate ? { minDate: true } : null;
    };
  }
  */

  private minArrayLength(control: AbstractControl, minLength: number) {
    const array = control.value as string[];
    return array && array.length >= minLength ? null : { minLength: true };
  }

  private workloadList: DropdownOptionsList[] = [
    { name: 'Full-Time' },
    { name: 'Meio Período' },
    { name: 'Flexível' },
  ]

  private categoryList: DropdownOptionsList[] = [
    { name: 'Back-End' },
    { name: 'Front-End' },
    { name: 'Full-Stack' },
    { name: 'Mobile' },
    { name: 'DevOps' },
    { name: 'Testes/Q.A' },
    { name: 'Data Science' },
    { name: 'Banco de Dados' },
    { name: 'Design/UI' },
    { name: 'Design/UX' },
    { name: 'Gestão em TI' },
    { name: 'Marketing' },
  ]

  private seniorityList: DropdownOptionsList[] = [
    { name: 'Estudante' },
    { name: 'Júnior' },
    { name: 'Pleno' },
    { name: 'Sênior' },
  ]

  private contractTypeList: DropdownOptionsList[] = [
    { name: 'CLT' },
    { name: 'PJ' },
    { name: 'Flexível' },
    { name: 'Freelance' },
    { name: 'Estágio ' }
  ]

  private locationTypeList: DropdownOptionsList[] = [
    { name: 'Remoto' },
    { name: 'Híbrido ' },
    { name: 'Presencial' },
  ]

  private differentials = [
    'Certificações relevantes para as tecnologias utilizadas',
    'Implementação de pipelines CI/CD', 'Conhecimento em práticas DevOps',
    'Design e implementação de arquiteturas escaláveis', 'Conhecimento em microservices',
    'Experiência comprovada em projetos relevantes', 'Participação em projetos open source',
    'Experiência em práticas de segurança cibernética', 'Certificações em segurança, como CISSP',
    'Certificação Scrum', 'Proatividade', 'Experiência prática em métodos ágeis (Scrum, Kanban)',
    'Histórico de resolução eficaz de problemas', 'Participação em hackathons ou competições de programação',
    'Conhecimento profundo em frameworks populares como React, Angular, Vue.js, Django, Flask, Spring Boot, etc.',
    'Conhecimento em React Native, Flutter, Swift, Kotlin', 'Experiência com ferramentas como Docker, Kubernetes',
    'Boas habilidades de comunicação verbal e escrita', 'Experiência em trabalho colaborativo em equipes distribuídas',
    'Experiência em empresas de tecnologia renomadas', 'Experiência avançada em linguagens como JavaScript, Python, Java, C#',
    'Experiência em arquiteturas de nuvem (AWS, Azure, Google Cloud)', 'Experiência em desenvolvimento mobile (iOS, Android)',
    'Graduação em Ciência da Computação, Engenharia de Software, ou área relacionada', 'Pós-graduação ou certificações relevantes',
    'Experiência em processamento e análise de big data', 'Conhecimento em frameworks de machine learning como TensorFlow, PyTorch',
    'Contribuições regulares para repositórios open source', 'Certificação PMP ou PRINCE2', 'Experiência em liderança técnica de equipes',
    'Habilidade de aprendizado rápido', 'Pensamento crítico e analítico', 'Participação ativa em meetups, conferências e grupos de desenvolvedores',
  ];

  private benefits: string[] = [
    'Ajuda de Custo', 'Horário Flexível', 'Seguro de Vida', 'Licença Maternidade/Paternidade Estendida',
    'Descontos em Graduações e Pós-graduações', 'Bolsa de 90% para Estudos de Idiomas', 'Home Office',
    'Desconto em Farmácia', 'Plano Odontológico', 'Vale Transporte em Cartão Flexível', 'Assistência Médica',
    'Horário de Trabalho Flexível', 'Participação nos Lucros e Resultados (PLR)', 'Auxílio Creche',
    'Plano de Carreira', 'Cultura Organizacional Inovadora', 'Eventos e Atividades de Integração',
    'Licença Sem Vencimento', 'Café e Lanches no Escritório', 'Programas de Bem-Estar no Trabalho',
    'Cursos e Treinamentos Subsidiados pela Empresa', 'Auxílio Home Office (Ergonomia e Equipamentos)',
    'Day Off no Aniversário', 'Programas de Mentoria', 'Desenvolvimento Profissional Contínuo',
    'Assinatura de Plataformas de Aprendizado Online', 'Benefícios de Academia (Gympass)',
  ]

  private stacklist: { [key in CategoryList]: string[] } = {
    'Back-End': [
      'Node.js', 'Java', 'C#', 'Python', 'Ruby', 'Go', 'PHP',
      'Express', 'Django', 'Flask', 'Ruby on Rails', 'Spring Boot',
      '.NET', 'ASP.NET', 'Kotlin', 'Swift', 'Scala', 'Laravel',
      'Gin', 'Echo', 'Nest.js',
    ],
    'Front-End': [
      'HTML', 'CSS', 'JavaScript', 'TypeScript',
      'React', 'Angular', 'Vue', 'Svelte', 'Ember',
      'Backbone', 'jQuery', 'Bootstrap', 'Tailwind CSS',
      'Webpack', 'Babel',
    ],
    'Full-Stack': [], // method get
    'Mobile': [
      'React Native', 'Swift', 'Kotlin', 'Flutter', 'Xamarin',
      'PhoneGap', 'Ionic', 'NativeScript', 'Corona SDK',
      'SwiftUI', 'Java (Android)',
    ],
    'DevOps': [
      'Docker', 'Kubernetes', 'Jenkins', 'Travis CI', 'GitLab CI',
      'Ansible', 'Terraform', 'AWS', 'Azure', 'Google Cloud',
      'Heroku', 'Netlify',
    ],
    'Testes/Q.A': [
      'Jest', 'Mocha', 'Chai', 'JUnit', 'Selenium', 'Cypress',
      'TestNG', 'Appium', 'PHPUnit',
    ],
    'Data Science': [
      'NumPy', 'Pandas', 'Matplotlib', 'SciPy',
      'Scikit-learn', 'TensorFlow', 'PyTorch',
      'Jupyter', 'Apache Spark', 'Hadoop',
    ],
    'Banco de Dados': [
      'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'OracleDB',
      'Firebase', 'DynamoDB', 'Cassandra', 'Redis', 'MariaDB',
      'SQL Server', 'Neo4j', 'CouchDB',
    ],
    'Design/UI': [
      'Figma', 'Sketch', 'Adobe XD', 'InVision', 'Zeplin',
      'Abstract', 'Bootstrap Studio', 'Material-UI',
    ],
    'Design/UX': [
      'User Persona', 'User Flow', 'Wireframing', 'Prototyping',
      'Usability Testing', 'Interaction Design', 'Information Architecture',
    ],
    'Gestão em TI': [
      'ITIL', 'Agile', 'Scrum', 'Kanban',
      'DevOps Practices', 'Project Management',
      'Risk Management', 'IT Governance',
    ],
    'Marketing': [
      'SEO (Search Engine Optimization)', 'SEM (Search Engine Marketing)',
      'Email Marketing', 'Influencer Marketing', 'Analytics and Data Analysis',
      'Content Marketing', 'Social Media Marketing', 'Digital Marketing Strategy',
    ]
  }

  private requirements: { [key in SeniorityLevels]: string[] } = {
    'Estudante': [
      'Disposição para aprender e crescer profissionalmente',
      'Boa habilidade de comunicação escrita e verbal',
      'Capacidade de trabalho em equipe',
      'Interesse em adquirir conhecimentos práticos na área',
      'Adaptabilidade a novos desafios',
      'Familiaridade com ferramentas básicas de produtividade (Office, Google Workspace)',
      'Atitude proativa na resolução de problemas'
    ],
    'Júnior': [
      'Experiência com trabalho em equipe',
      'Habilidade para aprender rapidamente',
      'Boa comunicação interpessoal',
      'Conhecimento básico em redes e sistemas',
      'Conhecimento de padrões de desenvolvimento de software',
      'Familiaridade com metodologias ágeis (Scrum, Kanban)',
      'Capacidade de documentar código e processos',
      'Interesse em aprimorar habilidades técnicas continuamente'
    ],
    'Pleno': [
      'Experiência com liderança de projetos',
      'Conhecimento avançado em resolução de problemas',
      'Capacidade de análise crítica',
      'Conhecimento em boas práticas de ITIL',
      'Experiência em arquitetura de sistemas',
      'Habilidades avançadas em programação e desenvolvimento',
      'Conhecimento em automação de processos',
      'Certificações relevantes para a área de atuação'
    ],
    'Sênior': [
      'Experiência em liderança de equipes técnicas',
      'Expertise em solução de problemas complexos',
      'Conhecimento profundo em boas práticas de ITIL',
      'Mentoria de membros da equipe',
      'Habilidades avançadas em tomada de decisões estratégicas',
      'Experiência em gerenciamento de projetos de grande escala',
      'Contribuições significativas para a comunidade técnica',
      'Inovação e liderança em adoção de novas tecnologias'
    ]
  };

}