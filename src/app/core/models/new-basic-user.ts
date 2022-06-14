import { SchoolProfile } from "./school-profile";

export class NewBasicUser {
    name: string;
    username: string;
    email: string;
    password: string;
    schoolProfile!: SchoolProfile;
    lastAccess!: Date;
    idSchoolProfile!:number;
    id!: number;
    constructor(name: string, username: string, email: string, password: string, schoolProfile: SchoolProfile, lastAccess: Date, idSchoolProfile: number) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.schoolProfile = schoolProfile;
        this.lastAccess = lastAccess;
        this.idSchoolProfile = idSchoolProfile;
    }

}
