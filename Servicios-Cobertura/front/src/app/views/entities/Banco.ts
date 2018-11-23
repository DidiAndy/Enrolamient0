export class Banco{
    constructor(public Id?: number,
        public Descripcion?: string,
        public sec_banco?:string,
        public Status?: boolean) {                        
            this.Status = true;
        }
}