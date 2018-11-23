import { Module } from '../module';

export class ModuleRole {
    constructor(public Id?: number,
        public RoleId?: number,
        public Module?: Module,
        public Status?: number) {
        this.Status = 1;
    }
}