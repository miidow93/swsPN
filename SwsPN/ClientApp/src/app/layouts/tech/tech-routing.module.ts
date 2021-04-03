import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './../../components/upload/upload.component';
import { ReportComponent } from './../../components/report/report.component';

const routes: Routes = [
  {path: 'upload', component: UploadComponent},
  { path: 'reported', component: ReportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TechRoutingModule { }
