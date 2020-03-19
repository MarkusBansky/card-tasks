import {TaskType} from "./TaskType";

export default class Task {
    private _value: string;
    private _type: TaskType;
    private _hidden: boolean;

    constructor(data: any) {
        this._type = data.type;

        this._value = data.value;
        this._hidden = data.hidden;
    }

    toJSON() {
        return {
            value: this._value,
            type: this._type,
            hidden: this._hidden
        }
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get type(): TaskType {
        return this._type;
    }

    set type(value: TaskType) {
        this._type = value;
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
    }
}