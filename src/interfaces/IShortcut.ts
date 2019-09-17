export interface IShortcut {
    key: string|number;
    callback(event:KeyboardEvent): void ;
    altKey?: boolean;
}