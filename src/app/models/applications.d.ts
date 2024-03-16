interface UserApplications {

    title: string;
    company: string;
    category: string;
    seniority: string;

    processId: string;

    status: CandidateStatus;
    currentStep: HiringProcessSteps;

    createdAt: string;
    updatedAt: string;
}