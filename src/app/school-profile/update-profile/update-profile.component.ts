import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { StudiesCycle } from 'src/app/core/models/studies-cycle';
import { SchoolProfileService } from 'src/app/service/school-profile.service';
import { StudiesDegreeService } from 'src/app/service/studies-degree.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  schoolProfile = new SchoolProfile;
  studiesCycleList : StudiesCycle [] = [];
  familyList: string [] = [];
  list?: any [] = [];

  

  constructor(
    private schoolProfileService: SchoolProfileService,
    private studiesDegreeService: StudiesDegreeService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roueter: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.schoolProfileService.detail(id).subscribe(
      data => { 
        this.schoolProfile = data;
        this.schoolProfile.listStudiesCycle?.forEach(e => {
          this.list?.push(e.name);
        })
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,
        });
      }
    );
  }
 
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.schoolProfileService.update(id, this.schoolProfile).subscribe(
      data => { 
        this.toastr.success('Producto Actualizado', 'OK', {
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
  volver(): void{
    //en verdad esta funcionalidad la tengo con INICIO
    //pensar sobre esto
    this.roueter.navigate(['/toggle/lista']);
  }

}
