(function(e){function t(t){for(var n,a,s=t[0],i=t[1],c=t[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);u&&u(t);while(p.length)p.shift()();return l.push.apply(l,c||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,s=1;s<r.length;s++){var i=r[s];0!==o[i]&&(n=!1)}n&&(l.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},l=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=i;l.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=r("28dd"),l=r("730f"),a=r.n(l),s=(r("39d0"),r("2f62"));n["default"].use(s["a"]);var i=new s["a"].Store({state:{orders:window.__orders},getters:{orders:function(e){return e.orders}}}),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HelloWorld")],1)},u=[],d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Orders")},p=[],f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("polaris-card",{attrs:{"primary-footer-action":{content:"Generate Report",onAction:e.generateReport}}},[r("polaris-card-section",[r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table"},[r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Order")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Date")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Customer")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Payment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfillment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Total")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfilled By")])],1)])]),r("tbody",e._l(e.orders,(function(t){return r("tr",{key:t.id},[r("th",{attrs:{scope:"row"}},[r("polaris-heading",[e._v(e._s(t.name))])],1),r("td",[r("polaris-display-text",[e._v(e._s(t.created_at))])],1),r("td",[r("polaris-display-text",[e._v(e._s((t.customer.first_name?t.customer.first_name:"")+" "+(t.customer.last_name?t.customer.last_name:"")))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(t.processing_method))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(null==t.fulfillment_status?"Unfulfilled":"Fulfilled"))])],1),r("td",[r("polaris-display-text",[e._v("$"+e._s(t.total_price))])],1),r("th",[r("polaris-select",{attrs:{options:["Unfulfilled","Pathao","eCourier","Shuderban"],"data-order_id":t.id,placeholder:""==t.fulfilled_by?"Unfulfilled":t.fulfilled_by},on:{change:function(r){return e.onFulfillChange(r,t.id)}}})],1)])})),0)])])]),e.download.downloadable?r("polaris-unstyled-link",{attrs:{url:e.download.link,external:!0}},[e._v(" Download Report ")]):e._e()],1)],1)},h=[],b=(r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("9911"),r("159b"),r("ade3"));function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(Object(r),!0).forEach((function(t){Object(b["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g={data:function(){return{download:{downloadable:!1,link:""}}},computed:v({},Object(s["b"])(["orders"])),methods:{generateReport:function(){var e=this;this.$http.get("https://yellow-report.herokuapp.com/generate-report").then((function(t){e.download.downloadable=!0,e.download.link=t.body.download_link})).catch((function(e){console.log(e)}))},onFulfillChange:function(e,t){this.$http.post("https://yellow-report.herokuapp.com/save",{order_id:t,fulfillment_by:e}).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}}},y=g,m=r("2877"),O=Object(m["a"])(y,f,h,!1,null,null,null),w=O.exports,j={components:{Orders:w},mounted:function(){}},P=j,x=Object(m["a"])(P,d,p,!1,null,"37abc075",null),k=x.exports,S={name:"app",components:{HelloWorld:k}},$=S,C=Object(m["a"])($,c,u,!1,null,null,null),D=C.exports;n["default"].config.productionTip=!1,n["default"].use(o["a"]),n["default"].use(a.a),new n["default"]({store:i,render:function(e){return e(D)}}).$mount("#app")}});
//# sourceMappingURL=app.8d69c70d.js.map