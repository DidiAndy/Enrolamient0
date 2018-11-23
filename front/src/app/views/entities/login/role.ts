import { ModuleRole } from './modulerole';

export class Role {
  constructor(public Id?: number,
    public Name?: string,
    public ModuleRole?: ModuleRole[],
    public Status?: boolean) {
    this.Status = true;
  }
}
