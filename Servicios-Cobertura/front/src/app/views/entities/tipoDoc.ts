export class tipoDoc{
    constructor(public Id?: number,
        public IdentificationType?: string,
        
        public DocumentCode?: string,
        
        public Status?: boolean) {                        
            this.Status = true;
        }
}