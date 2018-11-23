import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-slimscroll';
//import { ModuleRoleService } from '../../../views/appviews/login/modulerole/modulerole.service';
import { ModuleRole } from '../../../views/entities/login/modulerole';
import { JwtHelper } from 'angular2-jwt';
import { MenuData } from './menu';
import { ChildMenu } from './childmenu';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.template.html'
})


export class NavigationComponent implements OnInit, AfterViewInit {

  parentMenus: MenuData[];
  roleId: number;
  counter: number;

  constructor(private jwtHelper: JwtHelper, private router: Router) { }

  ngOnInit() {
    this.parentMenus = new Array<MenuData>();
    this.counter = 0;
    /*this.moduleRoleService.getUserMenuAuthorization(+sessionStorage.getItem('userId')).then(result => {
      this.parentMenus = result;
    }, error => {
      this.navigateToLogin();
    });*/
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();
    if (jQuery('body').hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      });
    }
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }

  showChild(childName: string) {
    if (childName.toLowerCase().localeCompare('nuevo') === 0) {
      return false;
    }
    return true;
  }

  navigateToLogin(): void {
    swal({
      title: 'Su Sesión a Expirado',
      text: 'Vuelva a autenticarse',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: false
    });
    this.router.navigate(['login']);
  }

  testMethod(item: string) {
    if (item.toLowerCase().includes('nuevo')) {
      // this.sppInboxService.broadcastTextChange(null);
    }
  }

  onParentClick(item: any) {
  }
}
