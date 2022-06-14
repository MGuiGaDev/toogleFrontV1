import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewBasicUser } from 'src/app/core/models/new-basic-user';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ 
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isRegister = false;
  isRegisterFail = false;
  newBasicUser?: NewBasicUser;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  lastAccess?: Date;
  schoolProfileName?: string;
  schoolProfileCode?: number;
  schoolProfile?: SchoolProfile;
  errMsj?: string;
  //isLogged = false;
  formRegister!: FormGroup;
  constructor(
    private tokenService: TokenService, 
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private readonly fB: FormBuilder
  ) { }

  ngOnInit(){
    this.formRegister = this.initForm();
  }

  initForm(): FormGroup {
    return this.fB.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(62)]],
      schoolProfileName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      schoolProfileCode: ['', [Validators.required, Validators.min(11111111), Validators.max(99999999)]],
    }
    );
  }

  onRegister(): void {
    this.schoolProfile = new SchoolProfile(this.formRegister.get("schoolProfileName")?.value, this.formRegister.get("schoolProfileCode")?.value);
    this.newBasicUser = new NewBasicUser(
      this.formRegister.get("name")?.value, 
      this.formRegister.get("username")?.value,
      this.formRegister.get("email")?.value, 
      this.formRegister.get("password")?.value, 
      this.schoolProfile, 
      this.lastAccess!, 
      this.formRegister.get("schoolProfileCode")?.value
      );
    
    this.authService.createBasicUser(this.newBasicUser).subscribe(
      data=>{
        this.isRegister=true;
        this.isRegisterFail=false;
        this.toastr.success(`Cuenta creada. ¡Bienvenido: ${this.formRegister.get("username")?.value}!`, 'OK',{
          timeOut: 3000
        });
        this.router.navigate(['/toggle/login']);
      }, 
      err=> {
        this.isRegisterFail=true;
        this.isRegister=false;
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000
        });
      }
    );
  }
}
