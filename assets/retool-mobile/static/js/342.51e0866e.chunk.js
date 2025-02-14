(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[342],{

/***/ 981178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(985707);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 380993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SegmentedControl_SegmentedControl)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(130486);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Animated/index.js + 39 modules
var Animated = __webpack_require__(939077);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Easing/index.js + 2 modules
var Easing = __webpack_require__(894622);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/I18nManager/index.js
var I18nManager = __webpack_require__(614734);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(460648);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/useColorScheme/index.js
var useColorScheme = __webpack_require__(437214);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Image/index.js + 2 modules
var Image = __webpack_require__(356216);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Text/index.js
var Text = __webpack_require__(219740);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/TouchableOpacity/index.js
var TouchableOpacity = __webpack_require__(236127);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@react-native-segmented-control+segmented-control@2.5.2_react-native@0.74.3_@babel+core@7.24._ol4bek7uabbfh5bgo23ta346dy/node_modules/@react-native-segmented-control/segmented-control/js/SegmentedControlTab.js
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function isBase64(str){const regex=/^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;return str&&regex.test(str);}const SegmentedControlTab=({onSelect,value,enabled,selected,tintColor,fontStyle={},activeFontStyle={},appearance,tabStyle,accessibilityHint})=>{const colorSchemeHook=(0,useColorScheme["default"])();const colorScheme=appearance||colorSchemeHook;const{color:textColor,fontSize,fontFamily,fontWeight}=fontStyle;const{color:activeColor,fontSize:activeFontSize,fontFamily:activeFontFamily,fontWeight:activeFontWeight}=activeFontStyle;const getColor=()=>{if(textColor){return textColor;}if(tintColor){return'white';}return colorScheme==='dark'?'#FFF':'#000';};const color=getColor();const activeStyle=_objectSpread(_objectSpread({},styles.activeText),{},{fontFamily:activeFontFamily||fontFamily,fontSize:activeFontSize||fontSize,color:activeColor||color,fontWeight:activeFontWeight||fontWeight||styles.activeText.fontWeight});const idleStyle={color,fontSize:fontSize,fontFamily:fontFamily,fontWeight:fontWeight};return (0,jsx_runtime.jsx)(TouchableOpacity["default"],{style:[styles.container,tabStyle],disabled:!enabled,onPress:onSelect,accessibilityHint:accessibilityHint,accessibilityRole:"button",accessibilityState:{selected:selected,disabled:!enabled},children:(0,jsx_runtime.jsx)(View["default"],{style:styles.default,children:typeof value==='number'||typeof value==='object'?(0,jsx_runtime.jsx)(Image["default"],{source:value,style:styles.segmentImage}):isBase64(value)?(0,jsx_runtime.jsx)(Image["default"],{source:{uri:value},style:styles.segmentImage}):(0,jsx_runtime.jsx)(Text["default"],{style:[idleStyle,selected&&activeStyle],children:value})})});};const styles=StyleSheet["default"].create({container:{flex:1,borderRadius:5},default:{flex:1,justifyContent:'center',alignItems:'center',margin:2,borderRadius:5},activeText:{fontWeight:'700'},segmentImage:{width:17,height:17,resizeMode:'contain'}});
;// CONCATENATED MODULE: ../node_modules/.pnpm/@react-native-segmented-control+segmented-control@2.5.2_react-native@0.74.3_@babel+core@7.24._ol4bek7uabbfh5bgo23ta346dy/node_modules/@react-native-segmented-control/segmented-control/js/SegmentsSeparators.js
const SegmentsSeparators=({values,selectedIndex})=>{const colorScheme=(0,useColorScheme["default"])();const hide=val=>{return selectedIndex===val||selectedIndex===val+1;};return (0,jsx_runtime.jsx)(View["default"],{style:SegmentsSeparators_styles.separatorsContainer,children:[...Array(values-1).keys()].map(val=>{return (0,jsx_runtime.jsx)(View["default"],{style:[SegmentsSeparators_styles.separator,colorScheme==='dark'&&SegmentsSeparators_styles.darkSeparator,hide(val)&&SegmentsSeparators_styles.hide]},val);})});};const SegmentsSeparators_styles=StyleSheet["default"].create({separatorsContainer:{position:'absolute',top:0,left:0,right:0,bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'},separator:{width:1,height:'50%',backgroundColor:'#D1D1D4'},darkSeparator:{backgroundColor:'#3F3F42'},hide:{backgroundColor:'transparent'}});
;// CONCATENATED MODULE: ../node_modules/.pnpm/@react-native-segmented-control+segmented-control@2.5.2_react-native@0.74.3_@babel+core@7.24._ol4bek7uabbfh5bgo23ta346dy/node_modules/@react-native-segmented-control/segmented-control/js/SegmentedControl.js
const SegmentedControl=({style,onChange,onValueChange,enabled=true,selectedIndex,values,tintColor,backgroundColor,tabStyle,fontStyle,activeFontStyle,appearance,accessibilityHintSeperator='out of'})=>{const colorSchemeHook=(0,useColorScheme["default"])();const colorScheme=appearance||colorSchemeHook;const[segmentWidth,setSegmentWidth]=react.useState(0);const animation=react.useRef(new Animated["default"].Value(0)).current;const handleChange=index=>{const event={nativeEvent:{value:values[index],selectedSegmentIndex:index}};onChange&&onChange(event);onValueChange&&onValueChange(values[index]);};react.useEffect(()=>{if(animation&&segmentWidth){let isRTL=I18nManager["default"].isRTL?-segmentWidth:segmentWidth;Animated["default"].timing(animation,{toValue:isRTL*(selectedIndex||0),duration:300,easing:Easing["default"].out(Easing["default"].quad),useNativeDriver:true}).start();}},[animation,segmentWidth,selectedIndex]);return (0,jsx_runtime.jsxs)(View["default"],{style:[SegmentedControl_styles.default,style,colorScheme==='dark'&&SegmentedControl_styles.darkControl,backgroundColor&&{backgroundColor},!enabled&&SegmentedControl_styles.disabled],onLayout:({nativeEvent:{layout:{width}}})=>{const newSegmentWidth=values.length?width/values.length:0;if(newSegmentWidth!==segmentWidth){animation.setValue(newSegmentWidth*(selectedIndex||0));setSegmentWidth(newSegmentWidth);}},children:[!backgroundColor&&!tintColor&&(0,jsx_runtime.jsx)(SegmentsSeparators,{values:values.length,selectedIndex:selectedIndex}),selectedIndex!=null&&segmentWidth?(0,jsx_runtime.jsx)(Animated["default"].View,{style:[SegmentedControl_styles.slider,{transform:[{translateX:animation}],width:segmentWidth-4,zIndex:-1,backgroundColor:tintColor||(colorScheme==='dark'?'#636366':'white')}]}):null,(0,jsx_runtime.jsx)(View["default"],{style:SegmentedControl_styles.segmentsContainer,children:values&&values.map((value,index)=>{return (0,jsx_runtime.jsx)(SegmentedControlTab,{enabled:enabled,selected:selectedIndex===index,accessibilityHint:`${index+1} ${accessibilityHintSeperator} ${values.length}`,value:value,tintColor:tintColor,tabStyle:tabStyle,fontStyle:fontStyle,activeFontStyle:activeFontStyle,appearance:colorScheme,onSelect:()=>{handleChange(index);}},index);})})]});};const SegmentedControl_styles=StyleSheet["default"].create({default:{overflow:'hidden',position:'relative',height:32,backgroundColor:'#EEEEF0',borderRadius:9},darkControl:{backgroundColor:'#1C1C1F'},disabled:{opacity:0.4},slider:{position:'absolute',borderRadius:7,top:2,bottom:2,right:2,left:2,borderWidth:0.5,borderColor:'rgba(0,0,0,0.04)',shadowColor:'#000',shadowOffset:{width:0,height:1},shadowOpacity:0.22,shadowRadius:2.22,elevation:3},segmentsContainer:{flex:1,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',elevation:5,backgroundColor:'transparent',zIndex:99}});/* harmony default export */ const js_SegmentedControl = (SegmentedControl);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@react-native-segmented-control+segmented-control@2.5.2_react-native@0.74.3_@babel+core@7.24._ol4bek7uabbfh5bgo23ta346dy/node_modules/@react-native-segmented-control/segmented-control/js/index.js

// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/utils/colorUtils.ts + 1 modules
var colorUtils = __webpack_require__(6709);
// EXTERNAL MODULE: ./src/utilities/colors.ts
var colors = __webpack_require__(240664);
// EXTERNAL MODULE: ./src/utilities/theme.ts
var utilities_theme = __webpack_require__(690059);
// EXTERNAL MODULE: ./src/components/design-system/Label.tsx
var Label = __webpack_require__(82881);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/SegmentedControl/SegmentedControl.tsx
const SegmentedControl_SegmentedControl_styles={light:{color:colors.nearWhite},dark:{color:colors.nearBlack}};const _SegmentedControl=({values=[],labels=values,fetching=false,label,disabled,required,onChange,value})=>{var _theme$primary,_theme$primary2;const key=values.join('-');const displayLabels=values.map((value,i)=>labels!==null&&labels!==void 0&&labels[i]?labels===null||labels===void 0?void 0:labels[i]:value);const[selectedIndex,setSelectedIndex]=(0,react.useState)(0);(0,react.useEffect)(()=>{const selectedIndex=values.findIndex(v=>v===value);if(selectedIndex!==-1){setSelectedIndex(selectedIndex);}},[value,values]);const _onChange=event=>{const index=event.nativeEvent.selectedSegmentIndex;const value=values[index];onChange===null||onChange===void 0?void 0:onChange(value);setSelectedIndex(index);};const theme=(0,react.useContext)(utilities_theme["default"]);const useLightText=(0,colorUtils.isDark)([(_theme$primary=theme.primary)!==null&&_theme$primary!==void 0?_theme$primary:colors.nearBlack]);return (0,jsx_runtime.jsxs)(View["default"],{children:[label?(0,jsx_runtime.jsx)(Label["default"],{title:label,loading:fetching,disabled:disabled,required:required}):null,(0,jsx_runtime.jsx)(js_SegmentedControl,{values:displayLabels,selectedIndex:selectedIndex,onChange:_onChange,fontStyle:SegmentedControl_SegmentedControl_styles.dark,activeFontStyle:useLightText?SegmentedControl_SegmentedControl_styles.light:SegmentedControl_SegmentedControl_styles.dark,tintColor:(_theme$primary2=theme.primary)!==null&&_theme$primary2!==void 0?_theme$primary2:colors.nearBlack,appearance:"light",enabled:!disabled},key)]});};/* harmony default export */ const SegmentedControl_SegmentedControl = (_SegmentedControl);

/***/ }),

/***/ 450342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ TabbedContainerWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(421565);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(730223);
// EXTERNAL MODULE: ../packages/runtimeShared/valueType/cast.ts + 1 modules
var cast = __webpack_require__(444367);
// EXTERNAL MODULE: ../packages/common/plugins/widgets/v2/api/getNestedItemsPropertyAnnotations.ts
var getNestedItemsPropertyAnnotations = __webpack_require__(845923);
// EXTERNAL MODULE: ../packages/common/plugins/widgets/common/editors/NestedItems/getSourceItemFields.ts
var getSourceItemFields = __webpack_require__(603263);
;// CONCATENATED MODULE: ../packages/runtimeShared/utils/NestedItems/deleteStaticItemIndex.ts
function deleteStaticItemIndex({template,nestedItemsOptions,index}){var _nestedItemsOptions$p;const sourceItemFields=(0,getSourceItemFields["default"])({itemFields:nestedItemsOptions.itemFields,pluralize:(_nestedItemsOptions$p=nestedItemsOptions.pluralizeItemField)!==null&&_nestedItemsOptions$p!==void 0?_nestedItemsOptions$p:getNestedItemsPropertyAnnotations.pluralizeItemField});return sourceItemFields.reduce((acc,{sourceField})=>{const value=(0,cast.toImmutableList)(template.get(sourceField));acc[sourceField]=value.delete(index);return acc;},{});}
// EXTERNAL MODULE: ../packages/runtimeShared/utils/typeguards.ts
var typeguards = __webpack_require__(909600);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/Container/getInternalSubcontainer.ts
function getInternalSubcontainer({_ids,_viewKeys,currentViewKey}){var _viewKeys$findKey;if(!_ids||_ids.size===0){return{id:'',name:'',isSoleSubcontainer:true};}const index=(_viewKeys$findKey=_viewKeys===null||_viewKeys===void 0?void 0:_viewKeys.findKey(v=>v===currentViewKey))!==null&&_viewKeys$findKey!==void 0?_viewKeys$findKey:-1;if(index===-1){return{id:(0,cast.toString)(_ids.get(0)),name:(0,cast.toString)(_viewKeys===null||_viewKeys===void 0?void 0:_viewKeys.get(0)),isSoleSubcontainer:_ids.size<=1};}else{return{id:String(_ids.get(index)),name:String(currentViewKey),isSoleSubcontainer:_ids.size<=1};}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TabbedContainer/nestedItems.ts
const itemFields=['key','label','hidden'];const nestedItems={itemFields,pluralizeItemField:field=>{if(field==='key'){return'viewKeys';}else{return (0,getNestedItemsPropertyAnnotations.pluralizeItemField)(field);}},keyField:'key',sourceField:'views'};/* harmony default export */ const TabbedContainer_nestedItems = (nestedItems);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TabbedContainer/template.ts
/* harmony default export */ const template = ({_ids:'List<string>',_hiddenByIndex:'List<boolean>',_viewKeys:'List<primitive>',_labels:'List<string>',hiddenByIndex:'boolean[]',currentViewIndex:'number?',currentViewKey:'primitive',viewKeys:'primitive[]',views:'data',labels:'string[]',itemMode:['static']});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/TabbedContainer/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNTabbedContainerWidget',name:'Tabbed Container',template: template,events:['change'],nestedItems: TabbedContainer_nestedItems,api:({updateModel,getModel})=>({setCurrentView:{metadata:{label:'Set current view key',description:'Set the current view of the container by key. No-op if the key is not valid.',example:`setCurrentView("View 1")`,params:[{type:'codeInput',name:'viewKey',props:{label:'View key',validator:'boolean | string | number | void'}}]},method:viewKey=>{var _getModel;(0,typeguards.assertPrimitive)(viewKey,'`viewKey` cannot be an object or array.');const viewKeys=(0,cast.toUnknownArray)((_getModel=getModel())===null||_getModel===void 0?void 0:_getModel.get('viewKeys'));if(!viewKeys.includes(viewKey)){throw new TypeError(`\`${viewKey}\` does not exist as a possible value of \`viewKey\``);}updateModel({currentViewKey:(0,cast.toPrimitive)(viewKey)});}}}),modelUpdatePostTemplateUpdate:[{properties:['_ids','_viewKeys'],modelUpdate:(oldWidgetModels,widgetId)=>{const viewInfo=new Map();for(const{model,instance}of oldWidgetModels){var _model$_ids;const viewIndex=(0,cast.toNumber)(model.currentViewIndex);const viewId=(0,cast.toString)((_model$_ids=model._ids)===null||_model$_ids===void 0?void 0:_model$_ids[viewIndex]);viewInfo.set(instance.join(','),{viewIndex,viewId});}return(newWidgetModel,instance)=>{var _viewInfo$get;const{viewId,viewIndex}=(_viewInfo$get=viewInfo.get(instance.join(',')))!==null&&_viewInfo$get!==void 0?_viewInfo$get:{viewId:'',viewIndex:null};const newViewIndex=(_ids$findIndex=>{const ids=newWidgetModel._ids;const foundIndex=(_ids$findIndex=ids===null||ids===void 0?void 0:ids.findIndex(v=>v===viewId))!==null&&_ids$findIndex!==void 0?_ids$findIndex:-1;if(foundIndex===-1){return Math.max(viewIndex!==null&&viewIndex!==void 0?viewIndex:0,ids.length-1);}return foundIndex;})();const newViewKey=newWidgetModel.viewKeys[newViewIndex];return[{selector:[widgetId,...instance,'currentViewKey'],newValue:newViewKey}];};}}],container:{childGridPadding:0,subcontainers:{currentSubcontainer:model=>{return getInternalSubcontainer({_ids:model.get('_ids'),_viewKeys:model.get('_viewKeys'),currentViewKey:model.get('currentViewKey')});},subcontainersCount:template=>{return template.get('_ids').size;},deleteSubcontainer:(template,subcontainer)=>{const ids=template.get('_ids');const index=ids.indexOf(subcontainer);if(index===-1){return{};}return deleteStaticItemIndex({template,index,nestedItemsOptions:TabbedContainer_nestedItems});}}},propertyAnnotations:{currentViewKey:{updatesSync:['currentViewIndex'],computeValueOverride:({model,renderedValue})=>{const viewKeys=(0,cast.toPrimitiveArray)(model.viewKeys);if(viewKeys.includes(renderedValue)){return renderedValue;}else{return viewKeys[0];}}},viewKeys:{updatesSync:['currentViewIndex','currentViewKey']},currentViewIndex:{computeValueOverride:({model})=>{const currentViewKey=model.currentViewKey;const viewKeys=(0,cast.toUnknownArray)(model.viewKeys);const result=viewKeys.indexOf(currentViewKey);if(result>-1){return result;}return 0;}}}}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(360062);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(130486);
// EXTERNAL MODULE: ./src/toolbox/Box/index.tsx + 3 modules
var Box = __webpack_require__(6814);
// EXTERNAL MODULE: ./src/components/mobileWidget.tsx
var mobileWidget = __webpack_require__(674622);
// EXTERNAL MODULE: ./src/components/plugins/widgets/SegmentedControl/SegmentedControl.tsx + 4 modules
var SegmentedControl = __webpack_require__(380993);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/TabbedContainer/TabbedContainer.tsx
const TabbedContainer=({_ids,views,rgProps,currentViewIndex,currentViewKey,onChange})=>{const{children,instance}=rgProps;const currentSubcontainerId=_ids.get(currentViewIndex!==null&&currentViewIndex!==void 0?currentViewIndex:0);const{values,labels}=(0,react.useMemo)(()=>{const filteredViews=views.filter(view=>!view.hidden);return{values:filteredViews.map(view=>view.key),labels:filteredViews.map(view=>view.label)};},[views]);const filteredNodes=(0,react.useMemo)(()=>{const currentNodes=children.filter(node=>{return node.position.subcontainer===currentSubcontainerId;});return currentNodes.map(widget=>{const node=(0,mobileWidget.renderMobileWidgetNode)(widget,instance===null||instance===void 0?void 0:instance[0]);return (0,jsx_runtime.jsx)(Box.Box,{direction:"row",justifyContent:"flex-start",wrap:"wrap",children:node},widget.id);});},[children,currentSubcontainerId,instance]);return (0,jsx_runtime.jsxs)(View["default"],{style:{flex:1,gap:8},children:[(0,jsx_runtime.jsx)(SegmentedControl["default"],{values:values,labels:labels,onChange:onChange,value:currentViewKey,disabled:false,required:false,id:"tabbed-container-segmented-control"}),filteredNodes]});};/* harmony default export */ const TabbedContainer_TabbedContainer = (TabbedContainer);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/TabbedContainer/TabbedContainerWidget.tsx
const _excluded=["updateModel","onChange","views"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const TabbedContainerWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,TabbedContainer_TabbedContainer,widgetRuntimeOptions,{},_ref=>{let{updateModel,onChange,views}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return _objectSpread(_objectSpread({},rest),{},{onChange(key){updateModel({currentViewKey:key});onChange===null||onChange===void 0?void 0:onChange();},views:views});}));

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
//# sourceMappingURL=342.51e0866e.chunk.js.map