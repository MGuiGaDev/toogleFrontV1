import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-menu-profile-school',
  templateUrl: './menu-profile-school.component.html',
  styleUrls: ['./menu-profile-school.component.css']
})
export class MenuProfileSchoolComponent implements OnInit {

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
