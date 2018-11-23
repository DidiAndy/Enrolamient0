export class Banco{
    constructor(public Id?: number,
        public descripcion?: string,
        public sec_banco?:string,
        public Status?: boolean) {                        
            this.Status = true;
        }
}