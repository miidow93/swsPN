import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { TechComponent } from './layouts/tech/tech.component';
import { AuthComponent } from './layouts/auth/auth.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule)
        // loadChildren: './layouts/admin/admin.module#AdminModule'
      }
    ]
  },
  {
    path: '',
    component: TechComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/tech/tech.module').then(m => m.TechModule)
      }
    ]
  },{
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }/*,
  {
    path: '**',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
