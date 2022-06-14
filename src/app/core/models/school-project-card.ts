export class SchoolProjectCard {

        id?: number;
        title?: string;
        description?: string;
        creatorProjectDTO?: {
            nameCreator:string,
            nameSchoolCreator:string,
            city:string
        }
        collaboratorProjectDTOs?: any;
        collaborationRequestDTOs?:any;
        nameCycles?: any;
        currentCreate?: Date;

        constructor(){
            
        }

}
