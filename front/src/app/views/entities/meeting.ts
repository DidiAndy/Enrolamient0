export class Meeting {
    constructor(public Id?: number,
        public MeetingDate?: Date,
        public Observation?: string,
        public StatusId?: number,
        public StatusName?: string,
        public ProspectId?: number,
        public OperationId?: number,
        public isRefered?: boolean,
        public WinningReasonId?: number,
        public WinningReasonName?: string) {
        this.StatusId = 0;
        this.WinningReasonId = null;
    }
}

