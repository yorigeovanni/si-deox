(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[2793],{

/***/ 922793:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _registerViewerMobileWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(712224);
(0,_registerViewerMobileWidget__WEBPACK_IMPORTED_MODULE_0__["default"])({type:'RNImageWidget',widgetLoader:()=>__webpack_require__.e(/* import() */ 4227).then(__webpack_require__.bind(__webpack_require__, 194227))});

/***/ }),

/***/ 712224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ widgets_registerViewerMobileWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(351355);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ../frontend/src/components/AsyncComponent/asyncCompat.native.tsx
const ErrorComponent=({error})=>(0,jsx_runtime.jsx)(Text["default"],{children:error.message});const InnerLoadingComponent=()=>(0,jsx_runtime.jsx)(View["default"],{});
;// CONCATENATED MODULE: ../frontend/src/components/AsyncComponent/async.tsx
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const LoadingComponent=()=>{const[show,setShow]=(0,react.useState)(!!false);(0,react.useEffect)(()=>{const timeout=setTimeout(()=>setShow(true),300);return()=>{clearTimeout(timeout);};},[]);if(!show){return (0,jsx_runtime.jsx)(jsx_runtime.Fragment,{});}return (0,jsx_runtime.jsx)(InnerLoadingComponent,{});};function nativeAsyncComponent(config){const Shows=react.lazy(config.resolve);const SuspenseLoadingComponent=config.LoadingComponent||LoadingComponent;const component=(0,react.forwardRef)(function AsyncComponent(props,ref){return (0,jsx_runtime.jsx)(react.Suspense,{fallback:(0,jsx_runtime.jsx)(SuspenseLoadingComponent,_objectSpread({},props)),children:(0,jsx_runtime.jsx)(Shows,_objectSpread(_objectSpread({},props),{},{ref:ref}))});});component.displayName='NativeAsyncComponent';return component;}
// EXTERNAL MODULE: ../frontend/src/components/plugins/index.ts + 1 modules
var plugins = __webpack_require__(313667);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/api/register/registerWidget.ts
const registerWidget=({type,widgetLoader,presetsLoader,formsPresetsLoader,formsEditorsLoader,editorsLoader,docsLoader,customComponentLibraryUuid,searchConfigLoader})=>{var _PluginRepository$typ,_PluginRepository$typ2;plugins.registeredWidgetTypes.add(type);const wrappedEditorsLoader=editorsLoader?()=>editorsLoader().then(config=>'default'in config?config.default:config):undefined;const wrappedFormsEditorsLoader=formsEditorsLoader?()=>formsEditorsLoader().then(config=>'default'in config?config.default:config):undefined;const wrappedSearchConfigLoader=searchConfigLoader?async()=>{const config=await searchConfigLoader();return config;}:undefined;plugins.PluginRepository[type]={plugin:nativeAsyncComponent({resolve:widgetLoader}),loader:widgetLoader,editors:wrappedEditorsLoader,formsEditors:wrappedFormsEditorsLoader,searchConfig:wrappedSearchConfigLoader,options:{presetsLoader,formsPresetsLoader,docsLoader},migrations:(_PluginRepository$typ=(_PluginRepository$typ2=plugins.PluginRepository[type])===null||_PluginRepository$typ2===void 0?void 0:_PluginRepository$typ2.migrations)!==null&&_PluginRepository$typ!==void 0?_PluginRepository$typ:[],customComponentLibraryUuid};plugins.ExamplePlugins[type]={plugin:nativeAsyncComponent({resolve:widgetLoader}),options:{docsLoader}};};const unregisterWidget=({type})=>{var _PluginRepository$typ3,_PluginRepository$typ4;const migrations=(_PluginRepository$typ3=(_PluginRepository$typ4=plugins.PluginRepository[type])===null||_PluginRepository$typ4===void 0?void 0:_PluginRepository$typ4.migrations)!==null&&_PluginRepository$typ3!==void 0?_PluginRepository$typ3:[];if(migrations.length>0){plugins.PluginRepository[type]={migrations};}else{delete plugins.PluginRepository[type];}delete plugins.ExamplePlugins[type];plugins.registeredWidgetTypes.delete(type);};/* harmony default export */ const register_registerWidget = (registerWidget);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/registerViewerMobileWidget.ts
const registerViewerMobileWidget=({type,widgetLoader})=>{register_registerWidget({type,widgetLoader,docsLoader:()=>{return Promise.reject(new Error('Cannot call docsLoader when using registerViewerMobileWidget.'));},presetsLoader:()=>{return Promise.reject(new Error('Cannot call presetsLoader when using registerViewerMobileWidget.'));}});};/* harmony default export */ const widgets_registerViewerMobileWidget = (registerViewerMobileWidget);

/***/ })

}])
//# sourceMappingURL=2793.be8177e9.chunk.js.map