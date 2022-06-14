import { NewBasicUser } from "./new-basic-user";
import { StudiesCycle } from "./studies-cycle";

export class SchoolProfile {

    id?:number;
    name?: string;
    code?: number;
    userManager?: NewBasicUser;
    listStudiesCycle?: any[];
    listTeachers?: any[];
    city?: string;
    description?: string;
    

    constructor(name?: string, code?: number) {
        this.name = name;
        this.code = code;
    }
    
}
