export class Status {
    constructor(
        public Id?: number,
        public Name?: string,
        public StatusTypeId?: number,
        public StatusTypeName?: string) {
        this.StatusTypeId = 0;
    }
}
