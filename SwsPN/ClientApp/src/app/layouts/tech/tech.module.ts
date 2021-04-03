import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechRoutingModule } from './tech-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from '../../components/upload/upload.component';
import { FileValueAccessorDirective } from '../../core/directives/file-value-accessor.directive';
import { ReportComponent } from '../../components/report/report.component';
import { ErrWrsService } from 'src/app/core/services/api/err-wrs.service';


@NgModule({
  declarations: [UploadComponent, ReportComponent, FileValueAccessorDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TechRoutingModule
  ], 
  providers: [ErrWrsService]
})
export class TechModule { }
