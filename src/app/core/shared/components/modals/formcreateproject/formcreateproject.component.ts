import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'src/app/teacher-profile/teacher-private-detail-profile/teacher-private-detail-profile.component';

@Component({
  selector: 'app-formcreateproject',
  templateUrl: './formcreateproject.component.html',
  styleUrls: ['./formcreateproject.component.css'] 
})
export class FormcreateprojectComponent implements OnInit {


  title?: string;
  description?: any;
  projectForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<FormcreateprojectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void { 
    this.projectForm = this.initFormProject();
  }
  initFormProject(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
