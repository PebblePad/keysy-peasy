"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var _1 = require("./");
var document = {
    addEventListener: function (event, callback) {
    }
};
describe('Registering events', function () {
    var shortcuts = new _1.Shortcuts(document);
    var callback = function () {
    };
    it('should correctly initialize the shortcut', function () {
        var testId = "domain test";
        var exampleShortcut = {
            keyCode: 56,
            callback: callback,
            altKey: false
        };
        shortcuts.register(testId, [exampleShortcut]);
        var shortcut = shortcuts.getHandlers()[exampleShortcut.keyCode];
        chai_1.expect(shortcut.keyCode).to.equal(exampleShortcut.keyCode);
        chai_1.expect(shortcut.id).to.equal(testId);
        chai_1.expect(shortcut.altKey).to.equal(exampleShortcut.altKey);
        chai_1.expect(shortcut.callback).to.equal(exampleShortcut.callback);
    });
});
describe('removing events', function () {
    var shortcuts = new _1.Shortcuts(document);
    var callback = function () {
    };
    var firstTestId = "first test";
    var secondTestId = "second test";
    var exampleShortcut1 = {
        keyCode: 56,
        callback: callback,
        altKey: false
    };
    var exampleShortcut2 = {
        keyCode: 57,
        callback: callback,
        altKey: true
    };
    shortcuts.register(firstTestId, [exampleShortcut1, exampleShortcut2]);
    var exampleShortcut3 = {
        keyCode: 58,
        callback: callback,
        altKey: false
    };
    shortcuts.register(secondTestId, [exampleShortcut3]);
    it('should correctly register events with different Ids', function () {
        var shortcutMap = shortcuts.getHandlers();
        chai_1.expect(shortcutMap[exampleShortcut1.keyCode]).to.not.be.undefined;
        chai_1.expect(shortcutMap[exampleShortcut2.keyCode]).to.not.be.undefined;
        chai_1.expect(shortcutMap[exampleShortcut3.keyCode]).to.not.be.undefined;
    });
    it('should remove events by domain id', function () {
        shortcuts.remove(firstTestId);
        var shortcutMap = shortcuts.getHandlers();
        chai_1.expect(shortcutMap[exampleShortcut1.keyCode]).to.be.undefined;
        chai_1.expect(shortcutMap[exampleShortcut2.keyCode]).to.be.undefined;
        chai_1.expect(shortcutMap[exampleShortcut3.keyCode]).to.not.be.undefined;
    });
});
//# sourceMappingURL=index.spec.js.map