import Timer = NodeJS.Timer;
import { IShortcutMap } from "../interfaces/IShortcutMap";
import { IShortcut } from "../interfaces/IShortcut";
import { IShortcutMapItem } from "../interfaces/IShortcutMapItem";
import { KeysyPeasyError } from "./KeasyPeasyError";

export class Shortcuts {

    private _shortcuts: IShortcutMap = {};

    constructor(element: HTMLElement = document.documentElement) {
        element.addEventListener("keydown", this._debounce(this._handler.bind(this)));
    }

    private _handler(event: KeyboardEvent): void {
        const shortcut = this._shortcuts[event.key.toString().toLowerCase()];

        if (shortcut !== undefined && event.altKey === !!shortcut.altKey) {
            shortcut.callback(event);
        }
    }

    private _debounce(func: (event) => void, wait = 550) {
        let h: Timer;
        return event => {
            clearTimeout(h);
            h = setTimeout(() => func(event), wait);
        };
    }

    public register(contextId: string, shortcuts: Array<IShortcut>): void {
        this.remove(contextId);
        for (let i = 0, ii = shortcuts.length; i < ii; i++) {
            const shortcutKey = shortcuts[i].key.toString().toLowerCase();
            if (this._shortcuts[shortcutKey] !== undefined) {
                throw new KeysyPeasyError("Duplicate shortcut", shortcuts[i]);
            }
            const shortcutMap: IShortcutMapItem = shortcuts[i];
            shortcutMap.contextId = contextId;
            this._shortcuts[shortcutKey] = shortcutMap;
        }

    }

    public getHandlers(): IShortcutMap {
        return this._shortcuts;
    }

    public remove(contextId: string): void {
        for (let key in this._shortcuts) {
            if (this._shortcuts[key].contextId === contextId) {
                delete this._shortcuts[key];
            }
        }
    }
}