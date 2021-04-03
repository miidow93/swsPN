import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../core/material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AlreadyReportedComponent } from '../../components/details/already-reported/already-reported.component';
import { NotReportedComponent } from '../../components/details/not-reported/not-reported.component';
import { ErrWrsService } from 'src/app/core/services/api/err-wrs.service';


@NgModule({
  declarations: [AlreadyReportedComponent, NotReportedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [ErrWrsService]
})
export class AdminModule { }
