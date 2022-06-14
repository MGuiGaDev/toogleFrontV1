export class SchoolProject {
    private id?: number;
    private idSchoolProfile?: number;
    private teacherCreatorId?: number;
    private teachersColabotators?: any; 
    private listStudiesCycle?:any;
    private title?: string;
    private description?: any;

    constructor(title?: string, description?: string, idSchoolProfile?:number, teacherCreatorId?: number, listStudiesCycle?:any) {
            this.description = description;
            this.title = title;
            this.idSchoolProfile = idSchoolProfile;
            this.teacherCreatorId = teacherCreatorId;
            this.listStudiesCycle = listStudiesCycle;
    }

}
