import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output, 
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewBasicUser } from 'src/app/core/models/new-basic-user';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {
  isRegister = false;
  isRegisterFail = false;
  newBasicUser?: NewBasicUser;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  lastAccess?: Date;
  schoolProfile?: SchoolProfile;
  formRegister!: FormGroup;

  @Input()
  idSchoolProfile!: number;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private readonly fB: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formRegister = this.onInitForm();
  }

  onRegister(): void {
    this.newBasicUser = new NewBasicUser(
      this.formRegister.get("name")?.value,
      this.formRegister.get("username")?.value,
      this.formRegister.get("email")?.value,
      this.formRegister.get("password")?.value,
      this.schoolProfile!,
      this.lastAccess!,
      this.idSchoolProfile
    );

    this.authService.createBasicUserTeacher(this.newBasicUser).subscribe(
      (data) => {
        Swal.fire(
          'Operación realizada.',
          `Profesor creado!`,
          'success'
        );
        window.location.reload();
      },
      (err) => {
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000,
        });
      }
    );
  }
  onInitForm(): FormGroup {
    return this.fB.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(62)],
      ],
    });
  }
}
