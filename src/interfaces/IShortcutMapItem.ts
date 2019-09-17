import { IShortcut } from "./IShortcut";

export interface IShortcutMapItem extends IShortcut {
    contextId?:string;
}