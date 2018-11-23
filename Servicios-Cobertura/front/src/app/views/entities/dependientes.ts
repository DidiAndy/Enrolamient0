export class Dependientes{
    constructor(public Id?: number,
        public sec_tipoDoc?:number,
        public noIdentificacion?:string,
        public PrimerNombre?: string,
        public SegundoNombre?: string,
        public PrimerApellido?: string,
        public SegundoApellido?: string,
        public Fecha_Nacimiento?: Date,
        public genero?:string,      
        public sec_parentesco?: number,
        public sec_titular?: number,
        public otro_paretesco?: string,
        public Valor?: number,
        public fecha_creacion?:Date,  
        public Status?: boolean) {
        this.Status = true;
        this.genero= null;
    }
}
