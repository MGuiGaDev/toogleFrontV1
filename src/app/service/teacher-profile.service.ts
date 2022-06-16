import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SchoolProfile } from '../core/models/school-profile';
import { SchoolProject } from '../core/models/school-project';
import { StudiesCycle } from '../core/models/studies-cycle';
import { TeacherProfile } from '../core/models/teacher-profile';

@Injectable({
  providedIn: 'root'
})
export class TeacherProfileService {


  context = 'https://toggleback.herokuapp.com/';

  /**
   *   teacherProfileURL = 'http://localhost:8080/teacher/';
  projectURL = 'http://localhost:8080/project/';
  createTeacherProfile = 'http://localhost:8080/auth/';
   */


  constructor(private httpClient: HttpClient) { }

  public detailByUserName(username: string): Observable<any> {
    return this.httpClient.get<any>(this.context + `teacher/detail/${username}`);
  }

  public update(id: number, profile: TeacherProfile): Observable<any> { 
    return this.httpClient.put<any>(this.context + `teacher/updateTeacher/${id}`, profile);
  }

  public updateTeacherPassword(id: number, password: any): Observable<any> { 
    return this.httpClient.put<any>(this.context + `teacher/updateTeacherPassword/${id}`, password);
  }

  public updateCycle(code: string, profile: TeacherProfile): Observable<any> {
    return this.httpClient.put<any>(this.context + `teacher/updateCycle/${code}`, profile );
  }
  public deleteCycle(id: number, code: StudiesCycle): Observable<any>{
    return this.httpClient.delete<any>(this.context + `teacher/deleteCycle/${id}`, {body:code} );
  }

  public createProject(id: number, project: SchoolProject): Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/addCreatorProject/${id}`, project );
  }

  public updateInfoProject(id: number, project: any):Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/updateInfoProject/${id}`, project);
  }

  public getProject(title:string): Observable<any>{
    return this.httpClient.get<any>(this.context + `project/getOne/${title}`);
  }
  public getProjectById(id:number):Observable<any>{
    return this.httpClient.get<any>(this.context + `project/getOneId/${id}`);
  }

  public getProjectSeeker(userName:string):Observable<any>{
    return this.httpClient.get<any>(this.context + `project/getAllBySeeker/${userName}`);
  }

  public getCollaborationRequestOfProject(id: number):Observable<any> {
    return this.httpClient.get<any>(this.context + `teacher/getAllCollaborationRequest/${id}`);
  }

  public getMyCollaboratorRequestPendint(id: number): Observable<any>{
    return this.httpClient.get<any>(this.context + `teacher/getMyCollaboratorRequestPendint/${id}`);
  }

  public getMyCollaborativeProject(id: number): Observable<any>{
    return this.httpClient.get<any>(this.context + `project/getMyCollaborativeProject/${id}`);
  }

  

  public deleteProject(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.context + `teacher/deleteProject/${id}`);
  }

  public addCycleToProyect(id: number, code: any): Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/addCycleToProyect/${id}`, code);
  }

  public deleteCycleOfProyect(id: number, code: any): Observable<any>{
    return this.httpClient.delete<any>(this.context + `teacher/deleteCycleOfProyect/${id}`, {body:code});
  }

  public addCollaborationRequest(username: string, project: any): Observable<any>{
    return this.httpClient.post<any>(this.context + `teacher/addCollaborationRequest/${username}`, project);
  }

  public aceptCollaborationRequest(id: number, idProject: any): Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/ceptCollaborationRequest/${id}`, idProject);
  }

  public addCollaborator (idTeacher: number, project: any): Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/addCollaborator/${idTeacher}`, project);
  }

  public refuseCollaborationRequest(id: number, idProject: any): Observable<any>{
    return this.httpClient.put<any>(this.context + `teacher/refuseCollaborationRequest/${id}`, idProject);
  }

  

}
 