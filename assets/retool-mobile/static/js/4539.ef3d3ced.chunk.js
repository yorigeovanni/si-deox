(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[4539],{

/***/ 301313:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 552194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RNFlatListCompat: () => (/* binding */ RNFlatListCompat)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(682409);
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(818414);
/* harmony import */ var react_native_web_dist_exports_FlatList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(232995);
/* harmony import */ var _frontend_src_common_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(957163);
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(102658);
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const _RNFlatListCompat=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function RNFlatListCompat(props,ref){var _props$data$length,_props$data;const key=((_props$data$length=(_props$data=props.data)===null||_props$data===void 0?void 0:_props$data.length)!==null&&_props$data$length!==void 0?_props$data$length:0)===0?'empty':'nonempty';return (0,_retool_builder_retool_development_mobile_node_modules_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_native_web_dist_exports_FlatList__WEBPACK_IMPORTED_MODULE_4__["default"],_objectSpread({ref:ref},props),key);});const RNFlatListCompat=_frontend_src_common_platform__WEBPACK_IMPORTED_MODULE_2__.PLATFORM==='web'?_RNFlatListCompat:react_native_web_dist_exports_FlatList__WEBPACK_IMPORTED_MODULE_4__["default"];

/***/ }),

/***/ 824539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SelectWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(828256);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
// EXTERNAL MODULE: ../packages/common/plugins/widgets/v2/api/values/commonTemplates.ts
var commonTemplates = __webpack_require__(526159);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Select/template.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const template = (_objectSpread(_objectSpread({},commonTemplates.formFieldTemplate),{},{label:'string',labelCaption:'string',labels:'string[]',value:'primitive',values:'string[]',placeholder:'string',disabled:'boolean',allowDeselect:'boolean',allowCustomValue:'boolean'}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Select/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNSelectWidget',name:'Select',template: template,events:['change'],validation:true,formFieldType:'mobile'}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(949699);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var lodash = __webpack_require__(578105);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(958453);
// EXTERNAL MODULE: ./src/toolbox/SearchableSelect/index.tsx + 4 modules
var SearchableSelect = __webpack_require__(502146);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(584235);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(351355);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TouchableOpacity/index.js
var TouchableOpacity = __webpack_require__(901226);
// EXTERNAL MODULE: ./src/localization/index.ts + 5 modules
var localization = __webpack_require__(37651);
// EXTERNAL MODULE: ./src/toolbox/ActionSheet/ActionSheet.tsx
var ActionSheet = __webpack_require__(860973);
;// CONCATENATED MODULE: ./src/toolbox/ActionSheet/index.tsx

// EXTERNAL MODULE: ./src/toolbox/ActionSheet/ActionSheetItem.tsx
var ActionSheetItem = __webpack_require__(354958);
// EXTERNAL MODULE: ./src/toolbox/colors/palette.ts
var palette = __webpack_require__(291720);
// EXTERNAL MODULE: ./src/toolbox/common/hitSlop.ts
var hitSlop = __webpack_require__(978237);
// EXTERNAL MODULE: ./src/toolbox/Icon/index.tsx
var Icon = __webpack_require__(721152);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/toolbox/Select/Select.tsx
const styles=StyleSheet["default"].create({container:{flexDirection:'row',padding:12,borderRadius:8,alignItems:'center'},label:{flex:1,fontSize:17}});const _Select=(props,ref)=>{var _options$find;const{value,options:_options,onChange,backgroundColor=palette.Color.gray150,textColor=palette.Color.gray900,disabled=false,allowDeselect=false,placeholder='',testId}=props;const[isActionSheetVisible,setIsActionSheetVisible]=(0,react.useState)(false);const label=(_options$find=_options.find(option=>option.value===value))===null||_options$find===void 0?void 0:_options$find.label;const deselectOption=(0,react.useMemo)(()=>allowDeselect?[{label:(0,localization.localizedString)('—'),value:null,color:palette.Color.gray700}]:[],[allowDeselect]);const options=(0,react.useMemo)(()=>[..._options,...deselectOption],[_options,deselectOption]);return (0,jsx_runtime.jsxs)(View["default"],{children:[(0,jsx_runtime.jsxs)(TouchableOpacity["default"],{hitSlop:hitSlop.hitSlop,style:[styles.container,{backgroundColor}],disabled:disabled,accessibilityLabel:"select",onPress:()=>setIsActionSheetVisible(true),ref:ref,testID:testId,children:[(0,jsx_runtime.jsx)(Text["default"],{numberOfLines:1,ellipsizeMode:"tail",style:[styles.label,{color:label?textColor:palette.Color.gray500}],children:label!==null&&label!==void 0?label:placeholder}),(0,jsx_runtime.jsx)(Icon.Icon,{name:"bold/chevron-down",color:palette.Color.alwaysBlack,size:24})]}),(0,jsx_runtime.jsx)(ActionSheet.ActionSheet,{visible:isActionSheetVisible,onClose:()=>setIsActionSheetVisible(false),onChange:onChange,options:options,value:value,type:ActionSheetItem.ActionSheetItemType.Radio})]});};_Select.displayName='Select';const Select=(0,react.forwardRef)(_Select);
;// CONCATENATED MODULE: ./src/toolbox/Select/index.tsx

// EXTERNAL MODULE: ./src/toolbox/Shimmer/index.tsx
var Shimmer = __webpack_require__(123226);
// EXTERNAL MODULE: ./src/components/design-system/Label.tsx
var Label = __webpack_require__(768876);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Select/Select.tsx
const Select_Select=({value='',values=[],labels=[],fetching=false,label,placeholder,disabled,required,onChange,id,allowDeselect,allowCustomValue})=>{const options=(0,react.useMemo)(()=>{const sanitizedLabels=labels.length===0?values:labels;return (0,lodash.zipWith)(values,sanitizedLabels,(value,label)=>({label,value}));},[values,labels]);const searchableValue=(0,react.useMemo)(()=>value?[value]:[],[value]);const onSelectChange=(0,react.useCallback)(newValue=>{onChange===null||onChange===void 0?void 0:onChange(newValue);},[onChange]);const onSearchableSelectChange=(0,react.useCallback)(newValue=>{if(newValue.length===0){onChange===null||onChange===void 0?void 0:onChange('');}else{onChange===null||onChange===void 0?void 0:onChange(newValue[0]);}},[onChange]);const selectComponent=values.length>10||allowCustomValue?(0,jsx_runtime.jsx)(SearchableSelect.SearchableSelect,{testId:id,onChange:onSearchableSelectChange,value:searchableValue,options:options,title:label,disabled:disabled,allowDeselect:allowDeselect,allowCustomValue:allowCustomValue,placeholder:placeholder,allowMultiple:false}):(0,jsx_runtime.jsx)(Select,{testId:id,onChange:onSelectChange,placeholder:placeholder,options:options,value:value,allowDeselect:allowDeselect,disabled:disabled});return (0,jsx_runtime.jsxs)(View["default"],{children:[label?(0,jsx_runtime.jsx)(Box.Box,{display:"flex",direction:"row",children:(0,jsx_runtime.jsx)(Label["default"],{title:label,loading:fetching,disabled:disabled,required:required})}):null,fetching?(0,jsx_runtime.jsx)(Shimmer.Shimmer,{height:48}):selectComponent]});};/* harmony default export */ const widgets_Select_Select = (Select_Select);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Select/SelectWidget.tsx
const _excluded=["onChange","updateModel"];function SelectWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function SelectWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?SelectWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):SelectWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const SelectWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,widgets_Select_Select,widgetRuntimeOptions,{},_ref=>{let{onChange,updateModel}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return SelectWidget_objectSpread(SelectWidget_objectSpread({},rest),{},{onChange:value=>{updateModel({value});onChange===null||onChange===void 0?void 0:onChange();}});}));

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

/***/ 502146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  SearchableSelect: () => (/* reexport */ SearchableSelect)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/SafeAreaView/index.js
var SafeAreaView = __webpack_require__(324825);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(584235);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(351355);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TouchableOpacity/index.js
var TouchableOpacity = __webpack_require__(901226);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
// EXTERNAL MODULE: ../frontend/src/common/hooks/useMountEffect.ts
var useMountEffect = __webpack_require__(216677);
// EXTERNAL MODULE: ../frontend/src/common/hooks/useUnmountEffect.ts
var useUnmountEffect = __webpack_require__(776370);
// EXTERNAL MODULE: ../frontend/src/common/platform.ts + 1 modules
var platform = __webpack_require__(957163);
// EXTERNAL MODULE: ./src/components/RNFlatListCompat.tsx
var RNFlatListCompat = __webpack_require__(552194);
// EXTERNAL MODULE: ./src/localization/index.ts + 5 modules
var localization = __webpack_require__(37651);
// EXTERNAL MODULE: ./src/toolbox/ActionSheet/ActionSheetItem.tsx
var ActionSheetItem = __webpack_require__(354958);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(958453);
// EXTERNAL MODULE: ./src/toolbox/colors/palette.ts
var palette = __webpack_require__(291720);
// EXTERNAL MODULE: ./src/toolbox/common/hitSlop.ts
var hitSlop = __webpack_require__(978237);
// EXTERNAL MODULE: ./src/toolbox/Icon/index.tsx
var Icon = __webpack_require__(721152);
// EXTERNAL MODULE: ./src/toolbox/IconButton/index.tsx
var IconButton = __webpack_require__(491672);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TextInput/index.js
var TextInput = __webpack_require__(302927);
// EXTERNAL MODULE: ./src/toolbox/Shimmer/index.tsx
var Shimmer = __webpack_require__(123226);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(151391);
// EXTERNAL MODULE: ./src/toolbox/Typography/constants.ts
var constants = __webpack_require__(771197);
;// CONCATENATED MODULE: ./src/toolbox/Input/constants.ts
const InputSizes=['small','large'];const SIZE_STYLES_OVERRIDE_MAP={large:{height:50,fontSize:constants.TypographyStyles['Body/Large'].size,fontWeight:constants.TypographyStyles['Body/Large'].weight.size,lineHeight:22},small:{height:40,fontSize:constants.TypographyStyles['Body/Medium'].size,fontWeight:constants.TypographyStyles['Body/Medium'].weight.size,lineHeight:19}};
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/toolbox/Input/Input.tsx
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const styles=StyleSheet["default"].create({container:{flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:8,gap:12,paddingHorizontal:12},input:{display:'flex',flex:1,alignSelf:'stretch',fontStyle:'normal',minWidth:platform.PLATFORM==='web'?0:undefined},errorBorder:{borderWidth:2,borderColor:palette.Color.textCritical,borderRadius:8}});const _Input=(props,ref)=>{const{disabled=false,onChange,onSubmit,placeholder,value,onRightElementPress,onFocus,onBlur,leftElement,rightElement,backgroundColor=palette.Color.backgroundContainerEmphasis,returnKeyType='next',keyboardType='default',secureTextEntry=false,size='large',textAlign='left',loading=false,accessibilityLabel='input',autoFocus,autoCapitalize,autoCorrect,autoComplete,textContentType,testId,showError=false}=props;const{height,fontSize,fontWeight,lineHeight}=SIZE_STYLES_OVERRIDE_MAP[size];const inputStyle=(0,react.useMemo)(()=>{const color=disabled?palette.Color.textDisabled:palette.Color.gray900;const verticalPadding=(height-fontSize*2)/2;const vars=[styles.input,_objectSpread({color,textAlign,fontSize,fontWeight,lineHeight,paddingVertical:verticalPadding},platform.PLATFORM==='web'?{outline:'none'}:{})].filter(v=>!!v);return StyleSheet["default"].flatten(vars);},[disabled,fontSize,fontWeight,height,lineHeight,textAlign]);const containerStyle=(0,react.useMemo)(()=>{const vars=[styles.container,_objectSpread({height,backgroundColor},showError&&styles.errorBorder)].filter(v=>!!v);return StyleSheet["default"].flatten(vars);},[backgroundColor,height,showError]);if(loading){return (0,jsx_runtime.jsx)(Shimmer.Shimmer,{height:height});}return (0,jsx_runtime.jsxs)(View["default"],{accessibilityHint:"inputContainer",style:containerStyle,children:[leftElement&&(0,jsx_runtime.jsx)(View["default"],{children:leftElement}),(0,jsx_runtime.jsx)(TextInput["default"],{editable:!disabled,secureTextEntry:secureTextEntry,style:inputStyle,accessibilityLabel:accessibilityLabel,keyboardType:keyboardType,onChangeText:onChange,onSubmitEditing:onSubmit,placeholder:placeholder,placeholderTextColor:colors.placeholderTextGrey,ref:ref,returnKeyType:returnKeyType,value:value,onFocus:onFocus,onBlur:onBlur,autoFocus:autoFocus,autoCapitalize:autoCapitalize,autoCorrect:autoCorrect,autoComplete:autoComplete,textContentType:textContentType,testID:testId,numberOfLines:1}),rightElement&&(0,jsx_runtime.jsx)(TouchableOpacity["default"],{disabled:disabled,onPress:onRightElementPress,children:rightElement})]});};_Input.displayName='Input';const Input=(0,react.forwardRef)(_Input);
;// CONCATENATED MODULE: ./src/toolbox/Input/index.tsx

// EXTERNAL MODULE: ./src/toolbox/Modal/index.tsx + 4 modules
var Modal = __webpack_require__(424930);
// EXTERNAL MODULE: ./src/toolbox/Typography/index.tsx + 1 modules
var Typography = __webpack_require__(33898);
;// CONCATENATED MODULE: ./src/toolbox/SearchableSelect/SearchableSelect.tsx
function SearchableSelect_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function SearchableSelect_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?SearchableSelect_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):SearchableSelect_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const SearchableSelect_styles=StyleSheet["default"].create({container:{flexDirection:'row',padding:12,borderRadius:8,alignItems:'center'},label:{flex:1,fontSize:17},list:{flex:1,paddingHorizontal:8,overflow:'scroll'},modal:{flex:1,backgroundColor:palette.Color.alwaysWhite},closeIcon:{backgroundColor:palette.Color.gray100},closeText:{backgroundColor:palette.Color.gray100,paddingHorizontal:12,paddingVertical:8,borderRadius:8}});const SelectModal=props=>{const{title='',value,options,onChange,allowDeselect=false,allowCustomValue=false,allowMultiple=false,setIsModalVisible,isModalVisible,onDismiss,onShow}=props;const[selectedValues,setSelectedValues]=(0,react.useState)(value);const[searchTerm,setSearchTerm]=(0,react.useState)('');const filteredOptions=options.filter(option=>{var _option$label;return(_option$label=option.label)===null||_option$label===void 0?void 0:_option$label.toLowerCase().includes(searchTerm===null||searchTerm===void 0?void 0:searchTerm.toLowerCase());});const deselectOption=(0,react.useMemo)(()=>allowDeselect?[{label:(0,localization.localizedString)('—'),value:null,color:palette.Color.gray700}]:[],[allowDeselect]);const customOption=(0,react.useMemo)(()=>{const validValues=options.map(option=>option.value);const customValue=selectedValues.find(_value=>!validValues.includes(_value));if(allowCustomValue&&customValue){return[{label:customValue,value:customValue,color:palette.Color.gray700}];}return[];},[allowCustomValue,options,selectedValues]);const allOptions=(0,react.useMemo)(()=>[...customOption,...deselectOption,...filteredOptions],[customOption,deselectOption,filteredOptions]);const onHide=(0,react.useCallback)(()=>{if(allowMultiple){onChange(selectedValues);}setSearchTerm('');setIsModalVisible(false);},[allowMultiple,onChange,selectedValues,setIsModalVisible]);(0,useMountEffect["default"])(()=>{onShow===null||onShow===void 0?void 0:onShow();});(0,useUnmountEffect["default"])(()=>{onDismiss===null||onDismiss===void 0?void 0:onDismiss();});const handlePress=(0,react.useCallback)(newValue=>{let updateValue=selectedValues;if(newValue===null){updateValue=[];}else if(!selectedValues.includes(newValue)){updateValue=allowMultiple?[...selectedValues,newValue]:[newValue];}else if(allowDeselect||allowMultiple){updateValue=selectedValues.filter(v=>v!==newValue);}setSelectedValues(updateValue);if(!allowMultiple){onChange(updateValue);onHide();}},[selectedValues,allowDeselect,allowMultiple,onChange,onHide]);const renderSelectOption=(0,react.useCallback)(({item,index})=>{var _item$value;return (0,jsx_runtime.jsx)(ActionSheetItem.ActionSheetItem,{checked:selectedValues.includes((_item$value=item===null||item===void 0?void 0:item.value)!==null&&_item$value!==void 0?_item$value:''),label:item.label,value:item.value,onPress:handlePress},index);},[handlePress,selectedValues]);const footerComponent=(0,react.useMemo)(()=>{if(allowCustomValue&&filteredOptions.length===0){return (0,jsx_runtime.jsx)(ActionSheetItem.ActionSheetItem,{label:(0,localization.localizedString)("Create '${searchTerm}'",{searchTerm}),value:searchTerm,onPress:handlePress,color:palette.Color.blue600});}else if(filteredOptions.length===0){return (0,jsx_runtime.jsx)(Box.Box,{display:"flex",alignItems:"center",p:12,children:(0,jsx_runtime.jsx)(Typography.Typography,{type:"Body/Medium",color:palette.Color.gray500,children:(0,localization.localizedString)('No results found')})});}},[allowCustomValue,filteredOptions.length,handlePress,searchTerm]);const keyExtractor=(0,react.useCallback)(item=>{var _item$value2;return(_item$value2=item.value)!==null&&_item$value2!==void 0?_item$value2:item.label;},[]);const CloseElement=allowMultiple?(0,jsx_runtime.jsx)(TouchableOpacity["default"],{onPress:onHide,style:SearchableSelect_styles.closeText,accessibilityLabel:"Done",children:(0,jsx_runtime.jsx)(Typography.Typography,{type:"Body/Medium",color:palette.Color.gray800,children:(0,localization.localizedString)('Done')})}):(0,jsx_runtime.jsx)(IconButton.IconButton,{onPress:onHide,iconName:"antd/close",size:"medium",accessibilityLabel:"close",type:"subtle",className:SearchableSelect_styles.closeIcon});return (0,jsx_runtime.jsx)(Modal.Modal,{animationType:"slide",transparent:true,visible:isModalVisible,onRequestClose:onHide,children:(0,jsx_runtime.jsx)(SafeAreaView["default"],{style:SearchableSelect_styles.modal,children:(0,jsx_runtime.jsxs)(Box.Box,{display:"flex",flex:1,gap:16,mt:12,children:[(0,jsx_runtime.jsxs)(Box.Box,{display:"flex",px:12,gap:16,direction:"row",justifyContent:"space-between",alignItems:"flex-end",children:[(0,jsx_runtime.jsx)(Box.Box,{display:"flex",flex:1,children:(0,jsx_runtime.jsx)(Typography.Typography,{type:"Heading/Large",color:palette.Color.gray900,numberOfLines:1,ellipsizeMode:"tail",children:title})}),CloseElement]}),(0,jsx_runtime.jsx)(Box.Box,{display:"flex",px:12,children:(0,jsx_runtime.jsx)(Input,{accessibilityLabel:"SearchableSelectInput",size:"small",value:searchTerm,onChange:setSearchTerm,placeholder:"Search",leftElement:(0,jsx_runtime.jsx)(Icon.Icon,{name:"line/interface-search",color:palette.Color.gray500,size:16}),onRightElementPress:()=>{setSearchTerm('');},rightElement:(0,jsx_runtime.jsx)(Icon.Icon,{name:"line/interface-delete-circle",color:palette.Color.gray500,size:16})})}),(0,jsx_runtime.jsx)(RNFlatListCompat.RNFlatListCompat,{renderItem:renderSelectOption,data:allOptions,keyExtractor:keyExtractor,initialNumToRender:platform.PLATFORM==='web'?allOptions.length:20,ListFooterComponent:footerComponent,style:SearchableSelect_styles.list})]})})});};const _SearchableSelect=(props,ref)=>{const{value,options,backgroundColor=palette.Color.gray150,disabled=false,placeholder='',testId}=props;const[isModalVisible,setIsModalVisible]=(0,react.useState)(false);const selectedOptions=(0,react.useMemo)(()=>options.filter(option=>{var _option$value;return value.includes((_option$value=option===null||option===void 0?void 0:option.value)!==null&&_option$value!==void 0?_option$value:'');}),[options,value]);const selectedLabel=(0,react.useMemo)(()=>selectedOptions.length>0?selectedOptions.map(option=>option.label).join(', '):value.length>0?value.join(', '):null,[selectedOptions,value]);const onShow=(0,react.useCallback)(()=>{setIsModalVisible(true);},[]);const outterContainerStyle=(0,react.useMemo)(()=>[SearchableSelect_styles.container,{backgroundColor}],[backgroundColor]);const textStyle=(0,react.useMemo)(()=>[SearchableSelect_styles.label,{color:selectedLabel?palette.Color.gray900:palette.Color.gray500}],[selectedLabel]);return (0,jsx_runtime.jsxs)(View["default"],{children:[(0,jsx_runtime.jsxs)(TouchableOpacity["default"],{hitSlop:hitSlop.hitSlop,style:outterContainerStyle,disabled:disabled,accessibilityLabel:"SearchableSelect",onPress:onShow,ref:ref,testID:testId,children:[(0,jsx_runtime.jsx)(Text["default"],{numberOfLines:1,ellipsizeMode:"tail",style:textStyle,children:selectedLabel?selectedLabel:placeholder}),(0,jsx_runtime.jsx)(Icon.Icon,{name:"bold/chevron-down",size:24})]}),isModalVisible&&(0,jsx_runtime.jsx)(SelectModal,SearchableSelect_objectSpread(SearchableSelect_objectSpread({},props),{},{isModalVisible:isModalVisible,setIsModalVisible:setIsModalVisible}))]});};_SearchableSelect.displayName='SearchableSelect';const SearchableSelect=(0,react.forwardRef)(_SearchableSelect);
;// CONCATENATED MODULE: ./src/toolbox/SearchableSelect/index.tsx


/***/ })

}])
//# sourceMappingURL=4539.ef3d3ced.chunk.js.map