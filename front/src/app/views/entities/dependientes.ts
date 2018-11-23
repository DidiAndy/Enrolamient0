export class Dependientes {
    constructor(public Id?: number,
        public sec_dependiente?: number,
        public NoIdentificacion?: string,
        public PrimerNombre?: string,
        public SegundoNombre?: string,
        public PrimerApellido?: string,
        public SegundoApellido?: string,
        public sec_titular?: number,
        public otro_paretesco?: string,
        public Fecha_Nacimiento?: Date,
        public genero?: number,
        public Valor?: number,
        public fecha_Creacion?: Date,
        public sec_parentesco?: number,
        public sec_tipoDoc?: number,
        public Status?: boolean) {
        this.Status = true;
    }
}
