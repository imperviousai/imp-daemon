(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2],{61704:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/d/files",function(){return n(7205)}])},10668:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(85893),a=n(67294),i=n(30471),s=n(11355),o=n(13342);function l(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}function c(e){var t=e.title,n=e.options;return(0,r.jsxs)(i.v,{as:"div",className:"relative inline-block text-left px-2",children:[(0,r.jsx)("div",{children:(0,r.jsxs)(i.v.Button,{className:"inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500",children:[t,(0,r.jsx)(o.Z,{className:"-mr-1 ml-2 h-5 w-5","aria-hidden":"true"})]})}),(0,r.jsx)(s.u,{as:a.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,r.jsx)(i.v.Items,{className:"origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",children:(0,r.jsx)("div",{className:"py-1",children:n.map((function(e,t){return(0,r.jsx)(i.v.Item,{children:function(t){var n=t.active;return(0,r.jsx)("a",{href:"#",className:l(n?"bg-gray-100 text-gray-900":"text-gray-700","block px-4 py-2 text-sm"),children:e.title})}},t)}))})})})]})}},7135:function(e,t,n){"use strict";n.d(t,{BR:function(){return s},kR:function(){return o}});var r=n(88767),a=n(40782),i=n(40874),s=function(e,t){return(0,r.useQuery)("fetch-files",i.uB,{onSuccess:function(t){e(t)},onError:function(e){a.Am.error("Unable to fetch files. Please try again."),console.log("Unable to fetch files. Error: ",e),t()}})},o=function(e,t){var n=(0,r.useQueryClient)();return(0,r.useMutation)(i.cT,{onSuccess:function(){e(),n.invalidateQueries("fetch-files")},onError:function(e){console.log("Error uploading file: ",e),t()}})}},7205:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(35666),a=n.n(r),i=n(85893),s=n(67294),o=n(10668),l=n(60758),c=n(65502),d=n(40782),u=n(7135),f=n(40874),x=n(41664);function m(e,t,n,r,a,i,s){try{var o=e[i](s),l=o.value}catch(c){return void n(c)}o.done?t(l):Promise.resolve(l).then(r,a)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function s(e){m(i,r,a,s,o,"next",e)}function o(e){m(i,r,a,s,o,"throw",e)}s(void 0)}))}}function h(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var g="IPFS",v=[{title:"Newest"},{title:"Oldest"}],y=[{title:"All Files"},{title:"Audio"},{title:"Video"},{title:"Text"}];function w(e,t){var n=void 0===t?2:t;if(0===e)return"0 Bytes";var r=n<0?0:n,a=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,a)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][a]}function j(){var e,t=(0,s.useState)(),n=t[0],r=t[1],m=(0,s.useState)([]),j=m[0],b=m[1],N=((0,u.BR)((function(e){b([]),null===e||void 0===e||e.data.files.forEach((function(e){e=e.split("/")[2],(0,f._t)(e).then(p(a().mark((function t(n){var r,i;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=atob(n.data.data),t.next=3,(0,f.oy)(r,e);case 3:i=t.sent,console.log(i),i&&b((function(e){return h(e).concat([i])}));case 6:case"end":return t.stop()}}),t)}))))}))})).data,(0,u.kR)((function(){d.Am.success("File uploaded!"),r()}),(function(){return d.Am.error("Error uploading file. Please try again later.")})).mutate),k=p(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n?N(n):d.Am.error("No file selected. Please select a file to upload to IPFS.");case 1:case"end":return e.stop()}}),e)})));return(0,i.jsx)(l.Z,{currentPage:g,hideNav:!1,children:(0,i.jsxs)("div",{className:"px-8 pt-8",children:[(0,i.jsxs)("div",{className:"flex flex-row-reverse pb-8",children:[(0,i.jsx)(o.Z,{title:"Sort By: Newest",options:v}),(0,i.jsx)(o.Z,{title:"All Files",options:y})]}),(0,i.jsxs)("div",{className:"pb-4",children:[(0,i.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Upload a new file"}),(0,i.jsx)("div",{className:"mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",children:n?(e=n,(0,i.jsxs)("div",{className:"space-y-1 text-center",children:[(0,i.jsx)(c.Z,{className:"mx-auto h-12 w-12 text-gray-400"}),(0,i.jsxs)("div",{className:"flex flex-col text-md text-gray-600",children:[(0,i.jsxs)("div",{children:[e.name," (",w(e.size),")"]}),(0,i.jsxs)("div",{className:"flex space-x-4 pt-4",children:[(0,i.jsx)("button",{type:"button",onClick:function(){return r(void 0)},className:"inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"}),(0,i.jsx)("button",{type:"button",onClick:p(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Upload to IPFS"})]})]})]})):(0,i.jsxs)("div",{className:"space-y-1 text-center",children:[(0,i.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",stroke:"currentColor",fill:"none",viewBox:"0 0 48 48","aria-hidden":"true",children:(0,i.jsx)("path",{d:"M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})}),(0,i.jsxs)("div",{className:"flex text-sm text-gray-600",children:[(0,i.jsxs)("label",{htmlFor:"file-upload",className:"relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500",children:[(0,i.jsx)("span",{children:"Upload a file"}),(0,i.jsx)("input",{id:"file-upload",name:"file-upload",type:"file",className:"sr-only",onChange:function(e){return e.target.files&&r(e.target.files[0])}})]}),(0,i.jsx)("p",{className:"pl-1",children:"or drag and drop"})]}),(0,i.jsx)("p",{className:"text-xs text-gray-500",children:"Files may take awhile to upload"})]})})]}),(0,i.jsx)("div",{className:"flex flex-col",children:(0,i.jsx)("div",{className:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,i.jsx)("div",{className:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8",children:(0,i.jsx)("div",{className:"shadow overflow-hidden border-b border-gray-200 sm:rounded-lg",children:(0,i.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,i.jsx)("thead",{className:"bg-gray-50",children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider",children:"Name"}),(0,i.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider",children:"Type"}),(0,i.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider",children:"Address"}),(0,i.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider",children:"Date"}),(0,i.jsx)("th",{scope:"col",className:"relative px-6 py-3",children:(0,i.jsx)("span",{className:"sr-only",children:"Edit"})})]})}),(0,i.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:j.length>0&&j.map((function(e,t){return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsx)("div",{className:"ml-4",children:(0,i.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e&&e.name})})})}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsx)("div",{className:"text-sm text-gray-900",children:e&&e.type})}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsx)("div",{className:"text-sm text-gray-900",children:e&&e.name})}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,i.jsx)("span",{className:"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800",children:"Status"})}),(0,i.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:(0,i.jsx)(x.default,{href:"/d/files/".concat(e&&e.name),passHref:!0,children:(0,i.jsx)("a",{href:"",className:"text-gray-600 hover:text-gray-900",children:"View"})})})]},t)}))})]})})})})})]})})}},40874:function(e,t,n){"use strict";n.d(t,{uB:function(){return u},cT:function(){return f},_t:function(){return x},oy:function(){return m}});var r=n(35666),a=n.n(r),i=n(49695),s=n(21245),o=n(47193),l=n(48764).Buffer;function c(e,t,n,r,a,i,s){try{var o=e[i](s),l=o.value}catch(c){return void n(c)}o.done?t(l):Promise.resolve(l).then(r,a)}var d,u=function(){return(0,i.W)({url:"/v1/ipfs/list",method:"get",headers:{"Grpc-Metadata-X-API-KEY":"".concat((0,o.P)())}})},f=function(e){var t=new window.FileReader;t.readAsArrayBuffer(e),t.onloadend=function(){var n=btoa(l(t.result)),r={name:e.name,data:n,updatable:!1};return(0,i.W)({url:"/v1/ipfs/add",method:"post",data:r,headers:{"Grpc-Metadata-X-API-KEY":"".concat((0,o.P)())}})}},x=function(e){return(0,i.W)({url:"/v1/ipfs/".concat(e),method:"get",headers:{"Grpc-Metadata-X-API-KEY":"".concat((0,o.P)())}})},m=(d=a().mark((function e(t,n){var r,i,o,l,c,d,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.substring(0,20).includes("<!DOCTYPE html>")){e.next=3;break}return r=new File([t],n,{type:"text/html"}),e.abrupt("return",r);case 3:for(i=t.split(","),o=new Uint8Array(i.length),l=0;l<i.length;l++)o[l]=i[l];return e.next=8,(0,s.pM)(o);case 8:if(!(c=e.sent)){e.next=13;break}return console.log("FILETYPE: ",c),d=new File([o],n,{type:c?c.mime:""}),e.abrupt("return",d);case 13:return u=new File([t],n,{type:"text/plain"}),e.abrupt("return",u);case 15:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(n,r){var a=d.apply(e,t);function i(e){c(a,n,r,i,s,"next",e)}function s(e){c(a,n,r,i,s,"throw",e)}i(void 0)}))})},13342:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"}))}));t.Z=a},65502:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",clipRule:"evenodd"}))}));t.Z=a}},function(e){e.O(0,[774,445,13,270,905,245,758,888,179],(function(){return t=61704,e(e.s=t);var t}));var t=e.O();_N_E=t}]);