import { Shortcuts } from "../classes/Shortcuts";
import { KeysyPeasyError } from "..";

Object.defineProperty(document, "addEventListener", (event: string, callback: () => void) => {});

describe('When registering events', () => {
    const shortcuts = new Shortcuts(document.documentElement);
    const callback = () => {};

    const domainTestId = "domain test";
    const firstTestId = "first test";
    const secondTestId = "second test";

    const exampleShortcut = {
        key: "t",
        callback,
        altKey: false
    };

    const exampleShortcut1 = {
        key: "q",
        callback,
        altKey: false
    };

    const exampleShortcut2 = {
        key: "f",
        callback,
        altKey: true
    };

    const exampleShortcut3 = {
        key: "p",
        callback,
        altKey:false
    };

    shortcuts.register(firstTestId, [exampleShortcut1, exampleShortcut2]);
    shortcuts.register(secondTestId, [exampleShortcut3]);

    test('it should correctly initialise the shortcut', () => {
        shortcuts.register(domainTestId, [exampleShortcut]);
        const shortcut = shortcuts.getHandlers()[exampleShortcut.key];
        expect(shortcut.key).toEqual(exampleShortcut.key);
        expect(shortcut.contextId).toEqual(domainTestId);
        expect(shortcut.altKey).toEqual(exampleShortcut.altKey);
        expect(shortcut.callback).toEqual(exampleShortcut.callback);
    });

    test("it should not let you register two of the same shortcut", () => {
        expect(() => shortcuts.register("random-id", [exampleShortcut]))
            .toThrow(new KeysyPeasyError("Duplicate shortcut", exampleShortcut));
    });

    test('it should correctly register events with different Ids', () => {
        const shortcutMap = shortcuts.getHandlers();
        expect(shortcutMap[exampleShortcut1.key]).toBeDefined();
        expect(shortcutMap[exampleShortcut2.key]).toBeDefined();
        expect(shortcutMap[exampleShortcut3.key]).toBeDefined();
    });

    describe('and an event is removed', () => {
        test('it should remove events by domain id', () => {
            shortcuts.remove(firstTestId);
            const shortcutMap = shortcuts.getHandlers();
            expect(shortcutMap[exampleShortcut1.key]).toBeUndefined();
            expect(shortcutMap[exampleShortcut2.key]).toBeUndefined();
            expect(shortcutMap[exampleShortcut3.key]).toBeDefined();
        });
    });
});