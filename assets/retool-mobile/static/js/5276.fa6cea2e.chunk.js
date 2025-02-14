(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[5276],{

/***/ 807037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIconColor: () => (/* binding */ useIconColor)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
/* harmony import */ var _packages_common_utils_colorUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(780099);
const useIconColor=(textColor,disabled=false)=>{return (0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{return disabled?(0,_packages_common_utils_colorUtils__WEBPACK_IMPORTED_MODULE_1__.withDisabledWash)(textColor):textColor;},[textColor,disabled]);};

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

/***/ 555276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ProGloveWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(828256);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ProGlove/options.ts
const options={styles:{prefix:'proglove',props:{text:{defaultValue:'#EFEFF0'},background:{defaultValue:'primary'}}}};/* harmony default export */ const ProGlove_options = (options);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
// EXTERNAL MODULE: ../frontend/src/components/plugins/mobile/commonStyles/layout.ts
var layout = __webpack_require__(600962);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ProGlove/template.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const template = (_objectSpread({data:'unknown?',scannerState:['DISCONNECTED','CONNECTED','CONNECTING'],buttonText:'string',buttonSize:['small','large'],iconAfter:'icon',iconBefore:'icon',disabled:'boolean',global:'boolean'},layout.widthTemplate));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ProGlove/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNProGloveWidget',name:'ProGlove',template: template,events:['capture'],refMethods:['pair','disconnect','sendFeedback'],api:({ref})=>({disconnect:{metadata:{label:'Disconnect',description:'Disconnects the proglove'},method:async()=>{if(ref){const reader=ref;reader===null||reader===void 0?void 0:reader.disconnect();}}},pair:{metadata:{label:'Pair',description:'Triggers the intent pairing mechanism of the proglove'},method:async()=>{if(ref){const reader=ref;reader===null||reader===void 0?void 0:reader.pair();}}},sendFeedback:{metadata:{label:'Send Feedback',description:`Sends a feedback signal to the proglove, corresponds to the IDs in the [Proglove Docs](https://docs.proglove.com/en/worker-feedback---sdk-intent-api.html#trigger-feedback-using-intent).`,params:[{type:'plainText',name:'id',props:{label:'Feedback',defaultValue:undefined,validator:'number'}}],returnType:'void'},method:async i=>{if(ref){const reader=ref;reader===null||reader===void 0?void 0:reader.sendFeedback(i);}}}})}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(949699);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../frontend/src/common/hooks/useStableRef.ts
var useStableRef = __webpack_require__(893105);
// EXTERNAL MODULE: ../frontend/src/components/plugins/mobile/utils/useIconColor.ts
var useIconColor = __webpack_require__(807037);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/styleConfig/index.ts
var styleConfig = __webpack_require__(91025);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ProGlove/styleConfig.ts
const styleConfig_styleConfig=(0,styleConfig["default"])('proglove',{text:{type:'color',color:'#EFEFF0'},background:{type:'defaultColor',defaultValue:'primary'}});/* harmony default export */ const ProGlove_styleConfig = (styleConfig_styleConfig);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/hooks/useStyles.ts + 34 modules
var useStyles = __webpack_require__(379671);
// EXTERNAL MODULE: ./src/hooks/useIsCurrentAppScreenActive.ts
var useIsCurrentAppScreenActive = __webpack_require__(808662);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(832487);
;// CONCATENATED MODULE: ./src/utilities/proglove/proglove.ts
const maybeStart=()=>{return{initialScannerStatePromise:new Promise(()=>{}),subscriptions:[]};};const onReceiveBarcode=()=>{return()=>{};};const onProgloveScannerStateChange=()=>{return()=>{};};const sendFeedback=()=>{};const initPairing=()=>{};const disconnect=()=>{};
// EXTERNAL MODULE: ./src/utilities/theme.ts
var utilities_theme = __webpack_require__(135758);
// EXTERNAL MODULE: ./src/components/design-system/Button.tsx
var Button = __webpack_require__(681198);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/ProGlove/ProGlove.tsx
const useMemoryRef=value=>{const memory=(0,react.useRef)(value);(0,react.useEffect)(()=>{memory.current=value;},[value]);return memory;};const ProGloveComponent=(0,react.forwardRef)(function ProGloveComponent(props,ref){var _theme$borderRadius;const{id,style,disabled,iconAfter,iconBefore,buttonText,buttonSize,fetching=false,onCapture,onScannerStateUpdate,scannerState,global}=props;useInitializeProglove(ref,{id,onCapture,onScannerStateUpdate,global});const theme=(0,react.useContext)(utilities_theme["default"]);const runtimeStyles=(0,react.useMemo)(()=>{var _style$toObject;return(_style$toObject=style===null||style===void 0?void 0:style.toObject())!==null&&_style$toObject!==void 0?_style$toObject:{};},[style]);const{hydratedProps}=(0,useStyles["default"])({config:ProGlove_styleConfig,styles:{text:runtimeStyles.text,background:runtimeStyles.background}});const{backgroundColor,textColor}=(()=>{const{text,background}=hydratedProps!==null&&hydratedProps!==void 0?hydratedProps:{};return{backgroundColor:background,textColor:text};})();const iconColor=(0,useIconColor.useIconColor)(textColor,disabled);const borderRadius=(_theme$borderRadius=theme.borderRadius)!==null&&_theme$borderRadius!==void 0?_theme$borderRadius:6;const handlePairing=(0,react.useCallback)(()=>{initPairing();},[]);const handlePress=(0,react.useCallback)(()=>{handlePairing();},[handlePairing]);return (0,jsx_runtime.jsx)(Button["default"],{textColor:textColor,disabled:disabled||scannerState==='CONNECTED',title:buttonText,leftElement:iconBefore?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconBefore,color:iconColor}):null,rightElement:iconAfter?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconAfter,color:iconColor}):null,backgroundColor:backgroundColor,size:buttonSize,onPress:handlePress,loading:fetching,borderRadius:borderRadius});});const useInitializeProglove=(ref,{onCapture,onScannerStateUpdate,global})=>{(0,react.useImperativeHandle)(ref,()=>({sendFeedback:sendFeedback,disconnect:disconnect,pair:initPairing}));const isCurrentAppScreenActive=(0,useIsCurrentAppScreenActive["default"])();const listeningForEvents=useMemoryRef(global||isCurrentAppScreenActive);const stableOnCapture=(0,useStableRef["default"])(onCapture);const stableOnScannerStateUpdate=(0,useStableRef["default"])(onScannerStateUpdate);(0,react.useEffect)(()=>{const{subscriptions,initialScannerStatePromise}=maybeStart();const unsubscribeBarcode=onReceiveBarcode(intent=>{if(listeningForEvents.current){var _stableOnCapture$curr;(_stableOnCapture$curr=stableOnCapture.current)===null||_stableOnCapture$curr===void 0?void 0:_stableOnCapture$curr.call(stableOnCapture,intent);}});const unsubscribeScannerState=onProgloveScannerStateChange(scannerState=>{if(listeningForEvents.current){var _stableOnScannerState;(_stableOnScannerState=stableOnScannerStateUpdate.current)===null||_stableOnScannerState===void 0?void 0:_stableOnScannerState.call(stableOnScannerStateUpdate,scannerState);}});initialScannerStatePromise.then(scannerStateResult=>{if(scannerStateResult){onScannerStateUpdate===null||onScannerStateUpdate===void 0?void 0:onScannerStateUpdate(scannerStateResult);}return null;}).catch(error=>{console.error('Error getting initial scanner state',error);});return()=>{subscriptions.forEach(subscription=>subscription.remove());unsubscribeBarcode();unsubscribeScannerState();};},[stableOnCapture,listeningForEvents]);};/* harmony default export */ const ProGlove = (ProGloveComponent);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/ProGlove/ProGloveWidget.tsx
const _excluded=["updateModel","onCapture","apiRef"];function ProGloveWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function ProGloveWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ProGloveWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ProGloveWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const ProGloveWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,ProGlove,widgetRuntimeOptions,ProGlove_options,_ref=>{let{updateModel,onCapture,apiRef}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return ProGloveWidget_objectSpread(ProGloveWidget_objectSpread({},rest),{},{ref:apiRef,onCapture(intent){updateModel({data:intent});onCapture===null||onCapture===void 0?void 0:onCapture();},onScannerStateUpdate(status){updateModel({scannerState:status.scannerState});}});}));

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

/***/ }),

/***/ 808662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _getActiveAppScreen: () => (/* binding */ _getActiveAppScreen),
/* harmony export */   _getCurrentAppScreen: () => (/* binding */ _getCurrentAppScreen),
/* harmony export */   "default": () => (/* binding */ useIsCurrentAppScreenActive)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
/* harmony import */ var _react_navigation_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(985830);
/* harmony import */ var _useParentNavigationState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(213489);
function _getActiveAppScreen(parentNavigationState){if(parentNavigationState.length!==1&&parentNavigationState.length!==3){return null;}const[outerStackNavigationState]=parentNavigationState;const activeOuterStackScreen=(()=>{for(let i=outerStackNavigationState.index;i>0;i--){const candidateScreen=outerStackNavigationState.routes[i];if(candidateScreen.name==='App'||candidateScreen.name==='ModalScreen'){return candidateScreen;}}return outerStackNavigationState.routes[0];})();if(parentNavigationState.length===1){if(activeOuterStackScreen.name==='ModalScreen'){return activeOuterStackScreen.params.screen;}return null;}const[,tabsNavigationState,innerStackNavigationState]=parentNavigationState;const activeTabScreen=tabsNavigationState.routes[tabsNavigationState.index];const activeInnerStackScreen=innerStackNavigationState.routes[innerStackNavigationState.index];if(activeOuterStackScreen.name==='ModalScreen'){return activeOuterStackScreen.params.screen;}if(innerStackNavigationState.routes.length===1){return activeTabScreen.params.screen;}return activeInnerStackScreen.params.screen;}function _useActiveAppScreen(){const parentNavigationState=(0,_useParentNavigationState__WEBPACK_IMPORTED_MODULE_2__["default"])();return (0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{return _getActiveAppScreen(parentNavigationState);},[parentNavigationState]);}function useIsCurrentAppScreenActive(){const activeAppScreen=_useActiveAppScreen();const currentRoute=(0,_react_navigation_core__WEBPACK_IMPORTED_MODULE_1__.useRoute)();const currentAppScreen=_getCurrentAppScreen(currentRoute);return currentAppScreen===activeAppScreen;}function _getCurrentAppScreen(currentRoute){if(currentRoute.name==='RegularScreen'||currentRoute.name==='ModalScreen'){var _currentRoute$params;const screenId=(_currentRoute$params=currentRoute.params)===null||_currentRoute$params===void 0?void 0:_currentRoute$params.screen;if(!screenId){throw new Error('Could not identify current screen.');}return screenId;}throw new Error('Could not identify current screen.');}

/***/ })

}])
//# sourceMappingURL=5276.fa6cea2e.chunk.js.map