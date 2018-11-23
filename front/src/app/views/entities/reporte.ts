export class Reporte {
    constructor(
        public sec_empresa?:number,
        public fch_inicio?: Date,
        public fch_final?:Date,
        ){
            this.fch_inicio = null;
            this.fch_final = null;
        };
}
