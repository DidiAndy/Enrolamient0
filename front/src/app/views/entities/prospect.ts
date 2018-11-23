import { Contact } from './Contact';

export class Prospect {
  constructor(public Id?: number,
    public FullName?: string,
    public City?: string,
    public DocumentType?: string,
    public DocumentNumber?: string,
    public Salary?: number,
    public MaritalStatus?: string,
    public Children?: number,
    public Age?: number,
    public Status?: number,
    public Address?: string,
    public EnterPrise?: string,
    public PhoneNumbers?: Contact[],
    public OperationId?: number,
    public Emails?: Contact[],
    public CampaignId?: number,
    public CampaignName?: string) { }
}
