import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SchoolProjectCard } from 'src/app/core/models/school-project-card';
import { TeacherProfileService } from 'src/app/service/teacher-profile.service';
export interface DialogData {
  message: string;
}

//https://edupala.com/how-to-implement-an-angular-search-filter-in-angular/
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormSendCollaboratorRequestComponent } from 'src/app/core/shared/components/modals/form-send-collaborator-request/form-send-collaborator-request.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
})
export class ListProjectsComponent implements OnInit {
  idTeacher?: any;
  userName?: any;
  schoolProjectCard?: SchoolProjectCard;
  listSchoolProjectCard?: any;
  description?: any;

  message?: any;

  searchTerm = '';
  term = '';

  constructor(
    private teacherDetailService: TeacherProfileService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roueter: Router,
    public dialog: MatDialog,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.chargeData();
  }

  openDialog(idProject: number): void {
    const dialogRef = this.dialog.open(FormSendCollaboratorRequestComponent, {
      data: {
        message: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const project = {
        id: idProject,
        message: result.message,
      };

      this.teacherDetailService
        .addCollaborationRequest(this.userName, project)
        .subscribe(
          (data) => {
            console.log('aaaaaaaaaa');
            this.chargeData();
          },
          (error) => {}
        );
    });
  }

  chargeData() {
    this.userName = this.activatedRoute.snapshot.params.username;
    this.teacherDetailService
      .getProjectSeeker(this.userName)
      .subscribe((data) => {
        this.listSchoolProjectCard = new Array();
        data.forEach((element: any) => {
          this.schoolProjectCard = new SchoolProjectCard();
          this.schoolProjectCard.id = element.id;
          this.schoolProjectCard.description = element.description;
          this.schoolProjectCard.title = element.title;
          this.schoolProjectCard.collaboratorProjectDTOs =
            element.collaboratorProjectDTOs;
          this.schoolProjectCard.creatorProjectDTO = element.creatorProjectDTO;
          this.schoolProjectCard.currentCreate = element.currentCreate;
          this.schoolProjectCard.nameCycles = element.nameCycles;
          this.listSchoolProjectCard.push(this.schoolProjectCard);
        });
      });
  }
}
