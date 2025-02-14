(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[1309],{

/***/ 551309:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(883006);
// EXTERNAL MODULE: ../frontend/src/components/plugins/index.ts + 1 modules
var plugins = __webpack_require__(720908);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(570899);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
// EXTERNAL MODULE: ../packages/runtimeShared/appTesting/AppTestingConfig.ts
var AppTestingConfig = __webpack_require__(237831);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(730223);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js
var debounce = __webpack_require__(633668);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// CONCATENATED MODULE: ../packages/common/datasources/utils/debounced.ts
const funcCache={};function debounced(runFunc,getUniqueKey){return function(...args){const uniqueKey=getUniqueKey(...args);if(!funcCache[uniqueKey]){funcCache[uniqueKey]=debounce_default()(runFunc,100,{leading:true});}funcCache[uniqueKey](...args);};}
// EXTERNAL MODULE: ../packages/common/utils/errorHandling.ts
var errorHandling = __webpack_require__(42217);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/function/performAsyncUpdate.ts
async function runFunctionV2({id,namespace,stackId,fromPageLoad,runSync,getAppTemplate,modelUpdate,evaluateTransformer,debugRecorderNode}){const transformerRunDebugRecorderNode=debugRecorderNode.recordChildNode({type:'transformerRun',transformerId:id});const templateFunction=getAppTemplate().getIn(['plugins',id,'template','funcBody']);try{console.debug('[FUNCTION] running',id);const{renderedFunction,value,isStatic}=await evaluateTransformer({transformerNodeId:id,code:templateFunction,namespace,debugRecorderNode});const transformerSuccessDebugRecorderNode=transformerRunDebugRecorderNode.recordChildNode({type:'transformerSuccess',transformerId:id});if(!runSync&&!false&&!isStatic){await new Promise(resolve=>setTimeout(resolve,50));}try{modelUpdate({changesets:[{selector:[id,'value'],newValue:value},{selector:[id,PROPERTY_KEY_RENDERED_FUNCTION],newValue:renderedFunction}],stackId,userTriggered:false,fromPageLoadAsync:fromPageLoad,debugRecorderNode:transformerSuccessDebugRecorderNode});}catch{}}catch(err){const transformerFailureDebugRecorderNode=transformerRunDebugRecorderNode.recordChildNode({type:'transformerFailure',transformerId:id});transformerFailureDebugRecorderNode.recordChildNode({type:'error',message:(0,errorHandling.getErrorMessage)(err),lineNumber:err.lineNumber});modelUpdate({changesets:[{selector:[id,'value'],newValue:null}],stackId,userTriggered:false,fromPageLoadAsync:fromPageLoad,debugRecorderNode:transformerFailureDebugRecorderNode});}}const performAsyncUpdate=async({id,pageLoad,options:{namespace,stackId},execEnv,debugRecorderNode})=>{if(!execEnv.shouldSkipBecauseOfPendingQueries([id,'funcBody'])){const runSync=execEnv.isRunningTest();if(runSync){return runFunctionV2({id,stackId,namespace,fromPageLoad:pageLoad,runSync,getAppTemplate:execEnv.getAppTemplate,modelUpdate:execEnv.modelUpdate,evaluateTransformer:execEnv.evaluateTransformer,debugRecorderNode});}return debounced(runFunctionV2,()=>`${id}-transformer-${namespace?namespace.getNamespace():'no-namespace'}`)({id,stackId,namespace,fromPageLoad:pageLoad,runSync,getAppTemplate:execEnv.getAppTemplate,modelUpdate:execEnv.modelUpdate,evaluateTransformer:execEnv.evaluateTransformer,debugRecorderNode});}};const PROPERTY_KEY_RENDERED_FUNCTION='renderedFunction';/* harmony default export */ const function_performAsyncUpdate = (performAsyncUpdate);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/function/runtimeOptions.ts
const PROPERTY_KEY_VALUE='value';const PROPERTY_KEY_FUNC_BODY='funcBody';const runtimeOptions=(0,registry.registerV1)({typeKey:'Function',propertyAnnotations:{[PROPERTY_KEY_FUNC_BODY]:{updatesAsync:[PROPERTY_KEY_VALUE]}},performAsyncUpdate: function_performAsyncUpdate,appTestingConfig:{isModelUpdateUsableAsAssertion(selector,newValue,pluginModel){const ignoredSelectors=[[selector[0],PROPERTY_KEY_FUNC_BODY],[selector[0],PROPERTY_KEY_RENDERED_FUNCTION]];if(ignoredSelectors.some(ignoredSelector=>isEqual_default()(selector,ignoredSelector))){return false;}return AppTestingConfig.APP_TESTING_CONFIG_DEFAULT.isModelUpdateUsableAsAssertion(selector,newValue,pluginModel);}}});/* harmony default export */ const function_runtimeOptions = (runtimeOptions);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/function/Function.tsx
const Template={funcBody:"// Reference external variables with curly brackets or using JS variables\nconst name = {{ current_user.firstName || 'world' }}\n\nreturn 'Hello ' + name",value:''};const options={docs:{link:'https://docs.retool.com/docs/transformers',description:'Use functions to transform data',properties:{value:{name:'value',label:'Function output',docs:'The returned data from this function.'}}}};const wireTemplate=template=>options=>{return immutable_es["default"].Map(template).merge(immutable_es["default"].fromJS(options));};(0,plugins.registerPlugin)({template:wireTemplate(Template),runtimeOptions: function_runtimeOptions,baseOptions:options});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/functions/SyncFunction/runtimeOptions.ts
const runtimeOptions_runtimeOptions=(0,registry.registerV1)({typeKey:'SyncFunction',propertyAnnotations:{parameters:{resetValueOnTemplateUpdate:true}}});/* harmony default export */ const SyncFunction_runtimeOptions = (runtimeOptions_runtimeOptions);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/functions/SyncFunction/SyncFunction.tsx
const defaultTemplate={body:'return param1 + param2',description:'',parameters:{param1:{name:'param1',sampleValue:'1'},param2:{name:'param2',sampleValue:'2'}}};(0,plugins.registerPlugin)({template:options=>{return immutable_es["default"].fromJS(defaultTemplate).merge(immutable_es["default"].fromJS(options));},runtimeOptions: SyncFunction_runtimeOptions});
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(421565);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var lodash = __webpack_require__(410642);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/widgets/v2/api/jsApi/makeResetValue.ts
var makeResetValue = __webpack_require__(825175);
// EXTERNAL MODULE: ../packages/runtimeShared/utils/typeguards.ts
var typeguards = __webpack_require__(909600);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/State/runtimeOptions.ts
const _excluded=["id"];function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const templateConfig={value:'unknown?'};const propertyAnnotations={};const State_runtimeOptions_runtimeOptions=(0,registry.registerV1)({typeKey:'State',template:templateConfig,propertyAnnotations,api:_ref=>{let{id}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);return _objectSpread({setValue:{metadata:{label:'Set value',description:'Sets the value of the state.',params:[{type:'codeInput',name:'value',props:{label:'Value'}}]},method:async value=>rest.updateModel({value:value})},setIn:{metadata:{label:'Set in',description:'Sets a deeply nested state value. Note: the current value must be an object or array.',example:"`state.setIn(['keyA', 'keyB', 'keyC'], 'new value')`",params:[{type:'codeInput',name:'keyPath',props:{label:'Key path',docs:'`(string | number)[]`'}},{type:'codeInput',name:'value',props:{label:'Value'}}]},method:async(keyPath,newValue)=>{(0,typeguards.assertStringOrNumberArray)(keyPath,'`keyPath` must be an array of strings or numbers');const curValue=(0,lodash.cloneDeep)(rest.getModelValue([id,'value']));(0,lodash.set)(curValue,keyPath,newValue);rest.updateModel({value:curValue});}}},(0,makeResetValue["default"])(_objectSpread({id},rest),{disableAutoAPI:['resetValue'],template:templateConfig}));}});/* harmony default export */ const State_runtimeOptions = (State_runtimeOptions_runtimeOptions);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/State/index.ts
const StateTemplate={value:null};const State_wireTemplate=template=>options=>{return immutable_es.Map(template).merge(immutable_es.fromJS(options));};(0,plugins.registerPlugin)({template:State_wireTemplate(StateTemplate),editors:()=>__webpack_require__.e(/* import() */ 2226).then(__webpack_require__.bind(__webpack_require__, 732226)),runtimeOptions: State_runtimeOptions});
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/wrapEditorComponentWithoutRegistering.ts
const wrapEditorComponentWithoutRegistering=BaseEditor=>BaseEditor;
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/last.js
var last = __webpack_require__(886007);
var last_default = /*#__PURE__*/__webpack_require__.n(last);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/GlobalWidgetProp/runtimeOptions.ts
function getGlobalWidgetFromNamespace(allPlugins,namespace){const pluginNamespace=last_default()(namespace.getNamespace());return allPlugins.find((pluginTemplate,_key)=>{return pluginTemplate.getIn(['template','childNamespace'])===pluginNamespace;});}function getGlobalPropTemplate(globalPropNamespace,allPlugins){const globalWidgetTemplate=getGlobalWidgetFromNamespace(allPlugins,globalPropNamespace);const globalWidgetPropTemplate=globalWidgetTemplate===null||globalWidgetTemplate===void 0?void 0:globalWidgetTemplate.getIn(['template',globalPropNamespace.getOriginalId()]);return globalWidgetPropTemplate;}const GlobalWidgetProp_runtimeOptions_runtimeOptions=(0,registry.registerV1)({typeKey:'GlobalWidgetProp',api:({updateModel})=>({setValue:{metadata:{label:'Set value',description:'Set the current value.',example:"`input1.setValue('foo')`"},method:async value=>updateModel({value})}}),propertyAnnotations:{defaultValue:{updatesSync:['value']},value:{getTemplateStringOverride:({allPlugins,widgetId,namespace})=>{if(!namespace){const widgetValue=allPlugins.getIn([widgetId,'template','value']);const defaultValueTemplate=allPlugins.getIn([widgetId,'template','defaultValue']);return widgetValue?widgetValue:defaultValueTemplate;}const globalWidgetPropTemplate=getGlobalPropTemplate(namespace,allPlugins);if(!globalWidgetPropTemplate){const defaultValueTemplate=allPlugins.getIn([widgetId,'template','defaultValue']);if(defaultValueTemplate){return defaultValueTemplate;}}return allPlugins.getIn([widgetId,'template','value']);}}}});/* harmony default export */ const GlobalWidgetProp_runtimeOptions = (GlobalWidgetProp_runtimeOptions_runtimeOptions);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/GlobalWidgetProp/GlobalWidgetProp.tsx
const GlobalWidgetPropTemplate={value:'',defaultValue:''};const GlobalWidgetProp_wireTemplate=template=>options=>{return immutable_es.Map(template).merge(immutable_es.fromJS(options));};const GlobalWidgetPropNotice=()=>{return (0,jsx_runtime.jsx)("div",{className:"widget-editable-text",children:"This property will be passed in when this module is used"});};const editors={content:{editors:[wrapEditorComponentWithoutRegistering(GlobalWidgetPropNotice)]}};(0,plugins.registerPlugin)({template:GlobalWidgetProp_wireTemplate(GlobalWidgetPropTemplate),editors,runtimeOptions: GlobalWidgetProp_runtimeOptions});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/GlobalWidgetOutput/GlobalWidgetOutput.tsx
const GlobalWidgetOutputTemplate={value:''};const GlobalWidgetOutput_wireTemplate=template=>options=>{return immutable_es.Map(template).merge(immutable_es.fromJS(options));};(0,plugins.registerPlugin)({template:GlobalWidgetOutput_wireTemplate(GlobalWidgetOutputTemplate),runtimeOptions:{typeKey:'GlobalWidgetOutput'}});
// EXTERNAL MODULE: ../frontend/src/components/plugins/datasources/wrapQueryConfig.ts + 2 modules
var wrapQueryConfig = __webpack_require__(641453);
;// CONCATENATED MODULE: ../packages/common/datasources/utils/generateConvertToParams.ts
function generateConvertToParams_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function generateConvertToParams_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?generateConvertToParams_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):generateConvertToParams_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function generateConvertToParams({template,paramKeys,sharedConfig,mapper}){return paramKeys.map(key=>generateConvertToParams_objectSpread({type:'convertToParameters',templateString:mapper?mapper(template[key]):template[key],name:`${key}Params`},sharedConfig));}
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/set.js
var set = __webpack_require__(178291);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
;// CONCATENATED MODULE: ../packages/common/datasources/utils/wrapComputeQueryParams.ts
function wrapComputeQueryParams({computeQueryParams,convertToParameters,evaluate,getPluginModelObjects}){return async({template,model,instance,shouldTransform=true})=>{const paramsConfig=computeQueryParams(template);const result={};for(const paramConfig of paramsConfig){const param=await(async()=>{switch(paramConfig.type){case'convertToParameters':return await convertToParameters({templateString:paramConfig.templateString,model,instance,decodeJSON:paramConfig.decodeJSON,castUndefinedToNull:paramConfig.castUndefinedToNull,withTypes:paramConfig.withTypes,isNoCurlyBraceTemplate:paramConfig.isNoCurlyBraceTemplate,additionalGlobalsToIgnore:paramConfig.additionalGlobalsToIgnore});case'raw':return paramConfig.value;case'templateString':{const evalResult=await evaluate({scope:model,templateString:paramConfig.templateString,instance,options:{disallowJSON:paramConfig.disallowJSON,instance}});if(paramConfig.transform&&!!shouldTransform){return await paramConfig.transform(evalResult);}else{return evalResult;}break;}case'fromPluginModel':return paramConfig.compute({getPluginModelObjects:getPluginModelObjects});case'null':return null;}})();const{name}=paramConfig;if(typeof name==='string'){result[name]=param;}else{set_default()(result,name,param);}}return result;};}/* harmony default export */ const utils_wrapComputeQueryParams = (wrapComputeQueryParams);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js
var get = __webpack_require__(882319);
var get_default = /*#__PURE__*/__webpack_require__.n(get);
;// CONCATENATED MODULE: ../packages/common/datasources/utils/wrapGetEvaluatedTemplate.ts
const removeParamsFromName=name=>{if(typeof name==='string'){const idx=name.indexOf('Params');return idx!==-1?name.substring(0,idx):name;}else{return name.map(n=>{const idx=n.indexOf('Params');return idx!==-1?n.substring(0,idx):n;});}};function wrapGetEvaluatedTemplate({computeQueryParams,evaluate,getFallbackEvaluatedTemplate}){return async({template,model,instance})=>{const paramsConfig=computeQueryParams(template);const result={};const fallbackEvaluatedTemplate=await getFallbackEvaluatedTemplate(template,model);for(const paramConfig of paramsConfig){const param=await(async()=>{if(paramConfig.type==='templateString'){const evalResult=await evaluate({scope:model,templateString:paramConfig.templateString,instance,options:{disallowJSON:paramConfig.disallowJSON,instance}});return evalResult;}else{const name=removeParamsFromName(paramConfig.name);const fallbackEvalResult=typeof name==='string'?fallbackEvaluatedTemplate[name]:get_default()(fallbackEvaluatedTemplate,name);return fallbackEvalResult;}})();const name=removeParamsFromName(paramConfig.name);if(typeof name==='string'){result[name]=param;}else{set_default()(result,name,param);}}return result;};}
;// CONCATENATED MODULE: ../packages/common/datasources/AthenaQuery/model.ts
const computeQueryParams=template=>{return[...generateConvertToParams({template,paramKeys:['query']})];};class AthenaQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/AthenaQuery/config.ts
/* harmony default export */ const config = ((0,registry.registerQueryConfig)({name:'AthenaQuery',template:{query:'',queryExecution:'',runWhenModelUpdates:true,_additionalScope:[]},queryProperties:['query'],computeQueryParams: computeQueryParams,formatResult:result=>{return{data:result.data,queryExecution:result.queryExecution};}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/AthenaQuery/docs.tsx
const docs_link='https://docs.retool.com/queries/guides/sql/';const properties={description:'A SQL query that reads data from Athena. Commonly used: `.data`',data:{name:'data',label:'Query data',docs:`
You can use the \`.data\` property to refer to the result of this query.
The data returned is in [columnar format](https://docs.retool.com/queries/guides/sql/").
If you want to use the data as an array of objects you can use the helper function \`formatDataAsArray\`
`}};/* harmony default export */ const docs = ({link: docs_link,properties});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/AthenaQuery/model.ts
/* harmony default export */ const model = ((0,wrapQueryConfig["default"])(config,{docs: docs}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/CosmosDBQuery/config.ts
/* harmony default export */ const CosmosDBQuery_config = ((0,registry.registerQueryConfig)({name:'CosmosDBQuery',template:{actionType:'read',query:'',itemBody:'',containerId:'',partitionKeys:'',runWhenModelUpdates:true},queryProperties:['query','itemBody','actionType','containerId','partitionKeys'],computeQueryParams:template=>{return[{type:'convertToParameters',templateString:template.actionType||'',name:'actionType'},{type:'convertToParameters',templateString:template.containerId||'',name:'containerId'},{type:'convertToParameters',templateString:template.partitionKeys||'',name:'partitionKeys'},...generateConvertToParams({template,paramKeys:['query','itemBody'],mapper:k=>k||''})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/CosmosDBQuery/model.ts
/* harmony default export */ const CosmosDBQuery_model = ((0,wrapQueryConfig["default"])(CosmosDBQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/CouchDBQuery/config.ts
/* harmony default export */ const CouchDBQuery_config = ((0,registry.registerQueryConfig)({name:'CouchDBQuery',template:{method:'get',database:'',_id:'',value:'',_rev:'',mangoQuery:'{\n  "selector": {},\n  "limit": 5\n}',startKey:'',endKey:'',viewUrl:'',limit:'',skip:'',includeDocs:false,runWhenModelUpdates:true},queryProperties:['method','database','_id','value','_rev','mangoQuery'],computeQueryParams:template=>{return[{type:'convertToParameters',templateString:template.method,name:'methodParams'},...generateConvertToParams({template,paramKeys:['database','_id','value','_rev','mangoQuery','startKey','endKey','viewUrl','limit','skip'],sharedConfig:{decodeJSON:true}})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/CouchDBQuery/model.ts
/* harmony default export */ const CouchDBQuery_model = ((0,wrapQueryConfig["default"])(CouchDBQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/DatastoreQuery/config.ts
const config_defaultTemplate={kind:'',key:'',data:'',datastoreWhere:'',limit:'',datastoreOrderBy:'',datastoreOrderDirection:'',datastoreNamespace:''};/* harmony default export */ const DatastoreQuery_config = ((0,registry.registerQueryConfig)({name:'DatastoreQuery',template:config_defaultTemplate,computeQueryParams:template=>{return[{type:'convertToParameters',templateString:template.data,name:'dataParams',decodeJSON:true},...generateConvertToParams({template,paramKeys:['key','kind','datastoreWhere','limit','datastoreOrderBy','datastoreOrderDirection','datastoreNamespace']})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/DatastoreQuery/model.ts
/* harmony default export */ const DatastoreQuery_model = ((0,wrapQueryConfig["default"])(DatastoreQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/DynamoQuery/model.ts
const model_computeQueryParams=template=>{return[...generateConvertToParams({template,paramKeys:['table','Item','Key','KeyConditionExpression','ExpressionAttributeNames','ExpressionAttributeValues','ProjectionExpression','FilterExpression','UpdateExpression','ConditionExpression','IndexName','Limit','Select','customParameters']}).map(item=>{if(item.name==='tableParams'){item.name='TableParams';}return item;})];};class DynamoQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../packages/common/datasources/DynamoQuery/types.ts
const types_defaultTemplate={table:'',method:'query',Item:'{}',Key:'{}',KeyConditionExpression:'',ProjectionExpression:'',FilterExpression:'',UpdateExpression:'',ConditionExpression:'',ExpressionAttributeNames:'{}',ExpressionAttributeValues:'{}',IndexName:'',Limit:'',Select:'',usingCustomParameters:false,customParameters:'{}',runWhenModelUpdates:true,autoPaginate:true,isTableFieldRawInput:false};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/DynamoQuery/config.ts
/* harmony default export */ const DynamoQuery_config = ((0,registry.registerQueryConfig)({name:'DynamoQuery',template:types_defaultTemplate,queryProperties:['table','method','Item','Key','KeyConditionExpression','ProjectionExpression','FilterExpression','UpdateExpression','ConditionExpression','ExpressionAttributeNames','ExpressionAttributeValues','IndexName','Limit','Select','usingCustomParameters','customParameters','autoPaginate'],computeQueryParams: model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/DynamoQuery/model.ts
/* harmony default export */ const DynamoQuery_model = ((0,wrapQueryConfig["default"])(DynamoQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ElasticSearchQuery/config.ts
const ElasticSearchQuery_config_defaultTemplate={collection:'',method:'search',query:'',runWhenModelUpdates:true};/* harmony default export */ const ElasticSearchQuery_config = ((0,registry.registerQueryConfig)({name:'ElasticSearchQuery',template:ElasticSearchQuery_config_defaultTemplate,queryProperties:['collection','method','query'],computeQueryParams:template=>{return[...generateConvertToParams({template,paramKeys:['query']})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ElasticSearchQuery/model.ts
/* harmony default export */ const ElasticSearchQuery_model = ((0,wrapQueryConfig["default"])(ElasticSearchQuery_config));
// EXTERNAL MODULE: ../packages/common/regexes.ts
var regexes = __webpack_require__(485435);
;// CONCATENATED MODULE: ../packages/common/runtime/wrapTemplateWithStringify.ts
function wrapTemplateWithStringify(templateString){return templateString.replace(regexes.ANY_TEMPLATE_REGEX,(_,inner)=>{return`{{(v=>typeof v=='object'&&!(v instanceof Date)?JSON.stringify(v):v)(${inner})}}`;});}
;// CONCATENATED MODULE: ../packages/common/datasources/RetoolAIQuery/model.ts
const instructionParam=template=>{return{name:'instruction',type:'templateString',templateString:wrapTemplateWithStringify(template.instruction),disallowJSON:false};};const imageContentParam=template=>{var _template$imageConten;return{name:'imageContent',type:'templateString',templateString:(_template$imageConten=template.imageContent)!==null&&_template$imageConten!==void 0?_template$imageConten:'',disallowJSON:false};};const RetoolAIQuery_model_computeQueryParams=template=>{var _template$customSyste,_template$customTempe,_template$vectorSeman,_template$vectorDynam,_template$textClassif,_template$textExtract,_template$vectorSeman2,_template$vectorDynam2,_template$imageClassi,_template$imageExtrac,_template$vectorSeman3;switch(template.action){case'textGeneration':return[instructionParam(template),{name:'customSystemMessage',type:'templateString',templateString:(_template$customSyste=template.customSystemMessage)!==null&&_template$customSyste!==void 0?_template$customSyste:'',disallowJSON:false},{name:'customTemperature',type:'templateString',templateString:(_template$customTempe=template.customTemperature)!==null&&_template$customTempe!==void 0?_template$customTempe:'',disallowJSON:false},{name:'vectorSemanticSearchString',type:'templateString',templateString:wrapTemplateWithStringify((_template$vectorSeman=template.vectorSemanticSearchString)!==null&&_template$vectorSeman!==void 0?_template$vectorSeman:''),disallowJSON:false},{name:'vectorDynamicNamespaces',type:'templateString',templateString:(_template$vectorDynam=template.vectorDynamicNamespaces)!==null&&_template$vectorDynam!==void 0?_template$vectorDynam:'',disallowJSON:false}];case'textSummarization':return[instructionParam(template)];case'textClassification':return[instructionParam(template),{name:'textClassifierDynamicLabels',type:'templateString',templateString:(_template$textClassif=template.textClassifierDynamicLabels)!==null&&_template$textClassif!==void 0?_template$textClassif:'',disallowJSON:false}];case'textExtraction':return[instructionParam(template),{name:'textExtractorDynamicLabels',type:'templateString',templateString:(_template$textExtract=template.textExtractorDynamicLabels)!==null&&_template$textExtract!==void 0?_template$textExtract:'',disallowJSON:false}];case'documentParsing':throw new Error('Document parsing is only supported in apps');case'imageGeneration':return[instructionParam(template)];case'chatResponseGeneration':return[{name:'chatInput',type:'templateString',templateString:wrapTemplateWithStringify(template.chatInput),disallowJSON:false},{name:'chatHistory',type:'templateString',templateString:template.chatHistory,disallowJSON:false},{name:'systemMessage',type:'templateString',templateString:wrapTemplateWithStringify(template.systemMessage),disallowJSON:false},{name:'vectorSemanticSearchString',type:'templateString',templateString:wrapTemplateWithStringify((_template$vectorSeman2=template.vectorSemanticSearchString)!==null&&_template$vectorSeman2!==void 0?_template$vectorSeman2:''),disallowJSON:false},{name:'vectorDynamicNamespaces',type:'templateString',templateString:(_template$vectorDynam2=template.vectorDynamicNamespaces)!==null&&_template$vectorDynam2!==void 0?_template$vectorDynam2:'',disallowJSON:false}];case'imageTextGeneration':return[instructionParam(template),imageContentParam(template)];case'imageCaptioning':return[imageContentParam(template)];case'imageClassification':return[imageContentParam(template),{name:'imageClassifierDynamicLabels',type:'templateString',templateString:(_template$imageClassi=template.imageClassifierDynamicLabels)!==null&&_template$imageClassi!==void 0?_template$imageClassi:'',disallowJSON:false}];case'imageExtraction':return[imageContentParam(template),{name:'imageExtractorDynamicLabels',type:'templateString',templateString:(_template$imageExtrac=template.imageExtractorDynamicLabels)!==null&&_template$imageExtrac!==void 0?_template$imageExtrac:'',disallowJSON:false}];case'vectorsManagement':return[{name:'source',type:'templateString',templateString:wrapTemplateWithStringify(template.source),disallowJSON:false},{name:'content',type:'templateString',templateString:wrapTemplateWithStringify(template.content),disallowJSON:false},{name:'vectorNamespaceId',type:'templateString',templateString:wrapTemplateWithStringify(template.vectorNamespaceId),disallowJSON:false},{name:'vectorDynamicUrls',type:'templateString',templateString:template.vectorDynamicUrls,disallowJSON:false},{name:'vectorActionDynamicNamespace',type:'templateString',templateString:wrapTemplateWithStringify(template.vectorActionDynamicNamespace),disallowJSON:false},{name:'vectorSemanticSearchString',type:'templateString',templateString:wrapTemplateWithStringify((_template$vectorSeman3=template.vectorSemanticSearchString)!==null&&_template$vectorSeman3!==void 0?_template$vectorSeman3:''),disallowJSON:false}];}};class RetoolAIQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: RetoolAIQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: RetoolAIQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
// EXTERNAL MODULE: ../packages/common/gpt/types.ts
var types = __webpack_require__(587043);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/EmbeddingQuery/config.ts
const RETOOL_VECTOR_DEFAULT_QUERY_TEMPLATE={runWhenModelUpdates:false,action:'vectorsManagement',instruction:'',defaultModelInitialized:false,model:types.DEFAULT_RETOOL_AI_MODEL,providerId:(0,types.getDefaultRetoolAIProviderId)(types.DEFAULT_RETOOL_AI_MODEL),providerName:(0,types.getRetoolAIModelProvider)(types.DEFAULT_RETOOL_AI_MODEL),systemMessage:'You are a helpful assistant',customSystemMessage:'',customTemperature:'1',vectorSemanticSearchString:'',vectorModeEnabled:false,vectorNamespaceIds:[],vectorDynamicNamespaces:'',vectorNamespacesDynamicModeEnabled:false,vectorAction:'upsertDocument',vectorNamespaceId:'',vectorUrls:[],vectorDynamicUrls:'',vectorCreateAndFetchDynamicModeEnabled:false,vectorActionDynamicNamespace:'',vectorActionNamespaceDynamicModeEnabled:false,source:'',content:'',textClassifierLabels:[],textClassifierDynamicLabels:'',textClassifierDynamicModeEnabled:false,textExtractorLabels:[],textExtractorDynamicLabels:'',textExtractorDynamicModeEnabled:false,multimodalModel:'gpt-4o-mini',imageModel:'dall-e-3',imageContent:'',imageClassifierLabels:[],imageClassifierDynamicLabels:'',imageClassifierDynamicModeEnabled:false,imageExtractorLabels:[],imageExtractorDynamicLabels:'',imageExtractorDynamicModeEnabled:false,chatInput:'',chatHistory:'',fileSource:'',fileUseDynamicSource:false,streamResponse:true};/* harmony default export */ const EmbeddingQuery_config = ((0,registry.registerQueryConfig)({name:'EmbeddingQuery',template:RETOOL_VECTOR_DEFAULT_QUERY_TEMPLATE,computeQueryParams: RetoolAIQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/EmbeddingQuery/model.ts
/* harmony default export */ const EmbeddingQuery_model = ((0,wrapQueryConfig["default"])(EmbeddingQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/FirebaseQuery/model.ts
const paramKeys=['uid','email','phoneNumber','userOptions','limit','docId','value','nextPageToken','dbRef','ordering','filterType','equalTo','endAt','startAt','setDbValue','firestoreCollection','firestoreWhere','firestoreOrderBy','firestoreOrderDirection','query'];const keyValuePairKeys={firestoreWhere:true};const ignoredGlobals=['db','firestore'];const FirebaseQuery_model_computeQueryParams=template=>paramKeys.map(key=>({name:`${key}Params`,type:'convertToParameters',templateString:template[key],decodeJSON:!!keyValuePairKeys[key],castUndefinedToNull:true,withTypes:true,isNoCurlyBraceTemplate:key==='query',additionalGlobalsToIgnore:key==='query'?ignoredGlobals:[]}));class FirebaseQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: FirebaseQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: FirebaseQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../packages/common/datasources/FirebaseQuery/types.ts
const FirebaseQuery_types_defaultTemplate={editorMode:'gui',firebaseService:'auth',actionType:'getUser',runWhenModelUpdates:true,uid:'',email:'',phoneNumber:'',userOptions:'',limit:'',nextPageToken:'',docId:'',value:'',useRawCollectionId:false,dbRef:'',ordering:'',orderByChildValue:'',filterType:'',startAt:'',endAt:'',equalTo:'',limitType:'',setDbValue:'',firestoreCollection:'',firestoreWhere:'',firestoreOrderBy:'',firestoreOrderDirection:''};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/FirebaseQuery/config.ts
const config_paramKeys=['uid','email','phoneNumber','userOptions','limit','docId','value','nextPageToken','dbRef','ordering','filterType','equalTo','endAt','startAt','setDbValue','firestoreCollection','firestoreWhere','firestoreOrderBy','firestoreOrderDirection','query'];/* harmony default export */ const FirebaseQuery_config = ((0,registry.registerQueryConfig)({name:'FirebaseQuery',template:FirebaseQuery_types_defaultTemplate,queryProperties:[...['firebaseService','actionType'],...config_paramKeys],computeQueryParams: FirebaseQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/FirebaseQuery/model.ts
/* harmony default export */ const FirebaseQuery_model = ((0,wrapQueryConfig["default"])(FirebaseQuery_config));
// EXTERNAL MODULE: ../packages/common/datasources/gcs/b64toBlob.ts
var b64toBlob = __webpack_require__(686299);
// EXTERNAL MODULE: ../packages/common/datasources/gcs/gcs.ts + 2 modules
var gcs = __webpack_require__(916382);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GCSQuery/config.ts
function config_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function config_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?config_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):config_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const GCSQuery_config_defaultTemplate={actionType:'list',bucketName:'',fileKey:'',delimiter:'',prefix:'',uploadFileType:'text/csv;charset=utf-8;',uploadFileName:'export.csv',uploadFileAcl:'',uploadData:'',saveOnBackend:false,metadata:undefined,useRawUploadFileType:false,copySource:'',sourceFileKey:'',sourceBucketName:'',signedOperationName:'',signedOperationOptions:'',runWhenModelUpdates:true};function getPerformDownload(download){return async data=>{const blob=(0,b64toBlob.b64toBlob)(data.body,data.contentType,512);await download(blob,data.key);return{};};}const uploadToGCS=async(data,exportData,uploadFileAcl,upload)=>{var _result;const{signedUrl,fileName,fileType}=data;const{blob,contentType}=await (0,gcs.blobToUploadFromData)(exportData,fileType);const headers=config_objectSpread(config_objectSpread({},uploadFileAcl?{'x-goog-acl':uploadFileAcl}:null),contentType?{'Content-Type':contentType}:null);let result;try{result=await upload(blob,signedUrl,headers);}catch(err){if(err.message==='Failed to fetch'){throw new Error('Failed to upload. This might be due to a CORS issue on the bucket, so please double check that your CORS settings are correct.');}throw err;}if(result.ok){return{signedUrl,fileName,fileType};}if((_result=result)!==null&&_result!==void 0&&_result.text.includes('Cannot insert legacy ACL for an object when uniform bucket-level access is enabled.')){throw new Error('Cannot use Access level with a Uniform Access Level bucket. Please remove Access level from your upload query.\n');}return{error:true,status:result.statusCode,statusText:result.statusText,text:result.text};};function getPerformUpload(template,evaluateTemplateString,upload){return async data=>{if(template.saveOnBackend){return;}const exportData=evaluateTemplateString(template.uploadData);return await uploadToGCS(data,exportData,template.uploadFileAcl,upload);};}/* harmony default export */ const GCSQuery_config = ((0,registry.registerQueryConfig)({name:'GCSQuery',template:GCSQuery_config_defaultTemplate,queryProperties:['actionType','bucketName','fileKey','prefix','delimiter'],computeQueryParams:template=>{return[{name:'metadataParams',type:'convertToParameters',templateString:template.metadata||'',decodeJSON:true},{name:'contentTypeParams',type:'templateString',templateString:template.uploadData,disallowJSON:false,transform:templateEvaluationResult=>{if(templateEvaluationResult){return{0:templateEvaluationResult.contentType,length:1};}return{length:0};}},...generateConvertToParams({template,paramKeys:['bucketName','fileKey','delimiter','prefix','signedOperationName','signedOperationOptions','uploadFileName','uploadFileType','copySource','sourceBucketName','sourceFileKey']})];},getQueryResponseHandler:({template,evaluateTemplateString,download,upload})=>{if(template.actionType==='download'){return getPerformDownload(download);}else if(template.actionType==='upload'){return getPerformUpload(template,evaluateTemplateString,upload);}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GCSQuery/model.ts
/* harmony default export */ const GCSQuery_model = ((0,wrapQueryConfig["default"])(GCSQuery_config));
// EXTERNAL MODULE: ../packages/common/PluginNamespaceInfo.ts
var PluginNamespaceInfo = __webpack_require__(673098);
// EXTERNAL MODULE: ../packages/common/plugins/widgets/globalWidgets/namespace.ts
var globalWidgets_namespace = __webpack_require__(14181);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GlobalWidgetQuery/config.ts
function GlobalWidgetQuery_config_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function GlobalWidgetQuery_config_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?GlobalWidgetQuery_config_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):GlobalWidgetQuery_config_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const GlobalWidgetQuery_config = ((0,registry.registerQueryConfig)({name:'GlobalWidgetQuery',template:{query:''},computeQueryParams:null,customizedRunQuery:({id,passThroughOptions,displayError,triggerQuery,getModelValue,getNamespaceWidgetId})=>{const splitQuery=id.split(globalWidgets_namespace.NAMESPACE_SEPARATOR);const namespace=new PluginNamespaceInfo.PluginNamespaceInfoImpl(splitQuery.slice(0,-1));const queryName=splitQuery[splitQuery.length-1];const parentNamespace=splitQuery.length>2?splitQuery.slice(0,-2):undefined;const namespaceProviderWidgetId=getNamespaceWidgetId(namespace);if(!namespaceProviderWidgetId){return;}const parentQueryName=getModelValue([namespaceProviderWidgetId,queryName]);let parentQueryNameWithNamespace;if(parentNamespace){if(parentQueryName){parentQueryNameWithNamespace=(0,globalWidgets_namespace.addNamespace)(new PluginNamespaceInfo.PluginNamespaceInfoImpl(parentNamespace),parentQueryName);}else{parentQueryNameWithNamespace=parentQueryName;}}else{parentQueryNameWithNamespace=parentQueryName;}if(!parentQueryNameWithNamespace){var _passThroughOptions$o;displayError(`No query provided for ${namespace.getNamespace().join(globalWidgets_namespace.NAMESPACE_SEPARATOR)}.${queryName}`);(_passThroughOptions$o=passThroughOptions.onFailure)===null||_passThroughOptions$o===void 0?void 0:_passThroughOptions$o.call(passThroughOptions,{});}else{var _passThroughOptions$a;triggerQuery({id:parentQueryNameWithNamespace,userTriggered:true,instance:[],options:GlobalWidgetQuery_config_objectSpread(GlobalWidgetQuery_config_objectSpread({},passThroughOptions),{},{additionalPluginIds:[...((_passThroughOptions$a=passThroughOptions.additionalPluginIds)!==null&&_passThroughOptions$a!==void 0?_passThroughOptions$a:[]),id]})});}},options:{skipPostRunMessage:true,skipOnSuccessQueries:true,skipOnFailureQueries:true,passthroughQueryCompletionHandlers:true}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GlobalWidgetQuery/model.ts
/* harmony default export */ const GlobalWidgetQuery_model = ((0,wrapQueryConfig["default"])(GlobalWidgetQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/GoogleSheetsQuery/model.ts
const GoogleSheetsQuery_model_computeQueryParams=template=>{return[...generateConvertToParams({template,paramKeys:['spreadsheetId','sheetRange','sheetTitle','sheetUpdate','sheetIdToCopy','copyToSpreadsheetId','filterBy','limit','offset','sheetName'],mapper:value=>value||''}),{type:'templateString',name:'bulkUpdateRows',templateString:template.bulkUpdateRows,disallowJSON:true}];};class GoogleSheetsQueryModelEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: GoogleSheetsQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: GoogleSheetsQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GoogleSheetsQuery/config.ts
/* harmony default export */ const GoogleSheetsQuery_config = ((0,registry.registerQueryConfig)({name:'GoogleSheetsQuery',template:{actionType:'read',sheetTitle:'',sheetRange:'',spreadsheetId:null,useRawSpreadsheetId:false,doNotThrowOnDeleteNoOp:false,sheetName:'',sheetIdToCopy:'',copyToSpreadsheetId:'',valueFormatting:'formatted',useRawCopyToSpreadsheetId:false,sheetUpdate:'',runWhenModelUpdates:true,useSheetRange:false,filterBy:'',limit:'',offset:'',bulkUpdatePrimaryKey:'',bulkUpdateRows:''},queryProperties:['sheetRange','spreadsheetId'],computeQueryParams: GoogleSheetsQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GoogleSheetsQuery/model.ts
/* harmony default export */ const GoogleSheetsQuery_model = ((0,wrapQueryConfig["default"])(GoogleSheetsQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/GraphQLQuery/model.ts
const GraphQLQuery_model_computeQueryParams=template=>{const bodyType=template.bodyType;const decodeBodyAsJSON=bodyType==='json';return[{name:'queryParams',type:'convertToParameters',templateString:template.query},{name:'headersParams',type:'convertToParameters',templateString:template.headers,decodeJSON:true},{name:'graphQLVariablesParams',type:'convertToParameters',templateString:template.graphQLVariables,decodeJSON:true},{name:'cookiesParams',type:'convertToParameters',templateString:template.cookies,decodeJSON:true},{name:'bodyParams',type:'convertToParameters',templateString:template.body,decodeJSON:decodeBodyAsJSON}];};class GraphQLQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: GraphQLQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: GraphQLQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GraphQLQuery/config.ts
function GraphQLQuery_config_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function GraphQLQuery_config_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?GraphQLQuery_config_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):GraphQLQuery_config_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const DEFAULT_GRAPHQL_ERROR_TRANSFORMER=`//Use the variables data, metadata, and errors to reference these fields from your query's results
if (Array.isArray(errors) && errors.length > 0) {
  return errors[0].message;
} else {
  return false
}
    `;/* harmony default export */ const GraphQLQuery_config = ((0,registry.registerQueryConfig)({name:'GraphQLQuery',template:{query:'',type:'POST',headers:'',graphQLVariables:'[]',body:`# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query with an argument variable "id" of type String might look like:
#
#     query ($id: String) {
#       field(id: $id) {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#   Auto Complete:  Ctrl-Space (or just start typing)

`,cookies:'',bodyType:'raw',paginationEnabled:false,paginationLimit:'',paginationDataField:'',paginationPaginationField:'',graphQLErrors:null,runWhenModelUpdates:true,errorTransformer:DEFAULT_GRAPHQL_ERROR_TRANSFORMER},queryProperties:['query','headers','body','cookies','graphQLVariables'],computeQueryParams: GraphQLQuery_model_computeQueryParams,options:{propertyAnnotations:{query:{updatesAsync:['data']},headers:{updatesAsync:['data']},body:{updatesAsync:['data']},cookies:{updatesAsync:['data']},graphQLVariables:{updatesAsync:['data']}}},formatMockRawResponse:rawResponse=>{const mockedRawResponse={};mockedRawResponse.data=rawResponse;return mockedRawResponse;},formatResult:(_data,_template,rawResponse)=>{var _rawResponse$errors;const responseErrors=(_rawResponse$errors=rawResponse===null||rawResponse===void 0?void 0:rawResponse.errors)!==null&&_rawResponse$errors!==void 0?_rawResponse$errors:{};return GraphQLQuery_config_objectSpread(GraphQLQuery_config_objectSpread({},rawResponse),{},{graphQLErrors:responseErrors});}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GraphQLQuery/model.ts
/* harmony default export */ const GraphQLQuery_model = ((0,wrapQueryConfig["default"])(GraphQLQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GRPCQuery/config.ts
const GRPCQuery_config_defaultTemplate={query:undefined,metadata:undefined,methodName:''};/* harmony default export */ const GRPCQuery_config = ((0,registry.registerQueryConfig)({name:'GRPCQuery',template:GRPCQuery_config_defaultTemplate,computeQueryParams:template=>[{name:'queryParams',type:'convertToParameters',templateString:template.query||''},{name:'metadataParams',type:'convertToParameters',templateString:template.metadata||'',decodeJSON:true},{name:'methodNameParams',type:'raw',value:template.methodName}]}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/GRPCQuery/model.ts
/* harmony default export */ const GRPCQuery_model = ((0,wrapQueryConfig["default"])(GRPCQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/JavascriptQuery/config.ts
const PLUGIN_TYPE='JavascriptQuery';/* harmony default export */ const JavascriptQuery_config = ((0,registry.registerQueryConfig)({name:PLUGIN_TYPE,template:{query:'',_additionalScope:[]},options:{propertyAnnotations:{query:{computeDependenciesInRawJS:['workflow'],type:'javascript'}},widgetOptions:{bypassScopeBarrier:true}},computeQueryParams:null,customizedRunQuery:({template,runCode})=>{return runCode(template.query,template.updateSetValueDynamically);},appTestingConfig:{getExtraEventPreconditionSelectors(context){const{event,pluginId}=context;if(event==='trigger'){const selectors=[[pluginId,'query'],[pluginId,'queryDisabled']];return selectors;}return AppTestingConfig.APP_TESTING_CONFIG_DEFAULT.getExtraEventPreconditionSelectors(context);}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/JavascriptQuery/model.ts
/* harmony default export */ const JavascriptQuery_model = ((0,wrapQueryConfig["default"])(JavascriptQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/KafkaQuery/model.ts
const KafkaQuery_model_computeQueryParams=template=>{return[{name:'value',type:'templateString',templateString:template.value,disallowJSON:false},{name:'topic',type:'templateString',templateString:template.topic,disallowJSON:true},{name:'consumerGroup',type:'templateString',templateString:template.consumerGroup,disallowJSON:true},{name:'partition',type:'templateString',templateString:template.partition.toString(),disallowJSON:true},{name:'offset',type:'templateString',templateString:template.offset.toString(),disallowJSON:true}];};class KafkaQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: KafkaQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: KafkaQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/KafkaQuery/config.ts
const DEFAULT_CONSUME_LIMIT='20';const DEFAULT_CONSUME_LIMIT_INT=parseInt(DEFAULT_CONSUME_LIMIT);const KafkaQuery_config_defaultTemplate={actionType:'consume',autoCommit:false,autoCommitInterval:5000,consumerGroup:'',headers:'',key:'',limit:DEFAULT_CONSUME_LIMIT_INT,offset:0,partition:0,timestamp:0,topic:'',value:''};/* harmony default export */ const KafkaQuery_config = ((0,registry.registerQueryConfig)({name:'KafkaQuery',template:KafkaQuery_config_defaultTemplate,queryProperties:['actionType','autoCommit','autoCommitInterval','clientId','consumerGroup','headers','key','limit','offset','partition','producerKey','timestamp','topic','value'],computeQueryParams: KafkaQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/KafkaQuery/model.ts
/* harmony default export */ const KafkaQuery_model = ((0,wrapQueryConfig["default"])(KafkaQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/LambdaQuery/config.ts
const LambdaQuery_config_defaultTemplate={functionName:'',functionPayload:'',functionInvocationType:'RequestResponse',runWhenModelUpdates:false};/* harmony default export */ const LambdaQuery_config = ((0,registry.registerQueryConfig)({name:'LambdaQuery',template:LambdaQuery_config_defaultTemplate,queryProperties:['functionName','functionPayload','functionInvocationType'],computeQueryParams:template=>{return generateConvertToParams({template,paramKeys:['functionName','functionPayload','functionInvocationType']});}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/LambdaQuery/model.ts
/* harmony default export */ const LambdaQuery_model = ((0,wrapQueryConfig["default"])(LambdaQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/NFCQuery/config.ts
/* harmony default export */ const NFCQuery_config = ((0,registry.registerQueryConfig)({name:'NFCQuery',template:{action:'read',text:'',runWhenModelUpdates:false},computeQueryParams:null,customizedRunQuery:({template,evaluateTemplateString,nfcRead,nfcWrite})=>{var _template$text;const text=evaluateTemplateString((_template$text=template.text)!==null&&_template$text!==void 0?_template$text:'');switch(template.action){case'read':return nfcRead();case'write':return nfcWrite({text});}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/NFCQuery/model.ts
/* harmony default export */ const NFCQuery_model = ((0,wrapQueryConfig["default"])(NFCQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/NoSqlQuery/config.ts
/* harmony default export */ const NoSqlQuery_config = ((0,registry.registerQueryConfig)({name:'NoSqlQuery',template:{database:'',collection:'',method:'find',query:'',projection:'',options:'',sortBy:'',skip:'',limit:'',field:'',aggregation:'',update:'',insert:'',operations:'',hint:'',useRawCollectionName:false,runWhenModelUpdates:true},queryProperties:['database','collection','method','query','projection','options','sortBy','skip','limit','field','aggregation','update','insert','operations','hint'],computeQueryParams:template=>{return[...generateConvertToParams({template,paramKeys:['field','query','update','insert','projection','options','sortBy','skip','limit','aggregation','collection']}),template.database?{type:'convertToParameters',name:'databaseParams',templateString:template.database}:{type:'raw',name:'databaseParams',value:{}},template.operations?{type:'convertToParameters',name:'operationsParams',templateString:template.operations}:{type:'raw',name:'operationsParams',value:{}},template.hint?{type:'convertToParameters',name:'hintParams',templateString:template.hint}:{type:'raw',name:'hintParams',value:{}}];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/NoSqlQuery/model.ts
/* harmony default export */ const NoSqlQuery_model = ((0,wrapQueryConfig["default"])(NoSqlQuery_config));
// EXTERNAL MODULE: ../packages/common/resources/common.ts + 2 modules
var common = __webpack_require__(130966);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/OpenAPIQuery/config.ts
/* harmony default export */ const OpenAPIQuery_config = ((0,registry.registerQueryConfig)({name:'OpenAPIQuery',template:{server:'',path:'',method:'',operationId:'',parameters:'',parameterDynamicStates:'',requestBody:'',requestBodyDynamicStates:'',specPathOverride:'',specBasePath:'',serverVariables:'',autoPaginate:false,autoPaginateLimit:common.AUTO_PAGINATED_DEFAULT_LIMIT},computeQueryParams:template=>{return[template.parameters?{name:'parametersParams',type:'convertToParameters',templateString:template.parameters,decodeJSON:true}:{name:'parametersParams',type:'null'},template.requestBody?{name:'requestBodyParams',type:'convertToParameters',templateString:template.requestBody,decodeJSON:true}:{name:'requestBodyParams',type:'null'},template.serverVariables?{name:'serverVariablesParams',type:'convertToParameters',templateString:template.serverVariables,decodeJSON:true}:{name:'serverVariablesParams',type:'null'}];},options:{propertyAnnotations:{serverVariables:{unescapeRetoolExpressions:true},requestBody:{unescapeRetoolExpressions:true},parameters:{unescapeRetoolExpressions:true}}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/OpenAPIQuery/model.ts
/* harmony default export */ const OpenAPIQuery_model = ((0,wrapQueryConfig["default"])(OpenAPIQuery_config,{}));
// EXTERNAL MODULE: ../frontend/src/components/plugins/datasources/ParentWindowQuery/model.ts + 3 modules
var ParentWindowQuery_model = __webpack_require__(435416);
// EXTERNAL MODULE: ../packages/common/files.ts
var files = __webpack_require__(74943);
;// CONCATENATED MODULE: ../packages/common/datasources/PdfExporterQuery/handleData.ts
const handleDownload=data=>{const blob=(0,files.b64toBlob)(data.file.data,'pdf',512);return blob;};/* harmony default export */ const handleData = (handleDownload);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PDFExporter/config.ts
/* harmony default export */ const PDFExporter_config = ((0,registry.registerQueryConfig)({name:'PDFExporter',template:{filename:'generatedpdf',markdownTemplate:'# Title\n## Subheader',runWhenModelUpdates:false},queryProperties:['filename','markdownTemplate'],computeQueryParams:template=>{return[...generateConvertToParams({template,paramKeys:['filename','markdownTemplate']})];},getQueryResponseHandler:({download})=>{return async data=>{const blobOrData=handleData(data);await download(blobOrData,data.file.name);return data;};}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PDFExporter/model.ts
/* harmony default export */ const PDFExporter_model = ((0,wrapQueryConfig["default"])(PDFExporter_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PushNotificationsQuery/getBundleId.ts
function getBundleId(){return;}/* harmony default export */ const PushNotificationsQuery_getBundleId = (getBundleId);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PushNotificationsQuery/config.ts
/* harmony default export */ const PushNotificationsQuery_config = ((0,registry.registerQueryConfig)({name:'PushNotificationsQuery',template:{deviceToken:'{{ retoolContext.devicePushToken }}',action:'Send',topics:['USER:{{someEmail}}'],deeplinkParams:undefined,deeplinkScreenParams:undefined,isDeeplinkEnabled:false,message:undefined,runWhenModelUpdates:false},queryProperties:['action','topics','message','deeplinkParams','deeplinkScreenParams','isDeeplinkEnabled'],computeQueryParams:template=>{const params=[{name:'actionParams',type:'templateString',templateString:template.action,disallowJSON:true},{name:'topicsParams',type:'templateString',templateString:JSON.stringify(template.topics),disallowJSON:true},{name:'platformParams',type:'templateString',templateString:'{{ retoolContext.platform }}',disallowJSON:true},{name:'environmentParams',type:'templateString',templateString: false?0:'production',disallowJSON:true}];if(template.action==='Subscribe'){params.push({name:'deviceTokenParams',type:'templateString',templateString:template.deviceToken,disallowJSON:true});}if(template.message){params.push({name:'messageParams',type:'templateString',templateString:template.message,disallowJSON:true});}if(template.isDeeplinkEnabled){if(template.deeplinkParams){params.push({name:'deeplinkParams',type:'templateString',templateString:template.deeplinkParams,disallowJSON:true});if(template.deeplinkScreenParams){params.push({name:'deeplinkScreenParams',type:'templateString',templateString:template.deeplinkScreenParams,disallowJSON:true});}}}const bundleId=PushNotificationsQuery_getBundleId();if(bundleId){params.push({name:'bundleIdParams',type:'templateString',templateString:bundleId,disallowJSON:true});}return params;}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PushNotificationsQuery/model.ts
/* harmony default export */ const PushNotificationsQuery_model = ((0,wrapQueryConfig["default"])(PushNotificationsQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PythonQuery/config.ts
/* harmony default export */ const PythonQuery_config = ((0,registry.registerQueryConfig)({name:'PythonQuery',template:{query:''},options:{},computeQueryParams:null,customizedRunQuery:({template,runCode})=>{return runCode(template.query);}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/PythonQuery/model.ts
/* harmony default export */ const PythonQuery_model = ((0,wrapQueryConfig["default"])(PythonQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RedisQuery/config.ts
/* harmony default export */ const RedisQuery_config = ((0,registry.registerQueryConfig)({name:'RedisQuery',template:{rawCommand:'',command:'',key:'',keys:'',value:'',field:'',fields:'',index:'',count:'',start:'',stop:'',source:'',destination:'',member:'',score:'',min:'',max:'',pattern:'',withscores:false,rev:false,runWhenModelUpdates:true},queryProperties:['command'],computeQueryParams:template=>{if(template.type==='raw'){return[{type:'raw',name:'type',value:'raw'},{type:'convertToParameters',templateString:template.rawCommand,decodeJSON:true,name:'rawCommandParams'}];}else{return[{type:'raw',name:'type',value:'gui'},...generateConvertToParams({template,paramKeys:['command','key','keys','value','field','fields','index','count','start','stop','source','destination','member','score','min','max','pattern'],sharedConfig:{decodeJSON:true}})];}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RedisQuery/model.ts
/* harmony default export */ const RedisQuery_model = ((0,wrapQueryConfig["default"])(RedisQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RESTQuery/config.ts
/* harmony default export */ const RESTQuery_config = ((0,registry.registerQueryConfig)({name:'RESTQuery',template:{query:'',type:'GET',headers:'',body:'',cookies:'',bodyType:'none',paginationEnabled:false,paginationLimit:'',paginationDataField:'',paginationPaginationField:'',version:2,runWhenModelUpdates:true},queryProperties:['query','headers','body','cookies'],computeQueryParams:template=>{const bodyType=template.bodyType;const decodeBodyAsJSON=bodyType==='json'||bodyType==='form'||bodyType==='form-data';return[{name:'queryParams',type:'convertToParameters',templateString:template.query},{name:'headersParams',type:'convertToParameters',templateString:template.headers,decodeJSON:true},{name:'cookiesParams',type:'convertToParameters',templateString:template.cookies,decodeJSON:true},{name:'bodyParams',type:'convertToParameters',templateString:template.body,decodeJSON:decodeBodyAsJSON}];},options:{propertyAnnotations:{headers:{unescapeRetoolExpressions:true},body:{unescapeRetoolExpressions:true}}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RESTQuery/model.ts
/* harmony default export */ const RESTQuery_model = ((0,wrapQueryConfig["default"])(RESTQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RethinkDBQuery/config.ts
/* harmony default export */ const RethinkDBQuery_config = ((0,registry.registerQueryConfig)({name:'RethinkDBQuery',template:{method:'get',table:'',id:'',value:'',where:'',pluck:'',runWhenModelUpdates:true},queryProperties:['method','table','id','value','where','pluck'],computeQueryParams:template=>{return[{type:'convertToParameters',name:'methodParams',templateString:template.method},...generateConvertToParams({template,paramKeys:['table','id','value','where','pluck'],sharedConfig:{decodeJSON:true}})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RethinkDBQuery/model.ts
/* harmony default export */ const RethinkDBQuery_model = ((0,wrapQueryConfig["default"])(RethinkDBQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/RetoolAIAgent/model.ts
const RetoolAIAgent_model_computeQueryParams=template=>{var _template$customSyste,_template$customTempe,_template$hitlAdditio,_template$vectorDynam;return[{name:'instruction',type:'templateString',templateString:wrapTemplateWithStringify(template.instruction),disallowJSON:false},{name:'customSystemMessage',type:'templateString',templateString:(_template$customSyste=template.customSystemMessage)!==null&&_template$customSyste!==void 0?_template$customSyste:'',disallowJSON:false},{name:'customTemperature',type:'templateString',templateString:(_template$customTempe=template.customTemperature)!==null&&_template$customTempe!==void 0?_template$customTempe:'',disallowJSON:false},{name:'hitlAdditionalContext',type:'templateString',templateString:(_template$hitlAdditio=template.hitlAdditionalContext)!==null&&_template$hitlAdditio!==void 0?_template$hitlAdditio:'',disallowJSON:false},{name:'vectorDynamicNamespaces',type:'templateString',templateString:(_template$vectorDynam=template.vectorDynamicNamespaces)!==null&&_template$vectorDynam!==void 0?_template$vectorDynam:'',disallowJSON:false}];};class RetoolAIAgentQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: RetoolAIAgent_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: RetoolAIAgent_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolAIAgent/config.ts
const RETOOL_AI_AGENT_DEFAULT_TEMPLATE={runWhenModelUpdates:false,queryTimeout:'120000',action:'agentExecution',instruction:'',model:'gpt-4o-mini',systemMessage:'You are a helpful assistant',customSystemMessage:'',customTemperature:'1',hitlModeEnabled:true,hitlAdditionalContext:'',toolUseEnabled:false,toolUseList:[],vectorModeEnabled:false,vectorNamespaceIds:[],vectorDynamicNamespaces:'',vectorNamespacesDynamicModeEnabled:false};/* harmony default export */ const RetoolAIAgent_config = ((0,registry.registerQueryConfig)({name:'RetoolAIAgent',template:RETOOL_AI_AGENT_DEFAULT_TEMPLATE,queryProperties:['instruction','systemMessage'],computeQueryParams: RetoolAIAgent_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolAIAgent/model.ts
/* harmony default export */ const RetoolAIAgent_model = ((0,wrapQueryConfig["default"])(RetoolAIAgent_config));
// EXTERNAL MODULE: ../packages/common/RetoolStorage/RetoolFileObject.ts
var RetoolFileObject = __webpack_require__(115373);
// EXTERNAL MODULE: ../packages/runtimeShared/valueType/cast.ts + 1 modules
var cast = __webpack_require__(444367);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolAIQuery/config.ts
const transformDynamicFileSource=result=>{if(!Array.isArray(result)){throw new Error('Expected file source to be an array');}return result.map(item=>{if((0,RetoolFileObject.isRetoolFileObject)(item)){return item;}if(typeof item==='string'){return{base64Data:item,type:'unknown',name:'unknown',sizeBytes:0};}throw new Error('Invalid value passed to file source');});};const getDocumentParsingParams=template=>{const documentTemplate=template.fileSource;if(template.fileUseDynamicSource){return[{name:'documentParams',type:'templateString',templateString:template.fileSource,disallowJSON:false,transform:transformDynamicFileSource}];}const documentParamsConfig={type:'fromPluginModel',name:'documentParams',compute:({getPluginModelObjects})=>{return getPluginModelObjects(documentTemplate).flatMap(model=>getAttachmentsFromPluginModel(model));}};return[...generateConvertToParams({template,paramKeys:[]}),documentParamsConfig];};const getAttachmentsFromPluginModel=pluginModel=>{const{value,files}=pluginModel;const base64Array=(0,cast.toBase64Array)(value);const metadataArray=(0,cast.toFileArray)(files);return base64Array.map((data,index)=>{const{name,type,size}=metadataArray[index];return{base64Data:data,type,name,sizeBytes:size};});};const computeQueryParamsWithDocuments=template=>{if(template.action==='documentParsing'){return getDocumentParsingParams(template);}return RetoolAIQuery_model_computeQueryParams(template);};const RETOOL_AI_DEFAULT_QUERY_TEMPLATE={runWhenModelUpdates:false,queryTimeout:'120000',action:'textGeneration',instruction:'',defaultModelInitialized:false,model:types.DEFAULT_RETOOL_AI_MODEL,providerName:types.DEFAULT_RETOOL_AI_PROVIDER,providerId:(0,types.getDefaultRetoolAIProviderId)(types.DEFAULT_RETOOL_AI_MODEL),systemMessage:'You are a helpful assistant',customSystemMessage:'',customTemperature:'1',vectorSemanticSearchString:'',vectorModeEnabled:false,vectorNamespaceIds:[],vectorNamespaceIdsFilters:[],vectorDynamicNamespaces:'',vectorNamespacesDynamicModeEnabled:false,vectorAction:'upsertDocument',vectorNamespaceId:'',vectorCreateAndFetchDynamicModeEnabled:false,vectorActionDynamicNamespace:'',vectorActionNamespaceDynamicModeEnabled:false,vectorUrls:[],vectorDynamicUrls:'',source:'',content:'',textClassifierLabels:[],textClassifierDynamicLabels:'',textClassifierDynamicModeEnabled:false,textExtractorLabels:[],textExtractorDynamicLabels:'',textExtractorDynamicModeEnabled:false,multimodalModel:'gpt-4o',imageModel:'dall-e-3',imageContent:'',imageClassifierLabels:[],imageClassifierDynamicLabels:'',imageClassifierDynamicModeEnabled:false,imageExtractorLabels:[],imageExtractorDynamicLabels:'',imageExtractorDynamicModeEnabled:false,chatInput:'',chatHistory:'',fileSource:'',fileUseDynamicSource:false,streamResponse:true};/* harmony default export */ const RetoolAIQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolAIQuery',template:RETOOL_AI_DEFAULT_QUERY_TEMPLATE,queryProperties:['instruction','systemMessage'],computeQueryParams:computeQueryParamsWithDocuments}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolAIQuery/model.ts
/* harmony default export */ const RetoolAIQuery_model = ((0,wrapQueryConfig["default"])(RetoolAIQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolApprovalWorkflowQuery/config.ts
const RetoolApprovalWorkflowQuery_config_defaultTemplate={runWhenModelUpdates:true,selectedAction:'getTasks',finalized:'',approved:'',data:'',metadata:'',key:'',choice:'',userEmail:'',executionStatus:''};/* harmony default export */ const RetoolApprovalWorkflowQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolApprovalWorkflowQuery',template:RetoolApprovalWorkflowQuery_config_defaultTemplate,computeQueryParams:template=>{return[...generateConvertToParams({template,paramKeys:['key','choice','finalized','approved','userEmail','executionStatus']}),...generateConvertToParams({template,paramKeys:['data','metadata'],sharedConfig:{decodeJSON:true}})];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolApprovalWorkflowQuery/model.ts
/* harmony default export */ const RetoolApprovalWorkflowQuery_model = ((0,wrapQueryConfig["default"])(RetoolApprovalWorkflowQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/RetoolSDKQuery/model.ts
const RetoolSDKQuery_model_computeQueryParams=template=>{return Object.keys(template.args).map(key=>{const templateArgKey=template.args[key];const templateString=typeof templateArgKey==='string'?templateArgKey:'';return{type:'convertToParameters',name:`args.${key}`,templateString};});};class RetoolSDKQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: RetoolSDKQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: RetoolSDKQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolSDKQuery/config.ts
/* harmony default export */ const RetoolSDKQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolSDKQuery',template:{args:{},functionName:null,runWhenModelUpdates:false},computeQueryParams: RetoolSDKQuery_model_computeQueryParams,options:{propertyAnnotations:{}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolSDKQuery/model.ts
/* harmony default export */ const RetoolSDKQuery_model = ((0,wrapQueryConfig["default"])(RetoolSDKQuery_config));
// EXTERNAL MODULE: ../node_modules/.pnpm/js-base64@3.7.2/node_modules/js-base64/base64.mjs
var base64 = __webpack_require__(946784);
// EXTERNAL MODULE: ../packages/common/datasources/s3/b64toBlob.ts
var s3_b64toBlob = __webpack_require__(561706);
// EXTERNAL MODULE: ../packages/common/datasources/s3/s3Helper.native-web.ts + 1 modules
var s3Helper_native_web = __webpack_require__(103173);
;// CONCATENATED MODULE: ../packages/common/plugins/files/toArray.ts
const toArray=value=>Array.isArray(value)?value:value.toArray();
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolStorageQuery/config.ts
function RetoolStorageQuery_config_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function RetoolStorageQuery_config_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?RetoolStorageQuery_config_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):RetoolStorageQuery_config_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const RetoolStorageQuery_config_defaultTemplate={actionType:'list',fileName:'',fileId:'',data:'',uploadBy:'component',selectFolderNameBy:'dropdown',folderName:'',dataSource:[],dynamicFileId:false,shouldOverwriteOnNameCollision:false,isPublic:false,newFolderName:'',pageSize:'100',pageNumber:'1'};async function blobFromQueryData(queryData){if(queryData.error){throw new Error('Do not upload error data');}let blob;if(base64.Base64.isValid(queryData.base64Data)){blob=(0,s3_b64toBlob.b64toBlob)(queryData.base64Data,queryData.ContentType,null);}else{blob=new s3Helper_native_web.Blob([queryData.base64Data],{type:queryData.ContentType});}return blob;}function config_getPerformDownload(download){return async data=>{if(data.error){return{};}const blob=await blobFromQueryData(data);await download(blob,data.name);return{};};}/* harmony default export */ const RetoolStorageQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolStorageQuery',template:RetoolStorageQuery_config_objectSpread(RetoolStorageQuery_config_objectSpread({},RetoolStorageQuery_config_defaultTemplate),{},{runWhenModelUpdates:true}),queryProperties:['actionType'],computeQueryParams:template=>{const attachmentTemplate=template.dataSource;const attachmentParamsConfig={type:'fromPluginModel',name:'attachmentParams',compute:({getPluginModelObjects})=>{return toArray(attachmentTemplate).flatMap(id=>{return getPluginModelObjects(id).flatMap(model=>config_getAttachmentsFromPluginModel(model));});}};return[...generateConvertToParams({template,paramKeys:['fileId','fileName','data','folderName','newFolderName','pageSize','pageNumber'],mapper:k=>k||''}),attachmentParamsConfig];},getQueryResponseHandler:({template,download})=>{if(template.actionType==='download'){return config_getPerformDownload(download);}}}));const config_getAttachmentsFromPluginModel=pluginModel=>{const{value,files}=pluginModel;const base64Array=(0,cast.toBase64Array)(value);const metadataArray=(0,cast.toFileArray)(files);return base64Array.map((data,index)=>{const{name}=metadataArray[index];return{data,name};});};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolStorageQuery/model.ts
/* harmony default export */ const RetoolStorageQuery_model = ((0,wrapQueryConfig["default"])(RetoolStorageQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/SqlQuery/writeModel.ts
const writeModel_computeQueryParams=evaluateTableName=>template=>{const common=[...generateConvertToParams({template,paramKeys:['databaseUsernameOverride','databasePasswordOverride','databaseNameOverride','databaseHostOverride','databaseRoleOverride','databaseWarehouseOverride'],mapper:value=>value||''}),...(evaluateTableName?[{type:'convertToParameters',templateString:template.tableName,name:'tableParams'}]:[])];if(template.actionType==='BULK_INSERT'||template.actionType==='BULK_UPDATE_BY_KEY'||template.actionType==='BULK_UPSERT_BY_KEY'){return[...common,{type:'templateString',name:'records',templateString:template.records,disallowJSON:true}];}else{const filterByParams={type:'convertToParameters',decodeJSON:true,templateString:template.filterBy,name:'filterByParams',castUndefinedToNull:true};if(template.changesetIsObject){return[...common,filterByParams,{type:'templateString',name:'changeset',disallowJSON:true,templateString:template.changesetObject}];}else{return[...common,filterByParams,{type:'convertToParameters',name:'changesetParams',decodeJSON:true,castUndefinedToNull:true,templateString:template.changeset}];}}};class SqlQueryWriteModelEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getFallbackEvaluatedTemplate=getFallbackEvaluatedTemplate;}getRunQueryParams=async({template,model,evaluateTableName=false,instance})=>{return utils_wrapComputeQueryParams({computeQueryParams:writeModel_computeQueryParams(evaluateTableName),convertToParameters:this.convertToParameters,evaluate:this.evaluate})({template,model,instance});};getEvaluatedTemplate=async({template,model,evaluateTableName=false,instance})=>{return wrapGetEvaluatedTemplate({computeQueryParams:writeModel_computeQueryParams(evaluateTableName),evaluate:this.evaluate,getFallbackEvaluatedTemplate:this.getFallbackEvaluatedTemplate})({template,model,instance});};}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolTableQuery/config.ts
/* harmony default export */ const RetoolTableQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolTableQuery',template:{actionType:'',tableName:'',recordId:'',records:'',filterBy:'',changeset:'',bulkUpdatePrimaryKey:'',runWhenModelUpdates:false,enableBulkUpdates:false,doNotThrowOnNoOp:false,databaseNameOverride:'',databaseHostOverride:'',databaseUsernameOverride:'',databasePasswordOverride:'',databaseRoleOverride:'',databaseWarehouseOverride:''},computeQueryParams:writeModel_computeQueryParams(false)}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolTableQuery/model.ts
/* harmony default export */ const RetoolTableQuery_model = ((0,wrapQueryConfig["default"])(RetoolTableQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolUserActionQuery/config.ts
/* harmony default export */ const RetoolUserActionQuery_config = ((0,registry.registerQueryConfig)({name:'RetoolUserActionQuery',template:{actionCategory:'account',actionType:'login',loginMethod:'email_password',email:'',password:'',version:2,firstName:'',lastName:'',newPassword:'',metadata:'[]',userTaskInstanceId:'',userTaskInstanceIds:'[]',outputPayload:'',outputType:'single',selectedWorkflowIds:'[]',selectedUserTaskDefinitionIds:'[]',selectedStatuses:'[]',selectedGroupIds:'[]',cancellationReason:'',createdAfter:'',createdBefore:'',completedAfter:'',completedBefore:'',limit:'',nextToken:''},computeQueryParams:null,customizedRunQuery:({template,evaluateTemplateString,loginAction,logoutAction,resetPasswordAction,claimInvitationAction,confirmResetPasswordAction,requestPasswordlessLoginAction,getAppsAndFoldersAction,getUserTask,getUserTasks,completeUserTask,bulkSubmitUserTasks,reassignUserTask,cancelUserTask})=>{var _template$email,_template$password,_template$firstName,_template$lastName,_template$newPassword,_template$metadata,_template$userTaskIns,_template$userTaskIns2,_template$outputPaylo,_template$outputType,_template$selectedWor,_template$selectedUse,_template$selectedSta,_template$selectedGro,_template$cancellatio,_template$createdAfte,_template$createdBefo,_template$completedAf,_template$completedBe,_template$limit,_template$nextToken;const email=evaluateTemplateString((_template$email=template.email)!==null&&_template$email!==void 0?_template$email:'');const password=evaluateTemplateString((_template$password=template.password)!==null&&_template$password!==void 0?_template$password:'');const firstName=evaluateTemplateString((_template$firstName=template.firstName)!==null&&_template$firstName!==void 0?_template$firstName:'');const lastName=evaluateTemplateString((_template$lastName=template.lastName)!==null&&_template$lastName!==void 0?_template$lastName:'');const newPassword=evaluateTemplateString((_template$newPassword=template.newPassword)!==null&&_template$newPassword!==void 0?_template$newPassword:'');const metadataArr=evaluateTemplateString((_template$metadata=template.metadata)!==null&&_template$metadata!==void 0?_template$metadata:'[]');const userTaskInstanceId=evaluateTemplateString((_template$userTaskIns=template.userTaskInstanceId)!==null&&_template$userTaskIns!==void 0?_template$userTaskIns:'');const userTaskInstanceIds=evaluateTemplateString((_template$userTaskIns2=template.userTaskInstanceIds)!==null&&_template$userTaskIns2!==void 0?_template$userTaskIns2:'[]');const outputPayload=evaluateTemplateString((_template$outputPaylo=template.outputPayload)!==null&&_template$outputPaylo!==void 0?_template$outputPaylo:'');const outputType=evaluateTemplateString((_template$outputType=template.outputType)!==null&&_template$outputType!==void 0?_template$outputType:'single');const selectedWorkflowIds=evaluateTemplateString((_template$selectedWor=template.selectedWorkflowIds)!==null&&_template$selectedWor!==void 0?_template$selectedWor:'[]');const selectedUserTaskDefinitionIds=evaluateTemplateString((_template$selectedUse=template.selectedUserTaskDefinitionIds)!==null&&_template$selectedUse!==void 0?_template$selectedUse:'[]');const selectedStatuses=evaluateTemplateString((_template$selectedSta=template.selectedStatuses)!==null&&_template$selectedSta!==void 0?_template$selectedSta:'[]');const selectedGroupIds=evaluateTemplateString((_template$selectedGro=template.selectedGroupIds)!==null&&_template$selectedGro!==void 0?_template$selectedGro:'[]');const cancellationReason=evaluateTemplateString((_template$cancellatio=template.cancellationReason)!==null&&_template$cancellatio!==void 0?_template$cancellatio:'');const createdAfter=evaluateTemplateString((_template$createdAfte=template.createdAfter)!==null&&_template$createdAfte!==void 0?_template$createdAfte:'');const createdBefore=evaluateTemplateString((_template$createdBefo=template.createdBefore)!==null&&_template$createdBefo!==void 0?_template$createdBefo:'');const completedAfter=evaluateTemplateString((_template$completedAf=template.completedAfter)!==null&&_template$completedAf!==void 0?_template$completedAf:'');const completedBefore=evaluateTemplateString((_template$completedBe=template.completedBefore)!==null&&_template$completedBe!==void 0?_template$completedBe:'');const limit=evaluateTemplateString((_template$limit=template.limit)!==null&&_template$limit!==void 0?_template$limit:'');const nextToken=evaluateTemplateString((_template$nextToken=template.nextToken)!==null&&_template$nextToken!==void 0?_template$nextToken:'');const metadata={};metadataArr.forEach(({key,value})=>{metadata[key]=value;});switch(template.actionType){case'login':return loginAction({email,password,loginMethod:template.loginMethod});case'logout':return logoutAction();case'reset_password':return resetPasswordAction({email});case'claim_invitation':return claimInvitationAction({password:password===''?undefined:password,firstName,lastName,metadata});case'confirm_reset_password':return confirmResetPasswordAction({newPassword});case'request_passwordless_login':return requestPasswordlessLoginAction({email});case'get_apps_and_folders':return getAppsAndFoldersAction();case'get_task':return getUserTask({userTaskInstanceId});case'get_tasks':return getUserTasks({workflowIds:selectedWorkflowIds,userTaskDefinitionIds:selectedUserTaskDefinitionIds,statuses:selectedStatuses,createdAfter,createdBefore,completedAfter,completedBefore,limit,nextToken});case'complete_task':return completeUserTask({userTaskInstanceId,outputPayload});case'bulk_submit_tasks':return bulkSubmitUserTasks({userTaskIds:userTaskInstanceIds,outputPayload,type:outputType});case'reassign_task':return reassignUserTask({userTaskInstanceId,groupIds:selectedGroupIds});case'cancel_task':return cancelUserTask({userTaskInstanceId,reason:cancellationReason});}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/RetoolUserActionQuery/model.ts
/* harmony default export */ const RetoolUserActionQuery_model = ((0,wrapQueryConfig["default"])(RetoolUserActionQuery_config,{name:'RetoolUserActionQuery'}));
// EXTERNAL MODULE: ../packages/common/datasources/s3/handleResponseHelpers.ts
var handleResponseHelpers = __webpack_require__(182186);
// EXTERNAL MODULE: ../packages/common/datasources/utils/blob.ts
var utils_blob = __webpack_require__(681072);
// EXTERNAL MODULE: ../packages/common/datasources/utils/getDefaultHeaders.native-web.ts
var getDefaultHeaders_native_web = __webpack_require__(247342);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/S3Query/config.ts
function S3Query_config_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function S3Query_config_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?S3Query_config_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):S3Query_config_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const S3Query_config_defaultTemplate={actionType:'list',bucketName:'',fileKey:'',delimiter:'',maxKeys:'',prefix:'',continuationToken:'',uploadFileType:'csv',uploadFileName:'export.csv',uploadData:'',useRawUploadFileType:false,copySource:'',tagSet:'',signedOperationName:'',signedOperationOptions:'',runWhenModelUpdates:true};function S3Query_config_getPerformDownload(download){return async data=>{if(data.error){return{};}const blob=await (0,handleResponseHelpers.blobFromQueryData)(data);await download(blob,data.Key);return{};};}function config_getPerformUpload(queryModel,evalTemplate,upload){return async data=>{const uploadData=evalTemplate(queryModel.uploadData);const blob=await (0,handleResponseHelpers.blobToUploadFromData)(uploadData,data.fileType);const{shouldIncludeACLHeader,acl}=data;let headers=S3Query_config_objectSpread({},shouldIncludeACLHeader?{'x-amz-acl':acl}:undefined);if((0,utils_blob.isBlobUrl)(uploadData)){const blobUrlHeaders=(0,getDefaultHeaders_native_web.getDefaultHeadersForBlobUrl)(data.fileType);if(blobUrlHeaders){var _headers;headers=S3Query_config_objectSpread(S3Query_config_objectSpread({},(_headers=headers)!==null&&_headers!==void 0?_headers:{}),blobUrlHeaders);}}if(data.fileType==='binary'&&base64.Base64.isValid(uploadData)){const binaryHeaders=(0,getDefaultHeaders_native_web.getDefaultHeadersForBinary)();if(binaryHeaders){var _headers2;headers=S3Query_config_objectSpread(S3Query_config_objectSpread({},(_headers2=headers)!==null&&_headers2!==void 0?_headers2:{}),binaryHeaders);}}const result=await upload(blob,data.signedUrl,headers);if(result.ok){return{signedUrl:data.signedUrl,fileName:data.fileName,fileType:data.fileType};}return{statusCode:result.statusCode,statusText:result.statusText,text:result.text};};}/* harmony default export */ const S3Query_config = ((0,registry.registerQueryConfig)({name:'S3Query',template:S3Query_config_defaultTemplate,queryProperties:['actionType','bucketName','fileKey','prefix','delimiter','maxKeys','continuationToken'],computeQueryParams:template=>{return[...generateConvertToParams({template,paramKeys:['bucketName','fileKey','delimiter','maxKeys','prefix','continuationToken','signedOperationName','signedOperationOptions','uploadFileName','uploadFileType','copySource','tagSet']})];},getQueryResponseHandler:({template,evaluateTemplateString,download,upload})=>{if(template.actionType==='download'){return S3Query_config_getPerformDownload(download);}else if(template.actionType==='upload'){return config_getPerformUpload(template,evaluateTemplateString,upload);}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/S3Query/model.ts
/* harmony default export */ const S3Query_model = ((0,wrapQueryConfig["default"])(S3Query_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SalesforceQuery/config.ts
/* harmony default export */ const SalesforceQuery_config = ((0,registry.registerQueryConfig)({name:'SalesforceQuery',template:{queryType:'soql',SOQLQuery:'',SOQLQueryAutoFlatten:false,crudAction:'retrieve',crudResourceType:'',crudResourceID:'',crudResourceBody:'',apexMethod:'get',apexPath:'',apexBody:'',bulkLoadType:'',bulkLoadAction:'',bulkLoadOptions:'',bulkRecords:'',runWhenModelUpdates:true},queryProperties:['queryType','SOQLQuery','crudAction','crudResourceType','crudResourceID','crudResourceBody','apexMethod','apexPath','apexBody','bulkLoadType','bulkLoadAction','bulkRecords'],computeQueryParams:template=>{return[{name:'SOQLQueryParams',type:'convertToParameters',templateString:template.SOQLQuery},{name:'crudResourceTypeParams',type:'convertToParameters',templateString:template.crudResourceType},{name:'crudResourceIDParams',type:'convertToParameters',templateString:template.crudResourceID},{name:'crudResourceBodyParams',type:'convertToParameters',templateString:template.crudResourceBody},{name:'apexPathParams',type:'convertToParameters',templateString:template.apexPath},{name:'apexBodyParams',type:'convertToParameters',templateString:template.apexBody},{name:'bulkLoadTypeParams',type:'convertToParameters',templateString:template.bulkLoadType},{name:'bulkLoadActionParams',type:'convertToParameters',templateString:template.bulkLoadAction},{name:'bulkLoadOptionsParams',type:'convertToParameters',templateString:template.bulkLoadOptions},{name:'bulkRecordsParams',type:'convertToParameters',templateString:template.bulkRecords}];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SalesforceQuery/docs.tsx
const SalesforceQuery_docs_link='https://docs.retool.com/queries/guides/sql/';const docs_properties={description:'An SQL query that reads data from a database. Commonly used: `.data`',data:{name:'data',label:'Query data',docs:`You can use the \`.data\` property to refer to the result of this query.`}};/* harmony default export */ const SalesforceQuery_docs = ({link: SalesforceQuery_docs_link,properties: docs_properties});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SalesforceQuery/model.ts
/* harmony default export */ const SalesforceQuery_model = ((0,wrapQueryConfig["default"])(SalesforceQuery_config,{docs: SalesforceQuery_docs}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ShellQuery/config.ts
const ShellQuery_config_defaultTemplate={query:''};/* harmony default export */ const ShellQuery_config = ((0,registry.registerQueryConfig)({name:'ShellQuery',template:ShellQuery_config_defaultTemplate,computeQueryParams:template=>[{name:'queryParams',type:'convertToParameters',templateString:template.query}]}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ShellQuery/model.ts
/* harmony default export */ const ShellQuery_model = ((0,wrapQueryConfig["default"])(ShellQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SlackQuery/config.ts
/* harmony default export */ const SlackQuery_config = ((0,registry.registerQueryConfig)({name:'SlackQuery',template:{message:'',channel:'',useSlackMarkdown:false},queryProperties:[],computeQueryParams:template=>{return[{name:'messageParams',type:'convertToParameters',templateString:template.message},{name:'channelParams',type:'convertToParameters',templateString:template.channel},{name:'slackMarkdownParams',type:'raw',value:template.useSlackMarkdown}];}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SlackQuery/model.ts
/* harmony default export */ const SlackQuery_model = ((0,wrapQueryConfig["default"])(SlackQuery_config));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SmartQuery/config.ts
/* harmony default export */ const SmartQuery_config = ((0,registry.registerQueryConfig)({name:'SmartQuery',template:{instruction:'',model:'gpt-4o-mini',systemMessage:'You are a helpful assistant',vectorSemanticSearchString:'',vectorModeEnabled:false,vectorNamespaceIds:[],streamResponse:false,streamingText:''},computeQueryParams:null,customizedRunQuery:async({runQueryGpt,template,evaluateTemplateString,updateModelForQueryRunOnly,id})=>{const prompt=String(evaluateTemplateString(template.instruction));const systemMessage=String(evaluateTemplateString(template.systemMessage));const vectorSemanticSearchString=template.vectorSemanticSearchString?String(evaluateTemplateString(template.vectorSemanticSearchString)):'';const model=String(template.model);return runQueryGpt({model,messages:[{role:'system',content:systemMessage},{role:'user',content:prompt}],vectorSemanticSearchString,vectorModeEnabled:template.vectorModeEnabled,vectorNamespaceIds:template.vectorNamespaceIds,stream:!!template.streamResponse,originService:'appSmartQuery'},streamText=>{updateModelForQueryRunOnly([{selector:[id,'streamingText'],newValue:streamText}]);});}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SmartQuery/model.ts
/* harmony default export */ const SmartQuery_model = ((0,wrapQueryConfig["default"])(SmartQuery_config,{name:'SmartQuery'}));
// EXTERNAL MODULE: ../packages/common/plugins/files/FileObjectType.ts
var FileObjectType = __webpack_require__(859370);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SMTPQuery/config.ts
const SMTPQuery_config_defaultTemplate={fromEmail:'',showReplyTo:false,showCcBcc:false,replyToEmail:'',toEmail:'',ccEmail:'',bccEmail:'',subject:'',body:'',bodyType:'text',attachment:immutable_es["default"].List([])};/* harmony default export */ const SMTPQuery_config = ((0,registry.registerQueryConfig)({name:'SMTPQuery',template:SMTPQuery_config_defaultTemplate,options:{propertyAnnotations:{attachment:{type:'pluginIdList'}}},queryProperties:['metadata'],computeQueryParams:template=>{const attachmentTemplate=template.attachment;const attachmentParamsConfig=typeof attachmentTemplate==='string'?{type:'convertToParameters',name:'attachmentParams',decodeJSON:true,templateString:attachmentTemplate}:{type:'fromPluginModel',name:'attachmentParams',compute:({getPluginModelObjects})=>{return toArray(attachmentTemplate).flatMap(id=>{return getPluginModelObjects(id).flatMap(model=>SMTPQuery_config_getAttachmentsFromPluginModel(model));});}};return[...generateConvertToParams({template,paramKeys:['fromEmail','replyToEmail','toEmail','ccEmail','bccEmail','subject','body','bodyType'],sharedConfig:{decodeJSON:true}}),attachmentParamsConfig];}}));const SMTPQuery_config_getAttachmentsFromPluginModel=pluginModel=>{const{value,files}=pluginModel;const base64Array=(0,cast.toBase64Array)(value);const metadataArray=(0,cast.toFileArray)(files);return base64Array.map((data,index)=>{const{type,name}=metadataArray[index];return{type:FileObjectType.FILE_OBJECT_TYPE,data,name,contentType:type};});};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SMTPQuery/model.ts
/* harmony default export */ const SMTPQuery_model = ((0,wrapQueryConfig["default"])(SMTPQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/SnsQuery/model.ts
const SnsQuery_model_computeQueryParams=template=>{return[{name:'value',type:'templateString',templateString:template.value,disallowJSON:false},{name:'topicArn',type:'templateString',templateString:template.topicArn,disallowJSON:true}];};class SnsQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: SnsQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: SnsQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SNSQuery/config.ts
const SNSQuery_config_defaultTemplate={topicArn:'',value:''};/* harmony default export */ const SNSQuery_config = ((0,registry.registerQueryConfig)({name:'SNSQuery',template:SNSQuery_config_defaultTemplate,queryProperties:['topicArn','value'],computeQueryParams: SnsQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SNSQuery/model.ts
/* harmony default export */ const SNSQuery_model = ((0,wrapQueryConfig["default"])(SNSQuery_config));
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js
var isArray = __webpack_require__(125430);
var isArray_default = /*#__PURE__*/__webpack_require__.n(isArray);
;// CONCATENATED MODULE: ../packages/common/datasources/SqlQuery/readModel.ts
const readModel_computeQueryParams=template=>{return generateConvertToParams({template,paramKeys:['query','databaseNameOverride','databaseHostOverride','databaseUsernameOverride','databasePasswordOverride'],mapper:value=>value||''});};class SqlQueryReadModelEvaluator{constructor(convertToParameters){this.convertToParameters=convertToParameters;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: readModel_computeQueryParams,convertToParameters:this.convertToParameters});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlQuery/config.ts
/* harmony default export */ const SqlQuery_config = ((0,registry.registerQueryConfig)({name:'SqlQuery',template:{query:'',databaseNameOverride:'',databaseHostOverride:'',databaseUsernameOverride:'',databasePasswordOverride:'',databaseRoleOverride:'',databaseWarehouseOverride:'',shouldEnableBatchQuerying:false,shouldUseLegacySql:false,runWhenModelUpdates:true,dataArray:[],_additionalScope:[]},options:{propertyAnnotations:{data:{updatesSync:['dataArray']}}},queryProperties:['query','databaseNameOverride','databaseHostOverride','databaseUsernameOverride','databasePasswordOverride','shouldEnableBatchQuerying','shouldUseLegacySql'],computeQueryParams: readModel_computeQueryParams,formatResult:result=>{if(isArray_default()(result)){const data=result[0];const dataArray=result;return{data:data,dataArray};}else{return{data:result,dataArray:[result]};}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlQuery/docs.tsx
const SqlQuery_docs_link='https://docs.retool.com/queries/guides/sql/';const SqlQuery_docs_properties={description:'A SQL query that reads data from a database. Commonly used: `.data`',data:{name:'data',label:'Query data',docs:`
You can use the \`.data\` property to refer to the result of this query.
The data returned is in [columnar format](https://docs.retool.com/queries/guides/sql/").
If you want to use the data as an array of objects you can use the helper function \`formatDataAsArray\`
`}};/* harmony default export */ const SqlQuery_docs = ({link: SqlQuery_docs_link,properties: SqlQuery_docs_properties});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlQuery/model.ts
/* harmony default export */ const SqlQuery_model = ((0,wrapQueryConfig["default"])(SqlQuery_config,{docs: SqlQuery_docs}));
// EXTERNAL MODULE: ../frontend/src/common/records.ts + 1 modules
var records = __webpack_require__(224228);
;// CONCATENATED MODULE: ../packages/common/datasources/SqlQueryUnified/utils.ts
const getEditorModeFromTemplate=queryTemplate=>{return queryTemplate.editorMode;};
;// CONCATENATED MODULE: ../packages/common/datasources/SqlQueryUnified/model.ts
const SqlQueryUnified_model_computeQueryParams=template=>{const editorMode=getEditorModeFromTemplate(template);if(editorMode==='gui'){return writeModel_computeQueryParams(true)(template);}else{return readModel_computeQueryParams(template);}};class SqlQueryUnifiedEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: SqlQueryUnified_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: SqlQueryUnified_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlQueryUnified/config.ts
/* harmony default export */ const SqlQueryUnified_config = ((0,registry.registerQueryConfig)({name:'SqlQueryUnified',template:{query:'',dataArray:[],_additionalScope:[],actionType:'',tableName:'',recordId:'',records:'',filterBy:'',changeset:'',bulkUpdatePrimaryKey:'',enableBulkUpdates:false,doNotThrowOnNoOp:false,editorMode:'sql',databaseNameOverride:'',databaseHostOverride:'',databaseUsernameOverride:'',databasePasswordOverride:'',databaseRoleOverride:'',databaseWarehouseOverride:'',shouldEnableBatchQuerying:false,shouldUseLegacySql:false,runWhenModelUpdates:true},options:{docs:{},propertyAnnotations:{data:{updatesSync:['dataArray']}}},resourceSpecificTemplateDefaults:resource=>{var _settings$options,_settings$options$que,_settings$options2,_settings$options2$qu;const settings=resource.production;if(((_settings$options=settings.options)===null||_settings$options===void 0?void 0:(_settings$options$que=_settings$options.queryEditorModes)===null||_settings$options$que===void 0?void 0:_settings$options$que.allowSqlMode)===false){return{editorMode:'gui',runWhenModelUpdates:false};}if(((_settings$options2=settings.options)===null||_settings$options2===void 0?void 0:(_settings$options2$qu=_settings$options2.queryEditorModes)===null||_settings$options2$qu===void 0?void 0:_settings$options2$qu.allowGuiMode)===false){return{editorMode:'sql',runWhenModelUpdates:false};}return{};},queryProperties:['tableName','query','databaseNameOverride','databaseHostOverride','databaseUsernameOverride','databasePasswordOverride','databaseRoleOverride','databaseWarehouseOverride','shouldEnableBatchQuerying','shouldUseLegacySql'],computeQueryParams: SqlQueryUnified_model_computeQueryParams,formatResult:(result,template)=>{const editorMode=getEditorModeFromTemplate(template);if(editorMode==='sql'){if(isArray_default()(result)){const data=result[0];const dataArray=result;return{data,dataArray};}else{return{data:result,dataArray:[result]};}}return{data:result,dataArray:[]};}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlQueryUnified/model.ts
const isUnifiedSqlResource=resourceSettings=>{var _resourceSettings$opt;return((_resourceSettings$opt=resourceSettings.options)===null||_resourceSettings$opt===void 0?void 0:_resourceSettings$opt.version)===records.SQL_QUERY_VERSION_UNIFIED;};const isResourceWritable=(resource,environment)=>{const resourceSettings=(0,records.resourceFromImmutable)(resource)[environment];if(resource.get('editorType')===records.SQL_QUERY_VERSION_UNIFIED){return true;}return!!(resourceSettings!==null&&resourceSettings!==void 0&&resourceSettings.editPrivilege);};const isLaunchedUnifiedSqlResource=resource=>{var _resource$options;const newResource=resource.id==null;return newResource||((_resource$options=resource.options)===null||_resource$options===void 0?void 0:_resource$options.version)===records.SQL_QUERY_VERSION_UNIFIED;};/* harmony default export */ const SqlQueryUnified_model = ((0,wrapQueryConfig["default"])(SqlQueryUnified_config));
;// CONCATENATED MODULE: ../packages/runtimeShared/datasources/utils/convertToParameterizedQuery.ts
function convertToParameterizedQuery(query){return query.replace(regexes.ANY_TEMPLATE_REGEX,()=>{return` ? `;});}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlTransformQuery/config.ts
function arrayFromParamsObject(params){if(!Object.prototype.hasOwnProperty.call(params,'length')){throw new Error('Unexpected params obj: must have a length property');}const result=[];for(let i=0;i<params.length;i++){result.push(params[i]);}return result;}/* harmony default export */ const SqlTransformQuery_config = ((0,registry.registerQueryConfig)({name:'SqlTransformQuery',template:{query:'',runWhenModelUpdates:true},queryProperties:['query'],computeQueryParams:null,customizedRunQuery:async({template,convertToQueryParams,runAlasqlQuery})=>{const parameterizedQuery=convertToParameterizedQuery(template.query);const queryParams=convertToQueryParams(template.query);return runAlasqlQuery(parameterizedQuery,arrayFromParamsObject(queryParams));}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SqlTransformQuery/model.ts
/* harmony default export */ const SqlTransformQuery_model = ((0,wrapQueryConfig["default"])(SqlTransformQuery_config));
;// CONCATENATED MODULE: ../packages/common/datasources/SqsQuery/model.ts
const SqsQuery_model_computeQueryParams=template=>{return[{name:'value',type:'templateString',templateString:template.value,disallowJSON:false},{name:'queueUrl',type:'templateString',templateString:template.queueUrl,disallowJSON:true},{name:'receiptHandle',type:'templateString',templateString:template.receiptHandle,disallowJSON:true},{name:'maxMessages',type:'templateString',templateString:template.maxMessages.toString(),disallowJSON:true}];};class SqsQueryEvaluator{constructor(convertToParameters,evaluate,getFallbackEvaluatedTemplate){this.convertToParameters=convertToParameters;this.evaluate=evaluate;this.getRunQueryParams=utils_wrapComputeQueryParams({computeQueryParams: SqsQuery_model_computeQueryParams,convertToParameters:this.convertToParameters,evaluate:this.evaluate});this.getEvaluatedTemplate=wrapGetEvaluatedTemplate({computeQueryParams: SqsQuery_model_computeQueryParams,evaluate:this.evaluate,getFallbackEvaluatedTemplate});}}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SQSQuery/config.ts
const SQSQuery_config_defaultTemplate={actionType:'send',queueUrl:'',value:'',receiptHandle:'',maxMessages:1};/* harmony default export */ const SQSQuery_config = ((0,registry.registerQueryConfig)({name:'SQSQuery',template:SQSQuery_config_defaultTemplate,queryProperties:['actionType','queueUrl','value','receiptHandle','maxMessages'],computeQueryParams: SqsQuery_model_computeQueryParams}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/SQSQuery/model.ts
/* harmony default export */ const SQSQuery_model = ((0,wrapQueryConfig["default"])(SQSQuery_config));
// EXTERNAL MODULE: ../packages/json5/lib/index.js
var lib = __webpack_require__(373872);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
;// CONCATENATED MODULE: ../packages/common/utils/templateProcessing.ts
const anyTemplateRegex=/{{([\s\S]+?)}}/g;function indexifyTemplateString(query){let cur=-1;return query.replace(anyTemplateRegex,()=>{cur+=1;return`{{ ${cur} }}`;});}const pseudoJsonNodeProcessor=params=>(key,value,timestampDeserializer)=>{let newKey;if(key.match(regexes.OBJECT_REGEX)){key.replace(anyTemplateRegex,(v,index)=>{newKey=params[parseInt(index)];return v;});}else{newKey=key.replace(anyTemplateRegex,(v,index)=>{return params[parseInt(index)];});}if(newKey==null){return{newKey:'',newValue:undefined};}if(typeof value==='string'){return{newKey,newValue:value.replace(anyTemplateRegex,(v,index)=>{return params[parseInt(index)];})};}else if(typeof value==='function'){const code=value();const index=parseInt(code);const rawValue=params[index];const associatedType=params[`${index}Type`];let newValue=rawValue;if(associatedType==='Date'&&timestampDeserializer){newValue=timestampDeserializer(new Date(params[index]));}else if(associatedType==='Date'){newValue=new Date(params[index]);}return{newKey,newValue};}else{return{newKey,newValue:value};}};
;// CONCATENATED MODULE: ../packages/common/utils/renderKeyValuePairs.ts
function renderKeyValuePairs(template,params){const indexedTemplate=indexifyTemplateString(template!==null&&template!==void 0?template:'[]');let parsedTemplate=[];try{parsedTemplate=JSON.parse(indexedTemplate);}catch(err){}return parsedTemplate.reduce((acc,pair)=>{let key=pair.key;const value=pair.value;let evaluatedKey=key;key.replace(anyTemplateRegex,(v,index)=>{evaluatedKey=params[parseInt(index)];return v;});if(evaluatedKey===null||evaluatedKey===undefined){return acc;}key=evaluatedKey;if(key===''){return acc;}if(value&&value.match(regexes.OBJECT_REGEX)){let replacedValue;value.replace(anyTemplateRegex,(v,index)=>{replacedValue=params[parseInt(index)];return v;});return Object.assign({},acc,{[key]:replacedValue});}try{const newValue=lib_default().parse(value,pseudoJsonNodeProcessor(params));return Object.assign({},acc,{[key]:newValue});}catch(err){const newValue=value===null||value===undefined?'':value.replace(anyTemplateRegex,(_v,index)=>{return params[parseInt(index)];});return Object.assign({},acc,{[key]:newValue});}},{});}
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/WorkflowRun/config.ts
/* harmony default export */ const WorkflowRun_config = ((0,registry.registerQueryConfig)({name:'WorkflowRun',template:{workflowId:undefined,workflowParams:undefined,workflowRunBodyType:'raw'},computeQueryParams:null,customizedRunQuery:({template,runWorkflow,evaluateTemplateString,convertToQueryParams})=>{var _template$workflowPar;if(!template.workflowId){throw new Error('Please select a workflow to run.');}let convertedWorkflowParams=evaluateTemplateString((_template$workflowPar=template.workflowParams)!==null&&_template$workflowPar!==void 0?_template$workflowPar:'');if(template.workflowRunBodyType==='json'&&Array.isArray(convertedWorkflowParams)){var _template$workflowPar2;const userParams=convertToQueryParams((_template$workflowPar2=template.workflowParams)!==null&&_template$workflowPar2!==void 0?_template$workflowPar2:'');convertedWorkflowParams=renderKeyValuePairs(template.workflowParams,userParams);}const{workflowId}=template;return runWorkflow(workflowId,convertedWorkflowParams);}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/WorkflowRun/model.ts
/* harmony default export */ const WorkflowRun_model = ((0,wrapQueryConfig["default"])(WorkflowRun_config,{}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ZebraPrinterQuery/config.ts
/* harmony default export */ const ZebraPrinterQuery_config = ((0,registry.registerQueryConfig)({name:'ZebraPrinterQuery',template:{action:'print_label',printMethod:'send_connectionless',zplString:'',macAddress:'',runWhenModelUpdates:false},computeQueryParams:null,customizedRunQuery:({template,evaluateTemplateString,zebraPrinterScanDevices,zebraPrinterSendConnectionlessPrint,zebraPrinterSendPairedPrint})=>{var _template$macAddress,_template$zplString;const macAddress=evaluateTemplateString((_template$macAddress=template.macAddress)!==null&&_template$macAddress!==void 0?_template$macAddress:'');const zplString=evaluateTemplateString((_template$zplString=template.zplString)!==null&&_template$zplString!==void 0?_template$zplString:'');switch(template.action){case'print_label':if(template.printMethod==='send_connectionless'){return zebraPrinterSendConnectionlessPrint({zplString,macAddress});}else{return zebraPrinterSendPairedPrint({zplString});}case'scan_devices':return zebraPrinterScanDevices();}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/ZebraPrinterQuery/model.ts
/* harmony default export */ const ZebraPrinterQuery_model = ((0,wrapQueryConfig["default"])(ZebraPrinterQuery_config));
// EXTERNAL MODULE: ../frontend/src/components/plugins/datasources/index.ts
var datasources = __webpack_require__(396847);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/datasources/models.ts
const models_datasources=[model,CosmosDBQuery_model,CouchDBQuery_model,DatastoreQuery_model,DynamoQuery_model,ElasticSearchQuery_model,EmbeddingQuery_model,FirebaseQuery_model,GCSQuery_model,GlobalWidgetQuery_model,GoogleSheetsQuery_model,GraphQLQuery_model,GRPCQuery_model,JavascriptQuery_model,KafkaQuery_model,LambdaQuery_model,NFCQuery_model,NoSqlQuery_model,OpenAPIQuery_model,ParentWindowQuery_model["default"],PDFExporter_model,PushNotificationsQuery_model,PythonQuery_model,RedisQuery_model,RESTQuery_model,RethinkDBQuery_model,RetoolAIQuery_model,RetoolAIAgent_model,RetoolApprovalWorkflowQuery_model,RetoolSDKQuery_model,RetoolStorageQuery_model,RetoolTableQuery_model,RetoolUserActionQuery_model,S3Query_model,SalesforceQuery_model,ShellQuery_model,SlackQuery_model,SmartQuery_model,SMTPQuery_model,SNSQuery_model,SqlQuery_model,SqlQueryUnified_model,SqlTransformQuery_model,SQSQuery_model,WorkflowRun_model,ZebraPrinterQuery_model];for(const datasource of models_datasources){(0,datasources.registerDatasource)(datasource.name,datasource);}/* harmony default export */ const models = (datasources["default"]);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Instrument/runtimeOptions.ts
const Instrument_runtimeOptions_runtimeOptions=(0,registry.registerV1)({typeKey:'Instrumentation',propertyAnnotations:{funcBody:{},widgetId:{},property:{}}});/* harmony default export */ const Instrument_runtimeOptions = (Instrument_runtimeOptions_runtimeOptions);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Instrument/Instrument.tsx
const InstrumentWidgetTemplate={properties:[{pluginId:'',property:''}],jsonBody:'{\n\ttime: {{ moment.now() }},\n\tuser_email: {{ current_user.email }},\n}',hasConditionsEnabled:false,conditionBody:'{{ true }}'};const Instrument_options={docs:{link:'https://docs.retool.com/docs/transformers',description:'Use instruments to track data // TODO:: Update me!',properties:{}}};const Instrument_wireTemplate=template=>options=>{return immutable_es["default"].Map(template).merge(immutable_es["default"].fromJS(options));};(0,plugins.registerPlugin)({template:Instrument_wireTemplate(InstrumentWidgetTemplate),runtimeOptions: Instrument_runtimeOptions,baseOptions:Instrument_options});
// EXTERNAL MODULE: ../packages/common/immutable.ts
var immutable = __webpack_require__(789572);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Frame/template.ts
const template_wireTemplate=template=>(0,immutable.makeTypedMap)(template);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Frame/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerV1)({typeKey:'Frame',legacyApi:true,propertyAnnotations:{style:{resetValueOnTemplateUpdate:true},styleContext:{resetValueOnTemplateUpdate:true}}}));
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Frame/index.ts
(0,plugins.registerPlugin)({template:template_wireTemplate,editors:()=>__webpack_require__.e(/* import() */ 6658).then(__webpack_require__.bind(__webpack_require__, 756658)),runtimeOptions: widgetRuntimeOptions});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/requireMobilePluginsShared.ts


/***/ }),

/***/ 178291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSet = __webpack_require__(579987);

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;


/***/ }),

/***/ 373872:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(387359)
const stringify = __webpack_require__(925017)

const JSON5 = {
    parse,
    stringify,
}

module.exports = JSON5


/***/ }),

/***/ 387359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const util = __webpack_require__(475254)

let source
let parseState
let stack
let pos
let line
let column
let token
let key
let root

module.exports = function parse (text, reviver) {
    source = String(text)
    parseState = 'start'
    stack = []
    pos = 0
    line = 1
    column = 0
    token = undefined
    key = undefined
    root = undefined

    do {
        token = lex()

        // This code is unreachable.
        // if (!parseStates[parseState]) {
        //     throw invalidParseState()
        // }

        parseStates[parseState]()
    } while (token.type !== 'eof')

    if (typeof reviver === 'function') {
        const {newValue} = internalize({'': root}, '', reviver)
        return newValue
    }

    return root
}

function internalize (holder, name, reviver) {
    const value = holder[name]
    if (value != null && typeof value === 'object') {
        for (const key in value) {
            const {newKey, newValue} = internalize(value, key, reviver)
            delete value[key]
            if (newValue !== undefined) {
                value[newKey] = newValue
            }
        }
    }

    return reviver.call(holder, name, value)
}

let lexState
let buffer
let doubleQuote
let sign
let c

function lex () {
    lexState = 'default'
    buffer = ''
    doubleQuote = false
    sign = 1

    for (;;) {
        c = peek()

        // This code is unreachable.
        // if (!lexStates[lexState]) {
        //     throw invalidLexState(lexState)
        // }

        const token = lexStates[lexState]()
        if (token) {
            return token
        }
    }
}

function peek (offset = 0) {
    if (source[pos + offset]) {
        return String.fromCodePoint(source.codePointAt(pos + offset))
    }
}

function read () {
    const c = peek()

    if (c === '\n') {
        line++
        column = 0
    } else if (c) {
        column += c.length
    } else {
        column++
    }

    if (c) {
        pos += c.length
    }

    return c
}

const lexStates = {
    default () {
        switch (c) {
        case '\t':
        case '\v':
        case '\f':
        case ' ':
        case '\u00A0':
        case '\uFEFF':
        case '\n':
        case '\r':
        case '\u2028':
        case '\u2029':
            read()
            return

        case '/':
            read()
            lexState = 'comment'
            return

        case undefined:
            read()
            return newToken('eof')
        }

        if (util.isSpaceSeparator(c)) {
            read()
            return
        }

        // This code is unreachable.
        // if (!lexStates[parseState]) {
        //     throw invalidLexState(parseState)
        // }

        return lexStates[parseState]()
    },

    comment () {
        switch (c) {
        case '*':
            read()
            lexState = 'multiLineComment'
            return

        case '/':
            read()
            lexState = 'singleLineComment'
            return
        }

        throw invalidChar(read())
    },

    multiLineComment () {
        switch (c) {
        case '*':
            read()
            lexState = 'multiLineCommentAsterisk'
            return

        case undefined:
            throw invalidChar(read())
        }

        read()
    },

    multiLineCommentAsterisk () {
        switch (c) {
        case '*':
            read()
            return

        case '/':
            read()
            lexState = 'default'
            return

        case undefined:
            throw invalidChar(read())
        }

        read()
        lexState = 'multiLineComment'
    },

    singleLineComment () {
        switch (c) {
        case '\n':
        case '\r':
        case '\u2028':
        case '\u2029':
            read()
            lexState = 'default'
            return

        case undefined:
            read()
            return newToken('eof')
        }

        read()
    },

    value () {
        switch (c) {
        case '{':
            if (peek(1) === '{') {
                literal('{{')
                buffer = ''
                lexState = 'retoolExpr'
                return
            } else {
                return newToken('punctuator', read())
            }
        case '[':
            return newToken('punctuator', read())

        case 'n':
            read()
            literal('ull')
            return newToken('null', null)

        case 't':
            read()
            literal('rue')
            return newToken('boolean', true)

        case 'f':
            read()
            literal('alse')
            return newToken('boolean', false)

        case '-':
        case '+':
            if (read() === '-') {
                sign = -1
            }

            lexState = 'sign'
            return

        case '.':
            buffer = read()
            lexState = 'decimalPointLeading'
            return

        case '0':
            buffer = read()
            lexState = 'zero'
            return

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            buffer = read()
            lexState = 'decimalInteger'
            return

        case 'I':
            read()
            literal('nfinity')
            return newToken('numeric', Infinity)

        case 'N':
            read()
            literal('aN')
            return newToken('numeric', NaN)

        case '"':
        case "'":
            doubleQuote = (read() === '"')
            buffer = ''
            lexState = 'string'
            return
        }

        throw invalidChar(read())
    },

    identifierNameStartEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read()
        const u = unicodeEscape()
        switch (u) {
        case '$':
        case '_':
            break

        default:
            if (!util.isIdStartChar(u)) {
                throw invalidIdentifier()
            }

            break
        }

        buffer += u
        lexState = 'identifierName'
    },

    identifierName () {
        switch (c) {
        case '$':
        case '_':
        case '\u200C':
        case '\u200D':
            buffer += read()
            return

        case '\\':
            read()
            lexState = 'identifierNameEscape'
            return
        }

        if (util.isIdContinueChar(c)) {
            buffer += read()
            return
        }

        return newToken('identifier', buffer)
    },

    identifierNameEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read()
        const u = unicodeEscape()
        switch (u) {
        case '$':
        case '_':
        case '\u200C':
        case '\u200D':
            break

        default:
            if (!util.isIdContinueChar(u)) {
                throw invalidIdentifier()
            }

            break
        }

        buffer += u
        lexState = 'identifierName'
    },

    sign () {
        switch (c) {
        case '.':
            buffer = read()
            lexState = 'decimalPointLeading'
            return

        case '0':
            buffer = read()
            lexState = 'zero'
            return

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            buffer = read()
            lexState = 'decimalInteger'
            return

        case 'I':
            read()
            literal('nfinity')
            return newToken('numeric', sign * Infinity)

        case 'N':
            read()
            literal('aN')
            return newToken('numeric', NaN)
        }

        throw invalidChar(read())
    },

    zero () {
        switch (c) {
        case '.':
            buffer += read()
            lexState = 'decimalPoint'
            return

        case 'e':
        case 'E':
            buffer += read()
            lexState = 'decimalExponent'
            return

        case 'x':
        case 'X':
            buffer += read()
            lexState = 'hexadecimal'
            return
        }

        return newToken('numeric', sign * 0)
    },

    decimalInteger () {
        switch (c) {
        case '.':
            buffer += read()
            lexState = 'decimalPoint'
            return

        case 'e':
        case 'E':
            buffer += read()
            lexState = 'decimalExponent'
            return
        }

        if (util.isDigit(c)) {
            buffer += read()
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalPointLeading () {
        if (util.isDigit(c)) {
            buffer += read()
            lexState = 'decimalFraction'
            return
        }

        throw invalidChar(read())
    },

    decimalPoint () {
        switch (c) {
        case 'e':
        case 'E':
            buffer += read()
            lexState = 'decimalExponent'
            return
        }

        if (util.isDigit(c)) {
            buffer += read()
            lexState = 'decimalFraction'
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalFraction () {
        switch (c) {
        case 'e':
        case 'E':
            buffer += read()
            lexState = 'decimalExponent'
            return
        }

        if (util.isDigit(c)) {
            buffer += read()
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalExponent () {
        switch (c) {
        case '+':
        case '-':
            buffer += read()
            lexState = 'decimalExponentSign'
            return
        }

        if (util.isDigit(c)) {
            buffer += read()
            lexState = 'decimalExponentInteger'
            return
        }

        throw invalidChar(read())
    },

    decimalExponentSign () {
        if (util.isDigit(c)) {
            buffer += read()
            lexState = 'decimalExponentInteger'
            return
        }

        throw invalidChar(read())
    },

    decimalExponentInteger () {
        if (util.isDigit(c)) {
            buffer += read()
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    hexadecimal () {
        if (util.isHexDigit(c)) {
            buffer += read()
            lexState = 'hexadecimalInteger'
            return
        }

        throw invalidChar(read())
    },

    hexadecimalInteger () {
        if (util.isHexDigit(c)) {
            buffer += read()
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    retoolKeyExpr () {
        switch (c) {
        case '}':
            if (peek(1) === '}') {
                read()
                read()
                return newToken('retoolKeyExpr', buffer)
            }

            buffer += read()
            return

        case undefined:
            throw invalidChar(read())
        }

        buffer += read()
    },

    retoolExpr () {
        switch (c) {
        case '}':
            if (peek(1) === '}') {
                read()
                read()
                return newToken('retoolExpr', buffer)
            }

            buffer += read()
            return

        case undefined:
            throw invalidChar(read())
        }

        buffer += read()
    },

    string () {
        switch (c) {
        case '\\':
            read()
            buffer += escape()
            return

        case '"':
            if (doubleQuote) {
                read()
                return newToken('string', buffer)
            }

            buffer += read()
            return

        case "'":
            if (!doubleQuote) {
                read()
                return newToken('string', buffer)
            }

            buffer += read()
            return

        // case '\n':
        // case '\r':
        //     throw invalidChar(read())

        case '\u2028':
        case '\u2029':
            separatorChar(c)
            break

        case undefined:
            throw invalidChar(read())
        }

        buffer += read()
    },

    start () {
        switch (c) {
        case '{':
            if (peek(1) === '{') {
                literal('{{')
                buffer = ''
                lexState = 'retoolExpr'
                return
            } else {
                return newToken('punctuator', read())
            }
        case '[':
            return newToken('punctuator', read())

        // This code is unreachable since the default lexState handles eof.
        // case undefined:
        //     return newToken('eof')
        }

        lexState = 'value'
    },

    beforePropertyName () {
        switch (c) {
        case '$':
        case '_':
            buffer = read()
            lexState = 'identifierName'
            return

        case '\\':
            read()
            lexState = 'identifierNameStartEscape'
            return

        case '}':
            return newToken('punctuator', read())

        case '"':
        case "'":
            doubleQuote = (read() === '"')
            lexState = 'string'
            return
        case '{': {
            literal('{{')
            buffer = ''
            lexState = 'retoolKeyExpr'
            return
        }
        }

        if (util.isIdStartChar(c)) {
            buffer += read()
            lexState = 'identifierName'
            return
        }

        throw invalidChar(read())
    },

    afterPropertyName () {
        if (c === ':') {
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforePropertyValue () {
        lexState = 'value'
    },

    afterPropertyValue () {
        switch (c) {
        case ',':
        case '}':
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforeArrayValue () {
        if (c === ']') {
            return newToken('punctuator', read())
        }

        lexState = 'value'
    },

    afterArrayValue () {
        switch (c) {
        case ',':
        case ']':
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    end () {
        // This code is unreachable since it's handled by the default lexState.
        // if (c === undefined) {
        //     read()
        //     return newToken('eof')
        // }

        throw invalidChar(read())
    },
}

function newToken (type, value) {
    return {
        type,
        value,
        line,
        column,
    }
}

function literal (s) {
    for (const c of s) {
        const p = peek()

        if (p !== c) {
            throw invalidChar(read())
        }

        read()
    }
}

function escape () {
    const c = peek()
    switch (c) {
    case 'b':
        read()
        return '\b'

    case 'f':
        read()
        return '\f'

    case 'n':
        read()
        return '\n'

    case 'r':
        read()
        return '\r'

    case 't':
        read()
        return '\t'

    case 'v':
        read()
        return '\v'

    case '0':
        read()
        if (util.isDigit(peek())) {
            throw invalidChar(read())
        }

        return '\0'

    case 'x':
        read()
        return hexEscape()

    case 'u':
        read()
        return unicodeEscape()

    case '\n':
    case '\u2028':
    case '\u2029':
        read()
        return ''

    case '\r':
        read()
        if (peek() === '\n') {
            read()
        }

        return ''

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
        throw invalidChar(read())

    case undefined:
        throw invalidChar(read())
    }

    return read()
}

function hexEscape () {
    let buffer = ''
    let c = peek()

    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read()

    c = peek()
    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read()

    return String.fromCodePoint(parseInt(buffer, 16))
}

function unicodeEscape () {
    let buffer = ''
    let count = 4

    while (count-- > 0) {
        const c = peek()
        if (!util.isHexDigit(c)) {
            throw invalidChar(read())
        }

        buffer += read()
    }

    return String.fromCodePoint(parseInt(buffer, 16))
}

const parseStates = {
    start () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push()
    },

    beforePropertyName () {
        switch (token.type) {
        case 'identifier':
        case 'string':
            key = token.value
            parseState = 'afterPropertyName'
            return

        case 'punctuator':
            // This code is unreachable since it's handled by the lexState.
            // if (token.value !== '}') {
            //     throw invalidToken()
            // }

            pop()
            return

        case 'eof':
            throw invalidEOF()
        case 'retoolKeyExpr':
            key = `{{  ${token.value} }}`
            parseState = 'afterPropertyName'
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterPropertyName () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator' || token.value !== ':') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        parseState = 'beforePropertyValue'
    },

    beforePropertyValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push()
    },

    beforeArrayValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        if (token.type === 'punctuator' && token.value === ']') {
            pop()
            return
        }

        push()
    },

    afterPropertyValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
        case ',':
            parseState = 'beforePropertyName'
            return

        case '}':
            pop()
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterArrayValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
        case ',':
            parseState = 'beforeArrayValue'
            return

        case ']':
            pop()
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    end () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'eof') {
        //     throw invalidToken()
        // }
    },
}

function push () {
    let value

    switch (token.type) {
    case 'punctuator':
        switch (token.value) {
        case '{':
            value = {}
            break

        case '[':
            value = []
            break
        }

        break

    case 'null':
    case 'boolean':
    case 'numeric':
    case 'string':
        value = token.value
        break

    case 'retoolExpr': {
        const tokenValue = token.value
        value = () => tokenValue
        break
    }
    // This code is unreachable.
    // default:
    //     throw invalidToken()
    }

    if (root === undefined) {
        root = value
    } else {
        const parent = stack[stack.length - 1]
        if (Array.isArray(parent)) {
            parent.push(value)
        } else {
            parent[key] = value
        }
    }

    if (value !== null && typeof value === 'object') {
        stack.push(value)

        if (Array.isArray(value)) {
            parseState = 'beforeArrayValue'
        } else {
            parseState = 'beforePropertyName'
        }
    } else {
        const current = stack[stack.length - 1]
        if (current == null) {
            parseState = 'end'
        } else if (Array.isArray(current)) {
            parseState = 'afterArrayValue'
        } else {
            parseState = 'afterPropertyValue'
        }
    }
}

function pop () {
    stack.pop()

    const current = stack[stack.length - 1]
    if (current == null) {
        parseState = 'end'
    } else if (Array.isArray(current)) {
        parseState = 'afterArrayValue'
    } else {
        parseState = 'afterPropertyValue'
    }
}

// This code is unreachable.
// function invalidParseState () {
//     return new Error(`JSON5: invalid parse state '${parseState}'`)
// }

// This code is unreachable.
// function invalidLexState (state) {
//     return new Error(`JSON5: invalid lex state '${state}'`)
// }

function invalidChar (c) {
    if (c === undefined) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
    }

    return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
}

function invalidEOF () {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
}

// This code is unreachable.
// function invalidToken () {
//     if (token.type === 'eof') {
//         return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
//     }

//     const c = String.fromCodePoint(token.value.codePointAt(0))
//     return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
// }

function invalidIdentifier () {
    column -= 5
    return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`)
}

function separatorChar (c) {
    console.warn(`JSON5: '${formatChar(c)}' in strings is not valid ECMAScript; consider escaping`)
}

function formatChar (c) {
    const replacements = {
        "'": "\\'",
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        '\v': '\\v',
        '\0': '\\0',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    }

    if (replacements[c]) {
        return replacements[c]
    }

    if (c < ' ') {
        const hexString = c.charCodeAt(0).toString(16)
        return '\\x' + ('00' + hexString).substring(hexString.length)
    }

    return c
}

function syntaxError (message) {
    const err = new SyntaxError(message)
    err.lineNumber = line
    err.columnNumber = column
    return err
}


/***/ }),

/***/ 925017:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const util = __webpack_require__(475254)

module.exports = function stringify (value, replacer, space) {
    const stack = []
    let indent = ''
    let propertyList
    let replacerFunc
    let gap = ''
    let quote

    if (
        replacer != null &&
        typeof replacer === 'object' &&
        !Array.isArray(replacer)
    ) {
        space = replacer.space
        quote = replacer.quote
        replacer = replacer.replacer
    }

    if (typeof replacer === 'function') {
        replacerFunc = replacer
    } else if (Array.isArray(replacer)) {
        propertyList = []
        for (const v of replacer) {
            let item

            if (typeof v === 'string') {
                item = v
            } else if (
                typeof v === 'number' ||
                v instanceof String ||
                v instanceof Number
            ) {
                item = String(v)
            }

            if (item !== undefined && propertyList.indexOf(item) < 0) {
                propertyList.push(item)
            }
        }
    }

    if (space instanceof Number) {
        space = Number(space)
    } else if (space instanceof String) {
        space = String(space)
    }

    if (typeof space === 'number') {
        if (space > 0) {
            space = Math.min(10, Math.floor(space))
            gap = '          '.substr(0, space)
        }
    } else if (typeof space === 'string') {
        gap = space.substr(0, 10)
    }

    return serializeProperty('', {'': value})

    function serializeProperty (key, holder) {
        let value = holder[key]
        if (value != null) {
            if (typeof value.toJSON5 === 'function') {
                value = value.toJSON5(key)
            } else if (typeof value.toJSON === 'function') {
                value = value.toJSON(key)
            }
        }

        if (replacerFunc) {
            value = replacerFunc.call(holder, key, value)
        }

        if (value instanceof Number) {
            value = Number(value)
        } else if (value instanceof String) {
            value = String(value)
        } else if (value instanceof Boolean) {
            value = value.valueOf()
        }

        switch (value) {
        case null: return 'null'
        case true: return 'true'
        case false: return 'false'
        }

        if (typeof value === 'string') {
            return quoteString(value, false)
        }

        if (typeof value === 'number') {
            return String(value)
        }

        if (typeof value === 'object') {
            return Array.isArray(value) ? serializeArray(value) : serializeObject(value)
        }

        return undefined
    }

    function quoteString (value) {
        const quotes = {
            "'": 0.1,
            '"': 0.2,
        }

        const replacements = {
            "'": "\\'",
            '"': '\\"',
            '\\': '\\\\',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t',
            '\v': '\\v',
            '\0': '\\0',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        }

        let product = ''

        for (let i = 0; i < value.length; i++) {
            const c = value[i]
            switch (c) {
            case "'":
            case '"':
                quotes[c]++
                product += c
                continue

            case '\0':
                if (util.isDigit(value[i + 1])) {
                    product += '\\x00'
                    continue
                }
            }

            if (replacements[c]) {
                product += replacements[c]
                continue
            }

            if (c < ' ') {
                let hexString = c.charCodeAt(0).toString(16)
                product += '\\x' + ('00' + hexString).substring(hexString.length)
                continue
            }

            product += c
        }

        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => (quotes[a] < quotes[b]) ? a : b)

        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar])

        return quoteChar + product + quoteChar
    }

    function serializeObject (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback = indent
        indent = indent + gap

        let keys = propertyList || Object.keys(value)
        let partial = []
        for (const key of keys) {
            const propertyString = serializeProperty(key, value)
            if (propertyString !== undefined) {
                let member = serializeKey(key) + ':'
                if (gap !== '') {
                    member += ' '
                }
                member += propertyString
                partial.push(member)
            }
        }

        let final
        if (partial.length === 0) {
            final = '{}'
        } else {
            let properties
            if (gap === '') {
                properties = partial.join(',')
                final = '{' + properties + '}'
            } else {
                let separator = ',\n' + indent
                properties = partial.join(separator)
                final = '{\n' + indent + properties + ',\n' + stepback + '}'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }

    function serializeKey (key) {
        if (key.length === 0) {
            return quoteString(key, true)
        }

        const firstChar = String.fromCodePoint(key.codePointAt(0))
        if (!util.isIdStartChar(firstChar)) {
            return quoteString(key, true)
        }

        for (let i = firstChar.length; i < key.length; i++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
                return quoteString(key, true)
            }
        }

        return key
    }

    function serializeArray (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value)

        let stepback = indent
        indent = indent + gap

        let partial = []
        for (let i = 0; i < value.length; i++) {
            const propertyString = serializeProperty(String(i), value)
            partial.push((propertyString !== undefined) ? propertyString : 'null')
        }

        let final
        if (partial.length === 0) {
            final = '[]'
        } else {
            if (gap === '') {
                let properties = partial.join(',')
                final = '[' + properties + ']'
            } else {
                let separator = ',\n' + indent
                let properties = partial.join(separator)
                final = '[\n' + indent + properties + ',\n' + stepback + ']'
            }
        }

        stack.pop()
        indent = stepback
        return final
    }
}


/***/ }),

/***/ 401599:
/***/ ((module) => {

// This is a generated file. Do not edit.
module.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/
module.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/
module.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/


/***/ }),

/***/ 475254:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const unicode = __webpack_require__(401599)

module.exports = {
    isSpaceSeparator (c) {
        return typeof c === 'string' && unicode.Space_Separator.test(c)
    },

    isIdStartChar (c) {
        return typeof c === 'string' && (
            (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c === '$') || (c === '_') ||
        (c >= '0' && c <= '9') ||
        unicode.ID_Start.test(c)
        )
    },

    isIdContinueChar (c) {
        return typeof c === 'string' && (
            (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        (c === '$') || (c === '_') ||
        (c === '\u200C') || (c === '\u200D') ||
        unicode.ID_Continue.test(c)
        )
    },

    isDigit (c) {
        return typeof c === 'string' && /[0-9]/.test(c)
    },

    isHexDigit (c) {
        return typeof c === 'string' && /[0-9A-Fa-f]/.test(c)
    },
}


/***/ })

}])
//# sourceMappingURL=1309.cf0810db.chunk.js.map