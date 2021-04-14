import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../core/material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AlreadyReportedComponent } from '../../components/details/already-reported/already-reported.component';
import { NotReportedComponent } from '../../components/details/not-reported/not-reported.component';
import { ErrWrsService } from 'src/app/core/services/api/err-wrs.service';
import { EditDialogComponent } from './../../dialogs/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AlreadyReportedComponent,
    NotReportedComponent,
    EditDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule
  ],
  entryComponents: [EditDialogComponent],
  providers: [ErrWrsService]
})
export class AdminModule { }
