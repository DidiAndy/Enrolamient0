import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';

import swal from 'sweetalert2';
import 'jquery';
import 'bootstrap';
import { Cobertura } from '../entities/cobertura';
import { Dependientes } from '../entities/dependientes';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CoberturaService } from 'app/views/cobertura/cobertura.service';
import { Plan } from '../entities/plan';
import { tipoCuenta } from '../entities/tipoCuenta';
import { Banco } from '../entities/Banco';
import { Parentesco } from '../entities/parentesco';
import { tipoDoc } from '../entities/tipoDoc';
import { Empresa } from '../entities/Empresa';
//import * as Rx from "rxjs";
import { NullTemplateVisitor } from '@angular/compiler';
import { ReplaySubject } from 'rxjs';
import { formatDate } from 'ngx-bootstrap/chronos';
import { $, element } from 'protractor';
declare var jQuery: any;


@Component({
    selector: 'cobertura',
    templateUrl: 'cobertura.template.html'
})
export class CoberturaComponent implements OnInit {
    @ViewChild('campaignModal')
    modal: ModalComponent;
    locale = 'es';
    imagen: string = "";
    plan: Plan[];
    planSel: Plan[];
    planes: Plan;
    datos: boolean;
    cuentas: tipoCuenta[];
    banco: Banco[];
    parentescos: Parentesco[];
    dependientes: Dependientes;
    degree: number;
    max: number;
    conta: number;
    mostrarGuardar: boolean;
    mostrarPDF: boolean;
    currentDate = new Date();
    bornDate: Date;
    necesitaDependiente: boolean;
    mostrarDep: boolean;
    parentesco: Parentesco;
    titular: Cobertura;
    titularNuevoEdita: Cobertura;
    valorDep: number;
    cedTit: boolean;
    cedDep: boolean;
    tipoDoc: tipoDoc[];
    tamaño: number;
    tipoDepDoc: tipoDoc[];
    valor: number;
    repetidos: number[];
    cedulaTit: boolean;
    pasTit: boolean;
    cedulaDep: boolean;
    pasDep: boolean;
    Logo: string;
    empresa: Empresa;
    cedRep: boolean;
    fechaActual: Date;
    resultadoFecha: Date;
    fechaTotal: number;
    redondeoFecha: number;
    depValid: boolean;
    pasRepetido: boolean;
    bloqueo: number = 0;//bloquear desbloquear botones
    bloqueoplan: number = 0; //bloaquear plan 
    valorDeDependiente: number = 10;
    listaTablaDatos: Dependientes[];
    listaTablaSelected: Dependientes;
    temp: boolean;
    idDocu: number;
    valorCuota: number;
    modifica: number = 0;
    id_empresa: number = 0;

    constructor(private localeService: BsLocaleService, private route: Router, private router: ActivatedRoute, private elementRef: ElementRef, private coberturaService: CoberturaService) {
    }
    ngOnInit() {
        this.pasRepetido = false;
        this.imagen = "default.jpg";
        this.localeService.use(this.locale);
        this.fechaActual = new Date();
        this.cedRep = false;
        this.listaTablaDatos = [];
        this.temp = false;
        this.bloqueo = 0;
        this.valorCuota = 0;
        this.listaTablaSelected = new Dependientes();
        this.router.params.subscribe(params => {
            this.Logo = params.id;
            this.coberturaService.findEmpresabyName(this.Logo.toLowerCase()).subscribe(result => {
                this.empresa = result;

                if (Object.keys(this.empresa).length === 0) {
                    this.imagen = "default.jpg";
                }
                else {
                    this.imagen = this.empresa[0].logotipo;
                }

            }, error => {
                console.log(error);
            });
        });
        this.depValid = false;
        this.cedTit = false;
        this.cedDep = false;
        this.cedulaTit = false;
        this.pasTit = false;
        this.cedulaDep = false;
        this.pasDep = false;
        this.necesitaDependiente = true;
        this.degree = 0;
        this.titular = new Cobertura();
        this.titularNuevoEdita = new Cobertura();
        this.titular.dependientes = [];
        this.conta = 0;
        this.mostrarGuardar = true;
        this.mostrarPDF = false;
        this.bornDate = new Date();
        this.datos = true;
        this.titular.sec_plan = 0;
        this.titular.sec_banco = 0;
        this.titular.sec_tipoCuenta = 300;
        this.tamaño = 0;
        this.titular.sec_tipoDoc = 0;
        this.coberturaService.getBanco(this.datos).subscribe(result => {
            this.banco = result;

        }, error => {
            console.log(error);
        });
        this.coberturaService.getPlan(this.datos).subscribe(result => {
            this.plan = result;

        }, error => {
            console.log(error);
        });
        this.coberturaService.getTipoCuenta(this.datos).subscribe(result => {
            this.cuentas = result;

        }, error => {
            console.log(error);
        });
        this.coberturaService.getParentesco(this.datos).subscribe(result => {
            this.parentescos = result;

        }, error => {
            console.log(error);
        });
        this.coberturaService.getTipoDoc().subscribe(result => {
            this.tipoDoc = result;
            this.tipoDepDoc = result;
        }, error => {
            console.log(error);
        });
    }

    mostrarValor(sec_plan: number) {
        if (sec_plan != undefined) {
            this.plan.forEach(element => {
                if (element.sec_plan == sec_plan) {
                    this.valorCuota = element.Valor;
                }
            });
        }
    }

    cambioFecha() {
        var actual = this.currentDate;
        var d = actual.getFullYear() - 18;
        var max = actual.getFullYear() - 75;
    }

    abrirModal() {
        this.listaTablaSelected = new Dependientes();
        this.refrescarPantalla();
        this.modal.open();
        this.modifica = 0;
    }

    cerrarModal() {
        this.modal.close();
    }

    refrescarPantalla() {
        this.coberturaService.findTitularLocalbyId(this.titular.NoIdentificacion).subscribe(result => {
            if (result) {

                this.titular = result;
                this.listaTablaDatos = this.titular.dependientes;
                this.titular.sec_tipoDoc;
                var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);

                var date2 = new Date(this.titular.fecha_Creacion); // had to remove the colon (:) after the T in order to make it work
                var day2 = date2.getDate();
                var monthIndex2 = date2.getMonth();
                var year2 = date2.getFullYear();
                this.titular.fecha_Creacion = new Date(year2, monthIndex2, day2);

                if (this.idDocu == 0) {
                    this.titular.sec_tipoDoc = this.tipoDepDoc[this.idDocu].Id;
                } else {
                    this.titular.sec_tipoDoc = this.tipoDepDoc[1].Id;
                }

            } else {
                console.log(" no existe")
                this.obtenerDatos(this.titular.NoIdentificacion);
            }

        }, error => {
            console.log(error);
        });
    }

    blanquear() {
        this.titular.PrimerNombre = "";
        this.titular.SegundoNombre = "";
        this.titular.PrimerApellido = "";
        this.titular.SegundoApellido = "";
        this.titular.Fecha_Nacimiento = null;
        this.titular.genero = null;
        this.titular.div_pago = null;
        this.titular.sec_tipoCuenta = 300;
        this.titular.sec_plan = 0;
        this.titular.noCuenta = "";
        this.titular.sec_banco = 0;
        this.titular.valor_total = 0;
        this.valorCuota = 0;
        this.bloqueoplan = 0;
        this.bloqueo = 0;
    }

    abrirPDF() {
        this.PDF(this.titular.NoIdentificacion);
    }

    documento(docu: number) {

        this.idDocu = docu - 1;
    }

    modificarDep(depen: Dependientes) {
        this.modifica = 2;
        this.tipoDoc[0].Id = depen.sec_tipoDoc;
        this.coberturaService.findDependienteLocalbyId(depen.NoIdentificacion).subscribe(result => {
            this.dependientes = result;
            this.listaTablaSelected = this.dependientes;
            var date = new Date(this.dependientes.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            this.listaTablaSelected.Fecha_Nacimiento = new Date(year, monthIndex, day);
            var date2 = new Date(this.listaTablaSelected.fecha_Creacion); // had to remove the colon (:) after the T in order to make it work
            var day2 = date2.getDate();
            var monthIndex2 = date2.getMonth();
            var year2 = date2.getFullYear();
            this.listaTablaSelected.fecha_Creacion = new Date(year2, monthIndex2, day2);
            this.cedDep = false;
            this.cedRep = false;
            this.depValid = true;
            this.fechaTotal = ((this.fechaActual.getTime() - this.listaTablaSelected.Fecha_Nacimiento.getTime()) / 86400000) / 365;
            this.redondeoFecha = Math.round(this.fechaTotal);
        }, error => {
            console.log(error);
        });
        this.modal.open();
    }
    borraDependiente(depen: Dependientes) {

        this.coberturaService.deleteDependiente(depen).subscribe(result => {
            if (result === true) {
                this.refrescarPantalla();
                this.valorCuota = this.valorCuota - this.valorDeDependiente;
                swal({
                    title: 'Eliminación Correcta',
                    text: 'Dependiente eliminado Correctamente!!',
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowEnterKey: false,
                    allowEscapeKey: false
                }).then(response => {
                    if (response.value) {
                        console.log("Acepatado");
                    }
                });
            } else {
                swal({
                    title: 'Error',
                    text: 'El Dependiente no se pudo eliminar!',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            }

        }, error => {
            swal({
                title: 'Error',
                text: 'Existió un error al eliminar dependiente',
                type: 'error',
                allowOutsideClick: false,
                showCancelButton: false
            });
        });
    }
    guardar() {
        this.titularNuevoEdita.fecha_Creacion = this.titular.fecha_Creacion;
        this.titularNuevoEdita.Fecha_Nacimiento = this.titular.Fecha_Nacimiento;
        this.titularNuevoEdita.genero = this.titular.genero;
        this.titularNuevoEdita.noCuenta = this.titular.noCuenta;
        this.titularNuevoEdita.NoIdentificacion = this.titular.NoIdentificacion;
        this.titularNuevoEdita.fecha_Creacion = this.titular.fecha_Creacion;
        this.titularNuevoEdita.PrimerApellido = this.titular.PrimerApellido;
        this.titularNuevoEdita.PrimerNombre = this.titular.PrimerNombre;
        this.titularNuevoEdita.sec_banco = this.titular.sec_banco;
        this.titularNuevoEdita.div_pago = this.titular.div_pago;
        this.titularNuevoEdita.sec_empresa = this.titular.sec_empresa;
        this.titularNuevoEdita.sec_plan = this.titular.sec_plan;
        this.titularNuevoEdita.sec_tipoCuenta = this.titular.sec_tipoCuenta;
        this.titularNuevoEdita.sec_tipoDoc = this.titular.sec_tipoDoc;
        this.titularNuevoEdita.SegundoApellido = this.titular.SegundoApellido;
        this.titularNuevoEdita.SegundoNombre = this.titular.SegundoNombre;
        this.titularNuevoEdita.Status = true;
        this.titularNuevoEdita.valor_total = this.titular.valor_total;
        this.titularNuevoEdita.dependientes = this.titular.dependientes;
        this.titularNuevoEdita.sec_titular = this.titular.sec_titular;

        this.titularNuevoEdita.sec_empresa = this.empresa[0].sec_empresa;

        this.plan.forEach(element => {
            if (this.titularNuevoEdita.sec_plan == element.sec_plan) {
                this.titularNuevoEdita.valor_total = element.Valor;
            }
        });

        var date2 = new Date(this.titularNuevoEdita.fecha_Creacion); // had to remove the colon (:) after the T in order to make it work
        var day2 = date2.getDate();
        var monthIndex2 = date2.getMonth();
        var year2 = date2.getFullYear();
        this.titularNuevoEdita.fecha_Creacion = new Date(year2, monthIndex2, day2);

        this.tipoDoc.forEach(elemento => {
            if (this.titularNuevoEdita.sec_tipoDoc == elemento.Id) {
            }
        });

        this.coberturaService.saveCobertura(this.titularNuevoEdita).subscribe(result2 => {

            this.refrescarPantalla();
            if (result2 === true) {
                this.bloqueo = 20;
                swal({
                    title: 'Almacenado',
                    text: 'Cobertura Almacenada Correctamente!!',
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowEnterKey: false,
                    allowEscapeKey: false
                });
            } else {
                swal({
                    title: 'Error',
                    text: 'El titular ingresado esta anteriormente registrado!',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            }

        }, error => {
            swal({
                title: 'Error',
                text: 'Existió un error al almacenar la cobertura',
                type: 'error',
                allowOutsideClick: false,
                showCancelButton: false
            });
        });
    }

    generarPDF() {
        this.mostrarGuardar = true;
        this.mostrarPDF = false;
    }

    agregarDatosATabla() {
        this.listaTablaSelected.sec_titular = this.titular.sec_titular;
        // this.guardar();
        var date = new Date(this.currentDate);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        this.listaTablaSelected.fecha_Creacion = new Date(year, monthIndex, day);

        this.coberturaService.saveDependiente(this.listaTablaSelected).subscribe(result => {
            if (result === true) {
                this.bloqueoplan = 2;
                this.cerrarModal();
                this.refrescarPantalla();
                if (this.modifica == 0) {
                    this.valorCuota = this.valorCuota + this.valorDeDependiente;
                }
                swal({
                    title: 'Almacenado',
                    text: 'Dependiente Almacenado Correctamente!!',
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowEnterKey: false,
                    allowEscapeKey: false
                }).then(response => {
                    if (response.value) {
                        console.log("Acepatado");

                    }
                });
            } else {
                swal({
                    title: 'Error',
                    text: 'El Dependiente ingresado esta anteriormente registrado!',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            }

        }, error => {
            swal({
                title: 'Error',
                text: 'Existió un error al almacenar Dependiente',
                type: 'error',
                allowOutsideClick: false,
                showCancelButton: false
            });
        });
    }

    obtenerDatosLocal(cedula: any) {

        if (cedula == true) {


            this.coberturaService.findTitularLocalbyId(this.titular.NoIdentificacion).subscribe(result => {
                if (result) {
                    this.titular = result;
                    this.id_empresa = this.titular.sec_empresa;
                    this.listaTablaDatos = this.titular.dependientes;
                    this.titular.sec_tipoDoc;
                    var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();
                    this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                    this.titular.sec_tipoDoc = this.tipoDepDoc[0].Id;
                    this.valorCuota = this.titular.valor_total;
                    this.bloqueo = 20;
                    this.bloqueoplan = 2;
                    swal({
                        title: 'Informacion',
                        text: 'El cliente ya tiene un plan!!',
                        type: 'info',
                        allowOutsideClick: false,
                        showCancelButton: false,
                        allowEnterKey: false,
                        allowEscapeKey: false
                    });
                } else {
                    this.bloqueo = 0;
                    this.bloqueoplan = 0;
                    console.log(" no existe")
                    this.obtenerDatos(cedula);
                }


            }, error => {
                console.log(error);
            });
        }
        else {
            this.bloqueo = 0;
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
            this.titular.genero = null;
            this.titular.div_pago = null;
            this.titular.sec_tipoCuenta = 300;
            this.titular.sec_plan = 0;
            this.titular.noCuenta = "";
            this.titular.sec_banco = 0;
            this.titular.valor_total = 0;
           
        }
    }
    obtenerDatosLocalP() {
        this.coberturaService.findTitularLocalbyId(this.titular.NoIdentificacion).subscribe(result => {
            if (result) {
                this.bloqueo = 20;
                this.bloqueoplan = 2;
                this.titular = result;
                this.titular.div_pago = this.titular.div_pago;
                var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                this.titular.genero = this.titular.genero;
                this.titular.sec_tipoCuenta = this.titular.sec_tipoCuenta;
                this.titular.sec_plan = this.titular.sec_plan;
                this.titular.noCuenta = this.titular.noCuenta;
                this.titular.sec_banco = this.titular.sec_banco;
                this.titular.valor_total = this.titular.valor_total;
                this.valorCuota = this.titular.valor_total;
                this.titular.sec_tipoDoc = this.tipoDepDoc[1].Id;

                swal({
                    title: 'Informacion',
                    text: 'El cliente ya tiene un plan!!',
                    type: 'info',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowEnterKey: false,
                    allowEscapeKey: false
                });
            } else {
                console.log(" no existe")
                this.bloqueo = 0;
                this.bloqueoplan = 0;

            }
        }, error => {
            console.log(error);
        });
    }
    obtenerDatos(cedula: any) {
        var fechaNac = new Date();
        if (cedula == true) {
            this.coberturaService.findTitularbyId(this.titular.NoIdentificacion).subscribe(result => {
                this.titular = result;
                this.listaTablaDatos = this.titular.dependientes;
                this.titular.sec_tipoDoc = this.tipoDepDoc[0].Id;
                this.titular.sec_tipoCuenta = 300;
                var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                console.log(result);

            }, error => {
                console.log(error);
            });
        }
        else {
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
           }

    }
    pasaporteRepetido(identificacion: string) {
        var conta = 0;

        if (this.listaTablaSelected.NoIdentificacion != this.titular.NoIdentificacion) {
            this.pasRepetido = false;
        }
        else {
            this.pasRepetido = true;
        }
        if (this.listaTablaSelected.NoIdentificacion == identificacion) {

            conta = conta + 1;
        }

        if (conta == 1) {
            this.pasRepetido = false;
        } else {
            this.pasRepetido = true;
        }
    }
    traerFecha(nacimiento: Date) {
        var date = new Date(nacimiento); // had to remove the colon (:) after the T in order to make it work

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        this.resultadoFecha = new Date(year, monthIndex, day);

        this.fechaTotal = ((this.fechaActual.getTime() - this.resultadoFecha.getTime()) / 86400000) / 365;

        this.redondeoFecha = Math.round(this.fechaTotal);

        return this.redondeoFecha;
    }

    obtenerDatosDep(depDatos: any, identificacion: string) {
        var conta = 0;
        if (this.listaTablaSelected.NoIdentificacion != this.titular.NoIdentificacion) {

            this.coberturaService.findDependientebyId(this.listaTablaSelected.NoIdentificacion).subscribe(result => {
                this.dependientes = result;
                this.listaTablaSelected = this.dependientes;
                this.listaTablaSelected.sec_tipoDoc = this.tipoDoc[0].Id;
                var date = new Date(this.dependientes.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work

                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                this.listaTablaSelected.Fecha_Nacimiento = new Date(year, monthIndex, day);


                this.cedDep = false;
                this.cedRep = false;
                this.depValid = true;


                this.fechaTotal = ((this.fechaActual.getTime() - this.listaTablaSelected.Fecha_Nacimiento.getTime()) / 86400000) / 365;

                this.redondeoFecha = Math.round(this.fechaTotal);

            }, error => {
                console.log(error);
            });
        }
        else {
            this.listaTablaSelected.PrimerNombre = "";
            this.listaTablaSelected.SegundoNombre = "";
            this.listaTablaSelected.PrimerApellido = "";
            this.listaTablaSelected.SegundoApellido = "";
            this.cedDep = true;
            this.cedRep = true;
        }
        if (conta == 1) {
            if (this.listaTablaSelected.NoIdentificacion != this.titular.NoIdentificacion) {
                this.coberturaService.findDependientebyId(this.listaTablaSelected.NoIdentificacion).subscribe(result => {
                    this.dependientes = result;

                    var date = new Date(this.dependientes.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work

                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();
                    this.listaTablaSelected.Fecha_Nacimiento = new Date(year, monthIndex, day);
                    this.cedDep = false;
                    this.cedRep = false;
                }, error => {
                    console.log(error);
                });
            }
            else {
                this.listaTablaSelected.PrimerNombre = "";
                this.listaTablaSelected.SegundoNombre = "";
                this.listaTablaSelected.PrimerApellido = "";
                this.listaTablaSelected.SegundoApellido = "";
                this.cedDep = true;
                this.cedRep = true;
            }
        }
        this.cedDep = true;
        this.cedRep = true;

    }
    depOtro(dependiente: Dependientes) {

        if (dependiente.sec_parentesco == 50) {
            this.mostrarDep = true;
        } else {
            this.mostrarDep = false;
        }
    }
    cambioTipo() {
        if (this.titular.sec_tipoDoc == 1) {
            this.cedulaTit = true;
            this.pasTit = false;
            this.titular.NoIdentificacion = "";
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
        } else if (this.titular.sec_tipoDoc == 3) {
            this.cedulaTit = false;
            this.pasTit = true;
            this.titular.NoIdentificacion = "";
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
        }
        else if (this.titular.sec_tipoDoc == 0) {
            this.cedulaTit = false;
            this.pasTit = false;
            this.titular.NoIdentificacion = "";
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
        }
    }
    PDF(id): void {

        if (id) {
            this.coberturaService.imprimirPDF(id).subscribe(result => {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.className = "hidden";
                let url = window.URL.createObjectURL(result);
                a.href = url;
                a.download = 'ArchivoCobertura' + (new Date()).getFullYear() + ((new Date()).getMonth() + 1) + (new Date()).getDate() + (new Date()).getTime() + '.pdf';
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(result, 'ArchivoCobertura' + (new Date()).getFullYear() + ((new Date()).getMonth() + 1) + (new Date()).getDate() + (new Date()).getTime() + '.pdf');
                }
                else {
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
                window.location.reload();
            }, error => {
                swal({
                    title: 'Error',
                    text: 'Existió un error al almacenar la autorización',
                    type: 'error',
                    allowOutsideClick: false,
                    showCancelButton: false
                });
            })
        }
        else {
            swal({
                title: 'Error',
                text: 'No Existen registros guardados!',
                type: 'error',
                allowOutsideClick: false,
                showCancelButton: false
            });
        }
    }
    cambioDep() {
        if (this.listaTablaSelected.sec_tipoDoc == 1) {
            this.cedulaDep = true;
            this.pasDep = false;
            this.listaTablaSelected.NoIdentificacion = "";
            this.listaTablaSelected.PrimerNombre = "";
            this.listaTablaSelected.SegundoNombre = "";
            this.listaTablaSelected.PrimerApellido = "";
            this.listaTablaSelected.SegundoApellido = "";
        } else if (this.listaTablaSelected.sec_tipoDoc == 3) {
            this.cedulaDep = false;
            this.pasDep = true;
            this.listaTablaSelected.NoIdentificacion = "";
            this.listaTablaSelected.PrimerNombre = "";
            this.listaTablaSelected.SegundoNombre = "";
            this.listaTablaSelected.PrimerApellido = "";
            this.listaTablaSelected.SegundoApellido = "";
        }
        else if (this.listaTablaSelected.sec_tipoDoc == 0) {
            this.cedulaDep = false;
            this.pasDep = false;
            this.listaTablaSelected.NoIdentificacion = "";
            this.listaTablaSelected.PrimerNombre = "";
            this.listaTablaSelected.SegundoNombre = "";
            this.listaTablaSelected.PrimerApellido = "";
            this.listaTablaSelected.SegundoApellido = "";
        }
    }
}