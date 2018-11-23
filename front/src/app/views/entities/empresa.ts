export class Empresa{
    constructor(public sec_empresa?: number,
        public descripcion?:string,
        public logotipo?: string,         
        public Status?: boolean) {                        
        this.Status = true;
    }
}
