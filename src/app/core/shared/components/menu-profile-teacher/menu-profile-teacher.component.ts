import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-menu-profile-teacher',
  templateUrl: './menu-profile-teacher.component.html',
  styleUrls: ['./menu-profile-teacher.component.css']
})
export class MenuProfileTeacherComponent implements OnInit {

  isLogged = false;
  username? : string;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.username = this.tokenService.getUserName();
  }
  
  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/']);
    //window.location.reload(); 
  }
 
}
