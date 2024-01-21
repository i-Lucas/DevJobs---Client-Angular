type AcademicType =
    'Graduação' | 'Bacharelado' |
    'Licenciatura' | 'Mestrado' |
    'Tecnólogo' | 'Estágio' |
    'Doutorado' | 'Técnico' |
    'Pós-graduação' | 'Curso Livre';

type AcademicStatus =
    'Cursando' | 'Concluído' |
    'Trancado' | 'Abandonado' |
    'Interrompido';

type AcademicModality =
    'Educação à distância' | 'Presencial' | 'Semi-Presencial'

interface DeveloperProfileAcademicEducation {

    id?: string;

    institution: string;
    course: string;
    type: AcademicType;
    status: AcademicStatus;
    modality: AcademicModality;

    from: string;
    to: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileJobExperiences {

    id?: string,

    company: string;
    occupation: string;
    resume: string;
    current_job: boolean;

    from: string;
    to: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileCertificates {

    id?: string,

    workload: string;
    institution: string;
    course: string;
    link?: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileProjects {

    id?: string,

    title: string;
    resume: string;
    link?: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileLanguages {

    id?: string;

    language: string;
    level: string; // 'Básico' | 'Intermediário' | 'Avançado' | 'Proficiente';

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileStackList {

    id?: string;

    name: string;
    workload: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileContact {

    phone: string;
    github: string;
    linkedin: string;
    email: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfileAbout {

    age: number;
    name: string;
    resume: string;
    picture: string;
    occupation: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperAddress {

    cep: string;
    city: string;
    state: string;
    number: string;
    address: string;
    complement: string;
    neighborhood: string;

    createdAt: string;
    updatedAt: string;
}

interface DeveloperProfile {

    id: string;

    about: DeveloperProfileAbout;
    address: DeveloperAddress;
    contact: DeveloperProfileContact;

    academic_education: DeveloperProfileAcademicEducation[];
    professional_experiences: DeveloperProfileJobExperiences[];
    certificates: DeveloperProfileCertificates[];
    languages: DeveloperProfileLanguages[];
    projects: DeveloperProfileProjects[];
    stack: DeveloperProfileStackList[];

    createdAt: string;
    updatedAt: string;
}

type DeveloperProfileListFields =
    DeveloperProfileAcademicEducation |
    DeveloperProfileJobExperiences |
    DeveloperProfileCertificates |
    DeveloperProfileProjects |
    DeveloperProfileLanguages |
    DeveloperProfileStackList;

type DeveloperProfileListFieldsIdentifier =
    'ACADEMIC_EDUCATION' |
    'JOB_EXPERIENCES' |
    'CERTIFICATES' |
    'PROJECTS' |
    'LANGUAGES' |
    'STACKLIST';