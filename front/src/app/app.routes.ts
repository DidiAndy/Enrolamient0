import { Routes, CanActivate, CanActivateChild } from '@angular/router';
import { CoberturaComponent } from './views/cobertura/cobertura.component';
import { BlankLayoutComponent } from './components/common/layouts/blankLayout.component';
import { ReporteComponent } from './views/Reporte/reporte.component';
import { LoginComponent } from './views/appviews/login/login.component';


export const ROUTES: Routes = [
  // Main redirect
  //Con login
 /*  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LoginComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }, */

  //sin login
  { path: '', redirectTo: 'dental', pathMatch: 'full' },
  
  {
    path: 'dental', component: BlankLayoutComponent,
    children: [
      { path: ':id', component: CoberturaComponent }

    ]

  }, 
  
  //fin sin login
  {
    path: 'reporte', component: BlankLayoutComponent,
    children: [
      { path: 'excel', component: ReporteComponent }

    ]

  },


  // App views
  // {
  //   path: '', component: LoginComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent }
  //   ]
  // },
  // {
  //   path: 'administracion', component: BasicLayoutComponent,
  //   canActivate: [AuthGuardAndChildService], canActivateChild: [AuthGuardAndChildService],
  //   children: [
  //     { path: 'usuarios', component: UserComponent },
  //     { path: 'campañas', component: CampaignComponent },
  //     { path: 'prospectos', component: AdminInboxComponent },
  //     { path: 'roles', component: RoleComponent },
  //     { path: 'celulas', component: CellComponent },
  //     { path: 'operacion', component: OperationAdminComponent },
  //     { path: 'estados', component: StatusComponent }
  //   ]
  // },
  // {
  //   path: 'llamadas', component: BasicLayoutComponent,
  //   canActivate: [AuthGuardAndChildService], canActivateChild: [AuthGuardAndChildService],
  //   children: [
  //     { path: 'bandeja', component: CallInboxComponent },
  //     { path: 'gestion', component: CallComponent }
  //   ]
  // },
  // {
  //   path: 'visitas', component: BasicLayoutComponent,
  //   canActivate: [AuthGuardAndChildService], canActivateChild: [AuthGuardAndChildService],
  //   children: [
  //     { path: 'bandeja', component: MeetingInboxComponent },
  //     { path: 'gestion', component: MeetingComponent }
  //   ]
  // },
  // {
  //   path: 'consultas', component: BasicLayoutComponent,
  //   canActivate: [AuthGuardAndChildService], canActivateChild: [AuthGuardAndChildService],
  //   children: [
  //     { path: 'prospectos', component: VendorInboxComponent }
  //   ]
  // },
  // Handle all other routes
  //{ path: '**', redirectTo: 'coberturas/dental' }
  
  { path: '**', redirectTo: 'login' }
];
