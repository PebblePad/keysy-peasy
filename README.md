![PebblePad](https://www.pebblepad.co.uk/images/logo/logo.png)
# Keysy-peasy
Keysy-peasy makes keyboard shortcuts easy peasy.


Start by importing the package
```JavaScript
import { Shortcuts } from 'keysy-peasy';

const shortcuts = new Shortcuts(document);
```

Keysy-peasy works with contexts; key handlers can only be registered once for a given instance of `Shortcuts`.

### Registering a handler
As mentioned before, Keysy-peasy works with contexts; the idea is that you can register a set of handlers, for a given view or template and remove them when your done. Let's register a handler for a text editor.

```JavaScript
    shortcuts.register("text-editor", [{
        keyCode:45,
        callback: function(event) {
            alert("pressed alt + ins")
        },
        altKey:true
    },{
        keyCode:54,
        callback: function(event) {
            alert("pressed w")
        }
    }]);
    
```

Firstly, [find a keyCode](http://keycode.info/); this denotes which key we are attaching the handler to. Each shortcut mentioned above adheres to the interface:
```Typescript
    interface IShortcut {
        keyCode: number;
        callback: Function;
        altKey: boolean;
    }
```
### Removing a handler
Given that we have added our shortcuts by a namespace, they can be removed by namespace:
```JavaScript
    shortcuts.remove("text-editor")
```
### Getting a list of shortcuts
One of the best parts of Keysy-peasy is that we have full control of our shortcuts; it's possible to query as to which shortcuts are registered at any given time. This makes it possible to dynamically show the user the current shortcuts
