(function(e){function t(t){for(var n,l,s=t[0],c=t[1],i=t[2],d=0,p=[];d<s.length;d++)l=s[d],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&p.push(o[l][0]),o[l]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,i||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==o[c]&&(n=!1)}n&&(a.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},o={app:0},a=[];function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=r("28dd"),a=r("730f"),l=r.n(a),s=(r("39d0"),r("2f62"));n["default"].use(s["a"]);var c=new s["a"].Store({state:{orders:[]},getters:{orders:function(e){return e.orders}},mutations:{setOrders:function(e,t){e.orders=t}},actions:{setOrders:function(e,t){var r=e.commit;r("setOrders",t)}}}),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HelloWorld")],1)},u=[],d=(r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Orders")},f=[],b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("polaris-card",{attrs:{"primary-footer-action":{content:"Generate Report",onAction:e.generateReport}}},[r("polaris-card-section",[r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table"},[r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Order")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Date")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Customer")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Payment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfillment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Total")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfilled By")])],1)])]),r("tbody",e._l(e.orders,(function(t){return r("tr",{key:t.id},[r("th",{attrs:{scope:"row"}},[r("polaris-heading",[e._v(e._s(t.name))])],1),r("td",[r("polaris-display-text",[e._v(e._s(t.created_at))])],1),r("td",[r("polaris-display-text",[e._v(e._s((t.customer.first_name?t.customer.first_name:"")+" "+(t.customer.last_name?t.customer.last_name:"")))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(t.processing_method))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(null==t.fulfillment_status?"Unfulfilled":"Fulfilled"))])],1),r("td",[r("polaris-display-text",[e._v("$"+e._s(t.total_price))])],1),r("th",[r("polaris-select",{attrs:{options:["Unfulfilled","Pathao","eCourier","Shuderban"],"data-order_id":t.id,placeholder:""==t.fulfilled_by?"Unfulfilled":t.fulfilled_by},on:{change:function(r){return e.onFulfillChange(r,t.id)}}})],1)])})),0)])])]),e.download.downloadable?r("polaris-unstyled-link",{attrs:{url:e.download.link,external:!0}},[e._v(" Download Report ")]):e._e()],1)],1)},h=[];r("9911");function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(d["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v={data:function(){return{download:{downloadable:!1,link:""}}},computed:y({},Object(s["c"])(["orders"])),methods:{generateReport:function(){var e=this;this.$http.get("https://yellow-report.herokuapp.com/generate-report").then((function(t){e.download.downloadable=!0,e.download.link=t.body.download_link})).catch((function(e){console.log(e)}))},onFulfillChange:function(e,t){this.$http.post("https://yellow-report.herokuapp.com/save",{order_id:t,fulfillment_by:e}).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))}}},g=v,_=r("2877"),m=Object(_["a"])(g,b,h,!1,null,null,null),j=m.exports,w={components:{Orders:j},mounted:function(){}},P=w,k=Object(_["a"])(P,p,f,!1,null,"37abc075",null),x=k.exports;function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){Object(d["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var $={name:"app",components:{HelloWorld:x},computed:D({},Object(s["c"])(["orders"])),methods:D({},Object(s["b"])(["setOrders"])),mounted:function(){var e=this;this.$http.get("/get-orders").then((function(t){e.setOrders(t.body)}))}},E=$,C=Object(_["a"])(E,i,u,!1,null,null,null),F=C.exports;n["default"].config.productionTip=!1,n["default"].use(o["a"]),n["default"].use(l.a),new n["default"]({store:c,render:function(e){return e(F)}}).$mount("#app")}});
//# sourceMappingURL=app.59348640.js.map