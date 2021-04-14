import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FileValueAccessorDirective } from './core/directives/file-value-accessor.directive';
import { DataSharedService } from './core/services/data-shared.service';
import { MaterialModule } from './core/material/material.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TechComponent } from './layouts/tech/tech.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { NavbarService } from './core/services/navbar.service';
// import { NgxUploadModule, MineTypeEnum, DropTargetOptions, InputFileOptions } from '@wkoza/ngx-upload';

/*export const ngxDropTargetOptions: DropTargetOptions = {
  color: 'dropZoneColor',
  colorDrag: 'dropZoneColorDrag',
  colorDrop: 'dropZoneColorDrop',
  multiple: false,
  accept: [MineTypeEnum.Image, MineTypeEnum.Application_Pdf]
};

export const optionsInput: InputFileOptions = {
  multiple: false,
  accept: [MineTypeEnum.Image, MineTypeEnum.Application_Pdf]
};*/


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    TechComponent,
    NavMenuComponent,
    // LoginComponent
    // ReportComponent,
    // FileValueAccessorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxUploadModule.forRoot(),
    // MaterialModule,
    AppRoutingModule
  ],
  providers: [
    DataSharedService, NavbarService, { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
