import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export default class MockService {

    private getNow() {
        return new Date().getTime().toString()
    }

    private getRandomElement(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getStack(): string[] {

        return [
            'JavaScript', 'Node.js', 'React', 'Angular', 'Vue.js', 'Python',
            'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP',
            'WebSocket', 'Git', 'Jira', 'Webpack', 'Babel', 'Jenkins', 'Travis CI',
            'GraphQL', 'Flask', 'TensorFlow', 'Jest', 'CircleCI', 'Azure', 'Laravel',
            'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Docker', 'Kubernetes', 'AWS',
            'Keras', 'Scikit-learn', 'Express.js', 'RESTful API', 'PyTorch', 'Django',
            'Mocha', 'Chai', 'Selenium', 'Redux', 'MobX', 'RxJS', 'Cypress', 'Jupyter',
            'Google Cloud Platform', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'Tailwind CSS',
        ];
    }

    private getNames(): string[] {

        return [
            'PulsePanorama', 'SolarisSpectrum', 'QuantumQuest', 'GalacticGrove',
            'SolarFlare', 'LunarLoom', 'StellarStratos', 'NyxNebula', 'AstralArcade',
            'ChronoSpark', 'NovaVortex', 'TerraByteTrek', 'LuminaLattice', 'ZephyrZen',
            'ZenithZephyr', 'EquinoxEcho', 'AeroSpectra', 'CipherCraft', 'AuroraAegis',
            'EclipseEnigma', 'RadiantRift', 'GalaxyGlade', 'QuasarQuake', 'VortexVoyage',
            'LuminousLabyrinth', 'ZenonZephyr', 'EquinoxEnsemble', 'AeroAether', 'CobaltCascade',
            'QuantumQuasar', 'EchoHarmony', 'NebulaNexus', 'PixelPulse', 'CelestialCipher', 'CipherSync',
            'AetherAmulet', 'HarmonyHaven', 'NebulousNest', 'PixelPalace', 'CelestialCrest', 'CipherSynchrony',
            'AuroraAtlas', 'QuantumQuell', 'EchoEssence', 'NebulaNurturing', 'SpectralSynthesis', 'PolarisPulse'
        ];
    }

    private getLorem(): string {

        const a = 'Lorem ipsum dolor sit amet consectetur adipisicing elit ';
        const b = 'Ipsa, quasi. Officia doloremque quasi nemo rem perferendis recusandae voluptas aliquam, ';
        const c = 'ratione, harum excepturi in laudantium praesentium dolorem ipsa nostrum accusantium quaerat!';
        return a.concat(b).concat(c);
    }

    public getEducation(count: number): DeveloperProfileAcademicEducation[] {

        const now = this.getNow();
        const names = this.getNames();
        const random = (array: string[]) => this.getRandomElement(array);

        const modality: AcademicModality[] = ['Educação à distância', 'Presencial', 'Semi-Presencial'];
        const status: AcademicStatus[] = ['Cursando', 'Concluído', 'Trancado', 'Abandonado', 'Interrompido'];

        const type: AcademicType[] = [
            'Graduação', 'Bacharelado', 'Licenciatura',
            'Mestrado', 'Tecnólogo', 'Estágio', 'Doutorado',
            'Técnico', 'Pós-graduação', 'Curso Livre'
        ];

        function educationFactory(id: number): DeveloperProfileAcademicEducation {

            const random_type = random(type) as AcademicType;
            const random_status = random(status) as AcademicStatus;
            const random_modality = random(modality) as AcademicModality;

            return {
                to: now,
                from: now,
                createdAt: now,
                updatedAt: now,
                id: id.toString(),
                type: random_type,
                course: random(names),
                status: random_status,
                modality: random_modality,
                institution: random(names),
            };
        }

        const education: DeveloperProfileAcademicEducation[] = [];

        for (let i = 0; i < count; i++) {
            education.push(educationFactory(i));
        }

        return education
    }

    public getJobs(count: number): DeveloperProfileJobExperiences[] {

        const now = this.getNow();
        const names = this.getNames();
        const lorem = this.getLorem();
        const random = (array: string[]) => this.getRandomElement(array);

        function jobFactory(id: number): DeveloperProfileJobExperiences {

            return {
                to: now,
                from: now,
                current_job: true,
                resume: lorem,
                updatedAt: now,
                createdAt: now,
                id: id.toString(),
                company: random(names),
                occupation: random(names),
            };
        }

        const jobs: DeveloperProfileJobExperiences[] = [];

        for (let i = 0; i < count; i++) {
            jobs.push(jobFactory(i));
        }

        return jobs;
    }

    public getCertificates(count: number): DeveloperProfileCertificates[] {

        const now = this.getNow();
        const names = this.getNames();
        const workload = ['Horas', 'Meses', 'Anos'];

        const random = (array: string[]) => this.getRandomElement(array);

        function certificatesFactory(id: number): DeveloperProfileCertificates {

            return {
                id: id.toString(),
                course: random(names),
                updatedAt: now,
                createdAt: now,
                institution: random(names),
                workload: id.toString().concat(' ').concat(random(workload)),
                link: 'www.google.com.br/'
            }

        }

        const certificates: DeveloperProfileCertificates[] = [];

        for (let i = 0; i < count; i++) {
            certificates.push(certificatesFactory(i));
        }

        return certificates;
    }

    public getLanguages(count: number): DeveloperProfileLanguages[] {

        const now = this.getNow();
        const random = (array: string[]) => this.getRandomElement(array);

        const languageLevels: string[] = ['Básico', 'Avançado', 'Intermediário', 'Avançado'];
        const languageNames = ['Português', 'Inglês', 'Russo', 'Espanhol', 'Francês', 'Alemão'];

        function languageFactory(id: number): DeveloperProfileLanguages {

            return {

                id: id.toString(),
                createdAt: now,
                updatedAt: now,
                language: random(languageNames),
                level: random(languageLevels),
            };
        }

        const languages: DeveloperProfileLanguages[] = [];

        for (let i = 0; i < count; i++) {
            languages.push(languageFactory(i));
        }

        return languages;
    }

    public getProjects(count: number): DeveloperProfileProjects[] {

        const now = this.getNow();
        const names = this.getNames();
        const lorem = this.getLorem();
        const random = (array: string[]) => this.getRandomElement(array);

        function projectsFactory(id: number): DeveloperProfileProjects {

            return {

                resume: lorem,
                createdAt: now,
                updatedAt: now,
                id: id.toString(),
                title: random(names),
                link: 'www.google.com.br/',
            };
        }

        const projects: DeveloperProfileProjects[] = [];

        for (let i = 0; i < count; i++) {
            projects.push(projectsFactory(i));
        }

        return projects;
    }

    public getStackList(count: number): DeveloperProfileStackList[] {

        const now = this.getNow();
        const stack = this.getStack();
        const workload = ['Horas', 'Meses', 'Anos'];
        const random = (array: string[]) => this.getRandomElement(array);

        function stackFactory(id: number): DeveloperProfileStackList {

            const random_workload = random(workload);

            return {

                id: id.toString(),
                createdAt: now,
                updatedAt: now,
                name: random(stack),
                workload: id.toString().concat(' ').concat(random_workload)
            };
        }

        const stacklist: DeveloperProfileStackList[] = []

        for (let i = 0; i < count; i++) {
            stacklist.push(stackFactory(i));
        }

        return stacklist
    }

}