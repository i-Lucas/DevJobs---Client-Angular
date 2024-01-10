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