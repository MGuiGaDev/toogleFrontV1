import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './core/shared/auth/login/login.component';
import { RegistroComponent } from './core/shared/auth/registro/registro.component';
import { LoginGuard } from './guards/login.guard';
import { SchoolGuard } from './guards/school.guard';
import { IndexComponent } from './core/shared/components/index/index.component';
import { PrivateDetailProfileComponent } from './school-profile/private-detail-profile/private-detail-profile.component';
import { UpdateProfileComponent } from './school-profile/update-profile/update-profile.component';
import { PrivateProfileGuard } from './guards/private-profile.guard';
import { TeacherPrivateDetailProfileComponent } from './teacher-profile/teacher-private-detail-profile/teacher-private-detail-profile.component';
import { CreateProjectComponent } from './school-project/create-project/create-project.component';
import { ListProjectsComponent } from './school-project/list-projects/list-projects.component';


const routes: Routes = [
  {path: ``, component: IndexComponent},
  {path: `login`, component: LoginComponent, canActivate: [LoginGuard]},
  {path: `registro`, component: RegistroComponent, canActivate: [LoginGuard]},
  {path: `perfil-teacher/:username/crear-proyecto/:id`, component: CreateProjectComponent, canActivate: [PrivateProfileGuard]},
  {path: `perfil-centro/:username`, component: PrivateDetailProfileComponent, canActivate: [PrivateProfileGuard, SchoolGuard], data: {expectedRol: ['admin', 'user']}},
  {path: `perfil-teacher/:username`, component: TeacherPrivateDetailProfileComponent, canActivate: [PrivateProfileGuard, SchoolGuard], data: {expectedRol: ['admin', 'user']}},
  {path: `perfil-teacher/:username/colaborar-en-proyectos`, component: ListProjectsComponent, canActivate: [PrivateProfileGuard, SchoolGuard], data: {expectedRol: ['admin', 'user']}},
  {path: `perfil-centro/:username/editar/:id`, component: UpdateProfileComponent, canActivate: [PrivateProfileGuard, SchoolGuard], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
