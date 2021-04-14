import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './../../components/upload/upload.component';
import { ReportComponent } from './../../components/report/report.component';
import { AuthGuard } from '../../core/guard/auth.guard';


const routes: Routes = [
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'reported', component: ReportComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TechRoutingModule { }
