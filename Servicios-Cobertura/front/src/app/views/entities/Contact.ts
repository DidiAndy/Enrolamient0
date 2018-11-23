export class Contact {
    constructor(public Id?: number,
        public Value?: string,
        public OperationId?: number,
        public ProspectId?: number,
        public ContactType?: number) {
        this.ContactType = 0;
    }
}
