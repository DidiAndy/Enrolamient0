import { Routes, CanActivate, CanActivateChild } from '@angular/router';
import { CoberturaComponent } from './views/cobertura/cobertura.component';
import { BlankLayoutComponent } from './components/common/layouts/blankLayout.component';
import { ReporteComponent } from './views/Reporte/reporte.component';



export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: 'coberturas/dental', pathMatch: 'full' },
  {
    path: 'coberturas', component: BlankLayoutComponent,
    children: [
      { path: 'dental/:id', component: CoberturaComponent }

    ]

  },  
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
  { path: '**', redirectTo: 'coberturas/dental' }
];
