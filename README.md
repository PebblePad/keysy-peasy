![PebblePad](https://www.pebblepad.co.uk/images/logo/logo.png)

[![Build Status](https://travis-ci.org/PebblePad/keysy-peasy.svg?branch=master)](https://travis-ci.org/PebblePad/keysy-peasy)

## Keysy-peasy
Keysy-peasy makes keyboard shortcuts easy peasy.


Start by importing the package
```JavaScript
import { Shortcuts } from 'keysy-peasy';

const shortcuts = new Shortcuts(document);
```
The first param passed to `Shortcuts` is the element upon which the handler will be registered. If nothing is passed, it will default to `document.documentElement`.

All shortcuts exist within the scope of the `Shortcuts` instance. Within here, you can add an array of shortcuts and associate it with a namespace. 
The idea here is that you can register and remove shortcuts in a group, which is useful when you move between views with different sets of shortcuts.

### Registering a handler
As mentioned before, Keysy-peasy works with contexts; the idea is that you can register a set of handlers, for a given view or template and remove them when your done. Let's register a handler for a text editor.

```JavaScript
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
    
```


```Typescript
    interface IShortcut {
        key: string|number;
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

```JavaScript
    const shortcutMap = shortcuts.getHandlers();
```


### need AMD?
We build to AMD, but you'll need to include it directly from `keysy-peasy/dist/amd/index.js`
