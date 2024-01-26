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
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    service: string;
}

interface RequestDeveloperProfileUpdate<T> {
    data: T
    identifier: DeveloperProfileEditFieldsIdentifier,
    onSuccess: (response: ApiResponse<T>) => void
    onError: (error: ApiError) => void
}

interface RequestCompanyProfileUpdate<T> {
    data: T
    identifier: CompanyProfileEditFieldsIdentifier,
    onSuccess: (response: ApiResponse<T>) => void
    onError: (error: ApiError) => void
}

interface RequestDeveloperProfileAdd<T> {
    data: T
    identifier: DeveloperProfileEditFieldsIdentifier,
    onSuccess: (response: ApiResponse<T>) => void
    onError: (error: ApiError) => void
}

interface RequestDeveloperProfileDelete<T> {
    body: {
        id: string,
        identifier: DeveloperProfileEditFieldsIdentifier
    },
    onSuccess: (response: ApiResponse<T>) => void
    onError: (error: ApiError) => void
}