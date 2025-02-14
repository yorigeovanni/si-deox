(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[6559],{

/***/ 976559:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setUserRequestedThemeMode: () => (/* binding */ setUserRequestedThemeMode)
/* harmony export */ });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(883006);
/* harmony import */ var _components_plugins_widgets_style_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(427737);
/* harmony import */ var _appModel_globals_theme_formatModelTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(317933);
/* harmony import */ var _appModel_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(355874);
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(395386);
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(311286);
const setUserRequestedThemeMode=(modeName,{persist=false}={})=>async(dispatch,getState)=>{var _allModes$find;const state=getState();const currentRequestedModeId=(0,_selectors__WEBPACK_IMPORTED_MODULE_4__.requestedModeIdSelector)(state);const allModes=(0,_components_plugins_widgets_style_selectors__WEBPACK_IMPORTED_MODULE_1__.designSystemModesSelector)(state);const modeId=(_allModes$find=allModes.find(mode=>mode.label===modeName))===null||_allModes$find===void 0?void 0:_allModes$find.id;if(!modeId||modeId===currentRequestedModeId){return;}const appTheme=(0,_components_plugins_widgets_style_selectors__WEBPACK_IMPORTED_MODULE_1__.appThemeModelSelector)(state);dispatch((0,_slice__WEBPACK_IMPORTED_MODULE_5__.setRequestedMode)({modeId,appThemeName:appTheme===null||appTheme===void 0?void 0:appTheme.name,persist}));if(appTheme!==null&&appTheme!==void 0&&appTheme.theme){dispatch((0,_appModel_model__WEBPACK_IMPORTED_MODULE_3__.updateGlobal)('theme',immutable__WEBPACK_IMPORTED_MODULE_0__["default"].Map((0,_appModel_globals_theme_formatModelTheme__WEBPACK_IMPORTED_MODULE_2__.formatModelTheme)(appTheme.theme,modeId))));}};

/***/ })

}])
//# sourceMappingURL=6559.16599738.chunk.js.map