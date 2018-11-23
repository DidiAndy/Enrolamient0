export class Call {
    constructor(public Id?: number,
        public RegisterDate?: Date,
        public Observation?: string,
        public OperationId?: number,
        public ContactId?: number,
        public StatusId?: number,
        public ProspectId?: number,
        public MeetingDate?: Date,
        public ContactNumber?: string) {
        this.ContactId = 0;
        this.OperationId = 0;
        this.StatusId = 0;
    }
}
