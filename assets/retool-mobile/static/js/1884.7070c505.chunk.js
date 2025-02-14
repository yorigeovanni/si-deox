(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[1884],{

/***/ 751884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  MobileHostRuntime: () => (/* binding */ MobileHostRuntime)
});

// EXTERNAL MODULE: ../frontend/src/hostRuntime/IframeHostRuntime.ts + 6 modules
var IframeHostRuntime = __webpack_require__(689125);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../frontend/src/common/utils/toasts.ts + 3 modules
var toasts = __webpack_require__(399087);
// EXTERNAL MODULE: ../frontend/src/store/appModel/jsApiUtils/alertUtils/alertRef.ts
var alertRef = __webpack_require__(950408);
;// CONCATENATED MODULE: ../frontend/src/hostRuntime/mobileHostFunctions/displayMessage.tsx
const displayMessage={displayWarning:({title,messageDuration,actionKey})=>{const durationMs=messageDuration?messageDuration*1000:undefined;(0,toasts.sendToast)({props:{title,durationMs,type:'warning',actionKey}});},displaySuccess:({title,messageDuration,actionKey})=>{const durationMs=messageDuration?messageDuration*1000:undefined;(0,toasts.sendToast)({props:{title,durationMs,type:'success',actionKey}});},displayError:({title,messageDuration,actionKey})=>{const durationMs=messageDuration?messageDuration*1000:undefined;(0,toasts.sendToast)({props:{title,durationMs,type:'error',actionKey}});},confirmWithMessage:({message},createCallCallback)=>{return new Promise(resolve=>{var _alertRef$current;(_alertRef$current=alertRef.alertRef.current)===null||_alertRef$current===void 0?void 0:_alertRef$current.show({title:'',subtitle:message,primary:{label:'OK',onPress:()=>{const callbackPromise=createCallCallback({callbackName:'onConfirm',callbackArgs:[]});resolve();return callbackPromise;}},secondary:{label:'Cancel',onPress:()=>{createCallCallback({callbackName:'onCancel',callbackArgs:[]});return resolve();}}});});}};/* harmony default export */ const mobileHostFunctions_displayMessage = (displayMessage);
// EXTERNAL MODULE: ../frontend/src/hostRuntime/hostFunctions/sharedJsApis.ts + 48 modules
var sharedJsApis = __webpack_require__(561195);
;// CONCATENATED MODULE: ../frontend/src/hostRuntime/mobileHostFunctions/jsApis.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const jsApi=_objectSpread({},sharedJsApis.jsApi);
// EXTERNAL MODULE: ../packages/mobile/nfc/index.ts + 1 modules
var nfc = __webpack_require__(743418);
;// CONCATENATED MODULE: ../frontend/src/hostRuntime/mobileHostFunctions/nfcMethods.ts
const nfcMethods={nfcRead(){return nfc.NFCStrategySingleton.read();},nfcWrite({text}){return nfc.NFCStrategySingleton.write(text!==null&&text!==void 0?text:'');}};
// EXTERNAL MODULE: ../frontend/src/hostRuntime/sharedCreateMethodConfig.ts + 22 modules
var sharedCreateMethodConfig = __webpack_require__(606034);
;// CONCATENATED MODULE: ../frontend/src/hostRuntime/mobileCreateMethodConfig.ts
function mobileCreateMethodConfig_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function mobileCreateMethodConfig_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?mobileCreateMethodConfig_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):mobileCreateMethodConfig_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const createMethodConfig=()=>mobileCreateMethodConfig_objectSpread(mobileCreateMethodConfig_objectSpread(mobileCreateMethodConfig_objectSpread(mobileCreateMethodConfig_objectSpread({},(0,sharedCreateMethodConfig.createMethodConfig)()),mobileHostFunctions_displayMessage),jsApi),nfcMethods);
;// CONCATENATED MODULE: ../frontend/src/hostRuntime/MobileHostRuntime.ts
class MobileHostRuntime extends IframeHostRuntime.IframeHostRuntime{constructor(){super(createMethodConfig);}}

/***/ })

}])
//# sourceMappingURL=1884.7070c505.chunk.js.map