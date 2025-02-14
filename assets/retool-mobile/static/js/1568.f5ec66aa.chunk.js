(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[1568],{

/***/ 380633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(985707);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgFill(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 16,
    height: 17,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.197 1.303a.75.75 0 01.148.851l-6 12.667a.75.75 0 01-1.406-.14L6.715 9.786 1.818 8.561a.75.75 0 01-.14-1.405l12.668-6a.75.75 0 01.851.147z",
    fill: "currentColor"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgFill);

/***/ }),

/***/ 233092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(985707);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

function SvgOutline(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 16,
    height: 17,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M2 7.833l12.667-6-6 12.667-1.334-5.333L2 7.833z",
    stroke: "#000",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgOutline);

/***/ }),

/***/ 981178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(985707);
const DisabledByContainerContext=(0,_retool_builder_retool_development_mobile_node_modules_react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisabledByContainerContext);

/***/ }),

/***/ 291568:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MapWidget)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/defineProperty.js + 3 modules
var defineProperty = __webpack_require__(961639);
// EXTERNAL MODULE: ../node_modules/.pnpm/@babel+runtime@7.24.8/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(421565);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Map/options.ts
const options={};/* harmony default export */ const Map_options = (options);
// EXTERNAL MODULE: ../packages/runtimeShared/plugins/registry.ts + 28 modules
var registry = __webpack_require__(730223);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Map/template.ts
/* harmony default export */ const template = ({longitude:'number',latitude:'number',points:'array',selectedPoint:'object?',mapStyle:'string',aspectRatio:'number?',geoJson:'object?',geoJsonLayerStyle:'object?',zoom:'number'});
;// CONCATENATED MODULE: ../frontend/src/components/plugins/mobile/widgets/Map/widgetRuntimeOptions.ts
/* harmony default export */ const widgetRuntimeOptions = ((0,registry.registerV2)({typeKey:'RNMapWidget',name:'Map',template: template,events:['pointPressed']}));
// EXTERNAL MODULE: ./src/components/plugins/widgets/connectMobileWidget.tsx + 9 modules
var connectMobileWidget = __webpack_require__(360062);
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(985707);
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/use-map.js



const MountedMapsContext = react.createContext(null);
const MapProvider = props => {
    const [maps, setMaps] = (0,react.useState)({});
    const onMapMount = (0,react.useCallback)((map, id = 'default') => {
        setMaps(currMaps => {
            if (id === 'current') {
                throw new Error("'current' cannot be used as map id");
            }
            if (currMaps[id]) {
                throw new Error(`Multiple maps with the same id: ${id}`);
            }
            return { ...currMaps, [id]: map };
        });
    }, []);
    const onMapUnmount = (0,react.useCallback)((id = 'default') => {
        setMaps(currMaps => {
            if (currMaps[id]) {
                const nextMaps = { ...currMaps };
                delete nextMaps[id];
                return nextMaps;
            }
            return currMaps;
        });
    }, []);
    return (react.createElement(MountedMapsContext.Provider, { value: {
            maps,
            onMapMount,
            onMapUnmount
        } }, props.children));
};
function useMap() {
    var _a;
    const maps = (_a = (0,react.useContext)(MountedMapsContext)) === null || _a === void 0 ? void 0 : _a.maps;
    const currentMap = (0,react.useContext)(MapContext);
    const mapsWithCurrent = (0,react.useMemo)(() => {
        return { ...maps, current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map };
    }, [maps, currentMap]);
    return mapsWithCurrent;
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/transform.js
/**
 * Make a copy of a transform
 * @param tr
 */
function cloneTransform(tr) {
    const newTransform = tr.clone();
    // Work around mapbox bug - this value is not assigned in clone(), only in resize()
    newTransform.pixelsToGLUnits = tr.pixelsToGLUnits;
    return newTransform;
}
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
function applyViewStateToTransform(tr, props) {
    const v = props.viewState || props;
    let changed = false;
    if ('longitude' in v && 'latitude' in v) {
        const center = tr.center;
        // @ts-ignore
        tr.center = new center.constructor(v.longitude, v.latitude);
        changed = changed || center !== tr.center;
    }
    if ('zoom' in v) {
        const zoom = tr.zoom;
        tr.zoom = v.zoom;
        changed = changed || zoom !== tr.zoom;
    }
    if ('bearing' in v) {
        const bearing = tr.bearing;
        tr.bearing = v.bearing;
        changed = changed || bearing !== tr.bearing;
    }
    if ('pitch' in v) {
        const pitch = tr.pitch;
        tr.pitch = v.pitch;
        changed = changed || pitch !== tr.pitch;
    }
    if (v.padding && !tr.isPaddingEqual(v.padding)) {
        changed = true;
        tr.padding = v.padding;
    }
    return changed;
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/style-utils.js
const refProps = ['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout'];
// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in older styles that would fail Mapbox's diffing
function normalizeStyle(style) {
    if (!style) {
        return null;
    }
    if (typeof style === 'string') {
        return style;
    }
    if ('toJS' in style) {
        style = style.toJS();
    }
    if (!style.layers) {
        return style;
    }
    const layerIndex = {};
    for (const layer of style.layers) {
        layerIndex[layer.id] = layer;
    }
    const layers = style.layers.map(layer => {
        // @ts-expect-error
        const layerRef = layerIndex[layer.ref];
        let normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = { ...layer };
            // Breaks style diffing :(
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        if (layerRef) {
            normalizedLayer = normalizedLayer || { ...layer };
            delete normalizedLayer.ref;
            // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
            for (const propName of refProps) {
                if (propName in layerRef) {
                    normalizedLayer[propName] = layerRef[propName];
                }
            }
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return { ...style, layers };
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/deep-equal.js
/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */
function arePointsEqual(a, b) {
    const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
/* eslint-disable complexity */
/**
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(b)) {
        return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys) {
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/mapbox/mapbox.js



const pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
const cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
const otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
const settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
const handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
/**
 * A wrapper for mapbox-gl's Map class
 */
class Mapbox {
    constructor(MapClass, props, container) {
        // mapboxgl.Map instance. Not using type here because we are accessing
        // private members and methods
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._inRender = false;
        this._hoveredFeatures = null;
        this._deferredEvents = {
            move: false,
            zoom: false,
            pitch: false,
            rotate: false
        };
        this._onEvent = (e) => {
            // @ts-ignore
            const cb = this.props[otherEvents[e.type]];
            if (cb) {
                cb(e);
            }
        };
        this._onPointerEvent = (e) => {
            if (e.type === 'mousemove' || e.type === 'mouseout') {
                this._updateHover(e);
            }
            // @ts-ignore
            const cb = this.props[pointerEvents[e.type]];
            if (cb) {
                if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
                    const features = this._hoveredFeatures ||
                        this._map.queryRenderedFeatures(e.point, {
                            layers: this.props.interactiveLayerIds
                        });
                    e.features = features;
                }
                cb(e);
                delete e.features;
            }
        };
        this._onCameraEvent = (e) => {
            if (!this._internalUpdate) {
                // @ts-ignore
                const cb = this.props[cameraEvents[e.type]];
                if (cb) {
                    cb(e);
                }
            }
            if (e.type in this._deferredEvents) {
                this._deferredEvents[e.type] = false;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
    get map() {
        return this._map;
    }
    get transform() {
        return this._renderTransform;
    }
    setProps(props) {
        const oldProps = this.props;
        this.props = props;
        const settingsChanged = this._updateSettings(props, oldProps);
        if (settingsChanged) {
            this._createShadowTransform(this._map);
        }
        const sizeChanged = this._updateSize(props);
        const viewStateChanged = this._updateViewState(props, true);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props, oldProps);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || (viewStateChanged && !this._map.isMoving())) {
            this.redraw();
        }
    }
    static reuse(props, container) {
        const that = Mapbox.savedMaps.pop();
        if (!that) {
            return null;
        }
        const map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step1: reparenting child nodes from old container to new container
        const oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while (oldContainer.childNodes.length > 0) {
            container.appendChild(oldContainer.childNodes[0]);
        }
        // Step2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // Step 3: apply new props
        that.setProps({ ...props, styleDiffing: false });
        map.resize();
        const { initialViewState } = props;
        if (initialViewState) {
            if (initialViewState.bounds) {
                map.fitBounds(initialViewState.bounds, { ...initialViewState.fitBoundsOptions, duration: 0 });
            }
            else {
                that._updateViewState(initialViewState, false);
            }
        }
        // Simulate load event
        if (map.isStyleLoaded()) {
            map.fire('load');
        }
        else {
            map.once('styledata', () => map.fire('load'));
        }
        return that;
    }
    /* eslint-disable complexity,max-statements */
    _initialize(container) {
        const { props } = this;
        const mapOptions = {
            ...props,
            ...props.initialViewState,
            accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
            container,
            style: normalizeStyle(props.mapStyle)
        };
        const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [viewState.longitude || 0, viewState.latitude || 0],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            const getContext = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = () => {
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext;
                return props.gl;
            };
        }
        const map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) {
            map.setPadding(viewState.padding);
        }
        if (props.cursor) {
            map.getCanvas().style.cursor = props.cursor;
        }
        this._createShadowTransform(map);
        // Hack
        // Insert code into map's render cycle
        const renderMap = map._render;
        map._render = (arg) => {
            this._inRender = true;
            renderMap.call(map, arg);
            this._inRender = false;
        };
        const runRenderTaskQueue = map._renderTaskQueue.run;
        map._renderTaskQueue.run = (arg) => {
            runRenderTaskQueue.call(map._renderTaskQueue, arg);
            this._onBeforeRepaint();
        };
        map.on('render', () => this._onAfterRepaint());
        // Insert code into map's event pipeline
        const fireEvent = map.fire;
        map.fire = this._fireEvent.bind(this, fireEvent);
        // add listeners
        map.on('resize', () => {
            this._renderTransform.resize(map.transform.width, map.transform.height);
        });
        map.on('styledata', () => this._updateStyleComponents(this.props, {}));
        map.on('sourcedata', () => this._updateStyleComponents(this.props, {}));
        for (const eventName in pointerEvents) {
            map.on(eventName, this._onPointerEvent);
        }
        for (const eventName in cameraEvents) {
            map.on(eventName, this._onCameraEvent);
        }
        for (const eventName in otherEvents) {
            map.on(eventName, this._onEvent);
        }
        this._map = map;
    }
    /* eslint-enable complexity,max-statements */
    recycle() {
        // Clean up unnecessary elements before storing for reuse.
        const container = this.map.getContainer();
        const children = container.querySelector('[mapboxgl-children]');
        children === null || children === void 0 ? void 0 : children.remove();
        Mapbox.savedMaps.push(this);
    }
    destroy() {
        this._map.remove();
    }
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    redraw() {
        const map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (!this._inRender && map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    }
    _createShadowTransform(map) {
        const renderTransform = cloneTransform(map.transform);
        map.painter.transform = renderTransform;
        this._renderTransform = renderTransform;
    }
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */
    _updateSize(nextProps) {
        // Check if size is controlled
        const { viewState } = nextProps;
        if (viewState) {
            const map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    }
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */
    _updateViewState(nextProps, triggerEvents) {
        if (this._internalUpdate) {
            return false;
        }
        const map = this._map;
        const tr = this._renderTransform;
        // Take a snapshot of the transform before mutation
        const { zoom, pitch, bearing } = tr;
        const isMoving = map.isMoving();
        if (isMoving) {
            // All movement of the camera is done relative to the sea level
            tr.cameraElevationReference = 'sea';
        }
        const changed = applyViewStateToTransform(tr, {
            ...transformToViewState(map.transform),
            ...nextProps
        });
        if (isMoving) {
            // Reset camera reference
            tr.cameraElevationReference = 'ground';
        }
        if (changed && triggerEvents) {
            const deferredEvents = this._deferredEvents;
            // Delay DOM control updates to the next render cycle
            deferredEvents.move = true;
            deferredEvents.zoom || (deferredEvents.zoom = zoom !== tr.zoom);
            deferredEvents.rotate || (deferredEvents.rotate = bearing !== tr.bearing);
            deferredEvents.pitch || (deferredEvents.pitch = pitch !== tr.pitch);
        }
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            applyViewStateToTransform(map.transform, nextProps);
        }
        return changed;
    }
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateSettings(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of settingNames) {
            if (propName in nextProps && !deepEqual(nextProps[propName], currProps[propName])) {
                changed = true;
                map[`set${propName[0].toUpperCase()}${propName.slice(1)}`](nextProps[propName]);
            }
        }
        return changed;
    }
    /* Update map style to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if style is changed
     */
    _updateStyle(nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) {
            this._map.getCanvas().style.cursor = nextProps.cursor;
        }
        if (nextProps.mapStyle !== currProps.mapStyle) {
            const options = {
                diff: nextProps.styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) {
                options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            }
            this._map.setStyle(normalizeStyle(nextProps.mapStyle), options);
            return true;
        }
        return false;
    }
    /* Update fog, light and terrain to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateStyleComponents(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        if (map.style.loaded()) {
            if ('light' in nextProps && !deepEqual(nextProps.light, currProps.light)) {
                changed = true;
                map.setLight(nextProps.light);
            }
            if ('fog' in nextProps && !deepEqual(nextProps.fog, currProps.fog)) {
                changed = true;
                map.setFog(nextProps.fog);
            }
            if ('terrain' in nextProps && !deepEqual(nextProps.terrain, currProps.terrain)) {
                if (!nextProps.terrain || map.getSource(nextProps.terrain.source)) {
                    changed = true;
                    map.setTerrain(nextProps.terrain);
                }
            }
        }
        return changed;
    }
    /* Update interaction handlers to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateHandlers(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of handlerNames) {
            const newValue = nextProps[propName];
            if (!deepEqual(newValue, currProps[propName])) {
                changed = true;
                if (newValue) {
                    map[propName].enable(newValue);
                }
                else {
                    map[propName].disable();
                }
            }
        }
        return changed;
    }
    _updateHover(e) {
        var _a;
        const { props } = this;
        const shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            const eventType = e.type;
            const wasHovering = ((_a = this._hoveredFeatures) === null || _a === void 0 ? void 0 : _a.length) > 0;
            let features;
            if (eventType === 'mousemove') {
                try {
                    features = this._map.queryRenderedFeatures(e.point, {
                        layers: props.interactiveLayerIds
                    });
                }
                catch (_b) {
                    features = [];
                }
            }
            else {
                features = [];
            }
            const isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        }
        else {
            this._hoveredFeatures = null;
        }
    }
    _fireEvent(baseFire, event, properties) {
        const map = this._map;
        const tr = map.transform;
        const eventType = typeof event === 'string' ? event : event.type;
        if (eventType === 'move') {
            this._updateViewState(this.props, false);
        }
        if (eventType in cameraEvents) {
            if (typeof event === 'object') {
                event.viewState = transformToViewState(tr);
            }
            if (this._map.isMoving()) {
                // Replace map.transform with ours during the callbacks
                map.transform = this._renderTransform;
                baseFire.call(map, event, properties);
                map.transform = tr;
                return map;
            }
        }
        baseFire.call(map, event, properties);
        return map;
    }
    // All camera manipulations are complete, ready to repaint
    _onBeforeRepaint() {
        const map = this._map;
        // If there are camera changes driven by props, invoke camera events so that DOM controls are synced
        this._internalUpdate = true;
        for (const eventType in this._deferredEvents) {
            if (this._deferredEvents[eventType]) {
                map.fire(eventType);
            }
        }
        this._internalUpdate = false;
        const tr = this._map.transform;
        // Make sure camera matches the current props
        this._map.transform = this._renderTransform;
        this._onAfterRepaint = () => {
            // Restores camera state before render/load events are fired
            this._map.transform = tr;
        };
    }
}
Mapbox.savedMaps = [];
/**
 * Access token can be provided via one of:
 *   mapboxAccessToken prop
 *   access_token query parameter
 *   MapboxAccessToken environment variable
 *   REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
 * @returns access token
 */
function getAccessTokenFromEnv() {
    let accessToken = null;
    /* global location, process */
    if (typeof location !== 'undefined') {
        const match = /access_token=([^&\/]*)/.exec(location.search);
        accessToken = match && match[1];
    }
    // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
    try {
        accessToken = accessToken || ({"NODE_ENV":"production","PUBLIC_URL":"/mobile","APP_MANIFEST":{"name":"retool-mobile","slug":"retool-mobile","version":"1.0.0","scheme":"retoolmobile","platforms":["ios","android","web"],"web":{},"updates":{"enabled":false},"sdkVersion":"51.0.0"},"EXPO_DEBUG":false,"PLATFORM":"web","WDS_SOCKET_PATH":"/_expo/ws"}).MapboxAccessToken;
    }
    catch (_a) {
        // ignore
    }
    try {
        accessToken = accessToken || ({"NODE_ENV":"production","PUBLIC_URL":"/mobile","APP_MANIFEST":{"name":"retool-mobile","slug":"retool-mobile","version":"1.0.0","scheme":"retoolmobile","platforms":["ios","android","web"],"web":{},"updates":{"enabled":false},"sdkVersion":"51.0.0"},"EXPO_DEBUG":false,"PLATFORM":"web","WDS_SOCKET_PATH":"/_expo/ws"}).REACT_APP_MAPBOX_ACCESS_TOKEN;
    }
    catch (_b) {
        // ignore
    }
    return accessToken;
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/mapbox/create-ref.js
/** These methods may break the react binding if called directly */
const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance, mapLib) {
    if (!mapInstance) {
        return null;
    }
    const map = mapInstance.map;
    const result = {
        getMap: () => map,
        // Overwrite getters to use our shadow transform
        getCenter: () => mapInstance.transform.center,
        getZoom: () => mapInstance.transform.zoom,
        getBearing: () => mapInstance.transform.bearing,
        getPitch: () => mapInstance.transform.pitch,
        getPadding: () => mapInstance.transform.padding,
        getBounds: () => mapInstance.transform.getBounds(),
        project: (lnglat) => {
            return mapInstance.transform.locationPoint(mapLib.LngLat.convert(lnglat));
        },
        unproject: (point) => {
            return mapInstance.transform.pointLocation(mapLib.Point.convert(point));
        },
        queryTerrainElevation: (lnglat, options) => {
            // @ts-ignore transform not defined
            const tr = map.transform;
            // @ts-ignore transform not defined
            map.transform = mapInstance.transform;
            const result = map.queryTerrainElevation(lnglat, options);
            // @ts-ignore transform not defined
            map.transform = tr;
            return result;
        }
    };
    for (const key of getMethodNames(map)) {
        // @ts-expect-error
        if (!(key in result) && !skipMethods.includes(key)) {
            result[key] = map[key].bind(map);
        }
    }
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while (proto) {
        for (const key of Object.getOwnPropertyNames(proto)) {
            if (key[0] !== '_' &&
                typeof obj[key] === 'function' &&
                key !== 'fire' &&
                key !== 'setEventedParent') {
                result.add(key);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/use-isomorphic-layout-effect.js
// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? react.useLayoutEffect : react.useEffect;
/* harmony default export */ const use_isomorphic_layout_effect = (useIsomorphicLayoutEffect);

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/set-globals.js
const globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
function setGlobals(mapLib, props) {
    for (const key of globalSettings) {
        if (key in props) {
            mapLib[key] = props[key];
        }
    }
    if (props.RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(props.RTLTextPlugin, (error) => {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, false);
    }
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/map.js







const MapContext = react.createContext(null);
const defaultProps = {
    // Constraints
    minZoom: 0,
    maxZoom: 22,
    minPitch: 0,
    maxPitch: 60,
    // Interaction handlers
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
    touchPitch: true,
    // Style
    mapStyle: { version: 8, sources: {}, layers: [] },
    styleDiffing: true,
    projection: 'mercator',
    renderWorldCopies: true,
    // Callbacks
    onError: e => console.error(e.error),
    // Globals
    RTLTextPlugin: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
};
const Map = (0,react.forwardRef)((props, ref) => {
    const mountedMapsContext = (0,react.useContext)(MountedMapsContext);
    const [mapInstance, setMapInstance] = (0,react.useState)(null);
    const containerRef = (0,react.useRef)();
    const { current: contextValue } = (0,react.useRef)({ mapLib: null, map: null });
    (0,react.useEffect)(() => {
        const mapLib = props.mapLib;
        let isMounted = true;
        let mapbox;
        Promise.resolve(mapLib || __webpack_require__.e(/* import() */ 2360).then(__webpack_require__.t.bind(__webpack_require__, 152360, 23)))
            .then(mapboxgl => {
            if (!isMounted) {
                return;
            }
            if (!mapboxgl.Map) {
                // commonjs style
                mapboxgl = mapboxgl.default;
            }
            if (!mapboxgl || !mapboxgl.Map) {
                throw new Error('Invalid mapLib');
            }
            if (mapboxgl.supported(props)) {
                setGlobals(mapboxgl, props);
                if (props.reuseMaps) {
                    mapbox = Mapbox.reuse(props, containerRef.current);
                }
                if (!mapbox) {
                    mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
                }
                contextValue.map = createRef(mapbox, mapboxgl);
                contextValue.mapLib = mapboxgl;
                setMapInstance(mapbox);
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
            }
            else {
                throw new Error('Map is not supported by this browser');
            }
        })
            .catch(error => {
            props.onError({
                type: 'error',
                target: null,
                originalEvent: null,
                error
            });
        });
        return () => {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    use_isomorphic_layout_effect(() => {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    (0,react.useImperativeHandle)(ref, () => contextValue.map, [mapInstance]);
    const style = (0,react.useMemo)(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props.style
    }), [props.style]);
    return (react.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (react.createElement(MapContext.Provider, { value: contextValue },
        react.createElement("div", { "mapboxgl-children": "" }, props.children)))));
});
Map.displayName = 'Map';
Map.defaultProps = defaultProps;
/* harmony default export */ const map = (Map);

// EXTERNAL MODULE: ../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js
var react_dom = __webpack_require__(657640);
;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) {
        return;
    }
    const style = element.style;
    for (const key in styles) {
        const value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) {
            style[key] = `${value}px`;
        }
        else {
            style[key] = value;
        }
    }
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/marker.js
/* global document */






const marker_defaultProps = {
    draggable: false,
    popup: null,
    rotation: 0,
    rotationAlignment: 'auto',
    pitchAlignment: 'auto'
};
/* eslint-disable complexity,max-statements */
function Marker(props) {
    const { map, mapLib } = (0,react.useContext)(MapContext);
    const thisRef = (0,react.useRef)({ props });
    thisRef.current.props = props;
    const marker = (0,react.useMemo)(() => {
        let hasChildren = false;
        react.Children.forEach(props.children, el => {
            if (el) {
                hasChildren = true;
            }
        });
        const options = {
            ...props,
            element: hasChildren ? document.createElement('div') : null
        };
        const mk = new mapLib.Marker(options).setLngLat([props.longitude, props.latitude]);
        mk.getElement().addEventListener('click', (e) => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('drag', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('dragend', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        return mk;
    }, []);
    (0,react.useEffect)(() => {
        marker.addTo(map.getMap());
        return () => {
            marker.remove();
        };
    }, []);
    (0,react.useEffect)(() => {
        applyReactStyle(marker.getElement(), props.style);
    }, [props.style]);
    if (marker.getLngLat().lng !== props.longitude || marker.getLngLat().lat !== props.latitude) {
        marker.setLngLat([props.longitude, props.latitude]);
    }
    if (props.offset && !arePointsEqual(marker.getOffset(), props.offset)) {
        marker.setOffset(props.offset);
    }
    if (marker.isDraggable() !== props.draggable) {
        marker.setDraggable(props.draggable);
    }
    if (marker.getRotation() !== props.rotation) {
        marker.setRotation(props.rotation);
    }
    if (marker.getRotationAlignment() !== props.rotationAlignment) {
        marker.setRotationAlignment(props.rotationAlignment);
    }
    if (marker.getPitchAlignment() !== props.pitchAlignment) {
        marker.setPitchAlignment(props.pitchAlignment);
    }
    if (marker.getPopup() !== props.popup) {
        marker.setPopup(props.popup);
    }
    return (0,react_dom.createPortal)(props.children, marker.getElement());
}
Marker.defaultProps = marker_defaultProps;
// @ts-ignore
/* harmony default export */ const marker = (react.memo(Marker));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/popup.js
/* global document */






// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */
function Popup(props) {
    const { map, mapLib } = (0,react.useContext)(MapContext);
    const container = (0,react.useMemo)(() => {
        return document.createElement('div');
    }, []);
    const thisRef = (0,react.useRef)({ props });
    thisRef.current.props = props;
    const popup = (0,react.useMemo)(() => {
        const options = { ...props };
        const pp = new mapLib.Popup(options).setLngLat([props.longitude, props.latitude]);
        pp.once('open', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return pp;
    }, []);
    (0,react.useEffect)(() => {
        const onClose = e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        popup.on('close', onClose);
        popup.setDOMContent(container).addTo(map.getMap());
        return () => {
            // https://github.com/visgl/react-map-gl/issues/1825
            // onClose should not be fired if the popup is removed by unmounting
            // When using React strict mode, the component is mounted twice.
            // Firing the onClose callback here would be a false signal to remove the component.
            popup.off('close', onClose);
            if (popup.isOpen()) {
                popup.remove();
            }
        };
    }, []);
    (0,react.useEffect)(() => {
        applyReactStyle(popup.getElement(), props.style);
    }, [props.style]);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([props.longitude, props.latitude]);
        }
        // @ts-ignore
        if (props.offset && !deepEqual(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        // @ts-ignore
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            // @ts-ignore
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        // @ts-ignore
        if (popup.options.className !== props.className) {
            // @ts-ignore
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList) {
                if (!nextClassList.has(c)) {
                    popup.removeClassName(c);
                }
            }
            for (const c of nextClassList) {
                if (!prevClassList.has(c)) {
                    popup.addClassName(c);
                }
            }
            // @ts-ignore
            popup.options.className = props.className;
        }
    }
    return (0,react_dom.createPortal)(props.children, container);
}
// @ts-ignore
/* harmony default export */ const popup = (react.memo(Popup));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/use-control.js


function useControl(onCreate, arg1, arg2, arg3) {
    const context = (0,react.useContext)(MapContext);
    const ctrl = (0,react.useMemo)(() => onCreate(context), []);
    (0,react.useEffect)(() => {
        const opts = (arg3 || arg2 || arg1);
        const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
        const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
        const { map } = context;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, opts === null || opts === void 0 ? void 0 : opts.position);
            if (onAdd) {
                onAdd(context);
            }
        }
        return () => {
            if (onRemove) {
                onRemove(context);
            }
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) {
                map.removeControl(ctrl);
            }
        };
    }, []);
    return ctrl;
}
/* harmony default export */ const use_control = (useControl);

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/attribution-control.js




function AttributionControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.AttributionControl(props), {
        position: props.position
    });
    (0,react.useEffect)(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ const attribution_control = (react.memo(AttributionControl));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/fullscreen-control.js
/* global document */




function FullscreenControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
    }), { position: props.position });
    (0,react.useEffect)(() => {
        // @ts-ignore
        applyReactStyle(ctrl._controlContainer, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ const fullscreen_control = (react.memo(FullscreenControl));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/geolocate-control.js




const GeolocateControl = (0,react.forwardRef)((props, ref) => {
    const thisRef = (0,react.useRef)({ props });
    const ctrl = use_control(({ mapLib }) => {
        const gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        const setupUI = gc._setupUI;
        gc._setupUI = args => {
            if (!gc._container.hasChildNodes()) {
                setupUI(args);
            }
        };
        gc.on('geolocate', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onGeolocate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('error', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('outofmaxbounds', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOutOfMaxBounds) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationstart', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationStart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationend', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    (0,react.useImperativeHandle)(ref, () => ({
        trigger: () => ctrl.trigger()
    }), []);
    (0,react.useEffect)(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
});
GeolocateControl.displayName = 'GeolocateControl';
/* harmony default export */ const geolocate_control = (react.memo(GeolocateControl));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/navigation-control.js




function NavigationControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.NavigationControl(props), {
        position: props.position
    });
    (0,react.useEffect)(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ const navigation_control = (react.memo(NavigationControl));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/scale-control.js




const scale_control_defaultProps = {
    unit: 'metric',
    maxWidth: 100
};
function ScaleControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.ScaleControl(props), {
        position: props.position
    });
    // @ts-ignore
    if (ctrl.options.unit !== props.unit || ctrl.options.maxWidth !== props.maxWidth) {
        // @ts-ignore
        ctrl.options.maxWidth = props.maxWidth;
        // This method will trigger an update
        ctrl.setUnit(props.unit);
    }
    (0,react.useEffect)(() => {
        // @ts-ignore
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
ScaleControl.defaultProps = scale_control_defaultProps;
/* harmony default export */ const scale_control = (react.memo(ScaleControl));

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/utils/assert.js
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/source.js






let sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        const options = { ...props };
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */
function updateSource(source, props, prevProps) {
    assert(props.id === prevProps.id, 'source id changed');
    assert(props.type === prevProps.type, 'source type changed');
    let changedKey = '';
    let changedKeyCount = 0;
    for (const key in props) {
        if (key !== 'children' && key !== 'id' && !deepEqual(prevProps[key], props[key])) {
            changedKey = key;
            changedKeyCount++;
        }
    }
    if (!changedKeyCount) {
        return;
    }
    const type = props.type;
    if (type === 'geojson') {
        source.setData(props.data);
    }
    else if (type === 'image') {
        source.updateImage({ url: props.url, coordinates: props.coordinates });
    }
    else if ((type === 'canvas' || type === 'video') &&
        changedKeyCount === 1 &&
        changedKey === 'coordinates') {
        source.setCoordinates(props.coordinates);
    }
    else if (type === 'vector' && 'setUrl' in source) {
        // Added in 1.12.0:
        // vectorTileSource.setTiles
        // vectorTileSource.setUrl
        switch (changedKey) {
            case 'url':
                source.setUrl(props.url);
                break;
            case 'tiles':
                source.setTiles(props.tiles);
                break;
            default:
        }
    }
    else {
        // eslint-disable-next-line
        console.warn(`Unable to update <Source> prop: ${changedKey}`);
    }
}
/* eslint-enable complexity */
function Source(props) {
    const map = (0,react.useContext)(MapContext).map.getMap();
    const propsRef = (0,react.useRef)(props);
    const [, setStyleLoaded] = (0,react.useState)(0);
    const id = (0,react.useMemo)(() => props.id || `jsx-source-${sourceCounter++}`, []);
    (0,react.useEffect)(() => {
        if (map) {
            const forceUpdate = () => setTimeout(() => setStyleLoaded(version => version + 1), 0);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return () => {
                var _a;
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getSource(id)) {
                    // Parent effects are destroyed before child ones, see
                    // https://github.com/facebook/react/issues/16728
                    // Source can only be removed after all child layers are removed
                    const allLayers = (_a = map.getStyle()) === null || _a === void 0 ? void 0 : _a.layers;
                    if (allLayers) {
                        for (const layer of allLayers) {
                            // @ts-ignore (2339) source does not exist on all layer types
                            if (layer.source === id) {
                                map.removeLayer(layer.id);
                            }
                        }
                    }
                    map.removeSource(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    let source = map && map.style && map.getSource(id);
    if (source) {
        updateSource(source, props, propsRef.current);
    }
    else {
        source = createSource(map, id, props);
    }
    propsRef.current = props;
    return ((source &&
        react.Children.map(props.children, child => child &&
            (0,react.cloneElement)(child, {
                source: id
            }))) ||
        null);
}
/* harmony default export */ const source = (Source);

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/components/layer.js




/* eslint-disable complexity, max-statements */
function updateLayer(map, id, props, prevProps) {
    assert(props.id === prevProps.id, 'layer id changed');
    assert(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    const { layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for (const key in layout) {
            if (!deepEqual(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for (const key in prevLayout) {
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for (const key in paint) {
            if (!deepEqual(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for (const key in prevPaint) {
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    if (!deepEqual(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = { ...props, id };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */
let layerCounter = 0;
function Layer(props) {
    const map = (0,react.useContext)(MapContext).map.getMap();
    const propsRef = (0,react.useRef)(props);
    const [, setStyleLoaded] = (0,react.useState)(0);
    const id = (0,react.useMemo)(() => props.id || `jsx-layer-${layerCounter++}`, []);
    (0,react.useEffect)(() => {
        if (map) {
            const forceUpdate = () => setStyleLoaded(version => version + 1);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return () => {
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getLayer(id)) {
                    map.removeLayer(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        }
        catch (error) {
            console.warn(error); // eslint-disable-line
        }
    }
    else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
}
/* harmony default export */ const components_layer = (Layer);

;// CONCATENATED MODULE: ../node_modules/.pnpm/react-map-gl@7.0.21_mapbox-gl@2.12.1_react@18.3.1/node_modules/react-map-gl/dist/esm/index.js













// Types


// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/Pressable/index.js + 4 modules
var Pressable = __webpack_require__(770665);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/StyleSheet/index.js + 5 modules
var StyleSheet = __webpack_require__(460648);
// EXTERNAL MODULE: ../node_modules/.pnpm/react-native-web@0.19.10_encoding@0.1.13_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-native-web/dist/exports/View/index.js
var View = __webpack_require__(130486);
;// CONCATENATED MODULE: ../frontend/src/components/plugins/widgets/Map/utils.ts
const MAPBOX_API_ACCESS_TOKEN='pk.eyJ1IjoicmV0b29sIiwiYSI6ImNqOW9yNHB1MzU3aXIyd2xnbWMxa3dmM3YifQ.6MrUIlL1bxlN35r9eGblSA';
// EXTERNAL MODULE: ./src/localization/index.ts + 5 modules
var localization = __webpack_require__(373355);
// EXTERNAL MODULE: ./src/components/design-system/Text.tsx
var Text = __webpack_require__(790046);
;// CONCATENATED MODULE: ../node_modules/.pnpm/mapbox-gl@2.12.1/node_modules/mapbox-gl/dist/mapbox-gl.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const mapbox_gl = ({});
// EXTERNAL MODULE: ../node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(453175);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Map/Map.native-web.tsx
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}const LocationFilled=(__webpack_require__(380633)["default"]);const LocationOutline=(__webpack_require__(233092)["default"]);const styles=StyleSheet["default"].create({container:{width:'100%',justifyContent:'flex-start'},locationContainer:{overflow:'hidden',position:'absolute',alignSelf:'flex-end',right:10,top:10,zIndex:1,width:42,height:42,borderRadius:1000,justifyContent:'center',alignItems:'center',shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.25,shadowRadius:4,elevation:5},textHint:{backgroundColor:'#efebeb',zIndex:1,alignSelf:'center',position:'absolute',borderRadius:5,margin:10,padding:5}});const MapComponent=({latitude,longitude,points,onPointPressed,mapStyle,aspectRatio,geoJson,geoJsonLayerStyle,zoom})=>{const[viewState,setViewState]=(0,react.useState)({latitude,longitude,zoom});(0,react.useEffect)(()=>{setViewState({zoom,latitude,longitude});},[latitude,longitude,zoom]);const[pressed,setPressed]=(0,react.useState)(false);const[isLocatingUser,setIsLocatingUser]=(0,react.useState)(false);const geolocateControlRef=(0,react.useRef)(null);const key=(0,react.useMemo)(()=>{return`${aspectRatio}`;},[aspectRatio]);return (0,jsx_runtime.jsxs)(View["default"],{style:[styles.container,{aspectRatio}],children:[(0,jsx_runtime.jsxs)(map,_objectSpread(_objectSpread({},viewState),{},{onMove:evt=>setViewState(evt.viewState),mapStyle:mapStyle,mapboxAccessToken:MAPBOX_API_ACCESS_TOKEN,children:[(0,jsx_runtime.jsx)(geolocate_control,{showUserLocation:true,position:"top-right",ref:geolocateControlRef,onGeolocate:()=>{setIsLocatingUser(false);},onError:()=>{setIsLocatingUser(false);},style:{display:'none'}}),points.map((point,index)=>{var _point$color$trim,_point$color;return (0,jsx_runtime.jsx)(marker,{longitude:point.longitude,latitude:point.latitude,onClick:()=>onPointPressed(point),color:(_point$color$trim=(_point$color=point.color)===null||_point$color===void 0?void 0:_point$color.trim())!==null&&_point$color$trim!==void 0?_point$color$trim:'red'},`marker-${index}`);}),geoJson?(0,jsx_runtime.jsx)(source,{id:"geojson-layer",type:"geojson",data:geoJson,children:(0,jsx_runtime.jsx)(components_layer,{id:'fill-layer',type:'fill',paint:geoJsonLayerStyle})}):null]}),key),(0,jsx_runtime.jsx)(Pressable["default"],{onPressIn:()=>{setPressed(true);},onPressOut:()=>{var _geolocateControlRef$;(_geolocateControlRef$=geolocateControlRef.current)===null||_geolocateControlRef$===void 0?void 0:_geolocateControlRef$.trigger();setIsLocatingUser(true);setPressed(false);},disabled:isLocatingUser,style:[styles.locationContainer,{backgroundColor:isLocatingUser?'#efebeb':'#fff'}],children:pressed?(0,jsx_runtime.jsx)(LocationFilled,{color:"#1a73e7"}):(0,jsx_runtime.jsx)(LocationOutline,{})}),isLocatingUser?(0,jsx_runtime.jsx)(View["default"],{style:styles.textHint,children:(0,jsx_runtime.jsx)(Text["default"],{size:"large",value:(0,localization.localizedString)('Retrieving user location...')})}):null]});};/* harmony default export */ const Map_native_web = (MapComponent);
;// CONCATENATED MODULE: ./src/components/plugins/widgets/Map/MapWidget.tsx
const _excluded=["latitude","longitude","points","selectedPoint","aspectRatio","mapStyle","geoJson","geoJsonLayerStyle","onPointPressed","updateModel"];function MapWidget_ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function MapWidget_objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?MapWidget_ownKeys(Object(t),!0).forEach(function(r){(0,defineProperty["default"])(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):MapWidget_ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}/* harmony default export */ const MapWidget = ((0,connectMobileWidget["default"])(widgetRuntimeOptions.typeKey,Map_native_web,widgetRuntimeOptions,Map_options,_ref=>{let{latitude:_latitude,longitude:_longitude,points:_points,selectedPoint:_selectedPoint,aspectRatio:_aspectRatio,mapStyle:_mapStyle,geoJson:_geoJson,geoJsonLayerStyle={},onPointPressed,updateModel}=_ref,rest=(0,objectWithoutProperties["default"])(_ref,_excluded);const mapStyle=typeof _mapStyle==='string'&&_mapStyle.trim()!==''?_mapStyle:'mapbox://styles/mapbox/streets-v12';const aspectRatio=typeof _aspectRatio==='number'?_aspectRatio:1;const points=parsePoints(_points);const selectedPoint=_selectedPoint||{};const geoJson=_geoJson||undefined;const latitude=typeof _latitude==='number'?_latitude:37.7577;const longitude=typeof _longitude==='number'?_longitude:-122.4376;return MapWidget_objectSpread({latitude,longitude,points:parsePoints(points),mapStyle,selectedPoint:selectedPoint,onPointPressed:selectedPoint=>{updateModel({selectedPoint});onPointPressed===null||onPointPressed===void 0?void 0:onPointPressed();},aspectRatio,geoJson:geoJson,geoJsonLayerStyle},rest);}));const parsePoints=points=>{if(!points)return[];return points.filter(point=>point.latitude&&point.longitude).map(point=>MapWidget_objectSpread(MapWidget_objectSpread({},point),{},{latitude:parseFloat(point.latitude),longitude:parseFloat(point.longitude)}));};

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
//# sourceMappingURL=1568.f5ec66aa.chunk.js.map