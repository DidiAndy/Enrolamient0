export class Plan {
    constructor(public Id?: number,
        public Description?: string,
        public Valor?: number,        
        public Status?: boolean) {
        this.Status = true;
    }
}