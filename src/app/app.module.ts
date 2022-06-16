import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateProfileComponent } from './school-profile/update-profile/update-profile.component';
import { LoginComponent } from './core/shared/auth/login/login.component';
import { RegistroComponent } from './core/shared/auth/registro/registro.component';
import { MenuComponent } from './core/shared/components/menu/menu.component';
import { IndexComponent } from './core/shared/components/index/index.component';
import { schoolProfileInterceptorProvider} from './interceptors/school-profile-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PublicDetailProfileComponent } from './school-profile/public-detail-profile/public-detail-profile.component';
import { PrivateDetailProfileComponent } from './school-profile/private-detail-profile/private-detail-profile.component';
import { SocialMediaComponent } from './core/shared/components/social-media/social-media.component';
import { MenuProfileSchoolComponent } from './core/shared/components/menu-profile-school/menu-profile-school.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//PIPEDATE-ESPAÑA = https://medium.com/zurvin/angular-datepipe-cambiando-el-idioma-68e16b74c943
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SelectStudiesDegreeComponent } from './core/shared/components/select-studies-degree/select-studies-degree.component';
import { TeacherPrivateDetailProfileComponent } from './teacher-profile/teacher-private-detail-profile/teacher-private-detail-profile.component';
import { MenuProfileTeacherComponent } from './core/shared/components/menu-profile-teacher/menu-profile-teacher.component';
import { CreateTeacherComponent } from './teacher-profile/create-teacher/create-teacher.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ListProjectsComponent } from './school-project/list-projects/list-projects.component';
import { ListProjectsCreatorComponent } from './school-project/list-projects-creator/list-projects-creator.component';
import { CreateProjectComponent } from './school-project/create-project/create-project.component';
import { FormcreateprojectComponent } from './core/shared/components/modals/formcreateproject/formcreateproject.component';
import { CpComponent } from './teacher-profile/teacher-private-detail-profile/cp/cp.component';

import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormSendCollaboratorRequestComponent } from './core/shared/components/modals/form-send-collaborator-request/form-send-collaborator-request.component';
import { FooterComponent } from './core/shared/components/footer/footer.component';

registerLocaleData(localeEs, 'es')





@NgModule({
  declarations: [
    AppComponent,
    UpdateProfileComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    PublicDetailProfileComponent,
    PrivateDetailProfileComponent,
    SocialMediaComponent,
    MenuProfileSchoolComponent,
    SelectStudiesDegreeComponent,
    TeacherPrivateDetailProfileComponent,
    MenuProfileTeacherComponent,
    CreateTeacherComponent,
    ListProjectsComponent,
    ListProjectsCreatorComponent,
    CreateProjectComponent,
    FormcreateprojectComponent,
    CpComponent,
    FormSendCollaboratorRequestComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    DataTablesModule,
    Ng2SearchPipeModule
  ],
  providers: [
    //https://stackoverflow.com/questions/60331725/angular-ivy-error-error-token-injectiontoken-xxxxxxxxx-is-missing-a-%C9%B5prov-d
    //este es el aspecto anterior: {provide: schoolProfileInterceptorProvider, useValue: undefined}
  schoolProfileInterceptorProvider,
  {provide: LOCALE_ID, useValue: 'es'}
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
