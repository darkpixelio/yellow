(function(e){function t(t){for(var o,l,s=t[0],d=t[1],i=t[2],u=0,f=[];u<s.length;u++)l=s[u],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&f.push(n[l][0]),n[l]=0;for(o in d)Object.prototype.hasOwnProperty.call(d,o)&&(e[o]=d[o]);c&&c(t);while(f.length)f.shift()();return a.push.apply(a,i||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],o=!0,s=1;s<r.length;s++){var d=r[s];0!==n[d]&&(o=!1)}o&&(a.splice(t--,1),e=l(l.s=r[0]))}return e}var o={},n={app:0},a=[];function l(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=e,l.c=o,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(r,o,function(t){return e[t]}.bind(null,o));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var c=d;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),n=r("28dd"),a=r("730f"),l=r.n(a),s=(r("39d0"),r("2f62"));o["default"].use(s["a"]);var d=new s["a"].Store({state:{orders:[{id:"sasdf",name:"asdfads",created_at:"adsfasd",processing_method:"adfads",fulfillment_status:"adfad",total_price:"adfads",customer:{first_name:"adfad",last_name:"adfads"},fulfilled_by:""},{id:"asdfadsf",name:"asdfads",created_at:"adsfasd",processing_method:"adfads",fulfillment_status:"adfad",total_price:"adfads",customer:{first_name:"adfad",last_name:"adfads"},fulfilled_by:"Pathao"}]},getters:{orders:function(e){return e.orders}},mutations:{setOrders:function(e,t){e.orders=t}},actions:{setOrders:function(e,t){var r=e.commit;r("setOrders",t)}}}),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HelloWorld")],1)},c=[],u=(r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3")),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Orders")},p=[],b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("polaris-card",{attrs:{"primary-footer-action":{content:"Generate Report",onAction:e.generateReport,disabled:e.disabled}}},[r("polaris-card-section",[r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table"},[r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Order")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Date")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Customer")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Payment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfillment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Total")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfilled By")])],1)])]),r("tbody",e._l(e.orders,(function(t){return r("tr",{key:t.id},[r("th",{attrs:{scope:"row"}},[r("polaris-heading",[e._v(e._s(t.name))])],1),r("td",[r("polaris-display-text",[e._v(e._s(t.created_at))])],1),r("td",[r("polaris-display-text",[e._v(e._s((t.customer.first_name?t.customer.first_name:"")+" "+(t.customer.last_name?t.customer.last_name:"")))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(t.processing_method))])],1),r("td",[r("polaris-badge",{attrs:{status:"warning"}},[e._v(e._s(null==t.fulfillment_status?"Unfulfilled":"Fulfilled"))])],1),r("td",[r("polaris-display-text",[e._v("$"+e._s(t.total_price))])],1),r("th",[r("polaris-select",{attrs:{options:["Unfulfilled","Pathao","eCourier","Shuderban"],"data-order_id":t.id,placeholder:""==t.fulfilled_by?"Unfulfilled":t.fulfilled_by},on:{change:function(r){return e.onFulfillChange(r,t.id)}}})],1)])})),0)])])]),e.download.downloadable?r("polaris-unstyled-link",{attrs:{url:e.download.link,external:!0}},[e._v(" Download Report ")]):e._e()],1)],1)},h=[],_=(r("e25e"),r("9911"),r("53ca"));function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(u["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y={data:function(){return{download:{downloadable:!1,link:""},disabled:!1}},computed:m({},Object(s["c"])(["orders"])),methods:{generateReport:function(){var e=this;alert("boom"),this.$http.get("https://yellow-report.herokuapp.com/generate-report").then((function(t){e.download.downloadable=!0,e.download.link=t.body.download_link})).catch((function(e){console.log(e)}))},onFulfillChange:function(e,t){var r=this;this.disabled=!0,this.download.downloadable=!1,console.log("From Vue",Object(_["a"])(t)),this.$http.post("https://yellow-report.herokuapp.com/save",{order_id:parseInt(t),fulfillment_by:e}).then((function(e){console.log(e),r.disabled=!1,r.download.downloadable=!0})).catch((function(e){return console.log(e)}))}}},g=y,v=r("2877"),w=Object(v["a"])(g,b,h,!1,null,null,null),j=w.exports,P={components:{Orders:j},mounted:function(){}},k=P,x=Object(v["a"])(k,f,p,!1,null,"37abc075",null),S=x.exports;function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){Object(u["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var $={name:"app",components:{HelloWorld:S},computed:E({},Object(s["c"])(["orders"])),methods:E({},Object(s["b"])(["setOrders"])),mounted:function(){}},C=$,F=Object(v["a"])(C,i,c,!1,null,null,null),M=F.exports;o["default"].config.productionTip=!1,o["default"].use(n["a"]),o["default"].use(l.a),new o["default"]({store:d,render:function(e){return e(M)}}).$mount("#app")}});
//# sourceMappingURL=app.d4b6cf33.js.map