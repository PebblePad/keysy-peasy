interface IShortcut {
    key: string|number;
    callback(event:KeyboardEvent): void ;
    altKey?: boolean;
}
interface IShortcutMapItem extends IShortcut {
    contextId?:string;
}
interface IShortcutMap {
    [key: string]: IShortcutMapItem
}
