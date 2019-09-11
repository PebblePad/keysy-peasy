import { IShortcut } from "../interfaces/IShortcut";

export class KeysyPeasyError extends Error {
    public shortcut: IShortcut;

    constructor(message: string, shortcut: IShortcut) {
        super(message);
        this.shortcut = shortcut;
    }
}