export class TeacherProfile {

    private id!: number;
    private schoolProfileId!: number;
    private listStudiesCycle!: any[];
    private password!: string;
    private name!: string;
    private email!: string;
    private listProjectsCreator!: any;
    private listProjectsCollaborator!: any;
    constructor(id: number, schoolProfileId: number, listStudiesCycle?: any[], password?: string, name?:string, email?:string) {
        this.id = id;
        this.schoolProfileId = schoolProfileId;
        this.listStudiesCycle = listStudiesCycle!;
        this.password = password!;
        this.name = name!;
        this.email = email!;
    }
}
