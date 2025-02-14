(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[6275],{

/***/ 656275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createAppSettingsObservers: () => (/* binding */ createAppSettingsObservers)
});

// EXTERNAL MODULE: ../frontend/src/store/appModel/template.tsx + 12 modules
var template = __webpack_require__(717897);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-redux@7.2.4_react-dom@18.3.1_react@18.3.1__react-native@0.74.3_@babel+core@7.24.9_@babe_az4c6i5siqhukmd7qezh6vzqeq/node_modules/react-redux/es/index.js + 19 modules
var es = __webpack_require__(917448);
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(140653);
// EXTERNAL MODULE: ../packages/common/style/constants.ts
var constants = __webpack_require__(852038);
// EXTERNAL MODULE: ../packages/common/themes/constants.ts
var themes_constants = __webpack_require__(615297);
// EXTERNAL MODULE: ../frontend/src/common/records.ts + 1 modules
var records = __webpack_require__(215777);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(694366);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/constants.ts
var style_constants = __webpack_require__(877986);
// EXTERNAL MODULE: ../frontend/src/store/appModel/globals/theme/formatModelTheme.ts
var formatModelTheme = __webpack_require__(120240);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/AppTheme/runtimeOptions.ts
const APP_THEME_SUBTYPE='AppTheme';const runtimeOptions=(0,registry.registerRuntime)({typeKey:APP_THEME_SUBTYPE,propertyAnnotations:{value:{triggerSideEffectPostUpdate:({stackId,selector,newValue,appTemplate,updateModel})=>{if(selector.length<3||!formatModelTheme.themeModelProperties.includes(selector[2])){return;}if(appTemplate.appThemeId===style_constants.CUSTOM_THEME_ID){updateModel([{selector:['theme'].concat(selector.slice(2)),newValue}],stackId);}},resetValueOnTemplateUpdate:true}}});/* harmony default export */ const AppTheme_runtimeOptions = (runtimeOptions);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/defaultTheme.ts
var defaultTheme = __webpack_require__(363933);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/designSystemModes.ts
var designSystemModes = __webpack_require__(845902);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/selectors.ts + 1 modules
var selectors = __webpack_require__(826538);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/util.ts
var util = __webpack_require__(35655);
// EXTERNAL MODULE: ../frontend/src/store/appModel/actionTypes.ts
var actionTypes = __webpack_require__(350323);
// EXTERNAL MODULE: ../frontend/src/store/appModel/batchUndoGroupBy.ts
var batchUndoGroupBy = __webpack_require__(888478);
// EXTERNAL MODULE: ../frontend/src/store/appModel/constants.ts
var appModel_constants = __webpack_require__(486401);
// EXTERNAL MODULE: ../frontend/src/store/appModel/model.ts
var model = __webpack_require__(229993);
// EXTERNAL MODULE: ../frontend/src/store/appModel/sendSave.ts + 21 modules
var sendSave = __webpack_require__(495353);
// EXTERNAL MODULE: ../frontend/src/store/appModel/templateUtils.ts + 2 modules
var templateUtils = __webpack_require__(918003);
// EXTERNAL MODULE: ../frontend/src/store/selectors/appTemplateSelectors.ts + 9 modules
var appTemplateSelectors = __webpack_require__(396583);
;// CONCATENATED MODULE: ../frontend/src/store/appModel/template2/themes.ts
const saveTemplateThemeData=({theme,dispatch,state,modeId,action,payload,save,isUserTriggered=true,isMultiplayerUndoRedo=false})=>{if(!(0,appTemplateSelectors.pluginsSelector)(state).has('theme')){const formattedTheme=(0,formatModelTheme.formatModelTheme)(theme!==null&&theme!==void 0?theme:defaultTheme["default"],modeId);dispatch((0,model.updateGlobal)('theme',immutable_es.Map(formattedTheme)));}if(payload){dispatch({type:action,payload,isUserTriggered});}if(save&&!(payload!==null&&payload!==void 0&&payload.skipMultiplayerUpdate)||isMultiplayerUndoRedo){dispatch((0,sendSave.sendSave)({trigger:'forced'}));}};const updateAppTheme=(theme,{save=true,isUserTriggered=true,skipMultiplayerUpdate=false}={},isMultiplayerUndoRedo=false)=>async(dispatch,getState)=>{const state=getState();const appThemeId=(0,selectors.appThemeIdSelector)(state);let payload;if(appThemeId!==constants.CUSTOM_THEME_ID){const{id,name}=(0,util.getCustomAppThemeType)(theme);payload={appThemeId:id,appThemeName:name,skipMultiplayerUpdate};}saveTemplateThemeData({theme,dispatch,state,action:actionTypes.UPDATE_GLOBAL_STYLES,payload,save,isUserTriggered,isMultiplayerUndoRedo});(0,batchUndoGroupBy.startBatchUndoGroup)();if(!(0,appTemplateSelectors.pluginsSelector)(state).has(themes_constants.APP_THEME_PLUGIN_NAME)){const template=new records.PluginTemplate({id:themes_constants.APP_THEME_PLUGIN_NAME,type:'setting',subtype:APP_THEME_SUBTYPE,template:immutable_es.Map({value:immutable_es.fromJS(theme)})});(0,es.batch)(()=>{dispatch({type:appModel_constants.APP_THEME_TEMPLATE_CREATE,payload:{template}});});await dispatch((0,model.calculateNewTemplate)(template));}else{await dispatch((0,templateUtils.widgetTemplateUpdate)(themes_constants.APP_THEME_PLUGIN_NAME,{value:theme},true));}(0,batchUndoGroupBy.stopBatchUndoGroup)();};const updateGlobalStyles=(appThemeId,{save=true,isUserTriggered=true,skipMultiplayerUpdate=false}={},isMultiplayerUndoRedo=false)=>async(dispatch,getState)=>{var _appThemesSelector$fi;const state=getState();const defaultAppThemeId=(0,selectors.defaultAppThemeIdSelector)(state);const allThemesMap=(0,selectors.appThemesMapSelector)(state);const payload={appThemeId:appThemeId!==null&&appThemeId!==void 0?appThemeId:style_constants.RETOOL_DEFAULT_THEME_ID,skipMultiplayerUpdate};if(defaultAppThemeId&&appThemeId===defaultAppThemeId){payload.appThemeId=null;}if(payload.appThemeId!==null){var _allThemesMap$payload,_allThemesMap$payload2;payload.appThemeName=(_allThemesMap$payload=(_allThemesMap$payload2=allThemesMap[payload.appThemeId])===null||_allThemesMap$payload2===void 0?void 0:_allThemesMap$payload2.name)!==null&&_allThemesMap$payload!==void 0?_allThemesMap$payload:null;}const theme=appThemeId===constants.CUSTOM_THEME_ID?(0,selectors.customAppThemeModelSelector)(state):(_appThemesSelector$fi=(0,selectors.appThemesSelector)(state).find(({id})=>id===appThemeId))===null||_appThemesSelector$fi===void 0?void 0:_appThemesSelector$fi.theme;saveTemplateThemeData({theme,modeId:null,dispatch,state,action:actionTypes.UPDATE_GLOBAL_STYLES,payload,save,isUserTriggered,isMultiplayerUndoRedo});};const updateThemeMode=(modeId,{save=true,isUserTriggered=true,skipMultiplayerUpdate=false}={},isMultiplayerUndoRedo=false)=>(dispatch,getState)=>{var _getMode;const state=getState();const appTheme=(0,selectors.appThemeModelSelector)(state);const theme=appTheme===null||appTheme===void 0?void 0:appTheme.theme;const payload={appThemeModeId:modeId,appThemeModeName:(_getMode=(0,designSystemModes.getMode)(theme,modeId))===null||_getMode===void 0?void 0:_getMode.label,appThemeName:appTheme===null||appTheme===void 0?void 0:appTheme.name,skipMultiplayerUpdate};saveTemplateThemeData({theme,modeId,dispatch,state,action:actionTypes.UPDATE_THEME_MODE,payload,save,isUserTriggered,isMultiplayerUndoRedo});};const updateGlobalMobileAppStyles=(appThemeId,{save=true,isUserTriggered=true}={})=>async(dispatch,getState)=>{const state=getState();const allThemesMap=(0,selectors.appThemesMapSelector)(state);const payload={appThemeId:appThemeId!==null&&appThemeId!==void 0?appThemeId:style_constants.RETOOL_DEFAULT_THEME_ID};if(!(0,appTemplateSelectors.pluginsSelector)(state).has('theme')){var _mobileAppThemesSelec;const theme=(_mobileAppThemesSelec=(0,selectors.mobileAppThemesSelector)(state).find(({id})=>id===appThemeId))===null||_mobileAppThemesSelec===void 0?void 0:_mobileAppThemesSelec.theme;dispatch((0,model.triggerModelUpdate)([{selector:['theme'],newValue:theme}]));}if(payload.appThemeId!==null){var _allThemesMap$payload3,_allThemesMap$payload4;payload.appThemeName=(_allThemesMap$payload3=(_allThemesMap$payload4=allThemesMap[payload.appThemeId])===null||_allThemesMap$payload4===void 0?void 0:_allThemesMap$payload4.name)!==null&&_allThemesMap$payload3!==void 0?_allThemesMap$payload3:null;}dispatch({type:actionTypes.UPDATE_GLOBAL_STYLES,payload,isUserTriggered});if(save){dispatch((0,sendSave.sendSave)({trigger:'forced'}));}};function updateAppMaxWidth(appMaxWidth,isMultiplayerUndoRedo=false,skipMultiplayerUpdate=false){return dispatch=>{const appMaxWidthError=(0,util.getAppMaxWidthError)(appMaxWidth);dispatch({type:appModel_constants.UPDATE_MAX_WIDTH_ERROR,payload:{appMaxWidthError}});if(!appMaxWidthError){dispatch({type:appModel_constants.UPDATE_MAX_WIDTH,payload:{appMaxWidth,skipMultiplayerUpdate}});if(!skipMultiplayerUpdate||isMultiplayerUndoRedo){dispatch((0,sendSave.sendSave)({trigger:'forced'}));}}};}
// EXTERNAL MODULE: ../frontend/src/store/multiscreen/actionCreators.ts
var actionCreators = __webpack_require__(251104);
// EXTERNAL MODULE: ../frontend/src/multiplayer/logger.ts
var logger = __webpack_require__(142386);
;// CONCATENATED MODULE: ../frontend/src/multiplayer/createAppSettingsObservers.ts
const createAppSettingsObservers=dispatch=>({appThemeIdObserver:(isUndoRedo,appThemeId)=>dispatch(updateGlobalStyles(appThemeId,{skipMultiplayerUpdate:true},isUndoRedo)),appThemeModeIdObserver:(isUndoRedo,appThemeModeId)=>dispatch(updateThemeMode(appThemeModeId,{skipMultiplayerUpdate:true},isUndoRedo)),appMaxWidthObserver:(isUndoRedo,appMaxWidth)=>dispatch(updateAppMaxWidth(appMaxWidth,isUndoRedo,true)),markdownLinkBehaviorObserver:(isUndoRedo,markdownLinkBehavior)=>dispatch((0,template.setMarkdownLinkBehavior)(markdownLinkBehavior,isUndoRedo,true)),queryStatusVisibilityObserver:(isUndoRedo,queryStatusVisibility)=>dispatch((0,template.setQueryStatusVisibility)(queryStatusVisibility,isUndoRedo,true)),responsiveLayoutDisabledObserver:(isUndoRedo,responsiveLayoutDisabled)=>dispatch((0,template.disableResponsiveLayout)(responsiveLayoutDisabled,isUndoRedo,true)),loadingIndicatorsDisabledObserver:(isUndoRedo,loadingIndicatorsDisabled)=>dispatch((0,template.setDisableLoadingIndicators)(loadingIndicatorsDisabled,isUndoRedo,true)),customDocumentTitleEnabledObserver:(isUndoRedo,customDocumentTitleEnabled)=>dispatch((0,template.enableCustomDocumentTitle)(customDocumentTitleEnabled,isUndoRedo,true)),inAppRetoolPillAppearanceObserver:(isUndoRedo,inAppRetoolPillAppearance)=>dispatch((0,template.setInAppRetoolPillAppearance)(inAppRetoolPillAppearance,isUndoRedo,true)),customShortcutsObserver:(isUndoRedo,customShortcuts)=>dispatch((0,template.setCustomShortcuts)(customShortcuts,isUndoRedo,true)),preloadedAppJavascriptObserver:(isUndoRedo,preloadedAppJavascript)=>{logger.info(`[yjs observer] preloadedAppJavascript: ${preloadedAppJavascript}`);dispatch((0,template.updatePreloadedAppJavaScript)(preloadedAppJavascript,isUndoRedo,true));dispatch((0,template.reinitializeRuntime)());},preloadedAppJsLinksObserver:(isUndoRedo,preloadedAppJsLinks)=>{logger.info(`[yjs observer] preloadedAppJsLinks: ${preloadedAppJsLinks}`);dispatch((0,template.updatePreloadedAppJSLinks)(preloadedAppJsLinks,isUndoRedo,true));dispatch((0,template.reinitializeRuntime)());},rootScreenObserver:(isUndoRedo,rootScreen)=>{if(!rootScreen){return;}dispatch((0,actionCreators.rootScreenUpdate)({screenId:rootScreen,skipMultiplayerUpdate:true}));}});

/***/ })

}])
//# sourceMappingURL=6275.26b7e2f2.chunk.js.map