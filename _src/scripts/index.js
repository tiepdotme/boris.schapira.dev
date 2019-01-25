/**
 * @license
 * touchtap-event <http://github.com/Tyriar/touchtap-event>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/touchtap-event/blob/master/LICENSE>
 */
(function () {
  'use strict';

  var touchTapEvent;
  var isTapLength;
  var tapLengthTimeout;
  var startPosition = { x: -1, y: -1 };
  var currentPosition = { x: -1, y: -1 };

  /**
   * Gets the touch object from a touch* event.
   * @param {Event} e The event.
   * @returns {Touch} The (first) touch object from the event.
   */
  function getTouchObject(e) {
    if (e.originalEvent && e.originalEvent.targetTouches) {
      return e.originalEvent.targetTouches[0];
    }
    if (e.targetTouches) {
      return e.targetTouches[0];
    }
    return e;
  }

  /**
   * Gets whether two numbers are approximately equal to each other.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {Boolean}
   */
  function approximatelyEqual(a, b) {
    return Math.abs(a - b) < 2;
  }

  /**
   * Handler for the touchstart event.
   * @param {Event} e The touchstart event.
   */
  function touchstart(e) {
    var touchObject = getTouchObject(e);
    startPosition.x = touchObject.pageX;
    startPosition.y = touchObject.pageY;
    currentPosition.x = touchObject.pageX;
    currentPosition.y = touchObject.pageY;
    isTapLength = true;
    if (tapLengthTimeout) {
      clearTimeout(tapLengthTimeout);
    }
    tapLengthTimeout = setTimeout(function () {
      isTapLength = false;
    }, 200);
  }

  /**
   * Handler for the touchend event.
   * @param {Event} e The touchend event.
   */
  function touchend(e) {
    if (isTapLength &&
        approximatelyEqual(startPosition.x, currentPosition.x) &&
        approximatelyEqual(startPosition.y, currentPosition.y)) {
      touchTapEvent.customData = {
        touchX: currentPosition.x,
        touchY: currentPosition.y
      };
      e.target.dispatchEvent(touchTapEvent);
    }
  }

  /**
   * Handler for the touchmove event.
   * @param {Event} e The touchmove event.
   */
  function touchmove(e) {
    var touchObject = getTouchObject(e);
    currentPosition.x = touchObject.pageX;
    currentPosition.y = touchObject.pageY;
  }

  /**
   * Initialises the library.
   */
  function init() {
    try {
      // The basic events module is supported by most browsers, including IE9 and newer.
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent#Example
      touchTapEvent = document.createEvent('Event');
      touchTapEvent.initEvent('touchtap', true, true);

      // EventTarget.addEventListener() is supported by most browsers, including IE9 and newer.
      // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Browser_compatibility
      document.addEventListener('touchstart', touchstart, false);
      document.addEventListener('touchend', touchend, false);
      document.addEventListener('touchcancel', touchend, false);
      document.addEventListener('touchmove', touchmove, false);
    }
    catch (err) {
      // Ignore "Object doesn't support this property or method" in IE8 and earlier.
    }
  }

  init();
})();

/**
 * @license
 * abbr-touch <http://github.com/Tyriar/abbr-touch>
 * Copyright 2014 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/abbr-touch/blob/master/LICENSE>
 */
var abbrTouch = (function () { // eslint-disable-line no-unused-vars
  'use strict';

  /**
   * Generates a touchtap event handler that calls the tap handler provided.
   * @param {function} handler The tap handler to call.
   * @returns {function}
   */
  function generateTouchtapHandler(handler) {
    return function (e) {
      handler(e.currentTarget, e.currentTarget.title, e.customData.touchX, e.customData.touchY);
    };
  }

  /**
   * The default lightweight tap handler.
   */
  function defaultOnTapHandler(target, title, touchX, touchY) { // eslint-disable-line no-unused-vars
    alert(title); // eslint-disable-line no-alert
  }

  /**
   * Attaches abbrTouch events on all abbr[title] elements within an element
   * @param {HTMLElement} elementScope The element containing abbr[title]
   * elements.
   * @param {function} customTapHandler (Optional) A custom touchtap handler to
   * be used when abbr[title] elements are touched.
   */
  function init(elementScope, customTapHandler) {
    if (!elementScope) {
      elementScope = document;
    }

    var tapHandler = customTapHandler || defaultOnTapHandler;

    var elements = elementScope.querySelectorAll('abbr[title]');
    var touchtapHandler = generateTouchtapHandler(tapHandler);
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchtap', touchtapHandler);
    }
  }

  return init;
})();

(function(){var h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,k="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};function l(){l=function(){};h.Symbol||(h.Symbol=m)}var n=0;function m(a){return"jscomp_symbol_"+(a||"")+n++}
function p(){l();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=h.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&k(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return q(this)}});p=function(){}}function q(a){var b=0;return r(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function r(a){p();a={next:a};a[h.Symbol.iterator]=function(){return this};return a}function t(a){p();var b=a[Symbol.iterator];return b?b.call(a):q(a)}
function u(a){if(!(a instanceof Array)){a=t(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}var v=0;function w(a,b){var c=XMLHttpRequest.prototype.send,d=v++;XMLHttpRequest.prototype.send=function(f){for(var e=[],g=0;g<arguments.length;++g)e[g-0]=arguments[g];var E=this;a(d);this.addEventListener("readystatechange",function(){4===E.readyState&&b(d)});return c.apply(this,e)}}
function x(a,b){var c=fetch;fetch=function(d){for(var f=[],e=0;e<arguments.length;++e)f[e-0]=arguments[e];return new Promise(function(d,e){var g=v++;a(g);c.apply(null,[].concat(u(f))).then(function(a){b(g);d(a)},function(a){b(a);e(a)})})}}var y="img script iframe link audio video source".split(" ");function z(a,b){a=t(a);for(var c=a.next();!c.done;c=a.next())if(c=c.value,b.includes(c.nodeName.toLowerCase())||z(c.children,b))return!0;return!1}
function A(a){var b=new MutationObserver(function(c){c=t(c);for(var b=c.next();!b.done;b=c.next())b=b.value,"childList"==b.type&&z(b.addedNodes,y)?a(b):"attributes"==b.type&&y.includes(b.target.tagName.toLowerCase())&&a(b)});b.observe(document,{attributes:!0,childList:!0,subtree:!0,attributeFilter:["href","src"]});return b}
function B(a,b){if(2<a.length)return performance.now();var c=[];b=t(b);for(var d=b.next();!d.done;d=b.next())d=d.value,c.push({timestamp:d.start,type:"requestStart"}),c.push({timestamp:d.end,type:"requestEnd"});b=t(a);for(d=b.next();!d.done;d=b.next())c.push({timestamp:d.value,type:"requestStart"});c.sort(function(a,b){return a.timestamp-b.timestamp});a=a.length;for(b=c.length-1;0<=b;b--)switch(d=c[b],d.type){case "requestStart":a--;break;case "requestEnd":a++;if(2<a)return d.timestamp;break;default:throw Error("Internal Error: This should never happen");
}return 0}function C(a){a=a?a:{};this.w=!!a.useMutationObserver;this.u=a.minValue||null;a=window.__tti&&window.__tti.e;var b=window.__tti&&window.__tti.o;this.a=a?a.map(function(a){return{start:a.startTime,end:a.startTime+a.duration}}):[];b&&b.disconnect();this.b=[];this.f=new Map;this.j=null;this.v=-Infinity;this.i=!1;this.h=this.c=this.s=null;w(this.m.bind(this),this.l.bind(this));x(this.m.bind(this),this.l.bind(this));D(this);this.w&&(this.h=A(this.B.bind(this)))}
C.prototype.getFirstConsistentlyInteractive=function(){var a=this;return new Promise(function(b){a.s=b;"complete"==document.readyState?F(a):window.addEventListener("load",function(){F(a)})})};function F(a){a.i=!0;var b=0<a.a.length?a.a[a.a.length-1].end:0,c=B(a.g,a.b);G(a,Math.max(c+5E3,b))}
function G(a,b){!a.i||a.v>b||(clearTimeout(a.j),a.j=setTimeout(function(){var b=performance.timing.navigationStart,d=B(a.g,a.b),b=(window.a&&window.a.A?1E3*window.a.A().C-b:0)||performance.timing.domContentLoadedEventEnd-b;if(a.u)var f=a.u;else performance.timing.domContentLoadedEventEnd?(f=performance.timing,f=f.domContentLoadedEventEnd-f.navigationStart):f=null;var e=performance.now();null===f&&G(a,Math.max(d+5E3,e+1E3));var g=a.a;5E3>e-d?d=null:(d=g.length?g[g.length-1].end:b,d=5E3>e-d?null:Math.max(d,
f));d&&(a.s(d),clearTimeout(a.j),a.i=!1,a.c&&a.c.disconnect(),a.h&&a.h.disconnect());G(a,performance.now()+1E3)},b-performance.now()),a.v=b)}
function D(a){a.c=new PerformanceObserver(function(b){b=t(b.getEntries());for(var c=b.next();!c.done;c=b.next())if(c=c.value,"resource"===c.entryType&&(a.b.push({start:c.fetchStart,end:c.responseEnd}),G(a,B(a.g,a.b)+5E3)),"longtask"===c.entryType){var d=c.startTime+c.duration;a.a.push({start:c.startTime,end:d});G(a,d+5E3)}});a.c.observe({entryTypes:["longtask","resource"]})}C.prototype.m=function(a){this.f.set(a,performance.now())};C.prototype.l=function(a){this.f.delete(a)};
C.prototype.B=function(){G(this,performance.now()+5E3)};h.Object.defineProperties(C.prototype,{g:{configurable:!0,enumerable:!0,get:function(){return[].concat(u(this.f.values()))}}});var H={getFirstConsistentlyInteractive:function(a){a=a?a:{};return"PerformanceLongTaskTiming"in window?(new C(a)).getFirstConsistentlyInteractive():Promise.resolve(null)}};
"undefined"!=typeof module&&module.exports?module.exports=H:"function"===typeof define&&define.amd?define("ttiPolyfill",[],function(){return H}):window.ttiPolyfill=H;})();
//# sourceMappingURL=tti-polyfill.js.map
/* global abbrTouch */

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function perfmark(callback, key) {
  if (window.performance) {
    performance.mark('mark_' + key + '_start');
    callback();
    performance.mark('mark_' + key + '_end');
    performance.measure(
      'mark_' + key,
      'mark_' + key + '_start',
      'mark_' + key + '_end'
    );
  }
}

if (window.ttiPolyfill && console) {
  window.ttiPolyfill.getFirstConsistentlyInteractive().then(function (tti) {
    console.log('tti-polyfill', tti);
  });
}

(function switchlang() {
  perfmark(function() {
    // Detect user language and redirect, if first time, to the right page ----------------
    try {
      var lang_user;
      lang_user = localStorage.getItem('lang_user');
      if (!lang_user) {
        lang_user = (
          window.navigator.userLanguage ||
          (window.navigator.languages.length > 0 &&
            window.navigator.languages[0]) ||
          window.navigator.language
        ).slice(0, 2);
        localStorage.setItem('lang_user', lang_user);
        var lang_site = document.getElementsByTagName('html')[0].lang;
        if (lang_user != lang_site) {
          window.location = document.querySelector(
            '[hreflang][rel="alternate"]'
          ).href;
        }
      }
    } catch (e) {}
  }, 'switchlang');
})();

ready(function() {
  if (window.initEasyToggleState) {
    perfmark(function() {
      window.initEasyToggleState();
    }, 'easy_toggle');
  }

  (function(abbrTouch) {
    var tooltipTimeout;

    function getTooltipElement() {
      var tooltip = document.querySelector('#abbr-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'abbr-tooltip';
        // Technically this is duplicate content, just exposing it on mobile
        tooltip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltip);
      }
      return tooltip;
    }

    function updateTooltip(tooltip, term, expandedTerm) {
      var text = term + ': ' + expandedTerm;
      tooltip.innerHTML = text;
      tooltip.classList.add('visible');

      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }

      var timeoutLength = text.length * 120;
      tooltipTimeout = setTimeout(function() {
        tooltip.classList.remove('visible');
      }, timeoutLength);
    }

    perfmark(function() {
      abbrTouch(document.querySelector('article'), function(target, title) {
        var tooltip = getTooltipElement();
        // Ensure the tooltip is ready so that the initial transition works
        setTimeout(function() {
          updateTooltip(tooltip, target.innerHTML, title);
        }, 0);
      });
    }, 'abbrTouch');
  })(abbrTouch);

  function decorate_footnotes() {
    var lang = document.getElementsByTagName('html')[0].getAttribute('lang'),
      alternatives = {
        en: 'return to the text',
        fr: 'retour au texte'
      };
    var footnotes = document.getElementsByClassName('footnote-backref');
    for (var i = 0; i < footnotes.length; i++) {
      footnotes[i].setAttribute('title', alternatives[lang]);
    }
  }
  decorate_footnotes();

  /***********************************************
   ***********************************************/

  (function videoPlayPause() {
    perfmark(function() {
      var authorize_download = false;
      var connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      authorize_download = !connection || connection.effectiveType == '4g';
      var videos = document.querySelectorAll('.videoWrapper.gif');
      videos.forEach(function(item) {
        var insideVid = item.querySelector('video');
        // In order to prevent a disgracious "flash" when load()

        item.style.height = insideVid.clientHeight + 'px';
        item.style.width = insideVid.clientWidth + 'px';
        insideVid.style.height = insideVid.clientHeight + 'px';
        if (authorize_download) {
          insideVid.setAttribute('preload', 'auto');
        }

        item.addEventListener('click', toggleVideo, false);
      });
    }, 'video_hover');

    function playVideo(e, v) {
      var video = v || this.querySelector('video');
      if (!video.classList.contains('loading-started')) {
        video.classList.add('loading-started');
        video.addEventListener('canplay', function() {
          this.play();
        });
      }
      video.load();
    }

    function pauseVideo(e, v) {
      var video = v || this.querySelector('video');
      video.pause();
    }

    function toggleVideo(e, v) {
      var video = v || this.querySelector('video');
      if (video.paused) {
        video.parentElement.classList.add('playing');
        playVideo(e, video);
      } else {
        pauseVideo(e, video);
        video.parentElement.classList.remove('playing');
      }
    }
  })();

  if (window.hljs) {
    perfmark(function() {
      window.hljs.initHighlighting();
    }, 'highlightjs');
  }
});