import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
    API_ENDPOINT: string;
    CONTROL_ENDPOINT: string;
    constructor() {
        //this.API_ENDPOINT = '/Cobertura/api/'; //para liberar
         this.API_ENDPOINT = '/api/'; //para pruebas

    }
}
