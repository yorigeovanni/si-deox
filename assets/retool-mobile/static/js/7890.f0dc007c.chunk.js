(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[7890],{

/***/ 357890:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  appTemplateFoldersReducer: () => (/* binding */ appTemplateFoldersReducer),
  appTemplateFoldersSelector: () => (/* binding */ appTemplateFoldersSelector),
  appTemplatePageCodeFoldersSelector: () => (/* binding */ appTemplatePageCodeFoldersSelector),
  createFolder: () => (/* binding */ createFolder),
  createFolders: () => (/* binding */ createFolders),
  foldersSelector: () => (/* binding */ foldersSelector),
  measureSliceLoad: () => (/* binding */ measureSliceLoad),
  setFolders: () => (/* binding */ setFolders),
  startMiddlewareListener: () => (/* binding */ startMiddlewareListener)
});

// EXTERNAL MODULE: ../frontend/src/common/analytics/performance/index.ts
var performance = __webpack_require__(482762);
// EXTERNAL MODULE: ../frontend/src/common/datadogMetrics/index.ts + 1 modules
var datadogMetrics = __webpack_require__(435214);
// EXTERNAL MODULE: ./stubs/@sentry/browser/index.ts
var browser = __webpack_require__(393749);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/xor.js
var xor = __webpack_require__(466522);
var xor_default = /*#__PURE__*/__webpack_require__.n(xor);
// EXTERNAL MODULE: ../packages/common/retoolConstants.ts
var retoolConstants = __webpack_require__(948896);
// EXTERNAL MODULE: ../packages/runtimeShared/utils/requestIdleCallbackSafe.ts
var requestIdleCallbackSafe = __webpack_require__(607169);
// EXTERNAL MODULE: ../frontend/src/store/selectors/appTemplateFoldersSelectors.ts
var appTemplateFoldersSelectors = __webpack_require__(483347);
// EXTERNAL MODULE: ../frontend/src/store/utils/redux.ts + 3 modules
var redux = __webpack_require__(298733);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/folders/verify.ts
function sendErrorData(key,options={}){const{newState,oldState,extra,message:_message}=options;const message=_message?`removeImmutable:${key} has fallen out of sync: ${_message}!`:`removeImmutable:${key} has fallen out of sync!`;if(false){}(0,browser.captureMessage)(message,{level:'debug',extra});datadogMetrics["default"].increment(`frontend.remove_immutable.${key}.out_of_sync`,{removeImmutableJs:'true',actionType:typeof(extra===null||extra===void 0?void 0:extra.actionType)==='string'?extra.actionType:undefined,releaseVersion:retoolConstants.RETOOL_VERSION});}const verifyAppTemplateFoldersData=async(state,actionType)=>{const{appTemplateFoldersSelector}=await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 357890));const newFoldersList=appTemplateFoldersSelector(state);const oldFoldersList=(0,appTemplateFoldersSelectors.foldersSelectorPureJS)(state);if(newFoldersList.length!==oldFoldersList.length){sendErrorData('app_template_folders',{message:'different number of folders',newState:newFoldersList,oldState:oldFoldersList,extra:{actionType}});return false;}for(let i=0;i<newFoldersList.length;i++){if(newFoldersList[i]!==oldFoldersList[i]){sendErrorData('app_template_folders',{message:`folders at ${i} do not match`,newState:newFoldersList,oldState:oldFoldersList,extra:{actionType}});return false;}}return true;};const verifyAppTemplatePageCodeFoldersData=async(state,actionType)=>{const{appTemplatePageCodeFoldersSelector}=await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 357890));const newPageCodeFolders=appTemplatePageCodeFoldersSelector(state);const oldPageCodeFolders=(0,appTemplateFoldersSelectors.pageCodeFoldersSelector)(state);const newKeys=Object.keys(newPageCodeFolders);const oldKeys=Object.keys(oldPageCodeFolders);if(newKeys.length!==oldKeys.length){sendErrorData('app_template_page_code_folders',{newState:newPageCodeFolders,oldState:oldPageCodeFolders,extra:{actionType,newKeys:newKeys.length,oldKeys:oldKeys.length},message:`different number of page names`});return false;}const diff=xor_default()(newKeys,oldKeys);if(diff.length>0){sendErrorData('app_template_page_code_folders',{newState:newPageCodeFolders,oldState:oldPageCodeFolders,extra:{actionType},message:'page names do not match'});return false;}for(const pageName of newKeys){const newFoldersList=newPageCodeFolders[pageName];const oldFoldersList=oldPageCodeFolders[pageName];if(newFoldersList.length!==oldFoldersList.length){sendErrorData('app_template_folders',{newState:newFoldersList,oldState:oldFoldersList,extra:{actionType,newFolders:newFoldersList.length,oldFolders:oldFoldersList.length},message:`different number of folders`});return false;}for(let i=0;i<newFoldersList.length;i++){if(newFoldersList[i]!==oldFoldersList[i]){sendErrorData('app_template_folders',{newState:newFoldersList,oldState:oldFoldersList,extra:{actionType},message:`folders in page ${pageName} do not match`});return false;}}}return true;};const verifyAppTemplateFoldersDataThunk=(0,redux.createRetoolAsyncThunk)('remove-immutable-js/verify-app-template-folders-data',({actionType},{getState})=>{(0,requestIdleCallbackSafe.requestIdleCallbackSafe)(async()=>{const state=getState();await verifyAppTemplateFoldersData(state,actionType);});});const verifyAppTemplatePageCodeFoldersDataThunk=(0,redux.createRetoolAsyncThunk)('remove-immutable-js/verify-app-template-folders-data',({actionType},{getState})=>{(0,requestIdleCallbackSafe.requestIdleCallbackSafe)(async()=>{const state=getState();await verifyAppTemplatePageCodeFoldersData(state,actionType);});});
// EXTERNAL MODULE: ../frontend/src/store/appModel/batchUndoGroupBy.ts
var batchUndoGroupBy = __webpack_require__(818235);
// EXTERNAL MODULE: ../frontend/src/store/middleware/listenerMiddleware/listenerMiddleware.ts
var listenerMiddleware = __webpack_require__(296830);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../packages/common/telemetry/eventTypes.ts
var eventTypes = __webpack_require__(285539);
// EXTERNAL MODULE: ../frontend/src/store/app/template/utils.ts
var utils = __webpack_require__(808116);
// EXTERNAL MODULE: ../frontend/src/store/appModel/actionTypes.ts
var actionTypes = __webpack_require__(511828);
// EXTERNAL MODULE: ../frontend/src/store/appModel/constants.ts
var constants = __webpack_require__(67002);
// EXTERNAL MODULE: ../frontend/src/store/appModel/template.tsx + 12 modules
var template = __webpack_require__(627162);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/folders/compat.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const UNDOABLE_FOLDER_ACTION_TYPES=new Set([constants.FOLDER_CHANGE_SCOPE,constants.FOLDER_CREATE,constants.FOLDER_DELETE,constants.FOLDER_MOVE,constants.FOLDER_MOVE_TO_PAGE,constants.FOLDER_RECURSIVE_DELETE,constants.FOLDER_RENAME,constants.PAGE_CODE_FOLDER_CLEAR,constants.PAGE_CODE_FOLDER_REORDER,constants.PLUGIN_UPDATE_ID]);const isUndoableAction=action=>{return UNDOABLE_FOLDER_ACTION_TYPES.has(action.type);};const extraReducers=builder=>{builder.addCase(constants.MIGRATIONS_SUCCESS,(state,action)=>(0,utils.swallowErrors)(()=>{const{migratedAppTemplate:appTemplate}=action.payload;const folders=appTemplate.get('folders').toArray();const pageCodeFolders=appTemplate.get('pageCodeFolders');state.folders=folders;state.pageCodeFolders=pageCodeFolders;}));builder.addCase(constants.MIGRATIONS_UP_TO_DATE,(state,action)=>(0,utils.swallowErrors)(()=>{const{migratedAppTemplate:appTemplate}=action.payload;const folders=appTemplate.get('folders').toArray();const pageCodeFolders=appTemplate.get('pageCodeFolders');state.folders=folders;state.pageCodeFolders=pageCodeFolders;}));builder.addCase(constants.FOLDER_CHANGE_SCOPE,(state,action)=>(0,utils.swallowErrors)(()=>{const{folderId,screenId:currentScreen,currentScope,insertIndex}=action.payload;if(currentScope===eventTypes.PluginScopeType.Global){state.folders=state.folders.filter(folder=>folder!==folderId);const folders=state.pageCodeFolders[currentScreen]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(folders,folderId);if(insertIndex!==undefined){folders.splice(insertIndex,0,newFolderId);}else{folders.push(newFolderId);}state.pageCodeFolders[currentScreen]=folders;}else{var _state$pageCodeFolder;const folders=(_state$pageCodeFolder=state.pageCodeFolders[currentScreen])!==null&&_state$pageCodeFolder!==void 0?_state$pageCodeFolder:[];state.pageCodeFolders[currentScreen]=folders.filter(folder=>folder!==folderId);const newFolderId=(0,template.generateNewFolderIdIfNecessary)(state.folders,folderId);if(insertIndex!==undefined){state.folders.splice(insertIndex,0,newFolderId);}else{state.folders.push(newFolderId);}}}));builder.addCase(constants.FOLDER_CREATE,(state,action)=>(0,utils.swallowErrors)(()=>{const{focusedScreen,folderName}=action.payload;if(focusedScreen){var _state$pageCodeFolder2,_state$pageCodeFolder3;;((_state$pageCodeFolder3=(_state$pageCodeFolder2=state.pageCodeFolders)[focusedScreen])!==null&&_state$pageCodeFolder3!==void 0?_state$pageCodeFolder3:_state$pageCodeFolder2[focusedScreen]=[]).push(folderName);}else{state.folders.push(folderName);}}));builder.addCase(constants.FOLDER_DELETE,(state,action)=>(0,utils.swallowErrors)(()=>{const{folderName,screenId}=action.payload;if(screenId){var _pageCodeFolders$scre;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre!==void 0?_pageCodeFolders$scre:[];const newFocusedScreenFolders=focusedScreenFolders.filter(folder=>folder!==folderName);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:newFocusedScreenFolders});}else{state.folders=state.folders.filter(folder=>folder!==folderName);}}));builder.addCase(constants.FOLDER_MOVE,(state,action)=>(0,utils.swallowErrors)(()=>{const{folders}=action.payload;state.folders=folders.toArray();}));builder.addCase(constants.FOLDER_MOVE_TO_PAGE,(state,action)=>(0,utils.swallowErrors)(()=>{const{folderId,currentScreenId,targetScreenId,currentScope}=action.payload;if(currentScope===eventTypes.PluginScopeType.Global){state.folders=state.folders.filter(folder=>folder!==folderId);const folders=state.pageCodeFolders[targetScreenId]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(folders,folderId);folders.push(newFolderId);state.pageCodeFolders[targetScreenId]=folders;}else{if(currentScreenId!==undefined){const currentFolders=state.pageCodeFolders[currentScreenId]||[];state.pageCodeFolders[currentScreenId]=currentFolders.filter(folder=>folder!==folderId);}const folders=state.pageCodeFolders[targetScreenId]||[];const newFolderId=(0,template.generateNewFolderIdIfNecessary)(state.folders,folderId);folders.push(newFolderId);state.pageCodeFolders[targetScreenId]=folders;}}));builder.addCase(constants.FOLDER_RECURSIVE_DELETE,(state,action)=>(0,utils.swallowErrors)(()=>{const{id,screenId}=action.payload;const isPageCodeRecursiveDelete=!!screenId;if(isPageCodeRecursiveDelete){var _pageCodeFolders$scre2;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre2=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre2!==void 0?_pageCodeFolders$scre2:[];const newFocusedScreenFolders=focusedScreenFolders.filter(folder=>folder!==id);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:newFocusedScreenFolders});}else{state.folders=state.folders.filter(folder=>folder!==id);}}));builder.addCase(constants.FOLDER_RENAME,(state,action)=>(0,utils.swallowErrors)(()=>{const{id,newId,screenId}=action.payload;if(screenId){var _pageCodeFolders$scre3;const pageCodeFolders=state.pageCodeFolders;const focusedScreenFolders=(_pageCodeFolders$scre3=pageCodeFolders[screenId])!==null&&_pageCodeFolders$scre3!==void 0?_pageCodeFolders$scre3:[];const renamedFocusedScreenFolders=focusedScreenFolders.map(folder=>folder===id?newId:folder);state.pageCodeFolders=_objectSpread(_objectSpread({},pageCodeFolders),{},{[screenId]:renamedFocusedScreenFolders});}else{state.folders=state.folders.map(folder=>folder===id?newId:folder);}}));builder.addCase(constants.PAGE_CODE_FOLDER_CLEAR,(state,action)=>(0,utils.swallowErrors)(()=>{const{screenId}=action.payload;state.pageCodeFolders[screenId]=[];}));builder.addCase(constants.PAGE_CODE_FOLDER_REORDER,(state,action)=>(0,utils.swallowErrors)(()=>{const{folders,screen}=action.payload;state.pageCodeFolders[screen]=folders;}));builder.addCase(constants.PLUGIN_UPDATE_ID,(state,action)=>(0,utils.swallowErrors)(()=>{var _state$pageCodeFolder4;const{newId,pluginId}=action.payload;state.pageCodeFolders[newId]=(_state$pageCodeFolder4=state.pageCodeFolders[pluginId])!==null&&_state$pageCodeFolder4!==void 0?_state$pageCodeFolder4:[];}));builder.addCase(constants.RESET_TEMPLATE,(state,_action)=>(0,utils.swallowErrors)(()=>{state.folders=[];state.pageCodeFolders={};}));builder.addCase(actionTypes.TEARDOWN_PAGE,(state,_action)=>(0,utils.swallowErrors)(()=>{state.folders=[];state.pageCodeFolders={};}));};
// EXTERNAL MODULE: ../frontend/src/store/app/template/folders/constants.ts
var folders_constants = __webpack_require__(861490);
;// CONCATENATED MODULE: ../frontend/src/store/app/template/folders/slice.ts
const initialState={folders:[],pageCodeFolders:{}};function measureSliceLoad(){const folderSliceLoad=performance.Performance.measure('loadRemoveImmutableFolderSlice',{start:'loadRemoveImmutableFolderSliceStart'});if((folderSliceLoad===null||folderSliceLoad===void 0?void 0:folderSliceLoad.duration)!==undefined){datadogMetrics["default"].timing('frontend.remove_immutable.performance.slice_load_time',folderSliceLoad.duration,{slice_name:folders_constants.name});}}function startMiddlewareListener(){listenerMiddleware.listenerMiddleware.startListening({predicate:(_action,currentState,previousState)=>{if((0,appTemplateFoldersSelectors.pageCodeFoldersSelector)(currentState)!==(0,appTemplateFoldersSelectors.pageCodeFoldersSelector)(previousState)){return true;}if((0,appTemplateFoldersSelectors.actionFoldersSelector)(currentState)!==(0,appTemplateFoldersSelectors.actionFoldersSelector)(previousState)){return true;}return false;},effect:(action,listenerApi)=>{listenerApi.dispatch(verifyAppTemplateFoldersDataThunk({actionType:action.type}));listenerApi.dispatch(verifyAppTemplatePageCodeFoldersDataThunk({actionType:action.type}));}});}const slice=(0,redux.createRetoolSlice)({name: folders_constants.name,initialState,reducers:{createFolder(state,action){const{focusedScreen,folderName}=action.payload;if(focusedScreen){var _state$pageCodeFolder,_state$pageCodeFolder2;;((_state$pageCodeFolder2=(_state$pageCodeFolder=state.pageCodeFolders)[focusedScreen])!==null&&_state$pageCodeFolder2!==void 0?_state$pageCodeFolder2:_state$pageCodeFolder[focusedScreen]=[]).push(folderName);}else{state.folders.push(folderName);}},createFolders(state,action){state.folders.concat(action.payload.folders);},setFolders(state,action){const{folders,pageCodeFolders}=action.payload;if(folders){state.folders=folders;}if(pageCodeFolders){state.pageCodeFolders=pageCodeFolders;}}},extraReducers: extraReducers,undoable:{groupBy:batchUndoGroupBy.batchUndoGroupBy,filter:isUndoableAction}});const appTemplateFoldersSelector=(0,redux.createRetoolSelector)([slice.selector],folders=>folders.folders);const appTemplatePageCodeFoldersSelector=(0,redux.createRetoolSelector)([slice.selector],folders=>folders.pageCodeFolders);const{createFolders,createFolder,reducer:appTemplateFoldersReducer,selector:foldersSelector,setFolders}=slice;

/***/ }),

/***/ 607169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelIdleCallbackSafe: () => (/* binding */ cancelIdleCallbackSafe),
/* harmony export */   requestIdleCallbackSafe: () => (/* binding */ requestIdleCallbackSafe)
/* harmony export */ });
function requestIdleCallbackSafe(callback,options){try{if(typeof requestIdleCallback!=='undefined'){return requestIdleCallback(callback,options);}}catch(e){throw new Error(`What the hell ${typeof requestIdleCallback}`);}return requestIdleCallbackFallback(callback);}function requestIdleCallbackFallback(callback){const start=Date.now();return setTimeout(()=>{callback({didTimeout:false,timeRemaining:()=>{return Math.max(0,50-(Date.now()-start));}});},1);}function cancelIdleCallbackSafe(id){if(typeof cancelIdleCallback!=='undefined'){cancelIdleCallback(id);}else{cancelIdleCallbackFallback(id);}}function cancelIdleCallbackFallback(id){clearTimeout(id);}

/***/ }),

/***/ 384080:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(469228),
    arrayIncludes = __webpack_require__(757040),
    arrayIncludesWith = __webpack_require__(987308),
    arrayMap = __webpack_require__(248507),
    baseUnary = __webpack_require__(800748),
    cacheHas = __webpack_require__(513256);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),

/***/ 759162:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseDifference = __webpack_require__(384080),
    baseFlatten = __webpack_require__(553173),
    baseUniq = __webpack_require__(599074);

/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }
  var index = -1,
      result = Array(length);

  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}

module.exports = baseXor;


/***/ }),

/***/ 466522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(517263),
    baseRest = __webpack_require__(313937),
    baseXor = __webpack_require__(759162),
    isArrayLikeObject = __webpack_require__(460818);

/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.without
 * @example
 *
 * _.xor([2, 1], [2, 3]);
 * // => [1, 3]
 */
var xor = baseRest(function(arrays) {
  return baseXor(arrayFilter(arrays, isArrayLikeObject));
});

module.exports = xor;


/***/ })

}])
//# sourceMappingURL=7890.f0dc007c.chunk.js.map