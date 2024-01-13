interface DropdownOptionsList {
    name: string
}

interface ToastProps {

    detail: string;
    type: 'info' | 'warn' | 'success' | 'error';
}

type DeveloperProfileListFieldsIdentifier =
    'ACADEMIC_EDUCATION' |
    'JOB_EXPERIENCES' |
    'CERTIFICATES' |
    'PROJECTS' |
    'LANGUAGES' |
    'STACKLIST';

interface DevSignupFormPreviewEvent {

    option: 'edit' | 'remove';
    item: DeveloperProfileListFields;
    identifier: DeveloperProfileListFieldsIdentifier
}


