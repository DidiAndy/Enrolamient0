import { Dependientes } from "./dependientes";

export class Cobertura {
    constructor(
        public Id?: number,
        public sec_titular?: number,
        public NoIdentificacion?: string,
        public PrimerNombre?: string,
        public SegundoNombre?: string,
        public PrimerApellido?: string,
        public SegundoApellido?: string,
        public sec_plan?: number,
        public valor_total?: number,
        public sec_tipoCuenta?: number,
        public noCuenta?: string,
        public div_pago?: string,
        public sec_banco?: number,
        public sec_empresa?: number,
        public sec_tipoDoc?: number,
        public Fecha_Nacimiento?: Date,
        public genero?: number,
        public fecha_Creacion?: Date,
        public noDependientes?: number,
        public dependientes?: Dependientes[],
        public Status?: boolean
    ) {
        this.Status = true;
    }
}

     