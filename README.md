# r-a-f


requestAnimationFrame for the browser and node. Based on the [polyfill by Erik Moller](http://paulirish.com/2011/requestanimationframe-for-smart-animating/). Supports AMD, Node, browserify and polyfills the `window` object in browser.

```js

var rAF = require('r-a-f');

rAF(function update(deltaTime){
    //an infinite animation loop
    rAF(update);
});

//get an id for a 
var rAFID = rAF(callback);

//cancel that request
rAF.cancel(rAFID);
```


## Why this one

I made another `requestAnimationFrame` polyfill because the best one I found on NPM used `requestAnimationFrame.call` and I prefer to avoid that overhead. I wanted one module that worked in AMD and Node including Browserify and called the native function directly (when available) instead of wrapping it.


**MIT License**
