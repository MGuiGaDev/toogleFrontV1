import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewBasicUser } from 'src/app/core/models/new-basic-user';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { StudiesCycle } from 'src/app/core/models/studies-cycle';
import { TeacherProfileService } from 'src/app/service/teacher-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { TeacherProfile } from 'src/app/core/models/teacher-profile';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormcreateprojectComponent } from 'src/app/core/shared/components/modals/formcreateproject/formcreateproject.component';
import { SchoolProject } from 'src/app/core/models/school-project';
export interface DialogData {
  title: string;
  description: string;  
}
@Component({
  selector: 'app-teacher-private-detail-profile',
  templateUrl: './teacher-private-detail-profile.component.html',
  styleUrls: ['./teacher-private-detail-profile.component.css'],
  animations: [
    trigger('inOutAnimationTeacher', [
      transition(':enter', [
        style({ height: 0, opacity: 0.5 }),
        animate('.2s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('.2s ease-in', style({ height: 0, opacity: 0.5 })),
      ]),
    ]),
    trigger('inOutAnimationCycles', [
      transition(':enter', [
        style({ height: 0, opacity: 0.5 }),
        animate('.2s ease-out', style({ height: 90, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 90, opacity: 1 }),
        animate('.2s ease-in', style({ height: 0, opacity: 0.5 })),
      ]),
    ]),
  ],
})
export class TeacherPrivateDetailProfileComponent implements OnInit {
  schoolProfile = new SchoolProfile;
  userManager? : NewBasicUser;
  teacherId?: number;
  username?: string;
  teacherName?: string;
  teacherEmail?:string;
  schoolProfileName?: string;
  schoolProfileId?: number;
  schoolProjects?: any [] = [];
  listStudiesCycle?: any [] = [];
  cycle?: StudiesCycle;
  listCycles?: any[] = [];
  schoolProjectsCreator?: any [] = [];
  listCollaboratorProject?: any [] = [];
  listCollaborationRequest?: any [] = [];

  showUpdateDataTechaer = false;
  showUpdatePassword = false;
  showAddProject = false;
  showAddCycle = false;
  passwordForm!: FormGroup;
  dataForm!: FormGroup;
  password!: string;

  title!: string;
  description!: string;

  project =  new SchoolProject;

  showData = true;
  showProyects = false;
  showStudies = false;


  constructor( 
    private teacherDetailService: TeacherProfileService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roueter: Router,
    private readonly formPassword: FormBuilder,
    private readonly formData: FormBuilder,
    private readonly formPCycle: FormBuilder,
    private readonly formProject: FormBuilder,
    public dialog: MatDialog,
    private readonly fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.chargeData();
    this.passwordForm = this.initFormPassword();
    this.dataForm = this.initFormData();
  }

  initFormData(): FormGroup{
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(62)],
      ],
    });
  
  }

  ngShowData():void {
    this.showData = true;
    this.showProyects = false;
    this.showStudies = false;
  }
  ngShowProyects():void {
    this.showData = false;
    this.showProyects = true;
    this.showStudies = false;
  }
  ngShowStudies():void{
    this.showData = false;
    this.showProyects = false;
    this.showStudies = true;
  }

  updateDataTeacher() {
    
    this.teacherName = this.dataForm.get("name")?.value;
    this.teacherEmail = this.dataForm.get("email")?.value;
    let teacher = new TeacherProfile(
      this.teacherId!, 
      this.schoolProfileId!, 
      this.listStudiesCycle!, 
      this.password, 
      this.dataForm.get("name")?.value, 
      this.dataForm.get("email")?.value);

    
    this.teacherDetailService.update(this.teacherId!, teacher).subscribe(
      data => { 
        this.toastr.success('Perfil Actualizado', 'OK', {
          timeOut: 3000
        })
        this.showUpdatePassword = false;
      },
      err => {
        this.toastr.error("Error durante el proceso de actualización.", 'Fail', {
          timeOut: 3000,
        });
      }
    )
  }

  updatePasswordTeacher() {
    const pa = (document.getElementById("password") as HTMLInputElement).value;
    let teacher = new TeacherProfile(this.teacherId!, this.schoolProfileId!, this.listStudiesCycle!, pa, this.teacherName!, this.teacherEmail!);

    
    this.teacherDetailService.updateTeacherPassword(this.teacherId!, teacher).subscribe(
      data => { 
        this.toastr.success('Contraseña Actualizada', 'OK', {
          timeOut: 3000
        })
        this.showUpdatePassword = false;
      },
      err => {
        this.toastr.error("mallllll", 'Fail', {
          timeOut: 3000,
        });
      }
    )
  }

  deleteCycle(id: number, code: string) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar a este profesor?',
      text: '¡No podrá recuperar este perfil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'No, ha sido un error.',
    }).then((result) => {
      if (result.value) {
        this.cycle = new StudiesCycle();
        this.cycle.code = code;
        this.teacherDetailService.deleteCycle(id, this.cycle).subscribe(
          (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Este perfil ha sido eliminado',
              'success'
            );
            this.chargeData();
          },
          (err) => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Operación cancelada.',
          'Este ciclo no se ha eliminado :)',
          'error'
        );
      }
    });
  }
  deleteProject(id: number) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar a este profesor?',
      text: '¡No podrá recuperar este perfil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'No, ha sido un error.',
    }).then((result) => {
      if (result.value) {
        this.teacherDetailService.deleteProject(id).subscribe(
          (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Este proyecto ha sido eliminado',
              'success'
            );
            this.chargeData();
          },
          (err) => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Operación cancelada.',
          'Este ciclo no se ha eliminado :)',
          'error'
        );
      }
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(FormcreateprojectComponent, {
      data: {
        title: this.title,
        description: this.description
      }
    }); 
    dialogRef.afterClosed().subscribe(result => {

      let project = new SchoolProject(result.title, result.description, this.schoolProfileId, this.teacherId, this.listStudiesCycle);
      let idProject = 0;
      this.teacherDetailService.createProject(this.teacherId!, project).subscribe(
        data=>{
          this.teacherDetailService.getProject(result.title).subscribe(
           data=>{
            idProject = data.id;
            this.roueter.navigate([`/toggle/perfil-teacher/${this.username}/crear-proyecto/${idProject}`]);
           }
          )
        },
        error=>{ 
  
        }
      );

    });
  }
  initFormPassword(){
    return this.formPassword.group({
      newPass: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validators:this.validUpdatePassword('newPass', 'password')
    }
    );
  }
  validUpdatePassword(newPass: string, password: string) {
    return (formGroup: FormGroup) => {

      const nP = formGroup.controls[newPass];
      const c = formGroup.controls[password];

      if(c.errors&&!c.errors['validUpdatePassword']) return;

      if(nP.value!==c.value) return c.setErrors({validUpdatePassword:true});

    }

  }
  initFormCycle() {
    return this.formPassword.group({
      cName: ['', [Validators.required, Validators.minLength(4)]],
      cFamilyName: ['', [Validators.required, Validators.minLength(4)]],
      cLevel: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validators:this.validUpdatePassword('newPass', 'password')
    }
    );
  }
  initFormProject() {
    return this.formPassword.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validators:this.validUpdatePassword('newPass', 'password')
    }
    );
  }

  getMyCollaboratorRequest() {
    this.teacherDetailService.getMyCollaboratorRequestPendint(this.teacherId!).subscribe(
      data=> {
        this.listCollaborationRequest = data;
      }, error=>{

      }
    )
  }

  getMyCollaborativeProject() {
    console.log(this.teacherId!);
    let id = this.teacherId!;
    this.teacherDetailService.getMyCollaborativeProject(id).subscribe(
      data=> {
        this.listCollaboratorProject = data; 
        


      }, error=>{

      }
    );
  }

  chargeData(): void {
    this.username = this.activatedRoute.snapshot.params.username;
    this.listCycles = [];
    this.teacherDetailService.detailByUserName(this.username!).subscribe(
      data =>{
        this.teacherId = data.id;
        this.teacherName = data.name;
        this.teacherEmail = data.email;
        this.schoolProfileName = data.schoolProfileName;
        this.schoolProfileId = data.idSchoolProfile;
        this.listStudiesCycle = data.listStudiesCycle;
        this.password = data.password;
        this.listStudiesCycle?.forEach((e)=>{
          this.listCycles?.push({
            name: e.name,
            code: e.code,
            nameFamily: e.d_studiesFamily.name,
            level: e.c_studiesLevel.name,
          });
        });
        this.schoolProjectsCreator = data.schoolProjectsCreator;
        this.getMyCollaboratorRequest();
        this.getMyCollaborativeProject();
      },
      err => {
        /*
        this.toastr.error(err.error.mensaje, 'Fail', { 
          timeOut: 3000,
        });*/
      }
    );
    
  }


}
