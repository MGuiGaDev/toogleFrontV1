import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewBasicUser } from 'src/app/core/models/new-basic-user';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { StudiesCycle } from 'src/app/core/models/studies-cycle';
import { SchoolProfileService } from 'src/app/service/school-profile.service';
import Swal from 'sweetalert2';
import { ManagerService } from 'src/app/service/manager.service';
import { Manager } from 'src/app/core/models/manager';
import { TokenService } from 'src/app/service/token.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoginBasicUser } from 'src/app/core/models/login-basic-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-private-detail-profile',
  templateUrl: './private-detail-profile.component.html',
  styleUrls: ['./private-detail-profile.component.css'],
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
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
}) 
export class PrivateDetailProfileComponent implements OnInit {
  schoolProfile = new SchoolProfile();
  userManager?: NewBasicUser;
  username?: string;
  list?: any[] = [];
  listT?: any[] = [];
  idSchoolProfile?: number;
  schoolProfileName?: string;
  cycle?: StudiesCycle;

  showUpdateDataSchool = false;
  showUpdateDataManager = false;
  showUpdatePassword = false;
  showCreateTeacher = false;
  showAddCiclo = false;

  checked = false;
  disabled = false;

  listProjects?: any = [];

  loginUser?: LoginBasicUser;
  password?: string;

  passwordForm!: FormGroup;
  dataForm!: FormGroup;
  dataManager!: FormGroup;
  isOpen = true;


  showDataSchool = true;
  showTeacher = false;
  showStudies = false;
  showDataAdmin = false;

  dtOptions: DataTables.Settings = {};

  constructor(
    private schoolProfileService: SchoolProfileService,
    private managerService: ManagerService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roueter: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    private authService: AuthService,
    private readonly fb: FormBuilder
  ) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngShowDataSchool():void {
    this.showDataSchool = true;
    this.showTeacher = false;
    this.showStudies = false;
    this.showDataAdmin = false;
  }
  ngShowTeacher():void {
    this.showDataSchool = false;
    this.showTeacher = true;
    this.showStudies = false;
    this.showDataAdmin = false;
  }
  ngShowStudies():void{
    this.showDataSchool = false;
    this.showTeacher = false;
    this.showStudies = true;
    this.showDataAdmin = false;
  }
  ngShowDataAdmin():void{
    this.showDataSchool = false;
    this.showTeacher = false;
    this.showStudies = false;
    this.showDataAdmin = true;
  }
  onUpdateSchool(): void {
    const id = this.schoolProfile.id!;
    this.schoolProfile.name = this.dataForm.get("name")?.value;
    this.schoolProfile.city = this.dataForm.get("city")?.value;
    this.schoolProfile.description =this.dataForm.get("description")?.value;
    this.schoolProfileService.update(id, this.schoolProfile).subscribe(
      data => { 
        this.showUpdateDataSchool = false;
        this.toastr.success('Perfil actualizado', 'OK', {
          timeOut: 3000
        })
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
        });
      }
    )
  }

  ngOnInit(): void {
    this.chargeData();
    this.passwordForm = this.initForm();
    this.dataForm = this.initFormData();
    this.dataManager = this.initFormManager();
    this.chargeDtOptions();
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

  chargeData(): void {
    this.username = this.activatedRoute.snapshot.params.username;
    this.schoolProfileService.detailByUsername(this.username!).subscribe(
      (data) => {
        this.listT = [];
        this.list = [];
        this.schoolProfile = data;
        this.schoolProfile.listStudiesCycle?.forEach((e) => {
          this.list?.push({
            name: e.name,
            code: e.code,
            nameFamily: e.d_studiesFamily.name,
            level: e.c_studiesLevel.name, 
          });
        });
        this.username = this.schoolProfile.userManager?.username;
        this.password = this.schoolProfile.userManager?.password;
        this.schoolProfile.listTeachers?.forEach((e) => {
          let teacher = {
            name: e.userNested.name,
            username: e.userNested.username,
            email: e.userNested.email,
            ciclos: e.listStudiesCycle.length > 0 ? e.listStudiesCycle.map((a:any) => a.name) : 'SIN CICLOS',
          };
          e.schoolProyect.forEach((p:any) =>{
            let project = {
              name: teacher.name,
              id: p.id,
              title: p.title,
              description: p.description,
              listStudiesCycle: p.listStudiesCycle
            }
            this.listProjects?.push(project);
          });
          this.listT?.push(teacher);
        });
        this.userManager = this.schoolProfile.userManager;
        this.cdr.detectChanges();

      },
      (err) => {
        this.toastr.error("a", 'Fail', {
          timeOut: 3000,
        });
      }
    );
  }

  ngDeleteTeacher(username: string) {
    Swal.fire({
      title: '¿Está seguro de que desea eliminar a este profesor?',
      text: '¡No podrá recuperar este perfil!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'No, ha sido un error.',
    }).then((result) => {
      if (result.value) {
        this.schoolProfileService.deleteTeacher(username).subscribe(
          (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Este perfil ha sido eliminado',
              'success'
            );
            this.chargeData();
          },
          (err) => {
            this.toastr.error("a", 'Fail', {
              timeOut: 3000,
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Operación cancelada.',
          'Este profesor continúa perteneciendo a tu centro :)',
          'error'
        );
      }
    });
  }
  ngDeleteCycle(id: number, code: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡Si continúa, borrará este ciclo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: 'No, ha sido un error.',
    }).then((result) => {
      if (result.value) {
        this.cycle = new StudiesCycle();
        this.cycle.code = code;
        this.schoolProfileService.deleteCycle(id, this.cycle).subscribe(
          (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Este ciclo ha sido eliminado',
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
  onRegisterCycles() {
    this.schoolProfileService
      .update(this.idSchoolProfile!, this.schoolProfile)
      .subscribe();
  }

  onUpdateManager() {
    const id = this.userManager?.id;
    this.schoolProfile.userManager!.name = this.dataManager.get("name")?.value;
    this.schoolProfile.userManager!.email = this.dataManager.get("email")?.value;
    let manager = 
    {
      "name" : this.dataManager.get("name")?.value,
      "email": this.dataManager.get("email")?.value,
      "password":  this.userManager?.password!,
      "username": this.userManager?.username!
    }
    this.schoolProfileService.updateManager(id!, manager).subscribe(
      data => { 
        this.toastr.success('Perfil Manager Actualizado', 'OK', {
          timeOut: 3000
        })
        this.showUpdateDataManager = false;
        

        if(!document.getElementById("password")) return;
        let password =(document.getElementById("password") as HTMLInputElement).value;
      },
      err => {
        this.toastr.error("mallllll", 'Fail', {
          timeOut: 3000,
        });
      }
    )
  }

  
  onUpdateManagerPassword() {
    
    const id = this.userManager?.id;
    const pa = (document.getElementById("password") as HTMLInputElement).value;
    let manager = new Manager(this.userManager?.name!, this.userManager?.username!, this.userManager?.email!, pa);
    
    this.schoolProfileService.updateManager(id!, manager).subscribe(
      data => { 
        Swal.fire('Operación realizada.', 'Su contraseña ha sido actualizada', 'success');
        this.showUpdateDataManager = false;
      },
      err => {
        Swal.fire('Operación cancelada.', 'Las contraseñas no coinciden', 'error');
        this.toastr.error("mallllll", 'Fail', {
          timeOut: 3000,
        }); 
      }
    )
  }

  initForm(): FormGroup {
    return this.fb.group({
      newPass: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validators:this.validUpdatePassword('newPass', 'password')
    }
    );
  }
  
  initFormData(): FormGroup {
    return this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(280)]]
    });
  }

  initFormManager(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(62)]]
    });
  }
  
  validUpdatePassword(newPass: string, password: string) {
    return (formGroup: FormGroup) => {

      const nP = formGroup.controls[newPass];
      const c = formGroup.controls[password];

      if(c.errors&&!c.errors['validUpdatePassword']) return;

      if(nP.value!==c.value) return c.setErrors({validUpdatePassword:true});

    }

  }
}
