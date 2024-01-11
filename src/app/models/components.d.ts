interface DropdownOptionsList {
    name: string
}

interface ToastProps {

    detail: string;
    type: 'info' | 'warn' | 'success' | 'error';
}

interface DevSignupFormPreviewEvent {

    identifier:
    'ACADEMIC_EDUCATION' |
    'JOB_EXPERIENCES' |
    'CERTIFICATES' |
    'PROJECTS' |
    'LANGUAGES' |
    'STACKLIST';

    item:
    DeveloperProfileAcademicEducation |
    DeveloperProfileJobExperiences |
    DeveloperProfileCertificates |
    DeveloperProfileProjects |
    DeveloperProfileLanguages |
    DeveloperProfileStackList;
}