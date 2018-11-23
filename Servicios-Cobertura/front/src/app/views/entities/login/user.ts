export class User {
    constructor(public Id?: number,
        public IdentificationNumber?: string,
        public UserName?: string,
        public Email?: string,
        public Status?: boolean,
        public RoleId?: number,
        public RoleName?: string,
        public CellId?: number,
        public CellName?: string,
        public ExecutiveCategoryId?: number,
        public ExecutiveCategoryName?: string,
        public CurveId?: number,
        public CurveName?: string) {
        this.Id = 0;
        this.CellId = 0;
        this.RoleId = 0;
        this.Status = true;
        this.CurveId = 0;
        this.ExecutiveCategoryId = 0;
    }
}