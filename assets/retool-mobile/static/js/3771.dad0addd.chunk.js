(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[3771],{

/***/ 578374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
var _g, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgSignatureIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 16,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#signatureIcon_svg__a)",
    stroke: "currentColor",
    strokeWidth: 1.143,
    strokeLinecap: "round"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M9.28 13.485h5.746",
    strokeLinejoin: "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2.402 6.292C1.256 5.482.753 4.987.604 3.798c-.142-1.126.49-2.288 1.44-2.882C3.367.091 4.937.868 5.815 1.962c.95 1.187 1.772 4.616 1.835 6.087.072 1.67-.257 3.187-1.102 4.638-.58.995-1.436 2.17-2.576 2.567-1.034.36-2.156.226-2.364-.993-.255-1.494.447-2.95 1.215-4.184C3.84 8.441 5.125 7.085 6.906 6.292c.935-.416 2.857-1.068 3.993 0 1.084 1.018.086 3.563.401 3.785.315.223 1.585-2.798 3.105-2.482.424.088 1.011.454 1.011.454"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "signatureIcon_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 0h16v16H0z"
  })))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgSignatureIcon);

/***/ }),

/***/ 301313:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 941288:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ maybeConvertBase64EncodedImage)
/* harmony export */ });
function maybeConvertBase64EncodedImage(maybeBase64Encoded){if(/^[A-Za-z0-9+/]+={0,2}$/i.test(maybeBase64Encoded.substring(0,400000))){const maybeSVG=maybeBase64Encoded.startsWith('PD94');return`data:image/${maybeSVG?'svg+xml':''};base64,${maybeBase64Encoded}`;}return maybeBase64Encoded;}

/***/ }),

/***/ 953771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SignatureWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(828256);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Signature/options.ts
/* harmony default export */ const options = ({disableAutoEditors:['adornments']});
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Signature/template.ts
/* harmony default export */ const template = ({value:'string',disabled:'boolean',label:'string',placeholder:'string',instructions:'string',_useObjectUrl:'boolean',_forceUseObjectUrl:'boolean',labelCaption:'string',_disableForcedOrientation:'boolean'});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Signature/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNSignatureWidget',name:'Signature',template: template,events:['capture'],refMethods:['open','clear'],api:({updateModel,ref})=>({open:{metadata:{label:'Open signature pad',description:'Open the signature pad overlay'},method:async()=>{if(ref){const reader=ref;reader===null||reader===void 0?void 0:reader.open();}}},clear:{metadata:{label:'Reset signature data',description:''},method:async()=>updateModel({value:null})}})}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(949699);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Pressable/index.js + 4 modules
var Pressable = __webpack_require__(355710);
// EXTERNAL MODULE: ./src/components/design-system/Label.tsx
var Label = __webpack_require__(768876);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Dimensions/index.js
var Dimensions = __webpack_require__(844349);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Platform/index.js
var Platform = __webpack_require__(894975);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StatusBar/index.js
var StatusBar = __webpack_require__(763357);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(584235);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/orientation.js
class Orientation{static configure=options=>{};static getOrientation=cb=>{cb("UNKNOWN");};static getDeviceOrientation=cb=>{cb("UNKNOWN");};static isLocked=()=>{return false;};static lockToPortrait=()=>{};static lockToPortraitUpsideDown=()=>{};static lockToLandscape=()=>{};static lockToLandscapeRight=()=>{};static lockToLandscapeLeft=()=>{};static lockToAllOrientationsButUpsideDown=()=>{};static unlockAllOrientations=()=>{};static addOrientationListener=cb=>{};static removeOrientationListener=cb=>{};static addDeviceOrientationListener=cb=>{};static removeDeviceOrientationListener=cb=>{};static addLockListener=cb=>{};static removeLockListener=cb=>{};static removeAllListeners=()=>{};static getInitialOrientation=()=>{return"UNKNOWN";};static getAutoRotateState=cb=>{cb(true);};}
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/hooks/useOrientationChange.js
function useOrientationChange(callback){const savedCallback=(0,react.useRef)();(0,react.useEffect)(()=>{savedCallback.current=callback;},[callback]);(0,react.useEffect)(()=>{function listener(ori){savedCallback.current(ori);}const initial=Orientation.getInitialOrientation();listener(initial);Orientation.addOrientationListener(listener);return()=>{Orientation.removeOrientationListener(listener);};},[]);}
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/hooks/useDeviceOrientationChange.js
function useDeviceOrientationChange(callback){const savedCallback=(0,react.useRef)();(0,react.useEffect)(()=>{savedCallback.current=callback;},[callback]);(0,react.useEffect)(()=>{function listener(ori){savedCallback.current(ori);}const initial=Orientation.getInitialOrientation();listener(initial);Orientation.addDeviceOrientationListener(listener);return()=>{Orientation.removeDeviceOrientationListener(listener);};},[]);}
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/hooks/useLockListener.js
function useLockListener(callback){const savedCallback=(0,react.useRef)();(0,react.useEffect)(()=>{savedCallback.current=callback;},[callback]);(0,react.useEffect)(()=>{function listener(ori){savedCallback.current(ori);}Orientation.addLockListener(listener);return()=>{Orientation.removeLockListener(listener);};},[]);}
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/hooks/index.js

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/src/OrientationLocker.js
const UNLOCK='UNLOCK';const PORTRAIT='PORTRAIT';const LANDSCAPE='LANDSCAPE';const LANDSCAPE_LEFT='LANDSCAPE_LEFT';const LANDSCAPE_RIGHT='LANDSCAPE_RIGHT';const PORTRAIT_UPSIDE_DOWN='PORTRAIT_UPSIDE_DOWN';const ALL_ORIENTATIONS_BUT_UPSIDE_DOWN='ALL_ORIENTATIONS_BUT_UPSIDE_DOWN';const stack=[];let immediateId;function update(){clearImmediate(immediateId);immediateId=setImmediate(()=>{let orientation;let length=stack.length;while(!orientation&&length--){orientation=stack[length].orientation;}switch(orientation){case UNLOCK:Orientation.unlockAllOrientations();break;case PORTRAIT:Orientation.lockToPortrait();break;case LANDSCAPE:Orientation.lockToLandscape();break;case LANDSCAPE_LEFT:Orientation.lockToLandscapeLeft();break;case LANDSCAPE_RIGHT:Orientation.lockToLandscapeRight();break;case PORTRAIT_UPSIDE_DOWN:Orientation.lockToPortraitUpsideDown();break;case ALL_ORIENTATIONS_BUT_UPSIDE_DOWN:Orientation.lockToAllOrientationsButUpsideDown();break;}});}function OrientationLocker({orientation,onChange,onDeviceChange}){const stackEntry=(0,react.useRef)({});(0,react.useEffect)(()=>{const{current}=stackEntry;stack.push(current);return()=>{const index=stack.indexOf(current);if(index!==-1){stack.splice(index,1);}update();};},[]);(0,react.useEffect)(()=>{stackEntry.current.orientation=orientation;update();},[orientation]);(0,react.useEffect)(()=>{if(onChange){Orientation.addOrientationListener(onChange);return()=>Orientation.removeOrientationListener(onChange);}},[onChange]);(0,react.useEffect)(()=>{if(onDeviceChange){Orientation.addDeviceOrientationListener(onDeviceChange);return()=>Orientation.removeDeviceOrientationListener(onDeviceChange);}},[onDeviceChange]);return null;}
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-native-orientation-locker@1.7.0_react-native-windows@0.73.11_@babel+core@7.24.9_@babel+_kkbikmyovehr6zmldmqcnlufua/node_modules/react-native-orientation-locker/index.js
const OrientationType={PORTRAIT:'PORTRAIT','PORTRAIT-UPSIDEDOWN':'PORTRAIT-UPSIDEDOWN','LANDSCAPE-LEFT':'LANDSCAPE-LEFT','LANDSCAPE-RIGHT':'LANDSCAPE-RIGHT','FACE-UP':'FACE-UP','FACE-DOWN':'FACE-DOWN',UNKNOWN:'UNKNOWN'};/* harmony default export */ const react_native_orientation_locker = (Orientation);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-safe-area-context@4.10.5_react-native@0.74.3_@babel+core@7.24.9_@babel+preset-en_seaxjtuwduh2u4x5n7lkflqnv4/node_modules/react-native-safe-area-context/lib/module/SafeAreaView.web.js
var SafeAreaView_web = __webpack_require__(138339);
// EXTERNAL MODULE: ./src/localization/index.ts + 5 modules
var localization = __webpack_require__(37651);
// EXTERNAL MODULE: ./src/toolbox/Icon/index.tsx
var Icon = __webpack_require__(721152);
// EXTERNAL MODULE: ./src/toolbox/Modal/index.tsx + 4 modules
var Modal = __webpack_require__(424930);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(151391);
// EXTERNAL MODULE: ./src/components/design-system/Button.tsx
var Button = __webpack_require__(681198);
// EXTERNAL MODULE: ./src/components/design-system/Text.tsx
var Text = __webpack_require__(442381);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/constants.ts
const SIGNATURE_AREA_ASPECT_RATIO=2.4;
;// CONCATENATED MODULE: ../node_modules/.pnpm/signature_pad@3.0.0-beta.3/node_modules/signature_pad/dist/signature_pad.m.js
/*!
 * Signature Pad v3.0.0-beta.3 | https://github.com/szimek/signature_pad
 * (c) 2018 Szymon Nowak | Released under the MIT license
 */

class Point {
    constructor(x, y, time) {
        this.x = x;
        this.y = y;
        this.time = time || Date.now();
    }
    distanceTo(start) {
        return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    }
    equals(other) {
        return this.x === other.x && this.y === other.y && this.time === other.time;
    }
    velocityFrom(start) {
        return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 0;
    }
}

class Bezier {
    constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
        this.startPoint = startPoint;
        this.control2 = control2;
        this.control1 = control1;
        this.endPoint = endPoint;
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }
    static fromPoints(points, widths) {
        const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
        const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
        return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
    }
    static calculateControlPoints(s1, s2, s3) {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;
        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
        const l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
        const l2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));
        const dxm = (m1.x - m2.x);
        const dym = (m1.y - m2.y);
        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + (dxm * k), y: m2.y + (dym * k) };
        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;
        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty),
        };
    }
    length() {
        const steps = 10;
        let length = 0;
        let px;
        let py;
        for (let i = 0; i <= steps; i += 1) {
            const t = i / steps;
            const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
            const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
            if (i > 0) {
                const xdiff = cx - px;
                const ydiff = cy - py;
                length += Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
            }
            px = cx;
            py = cy;
        }
        return length;
    }
    point(t, start, c1, c2, end) {
        return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))
            + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)
            + (3.0 * c2 * (1.0 - t) * t * t)
            + (end * t * t * t);
    }
}

function throttle(fn, wait = 250) {
    let previous = 0;
    let timeout = null;
    let result;
    let storedContext;
    let storedArgs;
    const later = () => {
        previous = Date.now();
        timeout = null;
        result = fn.apply(storedContext, storedArgs);
        if (!timeout) {
            storedContext = null;
            storedArgs = [];
        }
    };
    return function (...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        storedContext = this;
        storedArgs = args;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = fn.apply(storedContext, storedArgs);
            if (!timeout) {
                storedContext = null;
                storedArgs = [];
            }
        }
        else if (!timeout) {
            timeout = window.setTimeout(later, remaining);
        }
        return result;
    };
}

class SignaturePad {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = options;
        this._handleMouseDown = (event) => {
            if (event.which === 1) {
                this._mouseButtonDown = true;
                this._strokeBegin(event);
            }
        };
        this._handleMouseMove = (event) => {
            if (this._mouseButtonDown) {
                this._strokeMoveUpdate(event);
            }
        };
        this._handleMouseUp = (event) => {
            if (event.which === 1 && this._mouseButtonDown) {
                this._mouseButtonDown = false;
                this._strokeEnd(event);
            }
        };
        this._handleTouchStart = (event) => {
            event.preventDefault();
            if (event.targetTouches.length === 1) {
                const touch = event.changedTouches[0];
                this._strokeBegin(touch);
            }
        };
        this._handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.targetTouches[0];
            this._strokeMoveUpdate(touch);
        };
        this._handleTouchEnd = (event) => {
            const wasCanvasTouched = event.target === this.canvas;
            if (wasCanvasTouched) {
                event.preventDefault();
                const touch = event.changedTouches[0];
                this._strokeEnd(touch);
            }
        };
        this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
        this.minWidth = options.minWidth || 0.5;
        this.maxWidth = options.maxWidth || 2.5;
        this.throttle = ('throttle' in options ? options.throttle : 16);
        this.minDistance = ('minDistance' in options ? options.minDistance : 5);
        if (this.throttle) {
            this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);
        }
        else {
            this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;
        }
        this.dotSize = options.dotSize || function () {
            return (this.minWidth + this.maxWidth) / 2;
        };
        this.penColor = options.penColor || 'black';
        this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';
        this.onBegin = options.onBegin;
        this.onEnd = options.onEnd;
        this._ctx = canvas.getContext('2d');
        this.clear();
        this.on();
    }
    clear() {
        const ctx = this._ctx;
        const canvas = this.canvas;
        ctx.fillStyle = this.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this._data = [];
        this._reset();
        this._isEmpty = true;
    }
    fromDataURL(dataUrl, options = {}, callback) {
        const image = new Image();
        const ratio = options.ratio || window.devicePixelRatio || 1;
        const width = options.width || (this.canvas.width / ratio);
        const height = options.height || (this.canvas.height / ratio);
        this._reset();
        image.onload = () => {
            this._ctx.drawImage(image, 0, 0, width, height);
            if (callback) {
                callback();
            }
        };
        image.onerror = (error) => {
            if (callback) {
                callback(error);
            }
        };
        image.src = dataUrl;
        this._isEmpty = false;
    }
    toDataURL(type = 'image/png', encoderOptions) {
        switch (type) {
            case 'image/svg+xml':
                return this._toSVG();
            default:
                return this.canvas.toDataURL(type, encoderOptions);
        }
    }
    on() {
        this.canvas.style.touchAction = 'none';
        this.canvas.style.msTouchAction = 'none';
        if (window.PointerEvent) {
            this._handlePointerEvents();
        }
        else {
            this._handleMouseEvents();
            if ('ontouchstart' in window) {
                this._handleTouchEvents();
            }
        }
    }
    off() {
        this.canvas.style.touchAction = 'auto';
        this.canvas.style.msTouchAction = 'auto';
        this.canvas.removeEventListener('pointerdown', this._handleMouseDown);
        this.canvas.removeEventListener('pointermove', this._handleMouseMove);
        document.removeEventListener('pointerup', this._handleMouseUp);
        this.canvas.removeEventListener('mousedown', this._handleMouseDown);
        this.canvas.removeEventListener('mousemove', this._handleMouseMove);
        document.removeEventListener('mouseup', this._handleMouseUp);
        this.canvas.removeEventListener('touchstart', this._handleTouchStart);
        this.canvas.removeEventListener('touchmove', this._handleTouchMove);
        this.canvas.removeEventListener('touchend', this._handleTouchEnd);
    }
    isEmpty() {
        return this._isEmpty;
    }
    fromData(pointGroups) {
        this.clear();
        this._fromData(pointGroups, ({ color, curve }) => this._drawCurve({ color, curve }), ({ color, point }) => this._drawDot({ color, point }));
        this._data = pointGroups;
    }
    toData() {
        return this._data;
    }
    _strokeBegin(event) {
        const newPointGroup = {
            color: this.penColor,
            points: [],
        };
        this._data.push(newPointGroup);
        this._reset();
        this._strokeUpdate(event);
        if (typeof this.onBegin === 'function') {
            this.onBegin(event);
        }
    }
    _strokeUpdate(event) {
        const x = event.clientX;
        const y = event.clientY;
        const point = this._createPoint(x, y);
        const lastPointGroup = this._data[this._data.length - 1];
        const lastPoints = lastPointGroup.points;
        const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
        const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
        const color = lastPointGroup.color;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            const curve = this._addPoint(point);
            if (!lastPoint) {
                this._drawDot({ color, point });
            }
            else if (curve) {
                this._drawCurve({ color, curve });
            }
            lastPoints.push({
                time: point.time,
                x: point.x,
                y: point.y,
            });
        }
    }
    _strokeEnd(event) {
        this._strokeUpdate(event);
        if (typeof this.onEnd === 'function') {
            this.onEnd(event);
        }
    }
    _handlePointerEvents() {
        this._mouseButtonDown = false;
        this.canvas.addEventListener('pointerdown', this._handleMouseDown);
        this.canvas.addEventListener('pointermove', this._handleMouseMove);
        document.addEventListener('pointerup', this._handleMouseUp);
    }
    _handleMouseEvents() {
        this._mouseButtonDown = false;
        this.canvas.addEventListener('mousedown', this._handleMouseDown);
        this.canvas.addEventListener('mousemove', this._handleMouseMove);
        document.addEventListener('mouseup', this._handleMouseUp);
    }
    _handleTouchEvents() {
        this.canvas.addEventListener('touchstart', this._handleTouchStart);
        this.canvas.addEventListener('touchmove', this._handleTouchMove);
        this.canvas.addEventListener('touchend', this._handleTouchEnd);
    }
    _reset() {
        this._lastPoints = [];
        this._lastVelocity = 0;
        this._lastWidth = (this.minWidth + this.maxWidth) / 2;
        this._ctx.fillStyle = this.penColor;
    }
    _createPoint(x, y) {
        const rect = this.canvas.getBoundingClientRect();
        return new Point(x - rect.left, y - rect.top, new Date().getTime());
    }
    _addPoint(point) {
        const { _lastPoints } = this;
        _lastPoints.push(point);
        if (_lastPoints.length > 2) {
            if (_lastPoints.length === 3) {
                _lastPoints.unshift(_lastPoints[0]);
            }
            const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
            const curve = Bezier.fromPoints(_lastPoints, widths);
            _lastPoints.shift();
            return curve;
        }
        return null;
    }
    _calculateCurveWidths(startPoint, endPoint) {
        const velocity = (this.velocityFilterWeight * endPoint.velocityFrom(startPoint))
            + ((1 - this.velocityFilterWeight) * this._lastVelocity);
        const newWidth = this._strokeWidth(velocity);
        const widths = {
            end: newWidth,
            start: this._lastWidth,
        };
        this._lastVelocity = velocity;
        this._lastWidth = newWidth;
        return widths;
    }
    _strokeWidth(velocity) {
        return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
    }
    _drawCurveSegment(x, y, width) {
        const ctx = this._ctx;
        ctx.moveTo(x, y);
        ctx.arc(x, y, width, 0, 2 * Math.PI, false);
        this._isEmpty = false;
    }
    _drawCurve({ color, curve }) {
        const ctx = this._ctx;
        const widthDelta = curve.endWidth - curve.startWidth;
        const drawSteps = Math.floor(curve.length()) * 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        for (let i = 0; i < drawSteps; i += 1) {
            const t = i / drawSteps;
            const tt = t * t;
            const ttt = tt * t;
            const u = 1 - t;
            const uu = u * u;
            const uuu = uu * u;
            let x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;
            let y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;
            const width = curve.startWidth + (ttt * widthDelta);
            this._drawCurveSegment(x, y, width);
        }
        ctx.closePath();
        ctx.fill();
    }
    _drawDot({ color, point }) {
        const ctx = this._ctx;
        const width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;
        ctx.beginPath();
        this._drawCurveSegment(point.x, point.y, width);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    _fromData(pointGroups, drawCurve, drawDot) {
        for (const group of pointGroups) {
            const { color, points } = group;
            if (points.length > 1) {
                for (let j = 0; j < points.length; j += 1) {
                    const basicPoint = points[j];
                    const point = new Point(basicPoint.x, basicPoint.y, basicPoint.time);
                    this.penColor = color;
                    if (j === 0) {
                        this._reset();
                    }
                    const curve = this._addPoint(point);
                    if (curve) {
                        drawCurve({ color, curve });
                    }
                }
            }
            else {
                this._reset();
                drawDot({
                    color,
                    point: points[0],
                });
            }
        }
    }
    _toSVG() {
        const pointGroups = this._data;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const minX = 0;
        const minY = 0;
        const maxX = this.canvas.width / ratio;
        const maxY = this.canvas.height / ratio;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvas.width.toString());
        svg.setAttribute('height', this.canvas.height.toString());
        this._fromData(pointGroups, ({ color, curve }) => {
            const path = document.createElement('path');
            if (!isNaN(curve.control1.x) &&
                !isNaN(curve.control1.y) &&
                !isNaN(curve.control2.x) &&
                !isNaN(curve.control2.y)) {
                const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} `
                    + `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} `
                    + `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} `
                    + `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
                path.setAttribute('d', attr);
                path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));
                path.setAttribute('stroke', color);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke-linecap', 'round');
                svg.appendChild(path);
            }
        }, ({ color, point }) => {
            const circle = document.createElement('circle');
            const dotSize = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;
            circle.setAttribute('r', dotSize.toString());
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', point.y.toString());
            circle.setAttribute('fill', color);
            svg.appendChild(circle);
        });
        const prefix = 'data:image/svg+xml;base64,';
        const header = '<svg'
            + ' xmlns="http://www.w3.org/2000/svg"'
            + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + ` viewBox="${minX} ${minY} ${maxX} ${maxY}"`
            + ` width="${maxX}"`
            + ` height="${maxY}"`
            + '>';
        let body = svg.innerHTML;
        if (body === undefined) {
            const dummy = document.createElement('dummy');
            const nodes = svg.childNodes;
            dummy.innerHTML = '';
            for (let i = 0; i < nodes.length; i += 1) {
                dummy.appendChild(nodes[i].cloneNode(true));
            }
            body = dummy.innerHTML;
        }
        const footer = '</svg>';
        const data = header + body + footer;
        return prefix + btoa(data);
    }
}

/* harmony default export */ const signature_pad_m = (SignaturePad);

// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/SignatureArea.tsx
const useSignaturePad=(containerRef,canvasRef)=>{const signaturePadRef=(0,react.useRef)(null);(0,react.useEffect)(()=>{if(containerRef.current&&canvasRef.current){const rect=containerRef.current.getBoundingClientRect();const canvas=canvasRef.current;canvas.width=rect.width;canvas.height=rect.height;const ctx=canvas.getContext('2d');ctx===null||ctx===void 0?void 0:ctx.resetTransform();signaturePadRef.current=new signature_pad_m(canvas);}},[containerRef,canvasRef,signaturePadRef]);return signaturePadRef;};const SignatureArea=(0,react.forwardRef)(function SignatureArea(props,ref){const{orientation,Container,renderOverlay,renderFooter}=props;const areaRef=(0,react.useRef)(null);const canvasRef=(0,react.useRef)(null);const signaturePadRef=useSignaturePad(areaRef,canvasRef);const[isEmpty,setEmpty]=(0,react.useState)(true);const getBase64SignatureData=(0,react.useCallback)(async()=>{var _signaturePadRef$curr,_signaturePadRef$curr2;if(isEmpty){return'';}return((_signaturePadRef$curr=signaturePadRef.current)===null||_signaturePadRef$curr===void 0?void 0:(_signaturePadRef$curr2=_signaturePadRef$curr.toDataURL())===null||_signaturePadRef$curr2===void 0?void 0:_signaturePadRef$curr2.replace('data:image/png;base64,',''))||'';},[isEmpty,signaturePadRef]);(0,react.useImperativeHandle)(ref,()=>({getBase64SignatureData,getSignatureImageUri:async()=>{const base64Data=await getBase64SignatureData();if(!base64Data){return'';}const byteCharacters=atob(base64Data);const byteArrays=[];const sliceSize=512;const contentType='image/png';for(let offset=0;offset<byteCharacters.length;offset+=sliceSize){const slice=byteCharacters.slice(offset,offset+sliceSize);const byteNumbers=new Array(slice.length);for(let i=0;i<slice.length;i++){byteNumbers[i]=slice.charCodeAt(i);}const byteArray=new Uint8Array(byteNumbers);byteArrays.push(byteArray);}const blobObj=new Blob(byteArrays,{type:contentType});const url=URL.createObjectURL(blobObj);return url;},clearSignature:()=>{var _signaturePadRef$curr3;setEmpty(true);(_signaturePadRef$curr3=signaturePadRef.current)===null||_signaturePadRef$curr3===void 0?void 0:_signaturePadRef$curr3.clear();}}),[getBase64SignatureData,signaturePadRef,setEmpty]);return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(Container,{orientation:orientation,children:[(0,jsx_runtime.jsx)("div",{style:{position:'absolute',top:0,left:0,right:0,bottom:0,zIndex:1},ref:areaRef,children:(0,jsx_runtime.jsx)("canvas",{style:{touchAction:'none',height:'100%'},draggable:true,onDragStart:ev=>{setEmpty(false);ev.preventDefault();ev.stopPropagation();},onTouchStart:()=>{setEmpty(false);},onClick:()=>{setEmpty(false);},ref:canvasRef})}),renderOverlay?renderOverlay():null]}),renderFooter?renderFooter({canClear:!isEmpty}):null]});});/* harmony default export */ const Signature_SignatureArea = (SignatureArea);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/SignatureModal.tsx
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function getAndroid31BottomInset(){if(true){return 0;}if(Platform["default"].Version>=31){var _StatusBar$currentHei;const screenHeight=Dimensions["default"].get('screen').height;const windowHeight=Dimensions["default"].get('window').height;const statusBarHeight=(_StatusBar$currentHei=StatusBar["default"].currentHeight)!==null&&_StatusBar$currentHei!==void 0?_StatusBar$currentHei:24;const navBarHeight=screenHeight-windowHeight+statusBarHeight;return navBarHeight;}return 0;}const styles=StyleSheet["default"].create({screen:{flex:1},whiteBackground:{position:'relative',backgroundColor:'white'},darkBackground:_objectSpread(_objectSpread({},StyleSheet["default"].absoluteFillObject),{},{backgroundColor:'rgba(0,0,0, 0.2)'}),content:{flex:1,marginHorizontal:8,alignItems:'center',justifyContent:'center',marginBottom:getAndroid31BottomInset()},card:{backgroundColor:'white',borderRadius:12,padding:16,alignItems:'center',shadowColor:'#000',shadowOffset:{width:0,height:4},shadowOpacity:0.25,shadowRadius:16,elevation:5,justifyContent:'center',width:'100%'},signatureContainer:{position:'relative',justifyContent:'flex-end',alignItems:'center'},signatureContainerPortrait:{paddingBottom:0,marginBottom:16},signatureContainerLandscape:{paddingBottom:24},hbarContainer:{width:'100%',flexDirection:'row',alignItems:'flex-end',pointerEvents:'none'},closeIcon:{position:'absolute',top:16,right:22,backgroundColor:colors.faintGrey,borderRadius:22,height:44,width:44,alignItems:'center',justifyContent:'center',zIndex:2},closeIconPressed:{backgroundColor:colors.nearGrey},sigIcon:{height:16,width:16,flexShrink:0,marginRight:12},hbar:{height:1,flexGrow:1,backgroundColor:colors.placeholderTextGrey},textContainer:{marginTop:12,pointerEvents:'none'},buttonContainer:{width:'100%',flexDirection:'row'},buttonContainerLandscape:{maxWidth:'90%',marginBottom: false?0:0},flexGrow:{flexGrow:1},clearButton:{marginRight:8},submitButton:{marginLeft:8}});const getOrientation=()=>{const dim=Dimensions["default"].get('screen');return dim.height>=dim.width?'portrait':'landscape';};function useDeviceOrientation(){const[orientation,setOrientation]=(0,react.useState)(getOrientation());(0,react.useEffect)(()=>{const onDimensionChange=()=>{setOrientation(getOrientation());};const subscription=Dimensions["default"].addEventListener('change',onDimensionChange);return()=>{subscription===null||subscription===void 0?void 0:subscription.remove();};},[]);if(true){return'portrait';}return orientation;}const SignatureAreaContainer=({orientation,children})=>{const style=(0,react.useMemo)(()=>{if(orientation==='portrait'){return{width:'100%',aspectRatio:SIGNATURE_AREA_ASPECT_RATIO};}else{return{flexGrow:1,width:'100%',maxWidth: false?0:undefined,aspectRatio:SIGNATURE_AREA_ASPECT_RATIO};}},[orientation]);return (0,jsx_runtime.jsx)(View["default"],{style:[style,styles.signatureContainer,orientation==='portrait'?styles.signatureContainerPortrait:styles.signatureContainerLandscape],children:children});};const FullScreenModal=({children})=>{return (0,jsx_runtime.jsx)(View["default"],{style:[styles.screen,styles.whiteBackground],children:(0,jsx_runtime.jsx)(SafeAreaView_web.SafeAreaView,{style:styles.content,children:children})});};const CenteredModal=({children,onDismiss})=>{return (0,jsx_runtime.jsx)(Pressable["default"],{style:[styles.screen,styles.darkBackground],onPress:onDismiss,children:(0,jsx_runtime.jsx)(SafeAreaView_web.SafeAreaView,{style:styles.content,children:(0,jsx_runtime.jsx)(Pressable["default"],{style:styles.card,children:children})})});};const useOrientationLock=disableForcedOrientation=>{const initialDisableForcedOrientation=(0,react.useRef)(disableForcedOrientation);(0,react.useLayoutEffect)(()=>{const forceOrientation=!initialDisableForcedOrientation.current;if(forceOrientation){react_native_orientation_locker.lockToLandscape();return()=>{react_native_orientation_locker.unlockAllOrientations();};}},[]);};const SignatureModal=({widgetId,onSubmit,updateModel,onDismiss,useObjectUrl,disableForcedOrientation,instructions})=>{const signatureRef=(0,react.useRef)(null);const handleSubmit=(0,react.useCallback)(()=>{;(async()=>{if(useObjectUrl){var _await$signatureRef$c,_signatureRef$current;const uri=(_await$signatureRef$c=await((_signatureRef$current=signatureRef.current)===null||_signatureRef$current===void 0?void 0:_signatureRef$current.getSignatureImageUri()))!==null&&_await$signatureRef$c!==void 0?_await$signatureRef$c:'';updateModel({value:uri});}else{var _await$signatureRef$c2,_signatureRef$current2;const signatureData=(_await$signatureRef$c2=await((_signatureRef$current2=signatureRef.current)===null||_signatureRef$current2===void 0?void 0:_signatureRef$current2.getBase64SignatureData()))!==null&&_await$signatureRef$c2!==void 0?_await$signatureRef$c2:'';updateModel({value:signatureData});}onSubmit();})();},[useObjectUrl,updateModel,signatureRef,onSubmit]);const handleClear=(0,react.useCallback)(()=>{var _signatureRef$current3;(_signatureRef$current3=signatureRef.current)===null||_signatureRef$current3===void 0?void 0:_signatureRef$current3.clearSignature();},[]);const orientation=useDeviceOrientation();useOrientationLock(disableForcedOrientation);const renderOverlay=(0,react.useCallback)(()=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(View["default"],{style:styles.hbarContainer,children:[(0,jsx_runtime.jsx)(View["default"],{style:styles.sigIcon,children:(0,jsx_runtime.jsx)(Icon.Icon,{name:"line/interface-delete-1",color:colors.placeholderTextGrey,size:16})}),(0,jsx_runtime.jsx)(View["default"],{style:styles.hbar})]}),instructions?(0,jsx_runtime.jsx)(View["default"],{style:styles.textContainer,children:(0,jsx_runtime.jsx)(Text["default"],{value:instructions,color:colors.placeholderTextGrey,size:"medium"})}):null]}),[instructions]);const renderFooter=(0,react.useCallback)(({canClear})=>(0,jsx_runtime.jsxs)(View["default"],{style:orientation==='landscape'?[styles.buttonContainer,styles.buttonContainerLandscape]:styles.buttonContainer,children:[(0,jsx_runtime.jsx)(View["default"],{style:[styles.flexGrow,styles.clearButton],children:(0,jsx_runtime.jsx)(Button["default"],{onPress:handleClear,title:(0,localization.localizedString)('Clear'),size:"large",backgroundColor:colors.faintGrey,textColor:colors.gray900,disabled:!canClear})}),(0,jsx_runtime.jsx)(View["default"],{style:[styles.flexGrow,styles.submitButton],children:(0,jsx_runtime.jsx)(Button["default"],{onPress:handleSubmit,title:(0,localization.localizedString)('Submit'),size:"large"})})]}),[handleClear,handleSubmit,orientation]);const contents=(0,jsx_runtime.jsx)(Signature_SignatureArea,{widgetId:widgetId,ref:signatureRef,orientation:orientation,Container:SignatureAreaContainer,renderOverlay:renderOverlay,renderFooter:renderFooter},orientation);const modal=(()=>{if(orientation==='portrait'){return (0,jsx_runtime.jsx)(CenteredModal,{onDismiss:onDismiss,children:contents});}return (0,jsx_runtime.jsxs)(FullScreenModal,{onDismiss:onDismiss,children:[contents,(0,jsx_runtime.jsx)(Pressable["default"],{style:({pressed})=>pressed?[styles.closeIcon,styles.closeIconPressed]:styles.closeIcon,onPress:onDismiss,children:(0,jsx_runtime.jsx)(Icon.Icon,{name:"bold/interface-delete-1",color:colors.textDark,size:14})})]});})();return (0,jsx_runtime.jsx)(Modal.Modal,{animationType:"fade",transparent:true,visible:true,onRequestClose:onDismiss,supportedOrientations:['portrait','landscape'],children:modal});};
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Image/index.js + 2 modules
var exports_Image = __webpack_require__(583573);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/components/utils/maybeConvertBase64EncodedImage.ts
var maybeConvertBase64EncodedImage = __webpack_require__(941288);
// EXTERNAL MODULE: ./src/toolbox/Svg/index.tsx + 1 modules
var Svg = __webpack_require__(966031);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/SignaturePreview.tsx
const SignaturePreview_styles=StyleSheet["default"].create({placeholderBox:{paddingVertical:14,paddingHorizontal:12,borderRadius:6,backgroundColor:colors.nearWhite,flexDirection:'row'},placeholderContent:{flexGrow:1,flexShrink:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},placeholderIcon:{flexShrink:0,height:16,width:16},previewBox:{backgroundColor:colors.nearWhite,borderRadius:6,overflow:'hidden'}});const Placeholder=({text})=>{return (0,jsx_runtime.jsx)(View["default"],{style:SignaturePreview_styles.placeholderBox,children:(0,jsx_runtime.jsxs)(View["default"],{style:SignaturePreview_styles.placeholderContent,children:[(0,jsx_runtime.jsx)(Text["default"],{value:text,color:colors.placeholderTextGrey,numberOfLines:1,ellipsizeMode:"tail"}),(0,jsx_runtime.jsx)(View["default"],{style:SignaturePreview_styles.placeholderIcon,children:(0,jsx_runtime.jsx)(Svg.Svg,{src:__webpack_require__(578374),width:16,height:16,color:"alwaysBlack"})})]})});};const Preview=({value})=>{const uri=(0,maybeConvertBase64EncodedImage["default"])(value);return (0,jsx_runtime.jsx)(View["default"],{style:SignaturePreview_styles.previewBox,children:(0,jsx_runtime.jsx)(exports_Image["default"],{style:{width:'100%',aspectRatio:SIGNATURE_AREA_ASPECT_RATIO},source:{uri},resizeMode:"cover"})});};const SignaturePreview=({value,placeholder})=>{return value?(0,jsx_runtime.jsx)(Preview,{value:value}):(0,jsx_runtime.jsx)(Placeholder,{text:placeholder});};
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/Signature.tsx
const Signature=(0,react.forwardRef)(function Signature(props,ref){const{id,value,instructions,placeholder,label,disabled,updateModel,onCapture,useObjectUrl,disableForcedOrientation}=props;const[open,setOpen]=(0,react.useState)(false);const handleOpen=(0,react.useCallback)(()=>{setOpen(true);},[]);const handleDismiss=(0,react.useCallback)(()=>{setOpen(false);},[]);const handleSubmit=(0,react.useCallback)(()=>{setOpen(false);onCapture();},[onCapture]);(0,react.useImperativeHandle)(ref,()=>({open:handleOpen}));return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[label?(0,jsx_runtime.jsx)(Label["default"],{title:label,disabled:disabled}):null,(0,jsx_runtime.jsx)(Pressable["default"],{onPress:handleOpen,disabled:disabled,children:(0,jsx_runtime.jsx)(SignaturePreview,{value:value,placeholder:placeholder})}),open?(0,jsx_runtime.jsx)(SignatureModal,{widgetId:id,onSubmit:handleSubmit,updateModel:updateModel,onDismiss:handleDismiss,useObjectUrl:useObjectUrl,disableForcedOrientation:disableForcedOrientation,instructions:instructions}):null]});});/* harmony default export */ const Signature_Signature = (Signature);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Signature/SignatureWidget.tsx
const _excluded=["updateModel","onCapture","value","_disableForcedOrientation","_useObjectUrl","apiRef"];function SignatureWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function SignatureWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?SignatureWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):SignatureWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const SignatureWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,Signature_Signature,widgetRuntimeOptions,options,_ref=>{let{updateModel,onCapture,value,_disableForcedOrientation,_useObjectUrl,apiRef}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return SignatureWidget_objectSpread(SignatureWidget_objectSpread({},rest),{},{value:value!==null&&value!==void 0?value:'',disableForcedOrientation:_disableForcedOrientation,useObjectUrl:_useObjectUrl,ref:apiRef,onCapture(){onCapture===null||onCapture===void 0?void 0:onCapture();},updateModel});}));

/***/ }),

/***/ 949699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ connectWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-redux@7.2.4_react-dom@18.3.1_react@18.3.1__react-native@0.74.3_@babel+core@7.24.9_@babe_az4c6i5siqhukmd7qezh6vzqeq/node_modules/react-redux/es/index.js + 19 modules
var es = __webpack_require__(917448);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var lodash = __webpack_require__(578105);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);
// EXTERNAL MODULE: ../packages/common/immutable.ts
var immutable = __webpack_require__(587587);
// EXTERNAL MODULE: ../frontend/src/components/plugins/index.ts + 1 modules
var plugins = __webpack_require__(313667);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/utils/getWidgetStyleConfig.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const isConfigWithVariants=config=>!!config&&'variants'in config;const getWidgetStyleConfig=({styles,validation,label})=>{var _styles$prefix,_styles$providesStyle;if(!styles)return;const base={label:!!label,validation:!!validation,prefix:(_styles$prefix=styles===null||styles===void 0?void 0:styles.prefix)!==null&&_styles$prefix!==void 0?_styles$prefix:'',providesStyleContext:(_styles$providesStyle=styles===null||styles===void 0?void 0:styles.providesStyleContext)!==null&&_styles$providesStyle!==void 0?_styles$providesStyle:false};if(!isConfigWithVariants(styles)){const{props={}}=styles!==null&&styles!==void 0?styles:{};return _objectSpread(_objectSpread({},base),{},{variants:{default:props}});}const{variants}=styles;return _objectSpread(_objectSpread({},base),{},{variants});};/* harmony default export */ const utils_getWidgetStyleConfig = (getWidgetStyleConfig);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/events/useEventCallbacks.tsx + 2 modules
var useEventCallbacks = __webpack_require__(238961);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ../frontend/src/components/BaseErrorBoundary.native-web.tsx
const BaseErrorBoundary=({boundaryName:_boundaryName,children})=>{return (0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children});};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/WidgetErrorBoundaryCompat.tsx
const InnerWidgetErrorBoundaryError=({errorMessage,onClickReload,shouldShowReloadButton})=>(0,jsx_runtime.jsxs)("div",{"data-testid":"Widgets::ErrorBoundary_div",children:[(0,jsx_runtime.jsxs)("code",{children:[" Error: ",errorMessage,"... "]}),shouldShowReloadButton&&(0,jsx_runtime.jsx)("button",{type:"button",onClick:onClickReload,children:"reload"})]});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/WidgetErrorBoundary.tsx
function WidgetErrorBoundary_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function WidgetErrorBoundary_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?WidgetErrorBoundary_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):WidgetErrorBoundary_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const useErrorBoundaryClientRateLimit=({maxClickCount=3})=>{const[reloadClickCount,setReloadClickCount]=(0,react.useState)(0);const handleClickReload=(0,react.useCallback)(resetError=>{setReloadClickCount(prev=>prev+1);resetError();},[setReloadClickCount]);const shouldAllowReload=reloadClickCount<maxClickCount;return{handleClickReload,shouldAllowReload};};const WidgetErrorBoundary=props=>{const{id:widgetId,largeScreen,editMode,fetching,namespace,position,widgetType,children}=props;const{handleClickReload,shouldAllowReload}=useErrorBoundaryClientRateLimit({});return (0,jsx_runtime.jsx)(BaseErrorBoundary,{boundaryName:widgetType!==null&&widgetType!==void 0?widgetType:'unknown',team:"@tryretool/building-ui-experience",fallback:({error,resetError})=>(0,jsx_runtime.jsx)(InnerWidgetErrorBoundaryError,{errorMessage:error.message.substring(0,160),onClickReload:()=>handleClickReload(resetError),shouldShowReloadButton:shouldAllowReload}),onBeforeCapture:(scope,_error,componentStack)=>{scope.setExtras({info:componentStack,editMode,fetching,largeScreen,namespace:namespace===null||namespace===void 0?void 0:namespace.getNamespace(),position:position===null||position===void 0?void 0:position.toJSON(),widgetId});scope.setLevel('fatal');scope.setTags({widget:widgetType});},children:children});};const withWidgetErrorBoundary=(widgetType,Widget)=>{const WithWidgetErrorBoundary=props=>(0,jsx_runtime.jsx)(WidgetErrorBoundary,WidgetErrorBoundary_objectSpread(WidgetErrorBoundary_objectSpread({},props),{},{widgetType:widgetType,children:(0,jsx_runtime.jsx)(Widget,WidgetErrorBoundary_objectSpread({},props))}));WithWidgetErrorBoundary.displayName=`WithWidgetErrorBoundary(${Widget.displayName||Widget.name||widgetType})`;return WithWidgetErrorBoundary;};
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/disable/DisabledByContainerContext.ts
var DisabledByContainerContext = __webpack_require__(301313);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/api/disable/useDisabledByContainer.ts
function useDisabledByContainer(){return (0,react.useContext)(DisabledByContainerContext["default"]);}
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/jsApi/widgetApiRef.ts
var widgetApiRef = __webpack_require__(820046);
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(140653);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/values/defaultValues.ts
var defaultValues = __webpack_require__(582824);
;// CONCATENATED MODULE: ../frontend/src/components/design-system/Label/constants.ts
const LABEL_WIDTH_UNITS=['%','px','col'];const DEFAULT_LABEL_WIDTH='33';const DEFAULT_INLINE_LABEL_WIDTH='100';const DEFAULT_LABEL_WIDTH_UNIT='%';
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/layoutConstants.ts
var layoutConstants = __webpack_require__(524314);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/defaultValues.ts
function defaultValues_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function defaultValues_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?defaultValues_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):defaultValues_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const defaultValueByPropertyDesktop={label:'Label',labelWidth:DEFAULT_LABEL_WIDTH,labelWidthUnit:DEFAULT_LABEL_WIDTH_UNIT,showBorder:true,showHeaderBorder:true,showFooterBorder:true,margin:layoutConstants.DEFAULT_MARGIN};const defaultValueByPropertyMobile=defaultValues_objectSpread(defaultValues_objectSpread({},defaultValueByPropertyDesktop),{},{showBorder:false});function getDefaultValues(config,{hasEvents=false,isMobile=false}){const defaultValueByProperty=isMobile?defaultValueByPropertyMobile:defaultValueByPropertyDesktop;return Object.entries(config).reduce((defaults,[key,type])=>{var _defaultValueByProper;defaults[key]=(_defaultValueByProper=defaultValueByProperty[key])!==null&&_defaultValueByProper!==void 0?_defaultValueByProper:(0,defaultValues.getDefaultValue)(type);return defaults;},defaultValues_objectSpread({},hasEvents?{events:immutable_es["default"].OrderedMap()}:{}));}
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/useModelValues.ts
var useModelValues = __webpack_require__(630382);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/useUpdateModel.ts + 1 modules
var useUpdateModel = __webpack_require__(514093);
// EXTERNAL MODULE: ../frontend/src/hostRuntime/index.ts + 8 modules
var hostRuntime = __webpack_require__(573375);
;// CONCATENATED MODULE: ../frontend/src/store/appModel/triggerPluginApi.ts
function triggerPluginApi({namespacedId,instance,method,paramsObject}){return()=>{return (0,hostRuntime.callHostRuntime)({method:'triggerApiCall',apiMethod:method,namespacedId,instance,paramsObject});};}
// EXTERNAL MODULE: ./src/store/mobileEditorSelector.ts
var mobileEditorSelector = __webpack_require__(354484);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(584235);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(351355);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(958453);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(832487);
// EXTERNAL MODULE: ./src/toolbox/Shimmer/index.tsx
var Shimmer = __webpack_require__(123226);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(151391);
;// CONCATENATED MODULE: ./src/components/design-system/FormFeedback.tsx
function FormFeedback_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function FormFeedback_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?FormFeedback_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):FormFeedback_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const styles=StyleSheet["default"].create({container:{minHeight:25.5,paddingTop:3,flexDirection:'row',alignItems:'center'},icon:{marginRight:3,height:14,width:14},feedback:{fontWeight:'500',fontSize:13,lineHeight:22}});const FormFeedback=({message,type='valid',loading=false})=>{const{iconName,color}=type==='valid'?{iconName:undefined,color:colors.grey}:type==='disabled'?{iconName:undefined,color:colors.disabledInputText}:{iconName:'bold/interface-alert-warning-circle-alternate',color:colors.errorRed};return loading?(0,jsx_runtime.jsx)(Box.Box,{display:"flex",mb:8,children:(0,jsx_runtime.jsx)(Shimmer.Shimmer,{height:22})}):(0,jsx_runtime.jsx)(View["default"],{style:styles.container,children:message?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[!!iconName&&(0,jsx_runtime.jsx)(View["default"],{style:styles.icon,children:(0,jsx_runtime.jsx)(Icon.Icon,{name:iconName,color:color,size:14})}),(0,jsx_runtime.jsx)(Text["default"],{style:FormFeedback_objectSpread(FormFeedback_objectSpread({},styles.feedback),{},{color}),children:message})]}):null});};/* harmony default export */ const design_system_FormFeedback = (FormFeedback);
// EXTERNAL MODULE: ./src/components/LayoutWrapper.tsx + 3 modules
var LayoutWrapper = __webpack_require__(112422);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx
function connectMobileWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function connectMobileWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?connectMobileWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):connectMobileWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const WidgetWrapper=({id,hidden,type,children,modelObj,style,onClick})=>{const isEditorDisplayMode=(0,es.useSelector)(mobileEditorSelector.isEditorDisplayModeSelector);const{padding,width,cornerType,widthGrowFactor,elevation,showBorder}=modelObj;const disableHidden=type.includes('RNCamera')||type.includes('RNScanner');const isHidden=hidden&&!disableHidden;return (0,jsx_runtime.jsx)(LayoutWrapper["default"],{cornerType:cornerType,elevation:elevation,padding:padding,width:width,widthGrowFactor:widthGrowFactor,showBorder:showBorder,type:type,isHidden:isHidden,isEditorDisplayMode:isEditorDisplayMode,pluginId:id,style:style,onClick:onClick,children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children})});};function connectWidget(type,Component,runtimeOptions,options,mapProps){var _runtimeOptions$event;const{events=[],template}=runtimeOptions;const plugin=plugins.PluginRepository[type];if(!plugin){throw new Error(`Widget '${type}' must be registered before it is connected.`);}const styles=utils_getWidgetStyleConfig({styles:options.styles,validation:runtimeOptions.validation,label:options.label});const defaults=getDefaultValues(template,{hasEvents:!!((_runtimeOptions$event=runtimeOptions.events)!==null&&_runtimeOptions$event!==void 0&&_runtimeOptions$event.length),isMobile:true});plugin.template=values=>(0,immutable.makeTypedMap)(defaults).merge(values);plugin.options=connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},plugin.options),options),runtimeOptions),{},{styles});const RetoolWidget=({id,instance,rgProps,namespace,fetching})=>{var _modelObj$hidden;const instanceCompat=instance==null?[]:[instance];const modelObj=(0,useModelValues["default"])({config:template,id,instance:instanceCompat});const updateModel=(0,useUpdateModel["default"])(id,instanceCompat);const disabledByContainer=useDisabledByContainer();const dispatch=(0,es.useDispatch)();const apiRef=(0,widgetApiRef.useWidgetApiRef)(id,instanceCompat);const callbacks=(0,useEventCallbacks["default"])(id,instanceCompat,events);const hidden=(_modelObj$hidden=modelObj.hidden)!==null&&_modelObj$hidden!==void 0?_modelObj$hidden:false;const style=modelObj.style;const errorMessage=runtimeOptions.validation&&!modelObj.hideValidationMessage?modelObj.validationMessage:undefined;const labelCaption=modelObj.labelCaption;const disabled=disabledByContainer||modelObj.disabled;const formFeedbackComponent=(0,react.useMemo)(()=>{if(errorMessage){return (0,jsx_runtime.jsx)(design_system_FormFeedback,{message:errorMessage,type:"invalid"});}else if(labelCaption){return (0,jsx_runtime.jsx)(design_system_FormFeedback,{message:labelCaption,type:disabled?'disabled':'valid'});}else{return null;}},[disabled,errorMessage,labelCaption]);const renderWrapper=(0,react.useCallback)(children=>{const onClick=(()=>{if(type==='RNContainerWidget'){var _modelObj$events$size,_modelObj$events;const numClickEvents=(_modelObj$events$size=(_modelObj$events=modelObj.events)===null||_modelObj$events===void 0?void 0:_modelObj$events.size)!==null&&_modelObj$events$size!==void 0?_modelObj$events$size:0;if(numClickEvents>0){return()=>{var _callbacks$onClick;(_callbacks$onClick=callbacks.onClick)===null||_callbacks$onClick===void 0?void 0:_callbacks$onClick.call(callbacks);};}}})();return (0,jsx_runtime.jsxs)(WidgetWrapper,{id:id,hidden:hidden,type:type,modelObj:modelObj,style:style,onClick:onClick,children:[children,formFeedbackComponent]},id);},[id,hidden,modelObj,style,formFeedbackComponent,callbacks]);const props=mapProps(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},modelObj),callbacks),{},{style,apiRef,id,updateModel,triggerApiCall:({method,paramsObject})=>{return dispatch(triggerPluginApi({namespacedId:id,instance:instanceCompat,method,paramsObject}));},instance,rgProps,fetching,renderWrapper,namespace,disabled}));const shouldRenderWrapper=!(type.includes('RNFab')||type.includes('RNIcon'));if(shouldRenderWrapper){return renderWrapper((0,jsx_runtime.jsx)(Component,connectMobileWidget_objectSpread({},props)));}else{return (0,jsx_runtime.jsx)(Component,connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},props),{},{renderWrapper:renderWrapper}));}};RetoolWidget.displayName=`${type}(${Component.displayName||Component.name||'Component'})`;return (0,react.memo)(withWidgetErrorBoundary(type,RetoolWidget),(lodash_default()).isEqual);}

/***/ })

}])
//# sourceMappingURL=3771.dad0addd.chunk.js.map