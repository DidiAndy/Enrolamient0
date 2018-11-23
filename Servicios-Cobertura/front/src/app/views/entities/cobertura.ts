import { Dependientes } from "./dependientes";

export class Cobertura{
    constructor(public Id?: number,
        public sec_titular?:number,
        public sec_tipoDoc?:number,
        public noIdentificacion?:string,
        public PrimerNombre?: string,
        public SegundoNombre?: string,
        public PrimerApellido?: string,
        public SegundoApellido?: string,
        public noDependientes?:number,
        public Dependientes?: Dependientes[],
        public sec_plan?: number,
        public sec_tipoCuenta?: number,
        public noCuenta?: string,
        public sec_banco?: number,
        public sec_empresa?: number,
        public valor_total?:number,
        public Fecha_Nacimiento?:Date,
        public genero?:string,
        public fecha_creacion?:Date,  
        public Status?: boolean) {                        
        this.Status = true;
        this.genero= null;
    }
}
