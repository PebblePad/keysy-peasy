import { expect } from 'chai';
import { Shortcuts } from './';

const document = {
    addEventListener: (event: string, callback: () => void) => {
    }
} as HTMLElement;

describe('Registering events', () => {
    const shortcuts = new Shortcuts(document);
    const callback = () => {
    };

    it('should correctly initialize the shortcut', () => {
        const testId = "domain test";
        const exampleShortcut = {
            key: "q",
            callback,
            altKey: false
        };
        shortcuts.register(testId, [exampleShortcut]);
        const shortcut = shortcuts.getHandlers()[exampleShortcut.key];
        expect(shortcut.key).to.equal(exampleShortcut.key);
        expect(shortcut.contextId).to.equal(testId);
        expect(shortcut.altKey).to.equal(exampleShortcut.altKey);
        expect(shortcut.callback).to.equal(exampleShortcut.callback);
    });
});

describe('removing events', () => {
    const shortcuts = new Shortcuts(document);
    const callback = () => {
    };
    const firstTestId = "first test";
    const secondTestId = "second test";
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
    shortcuts.register(firstTestId, [exampleShortcut1, exampleShortcut2]);

    const exampleShortcut3 = {
        key: "p",
        callback,
        altKey:false
    };
    shortcuts.register(secondTestId, [exampleShortcut3]);
    it('should correctly register events with different Ids', () => {
        const shortcutMap = shortcuts.getHandlers();
        expect(shortcutMap[exampleShortcut1.key]).to.not.be.undefined;
        expect(shortcutMap[exampleShortcut2.key]).to.not.be.undefined;
        expect(shortcutMap[exampleShortcut3.key]).to.not.be.undefined;
    });
    it('should remove events by domain id', () => {
        shortcuts.remove(firstTestId);
        const shortcutMap = shortcuts.getHandlers();
        expect(shortcutMap[exampleShortcut1.key]).to.be.undefined;
        expect(shortcutMap[exampleShortcut2.key]).to.be.undefined;
        expect(shortcutMap[exampleShortcut3.key]).to.not.be.undefined;
    });
});
