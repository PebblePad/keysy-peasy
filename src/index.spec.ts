import {expect} from 'chai';
import {Shortcuts} from './';

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
            keyCode: 56,
            callback,
            altKey: false
        };
        shortcuts.register(testId, [exampleShortcut]);
        const shortcut = shortcuts.getHandlers()[exampleShortcut.keyCode];
        expect(shortcut.keyCode).to.equal(exampleShortcut.keyCode);
        expect(shortcut.id).to.equal(testId);
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
        keyCode: 56,
        callback,
        altKey: false
    };
    const exampleShortcut2 = {
        keyCode: 57,
        callback,
        altKey: true
    };
    shortcuts.register(firstTestId, [exampleShortcut1, exampleShortcut2]);

    const exampleShortcut3 = {
        keyCode: 58,
        callback,
        altKey:false
    };
    shortcuts.register(secondTestId, [exampleShortcut3]);
    it('should correctly register events with different Ids', () => {
        const shortcutMap = shortcuts.getHandlers();
        expect(shortcutMap[exampleShortcut1.keyCode]).to.not.be.undefined;
        expect(shortcutMap[exampleShortcut2.keyCode]).to.not.be.undefined;
        expect(shortcutMap[exampleShortcut3.keyCode]).to.not.be.undefined;
    });
    it('should remove events by domain id', () => {
        shortcuts.remove(firstTestId);
        const shortcutMap = shortcuts.getHandlers();
        expect(shortcutMap[exampleShortcut1.keyCode]).to.be.undefined;
        expect(shortcutMap[exampleShortcut2.keyCode]).to.be.undefined;
        expect(shortcutMap[exampleShortcut3.keyCode]).to.not.be.undefined;
    });
});
