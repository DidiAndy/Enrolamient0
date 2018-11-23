import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';

//import { UserAuthenticationService } from '../appviews/login/login.service';

import swal from 'sweetalert2';
import 'jquery';
import 'bootstrap';
import { Cobertura } from '../entities/cobertura';
import { Dependientes } from '../entities/dependientes';

import { CarouselComponent } from 'angular2-carousel';
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
declare var jQuery: any;


@Component({
    selector: 'cobertura',
    templateUrl: 'cobertura.template.html'
})
export class CoberturaComponent implements OnInit {
    locale = 'es';
    imagen: string = "";
    @ViewChild('Carousel')
    car: CarouselComponent;
    cobertura: Cobertura;
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
    mostrarSig: boolean;
    mostrarAnt: boolean;
    mostrarGuardar: boolean;
    mostrarPDF: boolean;
    currentDate = new Date();
    bornDate: Date;
    necesitaDependiente: boolean;
    mostrarDep: boolean;
    parentesco: Parentesco;
    titular: Cobertura;
    dep: Dependientes;
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
    mostrarBotones: boolean;
    cedRep: boolean;
    fechaActual: Date;
    fechis: Date;
    fechaTotal: number;
    fechaA: number;
    depValid: boolean;
    pasRepetido: boolean;
    bry:number=0;
    valorDeDependiente: number = 10;

    constructor(private localeService: BsLocaleService, private route: Router, private router: ActivatedRoute, private elementRef: ElementRef, private coberturaService: CoberturaService) {
    }
    ngOnInit() {
        this.mostrarBotones = false;
        this.pasRepetido = false;
        this.imagen = "default.jpg";
        this.localeService.use(this.locale);
        this.fechaActual = new Date();
        this.cedRep = false;
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
        this.cobertura = new Cobertura();
        this.titular = new Cobertura();
        this.cobertura.Dependientes = new Array<Dependientes>();
        //this.cobertura.Dependientes.push(new Dependientes());
        this.conta = 0;
        this.car.lockSlides = true;
        this.car.angle = 90;
        this.mostrarAnt = false;
        this.mostrarSig = false;
        this.mostrarGuardar = true;
        this.mostrarPDF = false;
        this.bornDate = new Date();
        this.datos = true;
        this.cobertura.sec_plan = 0;
        this.cobertura.sec_banco = 0;
        this.cobertura.sec_tipoCuenta = 0;
        this.tamaño = 0;
        this.cobertura.sec_tipoDoc = 0;
        if (this.cobertura.Dependientes.length > 1) {
            this.mostrarSig = true;
            this.mostrarAnt = true;
        }
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
        this.coberturaService.getTipoDoc(this.datos).subscribe(result => {
            this.tipoDoc = result;
        }, error => {
            console.log(error);
        });
        this.coberturaService.getTipoDoc(this.datos).subscribe(result => {
            this.tipoDepDoc = result;
        }, error => {
            console.log(error);
        });
    }

    siguiente() {
        this.car.slideNext();
        if (this.car.carousel.activeIndex < this.car.carousel.totalItems - 1)
            this.mostrarSig = true;
        else
            this.mostrarSig = false;
        if (this.car.carousel.activeIndex == 0)
            this.mostrarAnt = false;
        else
            this.mostrarAnt = true;
    }
    cambioFecha() {

        var actual = this.currentDate;
        var d = actual.getFullYear() - 18;
        var max = actual.getFullYear() - 75;
    }

    anterior() {
        this.car.slidePrev();
        if (this.car.carousel.activeIndex == 0)
            this.mostrarAnt = false;
        else
            this.mostrarAnt = true;
        if (this.car.carousel.activeIndex < this.car.carousel.totalItems - 1)
            this.mostrarSig = true;
        else
            this.mostrarSig = false;
    }

    guardar() {
        var conta = 0;
        this.cobertura.sec_empresa = this.empresa[0].sec_empresa;
        this.cobertura.PrimerNombre = this.titular.PrimerNombre;
        this.cobertura.SegundoNombre = this.titular.SegundoNombre;
        this.cobertura.PrimerApellido = this.titular.PrimerApellido;
        this.cobertura.SegundoApellido = this.titular.SegundoApellido;
        this.cobertura.Fecha_Nacimiento = this.titular.Fecha_Nacimiento;
        this.cobertura.fecha_creacion = this.currentDate;
        console.log("Cobertura")
        console.log(this.cobertura);
        console.log(conta);

        this.coberturaService.saveCobertura(this.cobertura).subscribe(result => {
            if (result === true) {
                swal({
                    title: 'Almacenado',
                    text: 'Cobertura Almacenada Correctamente!!',
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    allowEnterKey: false,
                    allowEscapeKey: false
                }).then(response => {
                    if (response.value) {
                        console.log("Acepatado");
                        this.PDF(this.cobertura.noIdentificacion);
                    }
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

    agregar2() {


        if (this.cobertura.sec_plan != 0)
            this.cobertura.valor_total = this.planSel[0].Valor;

        else
            this.cobertura.valor_total = 0;

        console.log("yoooooo", this.cobertura.valor_total);
    }

    agregar() {

        this.cobertura.Dependientes.push(new Dependientes());
        this.car.carousel.maxHeigthSize = 400;
        this.cobertura.Dependientes[this.car.carousel.totalItems].sec_tipoDoc = 0;
        this.cobertura.Dependientes[this.car.carousel.totalItems].sec_parentesco = 0;
     
        this.cobertura.valor_total = this.planSel[0].Valor + this.valorDeDependiente;

        this.planSel[0].Valor = this.planSel[0].Valor + this.valorDeDependiente;

       

        if (this.cobertura.sec_plan != 0)
            this.cobertura.Dependientes[0].Valor = this.planSel[0].Valor;
        else
            this.cobertura.Dependientes[0].Valor = 0;

        this.car.update();
        if (this.car.carousel.totalItems > 0) {
            this.mostrarSig = true;
            this.cobertura.Dependientes[this.car.carousel.totalItems].Valor = this.planSel[0].Valor;
            this.car.update();
        }

    }

    eliminar() {
        this.cobertura.Dependientes.splice(this.car.carousel.activeIndex, 1);
        this.car.carousel.items.splice(this.car.carousel.activeIndex, 1);
        this.cobertura.valor_total = this.planSel[0].Valor - this.valorDeDependiente;

        this.planSel[0].Valor = this.planSel[0].Valor - this.valorDeDependiente;

        if (this.car.carousel.activeIndex = 0) {
            this.mostrarAnt = false;
        }

        if (this.car.carousel.activeIndex > 0) {

            if (this.car.carousel.activeIndex == this.car.carousel.items.length) {
                if (this.car.carousel.activeIndex - 1 == 0) {
                    this.car.slideTo(this.car.carousel.activeIndex + 1);
                    this.car.slideTo(this.car.carousel.activeIndex - 1);
                    this.mostrarAnt = false;
                    this.mostrarSig = false;
                }
                else {
                    this.car.slideTo(this.car.carousel.activeIndex + 1);
                    this.car.slideTo(this.car.carousel.activeIndex - 1);
                    this.mostrarAnt = true;
                    this.mostrarSig = false;
                }
            }
            else {
                this.car.slideTo(this.car.carousel.activeIndex - 1);
                this.car.carousel.maxHeigthSize = 0;
                this.mostrarAnt = false;
                this.mostrarSig = true;
            }
        }
        else if (this.car.carousel.activeIndex == 0) {
            if (this.car.carousel.items.length - 1 > 0) {
                this.car.slideTo(this.car.carousel.activeIndex + 1);
                this.car.slideTo(this.car.carousel.activeIndex - 1);
                this.mostrarAnt = false;
                this.mostrarSig = true;
            }
            else {
                this.car.slideTo(this.car.carousel.activeIndex + 1);
                this.car.slideTo(this.car.carousel.activeIndex - 1);
                this.car.carousel.maxHeigthSize = 0;
                this.mostrarAnt = false;
                this.mostrarSig = false;
            }
        }
        setTimeout(() => { this.car.update(); })
        if (this.cobertura.sec_plan != 0)
            this.cobertura.Dependientes[0].Valor = this.planSel[0].Valor;
        else
            this.cobertura.Dependientes[0].Valor = 0;

        this.car.update();
        if (this.car.carousel.totalItems > 0) {
            this.mostrarSig = true;
            this.cobertura.Dependientes[this.car.carousel.totalItems].Valor = this.planSel[0].Valor;
            this.car.update();
        }
    }
    obtenerTitPas(pass: any) {
        if (pass == true) {
            this.mostrarBotones = true;
        }
    }

    obtenerDatosLocal(cedula: any) {
        if (cedula == true) {


            this.coberturaService.findTitularLocalbyId(this.cobertura.noIdentificacion).subscribe(result => {                
                if (result) {
                     console.log(result);
                     this.bry=2;
                     this.titular = result;   
                     this.cobertura.sec_titular  = this.titular.sec_titular;
                    // this.cobertura.noIdentificacion= this.titular.noIdentificacion;
                    // this.cobertura.sec_tipoDoc = this.titular.sec_tipoDoc;
                     this.cobertura.PrimerNombre = this.titular.PrimerNombre;
                     this.cobertura.SegundoNombre = this.titular.SegundoNombre;
                     this.cobertura.PrimerApellido = this.titular.PrimerApellido;
                     this.cobertura.SegundoApellido = this.titular.SegundoApellido;
                     var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                     var day = date.getDate();
                     var monthIndex = date.getMonth();
                     var year = date.getFullYear();
                     this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                     this.cobertura.genero=this.titular.genero;
                     this.cobertura.sec_tipoCuenta= this.titular.sec_tipoCuenta;
                     this.cobertura.sec_plan = this.titular.sec_plan;
                     this.cobertura.noCuenta=this.titular.noCuenta;
                     this.cobertura.sec_banco= this.titular.sec_banco;
                     this.cobertura.valor_total =this.titular.valor_total;
                     this.mostrarBotones = true;
                     
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
                    this.bry=0;
                     console.log(" no existe")
                     this.obtenerDatos(cedula);
                  
                }

                /*     this.titular = result;   
                     this.cobertura.sec_titular  = this.titular.sec_titular;
                     this.cobertura.noIdentificacion= this.titular.noIdentificacion;
                     this.cobertura.sec_tipoDoc = this.titular.sec_tipoDoc;
                     this.cobertura.PrimerNombre = this.titular.PrimerNombre;
                     this.cobertura.SegundoNombre = this.titular.SegundoNombre;
                     this.cobertura.PrimerApellido = this.titular.PrimerApellido;
                     this.cobertura.SegundoApellido = this.titular.SegundoApellido;
                     var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                     var day = date.getDate();
                     var monthIndex = date.getMonth();
                     var year = date.getFullYear();
                     this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                     this.cobertura.genero=this.titular.genero;
                     this.cobertura.sec_tipoCuenta= this.titular.sec_tipoCuenta;
                     this.cobertura.sec_plan = this.titular.sec_plan;
                     this.cobertura.noCuenta=this.titular.noCuenta;
                     this.cobertura.sec_banco= this.titular.sec_banco;
                     this.cobertura.valor_total =this.titular.valor_total;
                     this.mostrarBotones = true;
                     console.log(result);
                     swal({
                         title: 'Informacion',
                         text: 'El cliente ya tiene un plan!!',
                         type: 'info',
                         allowOutsideClick: false,
                         showCancelButton: false,
                         allowEnterKey: false,
                         allowEscapeKey: false
                     });
              */
            }, error => {
                console.log(error);
            });
        }
        else {
            this.bry=0;
            this.cobertura.PrimerNombre = "";
            this.cobertura.SegundoNombre = "";
            this.cobertura.PrimerApellido = "";
            this.cobertura.SegundoApellido = "";
            this.cobertura.genero = "";
            this.cobertura.sec_tipoCuenta = 0;
            this.cobertura.sec_plan = 0;
            this.cobertura.noCuenta = "";
            this.cobertura.sec_banco = 0;
            this.cobertura.valor_total = 0;
            this.mostrarAnt = false;
            this.mostrarSig = false;

        }

    }

    obtenerDatosLocalP() {
       


            this.coberturaService.findTitularLocalbyId(this.cobertura.noIdentificacion).subscribe(result => {                
                if (result) {
                    this.bry=2;
                     console.log(result);
                     this.titular = result;   
                     this.cobertura.sec_titular  = this.titular.sec_titular;
                    // this.cobertura.noIdentificacion= this.titular.noIdentificacion;
                    // this.cobertura.sec_tipoDoc = this.titular.sec_tipoDoc;
                     this.cobertura.PrimerNombre = this.titular.PrimerNombre;
                     this.cobertura.SegundoNombre = this.titular.SegundoNombre;
                     this.cobertura.PrimerApellido = this.titular.PrimerApellido;
                     this.cobertura.SegundoApellido = this.titular.SegundoApellido;
                     var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                     var day = date.getDate();
                     var monthIndex = date.getMonth();
                     var year = date.getFullYear();
                     this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                     this.cobertura.genero=this.titular.genero;
                     this.cobertura.sec_tipoCuenta= this.titular.sec_tipoCuenta;
                     this.cobertura.sec_plan = this.titular.sec_plan;
                     this.cobertura.noCuenta=this.titular.noCuenta;
                     this.cobertura.sec_banco= this.titular.sec_banco;
                     this.cobertura.valor_total =this.titular.valor_total;
                     this.mostrarBotones = true;
                     
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
                     this.cobertura.sec_titular  = 0;
                     // this.cobertura.noIdentificacion= this.titular.noIdentificacion;
                     // this.cobertura.sec_tipoDoc = this.titular.sec_tipoDoc;
                      this.cobertura.PrimerNombre = null;
                      this.cobertura.SegundoNombre = null;
                      this.cobertura.PrimerApellido = null;
                      this.cobertura.SegundoApellido = null;
                      var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                      var day = date.getDate();
                      var monthIndex = date.getMonth();
                      var year = date.getFullYear();
                      this.titular.Fecha_Nacimiento = null;
                      this.cobertura.genero="";
                      this.cobertura.sec_tipoCuenta= 0;
                      this.cobertura.sec_plan =0;
                      this.cobertura.noCuenta=null;
                      this.cobertura.sec_banco= 0;
                      this.cobertura.valor_total =0;
                      this.bry=0;
                  
                }
            }, error => {
                console.log(error);
            });
       

    }
    obtenerDatos(cedula: any) {
        var fechaNac = new Date();
        if (cedula == true) {
            this.coberturaService.findTitularbyId(this.cobertura.noIdentificacion).subscribe(result => {
                this.titular = result;
                this.bry=0;
                this.cobertura.PrimerNombre = this.titular.PrimerNombre;
                this.cobertura.SegundoNombre = this.titular.SegundoNombre;
                this.cobertura.PrimerApellido = this.titular.PrimerApellido;
                this.cobertura.SegundoApellido = this.titular.SegundoApellido;

                this.cobertura.genero= null;
                this.cobertura.sec_tipoCuenta= 0;
                this.cobertura.sec_plan = 0;
                this.cobertura.noCuenta=null;
                this.cobertura.sec_banco= 0;
                this.cobertura.valor_total =0;

                var date = new Date(this.titular.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                this.titular.Fecha_Nacimiento = new Date(year, monthIndex, day);
                this.mostrarBotones = true;
                console.log(result);

            }, error => {
                console.log(error);
            });
        }
        else {
            this.cobertura.PrimerNombre = "";
            this.cobertura.SegundoNombre = "";
            this.cobertura.PrimerApellido = "";
            this.cobertura.SegundoApellido = "";
            this.mostrarAnt = false;
            this.mostrarSig = false;

        }

    }
    pasaporteRepetido(index: number, identificacion: string) {
        var conta = 0;
        if (this.car.carousel.totalItems == 1) {
            if (this.cobertura.Dependientes[index].noIdentificacion != this.cobertura.noIdentificacion) {
                this.pasRepetido = false;
            }
            else {
                this.pasRepetido = true;
            }
        }
        else if (this.car.carousel.totalItems > 1) {
            this.cobertura.Dependientes.forEach(dep => {
                if (dep.noIdentificacion == identificacion) {
                    console.log("Repetidos");
                    conta = conta + 1;
                }
            })
            if (conta == 1) {
                this.pasRepetido = false;
            } else {
                this.pasRepetido = true;
            }
        }
    }

    fechita(jecha: Date) {
        var date = new Date(jecha); // had to remove the colon (:) after the T in order to make it work

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        this.fechis = new Date(year, monthIndex, day);

        this.fechaTotal = ((this.fechaActual.getTime() - this.fechis.getTime()) / 86400000) / 365;

        this.fechaA = Math.round(this.fechaTotal);

        console.log("edad dependiente", this.fechaA);

        console.log("hoy", this.fechaActual);


        return this.fechaA;

    }


    obtenerDatosDep(depDatos: any, index: number, identificacion: string) {
        var conta = 0;
        console.log(identificacion);
        console.log(this.cobertura.Dependientes)
        if (this.car.carousel.totalItems == 1) {

            if (this.cobertura.Dependientes[index].noIdentificacion != this.cobertura.noIdentificacion) {
                //if (depDatos == true) {
                this.coberturaService.findDependientebyId(this.cobertura.Dependientes[index].noIdentificacion).subscribe(result => {
                    this.dep = result;
                    this.cobertura.Dependientes[index].PrimerNombre = this.dep.PrimerNombre;
                    this.cobertura.Dependientes[index].SegundoNombre = this.dep.SegundoNombre;
                    this.cobertura.Dependientes[index].PrimerApellido = this.dep.PrimerApellido;
                    this.cobertura.Dependientes[index].SegundoApellido = this.dep.SegundoApellido;
                    var date = new Date(this.dep.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work

                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();
                    this.cobertura.Dependientes[index].Fecha_Nacimiento = new Date(year, monthIndex, day);
                    this.cedDep = false;
                    this.cedRep = false;
                    this.depValid = true;


                    this.fechaTotal = ((this.fechaActual.getTime() - this.cobertura.Dependientes[index].Fecha_Nacimiento.getTime()) / 86400000) / 365;

                    this.fechaA = Math.round(this.fechaTotal);



                }, error => {
                    console.log(error);
                });

                //}
            }
            else {
                this.cobertura.Dependientes[index].PrimerNombre = "";
                this.cobertura.Dependientes[index].SegundoNombre = "";
                this.cobertura.Dependientes[index].PrimerApellido = "";
                this.cobertura.Dependientes[index].SegundoApellido = "";
                this.cedDep = true;
                this.cedRep = true;
            }
        }
        else if (this.car.carousel.totalItems > 1) {

            console.log(this.cobertura.Dependientes[index].noIdentificacion);
            this.cobertura.Dependientes.forEach(dep => {
                if (dep.noIdentificacion == identificacion) {
                    console.log("Repetidos");
                    conta = conta + 1;
                }
            })
            if (conta == 1) {
                if (this.cobertura.Dependientes[index].noIdentificacion != this.cobertura.noIdentificacion) {
                    this.coberturaService.findDependientebyId(this.cobertura.Dependientes[index].noIdentificacion).subscribe(result => {
                        this.dep = result;
                        this.cobertura.Dependientes[index].PrimerNombre = this.dep.PrimerNombre;
                        this.cobertura.Dependientes[index].SegundoNombre = this.dep.SegundoNombre;
                        this.cobertura.Dependientes[index].PrimerApellido = this.dep.PrimerApellido;
                        this.cobertura.Dependientes[index].SegundoApellido = this.dep.SegundoApellido;
                        var date = new Date(this.dep.Fecha_Nacimiento); // had to remove the colon (:) after the T in order to make it work

                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        this.cobertura.Dependientes[index].Fecha_Nacimiento = new Date(year, monthIndex, day);
                        this.cedDep = false;
                        this.cedRep = false;
                    }, error => {
                        console.log(error);
                    });
                }
                else {
                    this.cobertura.Dependientes[index].PrimerNombre = "";
                    this.cobertura.Dependientes[index].SegundoNombre = "";
                    this.cobertura.Dependientes[index].PrimerApellido = "";
                    this.cobertura.Dependientes[index].SegundoApellido = "";
                    this.cedDep = true;
                    this.cedRep = true;
                }
            }
            this.cedDep = true;
            this.cedRep = true;

        }
        else {
            this.cobertura.Dependientes[index].PrimerNombre = "";
            this.cobertura.Dependientes[index].SegundoNombre = "";
            this.cobertura.Dependientes[index].PrimerApellido = "";
            this.cobertura.Dependientes[index].SegundoApellido = "";
            this.cedDep = true;
            this.cedRep = true;
        }
    }
    CambioParentesco() {
        this.parentescos.forEach(element => {
            element.estado = 1
        });
        this.cobertura.Dependientes.forEach(element => {
            if (element.sec_parentesco == 1 || element.sec_parentesco == 3 || element.sec_parentesco == 5) {
                this.parentescos[this.parentescos.findIndex(x => x.sec_parentesco === element.sec_parentesco)].estado = -1;
            }
        })
    }
    depOtro(dependiente: Dependientes) {

        if (dependiente.sec_parentesco == 6) {
            this.mostrarDep = true;
        } else {
            this.mostrarDep = false;
        }
    }
    CambioPlan() {
        this.planSel = this.plan.filter(plan => plan.sec_plan == this.cobertura.sec_plan);
        var itTotal = this.car.carousel.totalItems;
        if (itTotal >= 0) {
            for (var i = 0; i < itTotal; i++)
                this.cobertura.Dependientes[i].Valor = this.planSel[0].Valor;
            this.cobertura.valor_total = this.planSel[0].Valor;
        }

    }

    cambioTipo() {
        if (this.cobertura.sec_tipoDoc == 1) {
            this.cedulaTit = true;
            this.pasTit = false;
            this.cobertura.noIdentificacion = "";
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
            this.mostrarBotones = false;
        } else if (this.cobertura.sec_tipoDoc == 3) {
            this.cedulaTit = false;
            this.pasTit = true;
            this.cobertura.noIdentificacion = "";
            this.titular.PrimerNombre = "";
            this.titular.SegundoNombre = "";
            this.titular.PrimerApellido = "";
            this.titular.SegundoApellido = "";
            this.mostrarBotones = true;
        }
        else if (this.cobertura.sec_tipoDoc == 0) {
            this.cedulaTit = false;
            this.pasTit = false;
            this.cobertura.noIdentificacion = "";
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
                    text: 'Existió un error al almacenar la cobertura',
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



    cambioDep(i: number) {
        if (this.cobertura.Dependientes[i].sec_tipoDoc == 1) {
            this.cedulaDep = true;
            this.pasDep = false;
            this.cobertura.Dependientes[i].noIdentificacion = "";
            this.cobertura.Dependientes[i].PrimerNombre = "";
            this.cobertura.Dependientes[i].SegundoNombre = "";
            this.cobertura.Dependientes[i].PrimerApellido = "";
            this.cobertura.Dependientes[i].SegundoApellido = "";
        } else if (this.cobertura.Dependientes[i].sec_tipoDoc == 3) {
            this.cedulaDep = false;
            this.pasDep = true;
            this.cobertura.Dependientes[i].noIdentificacion = "";
            this.cobertura.Dependientes[i].PrimerNombre = "";
            this.cobertura.Dependientes[i].SegundoNombre = "";
            this.cobertura.Dependientes[i].PrimerApellido = "";
            this.cobertura.Dependientes[i].SegundoApellido = "";
        }
        else if (this.cobertura.Dependientes[i].sec_tipoDoc == 0) {
            this.cedulaDep = false;
            this.pasDep = false;
            this.cobertura.Dependientes[i].noIdentificacion = "";
            this.cobertura.Dependientes[i].PrimerNombre = "";
            this.cobertura.Dependientes[i].SegundoNombre = "";
            this.cobertura.Dependientes[i].PrimerApellido = "";
            this.cobertura.Dependientes[i].SegundoApellido = "";

        }


    }

}