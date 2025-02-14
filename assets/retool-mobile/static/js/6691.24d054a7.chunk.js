(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[6691],{

/***/ 986691:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFoldersObservers: () => (/* binding */ createFoldersObservers)
/* harmony export */ });
/* harmony import */ var _packages_runtimeShared_utils_typeguards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101511);
/* harmony import */ var _store_appModel_sendSave__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495353);
/* harmony import */ var _store_appModel_template2_folders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(570836);
const createFoldersObservers=(dispatch,getState)=>{return event=>{if(event.type==='add'){dispatch((0,_store_appModel_template2_folders__WEBPACK_IMPORTED_MODULE_2__.folderCreate)({folderName:event.folderId,skipMultiplayerUpdate:true}));}else if(event.type==='delete'){dispatch((0,_store_appModel_template2_folders__WEBPACK_IMPORTED_MODULE_2__.folderDelete)({folderName:event.folderId,skipMultiplayerUpdate:true}));}else{(0,_packages_runtimeShared_utils_typeguards__WEBPACK_IMPORTED_MODULE_0__.assertNever)(event);}if(event.isUndoRedo){(0,_store_appModel_sendSave__WEBPACK_IMPORTED_MODULE_1__.debouncedSendSave)(dispatch,getState);}};};

/***/ })

}])
//# sourceMappingURL=6691.24d054a7.chunk.js.map