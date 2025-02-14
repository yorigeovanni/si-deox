(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[6075],{

/***/ 981178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(985707);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 5256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _valueType_cast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(444367);
const pluralChars=count=>`${count} character${count===1?'':'s'}`;const validateStringLength=(model,options)=>{const{hideMessage=false,valueKey='value'}=options!==null&&options!==void 0?options:{};const value=(0,_valueType_cast__WEBPACK_IMPORTED_MODULE_0__.toString)(model[valueKey]);const minLength=(0,_valueType_cast__WEBPACK_IMPORTED_MODULE_0__.toNumber)(model.minLength);const maxLength=(0,_valueType_cast__WEBPACK_IMPORTED_MODULE_0__.toNumber)(model.maxLength);if(minLength&&minLength===maxLength&&value.length!==minLength){return hideMessage||`Must be exactly ${pluralChars(minLength)}.`;}if(minLength&&value.length<minLength){return hideMessage||`Must be at least ${pluralChars(minLength)}.`;}if(maxLength&&value.length>maxLength){return hideMessage||`Must be no more than ${pluralChars(maxLength)}.`;}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateStringLength);

/***/ }),

/***/ 306075:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ TextAreaWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(421565);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TextArea/options.ts
const options={disableAutoEditors:['adornments']};/* harmony default export */ const TextArea_options = (options);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(730223);
// EXTERNAL MODULE: ../packages/common/plugins/widgets/v2/api/values/commonTemplates.ts
var commonTemplates = __webpack_require__(974888);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TextArea/template.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const template = (_objectSpread(_objectSpread({},commonTemplates.formFieldTemplate),{},{autoCapitalize:['none','sentences','words','characters'],autoResize:'boolean',disabled:'boolean',iconAfter:'icon',iconBefore:'icon',maxLength:'number?',maxLines:'number?',minLength:'number?',minLines:'number?',pattern:'string',patternType:['','email','url','regex'],placeholder:'string',value:'string',label:'string',labelCaption:'string'}));
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/validation/validatePatterns.ts + 1 modules
var validatePatterns = __webpack_require__(707019);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/validation/validateStringLength.ts
var validateStringLength = __webpack_require__(5256);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TextArea/validator.ts
const validator=model=>{const lengthError=(0,validateStringLength["default"])(model);if(lengthError)return lengthError;return (0,validatePatterns["default"])(model);};/* harmony default export */ const TextArea_validator = (validator);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TextArea/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNTextAreaWidget',events:['submit','change','focus','blur','suffixIconPress'],name:'TextArea',formFieldType:'mobile',template: template,validation:{customFields:['patternType','pattern','minLength','minLines','maxLength','maxLines'],customValidator:TextArea_validator}}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(360062);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(312220);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(240664);
// EXTERNAL MODULE: ./src/components/design-system/Input.tsx
var Input = __webpack_require__(775095);
// EXTERNAL MODULE: ./src/components/design-system/Label.tsx
var Label = __webpack_require__(82881);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(460648);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TextInput/index.js
var TextInput = __webpack_require__(740968);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(130486);
// EXTERNAL MODULE: ../frontend/src/common/platform.ts + 1 modules
var platform = __webpack_require__(555522);
// EXTERNAL MODULE: ./src/toolbox/Shimmer/index.tsx
var Shimmer = __webpack_require__(509039);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ./src/components/design-system/MultilineInput.tsx
function MultilineInput_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function MultilineInput_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?MultilineInput_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):MultilineInput_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const styles=StyleSheet["default"].create({container:{flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:8},input:{flex:1,alignSelf:'stretch',paddingHorizontal:12,fontStyle:'normal',fontWeight:'400',fontSize:17,lineHeight:22,minWidth:platform.PLATFORM==='web'?0:undefined},leftElementContainer:{paddingLeft:12},rightElementContainer:{padding:12}});const MultilineInput=({disabled,inputRef,onChange,onSubmit,placeholder,value,onFocus,onBlur,backgroundColor=colors.secondary,returnKeyType=null,keyboardType='default',secureTextEntry=false,size='large',autogrow=false,minLines=1,maxLines=Number.MAX_SAFE_INTEGER,previousContentHeight=0,updatePreviousContentHeight,loading=false,autoFocus,autoCapitalize,testID,error=false})=>{const errorBorderWidth=2;const smallPadding=8;const largePadding=12;const verticalPadding=size==='small'?smallPadding:largePadding;const lineHeight=22;const heightForLineCount=(0,react.useCallback)(lineCount=>{lineCount=lineCount>1?lineCount:1;const externalPadding=errorBorderWidth*2;return 2*verticalPadding+lineHeight*lineCount+externalPadding;},[verticalPadding,errorBorderWidth]);const defaultLines=Math.max(minLines,1);const defaultHeight=heightForLineCount(defaultLines);const maxHeight=heightForLineCount(maxLines);const[height,setHeight]=(0,react.useState)(defaultHeight);const[currentContentHeight,setCurrentContentHeight]=(0,react.useState)(previousContentHeight);const[currentMinLines,setCurrentMinLines]=(0,react.useState)(minLines);const[currentMaxLines,setCurrentMaxLines]=(0,react.useState)(maxLines);const[isEmpty,setIsEmpty]=(0,react.useState)(!value&&previousContentHeight===0);const _onChangeText=text=>{setIsEmpty(text===''||text==null);onChange===null||onChange===void 0?void 0:onChange(text);};const onContentSizeChange=e=>{let contentHeight=platform.PLATFORM==='web'?e.nativeEvent.contentSize.height:2*verticalPadding+e.nativeEvent.contentSize.height;if(isEmpty){contentHeight=defaultHeight;}if(autogrow){const minHeight=Math.max(contentHeight,defaultHeight);let desiredHeight=minHeight;if(maxLines&&maxLines>=minLines){desiredHeight=Math.min(minHeight,maxHeight);}if(height!==desiredHeight)setHeight(desiredHeight);}setCurrentContentHeight(contentHeight);};const errorBorder={borderWidth:errorBorderWidth,borderColor:error?colors.errorRed:'transparent',borderRadius:6};const textColor=disabled?colors.disabledInputText:colors.gray900;if(returnKeyType==null){returnKeyType=platform.PLATFORM==='android'?'none':'default';}(0,react.useEffect)(()=>{if(autogrow){if(minLines!==currentMinLines){const newMinHeight=heightForLineCount(minLines);if(height<newMinHeight){setHeight(newMinHeight);}setCurrentMinLines(minLines);}if(maxLines!==currentMaxLines){if(maxLines>=minLines){const newMaxHeight=heightForLineCount(maxLines);if(height>newMaxHeight){setHeight(newMaxHeight);}}setCurrentMaxLines(maxLines);}const hasMaxHeight=maxLines&&maxLines>0;const shouldGrowForContent=currentContentHeight=>{if(height<maxHeight||!hasMaxHeight){return currentContentHeight-height>=lineHeight;}return false;};const shouldShrinkForContent=currentContentHeight=>{if(height>defaultHeight){return height-currentContentHeight>=lineHeight;}return false;};if(shouldGrowForContent(currentContentHeight)){if(hasMaxHeight){setHeight(Math.min(currentContentHeight,maxHeight));}else{setHeight(currentContentHeight);}}else if(shouldShrinkForContent(currentContentHeight)){setHeight(Math.max(currentContentHeight,defaultHeight));}updatePreviousContentHeight===null||updatePreviousContentHeight===void 0?void 0:updatePreviousContentHeight(currentContentHeight);}else if(height!==defaultHeight){setHeight(defaultHeight);}},[defaultHeight,height,minLines,currentMinLines,maxLines,currentMaxLines,maxHeight,currentContentHeight,updatePreviousContentHeight,setHeight,autogrow,heightForLineCount]);return loading?(0,jsx_runtime.jsx)(Shimmer.Shimmer,{height:height}):(0,jsx_runtime.jsx)(View["default"],{accessibilityHint:"inputContainer",style:[styles.container,MultilineInput_objectSpread({backgroundColor},platform.PLATFORM==='web'&&{height}),errorBorder],children:(0,jsx_runtime.jsx)(TextInput["default"],{multiline:true,textAlignVertical:"top",numberOfLines:minLines,editable:!disabled,secureTextEntry:secureTextEntry,style:[styles.input,MultilineInput_objectSpread(MultilineInput_objectSpread(MultilineInput_objectSpread(MultilineInput_objectSpread({color:textColor,paddingTop:verticalPadding},platform.PLATFORM!=='android'&&{paddingBottom:verticalPadding}),platform.PLATFORM==='web'&&{outline:'none'}),platform.PLATFORM!=='web'&&autogrow&&{height:'auto',maxHeight}),platform.PLATFORM==='ios'&&{minHeight:height})],keyboardType:keyboardType,onChangeText:_onChangeText,onSubmitEditing:onSubmit,onContentSizeChange:onContentSizeChange,placeholder:`${placeholder}`,placeholderTextColor:colors.placeholderTextGrey,ref:inputRef,returnKeyType:returnKeyType,value:`${value}`,onFocus:onFocus,onBlur:onBlur,autoFocus:autoFocus,autoCapitalize:autoCapitalize,testID:testID})});};/* harmony default export */ const design_system_MultilineInput = (MultilineInput);
// EXTERNAL MODULE: ./src/components/plugins/widgets/utils/useFocusNextWidget.ts
var useFocusNextWidget = __webpack_require__(462269);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/TextArea/TextArea.tsx
const TextArea=({disabled,iconAfter,iconBefore,id,inputRef,label,onChange,onSubmit,onFocus,onBlur,onSuffixIconPress,placeholder,autoResize,minLines,maxLines,value,fetching=false,required,hideValidationMessage=false,validationMessage,autoCapitalize,instance})=>{const iconColor=disabled?colors.disabledInputText:colors.gray900;const domId=instance&&instance>=0?`${id}--${instance}`:id;const focusNextWidget=(0,useFocusNextWidget.useFocusNextWidget)(domId);const errorMessage=hideValidationMessage?undefined:validationMessage;const defaultLineCount=autoResize?1:4;const[childContentHeight,setChildContentHeight]=(0,react.useState)(0);const updatePreviousContentHeight=(0,react.useCallback)(height=>{setChildContentHeight(height);},[setChildContentHeight]);return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[label?(0,jsx_runtime.jsx)(Label["default"],{title:label,loading:fetching,disabled:disabled,required:required}):null,minLines&&minLines>1||autoResize?(0,jsx_runtime.jsx)(design_system_MultilineInput,{disabled:disabled,minLines:minLines!==null&&minLines!==void 0?minLines:defaultLineCount,maxLines:maxLines!==null&&maxLines!==void 0?maxLines:undefined,previousContentHeight:childContentHeight,updatePreviousContentHeight:updatePreviousContentHeight,autogrow:autoResize,keyboardType:"default",onChange:onChange,placeholder:`${placeholder}`,inputRef:inputRef,value:value,onSubmit:()=>{onSubmit===null||onSubmit===void 0?void 0:onSubmit();},onFocus:onFocus,onBlur:onBlur,loading:fetching,error:!!errorMessage,autoCapitalize:autoCapitalize}):(0,jsx_runtime.jsx)(Input["default"],{disabled:disabled,keyboardType:"default",onChange:onChange,placeholder:`${placeholder}`,inputRef:inputRef,returnKeyType:"next",value:value,onSubmit:()=>{onSubmit===null||onSubmit===void 0?void 0:onSubmit();focusNextWidget();},onFocus:onFocus,onBlur:onBlur,leftElement:iconBefore?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconBefore,color:iconColor}):null,rightElement:iconAfter?(0,jsx_runtime.jsx)(Icon.Icon,{name:iconAfter,color:iconColor}):null,onRightElementPress:onSuffixIconPress,loading:fetching,error:!!errorMessage,autoCapitalize:autoCapitalize})]});};/* harmony default export */ const TextArea_TextArea = (TextArea);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/TextArea/TextAreaWidget.tsx
const _excluded=["apiRef","onChange","updateModel"];function TextAreaWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function TextAreaWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?TextAreaWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):TextAreaWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const TextAreaWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,TextArea_TextArea,widgetRuntimeOptions,TextArea_options,_ref=>{let{apiRef,onChange,updateModel}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return TextAreaWidget_objectSpread(TextAreaWidget_objectSpread({},rest),{},{inputRef:apiRef,onChange(value){updateModel({value});onChange();}});}));

/***/ }),

/***/ 360062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ connectWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-redux@7.2.4_react-dom@18.3.1_react@18.3.1__react-native@0.74.3_@babel+core@7.24.9_@babe_az4c6i5siqhukmd7qezh6vzqeq/node_modules/react-redux/es/index.js + 19 modules
var es = __webpack_require__(66612);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var lodash = __webpack_require__(410642);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);
// EXTERNAL MODULE: ../packages/common/immutable.ts
var immutable = __webpack_require__(789572);
// EXTERNAL MODULE: ../frontend/src/components/plugins/index.ts + 1 modules
var plugins = __webpack_require__(720908);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/utils/getWidgetStyleConfig.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const isConfigWithVariants=config=>!!config&&'variants'in config;const getWidgetStyleConfig=({styles,validation,label})=>{var _styles$prefix,_styles$providesStyle;if(!styles)return;const base={label:!!label,validation:!!validation,prefix:(_styles$prefix=styles===null||styles===void 0?void 0:styles.prefix)!==null&&_styles$prefix!==void 0?_styles$prefix:'',providesStyleContext:(_styles$providesStyle=styles===null||styles===void 0?void 0:styles.providesStyleContext)!==null&&_styles$providesStyle!==void 0?_styles$providesStyle:false};if(!isConfigWithVariants(styles)){const{props={}}=styles!==null&&styles!==void 0?styles:{};return _objectSpread(_objectSpread({},base),{},{variants:{default:props}});}const{variants}=styles;return _objectSpread(_objectSpread({},base),{},{variants});};/* harmony default export */ const utils_getWidgetStyleConfig = (getWidgetStyleConfig);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/events/useEventCallbacks.tsx + 2 modules
var useEventCallbacks = __webpack_require__(746968);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ../frontend/src/components/BaseErrorBoundary.native-web.tsx
const BaseErrorBoundary=({boundaryName:_boundaryName,children})=>{return (0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children});};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/WidgetErrorBoundaryCompat.tsx
const InnerWidgetErrorBoundaryError=({errorMessage,onClickReload,shouldShowReloadButton})=>(0,jsx_runtime.jsxs)("div",{"data-testid":"Widgets::ErrorBoundary_div",children:[(0,jsx_runtime.jsxs)("code",{children:[" Error: ",errorMessage,"... "]}),shouldShowReloadButton&&(0,jsx_runtime.jsx)("button",{type:"button",onClick:onClickReload,children:"reload"})]});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/WidgetErrorBoundary.tsx
function WidgetErrorBoundary_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function WidgetErrorBoundary_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?WidgetErrorBoundary_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):WidgetErrorBoundary_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const useErrorBoundaryClientRateLimit=({maxClickCount=3})=>{const[reloadClickCount,setReloadClickCount]=(0,react.useState)(0);const handleClickReload=(0,react.useCallback)(resetError=>{setReloadClickCount(prev=>prev+1);resetError();},[setReloadClickCount]);const shouldAllowReload=reloadClickCount<maxClickCount;return{handleClickReload,shouldAllowReload};};const WidgetErrorBoundary=props=>{const{id:widgetId,largeScreen,editMode,fetching,namespace,position,widgetType,children}=props;const{handleClickReload,shouldAllowReload}=useErrorBoundaryClientRateLimit({});return (0,jsx_runtime.jsx)(BaseErrorBoundary,{boundaryName:widgetType!==null&&widgetType!==void 0?widgetType:'unknown',team:"@tryretool/building-ui-experience",fallback:({error,resetError})=>(0,jsx_runtime.jsx)(InnerWidgetErrorBoundaryError,{errorMessage:error.message.substring(0,160),onClickReload:()=>handleClickReload(resetError),shouldShowReloadButton:shouldAllowReload}),onBeforeCapture:(scope,_error,componentStack)=>{scope.setExtras({info:componentStack,editMode,fetching,largeScreen,namespace:namespace===null||namespace===void 0?void 0:namespace.getNamespace(),position:position===null||position===void 0?void 0:position.toJSON(),widgetId});scope.setLevel('fatal');scope.setTags({widget:widgetType});},children:children});};const withWidgetErrorBoundary=(widgetType,Widget)=>{const WithWidgetErrorBoundary=props=>(0,jsx_runtime.jsx)(WidgetErrorBoundary,WidgetErrorBoundary_objectSpread(WidgetErrorBoundary_objectSpread({},props),{},{widgetType:widgetType,children:(0,jsx_runtime.jsx)(Widget,WidgetErrorBoundary_objectSpread({},props))}));WithWidgetErrorBoundary.displayName=`WithWidgetErrorBoundary(${Widget.displayName||Widget.name||widgetType})`;return WithWidgetErrorBoundary;};
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/disable/DisabledByContainerContext.ts
var DisabledByContainerContext = __webpack_require__(981178);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/api/disable/useDisabledByContainer.ts
function useDisabledByContainer(){return (0,react.useContext)(DisabledByContainerContext["default"]);}
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/jsApi/widgetApiRef.ts
var widgetApiRef = __webpack_require__(664075);
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(883006);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/values/defaultValues.ts
var defaultValues = __webpack_require__(670757);
;// CONCATENATED MODULE: ../frontend/src/components/design-system/Label/constants.ts
const LABEL_WIDTH_UNITS=['%','px','col'];const DEFAULT_LABEL_WIDTH='33';const DEFAULT_INLINE_LABEL_WIDTH='100';const DEFAULT_LABEL_WIDTH_UNIT='%';
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/layoutConstants.ts
var layoutConstants = __webpack_require__(849967);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/defaultValues.ts
function defaultValues_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function defaultValues_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?defaultValues_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):defaultValues_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const defaultValueByPropertyDesktop={label:'Label',labelWidth:DEFAULT_LABEL_WIDTH,labelWidthUnit:DEFAULT_LABEL_WIDTH_UNIT,showBorder:true,showHeaderBorder:true,showFooterBorder:true,margin:layoutConstants.DEFAULT_MARGIN};const defaultValueByPropertyMobile=defaultValues_objectSpread(defaultValues_objectSpread({},defaultValueByPropertyDesktop),{},{showBorder:false});function getDefaultValues(config,{hasEvents=false,isMobile=false}){const defaultValueByProperty=isMobile?defaultValueByPropertyMobile:defaultValueByPropertyDesktop;return Object.entries(config).reduce((defaults,[key,type])=>{var _defaultValueByProper;defaults[key]=(_defaultValueByProper=defaultValueByProperty[key])!==null&&_defaultValueByProper!==void 0?_defaultValueByProper:(0,defaultValues.getDefaultValue)(type);return defaults;},defaultValues_objectSpread({},hasEvents?{events:immutable_es["default"].OrderedMap()}:{}));}
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/useModelValues.ts
var useModelValues = __webpack_require__(241387);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/values/useUpdateModel.ts + 1 modules
var useUpdateModel = __webpack_require__(684313);
// EXTERNAL MODULE: ../frontend/src/hostRuntime/index.ts + 8 modules
var hostRuntime = __webpack_require__(997375);
;// CONCATENATED MODULE: ../frontend/src/store/appModel/triggerPluginApi.ts
function triggerPluginApi({namespacedId,instance,method,paramsObject}){return()=>{return (0,hostRuntime.callHostRuntime)({method:'triggerApiCall',apiMethod:method,namespacedId,instance,paramsObject});};}
// EXTERNAL MODULE: ./src/store/mobileEditorSelector.ts
var mobileEditorSelector = __webpack_require__(762729);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(460648);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(219740);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(130486);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(6814);
// EXTERNAL MODULE: ./src/toolbox/Icon/Icon.tsx + 3683 modules
var Icon = __webpack_require__(312220);
// EXTERNAL MODULE: ./src/toolbox/Shimmer/index.tsx
var Shimmer = __webpack_require__(509039);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(240664);
;// CONCATENATED MODULE: ./src/components/design-system/FormFeedback.tsx
function FormFeedback_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function FormFeedback_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?FormFeedback_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):FormFeedback_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const styles=StyleSheet["default"].create({container:{minHeight:25.5,paddingTop:3,flexDirection:'row',alignItems:'center'},icon:{marginRight:3,height:14,width:14},feedback:{fontWeight:'500',fontSize:13,lineHeight:22}});const FormFeedback=({message,type='valid',loading=false})=>{const{iconName,color}=type==='valid'?{iconName:undefined,color:colors.grey}:type==='disabled'?{iconName:undefined,color:colors.disabledInputText}:{iconName:'bold/interface-alert-warning-circle-alternate',color:colors.errorRed};return loading?(0,jsx_runtime.jsx)(Box.Box,{display:"flex",mb:8,children:(0,jsx_runtime.jsx)(Shimmer.Shimmer,{height:22})}):(0,jsx_runtime.jsx)(View["default"],{style:styles.container,children:message?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[!!iconName&&(0,jsx_runtime.jsx)(View["default"],{style:styles.icon,children:(0,jsx_runtime.jsx)(Icon.Icon,{name:iconName,color:color,size:14})}),(0,jsx_runtime.jsx)(Text["default"],{style:FormFeedback_objectSpread(FormFeedback_objectSpread({},styles.feedback),{},{color}),children:message})]}):null});};/* harmony default export */ const design_system_FormFeedback = (FormFeedback);
// EXTERNAL MODULE: ./src/components/LayoutWrapper.tsx + 3 modules
var LayoutWrapper = __webpack_require__(11412);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx
function connectMobileWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function connectMobileWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?connectMobileWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):connectMobileWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const WidgetWrapper=({id,hidden,type,children,modelObj,style,onClick})=>{const isEditorDisplayMode=(0,es.useSelector)(mobileEditorSelector.isEditorDisplayModeSelector);const{padding,width,cornerType,widthGrowFactor,elevation,showBorder}=modelObj;const disableHidden=type.includes('RNCamera')||type.includes('RNScanner');const isHidden=hidden&&!disableHidden;return (0,jsx_runtime.jsx)(LayoutWrapper["default"],{cornerType:cornerType,elevation:elevation,padding:padding,width:width,widthGrowFactor:widthGrowFactor,showBorder:showBorder,type:type,isHidden:isHidden,isEditorDisplayMode:isEditorDisplayMode,pluginId:id,style:style,onClick:onClick,children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:children})});};function connectWidget(type,Component,runtimeOptions,options,mapProps){var _runtimeOptions$event;const{events=[],template}=runtimeOptions;const plugin=plugins.PluginRepository[type];if(!plugin){throw new Error(`Widget '${type}' must be registered before it is connected.`);}const styles=utils_getWidgetStyleConfig({styles:options.styles,validation:runtimeOptions.validation,label:options.label});const defaults=getDefaultValues(template,{hasEvents:!!((_runtimeOptions$event=runtimeOptions.events)!==null&&_runtimeOptions$event!==void 0&&_runtimeOptions$event.length),isMobile:true});plugin.template=values=>(0,immutable.makeTypedMap)(defaults).merge(values);plugin.options=connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},plugin.options),options),runtimeOptions),{},{styles});const RetoolWidget=({id,instance,rgProps,namespace,fetching})=>{var _modelObj$hidden;const instanceCompat=instance==null?[]:[instance];const modelObj=(0,useModelValues["default"])({config:template,id,instance:instanceCompat});const updateModel=(0,useUpdateModel["default"])(id,instanceCompat);const disabledByContainer=useDisabledByContainer();const dispatch=(0,es.useDispatch)();const apiRef=(0,widgetApiRef.useWidgetApiRef)(id,instanceCompat);const callbacks=(0,useEventCallbacks["default"])(id,instanceCompat,events);const hidden=(_modelObj$hidden=modelObj.hidden)!==null&&_modelObj$hidden!==void 0?_modelObj$hidden:false;const style=modelObj.style;const errorMessage=runtimeOptions.validation&&!modelObj.hideValidationMessage?modelObj.validationMessage:undefined;const labelCaption=modelObj.labelCaption;const disabled=disabledByContainer||modelObj.disabled;const formFeedbackComponent=(0,react.useMemo)(()=>{if(errorMessage){return (0,jsx_runtime.jsx)(design_system_FormFeedback,{message:errorMessage,type:"invalid"});}else if(labelCaption){return (0,jsx_runtime.jsx)(design_system_FormFeedback,{message:labelCaption,type:disabled?'disabled':'valid'});}else{return null;}},[disabled,errorMessage,labelCaption]);const renderWrapper=(0,react.useCallback)(children=>{const onClick=(()=>{if(type==='RNContainerWidget'){var _modelObj$events$size,_modelObj$events;const numClickEvents=(_modelObj$events$size=(_modelObj$events=modelObj.events)===null||_modelObj$events===void 0?void 0:_modelObj$events.size)!==null&&_modelObj$events$size!==void 0?_modelObj$events$size:0;if(numClickEvents>0){return()=>{var _callbacks$onClick;(_callbacks$onClick=callbacks.onClick)===null||_callbacks$onClick===void 0?void 0:_callbacks$onClick.call(callbacks);};}}})();return (0,jsx_runtime.jsxs)(WidgetWrapper,{id:id,hidden:hidden,type:type,modelObj:modelObj,style:style,onClick:onClick,children:[children,formFeedbackComponent]},id);},[id,hidden,modelObj,style,formFeedbackComponent,callbacks]);const props=mapProps(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},modelObj),callbacks),{},{style,apiRef,id,updateModel,triggerApiCall:({method,paramsObject})=>{return dispatch(triggerPluginApi({namespacedId:id,instance:instanceCompat,method,paramsObject}));},instance,rgProps,fetching,renderWrapper,namespace,disabled}));const shouldRenderWrapper=!(type.includes('RNFab')||type.includes('RNIcon'));if(shouldRenderWrapper){return renderWrapper((0,jsx_runtime.jsx)(Component,connectMobileWidget_objectSpread({},props)));}else{return (0,jsx_runtime.jsx)(Component,connectMobileWidget_objectSpread(connectMobileWidget_objectSpread({},props),{},{renderWrapper:renderWrapper}));}};RetoolWidget.displayName=`${type}(${Component.displayName||Component.name||'Component'})`;return (0,react.memo)(withWidgetErrorBoundary(type,RetoolWidget),(lodash_default()).isEqual);}

/***/ })

}])
//# sourceMappingURL=6075.687bd6a7.chunk.js.map