/**
 * requestAnimationFrame and cancelAnimationFrame polyfill
 * based on the polyfill by Erik Moller, http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

(function(){
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    var global = typeof window === 'undefined' ? {} : window;

    for(var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
        global.requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
        global.cancelAnimationFrame = global[vendors[x]+'CancelAnimationFrame'] || global[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame){
        global.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, Math.round(16.666 - (currTime - lastTime)));
            var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!global.cancelAnimationFrame){
        global.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }



    //if this is Node, AMD, Browserify, export the module
    function attach(){
        var exports = global.requestAnimationFrame;
        exports.cancel = global.cancelAnimationFrame;
        return exports;
    }

    if( typeof define == 'function' && define.amd ){
        define(attach);
    } else if( typeof module !== 'undefined' ){
        module.exports = attach();
    }

})();

