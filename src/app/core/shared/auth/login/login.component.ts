import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBasicUser } from 'src/app/core/models/login-basic-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { SchoolProfileService } from 'src/app/service/school-profile.service';
import { SchoolProfile } from 'src/app/core/models/school-profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser?: LoginBasicUser;
  username?: string;
  password?: string;
  errMsj?: string;
  schoolProfile = new SchoolProfile; 
  id?: number;
  constructor(
    private schoolProfileService: SchoolProfileService,
    private tokenService: TokenService, 
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUser = new LoginBasicUser(this.username!, this.password!);
    this.authService.login(this.loginUser).subscribe(
      data=>{
        this.tokenService.setToken(data.token);
        this.username = this.tokenService.getUserName();
        let userType = this.tokenService.getUserType();
        if(userType==="M") {
          this.router.navigate([`/toggle/perfil-centro/${this.username}`]);
        } else {
          this.router.navigate([`/toggle/perfil-teacher/${this.username}`]);
        }
        
      }, 
      err=> {
       this.errMsj = err.error.mensaje;
        Swal.fire(
          'Inicio de sesión fallido.',
          this.errMsj,
          'error'
        );
      }
    );
  }

}
