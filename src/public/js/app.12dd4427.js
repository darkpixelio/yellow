(function(e){function t(t){for(var n,a,i=t[0],d=t[1],s=t[2],c=0,f=[];c<i.length;c++)a=i[c],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);u&&u(t);while(f.length)f.shift()();return l.push.apply(l,s||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,i=1;i<r.length;i++){var d=r[i];0!==o[d]&&(n=!1)}n&&(l.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},l=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var u=d;l.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=r("28dd"),l=r("730f"),a=r.n(l),i=(r("39d0"),r("2f62"));n["default"].use(i["a"]);var d=new i["a"].Store({state:{orders:[]},getters:{orders:function(e){return e.orders}},mutations:{setOrders:function(e,t){e.orders=t},updateSingleOrder:function(e,t){e.orders[t.index]&&(e.orders[t.index]["fulfillment_by"]=t.fulfillment_by,e.orders[t.index]["fulfillment_id"]=t.fulfillment_id,e.orders[t.index]["payment_status"]=t.payment_status,e.orders[t.index]["fulfillment_status"]=t.fulfillment_status,e.orders[t.index]["fulfillment_order_id"]=t.fulfillment_order_id)}},actions:{setOrders:function(e,t){var r=e.commit;r("setOrders",t)},setSingleOrder:function(e,t){var r=e.commit;r("updateSingleOrder",t)}}}),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HelloWorld")],1)},u=[],c=(r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3")),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Orders")},p=[],b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("polaris-card",{attrs:{"primary-footer-action":{content:"Generate Report",onAction:e.generateReport,disabled:e.disabled}}},[r("polaris-card-section",[r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table"},[r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Order")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Date")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Customer")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Payment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfillment")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Total")])],1),r("th",{attrs:{scope:"col"}},[r("polaris-heading",[e._v("Fulfilled By")])],1)])]),r("tbody",e._l(e.orders,(function(t,n){return r("tr",{key:t.id},[r("th",{attrs:{scope:"row"}},[r("polaris-heading",[e._v(e._s(t.name))])],1),r("td",[r("polaris-display-text",[e._v(e._s(t.created_at))])],1),r("td",[r("polaris-display-text",[e._v(e._s((t.customer?t.customer.first_name:"")+" "+(t.customer?t.customer.last_name:"")))])],1),r("td",[r("polaris-badge",{attrs:{status:"PAID"==t.payment_status?"":"warning"}},[e._v(e._s(t.payment_status))])],1),r("td",[r("polaris-badge",{attrs:{status:"UNFULFILLED"==t.fulfillment_status?"warning":""}},[e._v(e._s(t.fulfillment_status))])],1),r("td",[r("polaris-display-text",[e._v("$"+e._s(t.total_price))])],1),r("th",[r("polaris-select",{attrs:{options:["Unfulfilled","Pathao","eCourier","Shuderban"],"data-order_id":t.id,"data-fulfillment-id":t.fulfilled_id,placeholder:""==t.fulfilled_by?"Unfulfilled":t.fulfilled_by},on:{change:function(r){return e.onFulfillChange(r,t.id,t.fulfillment_id,t.fulfillment_order_id,n)}},model:{value:e.fulfilled_by[n],callback:function(t){e.$set(e.fulfilled_by,n,t)},expression:"fulfilled_by[index]"}})],1)])})),0)])])]),e.download.downloadable?r("polaris-unstyled-link",{attrs:{url:e.download.link,external:!0}},[e._v(" Download Report ")]):e._e()],1)],1)},_=[];r("7db0"),r("9911");function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(c["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y={data:function(){return{download:{downloadable:!1,link:""},disabled:!1,fulfilled_by:[],lastOrderId:[]}},computed:h({},Object(i["c"])(["orders"])),methods:h({},Object(i["b"])(["setSingleOrder"]),{generateReport:function(){var e=this;this.download.downloadable=!1,this.$http.get("/generate-report").then((function(t){e.download.downloadable=!0,e.download.link=t.body.download_link})).catch((function(e){console.log(e)}))},onFulfillChange:function(e,t,r,n,o){var l=this;this.fulfilled_by[o]=e,this.disabled=!0,this.download.downloadable=!1,console.log("From Vue",t,r),this.$http.post("/save",{order_id:t,fulfillment_by:e,fulfillment_id:r,fulfillment_order_id:n}).then((function(e){console.log(e.data),l.disabled=!1,l.download.downloadable=!1;var t=null;e.data.orderUpdate.order.fulfillments.length&&(t=e.data.orderUpdate.order.fulfillments.find((function(e){return"SUCCESS"==e.status}))),l.setSingleOrder({index:o,fulfillment_id:e.data.orderUpdate.order.metafield.id,fulfillment_by:e.data.orderUpdate.order.metafield.value,payment_status:e.data.orderUpdate.order.displayFinancialStatus,fulfillment_status:e.data.orderUpdate.order.displayFulfillmentStatus,fulfillment_order_id:t?t.id:null})})).catch((function(e){return console.log(e)}))}})},O=y,g=r("2877"),v=Object(g["a"])(O,b,_,!1,null,null,null),w=v.exports,j={components:{Orders:w},mounted:function(){}},P=j,x=Object(g["a"])(P,f,p,!1,null,"4b300864",null),S=x.exports;function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){Object(c["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var U={name:"app",components:{HelloWorld:S},computed:D({},Object(i["c"])(["orders"])),methods:D({},Object(i["b"])(["setOrders"])),mounted:function(){var e=this;this.$http.get("/get-orders").then((function(t){e.setOrders(t.body),console.log(t.body),console.log(e.orders)}))}},E=U,F=Object(g["a"])(E,s,u,!1,null,null,null),$=F.exports;n["default"].config.productionTip=!1,n["default"].use(o["a"]),n["default"].use(a.a),new n["default"]({store:d,render:function(e){return e($)}}).$mount("#app")}});
//# sourceMappingURL=app.12dd4427.js.map