type Severity = 'info' | 'warn' | 'success' | 'error';

interface DropdownOptionsList {
    name: string;
}

interface ToastProps {

    detail: string;
    type: Severity;
}

interface DevSignupFormPreviewEvent {

    option: 'edit' | 'remove';
    item: DeveloperProfileListFields;
    identifier: DeveloperProfileListFieldsIdentifier;
}

interface DashboardHeaderProps {

    userName: string;
    userPicture: string;
}

interface DashboardHeaderEvents {
    action: 'TOGGLE_SIDEBAR' | 'CHANGE_THEME' | 'LOGOUT';
}

interface PMenuOptions {

    icon: string;
    label: string;
    command?: () => void;
}

interface SidebarListOptions {

    icon: string;
    label: string;
    tooltip: string;
    badge?: boolean;
    badgeCount?: number;
    link: {
        path: string;
        sub_path?: string;
    },
}

interface SidebarProps {

    mode: AccountType;
    profileId: string;
}

interface CompanyEditModeOnSave {

    form: FormGroup;
    identifier: CompanyProfileEditFieldsIdentifier;
}

interface DeveloperEditModeOnSave {

    form: FormGroup;
    identifier: DeveloperProfileEditFieldsIdentifier;
}

interface DeveloperEditModeOnDelete {

    id: string;
    identifier: DeveloperProfileEditFieldsIdentifier;
}

interface OnPreviewNavigate {

    path: string;
    params: string;
}

interface OnClickMessageList {
    messageId: string
}