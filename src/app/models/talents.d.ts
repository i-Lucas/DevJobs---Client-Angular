interface Talent {

    id: string;
    name: string;
    about: string;
    picture: string;
    location: string;
    occupation: string;
    stacklist: string[]
    languages: string[]
}

interface TalentResponse {

    count: number;
    talents: Talent[];
}