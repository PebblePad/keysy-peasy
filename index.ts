interface IShortcut {
    key: string|number;
    callback(event: KeyboardEvent): void;
    altKey?: boolean;
}
interface IShortcutMapItem extends IShortcut{
    contextId?:string;
}
interface IShortcutMap {
    [key: string]: IShortcutMapItem
}

class KeysyPeasyError extends Error {
    public shortcut: IShortcut;

    constructor(message: string, shortcut: IShortcut) {
        super(message);
        this.shortcut = shortcut;
    }
}

class Shortcuts {

    private _shortcuts: IShortcutMap = {};

    constructor(element: HTMLElement = document.documentElement) {
        element.addEventListener("keydown", this._debounce(this._handler.bind(this)));
    }

    private _handler(event: KeyboardEvent): void {
        const shortcut = this._shortcuts[event.key];
        if (event.altKey === !!shortcut.altKey) {
            shortcut.callback(event);
        }
    }

    private _debounce(func: (event) => void, wait = 550) {
        let h: number;
        return event => {
            clearTimeout(h);
            h = setTimeout(() => func(event), wait);
        };
    }


    public register(contextId: string, shortcuts: Array<IShortcut>): void {
        this.remove(contextId);

        for (let i = 0, ii = shortcuts.length; i < ii; i++) {
            const shortcutKey = shortcuts[i].key.toString();
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

const shortcuts = new Shortcuts();
shortcuts.register("text-editor", [{
    key:"q",
    callback: function(event) {
        alert("pressed alt + q")
    },
    altKey:true
},{
    key:3,
    callback: function(event) {
        alert("pressed 3")
    }
}]);
