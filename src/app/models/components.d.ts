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

interface DashboardHeaderProps {

    userName: string;
    userPicture: string;
}

interface DashboardHeaderEvents {
    action: 'TOGGLE_SIDEBAR' | 'CHANGE_THEME' | 'LOGOUT'
}

interface PMenuOptions {

    label: string;
    icon: string;
    command?: () => void;
}

interface SidebarOptions {
    icon: string,
    label: string,
    tooltip: string,
    link: {
        path: string,
        sub_path?: string
    }
}

interface SidebarProps {
    mode: AccountType
    profileId: string
}