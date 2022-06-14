import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudiesCycle } from 'src/app/core/models/studies-cycle';
import { AuthService } from 'src/app/service/auth.service';
import { ManagerService } from 'src/app/service/manager.service';
import { SchoolProfileService } from 'src/app/service/school-profile.service';
import { StudiesDegreeService } from 'src/app/service/studies-degree.service';
import { TeacherProfileService } from 'src/app/service/teacher-profile.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
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
export class CreateProjectComponent implements OnInit {
  showAddCycleProject = false;
  showEditInfo = false;
  showCollaboratorRequests = false;

  username?: string;
  id?: number;
  title?: string;
  description?: any;
  @Input()
  teacherCreatorId?: number;
  teachersColabotators?: any;
  listStudiesCycle?: any = [];
  listStudiesCycleProyect?: any = [];
  collaborationRequestsDTO?: any = [];
  listCollaborators?: any = [];
  dtOptions: DataTables.Settings = {};

  @Output() newItemEvent = new EventEmitter<string>();

  projectForm!: FormGroup;

  teacherId?: number;
  cycle?: StudiesCycle;
  listCycles?: any[] = [];
  listSelectedCycles?: any;
  idProject?: number;
  currentCreate?: any;
  idCollaborationRequest?:any;

  constructor(
    private teacherDetailService: TeacherProfileService,
    private schoolProfileService: SchoolProfileService,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private studiesDegreeService: StudiesDegreeService,
    private toastr: ToastrService,
    private roueter: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly proyectInfo: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chargeDtOptions();
    this.chargeData();
    this.projectForm = this.initFormProjectInfo();
  }

  chargeDtOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      language: {
        decimal: '',
        emptyTable: 'No hay información',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
        infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
        infoFiltered: '(Filtrado de _MAX_ total entradas)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Mostrar _MENU_ Entradas',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        search: 'Buscar:',
        zeroRecords: 'Sin resultados encontrados',
        paginate: {
          first: 'Primero',
          last: 'Ultimo',
          next: 'Siguiente',
          previous: 'Anterior', 
        },
      },
    };
  }

  addItem(code: any) {
    if (!code) return;
    if (
      this.listStudiesCycleProyect?.find((a: { code: any }) => a.code === code)
    ) {
      Swal.fire('Operación cancelada.', 'Ya cuenta con este ciclo :)', 'error');
    } else {
      this.studiesDegreeService.getOne(code).subscribe((data) => {
       let  cycle = {
          name: data.name,
          code: data.code,
          family: data.family,
          level: data.level,
          new: true,
        };
        Swal.fire('Operación realizada con éxito.', `Ha añadido el ciclo: <strong>${cycle.name}</strong>`, 'success');
        this.listStudiesCycleProyect!.push(cycle);
        let studiesDTO = {
          code: code,
        };
        this.teacherDetailService
          .addCycleToProyect(this.idProject!, studiesDTO)
          .subscribe((data) => {
          });
          
      });
      
    }
  }

  removeCycle(code: string) {
    this.listStudiesCycleProyect = this.listStudiesCycleProyect.filter((c: any) => {
      if (c.code != code) {
        return c;
      }
    });
    document.getElementById(code)?.remove();
    let studiesDTO = {
      code: code,
    };
    this.teacherDetailService
      .deleteCycleOfProyect(this.idProject!, studiesDTO)
      .subscribe((data) => {
        Swal.fire('Operación realizada con éxito.', `Ha eliminado el ciclo.`, 'success');
      });
  }


  initFormProjectInfo(): FormGroup {
    return this.proyectInfo.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]]
    });
  } 

  
  editProjectInfo() {
    let project = {
      title: this.projectForm.get("title")?.value,
      description: this.projectForm.get("description")?.value
    }
    console.log(project)
    this.teacherDetailService.updateInfoProject(this.idProject!, project).subscribe(
      data=> {
        this.chargeData();
      }
    );
    
  }

  aceptCollaborationRequest(collaborationRequest: any) {
    
    let project = {
      "id" : this.idProject
    }
    this.teacherDetailService.aceptCollaborationRequest(collaborationRequest.id, project).subscribe(
      data=>{
       this.addCollaborator(collaborationRequest);
      }, error=>{
        
      }
    )
    
    
  }

  addCollaborator(collaborationRequest: any) {
    let project = {
      "id" : this.idProject
    }
    this.teacherDetailService.addCollaborator(collaborationRequest.idTeacher, project).subscribe(
      data=>{
        this.chargeData();
      }, error => {
       

      }
    );
  }

  refuseCollaborationRequest(idCollaborationRequest: any) {
    let project = {
      "id" : this.idProject
    }
    this.teacherDetailService.refuseCollaborationRequest(idCollaborationRequest, project).subscribe(
      data=>{
       this.collaborationRequestsDTO = this.collaborationRequestsDTO.map((a:any)=> {
          if(a.id!==idCollaborationRequest) {
            return a;
          }
        });
      }, error=>{
        
      }
    )
  }

  chargeData() {
    this.idProject = this.route.snapshot.params.id;
    this.teacherDetailService.getProjectById(this.idProject!).subscribe(
      (data) => {
        this.title = data.title;
        this.description = data.description;
        this.currentCreate = data.currentCreate;
        this.listStudiesCycleProyect = data.listStudiesCycle;
        this.collaborationRequestsDTO = data.collaborationRequestsDTO;
        this.listCollaborators = data.schoolTeachers;
      },
      (err) => {
        /*
        this.toastr.error(err.error.mensaje, 'Fail', { 
          timeOut: 3000,
        });
        */
      }
    );
    this.username = this.route.snapshot.params.username;
    this.teacherDetailService.detailByUserName(this.username!).subscribe(
      (data) => {
        this.teacherId = data.id;
        this.listStudiesCycle = data.listStudiesCycle;
        this.listStudiesCycle?.forEach((e: any) => {
          this.listCycles?.push({
            name: e.name,
            code: e.code,
            nameFamily: e.d_studiesFamily.name,
            level: e.c_studiesLevel.name,
          });
        });
        this.listSelectedCycles = this.listCycles?.map((e) => {
          return e;
        });
      },
      (err) => {
        /*
        this.toastr.error(err.error.mensaje, 'Fail', { 
          timeOut: 3000,
        });
        */
      }
    );
  }
}
