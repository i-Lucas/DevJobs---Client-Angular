type AccountType = 'ADMIN' | 'COMPANY' | 'CANDIDATE';

interface AppAccount {

    id: string;
    profileId: string;

    accountType: AccountType;

    createdAt: string;
    updatedAt: string;
}

interface GetAccountDataResponse {

    user: AppUser;
    account: AppAccount;
    profile: DeveloperProfile | CompanyProfile;
}