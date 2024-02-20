interface JobOfferData {

    company: {

        name: string;
        profile: string;
        picture: string;

    },

    offer: {

        id: string;
        title: string;
        workload: string; // full-time / meio-período
        location: string; // localização da vaga ( remota ou localização da empresa )

        seniority: string;
        category: string;
        contractType: string;
        salaryRange: string;
        description: string;
        benefits: string[];
        stacklist: string[];
        differences: string[];
        requirements: string[];

        createdAt: string;
        updatedAt: string;
    }

}