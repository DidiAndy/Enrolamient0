export class tipoCuenta{
    constructor(public Id?: number,
        public Descripcion?: string,
        public sec_tipoCuenta?: number,
        public Status?: boolean) {                        
            this.Status = true;
        }
}