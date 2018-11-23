export class TokenCreated {
  constructor(public UserId?: number,
    public Token?: string,
    public RoleId?: number,
    public FirstLogin?: boolean) { }
}