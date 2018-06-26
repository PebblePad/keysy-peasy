interface IShortcut {
    key: string|number;
    callback: Function;
    altKey?: boolean;
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

    private _debounce(func: (event) => void, wait = 550) {
        let h: number;
        return event => {
            clearTimeout(h);
            h = setTimeout(() => func(event), wait);
        };
    }


    public register(id: string, shortcuts: Array<IShortcut>): void {
        this.remove(id);

        for (let i = 0, ii = shortcuts.length; i < ii; i++) {
            const shortcutKey = shortcuts[i].key.toString();
            if (this._shortcuts[shortcutKey] !== undefined) {
                throw new KeysyPeasyError("Duplicate shortcut", shortcuts[i]);
            }
            const shortcutMap: any = shortcuts[i];
            shortcutMap.id = id;
            this._shortcuts[shortcutKey] = shortcutMap;
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
