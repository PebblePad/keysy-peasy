var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var KeysyPeasyError = /** @class */ (function (_super) {
    __extends(KeysyPeasyError, _super);
    function KeysyPeasyError(message, shortcut) {
        var _this = _super.call(this, message) || this;
        _this.shortcut = shortcut;
        return _this;
    }
    return KeysyPeasyError;
}(Error));
var Shortcuts = /** @class */ (function () {
    function Shortcuts(element) {
        if (element === void 0) { element = document.documentElement; }
        this._shortcuts = {};
        element.addEventListener("keydown", this._debounce(this._handler.bind(this)));
    }
    Shortcuts.prototype._handler = function (event) {
        var shortcut = this._shortcuts[event.key];
        if (event.altKey === !!shortcut.altKey) {
            shortcut.callback(event);
        }
    };
    Shortcuts.prototype._debounce = function (func, wait) {
        if (wait === void 0) { wait = 550; }
        var h;
        return function (event) {
            clearTimeout(h);
            h = setTimeout(function () { return func(event); }, wait);
        };
    };
    Shortcuts.prototype.register = function (contextId, shortcuts) {
        this.remove(contextId);
        for (var i = 0, ii = shortcuts.length; i < ii; i++) {
            var shortcutKey = shortcuts[i].key.toString();
            if (this._shortcuts[shortcutKey] !== undefined) {
                throw new KeysyPeasyError("Duplicate shortcut", shortcuts[i]);
            }
            var shortcutMap = shortcuts[i];
            shortcutMap.contextId = contextId;
            this._shortcuts[shortcutKey] = shortcutMap;
        }
    };
    Shortcuts.prototype.getHandlers = function () {
        return this._shortcuts;
    };
    Shortcuts.prototype.remove = function (contextId) {
        for (var key in this._shortcuts) {
            if (this._shortcuts[key].contextId === contextId) {
                delete this._shortcuts[key];
            }
        }
    };
    return Shortcuts;
}());
var shortcuts = new Shortcuts();
shortcuts.register("text-editor", [{
        key: "q",
        callback: function (event) {
            alert("pressed alt + q");
        },
        altKey: true
    }, {
        key: 3,
        callback: function (event) {
            alert("pressed 3");
        }
    }]);
//# sourceMappingURL=index.js.map