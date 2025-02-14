(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[7356],{

/***/ 301313:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(818414);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 627356:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ FormWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(828256);
;// CONCATENATED MODULE: ../packages/runtimeShared/eventHandler/DelayedEventHandlerManager.ts
const EVENT_HANDLER_DEBOUNCED='EVENT_HANDLER_DEBOUNCED';const EVENT_HANDLER_THROTTLED='EVENT_HANDLER_THROTTLED';class EventHandlerDebounced extends Error{constructor(){super(EVENT_HANDLER_DEBOUNCED);}}class EventHandlerThrottled extends Error{constructor(){super(EVENT_HANDLER_THROTTLED);}}class DelayedEventHandlerManager{delayInfo=new Map();throttle({key,callMethod,timeMs}){return new Promise((resolve,reject)=>{if(this.delayInfo.has(key)){return reject(new EventHandlerThrottled());}else{callMethod().then(()=>resolve()).catch(e=>reject(e));this.delayInfo.set(key,{timeout:setTimeout(()=>{this.delayInfo.delete(key);},timeMs),reject});}});}debounce({key,callMethod,timeMs}){return new Promise((resolve,reject)=>{const info=this.delayInfo.get(key);if(info){clearTimeout(info.timeout);info.reject(new EventHandlerDebounced());}this.delayInfo.set(key,{timeout:setTimeout(()=>{callMethod().then(()=>resolve()).catch(e=>reject(e));this.delayInfo.delete(key);},timeMs),reject});});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Form/options.ts
const options={styles:{prefix:'form',props:{background:{defaultValue:'transparent'}}},disableAutoEditors:['adornments']};/* harmony default export */ const Form_options = (options);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
// EXTERNAL MODULE: ../packages/common/utils/repeatables/expandInstances.ts
var expandInstances = __webpack_require__(408096);
// EXTERNAL MODULE: ../packages/runtimeShared/valueType/cast.ts + 1 modules
var cast = __webpack_require__(332033);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/repeatables/getActiveInstances.ts + 1 modules
var getActiveInstances = __webpack_require__(474430);
;// CONCATENATED MODULE: ../packages/runtimeShared/plugins/widgets/v2/forms/childrenFormFieldMetaDataSelector.ts
function getChildrenFormFieldMetaData({formId,formInstance,appTemplate,getDescendentFormFields,getModelValue}){const{singleFields,repeatedFields}=getDescendentFormFields(formId);return[...singleFields.map(id=>{const namespacedId=id;return{namespacedId,selector:[namespacedId,...formInstance],pluginType:appTemplate.getPluginType(id)};}),...repeatedFields.flatMap(({repeatableIds,formFieldIds})=>{const instances=(0,expandInstances["default"])(repeatableIds.map(id=>instance=>{return (0,getActiveInstances["default"])({model:getModelValue([id,...instance]),pluginType:(0,cast.toString)(getModelValue([id,'pluginType']))});}),formInstance);return formFieldIds.flatMap(id=>{const namespacedId=id;return instances.map(instance=>{return{namespacedId,instance,selector:[namespacedId,...instance],pluginType:appTemplate.getPluginType(id)};});});})];}
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/index.ts
var plugins = __webpack_require__(946396);
;// CONCATENATED MODULE: ../packages/runtimeShared/plugins/widgets/v2/forms/clearFormChildrenValidation.ts
const _excluded=["updateModelAndRetriggerTemplateUpdate"];function clearFormChildrenValidation(_ref){let{updateModelAndRetriggerTemplateUpdate}=_ref,args=(0,objectWithoutProperties["default"])(_ref,_excluded);const children=getChildrenFormFieldMetaData(args);const changesets=children.flatMap(c=>getClearValidationChangeset(c.pluginType,c.selector));return updateModelAndRetriggerTemplateUpdate(changesets,children.map(c=>c.namespacedId));}const PROPERTIES_TO_CLEAR=[['validationState','required'],['validationState','validationType']];function getClearValidationChangeset(pluginType,selector){if((0,plugins.WidgetRuntimeOptionsResolver)(pluginType).validation){return[{selector:[...selector,'_validate'],newValue:false}];}else if(pluginType==='TextInputWidget'){return PROPERTIES_TO_CLEAR.map(prop=>{return{selector:[...selector,prop].flat(),newValue:null};});}else if(pluginType==='SelectWidget'){return[{selector:[...selector,'validationState'],newValue:null}];}else{return[];}}
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/values/defaultValues.ts
var defaultValues = __webpack_require__(582824);
;// CONCATENATED MODULE: ../packages/runtimeShared/plugins/widgets/v2/forms/valueToClearTo.ts
const valueToClearTo=pluginSubType=>{var _runtimeOptions$templ;const{legacyApi}=(0,plugins.WidgetRuntimeOptionsResolver)(pluginSubType);if(legacyApi){return pluginSubType==='CheckboxWidget'?false:null;}const runtimeOptions=(0,plugins.WidgetRuntimeOptionsResolver)(pluginSubType);if((runtimeOptions===null||runtimeOptions===void 0?void 0:(_runtimeOptions$templ=runtimeOptions.template)===null||_runtimeOptions$templ===void 0?void 0:_runtimeOptions$templ.value)!=null){return (0,defaultValues.getDefaultValue)(runtimeOptions.template.value);}else{return undefined;}};/* harmony default export */ const forms_valueToClearTo = (valueToClearTo);
;// CONCATENATED MODULE: ../packages/runtimeShared/plugins/widgets/v2/forms/clearFormChildrenValues.ts
const clearFormChildrenValues_excluded=["updateModelAndRetriggerTemplateUpdate","triggerApiCall"];function clearFormChildrenValues(_ref){let{updateModelAndRetriggerTemplateUpdate,triggerApiCall}=_ref,args=(0,objectWithoutProperties["default"])(_ref,clearFormChildrenValues_excluded);const children=getChildrenFormFieldMetaData(args);const{childrenThatHandleOwnAggregation,changesets}=children.reduce((res,c)=>{var _WidgetRuntimeOptions,_WidgetRuntimeOptions2;const doesChildHandleOwnAggregation=(_WidgetRuntimeOptions=(0,plugins.WidgetRuntimeOptionsResolver)(args.appTemplate.getPluginType(c.namespacedId)).container)===null||_WidgetRuntimeOptions===void 0?void 0:(_WidgetRuntimeOptions2=_WidgetRuntimeOptions.repeatable)===null||_WidgetRuntimeOptions2===void 0?void 0:_WidgetRuntimeOptions2.handlesOwnAggregation;if(doesChildHandleOwnAggregation){res.childrenThatHandleOwnAggregation.push(c.namespacedId);return res;}else{res.changesets.push({selector:[...c.selector,'value'],newValue:forms_valueToClearTo(c.pluginType)},...getClearValidationChangeset(c.pluginType,c.selector));return res;}},{childrenThatHandleOwnAggregation:[],changesets:[]});childrenThatHandleOwnAggregation.forEach(id=>{triggerApiCall===null||triggerApiCall===void 0?void 0:triggerApiCall({id,method:'clearInstanceValues',instance:args.formInstance,paramsObject:{}});});return updateModelAndRetriggerTemplateUpdate(changesets,children.map(c=>c.namespacedId));}
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/common/widgetTypeIsContainer.ts
var widgetTypeIsContainer = __webpack_require__(376201);
;// CONCATENATED MODULE: ../packages/runtimeShared/plugins/widgets/v2/forms/triggerWidgetValidation.ts
const triggerWidgetValidation_excluded=["ids"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const triggerWidgetValidation=({idAndInstances,getModelValue,appTemplate,updateModelViaChangesets})=>{const changesets=[];idAndInstances.forEach(idAndInstance=>{var _appTemplate$getPlugi;const type=(_appTemplate$getPlugi=appTemplate.getPluginNotTypesafe(idAndInstance[0]))===null||_appTemplate$getPlugi===void 0?void 0:_appTemplate$getPlugi.subtype;if(!type)return;const enabled=!!(0,plugins.WidgetRuntimeOptionsResolver)(type).validation;if(!enabled)return;if(!getModelValue([...idAndInstance,'_validate'])){changesets.push({selector:[...idAndInstance,'_validate'],newValue:true});}});if(!changesets.length)return;return updateModelViaChangesets(changesets);};function triggerWidgetValidationDeprecated(_ref){let{ids}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,triggerWidgetValidation_excluded);return triggerWidgetValidation(_objectSpread({idAndInstances:ids.map(id=>[id])},rest));}const getValidationChildrenIdAndInstances=({container,containerInstance,appTemplate,getModelValue,pluginInstances,positionKey})=>{const widget=appTemplate.getPluginNotTypesafe(container);if(!widget)return[];const childrenIdAndInstances=[];const containerIds=[container];const widgetsByContainerId=appTemplate.plugins.groupBy(plugin=>{var _plugin$positionKey;return(_plugin$positionKey=plugin[positionKey])===null||_plugin$positionKey===void 0?void 0:_plugin$positionKey.get('container');});function isPluginHidden(idAndInstance){if(idAndInstance.length>1){const[id,...instance]=idAndInstance;let cur=id;let curListViewNesting=pluginInstances(cur).length;while(cur&&curListViewNesting>0){var _appTemplate$getPlugi2,_appTemplate$getPlugi3;if(getModelValue([cur,...instance.slice(0,curListViewNesting),'hidden'])){return true;}cur=(_appTemplate$getPlugi2=appTemplate.getPluginNotTypesafe(cur))===null||_appTemplate$getPlugi2===void 0?void 0:(_appTemplate$getPlugi3=_appTemplate$getPlugi2[positionKey])===null||_appTemplate$getPlugi3===void 0?void 0:_appTemplate$getPlugi3.get('container');curListViewNesting=cur?pluginInstances(cur).length:0;}return false;}else{return false;}}for(let i=0;i<containerIds.length;i++){var _widgetsByContainerId;(_widgetsByContainerId=widgetsByContainerId.get(containerIds[i]))===null||_widgetsByContainerId===void 0?void 0:_widgetsByContainerId.forEach(({id,subtype})=>{const inListView=pluginInstances(id).length>0;if(!inListView){const hidden=getModelValue([id,'hidden']);if(hidden)return;}if((0,widgetTypeIsContainer["default"])(subtype)&&!(0,widgetTypeIsContainer.widgetTypeIsModalLike)(subtype)){containerIds.push(id);}else{const canValidate=!!(0,plugins.WidgetRuntimeOptionsResolver)(subtype).validation;if(!canValidate)return;const instances=pluginInstances(id);instances.splice(0,containerInstance.length);(0,expandInstances["default"])(instances,containerInstance).forEach(instance=>{const idAndInstance=[id,...instance];if(!isPluginHidden(idAndInstance)){childrenIdAndInstances.push(idAndInstance);}});}});}return childrenIdAndInstances;};const validateChildren=args=>{const idAndInstances=getValidationChildrenIdAndInstances(args);if(!idAndInstances.length)return true;const validationResult=triggerWidgetValidation(_objectSpread(_objectSpread({},args),{},{idAndInstances}));function getFinalValue(){return!idAndInstances.some(idAndInstance=>{return args.getModelValue([...idAndInstance,'invalid']);});}if(validationResult instanceof Promise){return validationResult.then(getFinalValue);}else{return getFinalValue();}};
// EXTERNAL MODULE: ../packages/runtimeShared/utils/typeguards.ts
var typeguards = __webpack_require__(101511);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/unset.js
var unset = __webpack_require__(828381);
var unset_default = /*#__PURE__*/__webpack_require__.n(unset);
// EXTERNAL MODULE: ../packages/runtimeShared/constants.ts
var constants = __webpack_require__(774110);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/setWith.js
var setWith = __webpack_require__(773810);
var setWith_default = /*#__PURE__*/__webpack_require__.n(setWith);
;// CONCATENATED MODULE: ../packages/runtimeShared/utils/setBiasedForObject.ts
function setBiasedForObject({container,selector,newValue}){let index=0;setWith_default()(container,selector,newValue,nsValue=>{const nextKey=selector[index+1];index++;if(typeof nextKey==='string'){return nsValue!==null&&nsValue!==void 0?nsValue:{};}});}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/Form/aggregation.ts
function aggregateData(input){const result={};const usedDataPaths=new Set();const usedListPaths=new Set();for(const{fields,repeatables}of input){const selectorPrefix=repeatables.flatMap(({instance,formDataKey})=>[formDataKey,instance]);if(selectorPrefix.length>0){const repeatablePrefix=selectorPrefix.slice(0,selectorPrefix.length-1);const serialized=(0,constants.ss)(repeatablePrefix);if(usedDataPaths.has(serialized)){unset_default()(result,repeatablePrefix);continue;}else{usedListPaths.add(serialized);}}fields.forEach(({formDataKey,value})=>{const selector=[...selectorPrefix,formDataKey];const serialized=(0,constants.ss)(selector);if(usedDataPaths.has(serialized)||usedListPaths.has(serialized)){unset_default()(result,selector);}else{setBiasedForObject({container:result,selector,newValue:value});usedDataPaths.add(serialized);}});}return result;}function aggregateInvalid(input){return input.some(({fields})=>fields.some(({value})=>value));}
// EXTERNAL MODULE: ../packages/common/plugins/widgets/v2/api/values/commonTemplates.ts
var commonTemplates = __webpack_require__(526159);
// EXTERNAL MODULE: ../frontend/src/components/plugins/mobile/commonStyles/layout.ts
var layout = __webpack_require__(600962);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Form/template.ts
function template_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function template_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?template_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):template_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const template = (template_objectSpread(template_objectSpread(template_objectSpread(template_objectSpread({},commonTemplates.baseTemplate),commonTemplates.containerTemplate),{},{data:'object',disableSubmit:'boolean',initialData:'formDataProvider',invalid:'boolean',requireValidation:'boolean',resetAfterSubmit:'boolean',submitting:'boolean',layout:['row','column'],justify:['center','flex-start','flex-end','space-between'],align:['center','flex-start','flex-end','stretch']},layout.layoutTemplate),{},{showBorder:'boolean'}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Form/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerMobile)({typeKey:'RNFormComponentWidget',name:'Form Component',template: template,submittable:true,events:['submit','invalid'],refMethods:['triggerSubmit'],propertyAnnotations:{data:{aggregateFormFields:{valueProperties:['value'],aggregate:aggregateData}},initialData:{type:'formDataProvider'},invalid:{aggregateFormFields:{valueProperties:['invalid'],aggregate:aggregateInvalid}},disableSubmit:{computeValueOverride:({renderedValue,model})=>{return model.disabled||renderedValue;}},disabled:{updatesSync:['disableSubmit']}},api:({ref,id,updateModel,getModel,instance,getAppTemplate,updateModelAndRetriggerTemplateUpdate,getModelValue,getDescendentFormFields,updateModelViaChangesets,pluginInstances,getPositionKey})=>({submit:{metadata:{label:'Submit',description:'Submit the form',example:'`form.submit()`'},method:()=>{if(!ref)return;ref.triggerSubmit();}},setData:{metadata:{label:'Set data',example:'`form.setData({ input1: "abc" })`',description:'Set the values of all child inputs',params:[{type:'codeInput',name:'data',props:{label:'Data'},description:'An object with a key for each field to update. The key should be the same as formDataKey on the fields. If a field is not included, it will be cleared.'}]},method:async data=>{(0,typeguards.assertPlainObject)(data,'Data must be an object');updateModel({initialData:data});}},clear:{metadata:{label:'Clear',example:'`form.clear()`',description:'Clear the values of all child inputs'},method:()=>clearFormChildrenValues({formId:id,formInstance:instance,appTemplate:getAppTemplate(),updateModelAndRetriggerTemplateUpdate,getDescendentFormFields,getModelValue})},reset:{metadata:{label:'Reset',example:'`form.reset()`',description:'Reset all child inputs with `formDataKey` to their default values or clears them if no default value is set'},method:async()=>{var _getModel;await updateModel({initialData:(_getModel=getModel())===null||_getModel===void 0?void 0:_getModel.get('initialData')});return clearFormChildrenValidation({formId:id,formInstance:instance,appTemplate:getAppTemplate(),updateModelAndRetriggerTemplateUpdate,getDescendentFormFields,getModelValue});}},validate:{metadata:{label:'Validate',example:'`form.validate()`',description:'Validate the form.'},method:()=>validateChildren({container:id,containerInstance:instance,appTemplate:getAppTemplate(),getModelValue,updateModelViaChangesets:changesets=>updateModelViaChangesets(changesets),pluginInstances,positionKey:getPositionKey()})},clearValidation:{metadata:{label:'Clear validation',example:'`form.clearValidation()`',description:'Clear the validation state of the form.'},method:()=>clearFormChildrenValidation({formId:id,formInstance:instance,appTemplate:getAppTemplate(),updateModelAndRetriggerTemplateUpdate,getDescendentFormFields,getModelValue})}})}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(949699);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(818414);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(716165);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var lodash = __webpack_require__(578105);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/api/disable/DisabledByContainerContext.ts
var DisabledByContainerContext = __webpack_require__(301313);
// EXTERNAL MODULE: ./src/components/mobileWidget.tsx
var mobileWidget = __webpack_require__(696429);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(102658);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Form/Form.tsx
const Form=({id,layout='row',justify,align,gap:_gap,padding,disabled,rgProps,onSubmit},ref)=>{(0,react.useImperativeHandle)(ref,()=>({triggerSubmit:()=>{onSubmit===null||onSubmit===void 0?void 0:onSubmit();}}));const{children}=rgProps;const gap=lodash_default().isEmpty(padding)?8:_gap;const nodes=(0,react.useMemo)(()=>{return children.map(widget=>{var _rgProps$instance;const node=(0,mobileWidget.renderMobileWidgetNode)(widget,(_rgProps$instance=rgProps.instance)===null||_rgProps$instance===void 0?void 0:_rgProps$instance[0]);return node;});},[children,rgProps.instance]);return layout==='row'?(0,jsx_runtime.jsx)(View["default"],{style:{flexDirection:'row',flexWrap:'wrap',justifyContent:justify||'flex-start',alignItems:align||'flex-start',columnGap:gap},children:(0,jsx_runtime.jsx)(DisabledByContainerContext["default"].Provider,{value:disabled!==null&&disabled!==void 0?disabled:false,children:nodes})}):(0,jsx_runtime.jsx)(DisabledByContainerContext["default"].Provider,{value:disabled!==null&&disabled!==void 0?disabled:false,children:(0,jsx_runtime.jsx)(View["default"],{style:{flexDirection:'column',rowGap:gap},children:nodes.map((node,index)=>{return (0,jsx_runtime.jsx)(View["default"],{style:{flexDirection:'row',justifyContent:justify||'flex-start',alignItems:align||'flex-start',flexWrap:'wrap'},children:node},`${id}-${layout}-${index}`);})})});};/* harmony default export */ const Form_Form = ((0,react.forwardRef)(Form));
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Form/FormWidget.tsx
const FormWidget_excluded=["bodyGrid","rgProps","disableSubmit","requireValidation","onInvalid","updateModel","triggerApiCall","onSubmit","resetAfterSubmit","submitting","apiRef"];function FormWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function FormWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?FormWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):FormWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const FormWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,Form_Form,widgetRuntimeOptions,Form_options,_ref=>{let{bodyGrid,rgProps,disableSubmit,requireValidation,onInvalid,updateModel,triggerApiCall,onSubmit,resetAfterSubmit,submitting,apiRef}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,FormWidget_excluded);return FormWidget_objectSpread(FormWidget_objectSpread({},rest),{},{rgProps,children:bodyGrid,onSubmit:async()=>{if(disableSubmit){return;}if(requireValidation){const valid=await triggerApiCall({method:'validate',paramsObject:{}});if(!valid){onInvalid();return;}}const wasSubmitting=submitting;try{await updateModel({submitting:true});await onSubmit();if(resetAfterSubmit){await triggerApiCall({method:'reset',paramsObject:{}});}await updateModel({submitting:false});}catch(e){if(e.message!==EVENT_HANDLER_DEBOUNCED&&!wasSubmitting){await updateModel({submitting:false});}}},ref:apiRef});}));

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

/***/ 828381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseUnset = __webpack_require__(22717);

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

module.exports = unset;


/***/ })

}])
//# sourceMappingURL=7356.1ca6a145.chunk.js.map