!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}({6:function(e,t){var n=document.createElement("canvas");n.width=400,n.height=400,document.body.appendChild(n);var r,o=n.getContext("2d"),u=[{x:40,y:340},{x:360,y:360},{x:20,y:20},{x:340,y:40}],i=function(e,t){o.fillStyle=t,o.beginPath(),console.log(e),e.forEach(function(e){return o.arc(e.x,e.y,5,0,2*Math.PI)}),o.fill()};r=u,o.beginPath(),o.moveTo(r[0].x,r[0].y),o.bezierCurveTo(r[1].x,r[1].y,r[2].x,r[2].y,r[3].x,r[3].y),o.stroke(),i([u[0],u[3]],"blue"),i([u[1],u[2]],"red")}});
//# sourceMappingURL=2d-4110e5f3.js.map