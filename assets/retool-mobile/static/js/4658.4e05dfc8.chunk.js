(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[4658],{

/***/ 4658:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  appTemplateReducer: () => (/* binding */ appTemplateReducer),
  appTemplateSelector: () => (/* binding */ appTemplateSelector),
  measureSliceLoad: () => (/* binding */ measureSliceLoad),
  setAppTemplate: () => (/* binding */ setAppTemplate),
  startMiddlewareListener: () => (/* binding */ startMiddlewareListener)
});

// EXTERNAL MODULE: ../frontend/src/common/analytics/performance/index.ts
var performance = __webpack_require__(794225);
// EXTERNAL MODULE: ../frontend/src/common/datadogMetrics/index.ts + 1 modules
var datadogMetrics = __webpack_require__(269851);
// EXTERNAL MODULE: ../frontend/src/store/appModel/batchUndoGroupBy.ts
var batchUndoGroupBy = __webpack_require__(888478);
// EXTERNAL MODULE: ../frontend/src/store/middleware/listenerMiddleware/listenerMiddleware.ts
var listenerMiddleware = __webpack_require__(813613);
// EXTERNAL MODULE: ../frontend/src/store/selectors/appTemplateSelector.ts
var selectors_appTemplateSelector = __webpack_require__(847662);
// EXTERNAL MODULE: ../frontend/src/store/utils/redux.ts + 3 modules
var redux = __webpack_require__(997033);
// EXTERNAL MODULE: ./stubs/@sentry/browser/index.ts
var browser = __webpack_require__(796920);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/assign.js
var lodash_assign = __webpack_require__(789449);
var assign_default = /*#__PURE__*/__webpack_require__.n(lodash_assign);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/assignWith.js
var assignWith = __webpack_require__(314129);
var assignWith_default = /*#__PURE__*/__webpack_require__.n(assignWith);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var isObject = __webpack_require__(238483);
var isObject_default = /*#__PURE__*/__webpack_require__.n(isObject);
// EXTERNAL MODULE: ../frontend/src/store/appModel/actionTypes.ts
var actionTypes = __webpack_require__(350323);
// EXTERNAL MODULE: ../frontend/src/store/appModel/constants.ts
var constants = __webpack_require__(486401);
// EXTERNAL MODULE: ../frontend/src/store/appModel/mobileAppTemplate.ts
var mobileAppTemplate = __webpack_require__(430055);
// EXTERNAL MODULE: ../frontend/src/store/appModel/queryTabMove.ts
var queryTabMove = __webpack_require__(863156);
// EXTERNAL MODULE: ../frontend/src/store/appModel/sendSave.ts + 21 modules
var sendSave = __webpack_require__(495353);
// EXTERNAL MODULE: ../frontend/src/store/appModel/templateUtils.ts + 2 modules
var templateUtils = __webpack_require__(918003);
// EXTERNAL MODULE: ../frontend/src/store/appModel/updateFragmentDefinition.ts
var updateFragmentDefinition = __webpack_require__(337330);
// EXTERNAL MODULE: ../frontend/src/store/appModel/updatePageLoadOverrides.ts
var updatePageLoadOverrides = __webpack_require__(72755);
// EXTERNAL MODULE: ../frontend/src/store/appModel/widgetReposition2.ts + 7 modules
var widgetReposition2 = __webpack_require__(592761);
// EXTERNAL MODULE: ../frontend/src/store/appTesting/persistentSlice.ts + 2 modules
var persistentSlice = __webpack_require__(279280);
// EXTERNAL MODULE: ../frontend/src/store/multiscreen/actionTypes.ts
var multiscreen_actionTypes = __webpack_require__(687318);
// EXTERNAL MODULE: ../packages/common/retoolConstants.ts
var retoolConstants = __webpack_require__(247303);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/utils.ts
function logErrors(actionType,fn){try{return fn();}catch(e){datadogMetrics["default"].increment('frontend.remove_immutable.extra_reducer_exceptions.app_template',{actionType,releaseVersion:retoolConstants.RETOOL_VERSION});(0,browser.captureException)(e,{level:'warning',tags:{isRemoveImmutableJS:true,actionType}});}}
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatAppTesting.ts
const setAppTestingReducer=(state,action)=>logErrors(action.type,()=>{let appTesting=state.appTesting;if(appTesting===null){appTesting={tests:{},testSuites:[]};}state.appTesting=(0,persistentSlice["default"])(appTesting,action);});
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatCustomComponentCollection.ts
const addCustomComponentCollectionReducer=(state,action)=>logErrors(constants.ADD_CUSTOM_COMPONENT_COLLECTION_TO_APP_TEMPLATE,()=>{var _state$customComponen;const{collectionUuid}=action.payload;const existing=(_state$customComponen=state.customComponentCollections)!==null&&_state$customComponen!==void 0?_state$customComponen:[];const newCollections=existing.filter(c=>c.collectionUuid!==collectionUuid);newCollections.push(action.payload);state.customComponentCollections=newCollections;});const removeCustomComponentCollectionReducer=(state,action)=>logErrors(constants.REMOVE_CUSTOM_COMPONENT_COLLECTION_FROM_APP_TEMPLATE,()=>{var _state$customComponen2;const{customComponentCollectionUuid}=action.payload;const existingCustomComponentCollections=(_state$customComponen2=state.customComponentCollections)!==null&&_state$customComponen2!==void 0?_state$customComponen2:[];state.customComponentCollections=existingCustomComponentCollections.filter(c=>c.collectionUuid!==customComponentCollectionUuid);});const updateCustomComponentCollectionReducer=(state,action)=>logErrors(constants.UPDATE_CUSTOM_COMPONENT_COLLECTION_IN_APP_TEMPLATE,()=>{var _state$customComponen3;const{collectionUuid,versionUuid}=action.payload;state.customComponentCollections=(_state$customComponen3=state.customComponentCollections)!==null&&_state$customComponen3!==void 0?_state$customComponen3:[];for(const collection of state.customComponentCollections){if(collection.collectionUuid===collectionUuid){collection.collectionRevisionUuid=versionUuid;}}});
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(682409);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isNil.js
var isNil = __webpack_require__(626683);
var isNil_default = /*#__PURE__*/__webpack_require__.n(isNil);
// EXTERNAL MODULE: ../packages/common/multiscreen/types.ts
var types = __webpack_require__(176722);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/plugins/isTypeHelpers.ts
const CODE_TYPES=new Set(['datasource','function','instrumentation','state']);function isCode(plugin){return CODE_TYPES.has(plugin.type);}function isFrame(plugin){return plugin.type==='frame';}function isScreen(plugin){return plugin.type==='screen';}
// EXTERNAL MODULE: ../frontend/src/store/appModel/template.tsx + 12 modules
var template = __webpack_require__(717897);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatFolders.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function pluginNeedsFolderUpdated(plugin,oldFolderId,folderScreenId){if(plugin.folder!==oldFolderId){return false;}const pluginScreenId=plugin.screen;const pluginScreenIdType=typeof pluginScreenId;const folderScreenIdType=typeof folderScreenId;if(pluginScreenIdType!==folderScreenIdType){return isNil_default()(pluginScreenId)&&isNil_default()(folderScreenId);}if(pluginScreenIdType==='string'){return pluginScreenId===folderScreenId;}return true;}const folderChangeScopeReducer=(state,action)=>logErrors(constants.FOLDER_CHANGE_SCOPE,()=>{const{folderId,screenId:currentScreen,currentScope,insertIndex}=action.payload;if(currentScope===types.PluginScopeType.Global){state.folders=state.folders.filter(folder=>folder!==folderId);const folders=state.pageCodeFolders[currentScreen]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(folders,folderId);if(insertIndex!==undefined){folders.splice(insertIndex,0,newFolderId);}else{folders.push(newFolderId);}state.pageCodeFolders[currentScreen]=folders;for(const plugin of state.plugins){if(plugin.folder===folderId&&!plugin.screen){plugin.screen=currentScreen;plugin.folder=newFolderId;plugin.position=undefined;}}}else{var _state$pageCodeFolder;const folders=(_state$pageCodeFolder=state.pageCodeFolders[currentScreen])!==null&&_state$pageCodeFolder!==void 0?_state$pageCodeFolder:[];state.pageCodeFolders[currentScreen]=folders.filter(folder=>folder!==folderId);const newFolderId=(0,template.generateNewFolderIdIfNecessary)(state.folders,folderId);if(insertIndex!==undefined){state.folders.splice(insertIndex,0,newFolderId);}else{state.folders.push(newFolderId);}for(const plugin of state.plugins){if(plugin.folder===folderId&&plugin.screen===currentScreen){plugin.screen=undefined;plugin.folder=newFolderId;plugin.position=undefined;}}}});const folderDeleteReducer=(state,action)=>logErrors(constants.FOLDER_DELETE,()=>{const{folderName,screenId}=action.payload;if(screenId){var _pageCodeFolders$scre;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre!==void 0?_pageCodeFolders$scre:[];const newFocusedScreenFolders=focusedScreenFolders.filter(folder=>folder!==folderName);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:newFocusedScreenFolders});}else{state.folders=state.folders.filter(folder=>folder!==folderName);}for(const plugin of state.plugins){const pluginIsInFolder=plugin.folder===folderName;const pluginIsInScreen=!!screenId&&plugin.screen===screenId||!screenId&&!plugin.screen;if(pluginIsInFolder&&pluginIsInScreen){plugin.folder='';}}});const folderCreateReducer=(state,action)=>logErrors(constants.FOLDER_CREATE,()=>{const{focusedScreen,folderName}=action.payload;if(focusedScreen){var _state$pageCodeFolder2,_state$pageCodeFolder3;;((_state$pageCodeFolder3=(_state$pageCodeFolder2=state.pageCodeFolders)[focusedScreen])!==null&&_state$pageCodeFolder3!==void 0?_state$pageCodeFolder3:_state$pageCodeFolder2[focusedScreen]=[]).push(folderName);}else{state.folders.push(folderName);}});const folderMoveReducer=(state,action)=>logErrors(constants.FOLDER_MOVE,()=>{state.folders=action.payload.folders.toArray();});const folderMoveToPageReducer=(state,action)=>logErrors(constants.FOLDER_MOVE_TO_PAGE,()=>{const{folderId,currentScreenId,targetScreenId,currentScope}=action.payload;if(currentScope===types.PluginScopeType.Global){state.folders=state.folders.filter(folder=>folder!==folderId);const folders=state.pageCodeFolders[targetScreenId]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(folders,folderId);folders.push(newFolderId);state.pageCodeFolders[targetScreenId]=folders;for(const plugin of state.plugins){if(plugin.folder===folderId&&!plugin.screen){plugin.screen=targetScreenId;plugin.folder=newFolderId;plugin.position=undefined;}}}else{if(currentScreenId!==undefined){const currentFolders=state.pageCodeFolders[currentScreenId]||[];state.pageCodeFolders[currentScreenId]=currentFolders.filter(folder=>folder!==folderId);}const folders=state.pageCodeFolders[targetScreenId]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(state.folders,folderId);folders.push(newFolderId);state.pageCodeFolders[targetScreenId]=folders;for(const plugin of state.plugins){if(plugin.folder===folderId&&plugin.screen===currentScreenId){plugin.screen=targetScreenId;plugin.folder=newFolderId;plugin.position=undefined;}}}});const folderRecursiveDeleteReducer=(state,action)=>logErrors(constants.FOLDER_RECURSIVE_DELETE,()=>{const{id,screenId}=action.payload;const isPageCodeRecursiveDelete=!!screenId;if(isPageCodeRecursiveDelete){var _pageCodeFolders$scre2;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre2=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre2!==void 0?_pageCodeFolders$scre2:[];const newFocusedScreenFolders=focusedScreenFolders.filter(folder=>folder!==id);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:newFocusedScreenFolders});}else{state.folders=state.folders.filter(folder=>folder!==id);}const filteredPlugins=state.plugins.filter(plugin=>{if(!isCode(plugin)){return true;}const sameFolder=plugin.folder===id;const sameScreen=plugin.screen===screenId;const isGlobalCode=isNil_default()(plugin.screen);if(isGlobalCode){return!sameFolder||isPageCodeRecursiveDelete;}else{return sameScreen?!sameFolder:true;}});state.plugins=filteredPlugins;});const folderRenameReducer=(state,action)=>logErrors(constants.FOLDER_RENAME,()=>{const{id,newId,screenId}=action.payload;if(screenId){var _pageCodeFolders$scre3;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre3=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre3!==void 0?_pageCodeFolders$scre3:[];const renamedFocusedScreenFolders=focusedScreenFolders.map(folder=>folder===id?newId:folder);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:renamedFocusedScreenFolders});for(const plugin of state.plugins){if(plugin.folder===id&&plugin.screen===screenId){plugin.folder=newId;}}}else{state.folders=state.folders.map(folder=>folder===id?newId:folder);for(const plugin of state.plugins){if(pluginNeedsFolderUpdated(plugin,id,screenId)){plugin.folder=newId;}}}});const pageCodeFoldersClearReducer=(state,action)=>logErrors(constants.PAGE_CODE_FOLDER_CLEAR,()=>{const{screenId}=action.payload;state.pageCodeFolders[screenId]=[];});const pageCodeFoldersReorderReducer=(state,action)=>logErrors(constants.PAGE_CODE_FOLDER_REORDER,()=>{const{screen,folders}=action.payload;state.pageCodeFolders[screen]=folders;});
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(140653);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBoolean.js
var isBoolean = __webpack_require__(181162);
var isBoolean_default = /*#__PURE__*/__webpack_require__.n(isBoolean);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isDate.js
var isDate = __webpack_require__(595878);
var isDate_default = /*#__PURE__*/__webpack_require__.n(isDate);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isNumber.js
var isNumber = __webpack_require__(492689);
var isNumber_default = /*#__PURE__*/__webpack_require__.n(isNumber);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isString.js
var isString = __webpack_require__(471293);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
// EXTERNAL MODULE: ../packages/common/immutable.ts
var immutable = __webpack_require__(587587);
// EXTERNAL MODULE: ../packages/common/PluginNamespaceInfo.ts
var PluginNamespaceInfo = __webpack_require__(83249);
// EXTERNAL MODULE: ../packages/common/records/index.ts + 1 modules
var records = __webpack_require__(425680);
// EXTERNAL MODULE: ../packages/common/records/mobileAppPosition.ts
var mobileAppPosition = __webpack_require__(736090);
// EXTERNAL MODULE: ../packages/common/records/position2.ts + 1 modules
var records_position2 = __webpack_require__(575537);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js
var isArrayLike = __webpack_require__(317856);
var isArrayLike_default = /*#__PURE__*/__webpack_require__.n(isArrayLike);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/converterUtils.ts
function converterUtils_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function converterUtils_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?converterUtils_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):converterUtils_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const __mark=Symbol('mark');function createWasImmutableMap(o){return converterUtils_objectSpread(converterUtils_objectSpread({},o),{},{[__mark]:'WasImmutableMap'});}function isWasImmutableMap(object){if(isObject_default()(object)&&object[__mark]==='WasImmutableMap'){return true;}return false;}function createWasImmutableOrderedMap(o){return converterUtils_objectSpread(converterUtils_objectSpread({},o),{},{[__mark]:'WasImmutableOrderedMap'});}function isWasImmutableOrderedMap(object){if(isObject_default()(object)&&object[__mark]==='WasImmutableOrderedMap'){return true;}return false;}class WasImmutableList extends Array{[__mark]='WasImmutableList';}function isWasImmutableList(object){if(isArrayLike_default()(object)&&object[__mark]==='WasImmutableList'){return true;}return false;}class WasImmutableSet extends Array{[__mark]='WasImmutableSet';}function isWasImmutableSet(object){if(isArrayLike_default()(object)&&object[__mark]==='WasImmutableSet'){return true;}return false;}
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/convert.ts
function convertMobileAppPositionFromImmutable(position){if(!position){return undefined;}return position.toJS();}function convertPositionFromImmutable(position2){if(!position2){return undefined;}return position2.toJS();}function convertDefinitionsFromImmutable(definitions){const definitionsJSOnly=[];for(const def of definitions){const name=def.get('name');const value=def.get('value');if(name===undefined||value===undefined){datadogMetrics["default"].increment('frontend.removeImmutable.definition_missing_values',{releaseVersion:retoolConstants.RETOOL_VERSION,nameUndefined:String(name===undefined),valueUndefined:String(value===undefined)});continue;}definitionsJSOnly.push({name,value});}return definitionsJSOnly;}function convertPluginTemplateFromImmutable(object){if(!object||isNumber_default()(object)||isString_default()(object)||isBoolean_default()(object)||isDate_default()(object)){return object;}if(immutable_es.List.isList(object)){const list=new WasImmutableList(...object.toArray().map(listItem=>{return convertPluginTemplateFromImmutable(listItem);}));return list;}if(immutable_es.Set.isSet(object)){const set=new WasImmutableSet(...object.toArray().map(setItem=>{return convertPluginTemplateFromImmutable(setItem);}));return set;}if(immutable_es.OrderedMap.isOrderedMap(object)){const newObject={};for(const[key,value]of object.entries()){newObject[key]=convertPluginTemplateFromImmutable(value);}return createWasImmutableOrderedMap(newObject);}if(immutable_es.Map.isMap(object)){const newObject={};for(const[key,value]of object.entries()){newObject[key]=convertPluginTemplateFromImmutable(value);}return createWasImmutableMap(newObject);}return object;}function convertTemplateUpdateFromImmutable(update){const convertedUpdate={};for(const[key,value]of Object.entries(update)){convertedUpdate[key]=convertPluginTemplateFromImmutable(value);}return convertedUpdate;}function convertPluginFromImmutable(plugin){var _plugin$get$toISOStri,_plugin$get$toISOStri2,_plugin$get,_plugin$get2,_plugin$get$toISOStri3,_plugin$get$toISOStri4,_plugin$get3;const namespace=plugin.get('namespace');return{container:plugin.get('container'),createdAt:(_plugin$get$toISOStri=(_plugin$get$toISOStri2=(_plugin$get=plugin.get('createdAt')).toISOString)===null||_plugin$get$toISOStri2===void 0?void 0:_plugin$get$toISOStri2.call(_plugin$get))!==null&&_plugin$get$toISOStri!==void 0?_plugin$get$toISOStri:plugin.get('createdAt').toString(),folder:plugin.get('folder'),id:plugin.get('id'),mobileAppPosition:convertMobileAppPositionFromImmutable(plugin.get('mobileAppPosition')),mobilePosition:convertPositionFromImmutable(plugin.get('mobilePosition2')),namespace:namespace?{originalId:namespace.getOriginalId(),namespace:namespace.getNamespace()}:undefined,position:convertPositionFromImmutable(plugin.get('position2')),resourceDisplayName:plugin.get('resourceDisplayName'),resourceName:plugin.get('resourceName'),screen:plugin.get('screen'),subtype:plugin.get('subtype'),style:(_plugin$get2=plugin.get('style'))===null||_plugin$get2===void 0?void 0:_plugin$get2.toObject(),tabIndex:plugin.get('tabIndex'),template:convertPluginTemplateFromImmutable(plugin.get('template')),type:plugin.get('type'),updatedAt:(_plugin$get$toISOStri3=(_plugin$get$toISOStri4=(_plugin$get3=plugin.get('updatedAt')).toISOString)===null||_plugin$get$toISOStri4===void 0?void 0:_plugin$get$toISOStri4.call(_plugin$get3))!==null&&_plugin$get$toISOStri3!==void 0?_plugin$get$toISOStri3:plugin.get('updatedAt').toString()};}function convertPluginTemplatesFromImmutable(plugins){const converted=[];for(const[,plugin]of plugins){converted.push(convertPluginFromImmutable(plugin));}return converted;}function convertAppTemplateFromImmutable(appTemplate){const appThemeId=appTemplate.get('appThemeId');const appThemeModeId=appTemplate.get('appThemeModeId');const appThemeName=appTemplate.get('appThemeName');const rootScreen=appTemplate.get('rootScreen');return{appMaxWidth:appTemplate.get('appMaxWidth'),appStyles:appTemplate.get('appStyles'),appTesting:appTemplate.get('appTesting'),appThemeId:appThemeId===undefined?null:appThemeId,appThemeModeId:appThemeModeId===undefined?null:appThemeModeId,appThemeName:appThemeName===undefined?null:appThemeName,createdAt:appTemplate.get('createdAt'),customComponentCollections:appTemplate.get('customComponentCollections'),customDocumentTitle:appTemplate.get('customDocumentTitle'),customDocumentTitleEnabled:appTemplate.get('customDocumentTitleEnabled'),customShortcuts:appTemplate.get('customShortcuts'),experimentalDataTabEnabled:appTemplate.get('experimentalDataTabEnabled'),experimentalFeatures:appTemplate.get('experimentalFeatures'),folders:appTemplate.get('folders').toJS(),formAppSettings:appTemplate.get('formAppSettings'),inAppRetoolPillAppearance:appTemplate.get('inAppRetoolPillAppearance'),instrumentationEnabled:appTemplate.get('instrumentationEnabled'),internationalizationSettings:appTemplate.get('internationalizationSettings'),isFetching:appTemplate.get('isFetching'),isFormApp:appTemplate.get('isFormApp'),isGlobalWidget:appTemplate.get('isGlobalWidget'),isMobileApp:appTemplate.get('isMobileApp'),loadingIndicatorsDisabled:appTemplate.get('loadingIndicatorsDisabled'),markdownLinkBehavior:appTemplate.get('markdownLinkBehavior'),mobileAppSettings:appTemplate.get('mobileAppSettings'),multiScreenMobileApp:appTemplate.get('multiScreenMobileApp'),notificationsSettings:appTemplate.get('notificationsSettings'),pageCodeFolders:appTemplate.get('pageCodeFolders'),pageLoadValueOverrides:convertDefinitionsFromImmutable(appTemplate.get('pageLoadValueOverrides')),plugins:convertPluginTemplatesFromImmutable(appTemplate.get('plugins')),preloadedAppJavaScript:appTemplate.get('preloadedAppJavaScript'),preloadedAppJSLinks:appTemplate.get('preloadedAppJSLinks'),queryStatusVisibility:appTemplate.get('queryStatusVisibility'),responsiveLayoutDisabled:appTemplate.get('responsiveLayoutDisabled'),rootScreen:rootScreen===undefined?null:rootScreen,savePlatform:appTemplate.get('savePlatform'),shortlink:appTemplate.get('shortlink'),testEntities:appTemplate.get('testEntities'),tests:appTemplate.get('tests'),urlFragmentDefinitions:convertDefinitionsFromImmutable(appTemplate.get('urlFragmentDefinitions')),version:appTemplate.get('version')};}function convertMobileAppPositionToImmutable(position){if(position===undefined){return undefined;}return new mobileAppPosition.MobileAppPosition(position);}function convertPositionToImmutable(position2){if(position2===undefined){return undefined;}return new records_position2.Position2(position2);}function convertDefinitionsToImmutable(definitions){const immutableDefinitions=definitions.map(def=>{const defMap=(0,immutable_es.Map)([['name',def.name],['value',def.value]]);return defMap;});return (0,immutable_es.List)(immutableDefinitions);}function convertPluginTemplateToImmutable(object){if(!object||isNumber_default()(object)||isString_default()(object)||isBoolean_default()(object)||isDate_default()(object)){return object;}else if(isWasImmutableList(object)){return (0,immutable_es.List)(object.map(convertPluginTemplateToImmutable));}else if(isWasImmutableSet(object)){return (0,immutable_es.Set)(object.map(convertPluginTemplateToImmutable));}else if(isWasImmutableOrderedMap(object)){const newObjectEntries=[];for(const[key,value]of Object.entries(object)){newObjectEntries.push([key,convertPluginTemplateToImmutable(value)]);}return (0,immutable_es.OrderedMap)(newObjectEntries);}else if(isWasImmutableMap(object)){const newObjectEntries=[];for(const[key,value]of Object.entries(object)){newObjectEntries.push([key,convertPluginTemplateToImmutable(value)]);}return (0,immutable_es.Map)(newObjectEntries);}return object;}function convertPluginToImmutable(plugin){return new records.PluginTemplate({container:plugin.container,createdAt:new Date(plugin.createdAt),folder:plugin.folder,id:plugin.id,mobileAppPosition:convertMobileAppPositionToImmutable(plugin.mobileAppPosition),mobilePosition2:convertPositionToImmutable(plugin.mobilePosition),namespace:plugin.namespace?new PluginNamespaceInfo.PluginNamespaceInfoImpl(plugin.namespace.namespace,plugin.namespace.originalId):undefined,position2:convertPositionToImmutable(plugin.position),screen:plugin.screen,style:plugin.style!==undefined?(0,immutable.makeTypedMap)(plugin.style):plugin.style,subtype:plugin.subtype,tabIndex:plugin.tabIndex,template:convertPluginTemplateToImmutable(plugin.template),type:plugin.type,updatedAt:new Date(plugin.updatedAt),uuid:plugin.uuid});}function convertPluginTemplatesToImmutable(pluginsJS){const plugins=pluginsJS.reduce((acc,plugin)=>{acc.push([plugin.id,convertPluginToImmutable(plugin)]);return acc;},[]);return (0,immutable_es.OrderedMap)(plugins);}function convertAppTemplateToImmutable(appTemplate){return new records.AppTemplate({appMaxWidth:appTemplate.appMaxWidth,appStyles:appTemplate.appStyles,appTesting:appTemplate.appTesting,appThemeId:appTemplate.appThemeId,appThemeModeId:appTemplate.appThemeModeId,appThemeName:appTemplate.appThemeName,createdAt:appTemplate.createdAt,customComponentCollections:appTemplate.customComponentCollections,customDocumentTitle:appTemplate.customDocumentTitle,customDocumentTitleEnabled:appTemplate.customDocumentTitleEnabled,customShortcuts:appTemplate.customShortcuts,experimentalDataTabEnabled:appTemplate.experimentalDataTabEnabled,experimentalFeatures:appTemplate.experimentalFeatures,folders:(0,immutable_es.List)(appTemplate.folders),formAppSettings:appTemplate.formAppSettings,inAppRetoolPillAppearance:appTemplate.inAppRetoolPillAppearance,instrumentationEnabled:appTemplate.instrumentationEnabled,internationalizationSettings:appTemplate.internationalizationSettings,isFetching:appTemplate.isFetching,isFormApp:appTemplate.isFormApp,isGlobalWidget:appTemplate.isGlobalWidget,isMobileApp:appTemplate.isMobileApp,loadingIndicatorsDisabled:appTemplate.loadingIndicatorsDisabled,markdownLinkBehavior:appTemplate.markdownLinkBehavior,mobileAppSettings:appTemplate.mobileAppSettings,multiScreenMobileApp:appTemplate.multiScreenMobileApp,notificationsSettings:appTemplate.notificationsSettings,pageCodeFolders:appTemplate.pageCodeFolders,pageLoadValueOverrides:convertDefinitionsToImmutable(appTemplate.pageLoadValueOverrides),plugins:convertPluginTemplatesToImmutable(appTemplate.plugins),preloadedAppJavaScript:appTemplate.preloadedAppJavaScript,preloadedAppJSLinks:appTemplate.preloadedAppJSLinks,queryStatusVisibility:appTemplate.queryStatusVisibility,responsiveLayoutDisabled:appTemplate.responsiveLayoutDisabled,rootScreen:appTemplate.rootScreen,savePlatform:appTemplate.savePlatform,shortlink:appTemplate.shortlink,testEntities:appTemplate.testEntities,tests:appTemplate.tests,urlFragmentDefinitions:convertDefinitionsToImmutable(appTemplate.urlFragmentDefinitions),version:appTemplate.version});}
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatPluginCreate.ts
const pluginCreateReducer=(state,action)=>logErrors(action.type,()=>{const{template}=action.payload;const convertedTemplate=convertPluginFromImmutable(template);state.plugins.push(convertedTemplate);});const appStylesTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const appThemeTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const customDocumentTitleTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const datasourceTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const frameTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const functionTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const instrumentTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const stateTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const syncFunctionTemplateCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const urlFragmentPluginCreateReducer=(state,action)=>pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:action.payload});const batchPluginCreateReducer=(state,action)=>logErrors(templateUtils.BATCH_WIDGET_TEMPLATE_CREATE,()=>{action.payload.templates.forEach(template=>{pluginCreateReducer(state,{type:'WIDGET_TEMPLATE_CREATE',payload:{template}});});});
// EXTERNAL MODULE: ../packages/runtimeShared/utils/requestIdleCallbackSafe.ts
var requestIdleCallbackSafe = __webpack_require__(664492);
// EXTERNAL MODULE: ../frontend/src/common/retoolAnalytics.ts
var retoolAnalytics = __webpack_require__(174468);
// EXTERNAL MODULE: ../frontend/src/components/plugins/index.ts + 1 modules
var plugins = __webpack_require__(313667);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/getPluginsById.ts
function getPluginsById(plugins){return plugins.reduce((acc,plugin)=>{acc[plugin.id]=plugin;return acc;},{});}
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatPluginUpdate.ts
const _pluginDeleteReducer=(state,action)=>logErrors(action.type,()=>{const idsToDelete=action.payload;const pluginsById=getPluginsById(state.plugins);for(const id of idsToDelete){delete pluginsById[id];}state.plugins=Object.values(pluginsById);});const setNewPluginReducer=(state,action)=>logErrors(action.type,()=>{const{widgetId,newPlugin:_newPlugin}=action.payload;const newPlugin=convertPluginFromImmutable(_newPlugin);const index=state.plugins.findIndex(p=>p.id===widgetId);if(index<0){state.plugins.push(newPlugin);}else{state.plugins[index]=newPlugin;}});const pluginDeleteReducer=(state,action)=>_pluginDeleteReducer(state,action);const pluginDeleteTemplateOnlyReducer=(state,action)=>_pluginDeleteReducer(state,action);const pluginTemplateSetReducer=(state,action)=>setNewPluginReducer(state,action);const widgetTypeMigrationReducer=(state,action)=>setNewPluginReducer(state,action);const widgetTypeUpdateReducer=(state,action)=>setNewPluginReducer(state,action);const batchTemplateUpdateReducer=(state,action)=>logErrors(templateUtils.BATCH_WIDGET_TEMPLATE_UPDATE,()=>{const pluginsById=getPluginsById(state.plugins);for(const[pluginId,immutableUpdate]of Object.entries(action.payload.updates)){var _updatedAt$toISOStrin,_updatedAt$toISOStrin2;const update=convertPluginTemplateFromImmutable(immutableUpdate);const plugin=pluginsById[pluginId];if(!plugin)throw new Error(`Plugin not found while trying to update`);plugin.template=assign_default()(plugin.template,update);const updatedAt=new Date();plugin.updatedAt=(_updatedAt$toISOStrin=(_updatedAt$toISOStrin2=updatedAt.toISOString)===null||_updatedAt$toISOStrin2===void 0?void 0:_updatedAt$toISOStrin2.call(updatedAt))!==null&&_updatedAt$toISOStrin!==void 0?_updatedAt$toISOStrin:updatedAt.toString();}});const configureBlueprintQueryPluginReducer=(state,action)=>logErrors(constants.CONFIGURE_BLUEPRINT_QUERY_PLUGIN,()=>{const{pluginId,resourceName}=action.payload;const plugin=state.plugins.find(plugin=>plugin.id===pluginId);if(plugin===undefined)throw new Error(`removeImmutable: no plugin with id ${pluginId} found`);plugin.resourceName=resourceName;const template=plugin.template;delete template.mockResponseTransformer;delete template.enableMockResponseTransformer;delete template.isClonedDemoQuery;delete template.clonedDemoResourceType;});const pluginFolderChangeReducer=(state,action)=>logErrors(constants.PLUGIN_FOLDER_CHANGE,()=>{const{pluginId,folderName}=action.payload;const plugin=state.plugins.find(p=>p.id===pluginId);if(!plugin)throw new Error('Tried to change folder on non-existent plugin');plugin.folder=folderName;});const pluginUpdateIdReducer=(state,action)=>logErrors(constants.PLUGIN_UPDATE_ID,()=>{var _state$pageCodeFolder;const{pluginId:oldId,newId}=action.payload;const plugin=state.plugins.find(p=>p.id===oldId);if(!plugin){throw new Error(`removeImmutable: no plugin with id ${oldId} found`);}const{type:renamedPluginType,subtype:renamedPluginSubtype}=plugin;(0,requestIdleCallbackSafe.requestIdleCallbackSafe)(()=>{(0,retoolAnalytics.retoolAnalyticsTrack)('Primitive Renamed',{prevId:oldId,newId,type:renamedPluginType,subtype:renamedPluginSubtype});});plugin.id=newId;for(const p of Object.values(state.plugins)){var _p$position,_p$position2,_p$mobilePosition,_p$mobilePosition2;if(((_p$position=p.position)===null||_p$position===void 0?void 0:_p$position.container)===oldId){p.position.container=newId;}if(((_p$position2=p.position)===null||_p$position2===void 0?void 0:_p$position2.subcontainer)===oldId&&renamedPluginType==='frame'){p.position.subcontainer=newId;}if(((_p$mobilePosition=p.mobilePosition)===null||_p$mobilePosition===void 0?void 0:_p$mobilePosition.container)===oldId){p.mobilePosition.container=newId;}if(((_p$mobilePosition2=p.mobilePosition)===null||_p$mobilePosition2===void 0?void 0:_p$mobilePosition2.subcontainer)===oldId&&renamedPluginType==='frame'){p.mobilePosition.subcontainer=newId;}if(p.screen===oldId){p.screen=newId;}}state.pageCodeFolders[newId]=(_state$pageCodeFolder=state.pageCodeFolders[oldId])!==null&&_state$pageCodeFolder!==void 0?_state$pageCodeFolder:[];if(state.appTesting!==null){state.appTesting=(0,persistentSlice["default"])(state.appTesting,action);}});const datasourceTypeChangeReducer=(state,action)=>logErrors(constants.DATASOURCE_TYPE_CHANGE,()=>{const{pluginId,resourceName,newType,oldType,options}=action.payload;const datasource=state.plugins.find(p=>p.id===pluginId);if(datasource===undefined){throw new Error(`No datasource plugin with id ${pluginId} found`);}if(newType===oldType&&!(options!==null&&options!==void 0&&options.isImported)){datasource.resourceName=resourceName;}else{const Type=(0,plugins.TemplateResolver)(newType);const template=convertPluginTemplateFromImmutable(options?Type().merge(options):Type());datasource.subtype=newType;datasource.resourceName=resourceName;datasource.template=template;}});const setPluginsReducer=(state,action)=>logErrors(constants.SET_PLUGINS,()=>{const newPlugins=Array.from(action.payload.newPlugins.values());state.plugins=newPlugins.map(plugin=>convertPluginFromImmutable(plugin));});
;// CONCATENATED MODULE: ../packages/common/utils/getTypedKeys.ts
function getTypedKeys_getTypedKeys(obj){return Object.keys(obj);}
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/merge.js
var merge = __webpack_require__(751726);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge);
// EXTERNAL MODULE: ../frontend/src/retoolConstants.ts
var src_retoolConstants = __webpack_require__(273575);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/factories.ts
const DEFAULT_APP_TEMPLATE=Object.freeze({appMaxWidth:'100%',appStyles:'',appTesting:null,appThemeId:null,appThemeModeId:null,appThemeName:null,createdAt:null,customComponentCollections:[],customDocumentTitle:'',customDocumentTitleEnabled:false,customShortcuts:[],experimentalDataTabEnabled:false,experimentalFeatures:{disableMultiplayerEditing:false,multiplayerEditingEnabled:false,sourceControlTemplateDehydration:false},folders:[],formAppSettings:{customRedirectUrl:''},inAppRetoolPillAppearance:'NO_OVERRIDE',instrumentationEnabled:false,internationalizationSettings:{internationalizationEnabled:false,internationalizationFiles:[]},isFetching:false,isFormApp:false,isGlobalWidget:false,isMobileApp:false,loadingIndicatorsDisabled:false,markdownLinkBehavior:'auto',mobileAppSettings:{displaySetting:{landscapeMode:false,tabletMode:false},mobileOfflineModeBannerMode:'default',mobileOfflineModeDelaySync:false,mobileOfflineModeEnabled:false},multiScreenMobileApp:false,notificationsSettings:{globalQueryShowFailureToast:true,globalQueryShowSuccessToast:false,globalQueryToastDuration:4.5,globalToastPosition:'bottomRight'},pageCodeFolders:{},pageLoadValueOverrides:[],plugins:[],preloadedAppJavaScript:null,preloadedAppJSLinks:[],queryStatusVisibility:false,responsiveLayoutDisabled:false,rootScreen:null,shortlink:null,testEntities:[],tests:[],urlFragmentDefinitions:[],version:src_retoolConstants.RETOOL_VERSION});const DEFAULT_POSITION=Object.freeze({type:'grid',container:'',rowGroup:'body',subcontainer:'',row:0,col:0,height:5,width:3,tabNum:0,stackPosition:null});function createAppTemplateSlice(overrides={}){return merge_default()({},DEFAULT_APP_TEMPLATE,overrides);}function createPosition(overrides={}){return merge_default()({},DEFAULT_POSITION,overrides);}
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatPosition.ts
function applyDiff(position,move,newDiffOnOldRowHeight=false){const newPosition={};for(const key of getTypedKeys_getTypedKeys(position)){switch(key){case'type':newPosition[key]=key in move?move[key]:position[key];break;case'container':case'subcontainer':newPosition[key]=key in move?move[key]:position[key];break;case'rowGroup':newPosition[key]=key in move?move[key]:position[key];break;case'tabNum':newPosition[key]=key in move?move[key]:position[key];break;case'stackPosition':if(key in move){newPosition[key]=move[key];}else if(key in position){newPosition[key]=position[key];}else if(move.type==='grid'){newPosition[key]=undefined;}break;case'row':case'height':{var _move$key;const diff=newDiffOnOldRowHeight?Math.round((_move$key=move[key])!==null&&_move$key!==void 0?_move$key:0)/5:move[key];newPosition[key]=position[key]+(diff!==null&&diff!==void 0?diff:0);break;}case'col':case'width':{var _move$key2;newPosition[key]=position[key]+((_move$key2=move[key])!==null&&_move$key2!==void 0?_move$key2:0);break;}default:{const _exhaustive=key;return _exhaustive;}}}return createPosition(newPosition);}const widgetRepositionReducer=(state,action)=>logErrors(widgetReposition2.WIDGET_REPOSITION2,()=>{const{moves,largeScreen}=action.payload;const positionKey=largeScreen?'position':'mobilePosition';const pluginsById=getPluginsById(state.plugins);for(const widgetMove of moves){const{widgetIds,move,screen}=widgetMove;if(screen!==null&&screen!==void 0&&screen.descendentIds){for(const descendentId of screen.descendentIds){if(pluginsById[descendentId]){pluginsById[descendentId].screen=screen.screenName;}}}for(const widgetId of widgetIds){const widget=pluginsById[widgetId];if(!widget){(0,browser.captureMessage)('No widget plugin found at widgetId',{level:'error',extra:{widgetId}});continue;}if(screen){widget.screen=screen.screenName;}const position=widget[positionKey];if(position){widget[positionKey]=applyDiff(position,move,true);}pluginsById[widgetId]=widget;}}});const widgetSetMobileAppPositionReducer=(state,action)=>logErrors(mobileAppTemplate.WIDGET_SET_MOBILE_APP_POSITION,()=>{const{widgetId,newMobileAppPosition}=action.payload;if(!widgetId)throw new Error('No widgetId provided to WIDGET_SET_MOBILE_POSITION2');const plugin=state.plugins.find(p=>p.id===widgetId);if(!plugin)throw new Error('Invalid widgetId provided to WIDGET_SET_MOBILE_APP_POSITION');const position=newMobileAppPosition?new mobileAppPosition.MobileAppPosition(newMobileAppPosition):new mobileAppPosition.MobileAppPosition();plugin.mobileAppPosition=convertMobileAppPositionFromImmutable(position);});const widgetSetMobilePositionReducer=(state,action)=>logErrors(constants.WIDGET_SET_MOBILE_POSITION2,()=>{const{widgetId,newPosition}=action.payload;if(!widgetId)throw new Error('No widgetId provided to WIDGET_SET_MOBILE_POSITION2');const plugin=state.plugins.find(p=>p.id===widgetId);if(!plugin)throw new Error('Invalid widgetId provided to WIDGET_SET_MOBILE_POSITION2');const position=newPosition?convertPositionFromImmutable(newPosition):undefined;plugin.mobilePosition=position;});const widgetSetPositionReducer=(state,action)=>logErrors(constants.WIDGET_SET_POSITION2,()=>{const{widgetId,newPosition}=action.payload;if(!widgetId)throw new Error('No widgetId provided to WIDGET_SET_POSITION2');const plugin=state.plugins.find(p=>p.id===widgetId);if(!plugin)throw new Error('Invalid widgetId provided to WIDGET_SET_POSITION2');const position=newPosition?convertPositionFromImmutable(newPosition):undefined;plugin.position=position;});
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compatReducers/compatUpdate.ts
const tabIndexUpdater=(tabIndex,sourceIndex,targetIndex)=>{if(tabIndex===sourceIndex){return targetIndex;}let willChange;if(sourceIndex<targetIndex){willChange=tabIndex>=sourceIndex&&tabIndex<=targetIndex;}else{willChange=tabIndex>=targetIndex&&tabIndex<=sourceIndex;}const change=sourceIndex>targetIndex?1:-1;if(willChange){return tabIndex+change;}return tabIndex;};function updateNameValueList(list,index,update){if(index<list.length){var _update$name2,_update$value2;if(Object.keys(update).length===0){list.splice(index,1);return list;}const definition=list[index];if(definition===undefined){var _update$name,_update$value;list[index]={name:(_update$name=update.name)!==null&&_update$name!==void 0?_update$name:'',value:(_update$value=update.value)!==null&&_update$value!==void 0?_update$value:''};return list;}definition.name=(_update$name2=update.name)!==null&&_update$name2!==void 0?_update$name2:'';definition.value=(_update$value2=update.value)!==null&&_update$value2!==void 0?_update$value2:'';return list;}if(Object.keys(update).length>0){var _update$name3,_update$value3;list.push({name:(_update$name3=update.name)!==null&&_update$name3!==void 0?_update$name3:'',value:(_update$value3=update.value)!==null&&_update$value3!==void 0?_update$value3:''});}return list;}function reorderTabs(plugins,{tabbedContainerId,index,newIndex}){const largeScreenChildren=plugins.filter(plugin=>{var _plugin$position;return((_plugin$position=plugin.position)===null||_plugin$position===void 0?void 0:_plugin$position.container)===tabbedContainerId;});const mobileChildren=plugins.filter(plugin=>{var _plugin$mobilePositio;return((_plugin$mobilePositio=plugin.mobilePosition)===null||_plugin$mobilePositio===void 0?void 0:_plugin$mobilePositio.container)===tabbedContainerId;});for(const plugin of largeScreenChildren){var _plugin$position2;if(((_plugin$position2=plugin.position)===null||_plugin$position2===void 0?void 0:_plugin$position2.tabNum)!==undefined){plugin.position.tabNum=tabIndexUpdater(Number(plugin.position.tabNum),index,newIndex);}}for(const plugin of Object.values(mobileChildren)){var _plugin$mobilePositio2;if(((_plugin$mobilePositio2=plugin.mobilePosition)===null||_plugin$mobilePositio2===void 0?void 0:_plugin$mobilePositio2.tabNum)!==undefined){plugin.mobilePosition.tabNum=tabIndexUpdater(Number(plugin.mobilePosition.tabNum),index,newIndex);}}return plugins;}const disableResponsiveLayoutReducer=(state,action)=>logErrors(constants.DISABLE_RESPONSIVE_LAYOUT,()=>{state.responsiveLayoutDisabled=action.payload.disabled;});const failureRestoreReducer=(state,_action)=>logErrors(constants.FAILURE_RESTORE,()=>{state.isFetching=false;});const pageLoadValueOverrideUpdateReducer=(state,action)=>logErrors(updatePageLoadOverrides.PAGE_LOAD_VALUE_OVERRIDE_UPDATE,()=>{const{index,update}=action.payload;if(!Array.isArray(state.pageLoadValueOverrides)){state.pageLoadValueOverrides=[];}state.pageLoadValueOverrides=updateNameValueList(state.pageLoadValueOverrides,index,update);});const reorderTabbedContainerReducer=(state,action)=>logErrors(constants.REORDER_TABBED_CONTAINER,()=>{state.plugins=reorderTabs(state.plugins,action.payload);});const requestRestoreReducer=(state,_action)=>logErrors(constants.REQUEST_RESTORE,()=>{state.isFetching=true;});const screenMoveReducer=(state,action)=>logErrors(constants.SCREEN_MOVE,()=>{const{newIndex,oldIndex}=action.payload;const pluginList=state.plugins;const movedScreen=pluginList[oldIndex];if(!movedScreen)return;const removeIndex=oldIndex+(newIndex<=oldIndex?1:0);pluginList.splice(newIndex,0,movedScreen);pluginList.splice(removeIndex,1);state.plugins=pluginList;});const setCustomDocumentTitleReducer=(state,action)=>logErrors(constants.SET_CUSTOM_DOCUMENT_TITLE,()=>{state.customDocumentTitle=action.payload.customDocumentTitle;});const queryMoveReducer=(state,action)=>logErrors(queryTabMove.QUERY_MOVE,()=>{const{newIndex,oldIndex,newFolder}=action.payload;const pluginList=Object.values(state.plugins);const movedQuery=pluginList[oldIndex];if(!movedQuery)return;const removeIndex=oldIndex+(newIndex<=oldIndex?1:0);pluginList.splice(newIndex,0,movedQuery);pluginList.splice(removeIndex,1);movedQuery.folder=newFolder;state.plugins=pluginList;});const urlFragmentDefUpdateReducer=(state,action)=>logErrors(updateFragmentDefinition.URL_FRAGMENT_DEF_UPDATE,()=>{const{index,update}=action.payload;if(!Array.isArray(state.urlFragmentDefinitions)){state.urlFragmentDefinitions=[];}state.urlFragmentDefinitions=updateNameValueList(state.urlFragmentDefinitions,index,update);});const multipleQueryMoveReducer=(state,action)=>logErrors(queryTabMove.MULTIPLE_QUERY_MOVE,()=>{const{updatedPluginsList}=action.payload;state.plugins=updatedPluginsList.map(plugin=>convertPluginFromImmutable(plugin));});
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/compat.ts
function widgetUpdateCustomizer(_objValue,srcValue){if(isWasImmutableMap(srcValue)){return createWasImmutableMap(srcValue);}if(isWasImmutableOrderedMap(srcValue)){return createWasImmutableOrderedMap(srcValue);}if(isWasImmutableSet(srcValue)){return new WasImmutableSet(...srcValue);}if(isWasImmutableList(srcValue)){return new WasImmutableList(...srcValue);}return undefined;}const extraReducers=builder=>{builder.addCase(constants.ADD_CUSTOM_COMPONENT_COLLECTION_TO_APP_TEMPLATE,addCustomComponentCollectionReducer);builder.addCase(constants.APP_STYLES_TEMPLATE_CREATE,appStylesTemplateCreateReducer);persistentSlice.appTestingActionNames.forEach(actionName=>{builder.addCase(actionName,setAppTestingReducer);});builder.addCase(constants.APP_THEME_TEMPLATE_CREATE,appThemeTemplateCreateReducer);builder.addCase(templateUtils.BATCH_WIDGET_TEMPLATE_CREATE,batchPluginCreateReducer);builder.addCase(templateUtils.BATCH_WIDGET_TEMPLATE_UPDATE,batchTemplateUpdateReducer);builder.addCase(constants.CLEAR_PLUGINS,state=>logErrors(constants.CLEAR_PLUGINS,()=>{state.plugins=[];}));builder.addCase(constants.CONFIGURE_BLUEPRINT_QUERY_PLUGIN,configureBlueprintQueryPluginReducer);builder.addCase(constants.CUSTOM_DOCUMENT_TITLE_TEMPLATE_CREATE,customDocumentTitleTemplateCreateReducer);builder.addCase(constants.DATASOURCE_TEMPLATE_CREATE,datasourceTemplateCreateReducer);builder.addCase(constants.DATASOURCE_TYPE_CHANGE,datasourceTypeChangeReducer);builder.addCase(constants.DISABLE_LOADING_INDICATORS,(state,action)=>logErrors(constants.DISABLE_LOADING_INDICATORS,()=>{const{disabled}=action.payload;state.loadingIndicatorsDisabled=disabled;}));builder.addCase(constants.ENABLE_CUSTOM_DOCUMENT_TITLE,(state,action)=>logErrors(constants.ENABLE_CUSTOM_DOCUMENT_TITLE,()=>{const{enabled}=action.payload;state.customDocumentTitleEnabled=enabled;}));builder.addCase(constants.DISABLE_RESPONSIVE_LAYOUT,disableResponsiveLayoutReducer);builder.addCase(constants.FAILURE_RESTORE,failureRestoreReducer);builder.addCase(constants.FOLDER_CHANGE_SCOPE,folderChangeScopeReducer);builder.addCase(constants.FOLDER_CREATE,folderCreateReducer);builder.addCase(constants.FOLDER_DELETE,folderDeleteReducer);builder.addCase(constants.FOLDER_MOVE,folderMoveReducer);builder.addCase(constants.FOLDER_MOVE_TO_PAGE,folderMoveToPageReducer);builder.addCase(constants.FOLDER_RECURSIVE_DELETE,folderRecursiveDeleteReducer);builder.addCase(constants.FOLDER_RENAME,folderRenameReducer);builder.addCase(constants.FORMAT_WORKFLOW_QUERY,(state,action)=>logErrors(constants.FORMAT_WORKFLOW_QUERY,()=>{const{queryId,templateKey,formattedQuery}=action.payload;const queryPlugin=state.plugins.find(p=>p.id===queryId);if(queryPlugin===undefined){throw new Error('Invalid plugin id: no plugin with provided id');}if(isObject_default()(queryPlugin===null||queryPlugin===void 0?void 0:queryPlugin.template)){queryPlugin.template[templateKey]=formattedQuery;}else{(0,browser.captureMessage)('Invalid template on query plugin, not object like.',{level:'error'});}}));builder.addCase(constants.FRAME_TEMPLATE_CREATE,frameTemplateCreateReducer);builder.addCase(constants.FUNCTION_TEMPLATE_CREATE,functionTemplateCreateReducer);builder.addCase(constants.INSTRUMENT_TEMPLATE_CREATE,instrumentTemplateCreateReducer);builder.addCase(constants.MIGRATIONS_SUCCESS,(state,action)=>logErrors(constants.MIGRATIONS_SUCCESS,()=>{const{migratedAppTemplate}=action.payload;const newAppTemplate=convertAppTemplateFromImmutable(migratedAppTemplate);return newAppTemplate;}));builder.addCase(constants.MIGRATIONS_UP_TO_DATE,(state,action)=>logErrors(constants.MIGRATIONS_UP_TO_DATE,()=>{const{migratedAppTemplate}=action.payload;const newAppTemplate=convertAppTemplateFromImmutable(migratedAppTemplate);return newAppTemplate;}));builder.addCase(queryTabMove.MULTIPLE_QUERY_MOVE,multipleQueryMoveReducer);builder.addCase(constants.PAGE_CODE_FOLDER_CLEAR,pageCodeFoldersClearReducer);builder.addCase(constants.PAGE_CODE_FOLDER_REORDER,pageCodeFoldersReorderReducer);builder.addCase(updatePageLoadOverrides.PAGE_LOAD_VALUE_OVERRIDE_UPDATE,pageLoadValueOverrideUpdateReducer);builder.addCase(constants.PLUGIN_DELETE,pluginDeleteReducer);builder.addCase(constants.PLUGIN_DELETE_TEMPLATE_ONLY,pluginDeleteTemplateOnlyReducer);builder.addCase(constants.PLUGIN_FOLDER_CHANGE,pluginFolderChangeReducer);builder.addCase(templateUtils.PLUGIN_TEMPLATE_SET,pluginTemplateSetReducer);builder.addCase(constants.PLUGIN_UPDATE_ID,pluginUpdateIdReducer);builder.addCase(queryTabMove.QUERY_MOVE,queryMoveReducer);builder.addCase(constants.REMOVE_CUSTOM_COMPONENT_COLLECTION_FROM_APP_TEMPLATE,removeCustomComponentCollectionReducer);builder.addCase(constants.REORDER_TABBED_CONTAINER,reorderTabbedContainerReducer);builder.addCase(multiscreen_actionTypes.ROOT_SCREEN_UPDATE,(state,action)=>logErrors(multiscreen_actionTypes.ROOT_SCREEN_UPDATE,()=>{const{screenId}=action.payload;state.rootScreen=screenId;}));builder.addCase(constants.REQUEST_RESTORE,requestRestoreReducer);builder.addCase(constants.SCREEN_MOVE,screenMoveReducer);builder.addCase(constants.SET_CUSTOM_DOCUMENT_TITLE,setCustomDocumentTitleReducer);builder.addCase(constants.SET_CUSTOM_SHORTCUTS,(state,action)=>logErrors(constants.SET_CUSTOM_SHORTCUTS,()=>{const{customShortcuts}=action.payload;state.customShortcuts=customShortcuts;}));builder.addCase(constants.SET_EXPERIMENTAL_FEATURES,(state,action)=>logErrors(constants.SET_EXPERIMENTAL_FEATURES,()=>{state.experimentalFeatures=action.payload;}));builder.addCase(constants.SET_FORM_APP_SETTINGS,(state,action)=>logErrors(constants.SET_FORM_APP_SETTINGS,()=>{state.formAppSettings=assign_default()({},state.formAppSettings,action.payload);}));builder.addCase(constants.SET_IN_APP_RETOOL_PILL_APPEARANCE,(state,action)=>logErrors(constants.SET_IN_APP_RETOOL_PILL_APPEARANCE,()=>{state.inAppRetoolPillAppearance=action.payload.inAppRetoolPillAppearance;}));builder.addCase(constants.SET_INTERNATIONALIZATION_SETTINGS,(state,action)=>logErrors(constants.SET_INTERNATIONALIZATION_SETTINGS,()=>{var _state$internationali;state.internationalizationSettings=assign_default()({internationalizationEnabled:false,internationalizationFiles:[]},(_state$internationali=state.internationalizationSettings)!==null&&_state$internationali!==void 0?_state$internationali:{},action.payload);}));builder.addCase(constants.SET_MARKDOWN_LINK_BEHAVIOR,(state,action)=>logErrors(constants.SET_MARKDOWN_LINK_BEHAVIOR,()=>{state.markdownLinkBehavior=action.payload.markdownLinkBehavior;}));builder.addCase(constants.SET_MOBILE_APP_SETTINGS,(state,action)=>logErrors(constants.SET_MOBILE_APP_SETTINGS,()=>{state.mobileAppSettings=action.payload;}));builder.addCase(constants.SET_NOTIFICATIONS_SETTINGS,(state,action)=>logErrors(constants.SET_NOTIFICATIONS_SETTINGS,()=>{state.notificationsSettings=assign_default()({},state.notificationsSettings,action.payload);}));builder.addCase(constants.SET_PLUGINS,setPluginsReducer);builder.addCase(constants.SET_QUERY_STATUS_VISIBILITY,(state,action)=>logErrors(constants.SET_QUERY_STATUS_VISIBILITY,()=>{state.queryStatusVisibility=action.payload.queryStatusVisibility;}));builder.addCase(actionTypes.TEARDOWN_PAGE,()=>logErrors(actionTypes.TEARDOWN_PAGE,()=>{return createAppTemplateSlice();}));builder.addCase(constants.RESET_TEMPLATE,()=>logErrors(constants.RESET_TEMPLATE,()=>{return createAppTemplateSlice();}));builder.addCase(constants.UPDATE_APP_STYLES,(state,action)=>logErrors(constants.UPDATE_APP_STYLES,()=>{state.appStyles=action.payload.value;}));builder.addCase(constants.STATE_TEMPLATE_CREATE,stateTemplateCreateReducer);builder.addCase(constants.SYNC_FUNCTION_TEMPLATE_CREATE,syncFunctionTemplateCreateReducer);builder.addCase(constants.UPDATE_CUSTOM_COMPONENT_COLLECTION_IN_APP_TEMPLATE,updateCustomComponentCollectionReducer);builder.addCase(constants.UPDATE_CUSTOM_DOCUMENT_TITLE,(state,action)=>logErrors(constants.UPDATE_CUSTOM_DOCUMENT_TITLE,()=>{const{value}=action.payload;state.customDocumentTitle=value;}));builder.addCase(actionTypes.UPDATE_GLOBAL_STYLES,(state,action)=>logErrors(actionTypes.UPDATE_GLOBAL_STYLES,()=>{const{appThemeId,appThemeName}=action.payload;state.appThemeId=appThemeId;if(appThemeName!==undefined){state.appThemeName=appThemeName;}}));builder.addCase(constants.UPDATE_MAX_WIDTH,(state,action)=>logErrors(constants.UPDATE_MAX_WIDTH,()=>{state.appMaxWidth=action.payload.appMaxWidth;}));builder.addCase(constants.UPDATE_PRELOADED_APP_JAVASCRIPT,(state,action)=>logErrors(constants.UPDATE_PRELOADED_APP_JAVASCRIPT,()=>{state.preloadedAppJavaScript=action.payload.preloadedAppJavaScript;}));builder.addCase(constants.UPDATE_PRELOADED_APP_JS_LINKS,(state,action)=>logErrors(constants.UPDATE_PRELOADED_APP_JS_LINKS,()=>{state.preloadedAppJSLinks=action.payload.preloadedAppJSLinks;}));builder.addCase(constants.UPDATE_RESOURCE_NAME,(state,action)=>logErrors(constants.UPDATE_RESOURCE_NAME,()=>{const{pluginId,resourceName}=action.payload;const plugin=state.plugins.find(p=>p.id===pluginId);if(plugin!==undefined){plugin.resourceName=resourceName;}}));builder.addCase(actionTypes.UPDATE_THEME_MODE,(state,action)=>logErrors(actionTypes.UPDATE_THEME_MODE,()=>{var _action$payload$appTh;state.appThemeModeId=(_action$payload$appTh=action.payload.appThemeModeId)!==null&&_action$payload$appTh!==void 0?_action$payload$appTh:null;}));builder.addCase(updateFragmentDefinition.URL_FRAGMENT_DEF_UPDATE,urlFragmentDefUpdateReducer);builder.addCase(updateFragmentDefinition.URL_FRAGMENT_PLUGIN_CREATE,urlFragmentPluginCreateReducer);builder.addCase(constants.WIDGET_TEMPLATE_CREATE,pluginCreateReducer);builder.addCase(sendSave.WIDGET_TEMPLATE_UPDATE,(state,action)=>logErrors(sendSave.WIDGET_TEMPLATE_UPDATE,()=>{const id=action.payload.widgetId;const templateUpdate=convertTemplateUpdateFromImmutable(action.payload.update);const plugin=state.plugins.find(p=>p.id===id);if(!plugin)return;const merged=assignWith_default()(plugin.template,templateUpdate,widgetUpdateCustomizer);plugin.template=merged;plugin.updatedAt=new Date().toISOString();}));builder.addCase(widgetReposition2.WIDGET_REPOSITION2,widgetRepositionReducer);builder.addCase(constants.WIDGET_SET_MOBILE_POSITION2,widgetSetMobilePositionReducer);builder.addCase(constants.WIDGET_SET_POSITION2,widgetSetPositionReducer);builder.addCase(mobileAppTemplate.WIDGET_SET_MOBILE_APP_POSITION,widgetSetMobileAppPositionReducer);builder.addCase(constants.WIDGET_TYPE_MIGRATION,widgetTypeMigrationReducer);builder.addCase(constants.WIDGET_TYPE_UPDATE,widgetTypeUpdateReducer);};
// EXTERNAL MODULE: ../frontend/src/store/app/template/appTemplate/constants.ts
var appTemplate_constants = __webpack_require__(63693);
// EXTERNAL MODULE: ../frontend/src/store/app/template/appTemplate/utils.ts
var utils = __webpack_require__(82277);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js
var lodash_isEqual = __webpack_require__(244214);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqualWith.js
var isEqualWith = __webpack_require__(201810);
var isEqualWith_default = /*#__PURE__*/__webpack_require__.n(isEqualWith);
// EXTERNAL MODULE: ../packages/runtimeShared/utils/typeguards.ts
var typeguards = __webpack_require__(101511);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/verify.ts
const MS_IN_MINUTE=60_000;function _comparePlugins(a,b){const keys=getTypedKeys(a);for(const key of keys){if(key==='updatedAt'||key==='createdAt'){const dateA=new Date(a[key]);const dateB=new Date(b[key]);if(Math.abs(dateA.valueOf()-dateB.valueOf())>MS_IN_MINUTE){console.warn('removeImmutable',`plugin "${a.id}" field "${key}" is different!`,a[key],b[key]);}continue;}if(!isEqual(a[key],b[key])){console.warn('removeImmutable',`plugin "${a.id}" field "${key}" is different!`,a[key],b[key]);if(key==='template'){const typedKeys=getTypedKeys(a[key]);for(const typedKey of typedKeys){const av=a[key][typedKey];const bv=b[key][typedKey];if(!isEqual(av,bv)){console.warn('removeImmutable',`plugin "${a.id}" field "${key}.${typedKey}" is different!`,a[key][typedKey],b[key][typedKey]);}}}}}}function sendErrorData(sliceName,options={}){const{key,newState,oldState,extra,message:_message}=options;const message=_message?`removeImmutable:${sliceName}${key?`.${key}`:''} has fallen out of sync: ${_message}!`:`removeImmutable:${sliceName}${key?`.${key}`:''} has fallen out of sync!`;if(false){}(0,browser.captureMessage)(message,{level:'debug',extra});datadogMetrics["default"].increment(`frontend.remove_immutable.out_of_sync`,{removeImmutableJs:'true',actionType:typeof(extra===null||extra===void 0?void 0:extra.actionType)==='string'?extra.actionType:undefined,key,releaseVersion:retoolConstants.RETOOL_VERSION});}const _verifyAppTemplateData=(newAppTemplate,originalAppTemplate,actionType)=>{const keys=getTypedKeys_getTypedKeys(newAppTemplate);for(const key of keys){switch(key){case'appMaxWidth':case'appStyles':case'createdAt':case'customDocumentTitle':case'customDocumentTitleEnabled':case'experimentalDataTabEnabled':case'inAppRetoolPillAppearance':case'instrumentationEnabled':case'isFetching':case'isFormApp':case'isGlobalWidget':case'isMobileApp':case'loadingIndicatorsDisabled':case'markdownLinkBehavior':case'multiScreenMobileApp':case'preloadedAppJavaScript':case'queryStatusVisibility':case'responsiveLayoutDisabled':case'savePlatform':case'shortlink':case'version':if(newAppTemplate[key]!==originalAppTemplate.get(key)){sendErrorData(`app_template`,{key,extra:{actionType},oldState:originalAppTemplate.get(key),newState:newAppTemplate[key]});return false;}break;case'appThemeId':case'appThemeModeId':case'appThemeName':case'rootScreen':{const newValue=newAppTemplate[key];const ogValue=originalAppTemplate.get(key);if((0,typeguards.isNullish)(ogValue)&&newValue!==null||!(0,typeguards.isNullish)(ogValue)&&newValue===null){sendErrorData(`app_template`,{key,extra:{actionType}});return false;}if(newValue!==ogValue){sendErrorData(`app_template`,{key,extra:{actionType}});return false;}break;}case'appTesting':case'customComponentCollections':case'customShortcuts':case'experimentalFeatures':case'formAppSettings':case'internationalizationSettings':case'mobileAppSettings':case'notificationsSettings':case'pageCodeFolders':case'preloadedAppJSLinks':case'testEntities':case'tests':{const newValue=newAppTemplate[key];const ogValue=originalAppTemplate.get(key);if(!isEqual_default()(newValue,ogValue)){sendErrorData(`app_template`,{key,extra:{actionType},newState:newValue,oldState:ogValue});return false;}break;}case'folders':{const newValue=newAppTemplate[key];const ogValue=originalAppTemplate.get(key).toArray();if(!isEqual_default()(newValue,ogValue)){sendErrorData(`app_template`,{key,extra:{actionType},newState:newValue,oldState:ogValue});return false;}break;}case'pageLoadValueOverrides':case'urlFragmentDefinitions':{const newValue=newAppTemplate[key];const ogValue=originalAppTemplate.get(key).toJS();if(!isEqual_default()(newValue,ogValue)){sendErrorData(`app_template`,{key,extra:{actionType},newState:newValue,oldState:ogValue});return false;}break;}case'plugins':{const _newPlugins=newAppTemplate[key];const newPlugins=_newPlugins.reduce((acc,plugin)=>{acc[plugin.id]=plugin;return acc;},{});const ogPlugins=originalAppTemplate.get(key);const _ogPluginsConverted=convertPluginTemplatesFromImmutable(ogPlugins);const ogPluginsConverted=_ogPluginsConverted.reduce((acc,plugin)=>{acc[plugin.id]=plugin;return acc;},{});if(!isEqualWith_default()(newPlugins,ogPluginsConverted,(a,b,key)=>{if(key==='updatedAt'||key==='createdAt'){const dateA=new Date(a);const dateB=new Date(b);if(Math.abs(dateA.valueOf()-dateB.valueOf())<=MS_IN_MINUTE){return true;}return false;}return undefined;})){sendErrorData(`app_template`,{key,extra:{actionType},newState:newPlugins,oldState:ogPluginsConverted});if(false){}return false;}break;}default:{const _exhaustiveCheck=key;return _exhaustiveCheck;}}}return true;};const verifyAppTemplateData=async(state,actionType)=>{const{appTemplateSelector}=await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4658));const newAppTemplate=appTemplateSelector(state);const originalAppTemplate=(0,selectors_appTemplateSelector.appTemplateSelector)(state);return _verifyAppTemplateData(newAppTemplate,originalAppTemplate,actionType);};const verifyAppTemplateDataThunk=(0,redux.createRetoolAsyncThunk)('remove-immutable-js/verify-app-template-data',({actionType},{getState})=>{(0,requestIdleCallbackSafe.requestIdleCallbackSafe)(async()=>{const state=getState();datadogMetrics["default"].increment('frontend.remove_immutable.actions_that_modify_app_template',{actionType,releaseVersion:retoolConstants.RETOOL_VERSION});await verifyAppTemplateData(state,actionType);});});
;// CONCATENATED MODULE: ../frontend/src/store/app/template/appTemplate/slice.ts
const initialState=createAppTemplateSlice();function measureSliceLoad(){const appTemplateSliceLoad=performance.Performance.measure('loadRemoveImmutableAppTemplateSlice',{start:utils.LOAD_REMOVE_IMMUTABLE_APP_TEMPLATE_SLICE_START});if((appTemplateSliceLoad===null||appTemplateSliceLoad===void 0?void 0:appTemplateSliceLoad.duration)!==undefined){datadogMetrics["default"].timing('frontend.remove_immutable.performance.slice_load_time',appTemplateSliceLoad.duration,{slice_name:appTemplate_constants.NAME});}}function startMiddlewareListener(){listenerMiddleware.listenerMiddleware.startListening({predicate:(_,currentState,previousState)=>{if((0,selectors_appTemplateSelector.appTemplateSelector)(currentState)!==(0,selectors_appTemplateSelector.appTemplateSelector)(previousState)){return true;}return false;},effect:(action,listenerApi)=>{listenerApi.dispatch(verifyAppTemplateDataThunk({actionType:action.type}));}});}const slice=(0,redux.createRetoolSlice)({name:appTemplate_constants.NAME,initialState,reducers:{setAppTemplate(_state,action){const{appTemplate}=action.payload;return appTemplate;}},extraReducers: extraReducers,undoable:{groupBy:batchUndoGroupBy.batchUndoGroupBy}});const{reducer:appTemplateReducer,selector:appTemplateSelector,setAppTemplate}=slice;

/***/ }),

/***/ 664492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelIdleCallbackSafe: () => (/* binding */ cancelIdleCallbackSafe),
/* harmony export */   requestIdleCallbackSafe: () => (/* binding */ requestIdleCallbackSafe)
/* harmony export */ });
function requestIdleCallbackSafe(callback,options){try{if(typeof requestIdleCallback!=='undefined'){return requestIdleCallback(callback,options);}}catch(e){throw new Error(`What the hell ${typeof requestIdleCallback}`);}return requestIdleCallbackFallback(callback);}function requestIdleCallbackFallback(callback){const start=Date.now();return setTimeout(()=>{callback({didTimeout:false,timeRemaining:()=>{return Math.max(0,50-(Date.now()-start));}});},1);}function cancelIdleCallbackSafe(id){if(typeof cancelIdleCallback!=='undefined'){cancelIdleCallback(id);}else{cancelIdleCallbackFallback(id);}}function cancelIdleCallbackFallback(id){clearTimeout(id);}

/***/ }),

/***/ 666905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(377170),
    isObjectLike = __webpack_require__(10474);

/** `Object#toString` result references. */
var dateTag = '[object Date]';

/**
 * The base implementation of `_.isDate` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 */
function baseIsDate(value) {
  return isObjectLike(value) && baseGetTag(value) == dateTag;
}

module.exports = baseIsDate;


/***/ }),

/***/ 314129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(483371),
    createAssigner = __webpack_require__(920711),
    keys = __webpack_require__(660322);

/**
 * This method is like `_.assign` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignInWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keys(source), object, customizer);
});

module.exports = assignWith;


/***/ }),

/***/ 181162:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(377170),
    isObjectLike = __webpack_require__(10474);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && baseGetTag(value) == boolTag);
}

module.exports = isBoolean;


/***/ }),

/***/ 595878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsDate = __webpack_require__(666905),
    baseUnary = __webpack_require__(880683),
    nodeUtil = __webpack_require__(396041);

/* Node.js helper references. */
var nodeIsDate = nodeUtil && nodeUtil.isDate;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

module.exports = isDate;


/***/ }),

/***/ 201810:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(396054);

/**
 * This method is like `_.isEqual` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with up to
 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqualWith(array, other, customizer);
 * // => true
 */
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
}

module.exports = isEqualWith;


/***/ })

}])
//# sourceMappingURL=4658.4e05dfc8.chunk.js.map