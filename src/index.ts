interface IShortcut {
    key: string|number;
    callback: Function;
    altKey: boolean;
}


class KeysyPeasyError extends Error {
    public shortcut: IShortcut;

    constructor(message: string, shortcut: IShortcut) {
        super(message);
        this.shortcut = shortcut;
    }
}

class Shortcuts {

    private _shortcuts: any = {};

    constructor(element: HTMLElement = document.documentElement) {
        element.addEventListener("keydown", this._debounce(this._handler.bind(this)));
    }

    private _handler(event: KeyboardEvent): void {
        const shortcut = this._shortcuts[event.key];
        if (event.altKey === shortcut.altKey) {
            shortcut.callback(event);
        }
    }

    private _debounce(func: () => void, wait = 550) {
        let h: number;
        return () => {
            clearTimeout(h);
            h = setTimeout(() => func(), wait);
        };
    }


    public register(id: string, shortcuts: Array<IShortcut>): void {
        this.remove(id);
        for (let i = 0, ii = shortcuts.length; i < ii; i++) {
            if (this._shortcuts[shortcuts[i].key] !== undefined) {
                throw new KeysyPeasyError("Duplicate shortcut", shortcuts[i]);
            }
            const shortcutMap: any = shortcuts[i];
            shortcutMap.id = id;
            this._shortcuts[shortcuts[i].key] = shortcutMap;
        }

    }

    public getHandlers(): any {
        return this._shortcuts;
    }

    public remove(id: string): void {
        for (let key in this._shortcuts) {
            if (this._shortcuts[key].id === id) {
                delete this._shortcuts[key];
            }
        }
    }
}

export {Shortcuts};

export default Shortcuts;
