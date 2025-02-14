(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[6658],{

/***/ 756658:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Frame_editors)
});

// NAMESPACE OBJECT: ../frontend/src/components/plugins/widgets/common/editorComponentRegistry.native-web.tsx
var editorComponentRegistry_native_web_namespaceObject = {};
__webpack_require__.r(editorComponentRegistry_native_web_namespaceObject);
__webpack_require__.d(editorComponentRegistry_native_web_namespaceObject, {
  "default": () => (editorComponentRegistry_native_web)
});

// NAMESPACE OBJECT: ../frontend/src/components/plugins/widgets/common/editors/FullBleedEditor.native.tsx
var FullBleedEditor_native_namespaceObject = {};
__webpack_require__.r(FullBleedEditor_native_namespaceObject);
__webpack_require__.d(FullBleedEditor_native_namespaceObject, {
  "default": () => (FullBleedEditor_native)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-redux@7.2.4_react-dom@18.3.1_react@18.3.1__react-native@0.74.3_@babel+core@7.24.9_@babe_az4c6i5siqhukmd7qezh6vzqeq/node_modules/react-redux/es/index.js + 19 modules
var es = __webpack_require__(66612);
// EXTERNAL MODULE: ../frontend/src/store/selectors/appShellSelector.ts
var appShellSelector = __webpack_require__(61661);
// EXTERNAL MODULE: ../frontend/src/store/selectors/appTemplateSelectors.ts + 9 modules
var appTemplateSelectors = __webpack_require__(470273);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ../frontend/src/common/hooks/useHeaderHeight.tsx
const shouldHeaderBeSticky=({frameIds})=>{return!!frameIds.sidebar||!!frameIds.drawers.length||!!frameIds.splitPane;};const useHasStickyHeader=()=>(0,es.useSelector)(state=>{var _headerTemplate$get;const appTemplate=(0,appTemplateSelectors.appTemplateSelector)(state);const frameIds=(0,appShellSelector.renderedFrameIdsSelector)(state);if(!frameIds.header){return false;}if(frameIds.header&&shouldHeaderBeSticky({frameIds})){return true;}const headerTemplate=appTemplate.getPlugin(frameIds.header);return!!(headerTemplate!==null&&headerTemplate!==void 0&&(_headerTemplate$get=headerTemplate.get('template'))!==null&&_headerTemplate$get!==void 0&&_headerTemplate$get.get('sticky'));});const HeaderHeightContext=(0,react.createContext)(null);const HeaderHeightContextProvider=({children})=>{const[height,setHeight]=(0,react.useState)(null);const[layoutHeight,setLayoutHeight]=(0,react.useState)(null);const isSticky=useHasStickyHeader();return (0,jsx_runtime.jsx)(HeaderHeightContext.Provider,{value:{height,layoutHeight,setHeight,setLayoutHeight,isSticky},children:children});};const useStickyHeaderHeight=()=>{const headerHeightContext=(0,react.useContext)(HeaderHeightContext);if(!headerHeightContext)return 0;const{isSticky,height,layoutHeight}=headerHeightContext;if(isSticky){var _ref;return(_ref=height!==null&&height!==void 0?height:layoutHeight)!==null&&_ref!==void 0?_ref:0;}return 0;};const useBrandedHeaderHeight=()=>{const headerHeightContext=(0,react.useContext)(HeaderHeightContext);if(!headerHeightContext)return 0;const{height}=headerHeightContext;return height!==null&&height!==void 0?height:0;};const useUpdateHeaderHeight=({height})=>{const headerHeightContext=(0,react.useContext)(HeaderHeightContext);const{setHeight}=headerHeightContext||{};(0,react.useEffect)(()=>{if(setHeight&&height){setHeight(height);return()=>setHeight(null);}},[setHeight,height]);};
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/editorComponentRegistry.native-web.tsx
/* harmony default export */ const editorComponentRegistry_native_web = ({});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/editors/FullBleedEditor.native.tsx
/* harmony default export */ const FullBleedEditor_native = ({});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/editors/getDefaultEditors.native.tsx
/* harmony default export */ const getDefaultEditors_native = ({});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/style/editorConfig/styleEditorConfig.ts
const DEFAULT_VARIANT='default';const makeStyleEditorConfig=params=>{var _options$providesStyl;const{styles,options,hidden,groupedStyles}=params;let variants={};let defaultVariant='';let variantLabels;if('styleConfigVariants'in params){variants=params.styleConfigVariants;defaultVariant=params.defaultVariant;variantLabels=params.variantLabels;}else if('styleConfig'in params){variants={default:params.styleConfig};defaultVariant=DEFAULT_VARIANT;}const props={variants,defaultVariant,stylesOptions:styles,providesStyleContext:(_options$providesStyl=options===null||options===void 0?void 0:options.providesStyleContext)!==null&&_options$providesStyl!==void 0?_options$providesStyl:false,groupedStyles,variantLabels};return[{type:'stylesV3',props,hidden}];};/* harmony default export */ const styleEditorConfig = (makeStyleEditorConfig);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/layoutConstants.ts
var layoutConstants = __webpack_require__(849967);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/common/widgetContainersUtils.tsx
var widgetContainersUtils = __webpack_require__(120263);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/Container/constants.ts
var constants = __webpack_require__(521428);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/v2/Container/getPaddingControlEditor.ts
function getPaddingControlEditor(normalPaddingValue=constants.DEFAULT_CONTAINER_PADDING){return{type:'segmented',props:{label:'Padding',labelPosition:'left',options:[{value:normalPaddingValue,label:'Normal'},{value:constants.NO_PADDING,label:'None'}],docs:`Controls the padding between the container and its contents.\n\nIn fx mode, padding follows the CSS shorthand convention (top right bottom left). Padding should be defined in pixels, and top and bottom padding should add up to a multiple of ${layoutConstants.ROW_HEIGHT}px to ensure proper alignment in the layout.`,example:'12px 8px',allowDynamic:true,validator:widgetContainersUtils.validatePaddingString,validatorName:'Padding string',clearable:true,defaultValue:normalPaddingValue},name:'padding',hidden:template=>!!template.get('enableFullBleed')};}
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/v2/framesShared/constants.ts
var framesShared_constants = __webpack_require__(866536);
// EXTERNAL MODULE: ../frontend/src/store/index.ts + 1 modules
var store = __webpack_require__(587758);
// EXTERNAL MODULE: ../frontend/src/components/plugins/widgets/style/styleConfig/index.ts
var styleConfig = __webpack_require__(202666);
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(883006);
// EXTERNAL MODULE: ../node_modules/.pnpm/reselect@5.1.0/node_modules/reselect/dist/reselect.mjs
var reselect = __webpack_require__(629555);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/common/containersShared.ts
const NO_OP_PREVIEW_PROPS={previewWidgetMove:()=>null,undoWidgetPreview:()=>null,previewWidgetStaticMove:()=>null,previewWidgetCreate:()=>null,previewFrameCreate:()=>null,setWidgetPreview:()=>null};const appModelSelectorWithProps=state=>state.appModel;const ownPropsSelectorWithProps=(_,ownProps)=>ownProps;const makeModelSelector=()=>(0,reselect.createSelector)(appModelSelectorWithProps,ownPropsSelectorWithProps,(appModel,ownProps)=>{let model;if(ownProps!=null&&ownProps.containerId!==''){model=appModel.values.getPlugin(ownProps.containerId).getIn(ownProps.instance);}return model||immutable_es.Map();});
;// CONCATENATED MODULE: ../frontend/src/components/ViewerPageLayout/Frames/utils.ts
const EMPTY_ARR=[];const getSharedProps=({scale=1,editable,previewProps})=>({readonly:!editable,scale,previewProps:editable&&previewProps?previewProps:NO_OP_PREVIEW_PROPS,instance:EMPTY_ARR});const useCanvasMaxWidth=()=>{const frameIds=(0,es.useSelector)(appShellSelector.renderedFrameIdsSelector);const hasStickyHeader=useHasStickyHeader();const splitPaneFrameExists=!!frameIds.splitPane;return frameIds.header&&!hasStickyHeader||splitPaneFrameExists;};const useSplitPaneFrameWithInnerScroll=()=>{const frameIds=(0,es.useSelector)(appShellSelector.renderedFrameIdsSelector);const hasStickyHeader=useHasStickyHeader();const shouldUseStickyHeader=shouldHeaderBeSticky({frameIds});const disableInnerScroll=frameIds.header&&!hasStickyHeader&&!shouldUseStickyHeader;return!disableInnerScroll;};const useSharedProps=({scale=1,editable,previewProps})=>(0,react.useMemo)(()=>getSharedProps({scale,editable,previewProps}),[scale,editable,previewProps]);const MIN_FRAME_WIDTH='50px';const FULL_SCREEN_WIDTH='calc(var(--retool-canvas-container-width, max-content) - 10px)';const getClampedWidthString=width=>`clamp(${MIN_FRAME_WIDTH}, ${width}, ${FULL_SCREEN_WIDTH})`;const SPLIT_PANE_WIDTH='calc((var(--retool-canvas-container-width, max-content) - var(--retool-canvas-sidebar-max-width, 0px)) / 2)';const CANVAS_HEIGHT_WITH_HEADER_OFFSET='calc(var(--retool-canvas-container-height, max-content) - var(--viewer-page-layout-header-height, 0px) - var(--viewer-page-layout-branded-header-height, 0px) - var(--viewer-page-layout-header-border-bottom-size, 1px))';const SHARED_MAIN_SPLIT_PLANE_FLEX='10';
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Frame/styleConfig.ts
const HEADER_FRAME_BACKGROUND_KEY='primary-surface';const headerStyleConfig=(0,styleConfig["default"])('header',{[HEADER_FRAME_BACKGROUND_KEY]:{type:'defaultColor',defaultValue:'surfacePrimary'},'border-color':{type:'defaultGeneratedColor',defaultValue:'surfacePrimaryBorder',params:{surfacePrimary:'primary-surface'}}});const MAIN_FRAME_BACKGROUND_KEY='canvas';const mainStyleConfig=(0,styleConfig["default"])('main',{[MAIN_FRAME_BACKGROUND_KEY]:{type:'defaultColor',defaultValue:'canvas'},'flex-width':{type:'number',value:SHARED_MAIN_SPLIT_PLANE_FLEX},'split-pane-frame-height':{type:'number',value:CANVAS_HEIGHT_WITH_HEADER_OFFSET}});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/Frame/editors.ts
const hideForMain=template=>template.get('type')==='main';const hideForHeader=template=>template.get('type')==='header';const{layout,responsive}=getDefaultEditors_native({hideHidden:()=>true,hideMaintainSpaceWhenHidden:()=>true,hideShowInEditor:()=>true,hideResponsiveEditors:hideForMain,hideMargin:()=>true});const editors={appearance:{editors:[...layout,(0,editorComponentRegistry_native_web_namespaceObject.wrapEditorComponent)((0,FullBleedEditor_native_namespaceObject.makeFullBleedFrameEditor)(),{editorKeys:['Expand content to fit']}),...responsive,{type:'checkbox',name:'sticky',props:{label:'Fixed position when scrolling',allowDynamic:false,labelPosition:'left'},hidden:template=>{if(hideForMain(template))return true;const frameIds=(0,appShellSelector.renderedFrameIdsSelector)((0,store.getState)());return shouldHeaderBeSticky({frameIds});}},...styleEditorConfig({styleConfig:mainStyleConfig,styles:{canvas:{label:'Background'}},hidden:hideForHeader}),...styleEditorConfig({styleConfig:headerStyleConfig,styles:{'primary-surface':{label:'Background'},'border-color':{label:'Border'}},options:{providesStyleContext:true},hidden:hideForMain})]},spacing:{editors:[getPaddingControlEditor(framesShared_constants.DEFAULT_FRAME_PADDING)]}};/* harmony default export */ const Frame_editors = (editors);

/***/ })

}])
//# sourceMappingURL=6658.d057bdfc.chunk.js.map