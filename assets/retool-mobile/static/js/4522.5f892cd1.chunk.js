(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[4522],{

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

/***/ 535653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Button_Button)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../frontend/src/components/plugins/mobile/utils/useIconColor.ts
var useIconColor = __webpack_require__(807037);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/styleConfig/index.ts
var styleConfig = __webpack_require__(91025);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Button/styleConfig.ts
const styleConfig_styleConfig=(0,styleConfig["default"])('button',{background:{type:'defaultColor',defaultValue:'primary'},secondaryBackground:{type:'color',color:'white'},text:{type:'contrastText',context:'background'},secondaryText:{type:'contrastText',context:'secondaryBackground'}});/* harmony default export */ const Button_styleConfig = (styleConfig_styleConfig);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/hooks/useStyles.ts + 34 modules
var useStyles = __webpack_require__(379671);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(832487);
// EXTERNAL MODULE: ./src/utilities/theme.ts
var utilities_theme = __webpack_require__(135758);
// EXTERNAL MODULE: ./src/components/design-system/Button.tsx
var Button = __webpack_require__(681198);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Button/Button.tsx
const ButtonComponent=({style,title,onPress,size,disabled,iconAfter,iconBefore,type='primary',fetching=false,loading=false})=>{var _theme$borderRadius;const theme=(0,react.useContext)(utilities_theme["default"]);const runtimeStyles=(0,react.useMemo)(()=>{var _style$toObject;return(_style$toObject=style===null||style===void 0?void 0:style.toObject())!==null&&_style$toObject!==void 0?_style$toObject:{};},[style]);const{hydratedProps}=(0,useStyles["default"])({config:Button_styleConfig,styles:{text:runtimeStyles.text,background:runtimeStyles.background,secondaryText:runtimeStyles.secondaryText,secondaryBackground:runtimeStyles.secondaryBackground}});const{backgroundColor,primaryBackgroundColor,textColor}=(()=>{const{text,background,secondaryText,secondaryBackground}=hydratedProps!==null&&hydratedProps!==void 0?hydratedProps:{};return{backgroundColor:type==='primary'?background:secondaryBackground,primaryBackgroundColor:background,textColor:type==='primary'?text:secondaryText};})();const iconColor=(0,useIconColor.useIconColor)(textColor,disabled);const borderRadius=(_theme$borderRadius=theme.borderRadius)!==null&&_theme$borderRadius!==void 0?_theme$borderRadius:6;const borderColor=primaryBackgroundColor;return (0,jsx_runtime.jsx)(Button["default"],{backgroundColor:backgroundColor,disabled:disabled,textColor:textColor,onPress:onPress,size:size,title:title,leftElement:iconBefore?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconBefore,color:iconColor}):null,rightElement:iconAfter?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconAfter,color:iconColor}):null,borderColor:borderColor,borderWidth:1,fetching:fetching,loading:loading,borderRadius:borderRadius,accessibilityLabel:title,testID:`ButtonWidget-${title}`});};/* harmony default export */ const Button_Button = (ButtonComponent);

/***/ }),

/***/ 804522:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ListItemWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(828256);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ListItem/options.ts
const options={styles:{prefix:'button',props:{label:{defaultValue:'textAuto',contrast:'background'},background:{defaultValue:'primary'}}}};/* harmony default export */ const ListItem_options = (options);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ListItem/template.ts
/* harmony default export */ const template = ({title:'string',subtitle:'string',body:'string',prefixComponentType:'string',prefixIcon:'icon',prefixImageSource:'string',prefixImageSize:'string',prefixImageStyle:'string',suffixComponentType:'string',suffixText:'string',suffixIcon:'icon',value:'primitive'});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/ListItem/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNListItemWidget',events:['press','change','suffixButtonPress'],name:'ListItem',template: template}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(949699);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Image/index.js + 2 modules
var Image = __webpack_require__(583573);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Switch/index.js + 1 modules
var Switch = __webpack_require__(905100);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TouchableOpacity/index.js
var TouchableOpacity = __webpack_require__(901226);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(958453);
// EXTERNAL MODULE: ./src/toolbox/Checkbox/index.tsx + 1 modules
var Checkbox = __webpack_require__(465200);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(832487);
// EXTERNAL MODULE: ./src/components/design-system/Text.tsx
var Text = __webpack_require__(442381);
// EXTERNAL MODULE: ./src/components/plugins/widgets/Button/Button.tsx + 1 modules
var Button = __webpack_require__(535653);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/ListItem/ListItem.tsx
const DEFAULT_SOURCE={uri:'data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAQAAAAAAAAAAAAAAAAAAAAAA8J8HasaIBWRZAAAAAElFTkSuQmCC'};const ListItem=({title,subtitle,body,prefixComponentType,prefixIcon,prefixImageSource,prefixImageSize,prefixImageStyle,suffixComponentType,suffixText,suffixIcon,onSuffixButtonPress,onChange,onPress,style,value=''})=>{const CachedImage=react.useMemo(()=>{const _getBorderRadius=()=>{switch(prefixImageStyle){case'circle':return 100;case'round':return 9;default:return 0;}};const _getSize=()=>{switch(prefixImageSize){case'small':return 40;case'large':return 64;default:return 64;}};return (0,jsx_runtime.jsx)(Image["default"],{style:{width:_getSize(),height:_getSize(),borderRadius:_getBorderRadius()},source:{uri:prefixImageSource},resizeMode:"contain",defaultSource:DEFAULT_SOURCE},prefixImageSource);},[prefixImageSource,prefixImageSize,prefixImageStyle]);const CachedContent=react.useMemo(()=>{return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[prefixComponentType!=='none'&&(0,jsx_runtime.jsxs)(Box.Box,{display:"flex",pr:8,justifyContent:"center",children:[prefixComponentType==='image'?CachedImage:null,prefixComponentType==='icon'?(0,jsx_runtime.jsx)(Icon.Icon,{name:prefixIcon}):null,prefixComponentType==='checkbox'?(0,jsx_runtime.jsx)(Checkbox.Checkbox,{value:value,onChange:isSelected=>{onChange===null||onChange===void 0?void 0:onChange(isSelected);}}):null]}),(0,jsx_runtime.jsxs)(Box.Box,{display:"flex",pr:8,justifyContent:"center",flex:1,children:[title?(0,jsx_runtime.jsx)(Text["default"],{size:"h4",value:title}):null,subtitle?(0,jsx_runtime.jsx)(Text["default"],{size:"medium",value:subtitle}):null,body?(0,jsx_runtime.jsx)(Text["default"],{size:"medium",value:body}):null]}),suffixComponentType!=='none'&&(0,jsx_runtime.jsx)(Box.Box,{display:"flex",justifyContent:"center",children:(0,jsx_runtime.jsxs)(Box.Box,{display:"flex",direction:"row",alignItems:"center",children:[suffixComponentType==='text'||suffixComponentType==='text+icon'?(0,jsx_runtime.jsx)(Text["default"],{value:suffixText}):null,suffixComponentType==='icon'||suffixComponentType==='text+icon'?(0,jsx_runtime.jsx)(Icon.Icon,{name:suffixIcon}):null,suffixComponentType==='button'?(0,jsx_runtime.jsx)(Button["default"],{style:style,title:suffixText,size:"small",onPress:()=>onSuffixButtonPress===null||onSuffixButtonPress===void 0?void 0:onSuffixButtonPress()}):null,suffixComponentType==='switch'?(0,jsx_runtime.jsx)(Switch["default"],{value:value,onValueChange:value=>{onChange===null||onChange===void 0?void 0:onChange(value);}}):null]})})]});},[title,subtitle,body,prefixComponentType,prefixIcon,suffixComponentType,suffixText,suffixIcon,onSuffixButtonPress,onChange,style,value,CachedImage]);return (0,jsx_runtime.jsx)(TouchableOpacity["default"],{onPress:onPress,children:(0,jsx_runtime.jsx)(Box.Box,{display:"flex",direction:"row",p:8,children:CachedContent})});};/* harmony default export */ const ListItem_ListItem = (ListItem);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/ListItem/ListItemWidget.tsx
const _excluded=["onChange","updateModel","onSuffixButtonPress","prefixComponentType","prefixImageSize","prefixImageStyle","suffixComponentType"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const ListItemWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,ListItem_ListItem,widgetRuntimeOptions,ListItem_options,_ref=>{let{onChange,updateModel,onSuffixButtonPress,prefixComponentType,prefixImageSize,prefixImageStyle,suffixComponentType}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return _objectSpread(_objectSpread({},rest),{},{prefixComponentType,prefixImageSize,prefixImageStyle,suffixComponentType,onSuffixButtonPress,onChange(value){updateModel({value});onChange();}});}));

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
//# sourceMappingURL=4522.5f892cd1.chunk.js.map