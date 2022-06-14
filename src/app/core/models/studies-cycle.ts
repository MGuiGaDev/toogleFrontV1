export class StudiesCycle {
    code?: string;
    name?: string;
    family?: string;
    level?: string;

    constructor(name?: string, code?: string) {
        this.name = name;
        this.code = code;
    }
}
