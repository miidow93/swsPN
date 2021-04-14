import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlreadyReportedComponent } from '../../components/details/already-reported/already-reported.component';
import { NotReportedComponent } from '../../components/details/not-reported/not-reported.component';
import { AuthGuard } from '../../core/guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: NotReportedComponent, canActivate: [AuthGuard] },
  // { path: 'not', component: NotReportedComponent },
  { path: 'already', component: AlreadyReportedComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
