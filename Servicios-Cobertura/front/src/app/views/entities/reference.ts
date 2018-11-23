import { Contact } from './Contact';

export class Reference {
    constructor(public Id?: number,
        public PaternalSurname?: string,
        public MaternalSurname?: string,
        public Names?: string,
        public CreationDate?: Date,
        public DocumentType?: string,
        public DocumentNumber?: string,
        public Salary?: number,
        public MaritalStatus?: string,
        public Children?: number,
        public Age?: number,
        public City?: string,
        public Address?: string,
        public Pep?: boolean,
        public EnterPrise?: string,
        public OriginId?: number,
        public PlanId?: number,
        public ChannelId?: number,
        public userId?: number,
        public Status?: number,
        public PhoneNumbers?: Contact[],
        public OperationId?: number,
        public AssignedUserId?: number,
        public CampaignId?: number,
        public ColdDate?: number) {
        this.PlanId = 0;
        this.CampaignId = 0;
        this.ColdDate = 0;
    }
}
