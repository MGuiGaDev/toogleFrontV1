import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'src/app/school-project/list-projects/list-projects.component';

@Component({
  selector: 'app-form-send-collaborator-request',
  templateUrl: './form-send-collaborator-request.component.html',
  styleUrls: ['./form-send-collaborator-request.component.css'],
})
export class FormSendCollaboratorRequestComponent implements OnInit {
  message?: string;
  projectForm!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<FormSendCollaboratorRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void { 

    this.projectForm = this.initFormProject();
    console.log()
  }
  initFormProject(): FormGroup {
    return this.fb.group({
      message: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
