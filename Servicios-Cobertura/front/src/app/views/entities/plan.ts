export class Plan {
    constructor(public Id?: number,
        public sec_plan?:number,
        public Description?: string,
        public Valor?:number,
        public Status?: boolean) {
        this.Status = true;
    }
}

