!function(a) {
	"use strict";
	function b(a) {
	return a?c(a):void 0
}
function c(a) {
	var c,d=b.prototype;
	for(c in d)Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c]);
	return a
}
function d(a,b) {
	var c;
	if(Array.prototype.indexOf)return a.indexOf(b);
	if(null==a)throw new TypeError;
	for(c=a.length;
	c--;
	)if(a[c]===b)return c;
	return-1
}
b.prototype.getListeners=function(a) {
	var b=this._registry||(this._registry= {
	}),c=b[a]||(b[a]=[]);
	return c
}
,b.prototype.hasListeners=function(a) {
	return this.getListeners(a).length?!0:!1
}
,b.prototype.on=function(a,b) {
	var c=this.getListeners(a);
	if("function"!=typeof b)throw new TypeError("Emitter.on():the 2nd argument must be a function.");
	return-1===d(c,b)&&c.push(b),this
}
,b.prototype.once=function(a,b) {
	function c() {
	d.off(a,c),b.apply(this,arguments)
}
var d=this;
	return b._wrapper=c,this.on(a,c),this},b.prototype.off=function(a,b) {
	function c(a) {
	this._registry&&(a?delete this._registry[a]:delete this._registry)
}
var e,f,g=arguments.length;
	if(0===g)return c.call(this),this;
	if(1===g)return c.call(this,a),this;
	if("function"!=typeof b)throw new TypeError("Emitter.off():the 2nd argument must be a function.");
	return e=this.getListeners(a),f=d(e,b),-1===f&&(f=d(e,b._wrapper)),-1!==f&&(e.splice(f,1),0===e.length&&c.call(this,a)),this},b.prototype.trigger=function(a) {
	var b=Array.prototype.slice.call(arguments,1),c=this.getListeners(a),d=c.length;
	if(d) {
	c=c.slice(0);
	for(var e=0;
	d>e;
	e+=1)c[e].apply(this,b)
}
return this},b.prototype.emit=b.prototype.trigger,"object"==typeof exports?module.exports=b:"function"==typeof define&&define.amd?define(function() {
	return b
}
):a.Emitter=b}(this),function(a,b) {
	"use strict";
	function c() {
	d.READY||(d.event.determineEventTypes(),d.utils.each(d.gestures,function(a) {
	d.detection.register(a)
}
),d.event.onTouch(d.DOCUMENT,d.EVENT_MOVE,d.detection.detect),d.event.onTouch(d.DOCUMENT,d.EVENT_END,d.detection.detect),d.READY=!0)}var d=function(a,b) {
	return new d.Instance(a,b|| {
	})
}
;d.defaults= {
	stop_browser_behavior: {
	userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"
}
},d.HAS_POINTEREVENTS=a.navigator.pointerEnabled||a.navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&a.navigator.userAgent.match(d.MOBILE_REGEX),d.EVENT_TYPES= {
	},d.DIRECTION_DOWN="down",d.DIRECTION_LEFT="left",d.DIRECTION_UP="up",d.DIRECTION_RIGHT="right",d.POINTER_MOUSE="mouse",d.POINTER_TOUCH="touch",d.POINTER_PEN="pen",d.EVENT_START="start",d.EVENT_MOVE="move",d.EVENT_END="end",d.DOCUMENT=a.document,d.plugins=d.plugins|| {
	},d.gestures=d.gestures|| {
	},d.READY=!1,d.utils= {
	extend:function(a,c,d) {
	for(var e in c)a[e]!==b&&d||(a[e]=c[e]);
	return a
}
,each:function(a,c,d) {
	if("forEach"in a)a.forEach(c,d);
	else if(a.length!=b) {
	for(var e=0,f=a.length;
	f>e;
	e++)if(c.call(d,a[e],e,a)===!1)return
}
else for(var e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},hasParent:function(a,b) {
	for(;
	a;) {
	if(a==b)return!0;
	a=a.parentNode
}
return!1},getCenter:function(a) {
	var b=[],c=[];
	return d.utils.each(a,function(a) {
	b.push("undefined"!=typeof a.clientX?a.clientX:a.pageX),c.push("undefined"!=typeof a.clientY?a.clientY:a.pageY)
}
) {
	pageX:(Math.min.apply(Math,b)+Math.max.apply(Math,b))/2,pageY:(Math.min.apply(Math,c)+Math.max.apply(Math,c))/2
}
},getVelocity:function(a,b,c) {
	return {
	x:Math.abs(b/a)||0,y:Math.abs(c/a)||0
}
},getAngle:function(a,b) {
	var c=b.pageY-a.pageY,d=b.pageX-a.pageX;
	return 180*Math.atan2(c,d)/Math.PI
}
,getDirection:function(a,b) {
	var c=Math.abs(a.pageX-b.pageX),e=Math.abs(a.pageY-b.pageY);
	return c>=e?a.pageX-b.pageX>0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT:a.pageY-b.pageY>0?d.DIRECTION_UP:d.DIRECTION_DOWN
}
,getDistance:function(a,b) {
	var c=b.pageX-a.pageX,d=b.pageY-a.pageY;
	return Math.sqrt(c*c+d*d)
}
,getScale:function(a,b) {
	return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1
}
,getRotation:function(a,b) {
	return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0
}
,isVertical:function(a) {
	return a==d.DIRECTION_UP||a==d.DIRECTION_DOWN
}
,stopDefaultBrowserBehavior:function(a,b) {
	var c=["webkit","khtml","moz","Moz","ms","o",""];
	b&&a&&a.style&&(d.utils.each(c,function(e) {
	d.utils.each(b,function(b) {
	e&&(b=c+b.substring(0,1).toUpperCase()+b.substring(1)),b in a.style&&(a.style[b]=b)
}
)}),"none"==b.userSelect&&(a.onselectstart=function() {
	return!1
}
),"none"==b.userDrag&&(a.ondragstart=function() {
	return!1
}
))}},d.Instance=function(a,b) {
	var e=this;
	return c(),this.element=a,this.enabled=!0,this.options=d.utils.extend(d.utils.extend( {
	},d.defaults),b|| {
	}),this.options.stop_browser_behavior&&d.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),d.event.onTouch(a,d.EVENT_START,function(a) {
	e.enabled&&d.detection.startDetect(e,a)
}
),this},d.Instance.prototype= {
	on:function(a,b) {
	var c=a.split(" ");
	return d.utils.each(c,function(a) {
	this.element.addEventListener(a,b,!1)
}
,this),this},off:function(a,b) {
	var c=a.split(" ");
	return d.utils.each(c,function(a) {
	this.element.removeEventListener(a,b,!1)
}
,this),this},trigger:function(a,b) {
	b||(b= {
	});
	var c=d.DOCUMENT.createEvent("Event");
	c.initEvent(a,!0,!0),c.gesture=b;
	var e=this.element;
	return d.utils.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this
}
,enable:function(a) {
	return this.enabled=a,this
}
};
	var e=null,f=!1,g=!1;
	d.event= {
	bindDom:function(a,b,c) {
	var e=b.split(" ");
	d.utils.each(e,function(b) {
	a.addEventListener(b,c,!1)
}
)},onTouch:function(a,b,c) {
	var h=this;
	this.bindDom(a,d.EVENT_TYPES[b],function(i) {
	var j=i.type.toLowerCase();
	if(!j.match(/mouse/)||!g) {
	j.match(/touch/)||j.match(/pointerdown/)||j.match(/mouse/)&&1===i.which?f=!0:j.match(/mouse/)&&!i.which&&(f=!1),j.match(/touch|pointer/)&&(g=!0);
	var k=0;
	if(f) {
	d.HAS_POINTEREVENTS&&b!=d.EVENT_END?k=d.PointerEvent.updatePointer(b,i):j.match(/touch/)?k=i.touches.length:g||(k=j.match(/up/)?0:1),k>0&&b==d.EVENT_END?b=d.EVENT_MOVE:k||(b=d.EVENT_END),(k||null===e)&&(e=i);
	var l=/.*Android.*(UC|QQ).*/;
	b==d.EVENT_MOVE&&l.test(navigator.userAgent)?(d._fakeEndEvent&&d._fakeEndEvent(d.EVENT_MOVE),clearTimeout(d._timer),d._fakeEndEvent=function(b,e,f) {
	c.call(d.detection,h.collectEventData(a,f,h.getTouchList(b,f),e)),d.HAS_POINTEREVENTS&&f==d.EVENT_END&&(k=d.PointerEvent.updatePointer(f,e)),d._fakeEndEvent=null
}
.bind(this,e,i),d._timer=setTimeout(function() {
	d._fakeEndEvent(d.EVENT_END)
}
,400)):(b==d.EVENT_END&&(d._fakeEndEvent&&d._fakeEndEvent(d.EVENT_MOVE),clearTimeout(d._timer)),c.call(d.detection,h.collectEventData(a,b,h.getTouchList(e,b),i)),d.HAS_POINTEREVENTS&&b==d.EVENT_END&&(k=d.PointerEvent.updatePointer(b,i))),c.call(d.detection,h.collectEventData(a,b,h.getTouchList(e,b),i)),d.HAS_POINTEREVENTS&&b==d.EVENT_END&&(k=d.PointerEvent.updatePointer(b,i))}k||(e=null,f=!1,g=!1,d.PointerEvent.reset())}})},determineEventTypes:function() {
	var a;
	a=d.HAS_POINTEREVENTS?d.PointerEvent.getEvents():d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],d.EVENT_TYPES[d.EVENT_START]=a[0],d.EVENT_TYPES[d.EVENT_MOVE]=a[1],d.EVENT_TYPES[d.EVENT_END]=a[2]
}
,getTouchList:function(a) {
	return d.HAS_POINTEREVENTS?d.PointerEvent.getTouchList():a.touches?a.touches:(a.indentifier=1,[a])
}
,collectEventData:function(a,b,c,e) {
	var f=d.POINTER_TOUCH;
	return(e.type.match(/mouse/)||d.PointerEvent.matchType(d.POINTER_MOUSE,e))&&(f=d.POINTER_MOUSE) {
	center:d.utils.getCenter(c),timeStamp:(new Date).getTime(),target:e.target,touches:c,eventType:b,pointerType:f,srcEvent:e,preventDefault:function() {
	this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()
}
,stopPropagation:function() {
	this.srcEvent.stopPropagation()
}
,stopDetect:function() {
	return d.detection.stopDetect()
}
}}},d.PointerEvent= {
	pointers: {
	},getTouchList:function() {
	var a=this,b=[];
	return d.utils.each(a.pointers,function(a) {
	b.push(a)
}
),b},updatePointer:function(a,b) {
	return a==d.EVENT_END?this.pointers= {
	}:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b),Object.keys(this.pointers).length
}
,matchType:function(a,b) {
	if(!b.pointerType)return!1;
	var c=b.pointerType,e= {
	};
	return e[d.POINTER_MOUSE]=c===b.MSPOINTER_TYPE_MOUSE||c===d.POINTER_MOUSE,e[d.POINTER_TOUCH]=c===b.MSPOINTER_TYPE_TOUCH||c===d.POINTER_TOUCH,e[d.POINTER_PEN]=c===b.MSPOINTER_TYPE_PEN||c===d.POINTER_PEN,e[a]
}
,getEvents:function() {
	return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]
}
,reset:function() {
	this.pointers= {
	}
}
},d.detection= {
	gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b) {
	this.current||(this.stopped=!1,this.current= {
	inst:a,startEvent:d.utils.extend( {
	},b),lastEvent:!1,name:""
}
,this.detect(b))},detect:function(a) {
	if(this.current&&!this.stopped) {
	a=this.extendEventData(a);
	var b=this.current.inst.options;
	return d.utils.each(this.gestures,function(c) {
	return this.stopped||b[c.name]===!1||c.handler.call(c,a,this.current.inst)!==!1?void 0:(this.stopDetect(),!1)
}
,this),this.current&&(this.current.lastEvent=a),a.eventType==d.EVENT_END&&!a.touches.length-1&&this.stopDetect(),a}},stopDetect:function() {
	this.previous=d.utils.extend( {
	},this.current),this.current=null,this.stopped=!0
}
,extendEventData:function(a) {
	var b=this.current.startEvent;
	!b||a.touches.length==b.touches.length&&a.touches!==b.touches||(b.touches=[],d.utils.each(a.touches,function(a) {
	b.touches.push(d.utils.extend( {
	},a))
}
));
	var c,e,f=a.timeStamp-b.timeStamp,g=a.center.pageX-b.center.pageX,h=a.center.pageY-b.center.pageY,i=d.utils.getVelocity(f,g,h);
	return"end"===a.eventType?(c=this.current.lastEvent&&this.current.lastEvent.interimAngle,e=this.current.lastEvent&&this.current.lastEvent.interimDirection):(c=this.current.lastEvent&&d.utils.getAngle(this.current.lastEvent.center,a.center),e=this.current.lastEvent&&d.utils.getDirection(this.current.lastEvent.center,a.center)),d.utils.extend(a {
	deltaTime:f,deltaX:g,deltaY:h,velocityX:i.x,velocityY:i.y,distance:d.utils.getDistance(b.center,a.center),angle:d.utils.getAngle(b.center,a.center),interimAngle:c,direction:d.utils.getDirection(b.center,a.center),interimDirection:e,scale:d.utils.getScale(b.touches,a.touches),rotation:d.utils.getRotation(b.touches,a.touches),startEvent:b
}
),a},register:function(a) {
	var c=a.defaults|| {
	};
	return c[a.name]===b&&(c[a.name]=!0),d.utils.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b) {
	return a.index<b.index?-1:a.index>b.index?1:0
}
),this.gestures}},d.gestures.Drag= {
	name:"drag",index:50,defaults: {
	drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25
}
,triggered:!1,handler:function(a,b) {
	if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);
	if(!(b.options.drag_max_touches>0&&a.touches.length>b.options.drag_max_touches))switch(a.eventType) {
	case d.EVENT_START:this.triggered=!1;
	break;
	case d.EVENT_MOVE:if(a.distance<b.options.drag_min_distance&&d.detection.current.name!=this.name)return;
	if(d.detection.current.name!=this.name&&(d.detection.current.name=this.name,b.options.correct_for_drag_min_distance&&a.distance>0)) {
	var c=Math.abs(b.options.drag_min_distance/a.distance);
	d.detection.current.startEvent.center.pageX+=a.deltaX*c,d.detection.current.startEvent.center.pageY+=a.deltaY*c,a=d.detection.extendEventData(a)
}
(d.detection.current.lastEvent.drag_locked_to_axis||b.options.drag_lock_to_axis&&b.options.drag_lock_min_distance<=a.distance)&&(a.drag_locked_to_axis=!0);
	var e=d.detection.current.lastEvent.direction;
	a.drag_locked_to_axis&&e!==a.direction&&(a.direction=d.utils.isVertical(e)?a.deltaY<0?d.DIRECTION_UP:d.DIRECTION_DOWN:a.deltaX<0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT),this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),b.trigger(this.name+a.direction,a),(b.options.drag_block_vertical&&d.utils.isVertical(a.direction)||b.options.drag_block_horizontal&&!d.utils.isVertical(a.direction))&&a.preventDefault();
	break;
	case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},d.gestures.Hold= {
	name:"hold",index:10,defaults: {
	hold_timeout:500,hold_threshold:1
}
,timer:null,handler:function(a,b) {
	switch(a.eventType) {
	case d.EVENT_START:clearTimeout(this.timer),d.detection.current.name=this.name,this.timer=setTimeout(function() {
	"hold"==d.detection.current.name&&b.trigger("hold",a)
}
,b.options.hold_timeout);
	break;
	case d.EVENT_MOVE:a.distance>b.options.hold_threshold&&clearTimeout(this.timer);
	break;
	case d.EVENT_END:clearTimeout(this.timer)}}},d.gestures.Release= {
	name:"release",index:1/0,handler:function(a,b) {
	a.eventType==d.EVENT_END&&b.trigger(this.name,a)
}
},d.gestures.Swipe= {
	name:"swipe",index:40,defaults: {
	swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7
}
,handler:function(a,b) {
	if(a.eventType==d.EVENT_END) {
	if(b.options.swipe_max_touches>0&&a.touches.length<b.options.swipe_min_touches&&a.touches.length>b.options.swipe_max_touches)return;
	(a.velocityX>b.options.swipe_velocity||a.velocityY>b.options.swipe_velocity)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))
}
}},d.gestures.Tap= {
	name:"tap",index:100,defaults: {
	tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300
}
,handler:function(a,b) {
	if(a.eventType==d.EVENT_END&&"touchcancel"!=a.srcEvent.type) {
	var c=d.detection.previous,e=!1;
	if(a.deltaTime>b.options.tap_max_touchtime||a.distance>b.options.tap_max_distance)return;
	c&&"tap"==c.name&&a.timeStamp-c.lastEvent.timeStamp<b.options.doubletap_interval&&a.distance<b.options.doubletap_distance&&(b.trigger("doubletap",a),e=!0),(!e||b.options.tap_always)&&(d.detection.current.name="tap",b.trigger(d.detection.current.name,a))
}
}},d.gestures.Touch= {
	name:"touch",index:-1/0,defaults: {
	prevent_default:!1,prevent_mouseevents:!1
}
,handler:function(a,b) {
	return b.options.prevent_mouseevents&&a.pointerType==d.POINTER_MOUSE?void a.stopDetect():(b.options.prevent_default&&a.preventDefault(),void(a.eventType==d.EVENT_START&&b.trigger(this.name,a)))
}
},d.gestures.Transform= {
	name:"transform",index:45,defaults: {
	transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1
}
,triggered:!1,handler:function(a,b) {
	if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),void(this.triggered=!1);
	if(!(a.touches.length<2))switch(b.options.transform_always_block&&a.preventDefault(),a.eventType) {
	case d.EVENT_START:this.triggered=!1;
	break;
	case d.EVENT_MOVE:var c=Math.abs(1-a.scale),e=Math.abs(a.rotation);
	if(c<b.options.transform_min_scale&&e<b.options.transform_min_rotation)return;
	d.detection.current.name=this.name,this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),e>b.options.transform_min_rotation&&b.trigger("rotate",a),c>b.options.transform_min_scale&&(b.trigger("pinch",a),b.trigger("pinch"+(a.scale<1?"in":"out"),a));
	break;
	case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1
}
}},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function() {
	return d
}
):"object"==typeof module&&"object"==typeof module.exports?module.exports=d:a.Hammer=d}(this);
	var Zepto=function() {
	function a(a) {
	return null==a?String(a):V[W.call(a)]||"object"
}
function b(b) {
	return"function"==a(b)
}
function c(a) {
	return null!=a&&a==a.window
}
function d(a) {
	return null!=a&&a.nodeType==a.DOCUMENT_NODE
}
function e(b) {
	return"object"==a(b)
}
function f(a) {
	return e(a)&&!c(a)&&Object.getPrototypeOf(a)==Object.prototype
}
function g(a) {
	return a instanceof Array
}
function h(a) {
	return"number"==typeof a.length
}
function i(a) {
	return E.call(a,function(a) {
	return null!=a
}
)}function j(a) {
	return a.length>0?y.fn.concat.apply([],a):a
}
function k(a) {
	return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()
}
function l(a) {
	return a in H?H[a]:H[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")
}
function m(a,b) {
	return"number"!=typeof b||I[k(a)]?b:b+"px"
}
function n(a) {
	var b,c;
	return G[a]||(b=F.createElement(a),F.body.appendChild(b),c=getComputedStyle(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),"none"==c&&(c="block"),G[a]=c),G[a]
}
function o(a) {
	return"children"in a?D.call(a.children):y.map(a.childNodes,function(a) {
	return 1==a.nodeType?a:void 0
}
)}function p(a,b,c) {
	for(x in b)c&&(f(b[x])||g(b[x]))?(f(b[x])&&!f(a[x])&&(a[x]= {
	}),g(b[x])&&!g(a[x])&&(a[x]=[]),p(a[x],b[x],c)):b[x]!==w&&(a[x]=b[x])
}
function q(a,b) {
	return null==b?y(a):y(a).filter(b)
}
function r(a,c,d,e) {
	return b(c)?c.call(a,d,e):c
}
function s(a,b,c) {
	null==c?a.removeAttribute(b):a.setAttribute(b,c)
}
function t(a,b) {
	var c=a.className,d=c&&c.baseVal!==w;
	return b===w?d?c.baseVal:c:void(d?c.baseVal=b:a.className=b)
}
function u(a) {
	var b;
	try {
	return a?"true"==a||("false"==a?!1:"null"==a?null:/^0/.test(a)||isNaN(b=Number(a))?/^[\[\ {
	]/.test(a)?y.parseJSON(a):a:b):a
}
catch(c) {
	return a
}
}function v(a,b) {
	b(a);
	for(var c in a.childNodes)v(a.childNodes[c],b)
}
var w,x,y,z,A,B,C=[],D=C.slice,E=C.filter,F=window.document,G= {
	},H= {
	},I= {
	"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1
}
,J=/^\s*<(\w+|!)[^>]*>/,K=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,L=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,M=/^(?:body|html)$/i,N=/([A-Z])/g,O=["val","css","html","text","data","width","height","offset"],P=["after","prepend","before","append"],Q=F.createElement("table"),R=F.createElement("tr"),S= {
	tr:F.createElement("tbody"),tbody:Q,thead:Q,tfoot:Q,td:R,th:R,"*":F.createElement("div")
}
,T=/complete|loaded|interactive/,U=/^[\w-]*$/,V= {
	},W=V.toString,X= {
	},Y=F.createElement("div"),Z= {
	tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"
}
;return X.matches=function(a,b) {
	if(!b||!a||1!==a.nodeType)return!1;
	var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;
	if(c)return c.call(a,b);
	var d,e=a.parentNode,f=!e;
	return f&&(e=Y).appendChild(a),d=~X.qsa(e,b).indexOf(a),f&&Y.removeChild(a),d
}
,A=function(a) {
	return a.replace(/-+(.)?/g,function(a,b) {
	return b?b.toUpperCase():""
}
)},B=function(a) {
	return E.call(a,function(b,c) {
	return a.indexOf(b)==c
}
)},X.fragment=function(a,b,c) {
	var d,e,g;
	return K.test(a)&&(d=y(F.createElement(RegExp.$1))),d||(a.replace&&(a=a.replace(L,"<$1></$2>")),b===w&&(b=J.test(a)&&RegExp.$1),b in S||(b="*"),g=S[b],g.innerHTML=""+a,d=y.each(D.call(g.childNodes),function() {
	g.removeChild(this)
}
)),f(c)&&(e=y(d),y.each(c,function(a,b) {
	O.indexOf(a)>-1?e[a](b):e.attr(a,b)
}
)),d},X.Z=function(a,b) {
	return a=a||[],a.__proto__=y.fn,a.selector=b||"",a
}
,X.isZ=function(a) {
	return a instanceof X.Z
}
,X.init=function(a,c) {
	var d;
	if(!a)return X.Z();
	if("string"==typeof a)if(a=a.trim(),"<"==a[0]&&J.test(a))d=X.fragment(a,RegExp.$1,c),a=null;
	else {
	if(c!==w)return y(c).find(a);
	d=X.qsa(F,a)
}
else {
	if(b(a))return y(F).ready(a);
	if(X.isZ(a))return a;
	if(g(a))d=i(a);
	else if(e(a))d=[a],a=null;
	else if(J.test(a))d=X.fragment(a.trim(),RegExp.$1,c),a=null;
	else {
	if(c!==w)return y(c).find(a);
	d=X.qsa(F,a)
}
}return X.Z(d,a)},y=function(a,b) {
	return X.init(a,b)
}
,y.extend=function(a) {
	var b,c=D.call(arguments,1);
	return"boolean"==typeof a&&(b=a,a=c.shift()),c.forEach(function(c) {
	p(a,c,b)
}
),a},y.merge=function(a) {
	var b,c=D.call(arguments,1),d= {
	};
	return"boolean"==typeof a?(b=a,a=c):a=D.call(arguments,0),y.extend.apply(y,[!!b,d].concat(a)),d
}
,X.qsa=function(a,b) {
	var c,e="#"==b[0],f=!e&&"."==b[0],g=e||f?b.slice(1):b,h=U.test(g);
	return d(a)&&h&&e?(c=a.getElementById(g))?[c]:[]:1!==a.nodeType&&9!==a.nodeType?[]:D.call(h&&!e?f?a.getElementsByClassName(g):a.getElementsByTagName(b):a.querySelectorAll(b))
}
,y.contains=function(a,b) {
	return a!==b&&a.contains(b)
}
,y.type=a,y.isFunction=b,y.isWindow=c,y.isArray=g,y.isPlainObject=f,y.isEmptyObject=function(a) {
	var b;
	for(b in a)return!1;
	return!0
}
,y.inArray=function(a,b,c) {
	return C.indexOf.call(b,a,c)
}
,y.camelCase=A,y.trim=function(a) {
	return null==a?"":String.prototype.trim.call(a)
}
,y.uuid=0,y.support= {
	},y.expr= {
	},y.map=function(a,b) {
	var c,d,e,f=[];
	if(h(a))for(d=0;
	d<a.length;
	d++)c=b(a[d],d),null!=c&&f.push(c);
	else for(e in a)c=b(a[e],e),null!=c&&f.push(c);
	return j(f)
}
,y.each=function(a,b) {
	var c,d;
	if(h(a)) {
	for(c=0;
	c<a.length;
	c++)if(b.call(a[c],c,a[c])===!1)return a
}
else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;
	return a},window.JSON&&(y.parseJSON=JSON.parse),y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b) {
	V["[object "+b+"]"]=b.toLowerCase()
}
),y.importStyle=function(a) {
	y("<style>"+a+"</style>").appendTo("head")
}
,y.fn= {
	forEach:C.forEach,reduce:C.reduce,push:C.push,sort:C.sort,indexOf:C.indexOf,concat:C.concat,map:function(a) {
	return y(y.map(this,function(b,c) {
	return a.call(b,c,b)
}
))},slice:function() {
	return y(D.apply(this,arguments))
}
,ready:function(a) {
	return T.test(F.readyState)&&F.body?a(y):F.addEventListener("DOMContentLoaded",function() {
	a(y)
}
,!1),this},get:function(a) {
	return a===w?D.call(this):this[a>=0?a:a+this.length]
}
,toArray:function() {
	return this.get()
}
,size:function() {
	return this.length
}
,remove:function() {
	return this.each(function() {
	null!=this.parentNode&&this.parentNode.removeChild(this)
}
)},each:function(a) {
	return C.every.call(this,function(b,c) {
	return a.call(b,c,b)!==!1
}
),this},filter:function(a) {
	return b(a)?this.not(this.not(a)):y(E.call(this,function(b) {
	return X.matches(b,a)
}
))},add:function(a,b) {
	return y(B(this.concat(y(a,b))))
}
,is:function(a) {
	return this.length>0&&X.matches(this[0],a)
}
,not:function(a) {
	var c=[];
	if(b(a)&&a.call!==w)this.each(function(b) {
	a.call(this,b)||c.push(this)
}
);
	else {
	var d="string"==typeof a?this.filter(a):h(a)&&b(a.item)?D.call(a):y(a);
	this.forEach(function(a) {
	d.indexOf(a)<0&&c.push(a)
}
)}return y(c)},has:function(a) {
	return this.filter(function() {
	return e(a)?y.contains(this,a):y(this).find(a).size()
}
)},eq:function(a) {
	return-1===a?this.slice(a):this.slice(a,+a+1)
}
,first:function() {
	var a=this[0];
	return a&&!e(a)?a:y(a)
}
,last:function() {
	var a=this[this.length-1];
	return a&&!e(a)?a:y(a)
}
,find:function(a) {
	var b,c=this;
	return b="object"==typeof a?y(a).filter(function() {
	var a=this;
	return C.some.call(c,function(b) {
	return y.contains(b,a)
}
)}):1==this.length?y(X.qsa(this[0],a)):this.map(function() {
	return X.qsa(this,a)
}
)},closest:function(a,b) {
	var c=this[0],e=!1;
	for("object"==typeof a&&(e=y(a));
	c&&!(e?e.indexOf(c)>=0:X.matches(c,a));
	)c=c!==b&&!d(c)&&c.parentNode;
	return y(c)
}
,parents:function(a) {
	for(var b=[],c=this;
	c.length>0;
	)c=y.map(c,function(a) {
	return(a=a.parentNode)&&!d(a)&&b.indexOf(a)<0?(b.push(a),a):void 0
}
);
	return q(b,a)},parent:function(a) {
	return q(B(this.pluck("parentNode")),a)
}
,children:function(a) {
	return q(this.map(function() {
	return o(this)
}
),a)},empty:function() {
	return this.each(function() {
	this.innerHTML=""
}
)},pluck:function(a) {
	return y.map(this,function(b) {
	return b[a]
}
)},show:function() {
	return this.each(function() {
	"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=n(this.nodeName))
}
)},replaceWith:function(a) {
	return this.before(a).remove()
}
,clone:function() {
	return this.map(function() {
	return this.cloneNode(!0)
}
)},hide:function() {
	return this.css("display","none")
}
,toggle:function(a) {
	return this.each(function() {
	var b=y(this);
	(a===w?"none"==b.css("display"):a)?b.show():b.hide()
}
)},prev:function(a) {
	return y(this.pluck("previousElementSibling")).filter(a||"*")
}
,next:function(a) {
	return y(this.pluck("nextElementSibling")).filter(a||"*")
}
,html:function(a) {
	return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(b) {
	var c=this.innerHTML;
	y(this).empty().append(r(this,a,b,c))
}
)},text:function(a) {
	return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function() {
	this.textContent=a===w?"":""+a
}
)},attr:function(a,b) {
	var c;
	return"string"==typeof a&&b===w?0==this.length||1!==this[0].nodeType?w:"value"==a&&"INPUT"==this[0].nodeName?this.val():!(c=this[0].getAttribute(a))&&a in this[0]?this[0][a]:c:this.each(function(c) {
	if(1===this.nodeType)if(e(a))for(x in a)s(this,x,a[x]);
	else s(this,a,r(this,b,c,this.getAttribute(a)))
}
)},removeAttr:function(a) {
	return this.each(function() {
	1===this.nodeType&&s(this,a)
}
)},prop:function(a,b) {
	return a=Z[a]||a,b===w?this[0]&&this[0][a]:this.each(function(c) {
	this[a]=r(this,b,c,this[a])
}
)},data:function(a,b) {
	var c=this.attr("data-"+a.replace(N,"-$1").toLowerCase(),b);
	return null!==c?u(c):w
}
,val:function(a) {
	return 0===arguments.length?this[0]&&(this[0].multiple?y(this[0]).find("option").filter(function() {
	return this.selected
}
).pluck("value"):this[0].value):this.each(function(b) {
	this.value=r(this,a,b,this.value)
}
)},offset:function(a) {
	if(a)return this.each(function(b) {
	var c=y(this),d=r(this,a,b,c.offset()),e=c.offsetParent().offset(),f= {
	top:d.top-e.top,left:d.left-e.left
}
;"static"==c.css("position")&&(f.position="relative"),c.css(f)});
	if(0==this.length)return null;
	var b=this[0].getBoundingClientRect();
	return {
	left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)
}
},css:function(b,c) {
	if(arguments.length<2) {
	var d=this[0],e=getComputedStyle(d,"");
	if(!d)return;
	if("string"==typeof b)return d.style[A(b)]||e.getPropertyValue(b);
	if(g(b)) {
	var f= {
	};
	return y.each(g(b)?b:[b],function(a,b) {
	f[b]=d.style[A(b)]||e.getPropertyValue(b)
}
),f}}var h="";
	if("string"==a(b))c||0===c?h=k(b)+":"+m(b,c):this.each(function() {
	this.style.removeProperty(k(b))
}
);
	else for(x in b)b[x]||0===b[x]?h+=k(x)+":"+m(x,b[x])+";
	":this.each(function() {
	this.style.removeProperty(k(x))
}
);
	return this.each(function() {
	this.style.cssText+=";
	"+h
}
)},index:function(a) {
	return a?this.indexOf(y(a)[0]):this.parent().children().indexOf(this[0])
}
,hasClass:function(a) {
	return a?C.some.call(this,function(a) {
	return this.test(t(a))
}
,l(a)):!1},addClass:function(a) {
	return a?this.each(function(b) {
	z=[];
	var c=t(this),d=r(this,a,b,c);
	d.split(/\s+/g).forEach(function(a) {
	y(this).hasClass(a)||z.push(a)
}
,this),z.length&&t(this,c+(c?" ":"")+z.join(" "))}):this},removeClass:function(a) {
	return this.each(function(b) {
	return a===w?t(this,""):(z=t(this),r(this,a,b,z).split(/\s+/g).forEach(function(a) {
	z=z.replace(l(a)," ")
}
),void t(this,z.trim()))})},toggleClass:function(a,b) {
	return a?this.each(function(c) {
	var d=y(this),e=r(this,a,c,t(this));
	e.split(/\s+/g).forEach(function(a) {
	(b===w?!d.hasClass(a):b)?d.addClass(a):d.removeClass(a)
}
)}):this},scrollTop:function(a) {
	if(this.length) {
	var b="scrollTop"in this[0];
	return a===w?b?this[0].scrollTop:this[0].pageYOffset:this.each(b?function() {
	this.scrollTop=a
}
:function() {
	this.scrollTo(this.scrollX,a)
}
)}},position:function() {
	if(this.length) {
	var a=this[0],b=this.offsetParent(),c=this.offset(),d=M.test(b[0].nodeName)? {
	top:0,left:0
}
:b.offset();
	return c.top-=parseFloat(y(a).css("margin-top"))||0,c.left-=parseFloat(y(a).css("margin-left"))||0,d.top+=parseFloat(y(b[0]).css("border-top-width"))||0,d.left+=parseFloat(y(b[0]).css("border-left-width"))||0 {
	top:c.top-d.top,left:c.left-d.left
}
}},offsetParent:function() {
	return this.map(function() {
	for(var a=this.offsetParent||F.body;
	a&&!M.test(a.nodeName)&&"static"==y(a).css("position");
	)a=a.offsetParent;
	return a
}
)}},y.fn.detach=y.fn.remove,["width","height"].forEach(function(a) {
	var b=a.replace(/./,function(a) {
	return a[0].toUpperCase()
}
);
	y.fn[a]=function(e) {
	var f,g=this[0];
	return e===w?c(g)?g["inner"+b]:d(g)?g.documentElement["scroll"+b]:(f=this.offset())&&f[a]:this.each(function(b) {
	g=y(this),g.css(a,r(this,e,b,g[a]()))
}
)}}),P.forEach(function(b,c) {
	var d=c%2;
	y.fn[b]=function() {
	var b,e,f=y.map(arguments,function(c) {
	return b=a(c),"object"==b||"array"==b||null==c?c:X.fragment(c)
}
),g=this.length>1;
	return f.length<1?this:this.each(function(a,b) {
	e=d?b:b.parentNode,b=0==c?b.nextSibling:1==c?b.firstChild:2==c?b:null,f.forEach(function(a) {
	if(g)a=a.cloneNode(!0);
	else if(!e)return y(a).remove();
	v(e.insertBefore(a,b),function(a) {
	null==a.nodeName||"SCRIPT"!==a.nodeName.toUpperCase()||a.type&&"text/javascript"!==a.type||a.src||window.eval.call(window,a.innerHTML)
}
)})})},y.fn[d?b+"To":"insert"+(c?"Before":"After")]=function(a) {
	return y(a)[b](this),this
}
}),X.Z.prototype=y.fn,X.uniq=B,X.deserializeValue=u,y.zepto=X,y}();
	window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(a) {
	function b(a) {
	return a._zid||(a._zid=m++)
}
function c(a,c,f,g) {
	if(c=d(c),c.ns)var h=e(c.ns);
	return(q[b(a)]||[]).filter(function(a) {
	return!(!a||c.e&&a.e!=c.e||c.ns&&!h.test(a.ns)||f&&b(a.fn)!==b(f)||g&&a.sel!=g)
}
)}function d(a) {
	var b=(""+a).split(".");
	return {
	e:b[0],ns:b.slice(1).sort().join(" ")
}
}function e(a) {
	return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?:|$)")
}
function f(a,b) {
	return a.del||!!b
}
function g(c,e,g,i,k,m,n) {
	var o=b(c),p=q[o]||(q[o]=[]);
	e.split(/\s/).forEach(function(b) {
	if("ready"==b)return a(document).ready(g);
	var e=d(b);
	e.fn=g,e.sel=k,e.del=m;
	var o=m||g;
	e.proxy=function(a) {
	if(h(a)&&(a=j(a),!a.isImmediatePropagationStopped())) {
	a.data=i;
	var b=o.apply(c,a._args==l?[a]:[a].concat(a._args));
	return b===!1&&(a.preventDefault(),a.stopPropagation()),b
}
},e.i=p.length,p.push(e),"addEventListener"in c&&c.addEventListener(e.e,e.proxy,f(e,n))})}function h(a) {
	var b=["","swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap",""].join(" ").indexOf(" "+a.type+" ")>-1;
	return b&&"kimi"!==a._trigger?!1:!0
}
function i(a,d,e,g,h) {
	var i=b(a);
	(d||"").split(/\s/).forEach(function(b) {
	c(a,b,e,g).forEach(function(b) {
	delete q[i][b.i],"removeEventListener"in a&&a.removeEventListener(b.e,b.proxy,f(b,h))
}
)})}function j(b,c) {
	return(c||!b.isDefaultPrevented)&&(c||(c=b),a.each(v,function(a,d) {
	var e=c[a];
	b[a]=function() {
	return this[d]=s,e&&e.apply(c,arguments)
}
,b[d]=t}),(c.defaultPrevented!==l?c.defaultPrevented:"returnValue"in c?c.returnValue===!1:c.getPreventDefault&&c.getPreventDefault())&&(b.isDefaultPrevented=s)),b}function k(a) {
	var b,c= {
	originalEvent:a
}
;for(b in a)u.test(b)||a[b]===l||(c[b]=a[b]);
	return j(c,a)}var l,m=(a.zepto.qsa,1),n=Array.prototype.slice,o=a.isFunction,p=function(a) {
	return"string"==typeof a
}
,q= {
	},r= {
	};
	r.click="MouseEvents",a.event= {
	add:g,remove:i
}
,a.proxy=function(c,d) {
	if(o(c)) {
	var e=function() {
	return c.apply(d,arguments)
}
;return e._zid=b(c),e}if(p(d))return a.proxy(c[d],c);
	throw new TypeError("expected function")},a.fn.one=function(a,b,c,d) {
	return this.on(a,b,c,d,1)
}
;var s=function() {
	return!0
}
,t=function() {
	return!1
}
,u=/^([A-Z]|returnValue$|layer[XY]$)/,v= {
	preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"
}
;a.fn.on=function(b,c,d,e,f) {
	var h,j,m=this;
	return b&&!p(b)?(a.each(b,function(a,b) {
	m.on(a,c,d,b,f)
}
),m):(p(c)||o(e)||e===!1||(e=d,d=c,c=l),(o(d)||d===!1)&&(e=d,d=l),e===!1&&(e=t),m.each(function(l,m) {
	f&&(h=function(a) {
	return i(m,a.type,e),e.apply(this,arguments)
}
),c&&(j=function(b) {
	var d,f=a(b.target).closest(c,m).get(0);
	return f&&f!==m?(d=a.extend(k(b) {
	currentTarget:f,liveFired:m
}
),(h||e).apply(f,[d].concat(n.call(arguments,1)))):void 0}),g(m,b,e,d,c,j||h)}))},a.fn.off=function(b,c,d) {
	var e=this;
	return b&&!p(b)?(a.each(b,function(a,b) {
	e.off(a,c,b)
}
),e):(p(c)||o(d)||d===!1||(d=c,c=l),d===!1&&(d=t),e.each(function() {
	i(this,b,d,c)
}
))},a.fn.trigger=function(b,c) {
	return b=p(b)||a.isPlainObject(b)?a.Event(b):j(b),b._args=c,b._trigger="kimi",this.each(function() {
	"dispatchEvent"in this?this.dispatchEvent(b):a(this).triggerHandler(b,c)
}
)},a.fn.triggerHandler=function(b,d) {
	var e,f;
	return this.each(function(g,h) {
	e=k(p(b)?a.Event(b):b),e._args=d,e.target=h,a.each(c(h,b.type||b),function(a,b) {
	return f=b.proxy(e),e.isImmediatePropagationStopped()?!1:void 0
}
)}),f},"focusin focusout load resize scroll unload click change select keydown keypress keyup error".split(" ").forEach(function(b) {
	a.fn[b]=function(a) {
	return a?this.on(b,a):this.trigger(b)
}
}),["focus","blur"].forEach(function(b) {
	a.fn[b]=function(a) {
	return a?this.on(b,a):this.each(function() {
	try {
	this[b]()
}
catch(a) {
	}
}
),this}}),a.Event=function(a,b) {
	p(a)||(b=a,a=b.type);
	var c=document.createEvent(r[a]||"Events"),d=!0;
	if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];
	return c.initEvent(a,d,!0),j(c)
}
}(Zepto),function(a) {
	function b(a,b,c,d) {
	return Math.abs(a-b)>=Math.abs(c-d)?a-b>0?"Left":"Right":c-d>0?"Up":"Down"
}
function c() {
	k=null,m.last&&(m.el.trigger("longTap"),m= {
	})
}
function d() {
	k&&clearTimeout(k),k=null
}
function e() {
	h&&clearTimeout(h),i&&clearTimeout(i),j&&clearTimeout(j),k&&clearTimeout(k),h=i=j=k=null,m= {
	}
}
function f(a) {
	return("touch"==a.pointerType||a.pointerType==a.MSPOINTER_TYPE_TOUCH)&&a.isPrimary
}
function g(a,b) {
	return a.type=="pointer"+b||a.type.toLowerCase()=="mspointer"+b
}
var h,i,j,k,l,m= {
	},n=750;
	a(document).ready(function() {
	var o,p,q,r,s=0,t=0;
	"MSGesture"in window&&(l=new MSGesture,l.target=document.body),a(document).on("MSGestureEnd",function(a) {
	var b=a.velocityX>1?"Right":a.velocityX<-1?"Left":a.velocityY>1?"Down":a.velocityY<-1?"Up":null;
	b&&(m.el.trigger("swipe"),m.el.trigger("swipe"+b))
}
).on("touchstart MSPointerDown pointerdown",function(b) {
	(!(r=g(b,"down"))||f(b))&&(q=r?b:b.touches[0],b.touches&&1===b.touches.length&&m.x2&&(m.x2=void 0,m.y2=void 0),o=Date.now(),p=o-(m.last||o),m.el=a("tagName"in q.target?q.target:q.target.parentNode),h&&clearTimeout(h),m.x1=q.pageX,m.y1=q.pageY,p>0&&250>=p&&(m.isDoubleTap=!0),m.last=o,k=setTimeout(c,n),l&&r&&l.addPointer(b.pointerId))
}
).on("touchmove MSPointerMove pointermove",function(a) {
	(!(r=g(a,"move"))||f(a))&&(q=r?a:a.touches[0],d(),m.x2=q.pageX,m.y2=q.pageY,s+=Math.abs(m.x1-m.x2),t+=Math.abs(m.y1-m.y2))
}
).on("touchend MSPointerUp pointerup",function(c) {
	(!(r=g(c,"up"))||f(c))&&(d(),m.x2&&Math.abs(m.x1-m.x2)>30||m.y2&&Math.abs(m.y1-m.y2)>30?j=setTimeout(function() {
	m.el.trigger("swipe"),m.el.trigger("swipe"+b(m.x1,m.x2,m.y1,m.y2)),m= {
	}
}
,0):"last"in m&&(30>s&&30>t?i=setTimeout(function() {
	var b=a.Event("tap");
	b.cancelTouch=e,m.el.trigger(b),m.isDoubleTap?(m.el&&m.el.trigger("doubleTap"),m= {
	}):h=setTimeout(function() {
	h=null,m.el&&m.el.trigger("singleTap"),m= {
	}
}
,250)},0):m= {
	}),s=t=0)
}
).on("touchcancel MSPointerCancel pointercancel",e),a(window).on("scroll",e)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(b) {
	a.fn[b]=function(a) {
	return this.on(b,a)
}
})}(Zepto),function(a) {
	function b(a,b) {
	if(-1===a.indexOf("./"))return a;
	var c,d=$._AMDMODS;
	for(var e in d)if(b===d[e].factory) {
	c=e;
	break
}
if(c) {
	if(-1===a.indexOf("../"))return c.replace(/\/[^\/]+$/,"/")+a.replace("./","");
	for(var f=a.split("../"),g=c.replace(/\/[^\/]+$/,"").split("/");
	f.length>1;
	)f.shift(),g.pop();
	return g.concat(f).join("/")
}
}$._AMDMODS= {
	},$.extend(a {
	define:function(a,b,c) {
	c||(c=b,b=[]),$._AMDMODS[a]= {
	factory:c
}
},require:function(a) {
	var c=$._AMDMODS[b(a,arguments.callee.caller)];
	return c?(c.result||(c.result=c.factory.apply(null,[this.require])),c.result):$
}
})}(window),function(a) {
	function b(a) {
	return a.replace(/^(.)/,function(a,b) {
	return b.toUpperCase()
}
)}function c(c) {
	c=c.replace(/^kimi\//,""),c=/\/$/.test(c)?c+"index":c;
	var d=[];
	return(f[c]||[]).concat(c).forEach(function(c) {
	-1===c.indexOf("/")?a[b(c)]||d.push(e+c):a._AMDMODS[c]||d.push(c)
}
),d}var d=/waptest|daily|taobao\.net|localhost/.test(location.host)?"http://g.assets.daily.taobao.net/":"http://g.tbcdn.cn/",e="tb/kimi/0.0.5/extend/",f= {
	deferred:["callbacks"],fx_methods:["fx"]
}
;-1!==location.search.indexOf("debug")&&(a.Debug=!0),a.config=function(b) {
	a.extend(f,b)
}
,a.getScript=function(b,c) {
	function d() {
	e&&(clearTimeout(e),e=null)
}
var e,f=document.createElement("script"),g=a.isFunction(c);
	return(g||c&&c.success)&&(f.onload=function() {
	d(),g?c():c.success.call(c.context)
}
),!g&&c&&(c.error&&(f.onerror=function() {
	d(),c.error.call(c.context)
}
),c.timeout&&(e=setTimeout(function() {
	e=null,c.error&&c.error.call(c.context)
}
,c.timeout))),f.setAttribute("data-path",b),f.src=b,document.body.appendChild(f)},a.use=function(b,e) {
	a.isArray(b)||(b=b.split(","));
	var f=[],g=a.Debug?".js":"-min.js",h=function() {
	e||(e=function() {
	}),e.apply(null,b.map(function(a) {
	return require(a=/\/$/.test(a)?a+"index":a)
}
))};
	b.forEach(function(a) {
	var b=c(a);
	b.length&&(f=f.concat(b))
}
),f.length?a.getScript(d+(f.length>1?"??":"")+f.join(g+",")+g,h):h()}}(Zepto),function(a) {
	function b(c,d,e,f) {
	var g,h=a.isArray(d),i=a.isPlainObject(d);
	a.each(d,function(d,j) {
	g=a.type(j),f&&(d=e?f:f+"["+(i||"object"==g||"array"==g?d:"")+"]"),!f&&h?c.add(j.name,j.value):"array"==g||!e&&"object"==g?b(c,j,e,d):c.add(d,j)
}
)}a.jsonp=a.ajaxJSONP=function(b) {
	var c,d=b.url,e=b.data,f=(b.jsonpCallback?b.jsonpCallback:"jsonp")+(new Date).getTime()+Math.round(1e5*Math.random()),g=b.success,h=b.jsonp?b.jsonp:"callback";
	e&&(d+=(-1===d.indexOf("?")?"?":"&")+(a.isPlainObject(e)?a.param(e):e)),b.success=function() {
	delete window[f],a(c).remove()
}
,window[f]=function(a) {
	g.call(b.context,a)
}
,-1!==d.indexOf(h+"=?")?d=d.replace(/=\?/,"="+f):d+=(-1===d.indexOf("?")?"?":"&")+h+"="+f,c=a.getScript(d,b)},a.ajax=function(b) {
	return"jsonp"===b.dataType?a.ajaxJSONP(b):void a.use("ajax",function() {
	a.ajax(b)
}
)};
	var c=encodeURIComponent;
	a.param=function(a,d) {
	var e=[];
	return e.add=function(a,b) {
	this.push(c(a)+"="+c(b))
}
,b(e,a,d),e.join("&").replace(/%20/g,"+")}}(Zepto),function(a) {
	function b() {
	for(var b=h.length,c=b-1;
	c>=0;
	c--) {
	var d=a(h[c]);
	d.inView()&&(d.attr("data-src")&&d.attr("data-lazyimg",d.attr("src")).attr("src",d.attr("data-src")).attr("data-src",""),h.splice(c,1))
}
}function c() {
	for(var b=i.length,c=b-1;
	c>=0;
	c--) {
	var d=a(i[c]);
	d.inView(500)||(""===d.attr("data-src")&&d.attr("data-src",d.attr("src")).attr("src",d.attr("data-lazyimg")||"about:blank"),h=h.concat(d))
}
}function d() {
	e||(e=!0,a(window).on("scroll resize",function() {
	f||(f=setTimeout(function() {
	f=null,b()
}
,250))}).on("touchend",function() {
	g||(g=setTimeout(function() {
	g=null,c()
}
,250))}))}var e,f,g,h=[],i=[];
	a.extend(a.fn {
	inView:function(b) {
	var c=a(window).scrollTop(),b=b||0,d=a(this).offset(),e=d.top,f=e+d.height,g=window.innerHeight;
	return e>=c-b&&c+g+b>=e||f>=c-b&&c+g+b>=f
}
,lazyload:function(a) {
	h=h.concat(this.slice(0)),a||(i=i.concat(this.slice(0))),b(),d()
}
})}(Zepto),function(a,b) {
	function c(a) {
	return a.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()
}
function d(a) {
	return e?e+a:a.toLowerCase()
}
var e,f,g,h,i,j,k,l,m,n,o="",p= {
	Webkit:"webkit",Moz:"",O:"o"
}
,q=window.document,r=q.createElement("div"),s=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,t= {
	};
	a.each(p,function(a,c) {
	return r.style[a+"TransitionProperty"]!==b?(o="-"+a.toLowerCase()+"-",e=c,!1):void 0
}
),f=o+"transform",t[g=o+"transition-property"]=t[h=o+"transition-duration"]=t[j=o+"transition-delay"]=t[i=o+"transition-timing-function"]=t[k=o+"animation-name"]=t[l=o+"animation-duration"]=t[n=o+"animation-delay"]=t[m=o+"animation-timing-function"]="",a.fx= {
	off:e===b&&r.style.transitionProperty===b,speeds: {
	_default:400,fast:200,slow:600
}
,cssPrefix:o,transitionEnd:d("TransitionEnd"),animationEnd:d("AnimationEnd")},a.fn.animate=function(c,d,e,f,g) {
	return a.isFunction(d)&&(f=d,e=b,d=b),a.isFunction(e)&&(f=e,e=b),a.isPlainObject(d)&&(e=d.easing,f=d.complete,g=d.delay,d=d.duration),d&&(d=("number"==typeof d?d:a.fx.speeds[d]||a.fx.speeds._default)/1e3),g&&(g=parseFloat(g)/1e3),this.anim(c,d,e,f,g)
}
,a.fn.anim=function(d,e,o,p,q) {
	var r,u,v,w= {
	},x="",y=this,z=a.fx.transitionEnd,A=!1;
	if(e===b&&(e=a.fx.speeds._default/1e3),q===b&&(q=0),a.fx.off&&(e=0),"string"==typeof d)w[k]=d,w[l]=e+"s",w[n]=q+"s",w[m]=o||"linear",z=a.fx.animationEnd;
	else {
	u=[];
	for(r in d)s.test(r)?x+=r+"("+d[r]+") ":(w[r]=d[r],u.push(c(r)));
	x&&(w[f]=x,u.push(f)),e>0&&"object"==typeof d&&(w[g]=u.join(","),w[h]=e+"s",w[j]=q+"s",w[i]=o||"linear")
}
return v=function(b) {
	if("undefined"!=typeof b) {
	if(b.target!==b.currentTarget)return;
	a(b.target).off(z,v)
}
else a(this).off(z,v);
	A=!0,a(this).css(t),p&&p.call(this)},e>0&&(this.on(z,v),setTimeout(function() {
	A||v.call(y)
}
,1e3*e+25)),this.size()&&this.get(0).clientLeft,this.css(w),0>=e&&setTimeout(function() {
	y.each(function() {
	v.call(this)
}
)},0),this},r=null,a.Fx=!0}(Zepto),function(a,b) {
	function c(c,d,e,f,g) {
	"function"!=typeof d||g||(g=d,d=b);
	var h= {
	opacity:e
}
;return f&&(h.scale=f,c.css(a.fx.cssPrefix+"transform-origin","0 0")),c.animate(h,d,null,g)}function d(b,d,e,f) {
	return c(b,d,0,e,function() {
	g.call(a(this)),f&&f.call(this)
}
)}var e=window.document,f=(e.documentElement,a.fn.show),g=a.fn.hide,h=a.fn.toggle;
	a.fn.show=function(a,d) {
	return f.call(this),a===b?a=0:this.css("opacity",0),c(this,a,1,"1,1",d)
}
,a.fn.hide=function(a,c) {
	return a===b?g.call(this):d(this,a,"0,0",c)
}
,a.fn.toggle=function(c,d) {
	return c===b||"boolean"==typeof c?h.call(this,c):this.each(function() {
	var b=a(this);
	b["none"==b.css("display")?"show":"hide"](c,d)
}
)},a.fn.fadeTo=function(a,b,d) {
	return c(this,a,b,null,d)
}
,a.fn.fadeIn=function(a,b) {
	var c=this.css("opacity");
	return c>0?this.css("opacity",0):c=1,f.call(this).fadeTo(a,c,b)
}
,a.fn.fadeOut=function(a,b) {
	return d(this,a,null,b)
}
,a.fn.fadeToggle=function(b,c) {
	return this.each(function() {
	var d=a(this);
	d[0==d.css("opacity")||"none"==d.css("display")?"fadeIn":"fadeOut"](b,c)
}
)},a.Fx_methods=!0}(Zepto),function(a) {
	a.fn.serializeArray=function() {
	var b,c=[];
	return a([].slice.call(this.get(0).elements)).each(function() {
	b=a(this);
	var d=b.attr("type");
	"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=d&&"reset"!=d&&"button"!=d&&("radio"!=d&&"checkbox"!=d||this.checked)&&c.push( {
	name:b.attr("name"),value:b.val()
}
)}),c},a.fn.serialize=function() {
	var a=[];
	return this.serializeArray().forEach(function(b) {
	a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))
}
),a.join("&")},a.fn.submit=function(b) {
	if(b)this.on("submit",b);
	else if(this.length) {
	var c=a.Event("submit");
	this.eq(0).trigger(c),c.isDefaultPrevented()||this.get(0).submit()
}
return this},a.Form=!0}(Zepto),function() {
	function a(a,b,c) {
	for(var d=(c||0)-1,e=a?a.length:0;
	++d<e;
	)if(a[d]===b)return d;
	return-1
}
function b(b,c) {
	var d=typeof c;
	if(b=b.cache,"boolean"==d||null==c)return b[c]?0:-1;
	"number"!=d&&"string"!=d&&(d="object");
	var e="number"==d?c:r+c;
	return b=(b=b[d])&&b[e],"object"==d?b&&a(b,c)>-1?0:-1:b?0:-1
}
function c(a) {
	var b=this.cache,c=typeof a;
	if("boolean"==c||null==a)b[a]=!0;
	else {
	"number"!=c&&"string"!=c&&(c="object");
	var d="number"==c?a:r+a,e=b[c]||(b[c]= {
	});
	"object"==c?(e[d]||(e[d]=[])).push(a):e[d]=!0
}
}function d(a) {
	return a.charCodeAt(0)
}
function e(a,b) {
	var c=a.criteria,d=b.criteria;
	if(c!==d) {
	if(c>d||"undefined"==typeof c)return 1;
	if(d>c||"undefined"==typeof d)return-1
}
return a.index-b.index}function f(a) {
	var b=-1,d=a.length,e=a[0],f=a[d/2|0],g=a[d-1];
	if(e&&"object"==typeof e&&f&&"object"==typeof f&&g&&"object"==typeof g)return!1;
	var h=i();
	h["false"]=h["null"]=h["true"]=h.undefined=!1;
	var j=i();
	for(j.array=a,j.cache=h,j.push=c;
	++b<d;
	)j.push(a[b]);
	return j
}
function g(a) {
	return"\\"+S[a]
}
function h() {
	return o.pop()||[]
}
function i() {
	return p.pop()|| {
	array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null
}
}function j(a) {
	a.length=0,o.length<t&&o.push(a)
}
function k(a) {
	var b=a.cache;
	b&&k(b),a.array=a.cache=a.criteria=a.object=a.number=a.string=a.value=null,p.length<t&&p.push(a)
}
function l(a,b,c) {
	b||(b=0),"undefined"==typeof c&&(c=a?a.length:0);
	for(var d=-1,e=c-b||0,f=Array(0>e?0:e);
	++d<e;
	)f[d]=a[b+d];
	return f
}
function m(c) {
	function o(a) {
	return a&&"object"==typeof a&&!Rd(a)&&Ad.call(a,"__wrapped__")?a:new p(a)
}
function p(a,b) {
	this.__chain__=!!b,this.__wrapped__=a
}
function t(a) {
	function b() {
	if(d) {
	var a=d.slice();
	Cd.apply(a,arguments)
}
if(this instanceof b) {
	var f=U(c.prototype),g=c.apply(f,a||arguments);
	return Ab(g)?g:f
}
return c.apply(e,a||arguments)}var c=a[0],d=a[2],e=a[4];
	return b}function S(a,b,c,d,e) {
	if(c) {
	var f=c(a);
	if("undefined"!=typeof f)return f
}
var g=Ab(a);
	if(!g)return a;
	var i=ud.call(a);
	if(!P[i])return a;
	var k=Pd[i];
	switch(i) {
	case I:case J:return new k(+a);
	case L:case O:return new k(a);
	case N:return f=k(a.source,z.exec(a)),f.lastIndex=a.lastIndex,f
}
var m=Rd(a);
	if(b) {
	var n=!d;
	d||(d=h()),e||(e=h());
	for(var o=d.length;
	o--;
	)if(d[o]==a)return e[o];
	f=m?k(a.length): {
	}
}
else f=m?l(a):Zd( {
	},a);
	return m&&(Ad.call(a,"index")&&(f.index=a.index),Ad.call(a,"input")&&(f.input=a.input)),b?(d.push(a),e.push(f),(m?Yd:ae)(a,function(a,g) {
	f[g]=S(a,b,c,d,e)
}
),n&&(j(d),j(e)),f):f}function U(a) {
	return Ab(a)?Gd(a): {
	}
}
function W(a,b,c) {
	if("function"!=typeof a)return Sc;
	if("undefined"==typeof b||!("prototype"in a))return a;
	switch(c) {
	case 1:return function(c) {
	return a.call(b,c)
}
;case 2:return function(c,d) {
	return a.call(b,c,d)
}
;case 3:return function(c,d,e) {
	return a.call(b,c,d,e)
}
;case 4:return function(c,d,e,f) {
	return a.call(b,c,d,e,f)
}
}return Cc(a,b)}function X(a) {
	function b() {
	var a=i?g:this;
	if(e) {
	var o=e.slice();
	Cd.apply(o,arguments)
}
if((f||k)&&(o||(o=l(arguments)),f&&Cd.apply(o,f),k&&o.length<h))return d|=16,X([c,m?d:-4&d,o,null,g,h]);
	if(o||(o=arguments),j&&(c=a[n]),this instanceof b) {
	a=U(c.prototype);
	var p=c.apply(a,o);
	return Ab(p)?p:a
}
return c.apply(a,o)}var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],i=1&d,j=2&d,k=4&d,m=8&d,n=c;
	return b}function Y(c,d) {
	var e=-1,g=fb(),h=c?c.length:0,i=h>=s&&g===a,j=[];
	if(i) {
	var l=f(d);
	l?(g=b,d=l):i=!1
}
for(;
	++e<h;
	) {
	var m=c[e];
	g(d,m)<0&&j.push(m)
}
return i&&k(d),j}function Z(a,b,c,d) {
	for(var e=(d||0)-1,f=a?a.length:0,g=[];
	++e<f;
	) {
	var h=a[e];
	if(h&&"object"==typeof h&&"number"==typeof h.length&&(Rd(h)||ib(h))) {
	b||(h=Z(h,b,c));
	var i=-1,j=h.length,k=g.length;
	for(g.length+=j;
	++i<j;
	)g[k++]=h[i]
}
else c||g.push(h)}return g}function $(a,b,c,d,e,f) {
	if(c) {
	var g=c(a,b);
	if("undefined"!=typeof g)return!!g
}
if(a===b)return 0!==a||1/a==1/b;
	var i=typeof a,k=typeof b;
	if(!(a!==a||a&&R[i]||b&&R[k]))return!1;
	if(null==a||null==b)return a===b;
	var l=ud.call(a),m=ud.call(b);
	if(l==G&&(l=M),m==G&&(m=M),l!=m)return!1;
	switch(l) {
	case I:case J:return+a==+b;
	case L:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;
	case N:case O:return a==od(b)
}
var n=l==H;
	if(!n) {
	var o=Ad.call(a,"__wrapped__"),p=Ad.call(b,"__wrapped__");
	if(o||p)return $(o?a.__wrapped__:a,p?b.__wrapped__:b,c,d,e,f);
	if(l!=M)return!1;
	var q=a.constructor,r=b.constructor;
	if(q!=r&&!(zb(q)&&q instanceof q&&zb(r)&&r instanceof r)&&"constructor"in a&&"constructor"in b)return!1
}
var s=!e;
	e||(e=h()),f||(f=h());
	for(var t=e.length;
	t--;
	)if(e[t]==a)return f[t]==b;
	var u=0;
	if(g=!0,e.push(a),f.push(b),n) {
	if(t=a.length,u=b.length,g=u==a.length,!g&&!d)return g;
	for(;
	u--;
	) {
	var v=t,w=b[u];
	if(d)for(;
	v--&&!(g=$(a[v],w,c,d,e,f));
	);else if(!(g=$(a[u],w,c,d,e,f)))break
}
return g}return _d(b,function(b,h,i) {
	return Ad.call(i,h)?(u++,g=Ad.call(a,h)&&$(a[h],b,c,d,e,f)):void 0
}
),g&&!d&&_d(a,function(a,b,c) {
	return Ad.call(c,b)?g=--u>-1:void 0
}
),s&&(j(e),j(f)),g}function _(a,b,c,d,e) {
	(Rd(b)?Tb:ae)(b,function(b,f) {
	var g,h,i=b,j=a[f];
	if(b&&((h=Rd(b))||be(b))) {
	for(var k=d.length;
	k--;
	)if(g=d[k]==b) {
	j=e[k];
	break
}
if(!g) {
	var l;
	c&&(i=c(j,b),(l="undefined"!=typeof i)&&(j=i)),l||(j=h?Rd(j)?j:[]:be(j)?j: {
	}),d.push(b),e.push(j),l||_(j,b,c,d,e)
}
}else c&&(i=c(j,b),"undefined"==typeof i&&(i=b)),"undefined"!=typeof i&&(j=i);
	a[f]=j})}function ab(a,b) {
	return a+yd(Od()*(b-a+1))
}
function bb(c,d,e) {
	var g=-1,i=fb(),l=c?c.length:0,m=[],n=!d&&l>=s&&i===a,o=e||n?h():m;
	if(n) {
	var p=f(o);
	p?(i=b,o=p):(n=!1,o=e?o:(j(o),m))
}
for(;
	++g<l;
	) {
	var q=c[g],r=e?e(q,g,c):q;
	(d?!g||o[o.length-1]!==r:i(o,r)<0)&&((e||n)&&o.push(r),m.push(q))
}
return n?(j(o.array),k(o)):e&&j(o),m}function cb(a) {
	return function(b,c,d) {
	var e= {
	};
	if(c=o.createCallback(c,d,3),Rd(b))for(var f=-1,g=b.length;
	++f<g;
	) {
	var h=b[f];
	a(e,h,c(h,f,b),b)
}
else Yd(b,function(b,d,f) {
	a(e,b,c(b,d,f),f)
}
);
	return e}}function db(a,b,c,d,e,f) {
	var g=2&b,h=16&b,i=32&b;
	if(!g&&!zb(a))throw new pd;
	h&&!c.length&&(b&=-17,h=c=!1),i&&!d.length&&(b&=-33,i=d=!1);
	var j=1==b||17===b?t:X;
	return j([a,b,c,d,e,f])
}
function eb(a) {
	return Ud[a]
}
function fb() {
	var b=(b=o.indexOf)===mc?a:b;
	return b
}
function gb(a) {
	var b,c;
	return a&&ud.call(a)==M&&(b=a.constructor,!zb(b)||b instanceof b)?(_d(a,function(a,b) {
	c=b
}
),"undefined"==typeof c||Ad.call(a,c)):!1}function hb(a) {
	return Vd[a]
}
function ib(a) {
	return a&&"object"==typeof a&&"number"==typeof a.length&&ud.call(a)==G||!1
}
function jb(a,b,c,d) {
	return"boolean"!=typeof b&&null!=b&&(d=c,c=b,b=!1),S(a,b,"function"==typeof c&&W(c,d,1))
}
function kb(a,b,c) {
	return S(a,!0,"function"==typeof b&&W(b,c,1))
}
function lb(a,b) {
	var c=U(a);
	return b?Zd(c,b):c
}
function mb(a,b,c) {
	var d;
	return b=o.createCallback(b,c,3),ae(a,function(a,c,e) {
	return b(a,c,e)?(d=c,!1):void 0
}
),d}function nb(a,b,c) {
	var d;
	return b=o.createCallback(b,c,3),pb(a,function(a,c,e) {
	return b(a,c,e)?(d=c,!1):void 0
}
),d}function ob(a,b,c) {
	var d=[];
	_d(a,function(a,b) {
	d.push(b,a)
}
);
	var e=d.length;
	for(b=W(b,c,3);
	e--&&b(d[e--],d[e],a)!==!1;
	);return a}function pb(a,b,c) {
	var d=Td(a),e=d.length;
	for(b=W(b,c,3);
	e--;
	) {
	var f=d[e];
	if(b(a[f],f,a)===!1)break
}
return a}function qb(a) {
	var b=[];
	return _d(a,function(a,c) {
	zb(a)&&b.push(c)
}
),b.sort()}function rb(a,b) {
	return a?Ad.call(a,b):!1
}
function sb(a) {
	for(var b=-1,c=Td(a),d=c.length,e= {
	};
	++b<d;
	) {
	var f=c[b];
	e[a[f]]=f
}
return e}function tb(a) {
	return a===!0||a===!1||a&&"object"==typeof a&&ud.call(a)==I||!1
}
function ub(a) {
	return a&&"object"==typeof a&&ud.call(a)==J||!1
}
function vb(a) {
	return a&&1===a.nodeType||!1
}
function wb(a) {
	var b=!0;
	if(!a)return b;
	var c=ud.call(a),d=a.length;
	return c==H||c==O||c==G||c==M&&"number"==typeof d&&zb(a.splice)?!d:(ae(a,function() {
	return b=!1
}
),b)}function xb(a,b,c,d) {
	return $(a,b,"function"==typeof c&&W(c,d,2))
}
function yb(a) {
	return Id(a)&&!Jd(parseFloat(a))
}
function zb(a) {
	return"function"==typeof a
}
function Ab(a) {
	return!(!a||!R[typeof a])
}
function Bb(a) {
	return Db(a)&&a!=+a
}
function Cb(a) {
	return null===a
}
function Db(a) {
	return"number"==typeof a||a&&"object"==typeof a&&ud.call(a)==L||!1
}
function Eb(a) {
	return a&&R[typeof a]&&ud.call(a)==N||!1
}
function Fb(a) {
	return"string"==typeof a||a&&"object"==typeof a&&ud.call(a)==O||!1
}
function Gb(a) {
	return"undefined"==typeof a
}
function Hb(a) {
	var b=arguments,c=2;
	if(!Ab(a))return a;
	if("number"!=typeof b[2]&&(c=b.length),c>3&&"function"==typeof b[c-2])var d=W(b[--c-1],b[c--],2);
	else c>2&&"function"==typeof b[c-1]&&(d=b[--c]);
	for(var e=l(arguments,1,c),f=-1,g=h(),i=h();
	++f<c;
	)_(a,e[f],d,g,i);
	return j(g),j(i),a
}
function Ib(a,b,c) {
	var d= {
	};
	if("function"!=typeof b) {
	var e=[];
	_d(a,function(a,b) {
	e.push(b)
}
),e=Y(e,Z(arguments,!0,!1,1));
	for(var f=-1,g=e.length;
	++f<g;
	) {
	var h=e[f];
	d[h]=a[h]
}
}else b=o.createCallback(b,c,3),_d(a,function(a,c,e) {
	b(a,c,e)||(d[c]=a)
}
);
	return d}function Jb(a) {
	for(var b=-1,c=Td(a),d=c.length,e=fd(d);
	++b<d;
	) {
	var f=c[b];
	e[b]=[f,a[f]]
}
return e}function Kb(a,b,c) {
	var d= {
	};
	if("function"!=typeof b)for(var e=-1,f=Z(arguments,!0,!1,1),g=Ab(a)?f.length:0;
	++e<g;
	) {
	var h=f[e];
	h in a&&(d[h]=a[h])
}
else b=o.createCallback(b,c,3),_d(a,function(a,c,e) {
	b(a,c,e)&&(d[c]=a)
}
);
	return d}function Lb(a,b,c,d) {
	var e=Rd(a);
	if(null==c)if(e)c=[];
	else {
	var f=a&&a.constructor,g=f&&f.prototype;
	c=U(g)
}
return b&&(b=o.createCallback(b,d,4),(e?Yd:ae)(a,function(a,d,e) {
	return b(c,a,d,e)
}
)),c}function Mb(a) {
	for(var b=-1,c=Td(a),d=c.length,e=fd(d);
	++b<d;
	)e[b]=a[c[b]];
	return e
}
function Nb(a) {
	for(var b=arguments,c=-1,d=Z(b,!0,!1,1),e=b[2]&&b[2][b[1]]===a?1:d.length,f=fd(e);
	++c<e;
	)f[c]=a[d[c]];
	return f
}
function Ob(a,b,c) {
	var d=-1,e=fb(),f=a?a.length:0,g=!1;
	return c=(0>c?Ld(0,f+c):c)||0,Rd(a)?g=e(a,b,c)>-1:"number"==typeof f?g=(Fb(a)?a.indexOf(b,c):e(a,b,c))>-1:Yd(a,function(a) {
	return++d>=c?!(g=a===b):void 0
}
),g}function Pb(a,b,c) {
	var d=!0;
	if(b=o.createCallback(b,c,3),Rd(a))for(var e=-1,f=a.length;
	++e<f&&(d=!!b(a[e],e,a));
	);else Yd(a,function(a,c,e) {
	return d=!!b(a,c,e)
}
);
	return d}function Qb(a,b,c) {
	var d=[];
	if(b=o.createCallback(b,c,3),Rd(a))for(var e=-1,f=a.length;
	++e<f;
	) {
	var g=a[e];
	b(g,e,a)&&d.push(g)
}
else Yd(a,function(a,c,e) {
	b(a,c,e)&&d.push(a)
}
);
	return d}function Rb(a,b,c) {
	if(b=o.createCallback(b,c,3),!Rd(a)) {
	var d;
	return Yd(a,function(a,c,e) {
	return b(a,c,e)?(d=a,!1):void 0
}
),d}for(var e=-1,f=a.length;
	++e<f;
	) {
	var g=a[e];
	if(b(g,e,a))return g
}
}function Sb(a,b,c) {
	var d;
	return b=o.createCallback(b,c,3),Ub(a,function(a,c,e) {
	return b(a,c,e)?(d=a,!1):void 0
}
),d}function Tb(a,b,c) {
	if(b&&"undefined"==typeof c&&Rd(a))for(var d=-1,e=a.length;
	++d<e&&b(a[d],d,a)!==!1;
	);else Yd(a,b,c);
	return a
}
function Ub(a,b,c) {
	var d=a,e=a?a.length:0;
	if(b=b&&"undefined"==typeof c?b:W(b,c,3),Rd(a))for(;
	e--&&b(a[e],e,a)!==!1;
	);else {
	if("number"!=typeof e) {
	var f=Td(a);
	e=f.length
}
Yd(a,function(a,c,g) {
	return c=f?f[--e]:--e,b(d[c],c,g)
}
)}return a}function Vb(a,b) {
	var c=l(arguments,2),d=-1,e="function"==typeof b,f=a?a.length:0,g=fd("number"==typeof f?f:0);
	return Tb(a,function(a) {
	g[++d]=(e?b:a[b]).apply(a,c)
}
),g}function Wb(a,b,c) {
	var d=-1,e=a?a.length:0,f=fd("number"==typeof e?e:0);
	if(b=o.createCallback(b,c,3),Rd(a))for(;
	++d<e;
	)f[d]=b(a[d],d,a);
	else Yd(a,function(a,c,e) {
	f[++d]=b(a,c,e)
}
);
	return f}function Xb(a,b,c) {
	var e=-1/0,f=e;
	if("function"!=typeof b&&c&&c[b]===a&&(b=null),null==b&&Rd(a))for(var g=-1,h=a.length;
	++g<h;
	) {
	var i=a[g];
	i>f&&(f=i)
}
else b=null==b&&Fb(a)?d:o.createCallback(b,c,3),Yd(a,function(a,c,d) {
	var g=b(a,c,d);
	g>e&&(e=g,f=a)
}
);
	return f}function Yb(a,b,c) {
	var e=1/0,f=e;
	if("function"!=typeof b&&c&&c[b]===a&&(b=null),null==b&&Rd(a))for(var g=-1,h=a.length;
	++g<h;
	) {
	var i=a[g];
	f>i&&(f=i)
}
else b=null==b&&Fb(a)?d:o.createCallback(b,c,3),Yd(a,function(a,c,d) {
	var g=b(a,c,d);
	e>g&&(e=g,f=a)
}
);
	return f}function Zb(a,b,c,d) {
	var e=arguments.length<3;
	if(b=o.createCallback(b,d,4),Rd(a)) {
	var f=-1,g=a.length;
	for(e&&(c=a[++f]);
	++f<g;
	)c=b(c,a[f],f,a)
}
else Yd(a,function(a,d,f) {
	c=e?(e=!1,a):b(c,a,d,f)
}
);
	return c}function $b(a,b,c,d) {
	var e=arguments.length<3;
	return b=o.createCallback(b,d,4),Ub(a,function(a,d,f) {
	c=e?(e=!1,a):b(c,a,d,f)
}
),c}function _b(a,b,c) {
	return b=o.createCallback(b,c,3),Qb(a,function(a,c,d) {
	return!b(a,c,d)
}
)}function ac(a,b,c) {
	if(a&&"number"!=typeof a.length&&(a=Mb(a)),null==b||c)return a?a[ab(0,a.length-1)]:n;
	var d=bc(a);
	return d.length=Md(Ld(0,b),d.length),d
}
function bc(a) {
	var b=-1,c=a?a.length:0,d=fd("number"==typeof c?c:0);
	return Tb(a,function(a) {
	var c=ab(0,++b);
	d[b]=d[c],d[c]=a
}
),d}function cc(a) {
	var b=a?a.length:0;
	return"number"==typeof b?b:Td(a).length
}
function dc(a,b,c) {
	var d;
	if(b=o.createCallback(b,c,3),Rd(a))for(var e=-1,f=a.length;
	++e<f&&!(d=b(a[e],e,a));
	);else Yd(a,function(a,c,e) {
	return!(d=b(a,c,e))
}
);
	return!!d}function ec(a,b,c) {
	var d=-1,f=a?a.length:0,g=fd("number"==typeof f?f:0);
	for(b=o.createCallback(b,c,3),Tb(a,function(a,c,e) {
	var f=g[++d]=i();
	f.criteria=b(a,c,e),f.index=d,f.value=a
}
),f=g.length,g.sort(e);
	f--;
	) {
	var h=g[f];
	g[f]=h.value,k(h)
}
return g}function fc(a) {
	return a&&"number"==typeof a.length?l(a):Mb(a)
}
function gc(a) {
	for(var b=-1,c=a?a.length:0,d=[];
	++b<c;
	) {
	var e=a[b];
	e&&d.push(e)
}
return d}function hc(a) {
	return Y(a,Z(arguments,!0,!0,1))
}
function ic(a,b,c) {
	var d=-1,e=a?a.length:0;
	for(b=o.createCallback(b,c,3);
	++d<e;
	)if(b(a[d],d,a))return d;
	return-1
}
function jc(a,b,c) {
	var d=a?a.length:0;
	for(b=o.createCallback(b,c,3);
	d--;
	)if(b(a[d],d,a))return d;
	return-1
}
function kc(a,b,c) {
	var d=0,e=a?a.length:0;
	if("number"!=typeof b&&null!=b) {
	var f=-1;
	for(b=o.createCallback(b,c,3);
	++f<e&&b(a[f],f,a);
	)d++
}
else if(d=b,null==d||c)return a?a[0]:n;
	return l(a,0,Md(Ld(0,d),e))}function lc(a,b,c,d) {
	return"boolean"!=typeof b&&null!=b&&(d=c,c="function"!=typeof b&&d&&d[b]===a?null:b,b=!1),null!=c&&(a=Wb(a,c,d)),Z(a,b)
}
function mc(b,c,d) {
	if("number"==typeof d) {
	var e=b?b.length:0;
	d=0>d?Ld(0,e+d):d||0
}
else if(d) {
	var f=vc(b,c);
	return b[f]===c?f:-1
}
return a(b,c,d)}function nc(a,b,c) {
	var d=0,e=a?a.length:0;
	if("number"!=typeof b&&null!=b) {
	var f=e;
	for(b=o.createCallback(b,c,3);
	f--&&b(a[f],f,a);
	)d++
}
else d=null==b||c?1:b||d;
	return l(a,0,Md(Ld(0,e-d),e))}function oc(c) {
	for(var d=arguments,e=d.length,g=-1,i=h(),l=-1,m=fb(),n=c?c.length:0,o=[],p=h();
	++g<e;
	) {
	var q=d[g];
	i[g]=m===a&&(q?q.length:0)>=s&&f(g?d[g]:p)
}
a:for(;
	++l<n;
	) {
	var r=i[0];
	if(q=c[l],(r?b(r,q):m(p,q))<0) {
	for(g=e,(r||p).push(q);
	--g;
	)if(r=i[g],(r?b(r,q):m(d[g],q))<0)continue a;
	o.push(q)
}
}for(;
	e--;
	)r=i[e],r&&k(r);
	return j(i),j(p),o}function pc(a,b,c) {
	var d=0,e=a?a.length:0;
	if("number"!=typeof b&&null!=b) {
	var f=e;
	for(b=o.createCallback(b,c,3);
	f--&&b(a[f],f,a);
	)d++
}
else if(d=b,null==d||c)return a?a[e-1]:n;
	return l(a,Ld(0,e-d))}function qc(a,b,c) {
	var d=a?a.length:0;
	for("number"==typeof c&&(d=(0>c?Ld(0,d+c):Md(c,d-1))+1);
	d--;
	)if(a[d]===b)return d;
	return-1
}
function rc(a) {
	for(var b=arguments,c=0,d=b.length,e=a?a.length:0;
	++c<d;
	)for(var f=-1,g=b[c];
	++f<e;
	)a[f]===g&&(Fd.call(a,f--,1),e--);
	return a
}
function sc(a,b,c) {
	a=+a||0,c="number"==typeof c?c:+c||1,null==b&&(b=a,a=0);
	for(var d=-1,e=Ld(0,wd((b-a)/(c||1))),f=fd(e);
	++d<e;
	)f[d]=a,a+=c;
	return f
}
function tc(a,b,c) {
	var d=-1,e=a?a.length:0,f=[];
	for(b=o.createCallback(b,c,3);
	++d<e;
	) {
	var g=a[d];
	b(g,d,a)&&(f.push(g),Fd.call(a,d--,1),e--)
}
return f}function uc(a,b,c) {
	if("number"!=typeof b&&null!=b) {
	var d=0,e=-1,f=a?a.length:0;
	for(b=o.createCallback(b,c,3);
	++e<f&&b(a[e],e,a);
	)d++
}
else d=null==b||c?1:Ld(0,b);
	return l(a,d)}function vc(a,b,c,d) {
	var e=0,f=a?a.length:e;
	for(c=c?o.createCallback(c,d,1):Sc,b=c(b);
	f>e;
	) {
	var g=e+f>>>1;
	c(a[g])<b?e=g+1:f=g
}
return e}function wc() {
	return bb(Z(arguments,!0,!0))
}
function xc(a,b,c,d) {
	return"boolean"!=typeof b&&null!=b&&(d=c,c="function"!=typeof b&&d&&d[b]===a?null:b,b=!1),null!=c&&(c=o.createCallback(c,d,3)),bb(a,b,c)
}
function yc(a) {
	return Y(a,l(arguments,1))
}
function zc() {
	for(var a=arguments.length>1?arguments:arguments[0],b=-1,c=a?Xb(fe(a,"length")):0,d=fd(0>c?0:c);
	++b<c;
	)d[b]=fe(a,b);
	return d
}
function Ac(a,b) {
	for(var c=-1,d=a?a.length:0,e= {
	};
	++c<d;
	) {
	var f=a[c];
	b?e[f]=b[c]:f&&(e[f[0]]=f[1])
}
return e}function Bc(a,b) {
	if(!zb(b))throw new pd;
	return function() {
	return--a<1?b.apply(this,arguments):void 0
}
}function Cc(a,b) {
	return arguments.length>2?db(a,17,l(arguments,2),null,b):db(a,1,null,null,b)
}
function Dc(a) {
	for(var b=arguments.length>1?Z(arguments,!0,!1,1):qb(a),c=-1,d=b.length;
	++c<d;
	) {
	var e=b[c];
	a[e]=db(a[e],1,null,null,a)
}
return a}function Ec(a,b) {
	return arguments.length>2?db(b,19,l(arguments,2),null,a):db(b,3,null,null,a)
}
function Fc() {
	for(var a=arguments,b=a.length;
	b--;
	)if(!zb(a[b]))throw new pd;
	return function() {
	for(var b=arguments,c=a.length;
	c--;
	)b=[a[c].apply(this,b)];
	return b[0]
}
}function Gc(a,b,c) {
	var d=typeof a;
	if(null==a||"function"==d)return W(a,b,c);
	if("object"!=d)return function(b) {
	return b[a]
}
;var e=Td(a),f=e[0],g=a[f];
	return 1!=e.length||g!==g||Ab(g)?function(b) {
	for(var c=e.length,d=!1;
	c--&&(d=$(b[e[c]],a[e[c]],null,!0));
	);return d
}
:function(a) {
	var b=a[f];
	return g===b&&(0!==g||1/g==1/b)
}
}function Hc(a,b) {
	return b="number"==typeof b?b:+b||a.length,db(a,4,null,null,null,b)
}
function Ic(a,b,c) {
	var d,e,f,g,h,i,j,k=0,l=!1,m=!0;
	if(!zb(a))throw new pd;
	if(b=Ld(0,b)||0,c===!0) {
	var o=!0;
	m=!1
}
else Ab(c)&&(o=c.leading,l="maxWait"in c&&(Ld(b,c.maxWait)||0),m="trailing"in c?c.trailing:m);
	var p=function() {
	var c=b-(Bd()-g);
	if(0>=c) {
	e&&xd(e);
	var l=j;
	e=i=j=n,l&&(k=Bd(),f=a.apply(h,d),i||e||(d=h=null))
}
else i=Ed(p,c)},q=function() {
	i&&xd(i),e=i=j=n,(m||l!==b)&&(k=Bd(),f=a.apply(h,d),i||e||(d=h=null))
}
;return function() {
	if(d=arguments,g=Bd(),h=this,j=m&&(i||!o),l===!1)var c=o&&!i;
	else {
	e||o||(k=g);
	var n=l-(g-k),r=0>=n;
	r?(e&&(e=xd(e)),k=g,f=a.apply(h,d)):e||(e=Ed(q,n))
}
return r&&i?i=xd(i):i||b===l||(i=Ed(p,b)),c&&(r=!0,f=a.apply(h,d)),!r||i||e||(d=h=null),f}}function Jc(a) {
	if(!zb(a))throw new pd;
	var b=l(arguments,1);
	return Ed(function() {
	a.apply(n,b)
}
,1)}function Kc(a,b) {
	if(!zb(a))throw new pd;
	var c=l(arguments,2);
	return Ed(function() {
	a.apply(n,c)
}
,b)}function Lc(a,b) {
	if(!zb(a))throw new pd;
	var c=function() {
	var d=c.cache,e=b?b.apply(this,arguments):r+arguments[0];
	return Ad.call(d,e)?d[e]:d[e]=a.apply(this,arguments)
}
;return c.cache= {
	},c
}
function Mc(a) {
	var b,c;
	if(!zb(a))throw new pd;
	return function() {
	return b?c:(b=!0,c=a.apply(this,arguments),a=null,c)
}
}function Nc(a) {
	return db(a,16,l(arguments,1))
}
function Oc(a) {
	return db(a,32,null,l(arguments,1))
}
function Pc(a,b,c) {
	var d=!0,e=!0;
	if(!zb(a))throw new pd;
	return c===!1?d=!1:Ab(c)&&(d="leading"in c?c.leading:d,e="trailing"in c?c.trailing:e),Q.leading=d,Q.maxWait=b,Q.trailing=e,Ic(a,b,Q)
}
function Qc(a,b) {
	return db(b,16,[a])
}
function Rc(a) {
	return null==a?"":od(a).replace(Xd,eb)
}
function Sc(a) {
	return a
}
function Tc(a,b) {
	var c=a,d=!b||zb(c);
	b||(c=p,b=a,a=o),Tb(qb(b),function(e) {
	var f=a[e]=b[e];
	d&&(c.prototype[e]=function() {
	var b=this.__wrapped__,d=[b];
	Cd.apply(d,arguments);
	var e=f.apply(a,d);
	return b&&"object"==typeof b&&b===e?this:(e=new c(e),e.__chain__=this.__chain__,e)
}
)})}function Uc() {
	return c._=td,this
}
function Vc() {
	}function Wc(a,b,c) {
	var d=null==a,e=null==b;
	if(null==c&&("boolean"==typeof a&&e?(c=a,a=1):e||"boolean"!=typeof b||(c=b,e=!0)),d&&e&&(b=1),a=+a||0,e?(b=a,a=0):b=+b||0,c||a%1||b%1) {
	var f=Od();
	return Md(a+f*(b-a+parseFloat("1e-"+((f+"").length-1))),b)
}
return ab(a,b)}function Xc(a,b) {
	if(a) {
	var c=a[b];
	return zb(c)?a[b]():c
}
}function Yc(a,b,c) {
	var d=o.templateSettings;
	a=od(a||""),c=$d( {
	},c,d);
	var e,f=$d( {
	},c.imports,d.imports),h=Td(f),i=Mb(f),j=0,k=c.interpolate||C,l="__p += '",m=nd((c.escape||C).source+"|"+k.source+"|"+(k===A?y:C).source+"|"+(c.evaluate||C).source+"|$","g");
	a.replace(m,function(b,c,d,f,h,i) {
	return d||(d=f),l+=a.slice(j,i).replace(D,g),c&&(l+="' +\n__e("+c+") +\n'"),h&&(e=!0,l+="';
	\n"+h+";
	\n__p += '"),d&&(l+="' +\n((__t = ("+d+")) == null ? '':__t) +\n'"),j=i+b.length,b
}
),l+="';
	\n";
	var p=c.variable,q=p;
	q||(p="obj",l="with ("+p+") {
	\n"+l+"\n
}
\n"),l=(e?l.replace(v,""):l).replace(w,"$1").replace(x,"$1;
	"),l="function("+p+") {
	\n"+(q?"":p+" || ("+p+" = {
	});
	\n")+"var __t,__p = '',__e = _.escape"+(e?",__j = Array.prototype.join;
	\nfunction print() {
	__p += __j.call(arguments,'')
}
\n":";
	\n")+l+"return __p\n}";
	var r="\n/*\n//# sourceURL="+(c.sourceURL||"/lodash/template/source["+F++ +"]")+"\n*/";
	try {
	var s=jd(h,"return "+l+r).apply(n,i)
}
catch(t) {
	throw t.source=l,t
}
return b?s(b):(s.source=l,s)}function Zc(a,b,c) {
	a=(a=+a)>-1?a:0;
	var d=-1,e=fd(a);
	for(b=W(b,c,1);
	++d<a;
	)e[d]=b(d);
	return e
}
function $c(a) {
	return null==a?"":od(a).replace(Wd,hb)
}
function _c(a) {
	var b=++q;
	return od(null==a?"":a)+b
}
function ad(a) {
	return a=new p(a),a.__chain__=!0,a
}
function bd(a,b) {
	return b(a),a
}
function cd() {
	return this.__chain__=!0,this
}
function dd() {
	return od(this.__wrapped__)
}
function ed() {
	return this.__wrapped__
}
c=c?V.defaults(T.Object(),c,V.pick(T,E)):T;
	var fd=c.Array,gd=c.Boolean,hd=c.Date,id=c.Error,jd=c.Function,kd=c.Math,ld=c.Number,md=c.Object,nd=c.RegExp,od=c.String,pd=c.TypeError,qd=[],rd=id.prototype,sd=md.prototype,td=c._,ud=sd.toString,vd=nd("^"+od(ud).replace(/[.*+?^$ {
	}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),wd=kd.ceil,xd=c.clearTimeout,yd=kd.floor,zd=vd.test(zd=md.getPrototypeOf)&&zd,Ad=sd.hasOwnProperty,Bd=vd.test(Bd=hd.now)&&Bd||function() {
	return+new hd
}
,Cd=qd.push,Dd=sd.propertyIsEnumerable,Ed=c.setTimeout,Fd=qd.splice,Gd=vd.test(Gd=md.create)&&Gd,Hd=vd.test(Hd=fd.isArray)&&Hd,Id=c.isFinite,Jd=c.isNaN,Kd=vd.test(Kd=md.keys)&&Kd,Ld=kd.max,Md=kd.min,Nd=c.parseInt,Od=kd.random,Pd= {
	};
	Pd[H]=fd,Pd[I]=gd,Pd[J]=hd,Pd[K]=jd,Pd[M]=md,Pd[L]=ld,Pd[N]=nd,Pd[O]=od,p.prototype=o.prototype;
	var Qd=o.support= {
	};
	Qd.enumErrorProps=Dd.call(rd,"message")||Dd.call(rd,"name"),Qd.enumPrototypes=!0,Qd.nonEnumArgs=!0,o.templateSettings= {
	escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:A,variable:"",imports: {
	_:o
}
},Gd||(U=function() {
	function a() {
	}return function(b) {
	if(Ab(b)) {
	a.prototype=b;
	var d=new a;
	a.prototype=null
}
return d||c.Object()}}());
	var Rd=Hd||function(a) {
	return a&&"object"==typeof a&&"number"==typeof a.length&&ud.call(a)==H||!1
}
,Sd=function(a) {
	var b,c=a,d=[];
	if(!c)return d;
	if(!R[typeof a])return d;
	var e=c.length;
	if(b=-1,e&&ib(c))for(;
	++b<e;
	)b+="",d.push(b);
	else {
	var f="function"==typeof c;
	for(b in c)f&&"prototype"==b||!Ad.call(c,b)||d.push(b)
}
return d},Td=Kd?function(a) {
	return Ab(a)?Qd.enumPrototypes&&"function"==typeof a||Qd.nonEnumArgs&&a.length&&ib(a)?Sd(a):Kd(a):[]
}
:Sd,Ud= {
	"&":"&amp;
	","<":"&lt;
	",">":"&gt;
	",'"':"&quot;
	","'":"&#39;
	"
}
,Vd=sb(Ud),Wd=nd("("+Td(Vd).join("|")+")","g"),Xd=nd("["+Td(Ud).join("")+"]","g"),Yd=function(a,b,c) {
	var d,e=a,f=e;
	if(!e)return f;
	b=b&&"undefined"==typeof c?b:W(b,c,3);
	var g=e.length;
	if(d=-1,"number"==typeof g) {
	for(;
	++d<g;
	)if(b(e[d],d,a)===!1)return f
}
else {
	var h="function"==typeof e;
	for(d in e)if((!h||"prototype"!=d)&&Ad.call(e,d)&&b(e[d],d,a)===!1)return f
}
return f},Zd=function(a,b,c) {
	var d,e=a,f=e;
	if(!e)return f;
	var g=arguments,h=0,i="number"==typeof c?2:g.length;
	if(i>3&&"function"==typeof g[i-2])var j=W(g[--i-1],g[i--],2);
	else i>2&&"function"==typeof g[i-1]&&(j=g[--i]);
	for(;
	++h<i;
	)if(e=g[h],e&&R[typeof e]) {
	var k=e.length;
	if(d=-1,k&&ib(e))for(;
	++d<k;
	)d+="",f[d]=j?j(f[d],e[d]):e[d];
	else {
	var l="function"==typeof e;
	for(d in e)l&&"prototype"==d||!Ad.call(e,d)||(f[d]=j?j(f[d],e[d]):e[d])
}
}return f},$d=function(a,b,c) {
	var d,e=a,f=e;
	if(!e)return f;
	for(var g=arguments,h=0,i="number"==typeof c?2:g.length;
	++h<i;
	)if(e=g[h],e&&R[typeof e]) {
	var j=e.length;
	if(d=-1,j&&ib(e))for(;
	++d<j;
	)d+="","undefined"==typeof f[d]&&(f[d]=e[d]);
	else {
	var k="function"==typeof e;
	for(d in e)k&&"prototype"==d||!Ad.call(e,d)||"undefined"==typeof f[d]&&(f[d]=e[d])
}
}return f},_d=function(a,b,c) {
	var d,e=a,f=e;
	if(!e)return f;
	if(!R[typeof e])return f;
	b=b&&"undefined"==typeof c?b:W(b,c,3);
	var g=e.length;
	if(d=-1,g&&ib(e)) {
	for(;
	++d<g;
	)if(d+="",b(e[d],d,a)===!1)return f
}
else {
	var h="function"==typeof e;
	for(d in e)if((!h||"prototype"!=d)&&b(e[d],d,a)===!1)return f
}
return f},ae=function(a,b,c) {
	var d,e=a,f=e;
	if(!e)return f;
	if(!R[typeof e])return f;
	b=b&&"undefined"==typeof c?b:W(b,c,3);
	var g=e.length;
	if(d=-1,g&&ib(e)) {
	for(;
	++d<g;
	)if(d+="",b(e[d],d,a)===!1)return f
}
else {
	var h="function"==typeof e;
	for(d in e)if((!h||"prototype"!=d)&&Ad.call(e,d)&&b(e[d],d,a)===!1)return f
}
return f};
	zb(/x/)&&(zb=function(a) {
	return"function"==typeof a&&ud.call(a)==K
}
);
	var be=zd?function(a) {
	if(!a||ud.call(a)!=M)return!1;
	var b=a.valueOf,c="function"==typeof b&&(c=zd(b))&&zd(c);
	return c?a==c||zd(a)==c:gb(a)
}
:gb,ce=cb(function(a,b,c) {
	Ad.call(a,c)?a[c]++:a[c]=1
}
),de=cb(function(a,b,c) {
	(Ad.call(a,c)?a[c]:a[c]=[]).push(b)
}
),ee=cb(function(a,b,c) {
	a[c]=b
}
),fe=Wb,ge=Qb,he=8==Nd(u+"08")?Nd:function(a,b) {
	return Nd(Fb(a)?a.replace(B,""):a,b||0)
}
;return o.after=Bc,o.assign=Zd,o.at=Nb,o.bind=Cc,o.bindAll=Dc,o.bindKey=Ec,o.chain=ad,o.compact=gc,o.compose=Fc,o.countBy=ce,o.create=lb,o.createCallback=Gc,o.curry=Hc,o.debounce=Ic,o.defaults=$d,o.defer=Jc,o.delay=Kc,o.difference=hc,o.filter=Qb,o.flatten=lc,o.forEach=Tb,o.forEachRight=Ub,o.forIn=_d,o.forInRight=ob,o.forOwn=ae,o.forOwnRight=pb,o.functions=qb,o.groupBy=de,o.indexBy=ee,o.initial=nc,o.intersection=oc,o.invert=sb,o.invoke=Vb,o.keys=Td,o.map=Wb,o.max=Xb,o.memoize=Lc,o.merge=Hb,o.min=Yb,o.omit=Ib,o.once=Mc,o.pairs=Jb,o.partial=Nc,o.partialRight=Oc,o.pick=Kb,o.pluck=fe,o.pull=rc,o.range=sc,o.reject=_b,o.remove=tc,o.rest=uc,o.shuffle=bc,o.sortBy=ec,o.tap=bd,o.throttle=Pc,o.times=Zc,o.toArray=fc,o.transform=Lb,o.union=wc,o.uniq=xc,o.values=Mb,o.where=ge,o.without=yc,o.wrap=Qc,o.zip=zc,o.zipObject=Ac,o.collect=Wb,o.drop=uc,o.each=Tb,o.eachRight=Ub,o.extend=Zd,o.methods=qb,o.object=Ac,o.select=Qb,o.tail=uc,o.unique=xc,o.unzip=zc,Tc(o),o.clone=jb,o.cloneDeep=kb,o.contains=Ob,o.escape=Rc,o.every=Pb,o.find=Rb,o.findIndex=ic,o.findKey=mb,o.findLast=Sb,o.findLastIndex=jc,o.findLastKey=nb,o.has=rb,o.identity=Sc,o.indexOf=mc,o.isArguments=ib,o.isArray=Rd,o.isBoolean=tb,o.isDate=ub,o.isElement=vb,o.isEmpty=wb,o.isEqual=xb,o.isFinite=yb,o.isFunction=zb,o.isNaN=Bb,o.isNull=Cb,o.isNumber=Db,o.isObject=Ab,o.isPlainObject=be,o.isRegExp=Eb,o.isString=Fb,o.isUndefined=Gb,o.lastIndexOf=qc,o.mixin=Tc,o.noConflict=Uc,o.noop=Vc,o.parseInt=he,o.random=Wc,o.reduce=Zb,o.reduceRight=$b,o.result=Xc,o.runInContext=m,o.size=cc,o.some=dc,o.sortedIndex=vc,o.template=Yc,o.unescape=$c,o.uniqueId=_c,o.all=Pb,o.any=dc,o.detect=Rb,o.findWhere=Rb,o.foldl=Zb,o.foldr=$b,o.include=Ob,o.inject=Zb,ae(o,function(a,b) {
	o.prototype[b]||(o.prototype[b]=function() {
	var b=[this.__wrapped__],c=this.__chain__;
	Cd.apply(b,arguments);
	var d=a.apply(o,b);
	return c?new p(d,c):d
}
)}),o.first=kc,o.last=pc,o.sample=ac,o.take=kc,o.head=kc,ae(o,function(a,b) {
	var c="sample"!==b;
	o.prototype[b]||(o.prototype[b]=function(b,d) {
	var e=this.__chain__,f=a(this.__wrapped__,b,d);
	return e||null!=b&&(!d||c&&"function"==typeof b)?new p(f,e):f
}
)}),o.VERSION="2.3.0",o.prototype.chain=cd,o.prototype.toString=dd,o.prototype.value=ed,o.prototype.valueOf=ed,Yd(["join","pop","shift"],function(a) {
	var b=qd[a];
	o.prototype[a]=function() {
	var a=this.__chain__,c=b.apply(this.__wrapped__,arguments);
	return a?new p(c,a):c
}
}),Yd(["push","reverse","sort","unshift"],function(a) {
	var b=qd[a];
	o.prototype[a]=function() {
	return b.apply(this.__wrapped__,arguments),this
}
}),Yd(["concat","slice","splice"],function(a) {
	var b=qd[a];
	o.prototype[a]=function() {
	return new p(b.apply(this.__wrapped__,arguments),this.__chain__)
}
}),o}var n,o=[],p=[],q=0,r=+new Date+"",s=75,t=40,u=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",v=/\b__p \+= '';
	/g,w=/\b(__p \+=) '' \+/g,x=/(__e\(.*?\)|\b__t\)) \+\n'';
	/g,y=/\$\ {
	([^\\
}
]*(?:\\.[^\\}]*)*)\}/g,z=/\w*$/,A=/<%=([\s\S]+?)%>/g,B=RegExp("^["+u+"]*0+(?=.$)"),C=/($^)/,D=/['\n\r\t\u2028\u2029\\]/g,E=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setImmediate","setTimeout"],F=0,G="[object Arguments]",H="[object Array]",I="[object Boolean]",J="[object Date]",K="[object Function]",L="[object Number]",M="[object Object]",N="[object RegExp]",O="[object String]",P= {
	};
	P[K]=!1,P[G]=P[H]=P[I]=P[J]=P[L]=P[M]=P[N]=P[O]=!0;
	var Q= {
	leading:!1,maxWait:0,trailing:!1
}
,R= {
	"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1
}
,S= {
	"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"
}
,T=R[typeof window]&&window||this,U=R[typeof global]&&global;
	!U||U.global!==U&&U.window!==U||(T=U);
	var V=m();
	T._=V}.call(this),function(a,b) {
	function c() {
	var a= {
	},b=location.search;
	if(b) {
	var c=b.slice(1).split("&");
	if(c.length)for(var d=0;
	d<c.length;
	d++)if(c[d]&&-1!=c[d].indexOf("=")) {
	var e=c[d].split("=");
	a[e[0]]=e[1]
}
}return a}function d(a) {
	var b=i.createElement("img");
	b.style.cssText="display:none",b.src=a,i.body.appendChild(b)
}
function e(a) {
	a=a|| {
	};
	var b=a.apuri||a.ap_uri;
	if(b) {
	var c= {
	};
	c.logtype=2,c.apuri=b,c.cache=parseInt((Math.random()+1)*Date.now());
	var e=[];
	for(var f in c)e.push(f+"="+encodeURIComponent(c[f]));
	d("http://wgo.mmstat.com/sb.1.1?"+e.join("&"))
}
}function f() {
	var a=c(),b=a.ttid,d=/[^@]+\@taobao\_(iphone|android|apad|ipad)\_[\d.]+/i;
	return b=b?decodeURIComponent(b):"",d.test(b)
}
function g() {
	return!!a.navigator.userAgent.match(/WindVane/)
}
function h() {
	return!!a.navigator.userAgent.match(/AlipayClient/i)
}
var i=a.document,j=i.cookie.match(/(?:^|\s)cna=([^;
	]+)(?:;
	|$)/);
	j&&(j=j[1]);
	var k=i.createElement("frame"),l=function(a) {
	var b=this,c=navigator.standalone,d=navigator.userAgent;
	return null!=d.match(/iPhone|iPod|iPad/i)?(this.platform="ios",this.isIpad=null!=d.match(/iPad/i)):null!=d.match(/Android/i)?null!=d.match(/Mobile/i)&&(this.platform="android",this.isChrome=null!=d.match(/Chrome/i)&&null==d.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i)):null!=d.match(/Linux/i)&&(this.platform="android"),!this.platform||c?(this.invaliable=!0,null):(this.init(a)&&(this.create(),window.onblur=function() {
	clearTimeout(b.timeload),b.timeload=null
}
),this)};
	l.prototype= {
	constructor:l,init:function(a) {
	var b=this.options=a,d=b.isInstance||function() {
	return g()||f()||h()
}
;if(d())return this.invaliable=!0,null;
	a.version||(a.version="v1"),this.cover=b.cover||!1,this.isDownload=b.download||!1,this.timeout=b.timeout||600;
	var e=b.from||"h5",k=b.crossplat||!1;
	if("ios"!=this.platform||k) {
	var l=b.url||"http://m.taobao.com/channel/act/sale/tbdl1.html";
	l+=-1==l.indexOf("?")?"?":"&",l+=location.search.slice(1),this.bannerUrl=l
}
else this.bannerUrl=b.appstoreUrl||(this.isIpad?"https://itunes.apple.com/app/id438865278":"http://itunes.apple.com/cn/app/id387682726?mt=8");
	if(b.href) {
	var m=b.href,n=c(),o=i.getElementById("buried"),p=n.ttid||o&&o.value,q=n.refid,r=n.ali_trackid,s=n.pid,t=n.actparam,u=n.actname,v=n.ad_id,w=n.source_type,x= {
	from:e
}
;if(p&&(x.ttid=p),q&&(x.refid=q),r&&(x.ali_trackid=r),s&&(x.pid=s),t&&(x.actparam=t),u&&(x.actname=u),v&&(x.ad_id=v),w&&(x.source_type=w),x.url=encodeURIComponent(location.href.split(/[?#]/)[0]),j&&(x.h5_uid=j),x.ap_uri="",b.point)for(var y in b.point)x[y]=b.point[y];
	if(x=encodeURIComponent(JSON.stringify(x)),m=m.split("#"),-1==m[0].indexOf("?")?m[0]+="?":m[0].indexOf("?")!=m.length-1&&(m[0]+="&"),m[0]+="point="+x,m=m.join("#"),m=-1!=m.indexOf("://")?m:"taobao://"+m,this.isChrome) {
	var z=m.split("://"),A=z[0],B=z[1],C=b.bag||"com.taobao.taobao";
	m="intent://"+B+"#Intent;
	scheme="+A+";
	package="+C+";
	end"
}
this.paramUrl=m}return!0},reset:function(a) {
	this.iClose||(this.init(a),this.resetHtml&&this.resetHtml(a))
}
,create:function() {
	this.iClose||(k.parentNode||(k.setAttribute("id","J_smartFrame"),k.style.cssText="display:none",i.body.appendChild(k)),this.frame=k)
}
,download:function(b) {
	var c=Date.now();
	(!b||c-b<this.timeout+200)&&(this.cover?a.location.replace(this.bannerUrl):a.location.href=this.bannerUrl)
}
,redirect:function(b) {
	var c=this.options&&this.options.version,d=this.frame,f=b?"click_sb_"+c+"_manual":"click_sb_"+c+"_auto";
	this.paramUrl&&(e( {
	ap_uri:f
}
),this.paramUrl=this.paramUrl.replace("%22ap_uri%22%3A%22%22",encodeURIComponent('"ap_uri":"'+f+'"')),this.isChrome?a.location.href=this.paramUrl:d&&d.setAttribute("src",this.paramUrl))},install:function(a) {
	var b=this,c=Date.now();
	b.isDownload||(b.timeload=setTimeout(function() {
	b.download(c)
}
,b.timeout)),b.redirect(a)}},b.smartbanner=function(a) {
	var c=a.type,d=b.smartbanner.BannerUI,e=b.smartbanner.PopUI;
	if("banner"!==c&&c) {
	if("pop"===c) {
	if(e)return new e(a)
}
else if("func"===c)return b.smartbanner.getInstance(a)}else if(d)return new d(a)},b.smartbanner.getInstance=function(a,b) {
	b||(b=Object.create( {
	}));
	for(var c in l.prototype)b[c]=l.prototype[c];
	return l.call(b,a)
}
,b.smartbanner.aplus=e,b.smartbanner.getParam=c,b.smartbanner.ttidInTaobaoApp=f,b.smartbanner.uaInTaobaoApp=g}(window,window.lib||(window.lib= {
	})),function(a,b) {
	function c(a) {
	var b=document.cookie;
	if(name=a+"=",start=b.indexOf(name),0>start)return null;
	start+=name.length;
	var c=b.indexOf(";
	",start);
	return c=-1==c?b.length:c,b.substring(start,c)
}
function d() {
	var a=decodeURIComponent(c("imewweoriw"));
	return a&&a.length>32
}
function e(a) {
	var b=window.localStorage;
	if(b) {
	var c=b[a],d=!1;
	if(c) {
	var c=parseInt(c,10),e=new Date;
	e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),c>e&&(d=!0)
}
return d}}function f(a,b) {
	a=a||0;
	var e=navigator.userAgent,f=j.ali_trackid,g=Boolean(f),h=c("tkmb"),i=h?h.split("&"):null,k=/400000_.*@\w+_(iphone|android)_.*/i,l=/.+@taobao_(iphone|android|apad|ipad)_.+/i,m=j.ttid,n=m?decodeURIComponent(m):"",o=""!=n?!0:!1,p=j.ut_sk,q=p?decodeURIComponent(p):"",r=""!=q?!0:!1,s=q.match(/.+_(\d+)_.+/),t=j.iv,u=k.test(n),v=t&&1==t||i&&"iv=1"===i[1],w="undefined"!=typeof t&&1==t||i&&"iv=0"===i[1],x=g&&null!=f.match(/^1_.+/i)&&("undefined"==typeof b||1==b),y=g&&null!=f.match(/^1_.+/i)&&"undefined"!=typeof b&&0==b,z=!0;
	(o&&l.test(n)||null!=e.match(/WindVane/))&&(z=!1,!r||null==s||12278902!=s[1]&&21380790!=s[1]||(z=!0)),null!=e.match(/AlipayClient/i)&&(z=!1);
	var A="000";
	if(z) {
	var B="1",C="2",D="1",E="1",F="2";
	u||v||x?B="0":(w||y)&&(B="2"),null!=e.match(/QQ/i)?C="0":null!=e.match(/UCBrowser|UCWeb/i)&&(C="1"),d()&&(D="0");
	var G=c("_w_app_lg"),H=1,I=2;
	G&&(null!=e.match(/iPhone|iPod/i)&&G&H?E="0":null!=e.match(/Android/i)&&G&I&&(E="0"));
	var J=document.referrer;
	u||null!=e.match(/MicroMessenger/i)||null!=J.match(/(t\.sina)|(weibo\.com)|(weibo\.cn)|(sina\.com)|(t\.cn)|(sinaurl)|(3g\.sina)|(iask\.cn)/i)?F="1":(null!=J.match(/(qq|baidu|hao123|google|soso)\.com/i)||null!=J.match(/(m|wap)\.taobao\.com/i)||o&&null!=n.match(/^(12tx0065|b0tx02|eguc01|001001|51uc0003)$/i))&&(F="0");
	try {
	A=window.strategy[a][B+C+D+E+F]
}
catch(K) {
	A="000",console.log(K)
}
}var L= {
	};
	return A&&("1"==A.charAt(0)&&(L.isInvoke=!0),"1"==A.charAt(1)&&(L.isShow=!0),"1"==A.charAt(2)&&(L.isInvokeDay=!0)),L
}
function g(a,b,c) {
	if(a) {
	var d,g=f(b,c);
	if(g.isInvoke&&(d=d||i(a),d&&d.redirect()),g.isShow&&(d=d||i(a)),g.isInvokeDay&&(d=d||i(a),!e("cloudDate"))) {
	d&&d.redirect();
	try {
	localStorage.cloudDate=Date.now()
}
catch(h) {
	console.log(h)
}
}return d}}var h=document,i=b.smartbanner,j=(i.aplus,i.getParam()),k=function(a) {
	a.version="v1",i.getInstance(a,this),this.calClose()||this.invaliable||(this.setParam(a),this.createHtml())
}
;k.prototype= {
	constructor:k,calClose:function() {
	var a=window.localStorage;
	if(a) {
	var b=a.closeDate;
	if(b) {
	var b=parseInt(b,10),c=new Date;
	c.setHours(0),c.setMinutes(0),c.setSeconds(0),c.setMilliseconds(0),b>c&&(this.iClose=!0)
}
return this.iClose}},setParam:function(a) {
	var b=a.color?"color:"+a.color+";
	":"",c=a.bgcolor?"background-color:"+a.bgcolor+";
	":"";
	this.styles=b+c,this.isHide=a.hide||!1,this.text=a.text||"立即打开",this.title=a.title||"上手机淘宝客户端，保障交易安全",this.isIpad&&(this.title=this.title.replace(/(手机)?淘宝/gi,"淘宝HD"))
}
,template:function() {
	var a=this.isHide,b=['<div id="smartAd" class="smartad" '+(a?'style="display:none"':"")+">",'<a id="smartAd-close" class="sd-close" href="#"></a>','<a id="smartAd-open" class="sd-point" href="#">','<p class="sd-font">','<b class="sd-taobao"></b>',"<span>"+this.title+"</span>",'<b class="sd-dl" style="'+this.styles+'">'+this.text+"</b>","</p>","</a>","</div>"];
	return b.join("")
}
,resetHtml:function(a) {
	this.setParam(a);
	var b=['<b class="sd-taobao"></b>',"<span>"+this.title+"</span>",'<b class="sd-dl" style="'+this.styles+'">'+this.text+"</b>"].join("");
	this.smartDom&&(this.smartDom.querySelector(".sd-font").innerHTML=b)
}
,createHtml:function() {
	if(!this.iClose) {
	var a=this.template(),b=h.createElement("style"),c=h.createElement("div"),d=this.options.dpr||1;
	c.innerHTML=a,this.smartDom=c.querySelector("#smartAd"),this.popDom=i( {
	type:"pop",title:this.title,dpr:d
}
),b.innerHTML=".smartad {
	background-color:rgba(66,66,74,0.96);
	position:fixed;
	bottom:0;
	left:0;
	height:"+68*d+"px;
	width:100%;
	font-size:1rem;
	z-index:1000;
	font-size:"+14*d+"px
}
.sd-point {
	color:#fff;
	display:block;
	text-decoration:none;
	height:100%;
}
.sd-close {
	background:url(data:image/png;
	base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA61pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NUY0MDYzNjgzODIwNjgxMUIzQzJGMTE5OTQ3OTlEMzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVFNkRGMzUxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVFNkRGMzQxNDdGMTFFMzk0QzNCQ0VGODJBOTdBMTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6QzBFQ0RDNjM1RjEwRTMxMUJBQzZBQjEyRDc5RTUwOEIiIHN0UmVmOmRvY3VtZW50SUQ9InV1aWQ6RDE1N0E1MDlBQTBGRTMxMThCRTc4OEMyQUI0QTU3NzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4dUF9zAAADBklEQVR42syYy28ScRDHeQnySgmRaBoCSA+tGqHh0ISoCWcCiQe5efUARzlgCokV/wQInPkjPBgPNjRgND7qK7xiChYwiKTaUoq2iDPJbrL+sssuj9KdZLLZV/LZmfl9Z34rlUgkfomITA6+LCKeE7EBHYsNqCc2oD2xAbXEBrQ7EshqteojkUjY5XKZ8/n8J67nvF7vSjAYfKBWq5vFYvH7FEAVTqDFxUVNOBx+vLCw4DQajdcdDodqa2trm3zO7/df9fl8j1Qq1cWlpaVbcCwWCoXWJCsM/DMnUCwWi+r1+mv0ucFguOJ0OtUA9Y4JA9HZkMlk5/FcKpXK7Xb7zXq9/rzVavXGBPoB3pBx3e10OmXymsViuQ2g9+g0MWFo6/f738AOJohQe6RS53K5jxgRSNkK8zqcL7vdbvPq6updEubo6Gg3mUxGIUKHY8IMwT/wKjWmhw1Ko9FYIT0KEiadTscqlcrPCaKD6aoK6mUIhQWNNcT1DKSpATDRUqm0N+HqwvLYF9xccXWtra1d0ul0l8l7g8HgANIUngLmN5UuTJtEJuQNLGCTyeRmHRfkcn0gELgzhfZ8we8SPH7QOkMWMFnoUOS6bDb7dgLtQRn5KwiI1BlGmnpw7dwMoMpUQfMPaJgmtshgAUPN3DebzQqEIKFI8RxhWMTbgifGUCj0UKlUXiBhUqnUOhYwRgIjwgK10u1289Vq9RcP0GtUC8FAWq22gW0A2wFDZ/5b2mxQzWbzaSaTecYDswNeG2umxgYJAli22Ww3IDLNRCKxziZ6TChQ6CfxeDwtIFVv6GVOmpRv1wE1YWq324fw5SObpcfjsW5ubtYErKosjqpcD/ACzdBwab8kV9VZbYOGlN7wzknzAKI7eV0MG0VMEwplQww71xPwV+BjzdinBYSi+II6nvnefofSmT9n/bNhn2oHNS7RmxcQil0R/D1bbxrXFFO8iympgH+lCngmNglQB7e82EeZk948gY4piA4F0T9NFVUQRTmk6gCbXxd/j9C7gXnZPwEGAGrNPc1RZ9hjAAAAAElFTkSuQmCC) no-repeat;
	background-size:"+18*d+"px;
	width:"+20*d+"px;
	height:"+20*d+"px;
	position:absolute;
	left:0;
	top:0;
	z-index:10;
}
.sd-font {
	margin:0;
	padding:"+20*d+"px "+8*d+"px 0 "+8*d+"px;
	display:-webkit-box;
	height:"+32*d+"px;
	overflow:hidden;
	-webkit-box-align:center;
}
.sd-font > span {
	-webkit-box-flex:1;
	display:block;
	margin:0 "+12*d+"px;
	line-height:120%;
}
.sd-taobao {
	background:url(data:image/png;
	base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAABy1BMVEX/////aTL/RAD/aTL/RAD/aTL/ZzD/RAD/aTL/RAD/ZzD/RgL/aTL/RAD//////fz/+/n/+ff/+PX/9/X/9/T/9fH/8+//8+3/8ev/8ez/7ef/7OX/6+P/6eH/6N//5t3/5Nr/4tf/4df/4NX/39P/3dH/3M//287/2cz/18n/1sf/1cX/08P/0cD/0L//z73/zbv/zLn/y7j/y7n/ybX/yLP/xrH/xa//w63/wKn/v6j/vab/vaX/vKP/uZ//uqH/t53/t5v/tZn/tZr/s5f/sZX/sJP/r5H/rY//q43/qYv/p4f/pYX/o4P/oX7/n3z/nXr/nHf/nHj/mXT/mXP/l3H/lW//k2z/lG3/k2v/kWb/kWn/jmb/jWT/jGL/i2D/iV7/iF3/hVj/g1b/glT/gVP/gVT/f1H/fU7/fk7/fEz/e0r/eUj/eEf/dkT/c0D/dEL/cj7/cT7/cDz/bjr/bzr/bTj/bDf/ajT/aTL/ZzD/Zi7/ZS7/ZCz/Yyr/ZCr/Yij/YCb/XiP/XiT/XCD/XCL/Wh7/WBz/Vxr/Vhn/VBj/VBb/UhT/URL/UBD/Tg7/Tgz/TAr/TAv/Sgj/Sgn/SAb/RwT/RgL/RACuODADAAAAmXRSTlMAEREiM0SIiJnM3d3u7v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+SMNVfAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAA8VJREFUWIXNl+lf0zAYxyMiiEqGwgABxaOKk9N5IKhjKsqQgSeHikPEewgqiGwcbqN2sG7OW/9ckzxZmo7hsbzx92J98jzP79s2TdrPEEKbtu4I5aUdRZsR0ZY87QyxBaHN2/L3E8ImVKTiD4WKkNIFhELbUFhR6oAFRakDFhWlDlhSlDpgeQMt3p7fqGQTitj0uPNwxyiLxrCj0fc88kfZAX2YqpOGJ1l4/N8AjxzMhYcikdkyFgVIdnm8t8OtHSCjaq35ytPfAS6AH7dFIr0sODIz7D3CqRlpw3ZAVNJ53tMSXahhwS7ZWZ0J3GHJYwM84B3Xon77SXuuPpkh9aB3J1zYsgRYkQX34F6ZdwpzWcvAjNUwAYQLVgbFbLp3SnPfisXOCr/z4kNbQw/Lli+JBHqfQ2NgLi+nv44ZufQKSvdFAumSQuPs8LqK9tT2P2Dz36XbxKB4QIxtgDPYR37n6mhL1Wu9mR7r39kB8Hi6cgIekkpzWJ89QY47n+lwIzWarMt6LcyzBTCEYntpqe6NYUwcdASMhVq8Xu0GZF3CJQHGYMnVEoLx1DBacvgFoN4CxC0FD8JFv6IDtpT8waALzhgEzcbZBOFKYZIBccPP1smepXg8sps8wEGSa2WGVtEDAKcFWLVprpGWfSSad1UEaIYDRAcAysQ4C7Aa7yJlbXVVnwwGJqn4LUyC5jgAW4C1LBn1GO9eW3uZawoxPr3GAXqmHyWy5SWTkEhMbwBIcIBoXw9ox7gpkZg7xAX70slHvvUAM0tR4uiRxm2sv41ExvjZuGkCwCHq6wB0Ep+bsSmqRTI+xgzHTNNDHvFoBuC0AEm76AaoTCSHWFs/SXBAMklfNk3JJADqhCELMFVBqueSyX7WNiQDgvT4lgMOW4CUrHn24nyRSsEHYpSkOCBleOnxUgoALcKCPkhaZvtRI9EIa+sjEQCO9sI7uZKvg9PCIwNWYDMFSDgJ7YHp6aP2hXAHduPFXIDoflbbmyJxqhpny8NeMC74Yl23AOmMuB/fZKPhLPuJqXScvC/afDB8IWwCENkHpWoTxn7pi9Z0JURT7u5wGtZV/QcL8JEr1g7N/kxiye9pbDjn6Rt5lKAjljM90DT4UQh9Fpqg81Ohf86lMK45daOng3+wWtNWBX2yZHZj3P0pp+7K89FkSBVk65vWorkBZyx75UBarqCvf6XQoLezQXM0uLonTHsFfVGUOuCbov4DwHdFqQN+KEodsF3Nvx0VqwGKUUGpir+0AKHC0p95q7SQ/n0vKC7Jz15STM7/C0WkvAQNIbFkAAAAAElFTkSuQmCC) no-repeat;
	width:"+30*d+"px;
	height:"+30*d+"px;
	display:inline-block;
	background-size:contain;
	vertical-align:top;
}
.sd-dl {
	display:block;
	color:#3d4245;
	background-color:#e5e5e5;
	border-radius:"+5*d+"px;
	height:"+30*d+"px;
	line-height:"+30*d+"px;
	text-align:center;
	padding:0 "+12*d+"px;
	font-weight:normal;
}
",h.body.appendChild(b),h.body.appendChild(this.smartDom),this.listen()}},show:function() {
	this.iClose||this.smartDom&&(this.smartDom.style.display="block")
}
,hide:function() {
	this.iClose||this.smartDom&&(this.smartDom.style.display="none")
}
,pop:function() {
	this.iClose||this.popDom&&this.popDom.open()
}
,listen:function() {
	if(!this.iClose) {
	var a=this,b=a.smartDom;
	b.querySelector("#smartAd-close").addEventListener("click",function(b) {
	b.preventDefault(),a.hide();
	try {
	localStorage.closeDate=Date.now(),a.calClose()
}
catch(b) {
	}
}
,!1),b.querySelector("#smartAd-open").addEventListener("click",function(b) {
	b.preventDefault(),a.install(!0)
}
)}}},b.smartbanner.expiresInDay=e,b.smartbanner.smtStatus=f,b.smartbanner.sbLogic=g,b.smartbanner.BannerUI=k}(window,window.lib||(window.lib= {
	})),function(a,b) {
	function c(a) {
	return a.preventDefault(),!1
}
var d,e,f,g,h,i=a.document,j=a.localStorage,k=b.smartbanner,l=(k.aplus,!1),m=['<div class="c-smartpop">','<section class="header">','<a href="javascript:void(0)"></a>',"</section>",'<section class="title">',"<span>淘宝客户端不仅可以更流畅地收藏宝贝，还能分享，立刻下载体验！</span>","</section>",'<section class="banner">','<img border="0"></img>',"</section>",'<section class="action">','<a href="javascript:void(0)">立即打开</a>',"</section>","</div>"].join(""),n=document.createElement("div"),o=document.createElement("style");
	try {
	j.setItem("testPrivateModel","false")
}
catch(p) {
	j=null
}
var q=function(a) {
	a.version="v2",k.getInstance(a,this),this.title=a.title,this.isIpad&&this.title&&(this.title=this.title.replace(/(手机)?淘宝/gi,"淘宝HD")),this.banner=a.banner
}
;q.prototype= {
	constructor:q,_render:function() {
	var a=this,b=a.options.dpr||1,c=[".c-smartpop-wrap {
	","width:100%;
	height:100%;
	top:0;
	left:0;
	position:absolute;
	z-index:999;
	background:rgba(0,0,0,0);
	display:-webkit-box;
	-webkit-box-pack:center;
	-webkit-box-align:center;
	","
}
",".c-smartpop {
	","width:252px * @dpr;
	background-color:rgba(255,255,255,0.9);
	border:1px solid rgba(51,51,51,0.18);
	-webkit-box-shadow:0px 1px 8px 0px rgba(0,0,0,0.27);
	box-shadow:0px 1px 8px 0px rgba(0,0,0,0.27);
	border-radius:4px * @dpr;
	","
}
",".c-smartpop .header {
	","width:100%;
	height:34px * @dpr;
	position:relative;
	","
}
",".c-smartpop .header a {
	","display:inline-block;
	width:14px * @dpr;
	height:14px * @dpr;
	position:absolute;
	","background:url(data:image/gif;
	base64,R0lGODlhHAAcAJEAAP///8zMzJmZmWZmZiH5BAAHAP8ALAAAAAAcABwAAAJWjICpyyk2TptMRGAlpdnd3XSKCHra+JVklXJt+C6re6L1NmMxuOalLvH9gMKhbmdEWJDGTFH1edJsSSDrNoVhrzim0vvdWn8+qexl5oarpjE7bHjLAgUAOw==) no-repeat 0 0;
	","background-size:contain;
	top:8px * @dpr;
	right:8px * @dpr;
	opacity:0.9;
	-webkit-tap-highlight-color:rgba(0,0,0,0);
	","
}
",".c-smartpop .title {
	","height:32px * @dpr;
	line-height:16px * @dpr;
	font-size:12px * @dpr;
	margin:0 12px * @dpr 8px * @dpr;
	padding-left:36px * @dpr;
	","background:url(data:image/gif;
	base64,R0lGODlhOAA4ALMAAP//////zP/MzP/Mmf/MZv+Zmf+ZZv+ZM/+ZAP9mM/9mAP8zAMxmM8xmAAAAAAAAACH5BAAHAP8ALAAAAAA4ADgAAAT/EEgwjGoqY51v3x4nhuRmDFOakF3rvnAsN0kKsHKu79/E8MBgrjYQGo+dwQHJDC6b0Kh0Sq1ar9isdstFGgoGS6cmMKy6L0GqmDGkBBXXIpM4Uws2gDhPKQ8EAXxldkxqNkVuNoZ8fAVQKDaOgYxvAgQFA5MTAk0HeQqQjJZPLombTScSSgqUAI45phKkUYuMhDCRXpxJbwa1YjmHRzUAASuxAAfIJ1/MYBWOtbtCmnoKB4YrrYwKtQFGyNYKBgjd23zmKUfYuRmh36w2MbU3XjZPkJza8jD0nYtFErAzc4CYioIIV/iDcsrTOXQLUUng5PChvIhMIAW8xKxCHmiXpwYUwThsgoVmFc58GqeGDUkjizLck8lPRboJTRbtmhlPHSiTNyVkTLHHZk+ceNR5QxKqWAcbxo5S8vXmSFNxPy0qqjYNyNV6bSwOSBCKHgEhX4GFpQSng4EA0Wzc0hEORoKOzEgVKEiHXlcgZCe8EmKQ0lwgBwLZYytllhNAUAU4RkO5suXLmDNr3mx5MucOB9h8foHiMGeDo1skqGb68uqPnimHThEBADs=) no-repeat 0 center;
	","background-size:28px * @dpr 28px * @dpr;
	color:#666;
	","
}
",".c-smartpop .banner {
	","height:88px * @dpr;
	margin:0 12px * @dpr 10px * @dpr;
	overflow:hidden;
	","
}
",".c-smartpop .banner img {
	","border:0px;
	width:100%;
	height:100%;
	","
}
",".c-smartpop .action {
	","height:28px * @dpr;
	text-align:center;
	margin:0 auto 12px * @dpr;
	","
}
",".c-smartpop .action a {
	","display:inline-block;
	height:28px * @dpr;
	line-height:28px * @dpr;
	background-color:rgb(255,102,0);
	","border-radius:3px * @dpr;
	text-align:center;
	-webkit-box-shadow:0px 1px 1px 0px rgba(0,0,0,0.05),inset 0px 1px 3px 0px rgba(169,172,175,0.31);
	","box-shadow:0px 1px 1px 0px rgba(0,0,0,0.05),inset 0px 1px 3px 0px rgba(169,172,175,0.31);
	font-size:14px * @dpr;
	","color:#FFF;
	text-decoration:none;
	-webkit-tap-highlight-color:rgba(0,0,0,0);
	margin:0 10px * @dpr;
	padding:0 8px * @dpr;
	","
}
",".c-smartpop .action a:hover,.c-smartpop .action a.hover {
	","background-color:#EF5F00;
	","
}
"].join("").replace(/(\d+)px\s+\*\s+\@dpr/gi,function(a,c) {
	return parseFloat(c)*b+"px"
}
);
	n.className="c-smartpop-wrap",n.innerHTML=m,n.style.cssText="display:none",d=n.querySelector(".c-smartpop"),e=n.querySelector(".header a"),f=n.querySelector(".title span"),g=n.querySelector(".banner"),e_bannerImg=n.querySelector(".banner img"),h=n.querySelector(".action a"),e.addEventListener("click",function(b) {
	b.preventDefault(),j&&j.setItem("smpopCloseDate",Date.now()),a.close()
}
,!1),h.addEventListener("touchstart",function() {
	h.className="hover"
}
,!1),h.addEventListener("touchend",function() {
	h.className=""
}
,!1),h.addEventListener("click",function(b) {
	b.preventDefault(),a.install(!0)
}
,!1),o.innerHTML=c,i.body.appendChild(o),i.body.appendChild(n)},_show:function() {
	var b=this,d=a.scrollY,e=a.innerHeight;
	f.innerHTML=b.title,b.banner?(g.style.display="",e_bannerImg.setAttribute("src",b.banner)):g.style.display="none",n.style.top=d+"px",n.style.height=e+"px",n.style.display="",n.addEventListener("touchmove",c,!1)
}
,open:function() {
	if(!this.invaliable) {
	if(j) {
	var a=parseInt(localStorage.getItem("smpopCloseDate")),b=new Date;
	if(b.setHours(0),b.setMinutes(0),b.setSeconds(0),b.setMilliseconds(0),a>b.getTime())return
}
l||(l=!0,this._render()),this._show()}},close:function() {
	this.invaliable||l&&(n.style.display="none",n.removeEventListener("touchmove",c,!1))
}
},k.PopUI=q}(window,window.lib||(window.lib= {
	})),function() {
	var objectTypes= {
	"function":!0,object:!0
}
,root=objectTypes[typeof window]&&window||this,freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType&&exports,freeModule=objectTypes[typeof module]&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports&&freeExports,freeGlobal=objectTypes[typeof global]&&global;
	!freeGlobal||freeGlobal.global!==freeGlobal&&freeGlobal.window!==freeGlobal||(root=freeGlobal);
	var _=root._,templates= {
	};
	templates["tpl-body"]=function(obj) {
	obj||(obj= {
	}); {
	var __p="";
	_.escape
}
with(obj)__p+='<div id="tbh5v0" class="mytaobao"><div class="toolbar"><header class="top-bar" id="J_Header"><div class="top-bar-w"><a class="logo" href="http://m.taobao.com"><div class="icons-taobao-logo"></div></a><div class="top-bar-c"><div class="s-input-select"><div class="s-input-tab"><div class="s-input-tab-txt"> 宝贝</div><div class="s-input-tab-nav off" id="J_TabNav"><ul><li class="all">宝贝</li><li class="shop">店铺</li><li class="mall">天猫</li></ul></div></div><div class="s-input-frame"><form class="c-form-suggest" id="J_Search" method="get"><div class="s-form-search search-form"><input type="text" name="q" class="J_autocomplete" autocomplete="off" value=""/><button><span/></button></div><div class="c-form-btn"><button class="searchbtn"></button></div></form></div></div></div><div class="top-bar-e"><span id="J_Sift"><i class="icons-sift"></i>筛选</span></div><div class="top-bar-btn closed">取消</div></div></header><div class="rellkey-container"></div><div class="onesearch-container" ></div><div class="filterbar-container"></div></div><div id="bodyCont" class="screen-wrap fullscreen searchlist"><section class="searchcontent"><div class="search-content"><div class="c-more-nomal" id="J_Loading"><p class="loading"><span></span></p></div></div><input id="J_Page_Url" type="hidden" value="http://s.m.taobao.com/search_turn_page_iphone.htm?q=s&amp;
	sst=1&amp;
	wlsort=10&amp;
	abtestNick=&amp;
	bagtype=&amp;
	bagvalue=&amp;
	sid=b905f8677e3fce29&amp;
	abtest=10"></section></div></div><div id="J_SiftContainer"></div><div id="J_PageNavContainer"></div>';
	return __p},templates["tpl-filterbar"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape
}
with(obj)__p+='<div class="filter-bar"><div class="viewtype-switch J_SwitchViewtype"><div class="icons-'+(null==(__t=viewtype)?"":__t)+'"></div></div><ul class="sort-tab J_sortTab"><li data-value="" class="selected">默认</li><li data-value="_sale" >销量</li><li data-value="bid" data-order="down">价格<div class="icons-sortbar-arrow"></div></li></ul></div>';
	return __p},templates["tpl-listview-container"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape
}
with(obj)__p+='<div class="search-list '+(null==(__t=viewtype)?"":__t)+'-view" id="J_SearchList"><div class="J_TopLoading loading" style="display:none"><span></span>努力加载中</div><ul></ul><div class="J_BottomLoading loading" style="display:none"><span></span>努力加载中</div></div>';
	return __p},templates["tpl-listview-item"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj) {
	__p+="<li ",(index+1)%2==0&&(__p+=' class="mark" '),__p+=' ><div class="list-item"><div class="p"><a href="'+(null==(__t=url)?"":__t)+'" title=""><img  class="p-pic lazy" src="http://a.tbcdn.cn/mw/s/common/icons/nopic/no-90.png" dataimg="'+(null==(__t=img2+"_"+size+".jpg")?"":__t)+'"/>',icon&&icon.length>0&&!apply&&(__p+='<span class="flag '+(null==(__t=icon[0])?"":__t)+'"></span>'),__p+='</a></div><div class="d"><a href="'+(null==(__t=url)?"":__t)+'" title=""><h3 class="d-title">'+(null==(__t=name)?"":__t)+'</h3></a><p class="d-price"><em class="h">￥'+(null==(__t=price||originalPrice)?"":__t)+"</em><del>",originalPrice!=price&&(__p+="￥"+(null==(__t=originalPrice)?"":__t)),__p+='</del></p><div class="d-main">',""==freight||apply||(__p+='<p class="d-freight">'+(null==(__t=Number(freight)>0?"运费"+freight:"免运费")?"":__t)+"</p>"),__p+='<p class="d-num">'+(null==(__t=act)?"":__t)+'人付款</p><p class="d-area">'+(null==(__t=area)?"":__t)+'</p></div></div></div><div class="icons-group">';
	for(var i=0;
	i<iconlist.length;
	i++)__p+='<div class="'+(null==(__t=iconlist[i].className)?"":__t)+'">',iconlist[i].icon&&(__p+='<div class="item-icon icons-'+(null==(__t=iconlist[i].icon)?"":__t)+'"></div>'),__p+=(null==(__t=iconlist[i].text)?"":__t)+"</div>";
	__p+="</div></li>"
}
return __p},templates["tpl-listview-pagenav"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape
}
with(obj)__p+='<div class="pagenav expanded"><div class="pagenav-normal"><div class="J_PagePrev disabled">上一页</div><div class="J_PageNavMain pagenav-main"><span class="currentPage">1</span>/'+(null==(__t=pageCount)?"":__t)+'<div class="close"><div class="icons-arrow-down"></div></div></div><div class="J_PageNext">下一页</div></div><div class="pagenav-slider"><div class="slidebar"><div class="slidebar-filled"><div class="icons-slider-block"></div></div></div></div></div><div class="gotop"><div class="icons-gotop"></div></div>';
	return __p},templates["tpl-listview-smarttips"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj) {
	__p+='<li class="type-tip-text"><div class="list-item"><ul class="tip-content">';
	for(var i=0;
	i<items.length;
	i++) {
	var item=items[i];
	__p+='<li><a href="'+(null==(__t=item.url)?"":__t)+'">'+(null==(__t=item.show)?"":__t)+"</a></li>"
}
__p+="</ul></div></li>"}return __p},templates["tpl-page-baghead"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape
}
with(obj)__p+='<div class="bag-page-bar"><a class="back-btn" onclick="javascript:history.back()"><span>返回</span></a><span class="bag-title">'+(null==(__t=bagshow)?"":__t)+"</span></div>";
	return __p},templates["tpl-relkey"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj) {
	__p+='<div class="rellkey" ><ul>';
	for(var i=0,len=list.length;
	len>i;
	i++) {
	var item=list[i];
	__p+='<li data-name="'+(null==(__t=item.name)?"":__t)+'">'+(null==(__t=item.name)?"":__t)+"</li>"
}
__p+="</ul></div>"}return __p},templates["tpl-sift-cat"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj) {
	__p+='<div class="sift-default sift-hide sift-row3 J_SiftConditionBox"><h3>类目分类</h3><div class="sift-condition"><ul class="clearfix">';
	for(var i=0;
	i<data.length;
	i++) {
	var item=data[i];
	__p+=item?"<li data-value="+(null==(__t=item.value)?"":__t)+' ><i class="icons-sift-select"></i>'+(null==(__t=item.name)?"":__t)+"</li>":"<li></li>"
}
__p+='</ul></div><div class="icons-sift-down"><div class="icons-sift-up"></div></div></div>'}return __p},templates["tpl-sift-prop"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj)for(var i=0;
	i<data.length;
	i++) {
	var item=data[i];
	__p+='<div class="sift-default sift-hide sift-row4 J_SiftConditionBox"><h3>'+(null==(__t=item.propName)?"":__t)+'</h3><div class="sift-condition"><ul class="clearfix">';
	for(var list=item.list,j=0;
	j<list.length;
	j++) {
	var valueItem=list[j];
	__p+=valueItem?'<li data-value="'+(null==(__t=valueItem.value)?"":__t)+'"><i class="icons-sift-select"></i>'+(null==(__t=valueItem.name)?"":__t)+"</li>":"<li></li>"
}
__p+='</ul></div><div class="icons-sift-down"><div class="icons-sift-up"></div></div></div>'}return __p},templates["tpl-sift"]=function(obj) {
	obj||(obj= {
	}); {
	var __t,__p="";
	_.escape,Array.prototype.join
}
with(obj) {
	__p+='<div class="sift-mask" id="J_SiftMask" style="display:none"></div><div class="sift-content" id="J_SiftContent" style="display:none;
	"><div class="sift-top"><div class="J_SiftCommit sift-btn-ok">确定</div><span class="sift-clear" id="J_SiftClear">清空条件</span></div><div class="sift-box" data-key="filter" ><div class="sift-default sift-hide sift-row3 J_SiftConditionBox J_MultiSelect"><h3>商家类型</h3><div class="sift-condition"><ul class="clearfix">';
	for(var i=0;
	i<businessTypeData.length;
	i++) {
	var businessTypeItem=businessTypeData[i];
	__p+='<li data-value="'+(null==(__t=businessTypeItem.value)?"":__t)+'"><i class="icons-sift-select"></i>'+(null==(__t=businessTypeItem.name)?"":__t)+"</li>"
}
__p+='</ul></div><div class="icons-sift-down"><div class="icons-sift-up"></div></div></div></div><div class="sift-box" data-key="loc"><div class="sift-default sift-place sift-hide J_SiftConditionBox"><h3>所在地</h3><div class="sift-condition"><h4>常用</h4><ul class="clearfix">';
	for(var common=locData.common,i=0;
	i<common.length;
	i++)__p+='<li data-value="'+(null==(__t=common[i])?"":__t)+'" ><i class="icons-sift-select"></i>'+(null==(__t=common[i])?"":__t)+"</li>";
	__p+='</ul><h4>城市</h4><ul class="clearfix">';
	var initial,cityItems,city=locData.city;
	for(var initial in city) {
	cityItems=city[initial];
	for(var j=0;
	j<cityItems.length;
	j++)__p+='<li data-value="'+(null==(__t=cityItems[j])?"":__t)+'" >',initial&&(__p+='<span class="initial">'+(null==(__t=initial)?"":__t)+"</span>",initial=null),__p+='<i class="icons-sift-select"></i>'+(null==(__t=cityItems[j])?"":__t)+"</li>"
}
__p+='</ul><h4>省份</h4><ul class="clearfix">';
	var initial,provinceItems,province=locData.province;
	for(var initial in province) {
	provinceItems=province[initial];
	for(var j=0;
	j<provinceItems.length;
	j++)__p+='<li data-value="'+(null==(__t=cityItems[j])?"":__t)+'" >',initial&&(__p+='<span class="initial">'+(null==(__t=initial)?"":__t)+"</span>",initial=null),__p+='<i class="icons-sift-select"></i>'+(null==(__t=provinceItems[j])?"":__t)+"</li>"
}
__p+='</ul></div><div class="icons-sift-down"><div class="icons-sift-up"></div></div></div></div><div class="sift-box J_CatBox"  data-key="catmap"></div><div class="sift-box  J_PropBox sift-combo"  data-key="ppath"></div><div class="sift-box J_PriceBox ignore"><div class="sift-default sift-place sift-hide "><h3>价格区间</h3><div id="price-range" class="sift-condition"><input class="start-price" name="start_price" type="number" min="0" placeholder="最低价" >元<span>~</span><input class="end-price" name="end_price" type="number" min="0" placeholder="最高价" >元</div></div></div></div>'}return __p},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(["lodash"],function(a) {
	_=a,a.templates=a.extend(a.templates|| {
	},templates)
}
):freeExports&&freeModule?(_=require("lodash"),moduleExports?(freeModule.exports=templates).templates=templates:freeExports.templates=templates):_&&(_.templates=_.extend(_.templates|| {
	},templates))
}
.call(this),define("searchH5/pages/searchlist/_.index",["./deps/components/data-manager/index","./deps/components/lazyload/index","./deps/components/util/index","./mods/listview/index","./mods/searchbox/index","./mods/sift/index","./js/main","./js/onesearch"],function(a) {
	var b=window.deps= {
	components: {
	},mods: {
	}
}
;b.components["data-manager"]=a("./deps/components/data-manager/index"),b.components.lazyload=a("./deps/components/lazyload/index"),b.components.util=a("./deps/components/util/index"),b.mods.listview=a("./mods/listview/index"),b.mods.searchbox=a("./mods/searchbox/index"),b.mods.sift=a("./mods/sift/index"),a("./js/main")}),define("searchH5/pages/searchlist/deps/components/data-manager/index",[],function() {
	function a(a) {
	this.params=a.data,this.url=a.url;
	var b= {
	type:"get",url:this.url,dataType:"jsonp",timeout:6e4
}
,c=$.extend(b,a);
	this.opt=c,this.dataListenerList=[]}function b(a,b) {
	var c;
	for(var d in b)c=b[d],""===c||null===c?delete a[d]:a[d]=c
}
return a.params= {
	},a.setParam=function(a) {
	b(this.params,a),this.trigger("set",a)
}
,a.removeParam=function(a) {
	delete this.params[a]
}
,a.prototype= {
	setParam:function(a) {
	b(this.params,a),this.trigger("set",a)
}
,removeParam:function(a) {
	delete this.params[a]
}
,getData:function(b) {
	var c=this;
	b=b|| {
	},b.data=$.extend(_.clone(a.params),this.params,b.data);
	var d=b.success;
	b.success=function(a,b,e) {
	d&&d(a,b,e);
	var f=c.dataListenerList.slice();
	f.forEach(function(b) {
	var d=b;
	if("/"==d.indexOf(0)&&(d=d.slice(1)),"/"==b)return void c.trigger(b,a);
	var e=d.split("/"),f=a;
	e.forEach(function(a) {
	"object"==typeof f&&""!==a&&(f=f[a])
}
),void 0!==f&&c.trigger(b,f)})};
	var e=b.error;
	b.error=function(a,b,d) {
	e&&e(err,b),c.trigger("error",d,b)
}
,$.ajax($.extend(_.clone(this.opt),b))},onData:function(a,b) {
	this.dataListenerList.push(a),this.on(a,b)
}
,offData:function(a,b) {
	if(this.off(a,b),!this.hasListeners(a)) {
	for(var c=0;
	c<this.dataListenerList.length;
	c++)this.dataListenerList[c]===a&&this.dataListenerList.splice(c,1);
	this.off(a,b)
}
}},Emitter(a),Emitter(a.prototype),a}),function(a) {
	if(void 0==window.define) {
	var b= {
	},c=b.exports= {
	};
	a(null,c,b),window.lazyload=b.exports
}
else define("searchH5/pages/searchlist/deps/components/lazyload/index",[],a)}(function(a,b,c) {
	function d(a,b) {
	var c=b.right>a.left&&b.left<a.right,d=b.bottom>a.top&&b.top<a.bottom;
	return c&&d
}
function e(a,b) {
	if(a) {
	var c,d,e,g,h;
	if(a!=f)h=a.offset?a:$(a),h=h.offset(),c=h.width,d=h.height,e=h.left,g=h.top;
	else {
	var i=b&&b.y||0,j=b&&b.x||0;
	c=a.innerWidth+j,d=a.innerHeight+i,e=a.pageXOffset,g=a.pageYOffset
}
return {
	left:e,top:g,right:e+c,bottom:g+d
}
}}var f=window;
	return lazyload= {
	init:function(a) {
	this.img.init(a)
}
,img: {
	init:function(a) {
	var b=this;
	if(!b.isload) {
	var c= {
	lazyHeight:400,lazyWidth:0,definition:!1,size:null
}
,a=a|| {
	};
	$.extend(b,c,a);
	var d=b.definition,e=f.devicePixelRatio;
	b.definition=d&&e&&e>1||!1,b.DPR=e;
	var g=5,h=200,i=b.isPhone=b.fetchVersion();
	if(i) {
	var j,k;
	$(f).on("touchstart",function() {
	j= {
	sy:f.pageYOffset,time:Date.now()
}
,k&&clearTimeout(k)}).on("touchend",function(a) {
	if(a&&a.changedTouches) {
	var c=Math.abs(f.pageYOffset-j.sy);
	if(c>g) {
	var d=Date.now()-j.time;
	k=setTimeout(function() {
	b.changeimg(),j= {
	},clearTimeout(k),k=null
}
,d>h?0:200)}}else b.changeimg()}).on("touchcancel",function() {
	k&&clearTimeout(k),j=null
}
)}else $(f).on("scroll",function() {
	b.changeimg()
}
);
	b.isload=!0}},trigger:function(a) {
	var b=this,c=b.isPhone,d=c&&"touchend"||"scroll";
	b.imglist&&b.imglist.each(function(a,b) {
	b&&(b.onerror=b.onload=null)
}
),a&&(b.size=a),b.imglist=$("img.lazy"),$(window).trigger(d)},fetchVersion:function() {
	var a=navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),b=a&&!0||!1,c=b&&a[2].split("_");
	return c=c&&parseFloat(c.length>1?c.splice(0,2).join("."):c[0],10),b&&6>c
}
,setImgSrc:function(a,b) {
	if(a) {
	b=b||this.size,b=b&&("string"==typeof b?b:b[this.DPR])||null,b&&(b=["_",b,".jpg"].join(""));
	var c=a.lastIndexOf("_."),d=-1!=c?a.slice(c+2):null,e=d&&"webp"==d.toLowerCase()?!0:!1,f=e?a.slice(0,c):a,g=f.replace(/_\d+x\d+\.jpg?/g,"");
	return g+=b,e&&g+"_.webp"||g
}
},getCoord:e,changeimg:function() {
	function a(a,c) {
	var d=a.attr("dataimg"),e=a.attr("datasize");
	d&&((g||e)&&(d=b.setImgSrc(d,e)),a.attr("src",d),a.css("visibility","visible"),a[0].onload||(a[0].onload=a[0].onerror=function() {
	$(this).removeClass("lazy").removeAttr("dataimg"),b.imglist[c]=null,this.onerror=this.onload=null
}
))}var b=this,c=window,f= {
	x:b.lazyWidth,y:b.lazyHeight
}
,g=b.definition;
	b.imglist.each(function(b,g) {
	if(g) {
	var h=$(g);
	d(e(c,f),e(h))&&a(h,b)
}
})}}},c?void(c.exports=lazyload):lazyload}),define("searchH5/pages/searchlist/deps/components/util/index",[],function() {
	function a(a) {
	a||(a=location.href);
	var b,c,d= {
	},e=a.split("?")[1];
	if(e) {
	e=e.split("#")[0],c=e.split("&");
	for(var f=0;
	f<c.length;
	f++)b=c[f].split("="),d[b[0]]=decodeURIComponent(b[1])
}
return d}return $&&($.fn.siblings=function(a) {
	var b=this.map(function(a,b) {
	return[].filter.call($(b).parent().children(),function(a) {
	return a!==b
}
)});
	return a?b.filter(a):b}) {
	getUrlParams:a
}
}),define("searchH5/pages/searchlist/mods/listview/index",[],function(require,exports,module) {
	function ListView(a) {
	this.listItemData="",this.currentPageIndex=1,this.totalPage=0,this.currentItemIndex=0,this.listItemTpl=_.templates["tpl-listview-item"],this.containerTpl=_.templates["tpl-listview-container"];
	var b=window.devicePixelRatio||1;
	this.sizeMap=b>=2? {
	list:210,larger:250,largest:430
}
: {
	list:100,larger:130,largest:300
}
,this.container=$(a),this.toploading=null,this.bottomloading=null,this.defaultLoading=$("#J_Loading"),this.listContainer=null,this.pageDataMap= {
	},this.dataList=[],this.isUserScroll=!0,this.currentViewType,this.init()
}
function PageNav(a) {
	this.$container=$(a.container),this.pageCount=a.pageCount,this.init()
}
var Util= {
	once:function(a,b) {
	var c,d="first";
	return function() {
	var e=arguments,f=this;
	clearTimeout(c),"first"===d?(a.apply(f,e),d=null):d||(d=setTimeout(function() {
	a.apply(f,e),d=null,c=setTimeout(function() {
	d="first"
}
,b)},b))}}},DEFAULT_IMG_URL="http://a.tbcdn.cn/mw/s/common/icons/nopic/no-90.png",lazyload=deps.components.lazyload,STORY_KEY="viewtype";
	return ListView.prototype= {
	init:function() {
	this.dataManager=window.globle.dataManagers.list,lazyload.img.init( {
	definition:!0
}
)},initWithData:function() {
	this.listContainer=this.container.append(this.containerTpl( {
	viewtype:this.getViewType()
}
)).find("ul").first(),this.toploading=this.container.find(".J_TopLoading"),this.bottomloading=this.container.find(".J_BottomLoading"),this.events()},_calculate:function() {
	this.toolBarHeight=$(".toolbar").height(),this.pageHeight=$(".page-container").height(),this.windowHeight=window.screen.height
}
,events:function() {
	this._dragDownEvent=_.bind(this._dragDownEvent,this),this._hammerListContainer=Hammer(this.listContainer[0] {
	swipe_velocity:0
}
),$(document).on("scroll",_.bind(this._scrollEvent,this)),this.listContainer.on("click",".type-tip li",function(a) {
	$("#tbh5v0").addClass("fixed"),$(a.target).animate( {
	position:"relative",top:"-800px",opacity:"0.2"
}
 {
	duration:800,complete:function() {
	location.href=location.href
}
}),a.stopPropagation()}),this.listContainer.on("tap",".list-item a",function(a) {
	a.preventDefault(),location.href=$(this).attr("href")
}
).on("click",".list-item a",function(a) {
	a.preventDefault()
}
)},_scrollEvent:function() {
	var a=document.body.scrollTop;
	20>a?this._hammerListContainer.on("dragend",this._dragDownEvent):this._hammerListContainer.off("dragend",this._dragDownEvent),this.isUserScroll&&(this.currentPageIndex<this.totalPage&&this.bottomloading.offset().top-(a+window.screen.height)<320&&this.loadPage(this.currentPageIndex+1),this._updatePageIndex())
}
,_getPageItemOffset:function(a) {
	return Math.floor((a+this.windowHeight/2-this.toolBarHeight)/this.pageHeight)
}
,_updatePageIndex:Util.once(function() {
	if(this.isUserScroll) {
	var a=document.body.scrollTop,b=this.listContainer.find(".page-container"),c=this._getPageItemOffset(a),d=~~b.first().attr("data-page");
	this.currentPageIndex=d+c,this.resumePageItem(b.slice(c>=2?c-2:0,c+2)),this.opage&&this.opage.setIndex(this.currentPageIndex),this.currentPageIndex<this.totalPage&&this.bottomloading.offset().top-(a+window.screen.height)<320&&this.loadPage(this.currentPageIndex+1)
}
},200),_dragDownEvent:Util.once(function(a) {
	this.currentPageIndex>1&&"down"==a.gesture.direction&&this.loadPage(this.currentPageIndex-1,function(a) {
	a.success&&window.scrollTo(0,$(".page-container").height())
}
)},200),query:function(a) {
	var b=this,c=this.defaultLoading;
	a&&b.dataManager.setParam(a),b.listContainer&&b.listContainer.html(""),b.pageDataMap= {
	},c.show(),this.gotopage(1,function(a) {
	b.__oldInterfaceAdapter(a),b._calculate(),c.hide(),a.listItem.length<=0?b.listContainer.html('<div id="noresult"><div class="icons-noresult"></div><p class="detail">没搜索到相关宝贝</p></div>'):this.currentPageIndex=1
}
)},handleListItemsdata:function(a) {
	{var b=a.listItem;
	a.view
}
return b},_getParamFromUrl:function(a) {
	var b=location.search&&location.search.split("?")[1].match(new RegExp("(^| )"+a+"=([^&]*)(&|$)"));
	return b?unescape(b[2]):null
}
,renderListItems:function(a) {
	for(var b="",c=0,d=a.length;
	d>c;
	c++)b+=this.renderListItem(a[c],c);
	return b
}
,renderListItem:function(a,b) {
	function c(a) {
	if(a) {
	var b=a.split(".");
	if("00"==b[1])return b[0]
}
return a}function d(a,b,c) {
	if(b>a)return a;
	a/=b;
	var d=a.toString(),e=d.indexOf(".");
	return e>-1&&(d="0"==d[e+1]?d.slice(0,e):d.slice(0,e+2)),d=d+c||""
}
a.icon||(a.icon=[]),"true"==a.isP4p&&a.icon.push("c-icon-p4p"),"1"==a.userType&&a.icon.push("c-icon-pt");
	var e=[];
	if(a.mobileDiscount&&e.push( {
	className:"item-icons-zx",text:a.mobileDiscount,icon:"miniphone"
}
),a.coinLimit&&"0"!=a.coinLimit) {
	var f=parseInt(a.coinLimit)/100;
	e.push( {
	className:"item-icons-jinbi",text:"金币抵"+f+"%"
}
)}return"聚划算"==a.zkType&&e.push( {
	className:"item-icons-ju",text:"聚"
}
),_.extend(a {
	index:b,apply:!1,size:this._getImgSize(),iconlist:e,id:a.itemNumId||null,wwurl:a.wwimUrl||null,price:c(a.price),originalPrice:c(a.originalPrice),act:d(a.act,1e4,"万")
}
),_.templates["tpl-listview-item"](a)},changeViewType:function(a) {
	function b(a,b) {
	for(var c,d,e=0,f=a.length;
	f>e;
	e++)d=a.eq(e),d.hasClass("lazy")?c=d.attr("dataimg"):(d.addClass("lazy"),c=d.attr("src"),d.attr("src",DEFAULT_IMG_URL)),c=c.replace(/_\d+x\d+\.jpg?/g,"_"+b+".jpg"),d.attr("dataimg",c)
}
var c=$("#J_SearchList"),d=this.currentViewType;
	if(d!==a) {
	c.removeClass(d+"-view"),c.addClass(a+"-view"),this.currentViewType=a;
	var e=this._getImgSize();
	b(c.find("img.p-pic"),e),lazyload.img.trigger(e);
	try {
	localStorage&&localStorage.setItem(STORY_KEY,a)
}
catch(f) {
	}this._calculate()
}
},getViewType:function(a) {
	a=a||"list";
	var b=this.currentViewType,c= {
	list:"list",larger:"mid",largest:"grid"
}
;return b||(b=localStorage&&localStorage.getItem(STORY_KEY)),b?this.dataManager.setParam( {
	style:c[b]
}
):b=a,this.currentViewType=b,b},_getImgSize:function() {
	var a=this.sizeMap[this.getViewType()];
	return a+"x"+a
}
,fetchData:function(pageindex,callback) {
	var self=this;
	return self.fetching?void(callback&&callback( {
	})):(self.fetching=!0,void this.dataManager.getData( {
	data: {
	page:pageindex
}
,success:function(json) {
	"string"==typeof json&&(json=json.replace(/\\/g,"\\\\"),json=JSON?JSON.parse(json):eval("("+json+")")),json.view=self.getViewType(json.defaultViewType),callback&&callback( {
	success: {
	data:json
}
}),self.fetching=!1},error:function() {
	self.fetching=!1,callback&&callback( {
	error: {
	msg:"网络连接失败，请检查网络或刷新重试"
}
}),console.log("err")}}))},getData:function(a,b) {
	var c=this;
	c.pageDataMap[a]?b( {
	success:c.pageDataMap[a]
}
):c.fetchData(a,function(d) {
	if(d&&d.success) {
	var e=d.success.data;
	c.pageDataMap[a]= {
	pageData:d.success.pageData=c.handleListItemsdata(e),data:e
}
,c.totalPage=Number(e.totalPage)}b(d)})},getPageDom:function(a,b) {
	var c=this;
	this.getData(a,function(d) {
	if(d&&d.success) {
	var e=d.success.data,f=d.success.pageData,g=c.renderListItems(f),h=$("<div/>" {
	"class":"page-container J_PageContainer_"+a,"data-page":a
}
).append(g);
	e.smart_tips&&c.renderSmartTips(h,e.smart_tips),d.success.pageDom=h}b&&b(d)})},renderSmartTips:function(a,b) {
	var c=b.type;
	_.each(b.items,function(a) {
	a.url=[location.href,"bagtype="+c,"bagvalue="+encodeURIComponent(a.value),"bagshow="+encodeURIComponent(a.show)].join("&")
}
),a.prepend(_.templates["tpl-listview-smarttips"](b))},recyclePageItem:function(a) {
	var b=$(".page-container");
	if(a>0)b.slice(a).remove();
	else {
	var c=b.slice(0,a);
	c.length>0&&(c.addClass("recycle"),c.css("height",c.first().height()),c.html(""))
}
},resumePageItem:function(a) {
	for(var b,c=this,d=a.filter(".recycle"),e=d.length-1;
	e>=0;
	e--)b=d.eq(e),c.getPageDom(b.attr("data-page"),function(a) {
	a.success&&(b.removeClass("recycle"),b.replaceWith(a.success.pageDom),b.css("height","auto"),lazyload.img.trigger(c._getImgSize()))
}
)},loadPage:function(a,b) {
	if(!($(".J_PageContainer_"+a).length>0)) {
	var c=this,d=c.listContainer;
	if(d)switch(a) {
	case c.currentPageIndex-1:c.toploading.show();
	break;
	case c.currentPageIndex+1:break;
	default:c.bottomloading.hide(),d&&d.empty(),c.defaultLoading.show()
}
this.getPageDom(a,function(e) {
	var f;
	if(d||(c.initWithData(),d=c.listContainer),!e||!e.success) {
	if(c.toploading.hide(),c.bottomloading.hide(),c.defaultLoading.hide(),!e)return;
	return void(e.error&&d.html('<div class="c-msg"><section class="c-msg-img warn"></section><section class="c-msg-info"><p>'+e.error.msg+"</p></section></div>"))
}
switch(f=e.success.pageDom,a) {
	case c.currentPageIndex-1:c.toploading.hide(),d.prepend(f),!(a%5)&&c.recyclePageItem(5);
	break;
	default:d.append(f),!(a%5)&&c.recyclePageItem(-5),a>=c.totalPage?c.bottomloading.hide():c.bottomloading.show(),c.defaultLoading.hide()
}
lazyload.img.trigger(c._getImgSize()),b&&b(e)})}},gotopage:function(a,b) {
	var c=this,d=!1,e=$(".J_PageContainer_"+a);
	e.length?(c._scrollIntoView(e),c.currentPageIndex=a):d||(d=!0,c.isUserScroll=!1,this.loadPage(a,function(e) {
	e.success&&(c.currentPageIndex=a,1!=a&&c._scrollIntoView($(".J_PageContainer_"+a),-34),b&&b(e.success.data)),c.isUserScroll=!0,d=!1
}
))},_scrollIntoView:function(a,b) {
	var c=this;
	b=a.offset().top+(b||0),c.isUserScroll=!1,clearTimeout(c.isUserScrollTimer),c.isUserScrollTimer=setTimeout(function() {
	c.isUserScroll=!0
}
,500);
	var d=this.listContainer.find(".page-container"),e=this._getPageItemOffset(b);
	c.resumePageItem(d.slice(e>=2?e-2:0,e+2)),window.scrollTo(0,b)},__oldInterfaceAdapter:function(a) {
	function b(a) {
	c.opage&&c.opage.$container.empty(),c.opage=new PageNav( {
	container:"#J_PageNavContainer",pageCount:a.totalPage
}
),c.opage.$container.on("page:change",function(a,b) {
	c.gotopage(b.index)
}
)}var c=this;
	b(a),c.noFirst||(c.noFirst=!0)}},PageNav.prototype= {
	init:function() {
	this.$container.append(_.templates["tpl-listview-pagenav"]( {
	pageCount:this.pageCount
}
)),this.$prev=this.$container.find(".J_PagePrev"),this.$next=this.$container.find(".J_PageNext"),this.$currentPage=this.$container.find(".currentPage"),this.$filledBar=this.$container.find(".slidebar-filled"),this.$bar=this.$container.find(".slidebar"),this.$slider=this.$container.find(".pagenav-slider"),this.$sliderblock=this.$container.find(".icons-slider-block"),this.$main=this.$container.find(".J_PageNavMain"),this.eventAttach()},eventAttach:function() {
	var a=this,b=null,c=null,d=1,e=0;
	a.$slider.on("touchstart touchmove",function(f) {
	c||(c=setTimeout(function() {
	var g=f.touches[0].clientX-e,h=a.pageCount;
	b||(b=parseInt(a.$bar.css("width"))),d=g/b*h,d=d>=1&&h>=d?Math.ceil(d):1>d?1:h,a.$filledBar.css("width",g+"px"),a.$currentPage.text(d),c=null
}
,100)),f.preventDefault()}).on("touchend",function(b) {
	clearTimeout(c),c=null,a.gotoPage(d),b.preventDefault()
}
),this.$prev.on("tap",function() {
	a.gotoPage(~~a.$currentPage.text()-1)
}
),this.$next.on("tap",function() {
	a.gotoPage(~~a.$currentPage.text()+1)
}
),this.$main.on("tap",function() {
	a.$container.toggleClass("expended"),e=a.$filledBar.attr("offsetLeft")
}
),$(".gotop").on("tap",function() {
	window.scrollTo(0,0)
}
)},gotoPage:function(a) {
	this.setIndex(a),this.$container.triggerHandler("page:change" {
	index:~~this.$currentPage.text()
}
)},setIndex:function(a) {
	1>a||a>this.pageCount||(1==a?this.$prev.addClass("disabled"):this.$prev.removeClass("disabled"),a==this.pageCount?this.$next.addClass("disabled"):this.$next.removeClass("disabled"),this.$currentPage.text(a),this.$filledBar.css("width",100*a/this.pageCount+"%"))
}
},ListView}),define("searchH5/pages/searchlist/mods/searchbox/index",[],function() {
	function a(a) {
	var b=new RegExp("(?:^|;
	\\s*)"+a+"\\=([^;
	]+)(?:;
	\\s*|$)").exec(document.cookie);
	return b?b[1]:void 0
}
function b(a) {
	this.defaultParams= {
	nick:Util.getNickFromCookie(),sid:Util.getParam("sid")
}
,this.q=a.q||"",this.tab=a.tab||"all",this.suggestCache= {
	},this.init()
}
return Util= {
	getCookie:function(a) {
	var b=document.cookie.match(new RegExp("(^| )"+a+"=([^;
	]*)(;
	|$)"));
	return null!=b?b[2]:null
}
,getParam:function(a) {
	var b=location.search&&location.search.split("?")[1].match(new RegExp("(^|&)"+a+"=([^&]*)(&|$)"));
	return b?unescape(b[2]):null
}
,getNickFromCookie:function() {
	var b="",c=a("_w_tb_nick"),d=a("_nk_")||a("snk");
	return c&&c.length>0&&"null"!=c?b=decodeURIComponent(c):d&&d.length>0&&"null"!=d&&(b=unescape(unescape(d).replace(/\\u/g,"%u"))),b
}
},b.prototype= {
	init:function() {
	this._findNodes(),this.$searchInput.val(this.q),this._tabInit(),this._eventAttach();
	var a=this;
	this.on("search",function(b) {
	a.q=b,a.close()
}
)},_findNodes:function() {
	this.$topBar=$(".top-bar"),this.$searchInput=this.$topBar.find(".J_autocomplete"),this.$mainContainer=this.$topBar.find(".top-bar-c"),this.$suggestContainer=$('<div class="suggest-container"></div>').insertAfter(this.$topBar),this.$closeBtn=this.$topBar.find(".closed"),this.$from=this.$topBar.find("#J_Search"),this.$clearQueryBtn=$(".s-form-search button")
}
,_eventAttach:function() {
	var a=this;
	$(".searchbtn").on("tap",function(b) {
	b.preventDefault();
	var c=a.$searchInput.val();
	c&&a.trigger("search",c {
	top_search:1
}
)}),this.$searchInput.on("click",function() {
	}).on("focus",function() {
	$(".s-input-tab-nav").removeClass("on").addClass("off"),a.open()
}
).on("input focus",function(b) {
	a._inputChangeEvent.call(a,b)
}
),this.$suggestContainer.on("tap",".J_AddToQuery",function(b) {
	return a.$searchInput.val($(b.currentTarget).parent("li").text()),b.preventDefault(),!1
}
).on("tap","li",function(b) {
	var c=$(b.currentTarget);
	"DIV"!==b.target.tagName&&(a.$searchInput.val(c.text()),a.trigger("search",a.$searchInput.val() {
	sugg:a.$searchInput.val()+"_"+c.index()+"_"+c.parent("ul").attr("data-sugg-type")
}
))}).on("tap",".J_ClearHistory",function() {
	delete a.suggestCache[""],a.$suggestContainer.html(""),a._cleanHistory()
}
),this.$clearQueryBtn.on("tap",function(b) {
	a.$searchInput.val(""),a._inputChangeEvent.call(a),a.$clearQueryBtn.hide(),b.preventDefault()
}
).click(function(a) {
	a.preventDefault()
}
),this.$closeBtn.on("tap",function() {
	a.close()
}
),this.$suggestContainer.on("touchstart",function() {
	a.$searchInput.blur()
}
)},open:function() {
	if("open"!==this.status) {
	$(document.body).addClass("status-suggest"),this.$topBar.addClass("on"),this.$suggestContainer.show(),$("#bodyCont").hide(),$(".filterbar-container").hide(),$(".rellkey-container").hide(),$(".onesearch-container").hide(),$("#J_PageNavContainer").hide();
	var a=this;
	setTimeout(function() {
	a.$searchInput[0].value="",a.$searchInput[0].value=a.q
}
,0),this.$mainContainer.siblings().hide(),this.$mainContainer.siblings(".closed").show(),this.status="open"}},close:function() {
	"close"!==this.status&&($(document.body).removeClass("status-suggest"),this.$topBar.removeClass("on"),this.$suggestContainer.hide(),$("#bodyCont").show(),$(".filterbar-container").show(),$(".rellkey-container").show(),$(".onesearch-container").show(),$("#J_PageNavContainer").show(),this.$searchInput.val(this.q),this.$mainContainer.siblings().show(),this.$clearQueryBtn.hide(),this.$mainContainer.siblings(".closed").hide(),this.status="close")
}
,_inputChangeEvent:function() {
	var a=this.$searchInput.val().replace(/(^\s+)|(\s+$)/g,""),b=this;
	""!=a?this.$clearQueryBtn.show():this.$clearQueryBtn.hide(),this._getSuggestItems(a,function(a) {
	b.$suggestContainer.html(a)
}
)},_tabInit:function() {
	var a=this,b=$(".s-input-tab-txt"),c=$(".s-input-tab-nav");
	b.text(c.find("."+a.tab).text()),b.click(function() {
	c.hasClass("on")?c.removeClass("on").addClass("off"):c.removeClass("off").addClass("on")
}
),c.find("li").click(function() {
	var c=$(this),d=c.attr("class");
	b.text(c.text()),a.trigger("tab" {
	tab:d,q:$(".J_autocomplete").val()
}
)})},_getSuggestItems:function(a,b) {
	var c,d=this;
	"undefined"!=typeof this.suggestCache[a]?b(this.suggestCache[a]):(c=function(c) {
	b(d.suggestCache[a]=c)
}
,a?this._getSug(a,c):this._getHistory(function(a) {
	a?c(a):d._getHotkey(c)
}
))},_getSug:function(a,b) {
	var c=this;
	$.ajax( {
	type:"get",url:"http://suggest.m.taobao.com/rpc/sug.json",data:$.extend( {
	q:a
}
,this.defaultParams),dataType:"jsonp",timeout:6e4,success:function(a) {
	b(c._renderSug(a.result))
}
,error:function() {
	b("")
}
})},_cleanHistory:function() {
	$.ajax( {
	type:"get",url:"http://suggest.m.taobao.com/rpc/history/clean.json?nick="+this.defaultParams.nick,data: {
	sid:this.defaultParams.sid
}
,dataType:"jsonp",timeout:6e4})},_getHistory:function(a) {
	var b=this;
	$.ajax( {
	type:"get",url:"http://suggest.m.taobao.com/rpc/history/get.json?nick="+this.defaultParams.nick,data: {
	sid:this.defaultParams.sid
}
,dataType:"jsonp",timeout:6e4,success:function(c) {
	a(c.content&&c.content.length>0?b._renderHistory(c.content):"")
}
,error:function() {
	a("")
}
})},_getHotkey:function(a) {
	var b=this;
	$.ajax( {
	type:"get",url:"http://suggest.m.taobao.com/rpc/hot_key.json?nick="+this.defaultParams.nick,data: {
	sid:this.defaultParams.sid
}
,dataType:"jsonp",timeout:6e4,success:function(c) {
	a(b._renderHotkey(c.querys))
}
,error:function() {
	a("")
}
})},_renderSug:function(a) {
	var b=[],c=this.$searchInput.val();
	b.push('<ul class="suggest-sug" data-sugg-type="0">');
	for(var d=0;
	d<a.length;
	d++) {
	var e=a[d][0];
	0==e.indexOf(c)&&(e='<span class="match-word">'+c+"</span>"+e.slice(c.length)),b.push("<li>"+e+'<div class="add J_AddToQuery"><div class="icons-suggest-addto"></div></div></li>')
}
return b.push("</ul>"),b.join("")},_renderHistory:function(a) {
	var b=[];
	b.push("<h3>最近搜过</h3>"),b.push('<ul class="suggest-history" data-sugg-type="1">');
	for(var c=a.length>10?10:a.length,d=0;
	c>d;
	d++)b.push("<li>"+a[d].key+'<div class="add J_AddToQuery"><div class="icons-suggest-addto"></div></div></li>');
	return b.push("</ul>"),b.push('<div class="clearHistory J_ClearHistory">清空搜索历史</div>'),b.join("")
}
,_renderHotkey:function(a) {
	var b=[];
	b.push("<h3>大家都在搜</h3>"),b.push('<ul class="suggest-hotkey" data-sugg-type="2">');
	for(var c=0;
	c<a.length;
	c++)b.push("<li>"+a[c]+"</li>");
	return b.push("</ul>"),b.join("")
}
},Emitter(b.prototype),b}),define("searchH5/pages/searchlist/mods/sift/index",[],function() {
	function a(a) {
	this._optHandle(a),this._render()
}
function b() {
	return[ {
	name:"天猫",value:"tab_mall"
}
 {
	name:"全球购",value:"service_hwsp"
}
 {
	name:"手机专享价",value:"service_sjzx"
}
 {
	name:"淘金币抵钱",value:"service_tjb"
}
 {
	name:"免运费",value:"service_myf"
}
 {
	name:"7天退换",value:"service_qtth"
}
 {
	name:"消费者保障",value:"service_xfzbz"
}
 {
	name:"货到付款",value:"service_hdfk"
}
 {
	name:"促销",value:"tab_discount"
}
]}function c() {
	function a(a) {
	for(var b in a)f(a[b])
}
var b=["江浙沪","珠三角","北京","上海","广州","深圳","杭州","成都","厦门","海外"],c= {
	C:["长沙","长春","成都"],D:["大连","东莞"],H:["杭州","合肥","哈尔滨"],J:["济南"],K:["昆明"],N:["宁波","南京","南昌"],Q:["青岛"],S:["苏州","石家庄","沈阳"],T:["天津"],W:["温州","无锡","武汉"],X:["西安","厦门"],Z:["郑州"]
}
,d= {
	A:["安微","澳门"],F:["福建"],G:["甘肃","广东","广西","贵州"],H:["海南","河北","河南","湖北","湖南","黑龙江"],J:["江苏","吉林"],L:["辽宁"],N:["内蒙古","宁夏"],Q:["青海"],S:["山东","山西","陕西","四川"],T:["台湾"],X:["西藏","新疆","香港"],Y:["云南"],Z:["浙江"]
}
;return a(c),a(d) {
	common:b.slice(0,-1),city:c,province:d
}
}function d(a) {
	var b=[];
	return _.each(a.navCatList,function(a) {
	b.push( {
	name:a.name,value:a.catmap
}
)}),f(b),b}function e(a) {
	var b=[];
	return _.each(a.navPropList,function(a) {
	var c=[];
	_.each(a.propList,function(a) {
	c.push( {
	name:a.name,value:a.ppath
}
)}),f(c),c.length&&b.push( {
	propName:a.propName,list:c
}
)}),b}function f(a) {
	var b=a.length;
	b%3&&(a.length=b+(3-b%3))
}
return a.prototype= {
	show:function() {
	$("#J_SiftContent").show(),$("#J_SiftMask").css("display","block"),$("html").addClass("sift-move"),$("#tbh5v0").hasClass("fixed")&&$("#tbh5v0").removeClass("fixed")
}
,hide:function() {
	$("#J_SiftMask").hide(),$("html").addClass("sift-back"),setTimeout(function() {
	$("#J_SiftContent").hide(),$("html").removeClass("sift-move"),$("html").removeClass("sift-back")
}
,200)},setData:function(a) {
	this.clear(),this._initNav(a.nav)
}
,clear:function() {
	$(".J_SiftConditionBox li").removeClass("selected"),$(".J_SiftConditionBox").removeClass("sift-selected"),$(".J_SiftConditionBox").addClass("sift-hide"),$("#J_SiftClear").hide()
}
,_optHandle:function(a) {
	this.container="string"==typeof a.container?$(a.container).eq(0):a.container,this.data=a.data,this.listDataManager=a.dataManagers.list,this.navDataManager=a.dataManagers.cat
}
,_render:function() {
	var a=this.container,d=_.templates["tpl-sift"];
	a.append(d( {
	businessTypeData:b(),locData:c()
}
)),this.$catBox=$(".J_CatBox",this.container),this.$propBox=$(".J_PropBox",this.container)},_initNav:function(a) {
	var b=this;
	"1"==a.navType?(b.$propBox.html(""),b.$catBox.html(_.templates["tpl-sift-cat"]( {
	data:d(a)
}
))):(b.$catBox.html(""),b.$propBox.html(_.templates["tpl-sift-prop"]( {
	data:e(a)
}
)))},_renderProp:function(a) {
	var b=this;
	this._getPropData(a,function(a) {
	b.$propBox.html("2"==a.navType?_.templates["tpl-sift-prop"]( {
	data:e(a)
}
):"")})},_getPropData:function(a,b) {
	this.navDataManager.getData( {
	data: {
	catmap:a
}
,success:b})},_getParams:function() {
	for(var a,b,c,d,e=this.container.find(".sift-box"),f= {
	},g=0,h=e.length;
	h>g;
	g++)if(a=e.eq(g),!a.hasClass("ignore")) {
	d=[],c=a.attr("data-key"),b=a.find("li.selected");
	for(var i=0,j=b.length;
	j>i;
	i++)d.push(b.eq(i).attr("data-value"));
	f[c]=d.join(";
	")
}
return _.extend(f,this._getPriceRangeParam()),f},_getPriceRangeParam:function() {
	var a=Number($(".start-price").val()),b=Number($(".end-price").val());
	return {
	start_price:isNaN(a)||0==a?"":a,end_price:isNaN(b)||a>=b?"":b
}
}},a.EVENT= {
	"#J_SiftClear": {
	tap:function() {
	this.clear()
}
},".J_CatBox li": {
	tap:function(a) {
	var b=$(a.currentTarget);
	if(b.hasClass("selected"))$(".J_PropBox").html("");
	else {
	var c=b.attr("data-value");
	c&&this._renderProp(c)
}
}},".J_SiftConditionBox li": {
	tap:function(a) {
	var b=$(a.currentTarget),c=b.parents(".J_SiftConditionBox");
	b.html()&&(b.hasClass("selected")?(b.removeClass("selected"),0==c.find("li.selected").length&&(c.removeClass("sift-selected"),c.addClass("sift-hide")),0==this.container.find("li.selected").length&&$("#J_SiftClear").hide()):(c.hasClass("J_MultiSelect")||c.find("li.selected").removeClass("selected"),b.addClass("selected"),c.addClass("sift-selected"),c.removeClass("sift-hide"),$("#J_SiftClear").show()))
}
},".J_SiftConditionBox": {
	tap:function(a) {
	var b=$(a.currentTarget),c=$(a.target);
	if(b.hasClass("sift-show")) {
	var d=c.parents(".sift-condition").length,e=""==c.html(),f=!d||d&&!e&&!b.hasClass("J_MultiSelect");
	f&&b.removeClass("sift-show")
}
else this.container.find(".J_SiftConditionBox").removeClass("sift-show"),b.addClass("sift-show")}},".J_SiftCommit": {
	tap:function(a) {
	a.preventDefault(),this.hide(),this.trigger("commit",this._getParams())
}
}},a.DOCEVENT= {
	"#J_SiftMask": {
	tap:function(a) {
	a.preventDefault(),this.hide()
}
}},Emitter(a.prototype),a}),define("searchH5/pages/searchlist/js/main",["searchH5/pages/searchlist/js/onesearch"],function(a) {
	function b(a) {
	if(!a)return"";
	var b="";
	for(var c in a)b=b+"&"+c+"="+encodeURIComponent(a[c]);
	return b.slice(1)
}
function c() {
	var a=b($.extend(_.cloneDeep(u.params),v.params));
	location.href=location.pathname+"?"+a
}
function d() {
	var a=new deps.mods.searchbox( {
	q:u.params.q,tab:u.params.tab
}
);
	a.on("tab",function(a) {
	var b=a.tab;
	"shop"==b?location.href="http://shop.m.taobao.com/shop/shop_search.htm?topSearch=1&q="+a.q:a.q?a.q!=u.params.q?(u.setParam( {
	q:a.q,tab:b
}
),c()):($(".s-input-tab-nav").removeClass("on").addClass("off"),u.setParam( {
	tab:b
}
),w.query()):u.setParam( {
	tab:b
}
)}),a.on("search",function(a,b) {
	u.setParam( {
	q:a
}
),v.setParam(b),c()})}function e() {
	var a=f(deps.mods.sift {
	container:"#J_SiftContainer",dataManagers: {
	cat:new u( {
	url:t.url,data:t.params
}
),list:v}});
	a.on("commit",function(a) {
	v.setParam(a),w.query()
}
),$("#J_Sift").on("tap",function(b) {
	b.preventDefault(),b.stopImmediatePropagation(),a.show()
}
),v.onData("/nav",function(b) {
	a.setData( {
	nav:b
}
)})}function f(a,b) {
	var c=new a(b),d=a.EVENT,e=a.DOCEVENT;
	if(d) {
	var f=c.container;
	_.forIn(d,function(a,b) {
	_.forIn(a,function(a,d) {
	f.on(d,b,$.proxy(a,c))
}
)})}if(e) {
	var g=$(document.body);
	a.docEventBinded||(_.forIn(e,function(a,b) {
	_.forIn(a,function(a,d) {
	g.on(d,b,$.proxy(a,c))
}
)}),a.docEventBinded=!0)}return c}function g() {
	$("body").prepend(_.templates["tpl-body"]())
}
function h() {
	if(window&&window.SmartbannerJSON&&lib&&lib.smartbanner) {
	var a=SmartbannerJSON.mainSearch;
	a&&(a.href=location.href.replace("http://",""),lib.smartbanner.sbLogic(a,2))
}
}function i() {
	j(),h(),k(),p(),q()
}
function j() {
	v.onData("/",function a(b) {
	l(b.defaultViewType),v.offData("/",a)
}
)}function k() {
	var a=u.params.bagvalue;
	a&&($("#tbh5v0").addClass("bag-page"),$(".top-bar-w").prepend(_.templates["tpl-page-baghead"]( {
	bagshow:a.split(",")[0]
}
)))}function l(a) {
	function b() {
	function a() {
	"down"==g?(b=f,d.attr("data-order","up"),d.removeClass("up")):(b="_"+f,d.attr("data-order","down"),d.addClass("up"));
	var a=d.attr("data-default");
	a||d.attr("data-default",g)
}
var b,c,d=$(this),f=d.attr("data-value"),g=d.attr("data-order");
	if(d.hasClass("selected")&&g)a();
	else {
	c=$(".J_sortTab .selected"),c.removeClass("selected up");
	var h=c.attr("data-default");
	h&&c.attr("data-order",h),d.addClass("selected"),g?a():b=f
}
$("#tbh5v0").removeClass("fixed"),v.setParam( {
	sort:b
}
),w.query(),window.scrollTo(0,e.offset().top)}function c(a) {
	var b=a.currentTarget.children[0],c= {
	"icons-list":"larger","icons-larger":"largest","icons-largest":"list"
}
,e=c[b.className];
	d(b.className.split("-")[1]),w.changeViewType(e);
	var f=$(".currentItem");
	f.length>0&&window.scrollTo(0,f.offset().top-$(".top-bar").height()-$(".filter-bar").height()),b.className="icons-"+e}function d(a) {
	var b,c,d=$(".searchlist ul"),e=d.find("li"),f=e.first().height(),g=$(".toolbar").height();
	c=Math.floor((document.body.scrollTop-g+$(".top-bar").height()+$(".filter-bar").height())/f),b="larger"===a?2*c:c,b>0&&(e.filter(".currentItem").removeClass("currentItem"),e.eq(b).addClass("currentItem"))
}
var e=$(".filterbar-container"),f=_.templates["tpl-filterbar"]( {
	viewtype:localStorage&&localStorage.getItem("viewtype")||a||"list"
}
);
	e.html(f),e.on("tap",".J_SwitchViewtype",c).on("click",function(a) {
	a.preventDefault(),a.stopPropagation()
}
),e.on("tap",".J_sortTab li",b)}function m() {
	n()
}
function n() {
	var a=Hammer(document.body {
	swipe_velocity:0
}
);
	a.on("swipedown",function() {
	document.body.scrollTop<400?$("#tbh5v0").removeClass("fixed"):$("#tbh5v0").addClass("fixed")
}
).on("swipeup",function() {
	$("#tbh5v0").removeClass("fixed")
}
),$(document).on("scroll",function() {
	$(".top-bar").hasClass("on")||window.scrollY<300&&$("#tbh5v0").removeClass("fixed")
}
)}function o() {
	navigator.userAgent.indexOf("Chrome")>-1&&($("#J_SearchList").on("click","a",function() {
	try {
	sessionStorage.setItem("listContent",$("#J_SearchList ul").html()),sessionStorage.setItem("sortBar",$(".J_sortTab").html()),sessionStorage.setItem("scrollTop",document.body.scrollTop)
}
catch(a) {
	console.log("sessionStorage error")
}
}),window.addEventListener("popstate",function() {
	var a=sessionStorage.getItem("listContent"),b=sessionStorage.getItem("sortBar"),c=sessionStorage.getItem("scrollTop");
	a&&$("#J_SearchList ul").html(a),b&&$(".J_sortTab").html(b),c&&window.scrollTo(0,c),sessionStorage.removeItem("listContent"),sessionStorage.removeItem("sortBar"),sessionStorage.removeItem("scrollTop")
}
))}function p() {
	v.onData("/selecthot",function(a) {
	var b=$(".rellkey-container");
	a.length>9&&(a.length=9);
	var c= {
	list:a
}
;b.html(_.templates["tpl-relkey"](c))})}function q() {
	v.onData("/oneSearch",function(a) {
	var b=$(".onesearch-container");
	b.html(""),$('<iframe class="onesearch-iframe"></iframe>' {
	src:a.url,height:"starShop"===a.alias?a.height+"px":"0px",width:"100%","data-height":a.height,scrolling:"no"
}
).appendTo(b)})}var r=(deps.components.util,window.SearchH5.apiConfig),s=r.listApi,t=r.navApi,u=deps.components["data-manager"];
	u.setParam(r.params);
	var v=new u( {
	url:s.url,data:s.params
}
);
	window.globle= {
	},window.globle.dataManagers= {
	list:v
}
,g(),a("searchH5/pages/searchlist/js/onesearch");
	var w=new deps.mods.listview(".search-content");
	v.onData("/",function() {
	v.setParam( {
	closeModues:"nav,selecthot,onesearch"
}
)}),u.on("set",function(a) {
	a.q&&v.setParam( {
	sugg:"",loc:"",filter:"",catmap:"",ppath:"",start_price:"",end_price:"",sort:"",top_search:"",closeModues:""
}
)}),e(),d();
	var x= {
	init:function() {
	var a=this;
	i(),w.query(),a.events(),o(),m()
}
,events:function() {
	var a=($(".searchlist"),$(".J_autocomplete"));
	$(".rellkey-container").on("tap","li",function(b) {
	b.preventDefault();
	var d=$(this);
	u.setParam( {
	q:a.val()+" "+d.attr("data-name")
}
),v.setParam( {
	DN:1,atype:1,searchfrom:1
}
),c()})}};
	return x.init()}),define("searchH5/pages/searchlist/js/onesearch",[],function() {
	window.addEventListener("message",function(b) {
	var c=b.data;
	if(c&&c.command) {
	var d=a[c.command](c.params);
	"number"==typeof c.cbKey&&b.source.postMessage( {
	result:d,cbKey:c.cbKey
}
,"*")}});
	var a= {
	redirect:function(a) {
	location.href=a.url
}
,show:function() {
	var a=$(".onesearch-container").find("iframe");
	a.animate( {
	height:a.attr("data-height")+"px"
}
)},getData:function(a) {
	var b;
	switch(a.key) {
	case"location":b=location.href
}
return b}}});