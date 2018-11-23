import { ChildMenu } from './childmenu';

export class MenuData {
    constructor(public Name?: string,
        public Route?: string,
        public Childs?: ChildMenu[]) { }
}