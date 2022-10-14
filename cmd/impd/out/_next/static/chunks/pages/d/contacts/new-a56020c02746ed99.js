(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[679],{35714:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/d/contacts/new",function(){return n(22849)}])},5676:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893);function i(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"min-h-full pt-16 pb-12 flex flex-col",children:(0,r.jsxs)("main",{className:"flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8",children:[(0,r.jsx)("div",{className:"flex-shrink-0 flex justify-center"}),(0,r.jsx)("div",{className:"py-16",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("p",{className:"text-sm font-semibold text-red-600 uppercase tracking-wide",children:"Stay Tuned"}),(0,r.jsx)("h1",{className:"mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl",children:"Coming Soon."}),(0,r.jsx)("p",{className:"mt-2 text-base text-gray-500",children:"Trust us, we are excited about it too. We are working on it and it will be released soon."})]})})]})})})}},22849:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(85893),i=n(3576),s=n(5676),a=n(67294),o=n(65502),l=n(40782),c=n(20567),d=n(90387);function u(){var e=function(e,t){var n=void 0===t?2:t;if(0===e)return"0 Bytes";var r=n<0?0:n,i=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,i)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][i]},t=(0,a.useState)(),n=t[0],u=t[1],m=(0,d.useRouter)().query.id;(0,a.useEffect)((function(){m&&(0,c.wK)().then((function(e){var t=e.data.documents.map((function(e){return JSON.parse(e)})).find((function(e){return e.id===m}));t&&(u(t),y(JSON.stringify(t)),_(JSON.stringify(t)))})).catch((function(e){return console.log(e)}))}),[u,m,_]);var x,f=(0,a.useState)(),h=f[0],g=f[1],p=(0,a.useState)(""),v=p[0],y=p[1],b=(0,a.useState)(),j=b[0],w=b[1],N=(0,a.useState)("raw"),k=N[0],C=N[1],S=function(e){return!(!e.type&&!e.id)},B=function(e){if(e.type&&"text/plain"!==e.type)return l.Am.error("Invalid File Type. Must be a text file."),void g(void 0);g(e);var t=new FileReader;t.onloadend=function(e){!function(t){try{var n=JSON.parse(t);if(!S(n))throw"Object is not formatted correctly";y(JSON.stringify(n)),w(!0)}catch(e){w(!1),g(void 0),l.Am.error("Uh oh! Input isn't formatted correctly. Please try again with a new file.")}}(e.target.result)},t.readAsText(e)},_=(0,a.useCallback)((function(e){y(e);try{var t=JSON.parse(e);S(t)?w(!0):w(!1)}catch(n){return void w(!1)}}),[]);return(0,r.jsx)(i.Z,{hideNav:!1,currentPage:"",children:(0,r.jsxs)("div",{className:"px-8 pt-8 flex flex-col space-y-6 2xl:mx-64",children:[!0===j&&(0,r.jsxs)("div",{className:"self-end flex",children:[(0,r.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 mr-6 ",children:"Contact is formatted correctly!"}),(0,r.jsx)("button",{type:"button",disabled:!0!==j,onClick:function(){return function(e){var t=JSON.parse(e);t.id&&(0,c.H5)(e).then((function(e){l.Am.success("Document imported successfully!"),y(""),g(void 0),console.log("Document successfully imported",e)})).catch((function(e){l.Am.error("Error importing contact. Please try again."),console.log(e)})),t.type&&(0,c.cv)(e).then((function(e){l.Am.success("Document saved successfully!"),y(""),g(void 0),console.log("Document successfully saved",e)})).catch((function(e){l.Am.error("Error saving contact. Please try again."),console.log(e)}))}(v)},className:"inline-flex items-center px-4 py-2 ml-4border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:n?"Update Contact":"Save Contact"})]}),(0,r.jsx)("div",{className:"self-center",children:(0,r.jsxs)("span",{className:"relative z-0 inline-flex shadow-sm rounded-md space-x-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){return C("raw")},className:"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 ".concat("raw"===k?"bg-indigo-500 text-white":"bg-white text-gray-700 "," text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"),children:"Add New Contact/DID"}),(0,r.jsx)("button",{type:"button",onClick:function(){return C("editor")},className:"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 ".concat("editor"===k?"bg-indigo-500 text-white":"bg-white text-gray-700"," text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"),children:"DID Creator"})]})}),"raw"===k&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"block text-lg font-medium text-gray-700",children:"Upload a Decentralized Identity"}),(0,r.jsx)("div",{className:"mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",children:h?(x=h,(0,r.jsxs)("div",{className:"space-y-1 text-center",children:[(0,r.jsx)(o.Z,{className:"mx-auto h-12 w-12 text-gray-400"}),j&&(0,r.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800",children:"Valid"}),(0,r.jsxs)("div",{className:"flex flex-col text-md text-gray-600",children:[(0,r.jsxs)("div",{children:[x.name," (",e(x.size),")"]}),(0,r.jsx)("div",{className:"pt-4",children:(0,r.jsx)("button",{type:"button",onClick:function(){return g(void 0)},className:"inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})})]})]})):(0,r.jsxs)("div",{className:"space-y-1 text-center",children:[(0,r.jsx)("svg",{className:"mx-auto h-12 w-12 text-gray-400",stroke:"currentColor",fill:"none",viewBox:"0 0 48 48","aria-hidden":"true",children:(0,r.jsx)("path",{d:"M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})}),(0,r.jsxs)("div",{className:"flex text-sm text-gray-600",children:[(0,r.jsxs)("label",{htmlFor:"file-upload",className:"relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500",children:[(0,r.jsx)("span",{children:"Upload a file"}),(0,r.jsx)("input",{id:"file-upload",name:"file-upload",type:"file",className:"sr-only",onChange:function(e){e.target.files&&B(e.target.files[0])}})]}),(0,r.jsx)("p",{className:"pl-1",children:"or drag and drop"})]}),(0,r.jsx)("p",{className:"text-xs text-gray-500",children:"Files may take awhile to upload"})]})})]}),(0,r.jsx)("div",{className:"relative",children:(0,r.jsx)("div",{className:"absolute inset-0 flex items-center","aria-hidden":"true",children:(0,r.jsx)("div",{className:"w-full border-t border-gray-300"})})}),(0,r.jsx)("div",{children:(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"comment",className:"block text-lg font-medium text-gray-700",children:"Paste a Decentralized Identity"}),(0,r.jsx)("div",{className:"mt-1",children:(0,r.jsx)("textarea",{rows:4,name:"did",id:"did",className:"shadow-sm ".concat(!0===j?"border-green-500 border-2":"border-gray-300","  block w-full sm:text-sm rounded-md h-80"),value:v,onChange:function(e){return _(e.target.value)},disabled:h})})]})})]}),"editor"===k&&(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(s.Z,{})})]})})}},65502:function(e,t,n){"use strict";var r=n(67294);const i=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",clipRule:"evenodd"}))}));t.Z=i}},function(e){e.O(0,[774,445,13,723,576,888,179],(function(){return t=35714,e(e.s=t);var t}));var t=e.O();_N_E=t}]);