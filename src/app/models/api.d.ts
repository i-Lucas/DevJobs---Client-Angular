interface ApiResponse<T> {

    status: number;
    message: string;
    data?: T
}

interface ApiError {

    status: number;
    message: string;
}

interface ApiResponseAddressData {

    cep: string;
    city: string;
    state: string;
    street: string;
    service: string;
    neighborhood: string;
}

interface RequestDeveloperProfileUpdate<T> {
    data: T;
    onError: (error: ApiError) => void;
    onSuccess: (response: ApiResponse<T>) => void;
    identifier: DeveloperProfileEditFieldsIdentifier;
}

interface RequestCompanyProfileUpdate<T> {
    data: T;
    onError: (error: ApiError) => void;
    onSuccess: (response: ApiResponse<T>) => void;
    identifier: CompanyProfileEditFieldsIdentifier;
}

interface RequestDeveloperProfileAdd<T> {
    data: T;
    onError: (error: ApiError) => void;
    onSuccess: (response: ApiResponse<T>) => void;
    identifier: DeveloperProfileEditFieldsIdentifier;
}

interface RequestDeveloperProfileDelete<T> {
    body: {
        id: string;
        identifier: DeveloperProfileEditFieldsIdentifier;
    };
    onError: (error: ApiError) => void;
    onSuccess: (response: ApiResponse<T>) => void;
}

interface UserJwtPayload {

    email: string;
    userId: string;
    accountId: string;
    profileId: string;
    accountType: AccountType;
}