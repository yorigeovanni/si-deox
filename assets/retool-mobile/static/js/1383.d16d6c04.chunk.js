(self["webpackChunkwebpack_mobile"] = self["webpackChunkwebpack_mobile"] || []).push([[1383],{

/***/ 161383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  buildAnalyticsInstance: () => (/* binding */ buildAnalyticsInstance)
});

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+google-analytics@1.0.5/node_modules/@analytics/google-analytics/lib/analytics-plugin-ga.browser.es.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global, window */
var loadedInstances = {};
/* Location of gtag script */

var gtagScriptSource = 'https://www.googletagmanager.com/gtag/js'; // See https://developers.google.com/analytics/devguides/collection/ga4/reference/config

var defaultGtagConf = {
  // https://support.google.com/analytics/answer/7201382?hl=en#zippy=%2Cglobal-site-tag-websites
  debug_mode: false,

  /**
   * Disable automatic sending of page views, instead let analytics.page() do this
   * https://developers.google.com/analytics/devguides/collection/gtagjs
   */
  send_page_view: false,
  // https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization
  anonymize_ip: false,

  /**
   * Disable All Advertising
   * https://developers.google.com/analytics/devguides/collection/ga4/display-features#disable_all_advertising_features
   */
  allow_google_signals: true,

  /**
   * Disable Advertising Personalization
   * https://developers.google.com/analytics/devguides/collection/ga4/display-features#disable_advertising_personalization
   */
  allow_ad_personalization_signals: true,

  /**
   * https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#configure_cookie_field_settings
   */
  // cookie_domain: 'auto',
  // cookie_expires
  // cookie_prefix
  // cookie_update
  // cookie_flags

  /**
   * Cookie Flags
   * https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id#cookie_flags
   */
  cookie_flags: ''
};
var defaultConfig = {
  gtagName: 'gtag',
  dataLayerName: 'ga4DataLayer',
  measurementIds: [],
  gtagConfig: defaultGtagConf
};
/**
 * Google analytics plugin
 * @link https://getanalytics.io/plugins/google-analytics/
 * @link https://analytics.google.com/analytics/web/
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs
 * @param {object}  pluginConfig - Plugin settings
 * @param {string[]} pluginConfig.measurementIds - Google Analytics MEASUREMENT IDs
 * @param {boolean} [pluginConfig.debug] - Enable Google Analytics debug mode
 * @param {string}  [pluginConfig.dataLayerName=ga4DataLayer] - The optional name for dataLayer object. Defaults to ga4DataLayer.
 * @param {string}  [pluginConfig.gtagName=gtag] - The optional name for dataLayer object. Defaults to `gtag`.
 * @param {boolean} [pluginConfig.gtagConfig.anonymize_ip] - Enable [Anonymizing IP addresses](https://bit.ly/3c660Rd) sent to Google Analytics.
 * @param {object}  [pluginConfig.gtagConfig.cookie_domain] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {object}  [pluginConfig.gtagConfig.cookie_expires] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {object}  [pluginConfig.gtagConfig.cookie_prefix] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {object}  [pluginConfig.gtagConfig.cookie_update] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {object}  [pluginConfig.gtagConfig.cookie_flags] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {string}  [pluginConfig.customScriptSrc] - Custom URL for google analytics script, if proxying calls
 * @return {*}
 * @example
 *
 * googleAnalytics({
 *   measurementIds: ['UA-1234567']
 * })
 */

function googleAnalytics() {
  var pluginConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pageCallCount = 0;
  var measurementIds = getIds(pluginConfig.measurementIds);

  var initConfig = _objectSpread(_objectSpread({}, defaultConfig), pluginConfig);

  return {
    name: 'google-analytics',
    config: initConfig,
    // Load gtag.js and define gtag
    initialize: function initialize(_ref) {
      var config = _ref.config,
          instance = _ref.instance;
      var dataLayerName = config.dataLayerName,
          customScriptSrc = config.customScriptSrc,
          gtagName = config.gtagName,
          gtagConfig = config.gtagConfig,
          debug = config.debug;
      /* Inject google gtag.js script if not found */

      /* If other gtags are loaded already, add ours anyway */

      var customLayerName = dataLayerName ? "&l=".concat(dataLayerName) : "";
      var src = customScriptSrc || "".concat(gtagScriptSource, "?id=").concat(measurementIds[0]).concat(customLayerName);

      if (!scriptLoaded(src)) {
        var script = document.createElement('script');
        script.async = true;
        script.src = src;
        document.body.appendChild(script);
      }
      /* Set gtag and datalayer */


      if (!window[dataLayerName]) {
        window[dataLayerName] = window[dataLayerName] || [];

        window[gtagName] = function () {
          window[dataLayerName].push(arguments);
        };

        window[gtagName]('js', new Date());
      } // Initialize tracker instances on page


      var gtagConf = _objectSpread(_objectSpread({}, defaultGtagConf), gtagConfig ? gtagConfig : {}); // You must explicitly delete the debug_mode parameter or all sessions will fire in debug more. Setting it false is not enough.
      // https://support.google.com/analytics/answer/7201382?hl=en&ref_topic=9303319#zippy=%2Cgoogle-tag-websites:~:text=To%20disable%20debug%20mode%2C%20exclude%20the%20%27debug_mode%27%20parameter%3B%20setting%20the%20parameter%20to%20false%20doesn%27t%20disable%20debug%20mode.


      if (debug === true) {
        gtagConf.debug_mode = true;
      } else {
        delete gtagConf.debug_mode;
      }
      /* set custom dimensions from user traits */


      var user = instance.user() || {};
      var traits = user.traits || {};

      if (Object.keys(traits).length) {
        window[gtagName]('set', 'user_properties', traits);
      }
      /* Initialize all measurementIds */


      for (var i = 0; i < measurementIds.length; i++) {
        if (!loadedInstances[measurementIds[i]]) {
          window[gtagName]('config', measurementIds[i], gtagConf);
          loadedInstances[measurementIds[i]] = true;
        }
      }
    },
    // Set parameter scope at user level with 'set' method
    identify: function identify(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config;
      var gtagName = config.gtagName;
      if (!window[gtagName] || !measurementIds.length) return;

      if (payload.userId) {
        // https://developers.google.com/analytics/devguides/collection/ga4/user-id?platform=websites#send_user_ids
        window[gtagName]('set', {
          user_id: payload.userId
        }); // console.log('Set userid', payload.userId)
      } // TODO verify this
      // https://developers.google.com/analytics/devguides/collection/ga4/user-properties?technology=websites


      if (Object.keys(payload.traits).length) {
        /* gtag('set', 'user_properties', {
          favorite_composer: 'Mahler',
          favorite_instrument: 'double bass',
          season_ticketholder: 'true'
        }) */
        window[gtagName]('set', 'user_properties', payload.traits); // console.log('Set userprops', payload.traits)
      }
    },
    // Set parameter scope at page level with 'config' method
    page: function page(_ref3) {
      var payload = _ref3.payload,
          config = _ref3.config,
          instance = _ref3.instance;
      var gtagName = config.gtagName,
          gtagConfig = config.gtagConfig;
      if (!window[gtagName] || !measurementIds.length) return;
      var properties = payload.properties;
      var send_to = properties.send_to;
      var campaign = instance.getState('context.campaign'); // console.log('ga page properties', properties)

      /* Create pageview-related properties */

      var pageView = {
        page_title: properties.title,
        page_location: properties.url,
        page_path: properties.path || document.location.pathname,
        page_hash: properties.hash,
        page_search: properties.page_search,
        page_referrer: properties.referrer
      };
      var campaignData = addCampaignData(campaign);

      var finalPayload = _objectSpread(_objectSpread(_objectSpread({}, send_to ? {
        send_to: send_to
      } : {}), pageView), campaignData);
      /* If send_page_view true, ignore first analytics.page call */


      if (gtagConfig && gtagConfig.send_page_view && pageCallCount === 0) {
        pageCallCount++; // console.log('ignore first pageCallCount', pageCallCount)

        return;
      } // console.log('Send page_view payload', finalPayload)


      window[gtagName]('event', 'page_view', finalPayload); // Set after initial page view

      pageCallCount++;
    },
    // Set parameter scope at event level with 'event' method
    track: function track(_ref4) {
      var payload = _ref4.payload,
          config = _ref4.config,
          instance = _ref4.instance;
      var properties = payload.properties,
          event = payload.event;
      var campaign = instance.getState('context.campaign');
      var gtagName = config.gtagName;
      if (!window[gtagName] || !measurementIds.length) return;
      /* Attach campaign data */

      var campaignData = addCampaignData(campaign); // Limits https://support.google.com/analytics/answer/9267744

      var finalPayload = _objectSpread(_objectSpread({}, properties), campaignData);
      /*
        console.log('finalPayload', finalPayload)
        console.log('event', event)
      */

      /* Send data to Google Analytics
        Signature gtag('event', '<event_name>', {
          <event_params>key: value,
        })
      */


      window[gtagName]('event', event, finalPayload);
    },

    /* Verify gtag loaded and ready to use */
    loaded: function loaded() {
      var dataLayerName = initConfig.dataLayerName,
          customScriptSrc = initConfig.customScriptSrc;
      var hasDataLayer = dataLayerName && window[dataLayerName] && Array.prototype.push === window[dataLayerName].push;
      return scriptLoaded(customScriptSrc || gtagScriptSource) && hasDataLayer;
    },

    /* Custom methods */
    methods: {
      addTag: function addTag(tagId) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        // https://developers.google.com/tag-platform/devguides/install-gtagjs#add_products_to_your_tag
        if (window[initConfig.gtagName]) {
          window[initConfig.gtagName]('config', tagId, settings); // Add tag id

          if (measurementIds && !measurementIds.includes(tagId)) {
            measurementIds = measurementIds.concat(tagId);
          }
        }
      },

      /* Disable gtag for user */
      disable: function disable(ids) {
        var gaIds = ids ? getIds(ids) : measurementIds;

        for (var i = 0; i < measurementIds.length; i++) {
          var gaId = measurementIds[i];

          if (gaIds.includes(gaId)) {
            // https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
            window["ga-disable-".concat(gaId)] = true;
          }
        }
      },

      /* Enable gtag for user */
      enable: function enable(ids) {
        var gaIds = ids ? getIds(ids) : measurementIds;

        for (var i = 0; i < measurementIds.length; i++) {
          var gaId = measurementIds[i];

          if (gaIds.includes(gaId)) {
            // https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
            window["ga-disable-".concat(gaId)] = false;
          }
        }
      }
    }
  };
}

function getIds(measurementIds) {
  if (!measurementIds) throw new Error('No GA Measurement ID defined');

  if (Array.isArray(measurementIds)) {
    return measurementIds;
  }

  if (typeof measurementIds === 'string') {
    return [measurementIds];
  }

  throw new Error('GA Measurement ID must be string or array of strings');
}
/**
 * Add campaign data to GA payload https://bit.ly/34qFCPn
 * @param {Object} [campaignData={}] [description]
 * @param {String} [campaignData.campaignName] - Name of campaign
 * @param {String} [campaignData.campaignSource] - Source of campaign
 * @param {String} [campaignData.campaignMedium] - Medium of campaign
 * @param {String} [campaignData.campaignContent] - Content of campaign
 * @param {String} [campaignData.campaignKeyword] - Keyword of campaign
 */


function addCampaignData() {
  var campaignData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var campaign = {};
  var id = campaignData.id,
      name = campaignData.name,
      source = campaignData.source,
      medium = campaignData.medium,
      content = campaignData.content,
      keyword = campaignData.keyword;
  if (id) campaign.campaignId = id;
  if (name) campaign.campaignName = name;
  if (source) campaign.campaignSource = source;
  if (medium) campaign.campaignMedium = medium;
  if (content) campaign.campaignContent = content;
  if (keyword) campaign.campaignKeyword = keyword;
  return campaign;
}

function scriptLoaded(scriptSrc) {
  var scripts = document.querySelectorAll('script[src]');
  var regex = new RegExp("^".concat(scriptSrc));
  return Boolean(Object.values(scripts).filter(function (value) {
    return regex.test(value.src);
  }).length);
}

/* This module will shake out unused code + work in browser and node 🎉 */

var index = googleAnalytics ;
/* init for CDN usage. globalName.init() */

var init = googleAnalytics ;



// EXTERNAL MODULE: ../node_modules/.pnpm/dlv@1.1.3/node_modules/dlv/dist/dlv.umd.js
var dlv_umd = __webpack_require__(457999);
var dlv_umd_default = /*#__PURE__*/__webpack_require__.n(dlv_umd);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+type-utils@0.6.2/node_modules/@analytics/type-utils/dist/analytics-util-types.module.js
var n="function",t="string",analytics_util_types_module_e="undefined",r="boolean",o="object",u="array",i="number",c="symbol",a="null",f="error",s="typeError",l="syntaxError",d="asyncFunction",p="generatorFunction",y="asyncGeneratorFunction",g=function(){},b="any",m="*",v="none",h="hidden",j="__",O="form",S="input",A="button",E="select",N="change",w="submit",D=/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/,z=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Z=/^\{[\s\S]*\}$|^\[[\s\S]*\]$/,F="undefined"!=typeof process?process:{},P=F.env&&F.env.NODE_ENV||"",x="production"===P,C="staging"===P,L="development"===P,$="undefined"!=typeof document,T=$&&"localhost"===window.location.hostname,_=null!=F.versions&&null!=F.versions.node,k="undefined"!=typeof Deno&&void 0!==Deno.core,B="object"==typeof self&&self.constructor&&"DedicatedWorkerGlobalScope"===self.constructor.name,G=$&&"nodejs"===window.name||"undefined"!=typeof navigator&&void 0!==navigator.userAgent&&(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom"));function M(n,t){return t.charAt(0)[n]()+t.slice(1)}var U=M.bind(null,"toUpperCase"),H=M.bind(null,"toLowerCase");function J(n){return Y(n)?U("null"):"object"==typeof n?yn(n):Object.prototype.toString.call(n).slice(8,-1)}function R(n,t){void 0===t&&(t=!0);var e=J(n);return t?H(e):e}function V(n,t){return typeof t===n}var analytics_util_types_module_W=V.bind(null,"function"),q=V.bind(null,"string"),I=V.bind(null,"undefined");function K(n){return!I(n)}var Q=V.bind(null,"boolean"),X=V.bind(null,"symbol");function Y(n){return null===n}function nn(n){return"number"===R(n)&&!isNaN(n)}function tn(n){return!isNaN(parseFloat(n))}function en(n){return!!analytics_util_types_module_W(n)&&/^class /.test(Function.prototype.toString.call(n))}function rn(n){return"array"===R(n)}function on(n){if(!un(n))return!1;for(var t=n;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(n)===t}function un(n){return n&&("object"==typeof n||null!==n)}function cn(n){if(!q(n)||!Z.test(n))return!1;try{JSON.parse(n)}catch(n){return!1}return!0}function an(n){if(Y(n))return!0;switch(typeof n){case"string":case"number":case"symbol":case"undefined":case"boolean":return!0;default:return!1}}function fn(n,t){return on(n)&&analytics_util_types_module_W(n[t])}function sn(n){return!!n&&!!(!I(Promise)&&n instanceof Promise||n.then&&analytics_util_types_module_W(n.then))}function ln(n){return un(n)&&analytics_util_types_module_W(n.throw)&&analytics_util_types_module_W(n.return)&&analytics_util_types_module_W(n.next)}function dn(n){return"generatorFunction"===R(n)}function pn(n){return"asyncFunction"===R(n)}function yn(n){return analytics_util_types_module_W(n.constructor)?n.constructor.name:null}function gn(n){return n instanceof Set}function bn(n){return n instanceof Map}function mn(n){return n instanceof RegExp}function vn(n){return!(!n.constructor||!analytics_util_types_module_W(n.constructor.isBuffer))&&n.constructor.isBuffer(n)}function hn(n){return n instanceof Error||q(n.message)&&n.constructor&&nn(n.constructor.stackTraceLimit)}function jn(n){return un(n)&&q(n.message)&&q(n.name)}function On(n,t){if("object"!=typeof t||Y(t))return!1;if(t instanceof n)return!0;var e=R(new n(""));if(hn(t))for(;t;){if(R(t)===e)return!0;t=Object.getPrototypeOf(t)}return!1}var Sn=On.bind(null,TypeError),An=On.bind(null,SyntaxError);function En(n){if(!analytics_util_types_module_W(n))return!1;var t=/{(\r|\n|\s)*}/gm,e=g+"";return e===(n.toString().match(t)||[""])[0].replace(t,e)}function Nn(n){try{if(nn(n.length)&&analytics_util_types_module_W(n.callee))return!0}catch(n){if(-1!==n.message.indexOf("callee"))return!0}return!1}function wn(n){return!(q(n)&&"false"===n.toLowerCase()||!n)}function Dn(n){return!n}function zn(n){return!0===n}function Zn(n){return!1===n}function Fn(n){return!(n.length>320)&&z.test(n)}function Pn(n){return n instanceof Date||analytics_util_types_module_W(n.toDateString)&&analytics_util_types_module_W(n.getDate)&&analytics_util_types_module_W(n.setDate)}function xn(n){return D.test(n)}function Cn(n){return!(!Y(n)&&(rn(n)?n.length:gn(n)||bn(n)?n.size:on(n)&&Object.keys(n).length))}function Ln(n){return NodeList.prototype.isPrototypeOf(n)}function $n(n,t){var e=n instanceof Element||n instanceof HTMLDocument;return e&&t?Tn(n,t):e}function Tn(n,t){return void 0===t&&(t=""),n&&n.nodeName===t.toUpperCase()}function _n(n){var t=[].slice.call(arguments,1);return function(){return n.apply(void 0,[].slice.call(arguments).concat(t))}}var kn=_n($n,"form"),Bn=_n($n,"button"),Gn=_n($n,"input"),Mn=_n($n,"select");function Un(n,t){if(!n||"hidden"===getComputedStyle(n).visibility)return!0;for(;n;){if(null!=t&&n===t)return!1;if("none"===getComputedStyle(n).display)return!0;n=n.parentElement}return!1}function Hn(n){return n?rn(n)?n:[n]:[]}

;// CONCATENATED MODULE: ../node_modules/.pnpm/analytics-utils@1.0.10_@types+dlv@1.1.4/node_modules/analytics-utils/dist/analytics-utils.module.js
function analytics_utils_module_n(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function analytics_utils_module_o(){if($){var r=navigator,t=r.languages;return r.userLanguage||(t&&t.length?t[0]:r.language)}}function analytics_utils_module_a(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}}function analytics_utils_module_i(r){if(!$)return!1;var t=r||document.referrer;if(t){var n=window.document.location.port,o=t.split("/")[2];return n&&(o=o.replace(":"+n,"")),o!==window.location.hostname}return!1}function analytics_utils_module_u(n){if(!$)return!0;var o=document.getElementsByTagName("script");return!!Object.keys(o).filter(function(e){var a=o[e].src;return q(n)?-1!==a.indexOf(n):!!mn(n)&&a.match(n)}).length}function analytics_utils_module_c(e,r){var t=(e.split("?")||[,])[1];if(!t||-1===t.indexOf(r))return e;var n=new RegExp("(\\&|\\?)"+r+'([_A-Za-z0-9"+=.\\/\\-@%]+)',"g"),o=("?"+t).replace(n,"").replace(/^&/,"?");return e.replace("?"+t,o)}function analytics_utils_module_l(e,r){return analytics_utils_module_n((RegExp(e+"=(.+?)(&|$)").exec(r)||[,""])[1])}function analytics_utils_module_s(r){return function(e){for(var r,t=Object.create(null),o=/([^&=]+)=?([^&]*)/g;r=o.exec(e);){var a=analytics_utils_module_n(r[1]),i=analytics_utils_module_n(r[2]);"[]"===a.substring(a.length-2)?(t[a=a.substring(0,a.length-2)]||(t[a]=[])).push(i):t[a]=""===i||i}for(var u in t){var c=u.split("[");c.length>1&&(analytics_utils_module_m(t,c.map(function(e){return e.replace(/[?[\]\\ ]/g,"")}),t[u]),delete t[u])}return t}(function(r){if(r){var t=r.match(/\?(.*)/);return t&&t[1]?t[1].split("#")[0]:""}return $&&window.location.search.substring(1)}(r))}function analytics_utils_module_m(e,r,t){for(var n=r.length-1,o=0;o<n;++o){var a=r[o];if("__proto__"===a||"constructor"===a)break;a in e||(e[a]={}),e=e[a]}e[r[n]]=t}function analytics_utils_module_f(r,t){return $?new Promise(function(e,n){if(window.history&&window.history.replaceState){var o=window.location.href,a=analytics_utils_module_c(o,r);o!==a&&history.replaceState({},"",a)}return t&&t(),e()}):Promise.resolve()}function analytics_utils_module_g(r){if(!$)return null;var t=document.createElement("a");return t.setAttribute("href",r),t.hostname}function analytics_utils_module_p(e){return(analytics_utils_module_g(e)||"").split(".").slice(-2).join(".")}function analytics_utils_module_x(e){var r=e.split(".");return r.length>1?r.slice(0,-1).join("."):e}var analytics_utils_module_d={trimTld:analytics_utils_module_x,getDomainBase:analytics_utils_module_p,getDomainHost:analytics_utils_module_g};function analytics_utils_module_v(r,t){if(!$)return!1;var n={source:"(direct)",medium:"(none)",campaign:"(not set)"};r&&analytics_utils_module_i(r)&&(n.referrer=r);var o=function(r){if(!r||!$)return!1;var t=analytics_utils_module_p(r),n=document.createElement("a");if(n.href=r,n.hostname.indexOf("google")>-1&&(t="google"),analytics_utils_module_w[t]){var o=analytics_utils_module_w[t],a=new RegExp(("string"==typeof o?o:o.p)+"=.*?([^&#]*|$)","gi"),u=n.search.match(a);return{source:o.n||analytics_utils_module_x(t),medium:"organic",term:(u?u[0].split("=")[1]:"")||"(not provided)"}}var c=analytics_utils_module_i(r)?"referral":"internal";return{source:n.hostname,medium:c}}(r);o&&Object.keys(o).length&&(n=Object.assign({},n,o));var a=analytics_utils_module_s(t),u=Object.keys(a);if(!u.length)return n;var c=u.reduce(function(e,r){return r.match(/^utm_/)&&(e[""+r.replace(/^utm_/,"")]=a[r]),r.match(/^(d|g)clid/)&&(e.source="google",e.medium=a.gclid?"cpc":"cpm",e[r]=a[r]),e},{});return Object.assign({},n,c)}var analytics_utils_module_h="q",analytics_utils_module_w={"daum.net":analytics_utils_module_h,"eniro.se":"search_word","naver.com":"query","yahoo.com":"p","msn.com":analytics_utils_module_h,"aol.com":analytics_utils_module_h,"ask.com":analytics_utils_module_h,"baidu.com":"wd","yandex.com":"text","rambler.ru":"words",google:analytics_utils_module_h,"bing.com":{p:analytics_utils_module_h,n:"live"}};function analytics_utils_module_y(){for(var e="",r=0,t=4294967295*Math.random()|0;r++<36;){var n="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[r-1],o=15&t;e+="-"==n||"4"==n?n:("x"==n?o:3&o|8).toString(16),t=r%8==0?4294967295*Math.random()|0:t>>4}return e}function analytics_utils_module_b(e,r){var t,n,o,a=null,i=0,u=function(){i=new Date,a=null,o=e.apply(t,n)};return function(){var c=new Date;i||(i=c);var l=r-(c-i);return t=this,n=arguments,l<=0?(clearTimeout(a),a=null,i=c,o=e.apply(t,n)):a||(a=setTimeout(u,l)),o}}

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+global-storage-utils@0.1.7/node_modules/@analytics/global-storage-utils/dist/analytics-util-global-storage.module.js
var analytics_util_global_storage_module_l="global",analytics_util_global_storage_module_o=j+"global"+j,analytics_util_global_storage_module_n=typeof self===o&&self.self===self&&self||typeof __webpack_require__.g===o&&__webpack_require__.g.global===__webpack_require__.g&&__webpack_require__.g||void 0;function analytics_util_global_storage_module_a(t){return analytics_util_global_storage_module_n[analytics_util_global_storage_module_o][t]}function analytics_util_global_storage_module_f(t,e){return analytics_util_global_storage_module_n[analytics_util_global_storage_module_o][t]=e}function analytics_util_global_storage_module_i(t){delete analytics_util_global_storage_module_n[analytics_util_global_storage_module_o][t]}function analytics_util_global_storage_module_u(t,e,r){var l;try{if(analytics_util_global_storage_module_b(t)){var o=window[t];l=o[e].bind(o)}}catch(t){}return l||r}analytics_util_global_storage_module_n[analytics_util_global_storage_module_o]||(analytics_util_global_storage_module_n[analytics_util_global_storage_module_o]={});var analytics_util_global_storage_module_c={};function analytics_util_global_storage_module_b(t){if(typeof analytics_util_global_storage_module_c[t]!==analytics_util_types_module_e)return analytics_util_global_storage_module_c[t];try{var e=window[t];e.setItem(analytics_util_types_module_e,analytics_util_types_module_e),e.removeItem(analytics_util_types_module_e)}catch(e){return analytics_util_global_storage_module_c[t]=!1}return analytics_util_global_storage_module_c[t]=!0}

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+core@0.11.1_@types+dlv@1.1.4/node_modules/@analytics/core/dist/client/analytics-core.module.js
function analytics_core_module_v(){return analytics_core_module_v=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},analytics_core_module_v.apply(this,arguments)}var analytics_core_module_y="function",analytics_core_module_b="undefined",analytics_core_module_I="@@redux/"+Math.random().toString(36),analytics_core_module_w=/* #__PURE__ */function(){return typeof Symbol===analytics_core_module_y&&Symbol.observable||"@@observable"}(),analytics_core_module_E=" != "+analytics_core_module_y;function analytics_core_module_P(e,n,t){var r;if(typeof n===analytics_core_module_y&&typeof t===analytics_core_module_b&&(t=n,n=void 0),typeof t!==analytics_core_module_b){if(typeof t!==analytics_core_module_y)throw new Error("enhancer"+analytics_core_module_E);return t(analytics_core_module_P)(e,n)}if(typeof e!==analytics_core_module_y)throw new Error("reducer"+analytics_core_module_E);var i=e,a=n,o=[],u=o,c=!1;function s(){u===o&&(u=o.slice())}function f(){return a}function d(e){if(typeof e!==analytics_core_module_y)throw new Error("Listener"+analytics_core_module_E);var n=!0;return s(),u.push(e),function(){if(n){n=!1,s();var t=u.indexOf(e);u.splice(t,1)}}}function p(e){if(!on(e))throw new Error("Act != obj");if(typeof e.type===analytics_core_module_b)throw new Error("ActType "+analytics_core_module_b);if(c)throw new Error("Dispatch in reducer");try{c=!0,a=i(a,e)}finally{c=!1}for(var n=o=u,t=0;t<n.length;t++)(0,n[t])();return e}return p({type:"@@redux/INIT"}),(r={dispatch:p,subscribe:d,getState:f,replaceReducer:function(e){if(typeof e!==analytics_core_module_y)throw new Error("next reducer"+analytics_core_module_E);i=e,p({type:"@@redux/INIT"})}})[analytics_core_module_w]=function(){var e,n=d;return(e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Observer != obj");function t(){e.next&&e.next(f())}return t(),{unsubscribe:n(t)}}})[analytics_core_module_w]=function(){return this},e},r}function analytics_core_module_S(e,n){var t=n&&n.type;return"action "+(t&&t.toString()||"?")+"reducer "+e+" returns "+analytics_core_module_b}function analytics_core_module_N(){var e=[].slice.call(arguments);return 0===e.length?function(e){return e}:1===e.length?e[0]:e.reduce(function(e,n){return function(){return e(n.apply(void 0,[].slice.call(arguments)))}})}function analytics_core_module_O(){var e=arguments;return function(n){return function(t,r,i){var a,o=n(t,r,i),u=o.dispatch,c={getState:o.getState,dispatch:function(e){return u(e)}};return a=[].slice.call(e).map(function(e){return e(c)}),analytics_core_module_v({},o,{dispatch:u=analytics_core_module_N.apply(void 0,a)(o.dispatch)})}}}var analytics_core_module_A=j+"anon_id",analytics_core_module_=j+"user_id",analytics_core_module_x=j+"user_traits",analytics_core_module_k={__proto__:null,ANON_ID:analytics_core_module_A,USER_ID:analytics_core_module_,USER_TRAITS:analytics_core_module_x},analytics_core_module_j="userId",analytics_core_module_T="anonymousId",analytics_core_module_z=["bootstrap","params","campaign","initializeStart","initialize","initializeEnd","ready","resetStart","reset","resetEnd","pageStart","page","pageEnd","pageAborted","trackStart","track","trackEnd","trackAborted","identifyStart","identify","identifyEnd","identifyAborted","userIdChanged","registerPlugins","enablePlugin","disablePlugin","online","offline","setItemStart","setItem","setItemEnd","setItemAborted","removeItemStart","removeItem","removeItemEnd","removeItemAborted"],analytics_core_module_M=["name","EVENTS","config","loaded"],analytics_core_module_q=analytics_core_module_z.reduce(function(e,n){return e[n]=n,e},{registerPluginType:function(e){return"registerPlugin:"+e},pluginReadyType:function(e){return"ready:"+e}}),analytics_core_module_U=/^utm_/,analytics_core_module_V=/^an_prop_/,analytics_core_module_L=/^an_trait_/;function analytics_core_module_C(e){var n=e.storage.setItem;return function(t){return function(r){return function(i){if(i.type===analytics_core_module_q.bootstrap){var a=i.params,o=i.user,u=i.persistedUser,c=i.initialUser,s=u.userId===o.userId;u.anonymousId!==o.anonymousId&&n(analytics_core_module_A,o.anonymousId),s||n(analytics_core_module_,o.userId),c.traits&&n(analytics_core_module_x,analytics_core_module_v({},s&&u.traits?u.traits:{},c.traits));var l=Object.keys(i.params);if(l.length){var f=a.an_uid,d=a.an_event,p=l.reduce(function(e,n){if(n.match(analytics_core_module_U)||n.match(/^(d|g)clid/)){var t=n.replace(analytics_core_module_U,"");e.campaign["campaign"===t?"name":t]=a[n]}return n.match(analytics_core_module_V)&&(e.props[n.replace(analytics_core_module_V,"")]=a[n]),n.match(analytics_core_module_L)&&(e.traits[n.replace(analytics_core_module_L,"")]=a[n]),e},{campaign:{},props:{},traits:{}});t.dispatch(analytics_core_module_v({type:analytics_core_module_q.params,raw:a},p,f?{userId:f}:{})),f&&setTimeout(function(){return e.identify(f,p.traits)},0),d&&setTimeout(function(){return e.track(d,p.props)},0),Object.keys(p.campaign).length&&t.dispatch({type:analytics_core_module_q.campaign,campaign:p.campaign})}}return r(i)}}}}function analytics_core_module_R(e){return function(n,t){if(void 0===n&&(n={}),void 0===t&&(t={}),t.type===analytics_core_module_q.setItemEnd){if(t.key===analytics_core_module_A)return analytics_core_module_v({},n,{anonymousId:t.value});if(t.key===analytics_core_module_)return analytics_core_module_v({},n,{userId:t.value})}switch(t.type){case analytics_core_module_q.identify:return Object.assign({},n,{userId:t.userId,traits:analytics_core_module_v({},n.traits,t.traits)});case analytics_core_module_q.reset:return[analytics_core_module_,analytics_core_module_A,analytics_core_module_x].forEach(function(n){e.removeItem(n)}),Object.assign({},n,{userId:null,anonymousId:null,traits:{}});default:return n}}}function analytics_core_module_$(e){return{userId:e.getItem(analytics_core_module_),anonymousId:e.getItem(analytics_core_module_A),traits:e.getItem(analytics_core_module_x)}}var analytics_core_module_D=function(e){return j+"TEMP"+j+e};function analytics_core_module_B(n){var t=n.storage,r=t.setItem,i=t.removeItem,a=t.getItem;return function(n){return function(t){return function(u){var c=u.userId,s=u.traits,l=u.options;if(u.type===analytics_core_module_q.reset&&([analytics_core_module_,analytics_core_module_x,analytics_core_module_A].forEach(function(e){i(e)}),[analytics_core_module_j,analytics_core_module_T,"traits"].forEach(function(e){analytics_util_global_storage_module_i(analytics_core_module_D(e))})),u.type===analytics_core_module_q.identify){a(analytics_core_module_A)||r(analytics_core_module_A,analytics_utils_module_y());var f=a(analytics_core_module_),d=a(analytics_core_module_x)||{};f&&f!==c&&n.dispatch({type:analytics_core_module_q.userIdChanged,old:{userId:f,traits:d},new:{userId:c,traits:s},options:l}),c&&r(analytics_core_module_,c),s&&r(analytics_core_module_x,analytics_core_module_v({},d,s))}return t(u)}}}}var analytics_core_module_X={};function analytics_core_module_J(e,n){analytics_core_module_X[e]&&analytics_util_types_module_W(analytics_core_module_X[e])&&(analytics_core_module_X[e](n),delete analytics_core_module_X[e])}function W(e,n,t){return new Promise(function(r,i){return n()?r(e):t<1?i(analytics_core_module_v({},e,{queue:!0})):new Promise(function(e){return setTimeout(e,10)}).then(function(a){return W(e,n,t-10).then(r,i)})})}function analytics_core_module_H(e,n,t){var r=n(),i=e.getState(),a=i.plugins,o=i.queue,u=i.user;if(!i.context.offline&&o&&o.actions&&o.actions.length){var c=o.actions.reduce(function(e,n,t){return a[n.plugin].loaded?(e.process.push(n),e.processIndex.push(t)):(e.requeue.push(n),e.requeueIndex.push(t)),e},{processIndex:[],process:[],requeue:[],requeueIndex:[]});if(c.processIndex&&c.processIndex.length){c.processIndex.forEach(function(n){var i=o.actions[n],c=i.plugin,s=i.payload.type,l=r[c][s];if(l&&analytics_util_types_module_W(l)){var f=function(e,n){return void 0===e&&(e={}),void 0===n&&(n={}),[analytics_core_module_j,analytics_core_module_T].reduce(function(t,r){return e.hasOwnProperty(r)&&n[r]&&n[r]!==e[r]&&(t[r]=n[r]),t},e)}(i.payload,u);l({payload:f,config:a[c].config,instance:t});var p=s+":"+c;e.dispatch(analytics_core_module_v({},f,{type:p,_:{called:p,from:"queueDrain"}}))}});var s=o.actions.filter(function(e,n){return!~c.processIndex.indexOf(n)});o.actions=s}}}var analytics_core_module_F=function(e){var n=e.data,t=e.action,r=e.instance,i=e.state,a=e.allPlugins,o=e.allMatches,u=e.store,c=e.EVENTS;try{var s=i.plugins,f=i.context,p=t.type,m=p.match(analytics_core_module_G),g=n.exact.map(function(e){return e.pluginName});m&&(g=o.during.map(function(e){return e.pluginName}));var h=function(e,n){return function(t,r,i){var a=r.config,o=r.name,u=o+"."+t.type;i&&(u=i.event);var c=t.type.match(analytics_core_module_G)?function(e,n,t,r,i){return function(a,o){var u=r?r.name:e,c=o&&ie(o)?o:t;if(r&&(!(c=o&&ie(o)?o:[e]).includes(e)||1!==c.length))throw new Error("Method "+n+" can only abort "+e+" plugin. "+JSON.stringify(c)+" input valid");return analytics_core_module_v({},i,{abort:{reason:a,plugins:c,caller:n,_:u}})}}(o,u,n,i,t):function(e,n){return function(){throw new Error(e.type+" action not cancellable. Remove abort in "+n)}}(t,u);return{payload:ue(t),instance:e,config:a||{},abort:c}}}(r,g),y=n.exact.reduce(function(e,n){var t=n.pluginName,r=n.methodName,i=!1;return r.match(/^initialize/)||r.match(/^reset/)||(i=!s[t].loaded),f.offline&&r.match(/^(page|track|identify)/)&&(i=!0),e[""+t]=i,e},{});return Promise.resolve(n.exact.reduce(function(e,i,o){var u=i.pluginName;return Promise.resolve(e).then(function(e){function i(){return Promise.resolve(e)}var o=function(){if(n.namespaced&&n.namespaced[u])return Promise.resolve(n.namespaced[u].reduce(function(e,n,t){return Promise.resolve(e).then(function(e){return n.method&&analytics_util_types_module_W(n.method)?(function(e,n){var t=oe(e);if(t&&t.name===n){var r=oe(t.method);throw new Error([n+" plugin is calling method "+e,"Plugins cant call self","Use "+t.method+" "+(r?"or "+r.method:"")+" in "+n+" plugin insteadof "+e].join("\n"))}}(n.methodName,n.pluginName),Promise.resolve(n.method({payload:e,instance:r,abort:(t=e,i=u,o=n.pluginName,function(e,n){return analytics_core_module_v({},t,{abort:{reason:e,plugins:n||[i],caller:p,from:o||i}})}),config:analytics_core_module_Z(n.pluginName,s,a),plugins:s})).then(function(n){var t=on(n)?n:{};return Promise.resolve(analytics_core_module_v({},e,t))})):e;var t,i,o})},Promise.resolve(t))).then(function(n){e[u]=n});e[u]=t}();return o&&o.then?o.then(i):i()})},Promise.resolve({}))).then(function(e){return Promise.resolve(n.exact.reduce(function(t,i,o){try{var c=n.exact.length===o+1,f=i.pluginName,d=a[f];return Promise.resolve(t).then(function(n){var t=e[f]?e[f]:{};if(m&&(t=n),te(t,f))return analytics_core_module_Y({data:t,method:p,instance:r,pluginName:f,store:u}),Promise.resolve(n);if(te(n,f))return c&&analytics_core_module_Y({data:n,method:p,instance:r,store:u}),Promise.resolve(n);if(y.hasOwnProperty(f)&&!0===y[f])return u.dispatch({type:"queue",plugin:f,payload:t,_:{called:"queue",from:"queueMechanism"}}),Promise.resolve(n);var i=h(e[f],a[f]);return Promise.resolve(d[p]({abort:i.abort,payload:t,instance:r,config:analytics_core_module_Z(f,s,a),plugins:s})).then(function(i){var a=on(i)?i:{},o=analytics_core_module_v({},n,a),c=e[f];if(te(c,f))analytics_core_module_Y({data:c,method:p,instance:r,pluginName:f,store:u});else{var s=p+":"+f;(s.match(/:/g)||[]).length<2&&!p.match(analytics_core_module_K)&&!p.match(analytics_core_module_Q)&&r.dispatch(analytics_core_module_v({},m?o:t,{type:s,_:{called:s,from:"submethod"}}))}return Promise.resolve(o)})})}catch(e){return Promise.reject(e)}},Promise.resolve(t))).then(function(e){if(!(p.match(analytics_core_module_G)||p.match(/^registerPlugin/)||p.match(analytics_core_module_Q)||p.match(analytics_core_module_K)||p.match(/^params/)||p.match(/^userIdChanged/))){if(c.plugins.includes(p),e._&&e._.originalAction===p)return e;var t=analytics_core_module_v({},e,{_:{originalAction:e.type,called:e.type,from:"engineEnd"}});re(e,n.exact.length)&&!p.match(/End$/)&&(t=analytics_core_module_v({},t,{type:e.type+"Aborted"})),u.dispatch(t)}return e})})}catch(e){return Promise.reject(e)}},analytics_core_module_G=/Start$/,analytics_core_module_K=/^bootstrap/,analytics_core_module_Q=/^ready/;function analytics_core_module_Y(e){var n=e.pluginName,t=e.method+"Aborted"+(n?":"+n:"");e.store.dispatch(analytics_core_module_v({},e.data,{type:t,_:{called:t,from:"abort"}}))}function analytics_core_module_Z(e,n,t){var r=n[e]||t[e];return r&&r.config?r.config:{}}function ee(e,n){return n.reduce(function(n,t){return t[e]?n.concat({methodName:e,pluginName:t.name,method:t[e]}):n},[])}function ne(e,n){var t=e.replace(analytics_core_module_G,""),r=n?":"+n:"";return[""+e+r,""+t+r,t+"End"+r]}function te(e,n){var t=e.abort;return!!t&&(!0===t||ae(t,n)||t&&ae(t.plugins,n))}function re(e,n){var t=e.abort;if(!t)return!1;if(!0===t||q(t))return!0;var r=t.plugins;return ie(t)&&t.length===n||ie(r)&&r.length===n}function ie(e){return Array.isArray(e)}function ae(e,n){return!(!e||!ie(e))&&e.includes(n)}function oe(e){var n=e.match(/(.*):(.*)/);return!!n&&{method:n[1],name:n[2]}}function ue(e){return Object.keys(e).reduce(function(n,t){return"type"===t||(n[t]=on(e[t])?Object.assign({},e[t]):e[t]),n},{})}function ce(e,n,t){var r={};return function(i){return function(a){return function(o){try{var u,c=function(e){return u?e:a(f)},s=o.type,l=o.plugins,f=o;if(o.abort)return Promise.resolve(a(o));if(s===analytics_core_module_q.enablePlugin&&i.dispatch({type:analytics_core_module_q.initializeStart,plugins:l,disabled:[],fromEnable:!0,meta:o.meta}),s===analytics_core_module_q.disablePlugin&&setTimeout(function(){return analytics_core_module_J(o.meta.rid,{payload:o})},0),s===analytics_core_module_q.initializeEnd){var m=n(),g=Object.keys(m),h=g.filter(function(e){return l.includes(e)}).map(function(e){return m[e]}),y=[],b=[],I=o.disabled,w=h.map(function(e){var n=e.name;return W(e,e.loaded,1e4).then(function(t){return r[n]||(i.dispatch({type:analytics_core_module_q.pluginReadyType(n),name:n,events:Object.keys(e).filter(function(e){return!analytics_core_module_M.includes(e)})}),r[n]=!0),y=y.concat(n),e}).catch(function(e){if(e instanceof Error)throw new Error(e);return b=b.concat(e.name),e})});Promise.all(w).then(function(e){var n={plugins:y,failed:b,disabled:I};setTimeout(function(){g.length===w.length+I.length&&i.dispatch(analytics_core_module_v({},{type:analytics_core_module_q.ready},n))},0)})}var E=function(){if(s!==analytics_core_module_q.bootstrap)return/^ready:([^:]*)$/.test(s)&&setTimeout(function(){return analytics_core_module_H(i,n,e)},0),Promise.resolve(function(e,n,t,r,i){try{var a=analytics_util_types_module_W(n)?n():n,o=e.type,u=o.replace(analytics_core_module_G,"");if(e._&&e._.called)return Promise.resolve(e);var c=t.getState(),s=(m=a,void 0===(g=c.plugins)&&(g={}),void 0===(h=e.options)&&(h={}),Object.keys(m).filter(function(e){var n=h.plugins||{};return Q(n[e])?n[e]:!1!==n.all&&(!g[e]||!1!==g[e].enabled)}).map(function(e){return m[e]}));o===analytics_core_module_q.initializeStart&&e.fromEnable&&(s=Object.keys(c.plugins).filter(function(n){var t=c.plugins[n];return e.plugins.includes(n)&&!t.initialized}).map(function(e){return a[e]}));var l=s.map(function(e){return e.name}),f=function(e,n,t){var r=ne(e).map(function(e){return ee(e,n)});return n.reduce(function(t,r){var i=r.name,a=ne(e,i).map(function(e){return ee(e,n)}),o=a[0],u=a[1],c=a[2];return o.length&&(t.beforeNS[i]=o),u.length&&(t.duringNS[i]=u),c.length&&(t.afterNS[i]=c),t},{before:r[0],beforeNS:{},during:r[1],duringNS:{},after:r[2],afterNS:{}})}(o,s);return Promise.resolve(analytics_core_module_F({action:e,data:{exact:f.before,namespaced:f.beforeNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){function n(){var n=function(){if(o.match(analytics_core_module_G))return Promise.resolve(analytics_core_module_F({action:analytics_core_module_v({},s,{type:u+"End"}),data:{exact:f.after,namespaced:f.afterNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){e.meta&&e.meta.hasCallback&&analytics_core_module_J(e.meta.rid,{payload:e})})}();return n&&n.then?n.then(function(){return e}):e}if(re(e,l.length))return e;var s,d=function(){if(o!==u)return Promise.resolve(analytics_core_module_F({action:analytics_core_module_v({},e,{type:u}),data:{exact:f.during,namespaced:f.duringNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){s=e});s=e}();return d&&d.then?d.then(n):n()})}catch(e){return Promise.reject(e)}var m,g,h}(o,n,e,i,t)).then(function(e){var n=a(e);return u=1,n})}();return Promise.resolve(E&&E.then?E.then(c):c(E))}catch(e){return Promise.reject(e)}}}}}function se(e){return function(n){return function(n){return function(t){var r=t.type,i=t.key,a=t.value,o=t.options;if(r===analytics_core_module_q.setItem||r===analytics_core_module_q.removeItem){if(t.abort)return n(t);r===analytics_core_module_q.setItem?e.setItem(i,a,o):e.removeItem(i,o)}return n(t)}}}}var le=function(){var e=this;this.before=[],this.after=[],this.addMiddleware=function(n,t){e[t]=e[t].concat(n)},this.removeMiddleware=function(n,t){var r=e[t].findIndex(function(e){return e===n});-1!==r&&(e[t]=[].concat(e[t].slice(0,r),e[t].slice(r+1)))},this.dynamicMiddlewares=function(n){return function(t){return function(r){return function(i){var a={getState:t.getState,dispatch:function(e){return t.dispatch(e)}},o=e[n].map(function(e){return e(a)});return analytics_core_module_N.apply(void 0,o)(r)(i)}}}}};function fe(e){return function(n,t){void 0===n&&(n={});var r={};if("initialize:aborted"===t.type)return n;if(/^registerPlugin:([^:]*)$/.test(t.type)){var i=de(t.type,"registerPlugin"),a=e()[i];if(!a||!i)return n;var o=t.enabled;return r[i]={enabled:o,initialized:!!o&&Boolean(!a.initialize),loaded:!!o&&Boolean(a.loaded()),config:a.config||{}},analytics_core_module_v({},n,r)}if(/^initialize:([^:]*)$/.test(t.type)){var u=de(t.type,analytics_core_module_q.initialize),c=e()[u];return c&&u?(r[u]=analytics_core_module_v({},n[u],{initialized:!0,loaded:Boolean(c.loaded())}),analytics_core_module_v({},n,r)):n}if(/^ready:([^:]*)$/.test(t.type))return r[t.name]=analytics_core_module_v({},n[t.name],{loaded:!0}),analytics_core_module_v({},n,r);switch(t.type){case analytics_core_module_q.disablePlugin:return analytics_core_module_v({},n,pe(t.plugins,!1,n));case analytics_core_module_q.enablePlugin:return analytics_core_module_v({},n,pe(t.plugins,!0,n));default:return n}}}function de(e,n){return e.substring(n.length+1,e.length)}function pe(e,n,t){return e.reduce(function(e,r){return e[r]=analytics_core_module_v({},t[r],{enabled:n}),e},t)}function me(e){try{return JSON.parse(JSON.stringify(e))}catch(e){}return e}var ge={last:{},history:[]};function he(e,n){void 0===e&&(e=ge);var t=n.options,r=n.meta;if(n.type===analytics_core_module_q.track){var i=me(analytics_core_module_v({event:n.event,properties:n.properties},Object.keys(t).length&&{options:t},{meta:r}));return analytics_core_module_v({},e,{last:i,history:e.history.concat(i)})}return e}var ve={actions:[]};function ye(e,n){void 0===e&&(e=ve);var t=n.payload;switch(n.type){case"queue":var r;return r=t&&t.type&&t.type===analytics_core_module_q.identify?[n].concat(e.actions):e.actions.concat(n),analytics_core_module_v({},e,{actions:r});case"dequeue":return[];default:return e}}var be=/#.*$/;function Ie(e){var n=/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g.exec(e);return"/"+(n&&n[3]?n[3].split("?")[0].replace(be,""):"")}var we,Ee,Pe,Se,Ne=function(e){if(void 0===e&&(e={}),!$)return e;var n=document,t=n.title,r=n.referrer,i=window,a=i.location,o=i.innerWidth,u=i.innerHeight,c=a.hash,s=a.search,l=function(e){var n=function(){if($)for(var e,n=document.getElementsByTagName("link"),t=0;e=n[t];t++)if("canonical"===e.getAttribute("rel"))return e.getAttribute("href")}();return n?n.match(/\?/)?n:n+e:window.location.href.replace(be,"")}(s),f={title:t,url:l,path:Ie(l),hash:c,search:s,width:o,height:u};return r&&""!==r&&(f.referrer=r),analytics_core_module_v({},f,e)},Oe={last:{},history:[]};function Ae(e,n){void 0===e&&(e=Oe);var t=n.options;if(n.type===analytics_core_module_q.page){var r=me(analytics_core_module_v({properties:n.properties,meta:n.meta},Object.keys(t).length&&{options:t}));return analytics_core_module_v({},e,{last:r,history:e.history.concat(r)})}return e}we=function(){if(!$)return!1;var e=navigator.appVersion;return~e.indexOf("Win")?"Windows":~e.indexOf("Mac")?"MacOS":~e.indexOf("X11")?"UNIX":~e.indexOf("Linux")?"Linux":"Unknown OS"}(),Ee=$?document.referrer:null,Pe=analytics_utils_module_o(),Se=analytics_utils_module_a();var _e={initialized:!1,sessionId:analytics_utils_module_y(),app:null,version:null,debug:!1,offline:!!$&&!navigator.onLine,os:{name:we},userAgent:$?navigator.userAgent:"node",library:{name:"analytics",version:"0.11.0"},timezone:Se,locale:Pe,campaign:{},referrer:Ee};function xe(e,n){void 0===e&&(e=_e);var t=e.initialized,r=n.campaign;switch(n.type){case analytics_core_module_q.campaign:return analytics_core_module_v({},e,{campaign:r});case analytics_core_module_q.offline:return analytics_core_module_v({},e,{offline:!0});case analytics_core_module_q.online:return analytics_core_module_v({},e,{offline:!1});default:return t?e:analytics_core_module_v({},_e,e,{initialized:!0})}}var ke=["plugins","reducers","storage"];function je(e,n,t){if($){var r=window[(t?"add":"remove")+"EventListener"];e.split(" ").forEach(function(e){r(e,n)})}}function Te(e){var n=je.bind(null,"online offline",function(n){return Promise.resolve(!navigator.onLine).then(e)});return n(!0),function(e){return n(!1)}}function ze(){return analytics_util_global_storage_module_f("analytics",[]),function(e){return function(n,t,r){var i=e(n,t,r),a=i.dispatch;return Object.assign(i,{dispatch:function(e){return analytics_util_global_storage_module_n[analytics_util_global_storage_module_o].analytics.push(e.action||e),a(e)}})}}}function Me(e){return function(){return analytics_core_module_N(analytics_core_module_N.apply(null,arguments),ze())}}function qe(e){return e?rn(e)?e:[e]:[]}function Ue(n,t,r){void 0===n&&(n={});var i,a,o=analytics_utils_module_y();return t&&(analytics_core_module_X[o]=(i=t,a=function(e){for(var n,t=e||Array.prototype.slice.call(arguments),r=0;r<t.length;r++)if(analytics_util_types_module_W(t[r])){n=t[r];break}return n}(r),function(e){a&&a(e),i(e)})),analytics_core_module_v({},n,{rid:o,ts:(new Date).getTime()},t?{hasCallback:!0}:{})}function Ve(n){void 0===n&&(n={});var t=n.reducers||{},c=n.initialUser||{},s=(n.plugins||[]).reduce(function(e,n){if(analytics_util_types_module_W(n))return e.middlewares=e.middlewares.concat(n),e;if(n.NAMESPACE&&(n.name=n.NAMESPACE),!n.name)throw new Error("https://lytics.dev/errors/1");var t=n.EVENTS?Object.keys(n.EVENTS).map(function(e){return n.EVENTS[e]}):[];e.pluginEnabled[n.name]=!(!1===n.enabled||n.config&&!1===n.config.enabled),delete n.enabled,n.methods&&(e.methods[n.name]=Object.keys(n.methods).reduce(function(e,t){var r;return e[t]=(r=n.methods[t],function(){for(var e=Array.prototype.slice.call(arguments),n=new Array(r.length),t=0;t<e.length;t++)n[t]=e[t];return n[n.length]=K,r.apply({instance:K},n)}),e},{}),delete n.methods);var r=Object.keys(n).concat(t),i=new Set(e.events.concat(r));if(e.events=Array.from(i),e.pluginsArray=e.pluginsArray.concat(n),e.plugins[n.name])throw new Error(n.name+"AlreadyLoaded");return e.plugins[n.name]=n,e.plugins[n.name].loaded||(e.plugins[n.name].loaded=function(){return!0}),e},{plugins:{},pluginEnabled:{},methods:{},pluginsArray:[],middlewares:[],events:[]}),f=n.storage?n.storage:{getItem:analytics_util_global_storage_module_a,setItem:analytics_util_global_storage_module_f,removeItem:analytics_util_global_storage_module_i},p=function(e){return function(n,t,r){return t.getState("user")[n]||(r&&on(r)&&r[n]?r[n]:analytics_core_module_$(e)[n]||analytics_util_global_storage_module_a(analytics_core_module_D(n))||null)}}(f),h=s.plugins,w=s.events.filter(function(e){return!analytics_core_module_M.includes(e)}).sort(),E=new Set(w.concat(analytics_core_module_z).filter(function(e){return!analytics_core_module_M.includes(e)})),_=Array.from(E).sort(),x=function(){return h},k=new le,U=k.addMiddleware,V=k.removeMiddleware,L=k.dynamicMiddlewares,X=function(){throw new Error("Abort disabled inListener")},J=analytics_utils_module_s(),W=analytics_core_module_$(f),F=analytics_core_module_v({},W,c,J.an_uid?{userId:J.an_uid}:{},J.an_aid?{anonymousId:J.an_aid}:{});F.anonymousId||(F.anonymousId=analytics_utils_module_y());var G=analytics_core_module_v({enable:function(e,n){return new Promise(function(t){oe.dispatch({type:analytics_core_module_q.enablePlugin,plugins:qe(e),_:{originalAction:analytics_core_module_q.enablePlugin}},t,[n])})},disable:function(e,n){return new Promise(function(t){oe.dispatch({type:analytics_core_module_q.disablePlugin,plugins:qe(e),_:{originalAction:analytics_core_module_q.disablePlugin}},t,[n])})}},s.methods),K={identify:function(e,n,t,r){try{var i=q(e)?e:null,a=on(e)?e:n,o=t||{},c=K.user();analytics_util_global_storage_module_f(analytics_core_module_D(analytics_core_module_j),i);var s=i||a.userId||p(analytics_core_module_j,K,a);return Promise.resolve(new Promise(function(e){oe.dispatch(analytics_core_module_v({type:analytics_core_module_q.identifyStart,userId:s,traits:a||{},options:o,anonymousId:c.anonymousId},c.id&&c.id!==i&&{previousId:c.id}),e,[n,t,r])}))}catch(e){return Promise.reject(e)}},track:function(e,n,t,r){try{var i=on(e)?e.event:e;if(!i||!q(i))throw new Error("EventMissing");var a=on(e)?e:n||{},o=on(t)?t:{};return Promise.resolve(new Promise(function(e){oe.dispatch({type:analytics_core_module_q.trackStart,event:i,properties:a,options:o,userId:p(analytics_core_module_j,K,n),anonymousId:p(analytics_core_module_T,K,n)},e,[n,t,r])}))}catch(e){return Promise.reject(e)}},page:function(e,n,t){try{var r=on(e)?e:{},i=on(n)?n:{};return Promise.resolve(new Promise(function(a){oe.dispatch({type:analytics_core_module_q.pageStart,properties:Ne(r),options:i,userId:p(analytics_core_module_j,K,r),anonymousId:p(analytics_core_module_T,K,r)},a,[e,n,t])}))}catch(e){return Promise.reject(e)}},user:function(e){if(e===analytics_core_module_j||"id"===e)return p(analytics_core_module_j,K);if(e===analytics_core_module_T||"anonId"===e)return p(analytics_core_module_T,K);var n=K.getState("user");return e?dlv_umd_default()(n,e):n},reset:function(e){return new Promise(function(n){oe.dispatch({type:analytics_core_module_q.resetStart},n,e)})},ready:function(e){return K.on(analytics_core_module_q.ready,e)},on:function(e,n){if(!e||!analytics_util_types_module_W(n))return!1;if(e===analytics_core_module_q.bootstrap)throw new Error(".on disabled for "+e);var t=/Start$|Start:/;if("*"===e){var r=function(e){return function(e){return function(r){return r.type.match(t)&&n({payload:r,instance:K,plugins:h}),e(r)}}},i=function(e){return function(e){return function(r){return r.type.match(t)||n({payload:r,instance:K,plugins:h}),e(r)}}};return U(r,Le),U(i,Ce),function(){V(r,Le),V(i,Ce)}}var a=e.match(t)?Le:Ce,o=function(t){return function(t){return function(r){return r.type===e&&n({payload:r,instance:K,plugins:h,abort:X}),t(r)}}};return U(o,a),function(){return V(o,a)}},once:function(e,n){if(!e||!analytics_util_types_module_W(n))return!1;if(e===analytics_core_module_q.bootstrap)throw new Error(".once disabled for "+e);var t=K.on(e,function(e){n({payload:e.payload,instance:K,plugins:h,abort:X}),t()});return t},getState:function(e){var n=oe.getState();return e?dlv_umd_default()(n,e):Object.assign({},n)},dispatch:function(e){var n=q(e)?{type:e}:e;if(analytics_core_module_z.includes(n.type))throw new Error("reserved action "+n.type);var t=analytics_core_module_v({},n,{_:analytics_core_module_v({originalAction:n.type},e._||{})});oe.dispatch(t)},enablePlugin:G.enable,disablePlugin:G.disable,plugins:G,storage:{getItem:f.getItem,setItem:function(e,n,t){oe.dispatch({type:analytics_core_module_q.setItemStart,key:e,value:n,options:t})},removeItem:function(e,n){oe.dispatch({type:analytics_core_module_q.removeItemStart,key:e,options:n})}},setAnonymousId:function(e,n){K.storage.setItem(analytics_core_module_A,e,n)},events:{core:analytics_core_module_z,plugins:w}},Q=s.middlewares.concat([function(e){return function(e){return function(n){return n.meta||(n.meta=Ue()),e(n)}}},L(Le),ce(K,x,{all:_,plugins:w}),se(f),analytics_core_module_C(K),analytics_core_module_B(K),L(Ce)]),Y={context:xe,user:analytics_core_module_R(f),page:Ae,track:he,plugins:fe(x),queue:ye},Z=analytics_core_module_N,ee=analytics_core_module_N;if($&&n.debug){var ne=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;ne&&(Z=ne({trace:!0,traceLimit:25})),ee=function(){return 0===arguments.length?ze():on(typeof arguments[0])?Me():Me().apply(null,arguments)}}var te,re=function(e){return Object.keys(e).reduce(function(n,t){return ke.includes(t)||(n[t]=e[t]),n},{})}(n),ie=s.pluginsArray.reduce(function(e,n){var t=n.name,r=n.config,i=n.loaded,a=s.pluginEnabled[t];return e[t]={enabled:a,initialized:!!a&&Boolean(!n.initialize),loaded:Boolean(i()),config:r||{}},e},{}),ae={context:re,user:F,plugins:ie},oe=analytics_core_module_P(function(e){for(var n=Object.keys(e),t={},r=0;r<n.length;r++){var i=n[r];typeof e[i]===analytics_core_module_y&&(t[i]=e[i])}var a,o=Object.keys(t);try{!function(e){Object.keys(e).forEach(function(n){var t=e[n];if(typeof t(void 0,{type:"@@redux/INIT"})===analytics_core_module_b||typeof t(void 0,{type:analytics_core_module_I})===analytics_core_module_b)throw new Error("reducer "+n+" "+analytics_core_module_b)})}(t)}catch(e){a=e}return function(e,n){if(void 0===e&&(e={}),a)throw a;for(var r=!1,i={},u=0;u<o.length;u++){var c=o[u],s=e[c],l=(0,t[c])(s,n);if(typeof l===analytics_core_module_b){var f=analytics_core_module_S(c,n);throw new Error(f)}i[c]=l,r=r||l!==s}return r?i:e}}(analytics_core_module_v({},Y,t)),ae,ee(Z(analytics_core_module_O.apply(void 0,Q))));oe.dispatch=(te=oe.dispatch,function(e,n,t){var r=analytics_core_module_v({},e,{meta:Ue(e.meta,n,qe(t))});return te.apply(null,[r])});var ue=Object.keys(h);oe.dispatch({type:analytics_core_module_q.bootstrap,plugins:ue,config:re,params:J,user:F,initialUser:c,persistedUser:W});var de=ue.filter(function(e){return s.pluginEnabled[e]}),pe=ue.filter(function(e){return!s.pluginEnabled[e]});return oe.dispatch({type:analytics_core_module_q.registerPlugins,plugins:ue,enabled:s.pluginEnabled}),s.pluginsArray.map(function(e,n){var t=e.bootstrap,r=e.config,i=e.name;t&&analytics_util_types_module_W(t)&&t({instance:K,config:r,payload:e}),oe.dispatch({type:analytics_core_module_q.registerPluginType(i),name:i,enabled:s.pluginEnabled[i],plugin:e}),s.pluginsArray.length===n+1&&oe.dispatch({type:analytics_core_module_q.initializeStart,plugins:de,disabled:pe})}),Te(function(e){oe.dispatch({type:e?analytics_core_module_q.offline:analytics_core_module_q.online})}),function(e,n,t){setInterval(function(){return analytics_core_module_H(e,n,t)},3e3)}(oe,x,K),K}var Le="before",Ce="after";

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+cookie-utils@0.2.12/node_modules/@analytics/cookie-utils/dist/analytics-util-cookie.module.js
var analytics_util_cookie_module_t="cookie",analytics_util_cookie_module_i=analytics_util_cookie_module_a(),analytics_util_cookie_module_r=analytics_util_cookie_module_d,analytics_util_cookie_module_c=analytics_util_cookie_module_d;function analytics_util_cookie_module_u(o){return analytics_util_cookie_module_i?analytics_util_cookie_module_d(o,"",-1):analytics_util_global_storage_module_i(o)}function analytics_util_cookie_module_a(){if(void 0!==analytics_util_cookie_module_i)return analytics_util_cookie_module_i;var e="cookiecookie";try{analytics_util_cookie_module_d(e,e),analytics_util_cookie_module_i=-1!==document.cookie.indexOf(e),analytics_util_cookie_module_u(e)}catch(e){analytics_util_cookie_module_i=!1}return analytics_util_cookie_module_i}function analytics_util_cookie_module_d(e,t,r,c,u,a){if("undefined"!=typeof window){var d=arguments.length>1;return!1===analytics_util_cookie_module_i&&(d?analytics_util_global_storage_module_f(e,t):analytics_util_global_storage_module_a(e)),d?document.cookie=e+"="+encodeURIComponent(t)+(r?"; expires="+new Date(+new Date+1e3*r).toUTCString()+(c?"; path="+c:"")+(u?"; domain="+u:"")+(a?"; secure":""):""):decodeURIComponent((("; "+document.cookie).split("; "+e+"=")[1]||"").split(";")[0])}}

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+localstorage-utils@0.1.8/node_modules/@analytics/localstorage-utils/dist/analytics-util-localstorage.module.js
var analytics_util_localstorage_module_r="localStorage",analytics_util_localstorage_module_g=analytics_util_global_storage_module_b.bind(null,"localStorage"),analytics_util_localstorage_module_c=analytics_util_global_storage_module_u("localStorage","getItem",analytics_util_global_storage_module_a),analytics_util_localstorage_module_m=analytics_util_global_storage_module_u("localStorage","setItem",analytics_util_global_storage_module_f),analytics_util_localstorage_module_S=analytics_util_global_storage_module_u("localStorage","removeItem",analytics_util_global_storage_module_i);

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+session-storage-utils@0.0.5/node_modules/@analytics/session-storage-utils/dist/analytics-util-session-storage.module.js
var analytics_util_session_storage_module_a="sessionStorage",analytics_util_session_storage_module_i=analytics_util_global_storage_module_b.bind(null,"sessionStorage"),analytics_util_session_storage_module_g=analytics_util_global_storage_module_u("sessionStorage","getItem",analytics_util_global_storage_module_a),analytics_util_session_storage_module_n=analytics_util_global_storage_module_u("sessionStorage","setItem",analytics_util_global_storage_module_f),analytics_util_session_storage_module_l=analytics_util_global_storage_module_u("sessionStorage","removeItem",analytics_util_global_storage_module_i);

;// CONCATENATED MODULE: ../node_modules/.pnpm/@analytics+storage-utils@0.4.0/node_modules/@analytics/storage-utils/dist/analytics-util-storage.module.js
function analytics_util_storage_module_I(t){var o=t;try{if("true"===(o=JSON.parse(t)))return!0;if("false"===o)return!1;if(on(o))return o;parseFloat(o)===o&&(o=parseFloat(o))}catch(t){}if(null!==o&&""!==o)return o}var analytics_util_storage_module_k=analytics_util_localstorage_module_g(),analytics_util_storage_module_O=analytics_util_session_storage_module_i(),analytics_util_storage_module_x=analytics_util_cookie_module_a();function analytics_util_storage_module_C(o,e){if(o){var r=analytics_util_storage_module_A(e),a=!analytics_util_storage_module_N(r),i=analytics_util_storage_module_d(r)?analytics_util_storage_module_I(localStorage.getItem(o)):void 0;if(a&&!I(i))return i;var n=analytics_util_storage_module_h(r)?analytics_util_storage_module_I(analytics_util_cookie_module_r(o)):void 0;if(a&&n)return n;var l=analytics_util_storage_module_E(r)?analytics_util_storage_module_I(sessionStorage.getItem(o)):void 0;if(a&&l)return l;var u=analytics_util_global_storage_module_a(o);return a?u:{localStorage:i,sessionStorage:l,cookie:n,global:u}}}function analytics_util_storage_module_L(r,a,l){if(r&&!I(a)){var u={},g=analytics_util_storage_module_A(l),m=JSON.stringify(a),S=!analytics_util_storage_module_N(g);return analytics_util_storage_module_d(g)&&(u[analytics_util_localstorage_module_r]=analytics_util_storage_module_F(analytics_util_localstorage_module_r,a,analytics_util_storage_module_I(localStorage.getItem(r))),localStorage.setItem(r,m),S)?u[analytics_util_localstorage_module_r]:analytics_util_storage_module_h(g)&&(u[analytics_util_cookie_module_t]=analytics_util_storage_module_F(analytics_util_cookie_module_t,a,analytics_util_storage_module_I(analytics_util_cookie_module_r(r))),analytics_util_cookie_module_c(r,m),S)?u[analytics_util_cookie_module_t]:analytics_util_storage_module_E(g)&&(u[analytics_util_session_storage_module_a]=analytics_util_storage_module_F(analytics_util_session_storage_module_a,a,analytics_util_storage_module_I(sessionStorage.getItem(r))),sessionStorage.setItem(r,m),S)?u[analytics_util_session_storage_module_a]:(u[analytics_util_global_storage_module_l]=analytics_util_storage_module_F(analytics_util_global_storage_module_l,a,analytics_util_global_storage_module_a(r)),analytics_util_global_storage_module_f(r,a),S?u[analytics_util_global_storage_module_l]:u)}}function analytics_util_storage_module_b(t,e){if(t){var a=analytics_util_storage_module_A(e),s=analytics_util_storage_module_C(t,m),n={};return!I(s.localStorage)&&analytics_util_storage_module_d(a)&&(localStorage.removeItem(t),n[analytics_util_localstorage_module_r]=s.localStorage),!I(s.cookie)&&analytics_util_storage_module_h(a)&&(analytics_util_cookie_module_u(t),n[analytics_util_cookie_module_t]=s.cookie),!I(s.sessionStorage)&&analytics_util_storage_module_E(a)&&(sessionStorage.removeItem(t),n[analytics_util_session_storage_module_a]=s.sessionStorage),!I(s.global)&&analytics_util_storage_module_G(a,analytics_util_global_storage_module_l)&&(analytics_util_global_storage_module_i(t),n[analytics_util_global_storage_module_l]=s.global),n}}function analytics_util_storage_module_A(t){return t?q(t)?t:t.storage:b}function analytics_util_storage_module_d(t){return analytics_util_storage_module_k&&analytics_util_storage_module_G(t,analytics_util_localstorage_module_r)}function analytics_util_storage_module_h(t){return analytics_util_storage_module_x&&analytics_util_storage_module_G(t,analytics_util_cookie_module_t)}function analytics_util_storage_module_E(t){return analytics_util_storage_module_O&&analytics_util_storage_module_G(t,analytics_util_session_storage_module_a)}function analytics_util_storage_module_N(t){return t===m||"all"===t}function analytics_util_storage_module_G(t,o){return t===b||t===o||analytics_util_storage_module_N(t)}function analytics_util_storage_module_F(t,o,e){return{location:t,current:o,previous:e}}var analytics_util_storage_module_J={setItem:analytics_util_storage_module_L,getItem:analytics_util_storage_module_C,removeItem:analytics_util_storage_module_b};

;// CONCATENATED MODULE: ../node_modules/.pnpm/analytics@0.8.1_@types+dlv@1.1.4/node_modules/analytics/lib/analytics.browser.es.js




function analytics_browser_es_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function analytics_browser_es_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? analytics_browser_es_ownKeys(Object(source), !0).forEach(function (key) {
      analytics_browser_es_defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : analytics_browser_es_ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function analyticsLib() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSettings = {
    storage: analytics_util_storage_module_J
  };
  return Ve(_objectSpread2(_objectSpread2({}, defaultSettings), opts));
}



;// CONCATENATED MODULE: ../frontend/src/common/appInstrumentation/buildAnalytics.ts
function buildAnalyticsInstance({measurementId}){const instance=analyticsLib({app:'Retool',plugins:[index({measurementIds:[measurementId]})]});return instance;}

/***/ }),

/***/ 457999:
/***/ (function(module) {

!function(t,n){ true?module.exports=function(t,n,e,i,o){for(n=n.split?n.split("."):n,i=0;i<n.length;i++)t=t?t[n[i]]:o;return t===o?e:t}:0}(this);


/***/ })

}])
//# sourceMappingURL=1383.d16d6c04.chunk.js.map