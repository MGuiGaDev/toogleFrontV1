import { Parser } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { StudiesCycle } from 'src/app/core/models/studies-cycle';
import { TeacherProfile } from 'src/app/core/models/teacher-profile';
import { SchoolProfileService } from 'src/app/service/school-profile.service';
import { StudiesDegreeService } from 'src/app/service/studies-degree.service';
import { TeacherProfileService } from 'src/app/service/teacher-profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-studies-degree',
  templateUrl: './select-studies-degree.component.html',
  styleUrls: ['./select-studies-degree.component.css'],
})
export class SelectStudiesDegreeComponent implements OnInit {
  @Input() list?: any[] = []; //tomamos los del centro
  //schoolProfile = new SchoolProfile;
  studiesCycleList: any[] = [];
  familyList: any[] = [];
  myFamilyList: Array<any> = [];
  selectedFamily: string = '--Elija Familia--';
  selectedCycle: string = '--Elija Ciclo--';

  @Input()
  idSchoolProfile!: number;
  @Input()
  schoolProfileName!: string;

  @Input()
  teacherId!: number;
  @Input()
  teacherCreatorId!: number;
  @Input()
  schoolProfileId!: number;
  @Input()
  listStudiesCycle!: any[];
  @Input()
  password!: string;
  @Input()
  listSelectedCycles?: any[];

  schoolProfile!: SchoolProfile;
  teahcerProfile!: TeacherProfile;

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEvent2 = new EventEmitter<string>();

  constructor(
    private schoolProfileService: SchoolProfileService,
    private teacherServide: TeacherProfileService,
    private studiesDegreeService: StudiesDegreeService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roueter: Router
  ) {}

  ngOnInit(): void {
    this.studiesDegreeService.list().subscribe((data) => {
      this.studiesCycleList = data;
      this.studiesCycleList.forEach((e) => {
        if (!this.familyList.find((b) => b.code! == e.idFamily!)) {
          if (!this.list?.find((a) => a.code == e.idFamily)) {
            this.familyList.push({
              id: e.code!,
              name: e.family!,
              code: e.idFamily!,
            });
          }
        }
      });
    });

    if (this.teacherCreatorId) {
      this.listSelectedCycles = this.listSelectedCycles?.filter((a) => {
        return a !== undefined;
      });
    }
  }

  changeFamily(familyCode: any) {
    this.myFamilyList = [];
    this.studiesCycleList.forEach((e) => {
      if (e.idFamily == familyCode.target.value) this.myFamilyList.push(e);
    });
  }

  onRegisterCycles(): any {
    if (
      this.selectedCycle === '--Elija Familia--' ||
      this.selectedCycle === '--Elija Ciclo--'
    )
      return Swal.fire(
        'Debe elegir un ciclo',
        'Elija una Familia y un Ciclo :)',
        'error'
      );
    if (this.idSchoolProfile) {
      return this.registerCycleSchool();
    } else if (this.teacherCreatorId) {
      return this.registerCycleProject();
    } else if (this.teacherId) {
      return this.registerCycleTeacher();
    }
  }

  registerCycleProject() {
    if (this.listSelectedCycles?.find((a) => a.code === this.selectedCycle)) {
      return Swal.fire(
        'Operación cancelada.',
        'Ya cuenta con este ciclo :)',
        'error'
      );
    } else {
      return this.addNewItem(this.selectedCycle);
    }
  }

  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }

  registerCycleSchool(): any {
    this.schoolProfile = new SchoolProfile();
    this.schoolProfile.id = this.idSchoolProfile;
    this.schoolProfile.name = this.schoolProfileName;

    if (this.list?.find((e) => e.code == this.selectedCycle))
      return Swal.fire(
        'Operación cancelada.',
        'Ya cuenta con este ciclo :)',
        'error'
      );

    this.schoolProfileService
      .updateCycle(this.selectedCycle, this.schoolProfile)
      .subscribe(
        (data) => {
          Swal.fire('Operación realizada.', `Ciclo añadido!`, 'success');
          window.location.reload();
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'FAIL', {
            timeOut: 3000,
          });
        }
      );
  }

  registerCycleTeacher(): any {
    if (this.listStudiesCycle?.find((e) => e.code == this.selectedCycle))
      return Swal.fire(
        'Operación cancelada.',
        'Ya cuenta con este ciclo :)',
        'error'
      );

    this.teahcerProfile = new TeacherProfile(
      this.teacherId,
      this.schoolProfileId,
      this.listStudiesCycle,
      this.password
    );
    this.teacherServide
      .updateCycle(this.selectedCycle, this.teahcerProfile)
      .subscribe(
        (data) => {
          Swal.fire({
            title: 'Operación realizada.',
            text: '¡No podrá recuperar este perfil!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: '¡Ok!',
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          });
        },
        (err) => {
          this.toastr.error(err.error.mensaje, 'FAIL', {
            timeOut: 3000,
          });
        }
      );
  }
}
