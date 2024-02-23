interface CompanyProfileAddress {

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

interface CompanyProfileOwnerInfo {

    id: string;
    name: string;
    email: string;
    phone: string;

    createdAt: string;
    updatedAt: string;
}

interface CompanyProfileDetails {

    cnpj: string;
    about: string;
    teamSize: string;
    foundedIn: string;
    marketArea: string;
    description: string;
    legalNature: string;
    socialReason: string;
    fantasy_name: string;

    createdAt: string;
    updatedAt: string;
}

interface CompanyProfileSupport {

    phone: string;
    rhEmail: string;
    whatsapp: string;
    supportEmail: string;

    createdAt: string;
    updatedAt: string;
}

interface CompanyProfileSocial {

    github: string;
    banner: string;
    website: string;
    twitter: string;
    picture: string;
    facebook: string;
    linkedin: string;
    instagram: string;

    createdAt: string;
    updatedAt: string;
}

interface CompanyProfile {

    id: string;

    address: CompanyProfileAddress;
    details: CompanyProfileDetails;
    suportInfo: CompanyProfileSupport;
    // ownerInfo: CompanyProfileOwnerInfo;
    socialNetwork: CompanyProfileSocial;

    jobOffers: JobOfferData[];

    createdAt: string;
    updatedAt: string;
}

type CompanyProfileEditFieldsIdentifier =
    'COMPANY_ADDRESS' |
    'COMPANY_DETAILS' |
    'COMPANY_CONTACT' |
    'COMPANY_SOCIAL' |
    'COMPANY_OWNER' |
    'COMPANY_PERMISSIONS'  // TODO