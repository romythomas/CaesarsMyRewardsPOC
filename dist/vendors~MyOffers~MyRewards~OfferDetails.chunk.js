(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{640:function(e,i,n){"use strict";var r,s=n(658),t=(r=s)&&r.__esModule?r:{default:r};e.exports=t.default},641:function(e,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r,s=n(0),t=(r=s)&&"object"==typeof r&&"default"in r?r.default:r,o=new(n(661)),a=o.getBrowser(),d=(o.getCPU(),o.getDevice()),l=o.getEngine(),u=o.getOS(),c=o.getUA(),w=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||i},m=function(){return!("undefined"==typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},p=function(e){var i=m();return i&&(-1!==i.platform.indexOf(e)||"MacIntel"===i.platform&&i.maxTouchPoints>1&&!window.MSStream)};function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,i){for(var n=0;n<i.length;n++){var r=i[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,i,n){return i in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,e}function h(){return(h=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function g(e,i){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);i&&(r=r.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),n.push.apply(n,r)}return n}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,i){return(E=Object.setPrototypeOf||function(e,i){return e.__proto__=i,e})(e,i)}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var N="mobile",O="tablet",S="smarttv",k="console",T="wearable",C=void 0,V="Chrome",L="Firefox",A="Opera",P="Yandex",M="Safari",_="Internet Explorer",j="Edge",F="Chromium",B="IE",z="Mobile Safari",W="iOS",I="Android",R="Windows Phone",D={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},q=function(e,i,n,r){return function(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?g(n,!0).forEach((function(i){b(e,i,n[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))}))}return e}({},e,{vendor:w(i.vendor),model:w(i.model),os:w(n.name),osVersion:w(n.version),ua:w(r)})},U=function(e){switch(e){case N:return{isMobile:!0};case O:return{isTablet:!0};case S:return{isSmartTV:!0};case k:return{isConsole:!0};case T:return{isWearable:!0};case C:return{isBrowser:!0};default:return D}}(d.type);var G,H=function(){return p("iPad")},X=d.type===S,J=d.type===k,Q=d.type===T,Y=a.name===z||H(),$=a.name===F,K=function(){switch(d.type){case N:case O:return!0;default:return!1}}()||H(),Z=d.type===N,ee=d.type===O||H(),ie=d.type===C,ne=u.name===I,re=u.name===R,se=u.name===W||H(),te=a.name===V,oe=a.name===L,ae=a.name===M||a.name===z,de=a.name===A,le=a.name===_||a.name===B,ue=w(u.version),ce=w(u.name),we=w(a.version),me=w(a.major),pe=w(a.name),fe=w(d.vendor),ve=w(d.model),be=w(l.name),he=w(l.version),ge=w(c),ye=a.name===j,Ee=a.name===P,xe=w(d.type,"browser"),Ne=(G=m())&&(/iPad|iPhone|iPod/.test(G.platform)||"MacIntel"===G.platform&&G.maxTouchPoints>1)&&!window.MSStream,Oe=H(),Se=p("iPhone"),ke=p("iPod"),Te=function(){var e=m(),i=e&&e.userAgent.toLowerCase();return"string"==typeof i&&/electron/.test(i)}();i.AndroidView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return ne?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.BrowserView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return ie?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.ConsoleView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return J?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.CustomView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return e.condition?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.IEView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return le?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.IOSView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return se?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.MobileOnlyView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return Z?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.MobileView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return K?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.SmartTVView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return X?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.TabletView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return ee?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.WearableView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return Q?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.WinPhoneView=function(e){var i=e.renderWithFragment,n=e.children,r=e.viewClassName,o=e.style;return re?i?t.createElement(s.Fragment,null,n):t.createElement("div",{className:r,style:o},n):null},i.browserName=pe,i.browserVersion=me,i.deviceDetect=function(){var e=U.isBrowser,i=U.isMobile,n=U.isTablet,r=U.isSmartTV,s=U.isConsole,t=U.isWearable;return e?function(e,i,n,r,s){return{isBrowser:e,browserMajorVersion:w(i.major),browserFullVersion:w(i.version),browserName:w(i.name),engineName:w(n.name),engineVersion:w(n.version),osName:w(r.name),osVersion:w(r.version),userAgent:w(s)}}(e,a,l,u,c):r?function(e,i,n,r){return{isSmartTV:e,engineName:w(i.name),engineVersion:w(i.version),osName:w(n.name),osVersion:w(n.version),userAgent:w(r)}}(r,l,u,c):s?function(e,i,n,r){return{isConsole:e,engineName:w(i.name),engineVersion:w(i.version),osName:w(n.name),osVersion:w(n.version),userAgent:w(r)}}(s,l,u,c):i||n?q(U,d,u,c):t?function(e,i,n,r){return{isWearable:e,engineName:w(i.name),engineVersion:w(i.version),osName:w(n.name),osVersion:w(n.version),userAgent:w(r)}}(t,l,u,c):void 0},i.deviceType=xe,i.engineName=be,i.engineVersion=he,i.fullBrowserVersion=we,i.getUA=ge,i.isAndroid=ne,i.isBrowser=ie,i.isChrome=te,i.isChromium=$,i.isConsole=J,i.isEdge=ye,i.isElectron=Te,i.isFirefox=oe,i.isIE=le,i.isIOS=se,i.isIOS13=Ne,i.isIPad13=Oe,i.isIPhone13=Se,i.isIPod13=ke,i.isMobile=K,i.isMobileOnly=Z,i.isMobileSafari=Y,i.isOpera=de,i.isSafari=ae,i.isSmartTV=X,i.isTablet=ee,i.isWearable=Q,i.isWinPhone=re,i.isYandex=Ee,i.mobileModel=ve,i.mobileVendor=fe,i.osName=ce,i.osVersion=ue,i.withOrientationChange=function(e){return function(i){function n(e){var i,r,s;return function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,n),r=this,(i=!(s=y(n).call(this,e))||"object"!=typeof s&&"function"!=typeof s?x(r):s).isEventListenerAdded=!1,i.handleOrientationChange=i.handleOrientationChange.bind(x(i)),i.onOrientationChange=i.onOrientationChange.bind(x(i)),i.onPageLoad=i.onPageLoad.bind(x(i)),i.state={isLandscape:!1,isPortrait:!1},i}var r,s,o;return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),i&&E(e,i)}(n,i),r=n,(s=[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var e=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:0===e,isLandscape:90===e})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){void 0!==("undefined"==typeof window?"undefined":f(window))&&K&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return t.createElement(e,h({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}])&&v(r.prototype,s),o&&v(r,o),n}(t.Component)}},658:function(e,i,n){"use strict";var r,s=n(659),t=(r=s)&&r.__esModule?r:{default:r};var o={dataScript:function(e){var i=document.createElement("script");return i.innerHTML=e,i},gtm:function(e){var i=t.default.tags(e);return{noScript:function(){var e=document.createElement("noscript");return e.innerHTML=i.iframe,e},script:function(){var e=document.createElement("script");return e.innerHTML=i.script,e},dataScript:this.dataScript(i.dataLayerVar)}},initialize:function(e){var i=e.gtmId,n=e.events,r=void 0===n?{}:n,s=e.dataLayer,t=e.dataLayerName,o=void 0===t?"dataLayer":t,a=e.auth,d=void 0===a?"":a,l=e.preview,u=void 0===l?"":l,c=this.gtm({id:i,events:r,dataLayer:s||void 0,dataLayerName:o,auth:d,preview:u});s&&document.head.appendChild(c.dataScript),document.head.insertBefore(c.script(),document.head.childNodes[0]),document.body.insertBefore(c.noScript(),document.body.childNodes[0])},dataLayer:function(e){var i=e.dataLayer,n=e.dataLayerName,r=void 0===n?"dataLayer":n;if(window[r])return window[r].push(i);var s=t.default.dataLayer(i,r),o=this.dataScript(s);document.head.appendChild(o)}};e.exports=o},659:function(e,i,n){"use strict";var r,s=n(660),t=(r=s)&&r.__esModule?r:{default:r};var o={tags:function(e){var i=e.id,n=e.events,r=e.dataLayer,s=e.dataLayerName,o=e.preview,a="&gtm_auth="+e.auth,d="&gtm_preview="+o;return i||(0,t.default)("GTM Id is required"),{iframe:'\n      <iframe src="https://www.googletagmanager.com/ns.html?id='+i+a+d+'&gtm_cookies_win=x"\n        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>',script:"\n      (function(w,d,s,l,i){w[l]=w[l]||[];\n        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', "+JSON.stringify(n).slice(1,-1)+"});\n        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';\n        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+'"+a+d+"&gtm_cookies_win=x';\n        f.parentNode.insertBefore(j,f);\n      })(window,document,'script','"+s+"','"+i+"');",dataLayerVar:this.dataLayer(r,s)}},dataLayer:function(e,i){return"\n      window."+i+" = window."+i+" || [];\n      window."+i+".push("+JSON.stringify(e)+")"}};e.exports=o},660:function(e,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.default=function(e){console.warn("[react-gtm]",e)}},661:function(e,i,n){var r;
/*!
 * UAParser.js v0.7.21
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */!function(s,t){"use strict";var o="model",a="name",d="type",l="vendor",u="version",c="mobile",w="tablet",m="smarttv",p={extend:function(e,i){var n={};for(var r in e)i[r]&&i[r].length%2==0?n[r]=i[r].concat(e[r]):n[r]=e[r];return n},has:function(e,i){return"string"==typeof e&&-1!==i.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()},major:function(e){return"string"==typeof e?e.replace(/[^\d\.]/g,"").split(".")[0]:void 0},trim:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},f={rgx:function(e,i){for(var n,r,s,t,o,a,d=0;d<i.length&&!o;){var l=i[d],u=i[d+1];for(n=r=0;n<l.length&&!o;)if(o=l[n++].exec(e))for(s=0;s<u.length;s++)a=o[++r],"object"==typeof(t=u[s])&&t.length>0?2==t.length?"function"==typeof t[1]?this[t[0]]=t[1].call(this,a):this[t[0]]=t[1]:3==t.length?"function"!=typeof t[1]||t[1].exec&&t[1].test?this[t[0]]=a?a.replace(t[1],t[2]):void 0:this[t[0]]=a?t[1].call(this,a,t[2]):void 0:4==t.length&&(this[t[0]]=a?t[3].call(this,a.replace(t[1],t[2])):void 0):this[t]=a||void 0;d+=2}},str:function(e,i){for(var n in i)if("object"==typeof i[n]&&i[n].length>0){for(var r=0;r<i[n].length;r++)if(p.has(i[n][r],e))return"?"===n?void 0:n}else if(p.has(i[n],e))return"?"===n?void 0:n;return e}},v={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},b={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[a,u],[/(opios)[\/\s]+([\w\.]+)/i],[[a,"Opera Mini"],u],[/\s(opr)\/([\w\.]+)/i],[[a,"Opera"],u],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,/(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],[a,u],[/(konqueror)\/([\w\.]+)/i],[[a,"Konqueror"],u],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[a,"IE"],u],[/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],[[a,"Edge"],u],[/(yabrowser)\/([\w\.]+)/i],[[a,"Yandex"],u],[/(Avast)\/([\w\.]+)/i],[[a,"Avast Secure Browser"],u],[/(AVG)\/([\w\.]+)/i],[[a,"AVG Secure Browser"],u],[/(puffin)\/([\w\.]+)/i],[[a,"Puffin"],u],[/(focus)\/([\w\.]+)/i],[[a,"Firefox Focus"],u],[/(opt)\/([\w\.]+)/i],[[a,"Opera Touch"],u],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[a,"UCBrowser"],u],[/(comodo_dragon)\/([\w\.]+)/i],[[a,/_/g," "],u],[/(windowswechat qbcore)\/([\w\.]+)/i],[[a,"WeChat(Win) Desktop"],u],[/(micromessenger)\/([\w\.]+)/i],[[a,"WeChat"],u],[/(brave)\/([\w\.]+)/i],[[a,"Brave"],u],[/(qqbrowserlite)\/([\w\.]+)/i],[a,u],[/(QQ)\/([\d\.]+)/i],[a,u],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[a,u],[/(baiduboxapp)[\/\s]?([\w\.]+)/i],[a,u],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[a,u],[/(MetaSr)[\/\s]?([\w\.]+)/i],[a],[/(LBBROWSER)/i],[a],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[u,[a,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[u,[a,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/android.+(line)\/([\w\.]+)\/iab/i],[a,u],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[u,[a,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[a,/(.+)/,"$1 WebView"],u],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[a,/(.+(?:g|us))(.+)/,"$1 $2"],u],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[u,[a,"Android Browser"]],[/(sailfishbrowser)\/([\w\.]+)/i],[[a,"Sailfish Browser"],u],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[a,u],[/(dolfin)\/([\w\.]+)/i],[[a,"Dolphin"],u],[/(qihu|qhbrowser|qihoobrowser|360browser)/i],[[a,"360 Browser"]],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[a,"Chrome"],u],[/(coast)\/([\w\.]+)/i],[[a,"Opera Coast"],u],[/fxios\/([\w\.-]+)/i],[u,[a,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[u,[a,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[u,a],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[a,"GSA"],u],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[a,[u,f.str,v.browser.oldsafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[a,u],[/(navigator|netscape)\/([\w\.-]+)/i],[[a,"Netscape"],u],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[a,u]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[["architecture","amd64"]],[/(ia32(?=;))/i],[["architecture",p.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[["architecture","ia32"]],[/windows\s(ce|mobile);\sppc;/i],[["architecture","arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[["architecture",/ower/,"",p.lowerize]],[/(sun4\w)[;\)]/i],[["architecture","sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[["architecture",p.lowerize]]],device:[[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],[o,l,[d,w]],[/applecoremedia\/[\w\.]+ \((ipad)/],[o,[l,"Apple"],[d,w]],[/(apple\s{0,1}tv)/i],[[o,"Apple TV"],[l,"Apple"],[d,m]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[l,o,[d,w]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[o,[l,"Amazon"],[d,w]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[o,f.str,v.device.amazon.model],[l,"Amazon"],[d,c]],[/android.+aft([bms])\sbuild/i],[o,[l,"Amazon"],[d,m]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[o,l,[d,c]],[/\((ip[honed|\s\w*]+);/i],[o,[l,"Apple"],[d,c]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[l,o,[d,c]],[/\(bb10;\s(\w+)/i],[o,[l,"BlackBerry"],[d,c]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],[o,[l,"Asus"],[d,w]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[l,"Sony"],[o,"Xperia Tablet"],[d,w]],[/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[o,[l,"Sony"],[d,c]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[l,o,[d,"console"]],[/android.+;\s(shield)\sbuild/i],[o,[l,"Nvidia"],[d,"console"]],[/(playstation\s[34portablevi]+)/i],[o,[l,"Sony"],[d,"console"]],[/(sprint\s(\w+))/i],[[l,f.str,v.device.sprint.vendor],[o,f.str,v.device.sprint.model],[d,c]],[/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[l,[o,/_/g," "],[d,c]],[/(nexus\s9)/i],[o,[l,"HTC"],[d,w]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i],[o,[l,"Huawei"],[d,c]],[/android.+(bah2?-a?[lw]\d{2})/i],[o,[l,"Huawei"],[d,w]],[/(microsoft);\s(lumia[\s\w]+)/i],[l,o,[d,c]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[o,[l,"Microsoft"],[d,"console"]],[/(kin\.[onetw]{3})/i],[[o,/\./g," "],[l,"Microsoft"],[d,c]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[o,[l,"Motorola"],[d,c]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[o,[l,"Motorola"],[d,w]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[l,p.trim],[o,p.trim],[d,m]],[/hbbtv.+maple;(\d+)/i],[[o,/^/,"SmartTV"],[l,"Samsung"],[d,m]],[/\(dtv[\);].+(aquos)/i],[o,[l,"Sharp"],[d,m]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[l,"Samsung"],o,[d,w]],[/smart-tv.+(samsung)/i],[l,[d,m],o],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[l,"Samsung"],o,[d,c]],[/sie-(\w*)/i],[o,[l,"Siemens"],[d,c]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[l,"Nokia"],o,[d,c]],[/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[o,[l,"Acer"],[d,w]],[/android.+([vl]k\-?\d{3})\s+build/i],[o,[l,"LG"],[d,w]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[l,"LG"],o,[d,w]],[/(lg) netcast\.tv/i],[l,o,[d,m]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[o,[l,"LG"],[d,c]],[/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],[l,o,[d,w]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[o,[l,"Lenovo"],[d,w]],[/(lenovo)[_\s-]?([\w-]+)/i],[l,o,[d,c]],[/linux;.+((jolla));/i],[l,o,[d,c]],[/((pebble))app\/[\d\.]+\s/i],[l,o,[d,"wearable"]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[l,o,[d,c]],[/crkey/i],[[o,"Chromecast"],[l,"Google"],[d,m]],[/android.+;\s(glass)\s\d/i],[o,[l,"Google"],[d,"wearable"]],[/android.+;\s(pixel c)[\s)]/i],[o,[l,"Google"],[d,w]],[/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],[o,[l,"Google"],[d,c]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[o,/_/g," "],[l,"Xiaomi"],[d,c]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[o,/_/g," "],[l,"Xiaomi"],[d,w]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[o,[l,"Meizu"],[d,c]],[/(mz)-([\w-]{2,})/i],[[l,"Meizu"],o,[d,c]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})[\s)]/i],[o,[l,"OnePlus"],[d,c]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[o,[l,"RCA"],[d,w]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[o,[l,"Dell"],[d,w]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[o,[l,"Verizon"],[d,w]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[l,"Barnes & Noble"],o,[d,w]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[o,[l,"NuVision"],[d,w]],[/android.+;\s(k88)\sbuild/i],[o,[l,"ZTE"],[d,w]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[o,[l,"Swiss"],[d,c]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[o,[l,"Swiss"],[d,w]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[o,[l,"Zeki"],[d,w]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[l,"Dragon Touch"],o,[d,w]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[o,[l,"Insignia"],[d,w]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[o,[l,"NextBook"],[d,w]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[l,"Voice"],o,[d,c]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[l,"LvTel"],o,[d,c]],[/android.+;\s(PH-1)\s/i],[o,[l,"Essential"],[d,c]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[o,[l,"Envizen"],[d,w]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[l,o,[d,w]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[o,[l,"MachSpeed"],[d,w]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[l,o,[d,w]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[o,[l,"Rotor"],[d,w]],[/android.+(KS(.+))\s+build/i],[o,[l,"Amazon"],[d,w]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[l,o,[d,w]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[d,p.lowerize],l,o],[/[\s\/\(](smart-?tv)[;\)]/i],[[d,m]],[/(android[\w\.\s\-]{0,9});.+build/i],[o,[l,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[u,[a,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[u,[a,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[a,u],[/rv\:([\w\.]{1,9}).+(gecko)/i],[u,a]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[a,u],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[a,[u,f.str,v.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[a,"Windows"],[u,f.str,v.os.windows.version]],[/\((bb)(10);/i],[[a,"BlackBerry"],u],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen|kaios)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],[a,u],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[a,"Symbian"],u],[/\((series40);/i],[a],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[a,"Firefox OS"],u],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[a,u],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[a,"Chromium OS"],u],[/(sunos)\s?([\w\.\d]*)/i],[[a,"Solaris"],u],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[a,u],[/(haiku)\s(\w+)/i],[a,u],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[u,/_/g,"."],[a,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[a,"Mac OS"],[u,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[a,u]]},h=function(e,i){if("object"==typeof e&&(i=e,e=void 0),!(this instanceof h))return new h(e,i).getResult();var n=e||(s&&s.navigator&&s.navigator.userAgent?s.navigator.userAgent:""),r=i?p.extend(b,i):b;return this.getBrowser=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,n,r.browser),e.major=p.major(e.version),e},this.getCPU=function(){var e={architecture:void 0};return f.rgx.call(e,n,r.cpu),e},this.getDevice=function(){var e={vendor:void 0,model:void 0,type:void 0};return f.rgx.call(e,n,r.device),e},this.getEngine=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,n,r.engine),e},this.getOS=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,n,r.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=e,this},this};h.VERSION="0.7.21",h.BROWSER={NAME:a,MAJOR:"major",VERSION:u},h.CPU={ARCHITECTURE:"architecture"},h.DEVICE={MODEL:o,VENDOR:l,TYPE:d,CONSOLE:"console",MOBILE:c,SMARTTV:m,TABLET:w,WEARABLE:"wearable",EMBEDDED:"embedded"},h.ENGINE={NAME:a,VERSION:u},h.OS={NAME:a,VERSION:u},void 0!==i?(void 0!==e&&e.exports&&(i=e.exports=h),i.UAParser=h):void 0===(r=function(){return h}.call(i,n,i,e))||(e.exports=r);var g=s&&(s.jQuery||s.Zepto);if(g&&!g.ua){var y=new h;g.ua=y.getResult(),g.ua.get=function(){return y.getUA()},g.ua.set=function(e){y.setUA(e);var i=y.getResult();for(var n in i)g.ua[n]=i[n]}}}("object"==typeof window?window:this)}}]);