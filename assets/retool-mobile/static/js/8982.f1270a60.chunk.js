(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[8982],{

/***/ 618982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  getAppPluginConverter: () => (/* binding */ getAppPluginConverter),
  verifyToolscriptConverterImplemented: () => (/* binding */ verifyToolscriptConverterImplemented)
});

;// CONCATENATED MODULE: ../packages/common/components/generated/toolscript/converters.ts
const DEFAULT_CONVERTER_PLUGINS=['AlertWidget2','CascaderWidget2','ChartWidget2','CommentThreadWidget','MicrophoneWidget2','ScannerWidget2','TextInputWidget2'];
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/ast/node.ts
var ast_node = __webpack_require__(51981);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/apps/visual/tagNames.ts + 1 modules
var tagNames = __webpack_require__(558635);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/apps/constants.ts
var constants = __webpack_require__(150154);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/partition.js
var partition = __webpack_require__(227113);
var partition_default = /*#__PURE__*/__webpack_require__.n(partition);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/apps/nodeUtils.ts
var nodeUtils = __webpack_require__(642878);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/platform/serialize/utils.ts
var utils = __webpack_require__(835020);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/ast/constants.ts
var ast_constants = __webpack_require__(501844);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/ast/toolscriptImport.ts
var toolscriptImport = __webpack_require__(148357);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/ast/elementImport.ts
class ElementImport extends toolscriptImport.BaseToolscriptImport{constructor(absoluteFilePath){super(absoluteFilePath);}static createFromNode(node){if(!node.filePath){throw new Error(`Cannot create import object for ${node.tagName} node ${node.id} without path`);}return new ElementImport(node.filePath);}formatImport(path){return (0,utils.createToolscriptElement)({tagName:ast_constants.ELEMENT_IMPORT_TAG_NAME,attributeStrings:[`src='${path}'`]});}}
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/platform/deserialize/errors.ts
var errors = __webpack_require__(235361);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/apps/visual/positions.ts
var positions = __webpack_require__(904624);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/converterUtils.ts
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const baseDeserializer=(node,ctx)=>{var _node$id;if(nodeUtils.isPseudoNode(node)||nodeUtils.isAppNode(node)){ctx.addError({message:`"${node.tagName}" is a pseudo element and should't be deserialized by the DefaultConverter.`,element:node.jsxNode});}if(!node.id){var _node$jsxNode$opening,_node$jsxNode;ctx.addError({message:`"${node.tagName}" is missing id.`,element:(_node$jsxNode$opening=(_node$jsxNode=node.jsxNode)===null||_node$jsxNode===void 0?void 0:_node$jsxNode.openingElement)!==null&&_node$jsxNode$opening!==void 0?_node$jsxNode$opening:node.jsxNode});}const events=[];const[eventChildren,otherChildren]=partition_default()(node.children,node=>node.tagName===tagNames.EVENT_TAGNAME);eventChildren.forEach(childNode=>{events.push(_objectSpread({},childNode.attributes));});if(events.length){var _node$attributes,_node$attributes$even;(_node$attributes$even=(_node$attributes=node.attributes).events)!==null&&_node$attributes$even!==void 0?_node$attributes$even:_node$attributes.events=[];if(Array.isArray(node.attributes.events)){node.attributes.events=node.attributes.events.concat(events);}}node.children=otherChildren;const subtype=nodeUtils.getPluginSubtype(node);const pluginType=nodeUtils.getPluginType(node);if(!pluginType){throw new errors.DeserializeError(`Could not match plugin subtype ${subtype} to a type`);}const plugin=_objectSpread({createdAt:'',id:(_node$id=node.id)!==null&&_node$id!==void 0?_node$id:'',style:{ordered:[]},type:pluginType,subtype,template:{ordered:node.sortedAttributes().reduce((acc,{key,value})=>{if(key!=='id'){acc.push({[key]:value});}return acc;},[])}},node.metadata);(0,positions.addPositionAndScreenToPlugin)(node,plugin,ctx);return plugin;};const deserializeChildren=async(node,ctx)=>{await Promise.all(node.children.map(async child=>{return getAppPluginConverter(child,ctx).deserialize();}));};const serializeChildren=(children,parent,ctx)=>{const childrenStrings=[];children.forEach(child=>{const childConverter=getAppPluginConverter(child,ctx);const childString=childConverter.serialize();if(typeof childString==='string'){childrenStrings.push(childString);}else{const elementImport=ElementImport.createFromNode(child);childrenStrings.push(elementImport.getRelativeImport(parent.filePath));}});return childrenStrings.join('\n');};const buildFunctionHierarchy=({functions,parent,ctx})=>{const folderOrderMapping={};const topLevelFunctions=[];functions.forEach(child=>{var _child$metadata;const functionContent=serializeChildren([child],parent,ctx);const folder=(_child$metadata=child.metadata)===null||_child$metadata===void 0?void 0:_child$metadata.folder;if(folder){if(folder in folderOrderMapping){folderOrderMapping[folder].push(functionContent);}else{folderOrderMapping[folder]=[functionContent];}}else{topLevelFunctions.push(functionContent);}});return{folderOrderMapping,topLevelFunctions};};const createFunctionToolscriptElements=({folders,folderOrderMapping,topLevelFunctions})=>{let functionElements=[];folders.forEach(folder=>{const folderContent=folderOrderMapping[folder];functionElements=functionElements.concat((0,utils.createToolscriptElement)({tagName:tagNames.FOLDER_TAGNAME,attributeStrings:[`id='${folder}'`],childrenCode:folderContent===null||folderContent===void 0?void 0:folderContent.join('\n')}));});functionElements=functionElements.concat(topLevelFunctions);return functionElements;};
// EXTERNAL MODULE: ../packages/common/plugins/hydration/pluginDefaults.ts + 1 modules
var pluginDefaults = __webpack_require__(359749);
// EXTERNAL MODULE: ../node_modules/.pnpm/immutable@4.0.0-rc.12/node_modules/immutable/dist/immutable.es.js
var immutable_es = __webpack_require__(883006);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/platform/common/context.ts
var context = __webpack_require__(846103);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/platform/common/baseConverter.ts
class BaseConverter{constructor(node,ctx){this.node=node;if(ctx instanceof context.SerializeContext){this.sctx=ctx;this.newFile=this.shouldChunkToNewFile();if(this.newFile){this.node.filePath=this.newFile;}else{if(!node.parent){throw new Error(`${node.tagName} node ${node.id} has no parent and is also not chunked`);}this.node.filePath=node.parent.filePath;}}else{this.dctx=ctx;this.newFile=false;}}}
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(880440);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js
var get = __webpack_require__(882319);
var get_default = /*#__PURE__*/__webpack_require__.n(get);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/event.ts
function event_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function event_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?event_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):event_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function makeEventNode(ev,node){return ast_node.ToolscriptNode.createPseudoNode({tagName:tagNames.EVENT_TAGNAME,attributes:ev,filePath:node.filePath,parent:node});}function makeEventNodesFromAttributes(attributes,targetId,node){const childNodes=[];if(Array.isArray(attributes.events)){const processedEvents=attributes.events.map(ev=>(0,utils.processMapOrOrderedMap)(ev));const[matchingEvents,otherEvents]=partition_default()(processedEvents,ev=>{if(targetId===null)return true;return targetId===get_default()(ev,'targetId');});matchingEvents.forEach(ev=>{const attrs=cloneDeep_default()(ev);if(targetId===attrs.targetId){delete attrs.targetId;}childNodes.push(makeEventNode(attrs,node));});attributes.events=otherEvents;}return childNodes;}function deserializeChildEvents(childNode,_ctx){const events=[];for(const childChildNode of childNode.children){if(childChildNode.tagName!==tagNames.EVENT_TAGNAME){continue;}events.push(event_objectSpread({targetId:childNode.id},childChildNode.attributes));}return events;}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/default.ts
class DefaultConverter extends BaseConverter{name='DefaultConverter';constructor(node,ctx){super(node,ctx);}static matches(_){if(this.prototype.constructor!==DefaultConverter.prototype.constructor){throw new Error(`Static function 'matches' must be overridden in subclassed converter ${this.name}`);}return true;}shouldChunkToNewFile(){return false;}serialize(){var _pluginDefaults$getDe;if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);}const eventsDefault=(_pluginDefaults$getDe=pluginDefaults.pluginDefaults.getDefaultLatest((0,nodeUtils.getPluginSubtype)(this.node)))===null||_pluginDefaults$getDe===void 0?void 0:_pluginDefaults$getDe.get('events');if(immutable_es["default"].isList(eventsDefault)||immutable_es["default"].isMap(eventsDefault)){this.node.children=this.node.children.concat(makeEventNodesFromAttributes(this.node.attributes,null,this.node));delete this.node.attributes.events;}const code=(0,utils.createToolscriptElement)({tagName:this.node.tagName,attributeStrings:(0,utils.convertNodeToAttributesStrings)(this.node),childrenCode:serializeChildren(this.node.children,this.node,this.sctx)});if(this.newFile){return this.sctx.createNewSourceFile(this.node.filePath,code);}else{return code;}}async deserialize(){if(!this.dctx){throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);}this.dctx.visitNode(this.node);const plugin=baseDeserializer(this.node,this.dctx);await deserializeChildren(this.node,this.dctx);this.dctx.addPlugin(plugin);}}
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/ast/file.ts
var file = __webpack_require__(366775);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/app.ts
class AppConverter extends DefaultConverter{name='AppConverter';static matches(node){return (0,nodeUtils.isAppNode)(node);}shouldChunkToNewFile(){return constants.MAIN_APP_FILE_PATH;}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize node ${this.node.id} with converter ${this.name} with incorrect context`);}const functions=[];const childrenToProcess=[];for(const child of this.node.children){;((0,nodeUtils.isFunctionNode)(child)?functions:childrenToProcess).push(child);}this.node.children=childrenToProcess;if(functions.length>0){const globalFunctionNode=ast_node.ToolscriptNode.createPseudoNode({tagName:tagNames.GLOBAL_FUNCTIONS_TAGNAME,attributes:{},filePath:constants.GLOBAL_FUNCTIONS_FILE_PATH,parent:this.node});globalFunctionNode.parent=this.node;globalFunctionNode.children=functions;this.node.children.unshift(globalFunctionNode);}const appFile=super.serialize();if(!(appFile instanceof file.ToolscriptFile)){throw new Error(`App Converter should always return file, but got ${appFile} instead`);}return appFile;}async deserialize(){if(!this.dctx)throw new Error(`Deserializing ${this.node.id} with converter ${this.name} with no context`);await deserializeChildren(this.node,this.dctx);}}
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/ast/attributeImport.ts
var attributeImport = __webpack_require__(355244);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/appStyles.ts
class AppStylesConverter extends DefaultConverter{name='AppStylesConverter';static matches(node){return node.tagName==='AppStyles';}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);}const cssAttr=this.node.attributes.value;if(cssAttr&&typeof cssAttr==='string'){const containsNewLine=cssAttr.includes('\n');if(containsNewLine){const cssPath=`${constants.LIB_PATH}/${this.node.id}.css`;this.sctx.createNewSourceFile(cssPath,cssAttr);this.node.attributes.value=new attributeImport.AttributeImport(cssPath,'string');}}this.node.attributes.css=this.node.attributes.value;delete this.node.attributes.value;return super.serialize();}deserialize(){this.node.attributes.value=this.node.attributes.css;delete this.node.attributes.css;return super.deserialize();}}
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(421565);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/appTheme.ts
const _excluded=["id"];function appTheme_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function appTheme_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?appTheme_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):appTheme_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const getDeconstructedValueFromAttribute=node=>{let deconstructedContent=node;if(typeof node==='object'&&node){if('ordered'in node){deconstructedContent=node.ordered.reduce((acc,item)=>appTheme_objectSpread(appTheme_objectSpread({},acc),item),{});}else if('set'in node){deconstructedContent=node.set;}else if('array'in node){deconstructedContent=node.array;}else if('object'in node){deconstructedContent=node.object;}}if(Array.isArray(deconstructedContent)){return deconstructedContent.map(item=>getDeconstructedValueFromAttribute(item));}if(deconstructedContent&&typeof deconstructedContent==='object'){return Object.fromEntries(Object.entries(deconstructedContent).map(([key,value])=>[key,getDeconstructedValueFromAttribute(value)]));}return deconstructedContent;};class AppThemeConverter extends DefaultConverter{name='AppThemeConverter';static matches(node){return node.tagName==='CustomAppTheme';}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);}if(this.node.attributes.value){const plainContent=getDeconstructedValueFromAttribute(this.node.attributes.value);if(plainContent&&typeof plainContent==='object'&&!Array.isArray(plainContent)){Object.keys(plainContent).forEach(attr=>{this.node.attributes[attr]=plainContent[attr];});delete this.node.attributes.value;}}return super.serialize();}deserialize(){const _this$node$attributes=this.node.attributes,{id}=_this$node$attributes,rest=(0,objectWithoutProperties["default"])(_this$node$attributes,_excluded);this.node.attributes.value=rest;Object.keys(rest).forEach(key=>{delete this.node.attributes[key];});return super.deserialize();}}
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isNil.js
var isNil = __webpack_require__(244956);
var isNil_default = /*#__PURE__*/__webpack_require__.n(isNil);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isString.js
var isString = __webpack_require__(773486);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
// EXTERNAL MODULE: ../packages/common/toolscriptEngine/apps/types.ts
var types = __webpack_require__(462894);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js
var isArray = __webpack_require__(125430);
var isArray_default = /*#__PURE__*/__webpack_require__.n(isArray);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/padStart.js
var padStart = __webpack_require__(25096);
var padStart_default = /*#__PURE__*/__webpack_require__.n(padStart);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/times.js
var times = __webpack_require__(798065);
var times_default = /*#__PURE__*/__webpack_require__.n(times);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(307570);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/defaultsForSubtype.ts
function defaultsForSubtype(subtype,version){var _pluginDefaults$getDe2,_pluginDefaults$getDe3;if(version){var _pluginDefaults$getDe;const versionDefaults=(_pluginDefaults$getDe=pluginDefaults.pluginDefaults.getDefaultForVersion(subtype,version))===null||_pluginDefaults$getDe===void 0?void 0:_pluginDefaults$getDe.toJS();if(!isEmpty_default()(versionDefaults)&&versionDefaults!=null){return versionDefaults;}}return(_pluginDefaults$getDe2=(_pluginDefaults$getDe3=pluginDefaults.pluginDefaults.getDefaultLatest(subtype))===null||_pluginDefaults$getDe3===void 0?void 0:_pluginDefaults$getDe3.toJS())!==null&&_pluginDefaults$getDe2!==void 0?_pluginDefaults$getDe2:{};}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/nestedItemsTypes.ts
const NESTED_ITEMS_SUBTYPES=['RNCollectionViewV2Widget','BreadcrumbsWidget','CalendarWidget2','CheckboxGroupWidget2','DropdownButtonWidget','ImageGridWidget','LinkListWidget','ListboxWidget','MultiselectListboxWidget','MultiselectWidget2','NavigationWidget2','RadioGroupWidget2','SegmentedControlWidget','SelectWidget2','SplitButtonWidget','StatusWidget','StepsWidget','SwitchGroup','TabsWidget2','TagsWidget2'];const NESTED_ITEMS_TAGNAMES=new Set(NESTED_ITEMS_SUBTYPES.map(x=>tagNames.SUBTYPE_TO_TAGNAME[x]).filter(x=>x));
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/mappedItemUtils.ts
function mappedAttributeSetForSubtype(subtype,version){if(!NESTED_ITEMS_SUBTYPES.includes(subtype)&&subtype!=='ContainerWidget2'){return new Set([]);}const defaults=defaultsForSubtype(subtype,version);return new Set(Object.keys(defaults).filter(key=>{return isMappedAttributeByIndex(key)||isImplicitMappedAttribute(key);}));}function getMappedItemAttributesFromPseudoNodes(parentNode,children,ctx){const subtype=(0,nodeUtils.getPluginSubtype)(parentNode);const childAttributes={};let childEvents=[];const mappedAttributeSet=mappedAttributeSetForSubtype(subtype,ctx.appTemplateVersion);children.forEach((childNode,i)=>{var _Object$keys;(_Object$keys=Object.keys(childNode.attributes))===null||_Object$keys===void 0?void 0:_Object$keys.forEach(serializedKey=>{const key=deserializeMappedAttributeKey(serializedKey,mappedAttributeSet);if(!key){throw new Error(`Unknown mapped attribute '${serializedKey}' in ${subtype} with id '${parentNode.id}'`);}if(!(key in childAttributes)){childAttributes[key]=Array.from({length:children.length}).map(_=>'');}childAttributes[key][i]=childNode.attributes[serializedKey];});childEvents=childEvents.concat(deserializeChildEvents(childNode,ctx));});mappedAttributeSet.forEach(key=>{if(typeof childAttributes[key]==='undefined'){childAttributes[key]=Array.from({length:children.length}).map(_=>'');}});return{childAttributes,childEvents};}function isMappedAttributeByIndex(key){if(key.startsWith('_')&&key.endsWith('ByIndex')){return true;}return false;}const IMPLICIT_MAP_FALSE_POSITIVES=new Set(['_hasMigratedNestedItems','_automaticallyHighlightedIndices','_changedEvents']);function isImplicitMappedAttribute(key){return key.startsWith('_')&&key.endsWith('s')&&!IMPLICIT_MAP_FALSE_POSITIVES.has(key);}function deserializeMappedAttributeKey(key,mappedAttributeSet){const mappedIndexKey=`_${key}ByIndex`;if(mappedAttributeSet.has(mappedIndexKey)){return mappedIndexKey;}const mappedImplicitKey=`_${key}s`;if(mappedAttributeSet.has(mappedImplicitKey)){return mappedImplicitKey;}return'';}function serializeImplicitMappedAttribute(key){return key.slice(1,-1);}function serializeIndexMappedAttribute(key){return key.slice(1,-7);}const OBSOLETE_NESTED_ITEM_ATTRIBUTES=['_disclosedFields','_hasMigratedNestedItems'];function createMappedAttributePseudoNodes(node,tagName,ctx){if(Object.keys(node.attributes).length===0){return[];}OBSOLETE_NESTED_ITEM_ATTRIBUTES.forEach(attr=>delete node.attributes[attr]);let maxCount=0;let maxCountFrozen=false;const subtype=(0,nodeUtils.getPluginSubtype)(node);const mappedAttributeSet=mappedAttributeSetForSubtype(subtype,ctx===null||ctx===void 0?void 0:ctx.appTemplateVersion);const nestedAttributes=Object.keys(node.attributes).reduce((acc,key)=>{const value=node.attributes[key];if(!value||!isArray_default()(value)){return acc;}if(!(mappedAttributeSet!==null&&mappedAttributeSet!==void 0&&mappedAttributeSet.has(key))){return acc;}if(value.length===0){delete node.attributes[key];return acc;}if(isMappedAttributeByIndex(key)){if(value.length>maxCount&&!maxCountFrozen){maxCount=value.length;}const mappedKey=serializeIndexMappedAttribute(key);acc[mappedKey]=value;delete node.attributes[key];}else if(isImplicitMappedAttribute(key)){if(key==='_ids'||key==='_values'){maxCount=value.length;maxCountFrozen=true;}const mappedKey=serializeImplicitMappedAttribute(key);acc[mappedKey]=value;delete node.attributes[key];}return acc;},{});const emptyIdIndexes=[];const nodes=times_default()(maxCount,i=>{let id=null;const attributes=Object.keys(nestedAttributes).reduce((acc,key)=>{const value=nestedAttributes[key][i];if(key==='id'){id=value;}if(key!=='id'&&value===''){return acc;}acc[key]=value;return acc;},{});if(!id){emptyIdIndexes.push(i);}const childEvents=makeEventNodesFromAttributes(node.attributes,id,node);const childNode=ast_node.ToolscriptNode.createPseudoNode({tagName,attributes,filePath:node.filePath,parent:node});childNode.children=childEvents;return childNode;});if(emptyIdIndexes.length>1){emptyIdIndexes.forEach(i=>{const id=padStart_default()(String(i),4,'0');nodes[i].attributes.id=id;});}return nodes;}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/container.ts
const CONTAINER_TAGNAMES=new Set(['Container','Form']);class ContainerChildren{headerNodes=[];footerChildren=[];bodyChildren=[];viewIdToChildren={};childrenFiles=[];}class ContainerConverter extends DefaultConverter{name='ContainerConverter';static matches(node){return CONTAINER_TAGNAMES.has(node.tagName);}shouldChunkToNewFile(){if(this.node.tagName===tagNames.SUBTYPE_TO_TAGNAME.SidebarFrameWidget){const screen=(0,nodeUtils.getEnclosingScreen)(this.node);if(isNil_default()(screen)){return constants.SIDEBAR_FILE_NAME;}else{var _this$node$id;const sidebarFileName=(_this$node$id=this.node.id)===null||_this$node$id===void 0?void 0:_this$node$id.replace('sidebarFrame','sidebar');return`src/${sidebarFileName}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}}if((0,nodeUtils.isSubcontainerFrameNode)(this.node)){return`src/${this.node.id}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}if(this.node.tagName!=='Container'){return false;}if(this.node.children.length<5){return false;}return`src/${this.node.id}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}serialize(){if(!this.sctx)throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);const groups=this.groupContainerChildren();let childNodes=[];if(groups.headerNodes.length>0)childNodes=childNodes.concat(this.makeChildGroupNode(this.node,groups.headerNodes,'Header'));childNodes=childNodes.concat(this.serializeViewNodes(groups.viewIdToChildren));if(groups.bodyChildren.length>0){const hasHeaderOrFooterNodes=groups.headerNodes.length>0||groups.footerChildren.length>0;childNodes=childNodes.concat(this.makeChildGroupNode(this.node,groups.bodyChildren,hasHeaderOrFooterNodes?'Body':undefined));}if(groups.footerChildren.length>0)childNodes=childNodes.concat(this.makeChildGroupNode(this.node,groups.footerChildren,'Footer'));childNodes=childNodes.concat(makeEventNodesFromAttributes(this.node.attributes,null,this.node));this.node.children=childNodes;const code=super.serialize();if(this.newFile&&isString_default()(code)){return this.sctx.createNewSourceFile(this.node.filePath,code);}else{return code;}}async deserialize(){const dctx=this.dctx;if(!dctx){throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);}dctx.visitNode(this.node);const viewChildren=[];await Promise.all(this.node.children.map(async child=>{if(child.tagName===tagNames.EVENT_TAGNAME)return;const isValidPseudoNode=types.ROW_GROUP_TAG_NAMES_MAP[child.tagName];if(isValidPseudoNode){await deserializeChildren(child,dctx);}else if(child.tagName===tagNames.SUBCONTAINER_TAGNAME){if(this.node.tagName!=='Container'){dctx.addError({message:`${this.node.tagName} does not support ${tagNames.SUBCONTAINER_TAGNAME} pseudo-nodes`,element:this.node.jsxNode});}const viewId=child.id;if(viewId==null||!isString_default()(viewId)){dctx.addError({message:`${tagNames.SUBCONTAINER_TAGNAME} must have id`,element:this.node.jsxNode});}viewChildren.push(child);await deserializeChildren(child,dctx);}else{await getAppPluginConverter(child,dctx).deserialize();}}));const{childAttributes}=getMappedItemAttributesFromPseudoNodes(this.node,viewChildren,dctx);this.node.attributes=Object.assign(this.node.attributes,childAttributes);const plugin=baseDeserializer(this.node,dctx);dctx.addPlugin(plugin);}makeChildGroupNode=(parentNode,children,templateTag)=>{if(templateTag){const groupNode=ast_node.ToolscriptNode.createPseudoNode({tagName:templateTag,attributes:{},filePath:parentNode.filePath,parent:parentNode});children.forEach(child=>child.parent=groupNode);groupNode.children=children;return[groupNode];}else{return children;}};groupContainerChildren(){const result=new ContainerChildren();this.node.children.forEach(child=>{var _child$positions,_child$positions2,_child$positions3;if(((_child$positions=child.positions)===null||_child$positions===void 0?void 0:_child$positions.rowGroup)==='header'){result.headerNodes.push(child);}else if(((_child$positions2=child.positions)===null||_child$positions2===void 0?void 0:_child$positions2.rowGroup)==='footer'){result.footerChildren.push(child);}else if((_child$positions3=child.positions)!==null&&_child$positions3!==void 0&&_child$positions3.subcontainer){if((0,nodeUtils.isSubcontainerFrameNode)(this.node)){result.bodyChildren.push(child);}else{var _result$viewIdToChild,_child$positions$subc,_result$viewIdToChild2;if(this.node.tagName!=='Container'){throw new Error(`${this.node.tagName} does not support subcontainer child elements`);}(_result$viewIdToChild2=(_result$viewIdToChild=result.viewIdToChildren)[_child$positions$subc=child.positions.subcontainer])!==null&&_result$viewIdToChild2!==void 0?_result$viewIdToChild2:_result$viewIdToChild[_child$positions$subc]=[];result.viewIdToChildren[child.positions.subcontainer].push(child);}}else{result.bodyChildren.push(child);}});return result;}serializeViewNodes(viewIdToChildren){const viewNodes=createMappedAttributePseudoNodes(this.node,tagNames.SUBCONTAINER_TAGNAME,this.sctx);if(this.node.tagName!=='Container'&&viewNodes.length>0){throw new Error(`${this.node.tagName} does not support ${tagNames.SUBCONTAINER_TAGNAME} pseudo-nodes`);}viewNodes.forEach(viewNode=>{const viewId=viewNode.id;if(isString_default()(viewId)&&viewIdToChildren[viewId]){const viewChildren=viewIdToChildren[viewId];viewChildren.forEach(x=>x.parent=viewNode);viewNode.children=viewChildren;}});return viewNodes;}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/defaultFunction.ts
const applyFunctionFolder=node=>{if(!node.metadata){throw new errors.DeserializeError(`expected metadata to deserialize function ${node.id}`);}if(node.parent&&(0,nodeUtils.isFolderNode)(node.parent)&&node.parent.id){node.metadata.folder=node.parent.id;}};class DefaultFunctionConverter extends DefaultConverter{name='DefaultFunctionConverter';static matches(node){return (0,nodeUtils.isFunctionNode)(node)&&!(0,nodeUtils.isQueryNode)(node)&&!(0,nodeUtils.isTransformerNode)(node);}async deserialize(){applyFunctionFolder(this.node);return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/expandedRow.ts
class ExpandedRowConverter extends DefaultConverter{name='ExpandedRowConverter';async deserialize(){if(!this.dctx){throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);}this.dctx.visitNode(this.node);for(const child of this.node.children){child.parent=this.node.parent;}await deserializeChildren(this.node,this.dctx);}static matches(node){return node.tagName===tagNames.TABLE_EXPANDED_ROW_TAGNAME;}shouldChunkToNewFile(){return this.node.filePath;}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/frame.ts
class FrameConverter extends DefaultConverter{name='FrameConverter';static matches(node){return (0,nodeUtils.isFrameNode)(node);}shouldChunkToNewFile(){if((0,nodeUtils.isHeaderNode)(this.node)&&this.node.id){var _getEnclosingScreen;const screen=(_getEnclosingScreen=(0,nodeUtils.getEnclosingScreen)(this.node))===null||_getEnclosingScreen===void 0?void 0:_getEnclosingScreen.tagName;if(isNil_default()(screen)){return constants.HEADER_FILE_NAME;}else{return`src/${this.node.id.replace('$','')}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}}return false;}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);}if((0,nodeUtils.isSubcontainerFrameNode)(this.node)){const converter=new ContainerConverter(this.node,this.sctx);return converter.serialize();}return super.serialize();}async deserialize(){var _this$node$parent;if(!this.dctx){throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);}this.dctx.visitNode(this.node);const parentTagName=(_this$node$parent=this.node.parent)===null||_this$node$parent===void 0?void 0:_this$node$parent.tagName;if(!tagNames.FRAME_PARENT_ALLOWED_TAGNAMES.has(parentTagName)){this.dctx.addError({message:`Frame must be child of one of the following: ${tagNames.FRAME_PARENT_ALLOWED_TAGNAMES_STR}. It was a child of ${parentTagName}`,element:this.node.jsxNode});}if((0,nodeUtils.isSubcontainerFrameNode)(this.node)){const converter=new ContainerConverter(this.node,this.dctx);return converter.deserialize();}return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/globalFunctions.ts
class GlobalFunctionsConverter extends DefaultConverter{name='GlobalFunctionsConverter';static matches(node){return node.tagName===tagNames.GLOBAL_FUNCTIONS_TAGNAME;}shouldChunkToNewFile(){return this.node.filePath;}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize node ${this.node.id} with converter ${this.name} with incorrect context`);}if(this.node.children.length===0)return'';const functionFileContent=this.createFunctionContent(this.node.children);return this.sctx.createNewSourceFile(this.node.filePath,functionFileContent);}createFunctionContent(functions){var _this$sctx$getFunctio,_this$sctx;const{folderOrderMapping,topLevelFunctions}=buildFunctionHierarchy({functions,parent:this.node,ctx:this.sctx});const functionContent=createFunctionToolscriptElements({folders:(_this$sctx$getFunctio=(_this$sctx=this.sctx)===null||_this$sctx===void 0?void 0:_this$sctx.getFunctionFolders())!==null&&_this$sctx$getFunctio!==void 0?_this$sctx$getFunctio:[],folderOrderMapping,topLevelFunctions});return (0,utils.createToolscriptElement)({tagName:tagNames.GLOBAL_FUNCTIONS_TAGNAME,childrenCode:functionContent.join('\n')});}async deserialize(){if(!this.dctx){throw new Error(`Deserializing node ${this.node.id} with converter ${this.name} with incorrect context`);}let flattenedChildren=[];const folders=[];this.node.children.forEach(child=>{if((0,nodeUtils.isFolderNode)(child)){folders.push(child);}else{flattenedChildren.push(child);}});folders.forEach(folder=>{flattenedChildren=flattenedChildren.concat(folder.children);});this.node.children=flattenedChildren;return deserializeChildren(this.node,this.dctx);}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/htmlWidget.ts
class HTMLWidgetConverter extends DefaultConverter{name='HTMLWidgetConverter';static matches(node){return node.tagName==='HTML';}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} using ${this.name} with no context`);}const htmlAttr=this.node.attributes.html;if(htmlAttr&&typeof htmlAttr==='string'){const containsNewLine=htmlAttr.includes('\n');if(containsNewLine){const htmlPath=`${constants.LIB_PATH}/${this.node.id}.html`;this.sctx.createNewSourceFile(htmlPath,htmlAttr);this.node.attributes.html=new attributeImport.AttributeImport(htmlPath,'string');}}const cssAttr=this.node.attributes.css;if(cssAttr&&typeof cssAttr==='string'){const cssLines=cssAttr.split('\n');if(cssLines.length>1){const cssPath=`${constants.LIB_PATH}/${this.node.id}.css`;this.sctx.createNewSourceFile(cssPath,cssAttr);this.node.attributes.css=new attributeImport.AttributeImport(cssPath,'string');}}return super.serialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/mainFrame.ts
class MainFrameConverter extends DefaultConverter{name='MainFrameConverter';static matches(node){var _node$id;return((_node$id=node.id)===null||_node$id===void 0?void 0:_node$id.startsWith('$main'))||false;}shouldChunkToNewFile(){return false;}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} with ${this.name} with no context`);}const converter=new FrameConverter(this.node,this.sctx);return converter.serialize();}async deserialize(){if(!this.dctx){throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);}const dctx=this.dctx;if(!dctx._reassignMainIds){const converter=new FrameConverter(this.node,this.dctx);return converter.deserialize();}else{const newMainId=dctx.mainCount===1?'$main':`$main${dctx.mainCount}`;dctx.mainCount+=1;this.node.renameId(newMainId);const converter=new FrameConverter(this.node,this.dctx);return converter.deserialize();}}}
;// CONCATENATED MODULE: ../packages/common/plugins/widgets/v2/api/types.ts
const LABEL_WIDTH_UNITS=['%','px','col'];const WIDGET_MODEL_COMMON_KEYS=['disabled','events','hidden','hideLabel','hideValidationMessage','invalid','label','labelAlign','labelCaption','labelPosition','labelWrap','labelWidth','labelWidthUnit','styleVariant','style','tooltipText','_validate','_data','validationMessage','id'];
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(570899);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lowerFirst.js
var lowerFirst = __webpack_require__(249778);
var lowerFirst_default = /*#__PURE__*/__webpack_require__.n(lowerFirst);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/upperFirst.js
var upperFirst = __webpack_require__(75461);
var upperFirst_default = /*#__PURE__*/__webpack_require__.n(upperFirst);
// EXTERNAL MODULE: ../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var isObject = __webpack_require__(57140);
var isObject_default = /*#__PURE__*/__webpack_require__.n(isObject);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/ast/types.ts
function isReadableJSONMapOrOrderedMap(value){var _get;if(isObject_default()(value)&&(((_get=get_default()(value,'map'))===null||_get===void 0?void 0:_get.constructor)===Object||get_default()(value,'ordered'))){return true;}return false;}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/tableProps.ts
const UNDERSCORE_ATTRS_TO_EXCLUDE=new Set(['_showToolbar','_changeset']);const TABLE_MAPPED_ITEMS=[{prefix:'_column',tagName:tagNames.TABLE_COLUMN_TAGNAME,props:[{name:'id'},{name:'icon',hidden:true},{name:'tooltip'},{name:'key'},{name:'label'},{name:'backgroundColor'},{name:'textColor'},{name:'caption'},{name:'cellTooltipMode'},{name:'cellTooltip'},{name:'placeholder'},{name:'format'},{name:'formatOptions',default:{},description:'format options seem to vary widely! see DateTimeFormatOptions etc'},{name:'editable'},{name:'editableInNewRows'},{name:'editableOptions',default:{},description:'editable options seem to vary widely! see columnFormatOptionPresets, NumberEditableOptions etc'},{name:'optionList',default:{},type:`{ mode: "mapped", mappedData: "['1','2','3']" }`,description:'for mapped options on editable'},{name:'valueOverride'},{name:'alignment',description:'left, right, center'},{name:'position'},{name:'size'},{name:'statusIndicatorOptions',default:{}},{name:'groupAggregationMode'},{name:'summaryAggregationMode'},{name:'hidden'},{name:'referenceId'},{name:'sortDisabled',default:false},{name:'sortMode',default:'default'}]},{prefix:'_action',tagName:tagNames.TABLE_ACTION_TAGNAME,props:[{name:'id'},{name:'icon'},{name:'label'},{name:'disabled'},{name:'hidden'}]},{prefix:'_toolbarButton',tagName:tagNames.TABLE_TOOLBAR_BUTTON_TAGNAME,props:[{name:'id'},{name:'icon'},{name:'label'},{name:'type'},{name:'hidden'}]}];
;// CONCATENATED MODULE: ../packages/common/components/generated/Chart/template.ts
const template={_seriesAggregationType:'Map',_seriesColorArray:'Map',_seriesColorArrayDropDown:'Map',_seriesColorInputMode:'Map',_seriesConnectorLineColor:'Map',_seriesDataLabelPosition:'Map',_seriesDatasource:'Map',_seriesDatasourceMode:'Map',_seriesDecreasingBorderColor:'Map',_seriesDecreasingColor:'Map',_seriesFilteredGroups:'Map',_seriesFilteredGroupsMode:'Map',_seriesGradientColorArray:'Map',_seriesGroupBy:'Map',_seriesGroupByDropdownType:'Map',_seriesGroupByStyles:'Map',_seriesHoverTemplate:'Map',_seriesHoverTemplateArray:'Map',_seriesHoverTemplateMode:'Map',_seriesIds:'List<string>',_seriesIncreasingBorderColor:'Map',_seriesIncreasingColor:'Map',_seriesLineColor:'Map',_seriesLineDash:'Map',_seriesLineShape:'Map',_seriesLineUnderFillMode:'Map',_seriesLineWidth:'Map',_seriesMarkerBorderColor:'Map',_seriesMarkerBorderWidth:'Map',_seriesMarkerColor:'Map',_seriesMarkerSize:'Map',_seriesMarkerSymbol:'Map',_seriesName:'Map',_seriesShowMarkers:'Map',_seriesTextTemplate:'Map',_seriesTextTemplateMode:'Map',_seriesType:'Map',_seriesWaterfallBase:'Map',_seriesWaterfallMeasures:'Map',_seriesWaterfallMeasuresMode:'Map',_seriesXData:'Map',_seriesXDataMode:'Map',_seriesYAxis:'Map',_seriesYData:'Map',_seriesYDataMode:'Map',_seriesZData:'Map',_seriesZDataMode:'Map',barGap:'number',barGroupGap:'number',barMode:['stack','group','overlay','relative'],barOrientation:['v','h'],chartType:['bar','bubble','funnel','heatmap','line','mixed','pie','plotlyJson','sankey','scatter','sunburst','treemap','waterfall'],colorArray:'array',colorArrayDropDown:'array',colorInputMode:['colorArray','gradientColorArray','colorArrayDropDown'],data:'object?',datasource:'unknown?',datasourceMode:['manual','source'],gradientColorArray:'unknown?',heatmapShowScale:'boolean',hidden:'boolean',hoverTemplate:'string',hoverTemplateMode:['manual','source'],labelData:'array',labelDataMode:['manual','source'],legendPosition:['right','left','top','bottom','none'],lineColor:'string',lineWidth:'number',maintainSpaceWhenHidden:'boolean',margin:'string',parentData:'array',parentDataMode:['manual','source'],pieDataHole:'number',plotlyDataJson:'object[]',plotlyLayoutJson:'object',rangeSlider:'boolean',sankeyAllowDuplicateNodesAtDifferentSteps:'boolean',sankeyDatasource:'unknown?',sankeyDatasourceMode:['manual','source'],sankeyLinkColorArray:'array',sankeyLinkColorArrayDropDown:'array',sankeyLinkColorInputMode:['colorArray','gradientColorArray','colorArrayDropDown'],sankeyLinkGradientColorArray:'unknown?',sankeyLinkHoverTemplate:'string',sankeyLinkHoverTemplateMode:['manual','source'],sankeyNodeHoverTemplate:'string',sankeyNodeHoverTemplateMode:['manual','source'],selectedPoints:'array',series:'object?',showAutoscale:'boolean',showBoxSelect:'boolean',showInEditor:'boolean',showLassoSelect:'boolean',showPan:'boolean',showResetView:'boolean',showSecondYAxis:'boolean',showToImage:'boolean',showToolbarAddOn:'boolean',showZoomIn:'boolean',showZoomOut:'boolean',showZoomSelect:'boolean',stackedBarTotalsDataLabelPosition:['bottom','top','none'],sunburstDataBranchValues:['total','remainder'],sunburstDataLeafOpacity:'number',textTemplate:'string',textTemplateMode:['manual','source'],textTemplatePosition:['inside','outside','auto','radial','horizontal','vertical'],title:'string',toolbar:'object',valueData:'array',valueDataMode:['manual','source'],xAxis:'object?',xAxisGrid:'boolean',xAxisLineWidth:'number',xAxisRangeMax:'unknown?',xAxisRangeMin:'unknown?',xAxisRangeMode:['auto','manual'],xAxisScale:['auto','linear','log','date','category'],xAxisShowLine:'boolean',xAxisShowTickLabels:'boolean',xAxisSort:['none','ascending','descending'],xAxisTickFormat:'string',xAxisTickFormatMode:['d3String','gui'],xAxisTitle:'string',xAxisZeroLine:'boolean',yAxis:'object?',yAxis2:'object?',yAxis2Grid:'boolean',yAxis2LineWidth:'number',yAxis2RangeMax:'unknown?',yAxis2RangeMin:'unknown?',yAxis2RangeMode:['auto','manual'],yAxis2Scale:['auto','linear','log','date','category'],yAxis2ShowLine:'boolean',yAxis2ShowTickLabels:'boolean',yAxis2Sort:['none','ascending','descending'],yAxis2TickFormat:'string',yAxis2TickFormatMode:['d3String','gui'],yAxis2Title:'string',yAxis2ZeroLine:'boolean',yAxisGrid:'boolean',yAxisLineWidth:'number',yAxisRangeMax:'unknown?',yAxisRangeMin:'unknown?',yAxisRangeMode:['auto','manual'],yAxisScale:['auto','linear','log','date','category'],yAxisShowLine:'boolean',yAxisShowTickLabels:'boolean',yAxisSort:['none','ascending','descending'],yAxisTickFormat:'string',yAxisTickFormatMode:['d3String','gui'],yAxisTitle:'string',yAxisZeroLine:'boolean'};
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/mappedItemProps.ts
const KV_MAPPED_ITEMS=[{prefix:'_property',tagName:tagNames.KEYVALUE_PROPERTY_TAGNAME,props:[{name:'id'},{name:'editable',default:false},{name:'editableOptions'},{name:'format'},{name:'label'},{name:'hidden'},{name:'formatOptions'},{name:'valueOverride'},{name:'optionList',default:{},type:`{ mode: "mapped", mappedData: "['1','2','3']" }`,description:'for mapped options on editable'},{name:'placeholder'}]}];const chartSeriesProperties=Object.keys(template).filter(key=>key.startsWith('_series')&&key!=='_seriesIds').map(key=>{const propertyNameWithoutSeries=key.slice(7);return{name:propertyNameWithoutSeries.charAt(0).toLowerCase()+propertyNameWithoutSeries.slice(1)};});const CHART_MAPPED_ITEMS=[{prefix:'_series',tagName:tagNames.CHART_SERIES_TAGNAME,props:chartSeriesProperties.concat([{name:'id'}])}];const BG_MAPPED_ITEMS=[{prefix:'_button',tagName:'ButtonGroup2-Button',props:[{name:'id'},{name:'text'},{name:'tooltip'},{name:'disabled'},{name:'styleVariant'},{name:'icon'},{name:'iconPosition'},{name:'hidden'},{name:'backgroundColor'},{name:'borderColor'},{name:'labelColor'}]}];const ALERT_MAPPED_ITEMS=[{prefix:'_state',tagName:'State',props:[{name:'id'},{name:'values'},{name:'titles'},{name:'descriptions'},{name:'tooltips'},{name:'icons'},{name:'iconPositions'},{name:'actionTexts'},{name:'actionPositions'},{name:'actionIcons'},{name:'actionIconPositions'},{name:'actionTooltips'},{name:'colors'},{name:'backgroundColors'},{name:'borderColors'},{name:'styleVariants'}]}];const MAPPED_ITEMS={TableWidget2:TABLE_MAPPED_ITEMS,KeyValueWidget2:KV_MAPPED_ITEMS,ButtonGroupWidget2:BG_MAPPED_ITEMS,AlertWidget2:ALERT_MAPPED_ITEMS,ChartWidget2:CHART_MAPPED_ITEMS};
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/mappedItems.ts
function mappedItems_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function mappedItems_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?mappedItems_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):mappedItems_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const KEYS_TO_PRESERVE=WIDGET_MODEL_COMMON_KEYS;const SUPPORTED_SUBTYPES=['KeyValueWidget2','ButtonGroupWidget2','AlertWidget2','ChartWidget2'];const SUPPORTED_TAGNAMES=SUPPORTED_SUBTYPES.map(subtype=>tagNames.SUBTYPE_TO_TAGNAME[subtype]);class MappedItemsConverter extends DefaultConverter{name='MappedItemsConverter';static matches(node){if((0,nodeUtils.isInMobileApp)(node)){return false;}return SUPPORTED_TAGNAMES.includes(node.tagName);}getNodeSubtype(){return tagNames.TAGNAME_TO_SUBTYPE[this.node.tagName];}filterAttributesBeforeSerialization(attributes){return attributes;}serialize(){const rawAttributes=this.filterAttributesBeforeSerialization(cloneDeep_default()(this.node.attributes));const{mappedChildNodes,attributes}=serializeMappedChildren(this.node,rawAttributes);const sctx=this.sctx;const defaults=defaultsForSubtype(this.getNodeSubtype(),sctx.appTemplateVersion);this.node.attributes=Object.keys(attributes).reduce((acc,key)=>{let nodeKey=key;if(key.startsWith('_')){nodeKey=key.slice(1);}if(!KEYS_TO_PRESERVE.includes(key)&&!Object.keys(defaults).includes(key)){return acc;}let value=attributes[key];if(isReadableJSONMapOrOrderedMap(value)){value=(0,utils.processMapOrOrderedMap)(value);}acc[nodeKey]=value;return acc;},{});this.node.children=this.node.children.concat(mappedChildNodes);return super.serialize();}filterAttributesAfterDeserialization(attributes){return attributes;}async deserialize(){if(!this.dctx)throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);this.dctx.visitNode(this.node);const{children}=this.node;const{attrs:childAttrs,remainingChildren}=deserializeMappedChildren(children,this.dctx,this.getNodeSubtype());const allAttrs=Object.assign(this.node.attributes,childAttrs);const defaults=defaultsForSubtype(this.getNodeSubtype(),this.dctx.appTemplateVersion);const attributes=Object.keys(allAttrs).reduce((acc,key)=>{let widgetKey=key;if(!key.startsWith('_')&&Object.keys(defaults).includes(`_${widgetKey}`)){widgetKey=`_${key}`;}else if(!KEYS_TO_PRESERVE.includes(widgetKey)&&!Object.keys(defaults).includes(widgetKey)){return acc;}acc[widgetKey]=allAttrs[key];return acc;},{});this.node.attributes=this.filterAttributesAfterDeserialization(attributes);this.node.children=remainingChildren;return super.deserialize();}}const serializeMappedChildren=(node,filteredAttributes)=>{const attributes=filteredAttributes;let mappedChildNodes=[];const subtype=tagNames.TAGNAME_TO_SUBTYPE[node.tagName];const childIdsByTagname=getMappedItemsForSubtype(subtype).reduce((acc,{tagName,prefix})=>{const key=`${prefix}Ids`;const val=attributes[key];if(!val){return acc;}else if(!validateChildIds(val)){throw new Error(`Expected array of strings for the ${key} attribute in ${node.id}, but got: ${JSON.stringify(val)}`);}acc[tagName]=val;delete attributes[key];return acc;},{});const childAttributesByTagName={};Object.entries(attributes).forEach(([attr,values])=>{var _childAttributesByTag;const mappedItem=getMappedItemsForSubtype(subtype).find(({prefix})=>{if(attr.startsWith(prefix)){const nextChar=attr.slice(prefix.length)[0];return nextChar&&nextChar===nextChar.toUpperCase();}return false;});const tagName=mappedItem===null||mappedItem===void 0?void 0:mappedItem.tagName;if(!tagName)return;(_childAttributesByTag=childAttributesByTagName[tagName])!==null&&_childAttributesByTag!==void 0?_childAttributesByTag:childAttributesByTagName[tagName]={};delete attributes[attr];if(!mappedItems_isObject(values)){console.warn(`Skipping attribute ${attr} in ${node.id} with value ${JSON.stringify(values)} because it is not an Immutable object`);return;}const castValues=(0,utils.processMapOrOrderedMap)(values);Object.keys(castValues).map(childId=>{var _childAttributesByTag2,_childAttributesByTag3,_childIdsByTagname$ta,_prop$default;(_childAttributesByTag3=(_childAttributesByTag2=childAttributesByTagName[tagName])[childId])!==null&&_childAttributesByTag3!==void 0?_childAttributesByTag3:_childAttributesByTag2[childId]={};if(!((_childIdsByTagname$ta=childIdsByTagname[tagName])!==null&&_childIdsByTagname$ta!==void 0&&_childIdsByTagname$ta.includes(childId))){return;}const childAttr=lowerFirst_default()(attr.substring(mappedItem.prefix.length));let value=castValues[childId];if(isReadableJSONMapOrOrderedMap(value)){value=(0,utils.processMapOrOrderedMap)(value);}const prop=mappedItem.props.find(({name})=>childAttr===name);const defaultValue=(_prop$default=prop===null||prop===void 0?void 0:prop.default)!==null&&_prop$default!==void 0?_prop$default:'';if(!prop||isEqual_default()(defaultValue,value)||prop.hidden){return;}childAttributesByTagName[tagName][childId][childAttr]=value;});});Object.keys(childIdsByTagname).forEach(tagName=>{const childIds=childIdsByTagname[tagName];childIds.forEach(id=>{const childNode=ast_node.ToolscriptNode.createPseudoNode({tagName,attributes:mappedItems_objectSpread({id},childAttributesByTagName[tagName][id]),filePath:node.filePath,parent:node});const childEvents=makeEventNodesFromAttributes(attributes,id,node);mappedChildNodes.push(childNode);childNode.children=childEvents;});});if(Array.isArray(attributes.events)){attributes.events=attributes.events.filter(ev=>!get_default()(ev,'targetId'));}mappedChildNodes=mappedChildNodes.concat(makeEventNodesFromAttributes(attributes,null,node));delete attributes.events;return{mappedChildNodes,attributes};};const deserializeMappedChildren=(children,ctx,subtype)=>{const attrs={};const remainingChildren=[];let events=[];for(const childNode of children){if(childNode.tagName===tagNames.EVENT_TAGNAME){events.push(mappedItems_objectSpread({},childNode.attributes));continue;}const mappedItem=getMappedItemsForSubtype(subtype).find(({tagName})=>childNode.tagName===tagName);const hasChildNodeId=childNode.id!==null;if(!mappedItem){remainingChildren.push(childNode);continue;}else if(!hasChildNodeId){ctx.addError({message:`"${childNode.tagName}" elements must have an "id" attribute`,element:childNode.jsxNode});}const childNodeId=childNode.id;if(childNodeId){mappedItem.props.forEach(mappedItemProp=>{var _attrs$attrName;if(mappedItemProp.hidden||mappedItemProp.name==='id')return;const attrName=`${mappedItem.prefix}${upperFirst_default()(mappedItemProp.name)}`;(_attrs$attrName=attrs[attrName])!==null&&_attrs$attrName!==void 0?_attrs$attrName:attrs[attrName]={};if(mappedItems_isObject(attrs[attrName])){var _mappedItemProp$defau;const castedAttr=attrs[attrName];castedAttr[childNodeId]=(_mappedItemProp$defau=mappedItemProp===null||mappedItemProp===void 0?void 0:mappedItemProp.default)!==null&&_mappedItemProp$defau!==void 0?_mappedItemProp$defau:'';}});}const attrPrefix=mappedItem.prefix;for(const childAttrName in childNode.attributes){const attrValue=childNode.attributes[childAttrName];if(childAttrName==='id'){const attrName=`${attrPrefix}Ids`;const existingValues=attrs[attrName]||[];if(!Array.isArray(existingValues)){ctx.addError({message:`The "${childNode.tagName}" with id "${childNode.id}" attribute "${childAttrName}" mixes array and object values`,element:childNode.jsxNode});}else{attrs[attrName]=[...existingValues,childNode.id];}}else{var _attrs$attrName2;const prop=mappedItem.props.find(({name})=>childAttrName===name);if(!prop||prop.hidden)continue;const attrName=`${attrPrefix}${upperFirst_default()(childAttrName)}`;(_attrs$attrName2=attrs[attrName])!==null&&_attrs$attrName2!==void 0?_attrs$attrName2:attrs[attrName]={};if(hasChildNodeId&&mappedItems_isObject(attrs[attrName])){const castedAttr=attrs[attrName];castedAttr[childNode.id]=attrValue;}}}events=events.concat(deserializeChildEvents(childNode,ctx));}if(events.length){attrs.events=events;}return{attrs,remainingChildren};};const validateChildIds=columnIds=>{if(!Array.isArray(columnIds)){return false;}columnIds.forEach(columnId=>{if(typeof columnId!=='string'){return false;}});return true;};const mappedItems_isObject=value=>{return typeof value==='object'&&value!==null&&!Array.isArray(value);};const getMappedItemsForSubtype=subtype=>MAPPED_ITEMS[subtype];
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/modal.ts
class ModalConverter extends DefaultConverter{name='ModalConverter';static matches(node){return node.tagName==='Modal';}shouldChunkToNewFile(){if(this.node.children.length<3){return false;}return`src/${this.node.id}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/module.ts
const REQUIRED_ATTRIBUTES=['pageUuid','name'];class ModuleConverter extends DefaultConverter{name='ModuleConverter';validate(){const missingAttributes=REQUIRED_ATTRIBUTES.filter(attr=>!Object.prototype.hasOwnProperty.call(this.node.attributes,attr));if(missingAttributes.length>0){throw new Error(`Missing required attributes for module ${this.node.id}: ${missingAttributes.join(', ')}`);}}static matches(node){return node.tagName===tagNames.MODULE_TAGNAME;}serialize(){this.validate();const sctx=this.sctx;this.node.attributes.pageUuid=sctx.replaceOrgUuidWithGlobal(this.node.attributes.pageUuid);delete this.node.attributes.childNamespace;return super.serialize();}async deserialize(){this.node.attributes.childNamespace=this.node.id;const dctx=this.dctx;const sourceControlUuid=this.node.attributes.pageUuid;this.node.attributes.pageUuid=dctx.replaceSourceControlUuidWithOrgSpecific(sourceControlUuid);this.validate();return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/nestedItems.ts
class NestedItemsConverter extends DefaultConverter{name='NestedItemsConverter';static matches(node){return NESTED_ITEMS_TAGNAMES.has(node.tagName);}serialize(){this.node.children=createMappedAttributePseudoNodes(this.node,tagNames.OPTION_TAGNAME,this.sctx);return super.serialize();}async deserialize(){if(!this.dctx)throw new Error(`Deserializing ${this.node.id} with ${this.name} with no context`);const optionNodes=this.node.children.filter(child=>child.tagName===tagNames.OPTION_TAGNAME);this.node.children=this.node.children.filter(child=>child.tagName!==tagNames.OPTION_TAGNAME);const{childAttributes,childEvents}=getMappedItemAttributesFromPseudoNodes(this.node,optionNodes,this.dctx);this.node.attributes=Object.assign(this.node.attributes,childAttributes);if(childEvents.length){var _this$node$attributes,_this$node$attributes2;(_this$node$attributes2=(_this$node$attributes=this.node.attributes).events)!==null&&_this$node$attributes2!==void 0?_this$node$attributes2:_this$node$attributes.events=[];if(Array.isArray(this.node.attributes.events)){this.node.attributes.events=this.node.attributes.events.concat(childEvents);}}return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/pageFolders.ts
class PageCodeFoldersConverter extends DefaultConverter{name='PageCodeFoldersConverter';static matches(node){return node.tagName===tagNames.PAGE_FOLDER_TAGNAME;}shouldChunkToNewFile(){return false;}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize node ${this.node.id} with converter ${this.name} with incorrect context`);}if(this.node.children.length===0)return'';const functionFileContent=this.createFunctionContent(this.node.children);return functionFileContent;}createFunctionContent(functions){const{folderOrderMapping,topLevelFunctions}=buildFunctionHierarchy({functions,parent:this.node,ctx:this.sctx});const functionContent=createFunctionToolscriptElements({folders:Object.keys(folderOrderMapping),folderOrderMapping,topLevelFunctions});return functionContent.join('\n');}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/plotlyChart.ts
const IMPORTED_ATTRIBUTE_KEYS=['data','layout'];class PlotlyChartConverter extends DefaultConverter{name='PlotlyChartConverter';static matches(node){return node.tagName==='PlotlyChart';}serialize(){const sctx=this.sctx;if(!sctx){throw new Error(`Attempted to serialize ${this.node.id} using ${this.name} with no context`);}IMPORTED_ATTRIBUTE_KEYS.forEach(key=>{const value=this.node.attributes[key];if(value){const path=`${constants.LIB_PATH}/${this.node.id}.${key}.json`;sctx.createNewSourceFile(path,value);this.node.attributes[key]=new attributeImport.AttributeImport(path,'string');}});return super.serialize();}}
// EXTERNAL MODULE: ../packages/common/records/types.ts
var records_types = __webpack_require__(571908);
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/query.ts
const QUERY_KEY_EXCEPTIONS={GraphQLQuery:'body',SalesforceQuery:'SOQLQuery',WorkflowRun:'workflowParams'};const chunkRawQueryToFile=(querySubType,node,ctx)=>{const templateKey=querySubType in QUERY_KEY_EXCEPTIONS?QUERY_KEY_EXCEPTIONS[querySubType]:'query';const extension=querySubType in records_types.queryTypesAndExtensions?records_types.queryTypesAndExtensions[querySubType]:null;const rawQuery=node.attributes[templateKey];if(!extension||!rawQuery){return;}else{const rawQueryFilePath=`${constants.LIB_PATH}/${node.id}.${extension}`;ctx.createNewSourceFile(rawQueryFilePath,rawQuery);node.attributes[templateKey]=new attributeImport.AttributeImport(rawQueryFilePath,'string');}};class QueryConverter extends DefaultConverter{name='QueryConverter';static matches(node){return (0,nodeUtils.isQueryNode)(node);}serialize(){var _this$node$metadata,_this$node$metadata2;if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} using ${this.name} with no context`);}const sctx=this.sctx;const orgSpecificPlaygroudQueryUuid=this.node.attributes.playgroundQueryUuid;if(orgSpecificPlaygroudQueryUuid){this.node.attributes.playgroundQueryUuid=sctx.replaceOrgUuidWithGlobal(orgSpecificPlaygroudQueryUuid);}const orgSpecificWorkflowUuid=this.node.attributes.workflowId;if(orgSpecificWorkflowUuid){this.node.attributes.workflowId=sctx.replaceOrgUuidWithGlobal(orgSpecificWorkflowUuid);}chunkRawQueryToFile((0,nodeUtils.getPluginSubtype)(this.node),this.node,sctx);if((_this$node$metadata=this.node.metadata)!==null&&_this$node$metadata!==void 0&&_this$node$metadata.resourceDisplayName){this.node.attributes.resourceDisplayName=this.node.metadata.resourceDisplayName;}if((_this$node$metadata2=this.node.metadata)!==null&&_this$node$metadata2!==void 0&&_this$node$metadata2.resourceName){this.node.attributes.resourceName=sctx.replaceOrgUuidWithGlobal(this.node.metadata.resourceName);}return super.serialize();}async deserialize(){if(!this.node.metadata){this.node.metadata={};}if(!this.dctx){throw new Error(`Attempted to deserialize ${this.node.id} using ${this.name} with no context`);}const dctx=this.dctx;const globalPlaygroudQueryUuid=this.node.attributes.playgroundQueryUuid;if(globalPlaygroudQueryUuid){this.node.attributes.playgroundQueryUuid=dctx.replaceSourceControlUuidWithOrgSpecific(globalPlaygroudQueryUuid);}const globalWorkflowUuid=this.node.attributes.workflowId;if(globalWorkflowUuid){this.node.attributes.workflowId=dctx.replaceSourceControlUuidWithOrgSpecific(globalWorkflowUuid);}const[obsoleteNodes,otherNodes]=partition_default()(this.node.children,node=>['ResourceDisplayName','ResourceName'].includes(node.tagName));for(const child of obsoleteNodes){if(child.tagName==='ResourceDisplayName'&&child.text){this.node.metadata.resourceDisplayName=child.text;}else if(child.tagName==='ResourceName'&&child.text){this.node.metadata.resourceName=child.text;}}this.node.children=otherNodes;if(this.node.attributes.resourceDisplayName){this.node.metadata.resourceDisplayName=this.node.attributes.resourceDisplayName;delete this.node.attributes.resourceDisplayName;}if(this.node.attributes.resourceName){this.node.metadata.resourceName=dctx.replaceSourceControlUuidWithOrgSpecific(this.node.attributes.resourceName);delete this.node.attributes.resourceName;}applyFunctionFolder(this.node);return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/screen.ts
function screen_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function screen_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?screen_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):screen_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}class ScreenConverter extends DefaultConverter{name='ScreenConverter';static matches(node){return (0,nodeUtils.isScreenWidgetSubtype)(node);}shouldChunkToNewFile(){return`src/${this.node.id}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`;}serialize(){const pageCode=this.node.children.filter(child=>(0,nodeUtils.isFunctionNode)(child));if(pageCode.length>0){const pageCodeNode=ast_node.ToolscriptNode.createPseudoNode({tagName:tagNames.PAGE_FOLDER_TAGNAME,attributes:{},filePath:this.node.filePath,parent:this.node});pageCodeNode.parent=this.node;pageCodeNode.children=pageCode;this.node.children=this.node.children.filter(child=>!(0,nodeUtils.isFunctionNode)(child));this.node.children.unshift(pageCodeNode);}return super.serialize();}async deserialize(){var _this$node$parent,_this$node$parent2;if(!this.dctx)throw new Error(`Deserializing ${this.node.id} with converter ${this.name} with no context`);if(((_this$node$parent=this.node.parent)===null||_this$node$parent===void 0?void 0:_this$node$parent.tagName)!==tagNames.RN_APPTEMPLATE_TAGNAME&&((_this$node$parent2=this.node.parent)===null||_this$node$parent2===void 0?void 0:_this$node$parent2.tagName)!==tagNames.APPTEMPLATE_TAGNAME){var _this$node$parent3;this.dctx.addError({message:`Screen must be child of a ${tagNames.RN_APPTEMPLATE_TAGNAME} or ${tagNames.APPTEMPLATE_TAGNAME} node, not ${(_this$node$parent3=this.node.parent)===null||_this$node$parent3===void 0?void 0:_this$node$parent3.tagName}`,element:this.node.jsxNode});}this.node.children=this.node.children.flatMap(child=>(0,nodeUtils.isFolderNode)(child)?this.getFolderChildren(child):child);return super.deserialize();}getFolderChildren(folder){return folder.children.map(child=>{var _folder$id;child.parent=this.node;child.metadata=screen_objectSpread(screen_objectSpread({},child===null||child===void 0?void 0:child.metadata),{},{folder:(_folder$id=folder.id)!==null&&_folder$id!==void 0?_folder$id:undefined});return child;});}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/table.ts
const TABLE_SUBTYPE='TableWidget2';const TABLE_TAGNAME=tagNames.SUBTYPE_TO_TAGNAME[TABLE_SUBTYPE];class TableConverter extends MappedItemsConverter{name='TableConverter';static matches(node){return node.tagName===TABLE_TAGNAME;}serialize(){const widgetChildren=this.extractWidgetChildren();if(widgetChildren.length){const expandedRowID=`${this.node.id}ExpandedRow`;const expandedRowPseudoNode=new ast_node.ToolscriptNode({id:expandedRowID,tagName:tagNames.TABLE_EXPANDED_ROW_TAGNAME,filePath:`src/${expandedRowID}${constants.TOOLSCRIPT_APP_FILE_EXTENSION}`,parent:this.node,attributes:{}});expandedRowPseudoNode.children=widgetChildren;widgetChildren.forEach(child=>{child.parent=expandedRowPseudoNode;});this.node.children.unshift(expandedRowPseudoNode);}return super.serialize();}extractWidgetChildren(){const widgetChildren=[];const nonWidgetChildren=[];for(const child of this.node.children){if(TABLE_MAPPED_ITEMS.some(({tagName})=>tagName===child.tagName)){nonWidgetChildren.push(child);continue;}widgetChildren.push(child);}this.node.children=nonWidgetChildren;return widgetChildren;}filterAttributesBeforeSerialization(tableAttributes){if(!tableAttributes._showToolbar){const toolbarButtonConfig=TABLE_MAPPED_ITEMS.find(({tagName})=>tagName===tagNames.TABLE_TOOLBAR_BUTTON_TAGNAME);if(!toolbarButtonConfig){throw new Error(`Could not find find toolbar button prefix based on expected tag name ${tagNames.TABLE_TOOLBAR_BUTTON_TAGNAME}`);}delete tableAttributes[`${toolbarButtonConfig.prefix}Ids`];Object.keys(tableAttributes).forEach(key=>{if(key.startsWith(toolbarButtonConfig.prefix)){delete tableAttributes[key];}});}UNDERSCORE_ATTRS_TO_EXCLUDE.forEach(key=>{delete tableAttributes[key];});return tableAttributes;}filterAttributesAfterDeserialization(attributes){var _attributes$_changese;attributes._showToolbar=Array.isArray(attributes._toolbarButtonIds)&&attributes._toolbarButtonIds.length>0;(_attributes$_changese=attributes._changeset)!==null&&_attributes$_changese!==void 0?_attributes$_changese:attributes._changeset=null;return attributes;}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/transformer.ts
const chunkRawTransformerToFile=(node,ctx)=>{const templateKey='funcBody';const extension='js';const rawTransformer=node.attributes[templateKey];if(!extension||!rawTransformer){return;}else{const rawTransformerFilePath=`${constants.LIB_PATH}/${node.id}.${extension}`;ctx.createNewSourceFile(rawTransformerFilePath,rawTransformer);node.attributes[templateKey]=new attributeImport.AttributeImport(rawTransformerFilePath,'string');}};class TransformerConverter extends DefaultConverter{name='TransformerConverter';static matches(node){return (0,nodeUtils.isTransformerNode)(node);}serialize(){if(!this.sctx){throw new Error(`Attempted to serialize ${this.node.id} using ${this.name} with no context`);}chunkRawTransformerToFile(this.node,this.sctx);return super.serialize();}async deserialize(){applyFunctionFolder(this.node);return super.deserialize();}}
;// CONCATENATED MODULE: ../packages/common/toolscriptEngine/apps/converters/index.ts
const ALL_CONVERTERS=[AppConverter,MainFrameConverter,ContainerConverter,FrameConverter,ExpandedRowConverter,GlobalFunctionsConverter,PageCodeFoldersConverter,HTMLWidgetConverter,TableConverter,MappedItemsConverter,NestedItemsConverter,QueryConverter,TransformerConverter,ModalConverter,ModuleConverter,DefaultFunctionConverter,ScreenConverter,PlotlyChartConverter,AppThemeConverter,AppStylesConverter,DefaultConverter];const getAppPluginConverter=(node,ctx)=>{const Class=ALL_CONVERTERS.find(converter=>converter.matches(node))||DefaultConverter;return new Class(node,ctx);};const defaultConverterAllowedPlugins=new Set(['AvatarWidget','AvatarGroupWidget','ButtonWidget2','ButtonGroupWidget2','CalendarInputWidget','ChatWidget','CheckboxWidget2','ColorInputWidget','DateRangeWidget','DateTimeWidget','DateWidget','DividerWidget','EditableNumberWidget','EditableTextWidget2','EditableTextAreaWidget','FileButtonWidget','FileDropzoneWidget','FileInputWidget','FilterWidget','IconWidget','IconTextWidget','IFrameWidget2','ImageWidget2','InspectorTestWidget','JSONViewerWidget2','LinkWidget','ListViewWidget2','NumberInputWidget','PageInputWidget','PaginationWidget','PasswordInputWidget','PDFViewerWidget2','PhoneNumberInputWidget','ProgressBarWidget','ProgressCircleWidget','QRCodeWidget','RangeSliderWidget','RatingWidget2','SignaturePad2','SliderWidget2','SpacerWidget','StatisticWidget2','SwitchWidget2','TagsWidget','TagsWidget2','TimeWidget','TimeWidget2','TextAreaWidget','TextInputWidget2','TextWidget2','ToggleButtonWidget','ToggleLinkWidget','VideoWidget','FakeWidget','TimelineWidget2',...DEFAULT_CONVERTER_PLUGINS]);const verifyToolscriptConverterImplemented=subtype=>{if(defaultConverterAllowedPlugins.has(subtype)||subtype.match(/^DynamicWidget/)!==null){return true;}return hasCustomConverter(subtype);};const hasCustomConverter=subtype=>{const tagName=tagNames.SUBTYPE_TO_TAGNAME[subtype];if(!tagName){return false;}const fakeNode=new ast_node.ToolscriptNode({tagName,filePath:`/${tagName.toLowerCase()}.rsx`,id:`${tagName.toLowerCase()}1`});return(ALL_CONVERTERS.find(converter=>converter.matches(fakeNode))||DefaultConverter)!==DefaultConverter;};

/***/ }),

/***/ 835020:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertNodeToAttributesStrings: () => (/* binding */ convertNodeToAttributesStrings),
/* harmony export */   convertToAttributesStrings: () => (/* binding */ convertToAttributesStrings),
/* harmony export */   createToolscriptElement: () => (/* binding */ createToolscriptElement),
/* harmony export */   processMapOrOrderedMap: () => (/* binding */ processMapOrOrderedMap),
/* harmony export */   replaceElementUuidWithSourceControlUuid: () => (/* binding */ replaceElementUuidWithSourceControlUuid)
/* harmony export */ });
/* harmony import */ var _ast_attributeImport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(355244);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125430);
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57140);
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_2__);
const convertToAttributesStrings=(attributes,filePath)=>{const attributeStrings=attributes.map(({key,value})=>{if(typeof value==='boolean'){return`${key}={${value}}`;}else if(value instanceof _ast_attributeImport__WEBPACK_IMPORTED_MODULE_0__.AttributeImport){return`${key}=${value.getRelativeImport(filePath)}`;}else if(typeof value==='string'){return`${key}=${escapeString(value)}`;}else if(typeof value==='number'){return`${key}={${value}}`;}else if(value==null){return`${key}={null}`;}else if(typeof value==='object'){return`${key}={${JSON.stringify(value)}}`;}else{throw new Error(`Unknown attribute "${key}:${value}" of type: ${typeof value}`);}});return attributeStrings;};const convertNodeToAttributesStrings=node=>{return convertToAttributesStrings(node.sortedAttributes(),node.filePath);};const createToolscriptElement=({tagName,attributeStrings,childrenCode})=>{const formattedAttributes=attributeStrings&&attributeStrings.length>0?`${' '}${attributeStrings.join(' ')}`:'';if(childrenCode){return`<${tagName}${formattedAttributes}>${childrenCode}</${tagName}>`;}else{return`<${tagName}${formattedAttributes} />`;}};const escapeString=str=>{if(str.match(/"/)){return`{${JSON.stringify(str)}}`;}else{return`"${str}"`;}};const processMapOrOrderedMap=datum=>{if(lodash_isObject__WEBPACK_IMPORTED_MODULE_2___default()(datum)&&'map'in datum){return datum.map;}if(datum.ordered&&lodash_isArray__WEBPACK_IMPORTED_MODULE_1___default()(datum.ordered)){const converted={};datum.ordered.forEach(attr=>{const castAttr=attr;const key=Object.keys(castAttr)[0];const value=castAttr[key];converted[key]=value;});return converted;}return datum!==null&&datum!==void 0?datum:{};};const replaceElementUuidWithSourceControlUuid=(elementUuid,elementUuidToSourceControlUuidMap)=>{var _elementUuidToSourceC;return elementUuid?(_elementUuidToSourceC=elementUuidToSourceControlUuidMap===null||elementUuidToSourceControlUuidMap===void 0?void 0:elementUuidToSourceControlUuidMap.get(elementUuid))!==null&&_elementUuidToSourceC!==void 0?_elementUuidToSourceC:elementUuid:'';};

/***/ }),

/***/ 332054:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(637630);

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = baseProperty('length');

module.exports = asciiSize;


/***/ }),

/***/ 323580:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor;

/**
 * The base implementation of `_.repeat` which doesn't coerce arguments.
 *
 * @private
 * @param {string} string The string to repeat.
 * @param {number} n The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 */
function baseRepeat(string, n) {
  var result = '';
  if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string;
    }
    n = nativeFloor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);

  return result;
}

module.exports = baseRepeat;


/***/ }),

/***/ 368357:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseRepeat = __webpack_require__(323580),
    baseToString = __webpack_require__(958035),
    castSlice = __webpack_require__(41059),
    hasUnicode = __webpack_require__(555081),
    stringSize = __webpack_require__(377842),
    stringToArray = __webpack_require__(894637);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars);

  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }
  var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length);
}

module.exports = createPadding;


/***/ }),

/***/ 377842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var asciiSize = __webpack_require__(332054),
    hasUnicode = __webpack_require__(555081),
    unicodeSize = __webpack_require__(318818);

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

module.exports = stringSize;


/***/ }),

/***/ 318818:
/***/ ((module) => {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

module.exports = unicodeSize;


/***/ }),

/***/ 880440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(677518);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ 249778:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createCaseFirst = __webpack_require__(224270);

/**
 * Converts the first character of `string` to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.lowerFirst('Fred');
 * // => 'fred'
 *
 * _.lowerFirst('FRED');
 * // => 'fRED'
 */
var lowerFirst = createCaseFirst('toLowerCase');

module.exports = lowerFirst;


/***/ }),

/***/ 25096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var createPadding = __webpack_require__(368357),
    stringSize = __webpack_require__(377842),
    toInteger = __webpack_require__(573286),
    toString = __webpack_require__(504947);

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padStart('abc', 6);
 * // => '   abc'
 *
 * _.padStart('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padStart('abc', 3);
 * // => 'abc'
 */
function padStart(string, length, chars) {
  string = toString(string);
  length = toInteger(length);

  var strLength = length ? stringSize(string) : 0;
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : string;
}

module.exports = padStart;


/***/ })

}])
//# sourceMappingURL=8982.f1270a60.chunk.js.map