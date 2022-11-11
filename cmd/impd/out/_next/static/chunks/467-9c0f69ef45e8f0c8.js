"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[467],{46215:function(e,t,n){var r=n(85893),s=n(67294),a=n(6828),i=n(71722),c=n(24796),o=n(6218),l=n(46249),d=n(85528);function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){u(e,t,n[t])}))}return e}t.Z=function(e){var t=e.contact,n=(0,s.useState)(!1),u=n[0],x=n[1],f=(0,s.useState)({}),h=f[0],g=f[1],p=(0,o.ZK)(b,j).mutate,v=(0,l.nk)().mutate,y=(0,l.OX)().data,b=function(){return toast.success("Avatar saved!")},j=function(){return toast.error("Error saving avatar. Please try again later.")};(0,s.useEffect)((function(){g(t?JSON.parse(t.metadata).avatar:y?JSON.parse(y):m({},(0,c.nS)()))}),[t,y]);var N=function(){return(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)(a.nQ,m({},h,{className:"h-32 w-full object-cover lg:h-48"})),(0,r.jsx)("button",{type:"button",onClick:function(){return x(!0),void g(m({},(0,c.nS)()))},className:"pt-2",children:(0,r.jsx)(i.Z,{className:"-ml-1 mr-2 h-6 w-6 text-gray-900","aria-hidden":"true"})}),u&&(0,r.jsxs)("div",{className:"flex space-x-2 pt-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){return x(!1),void g(y)},className:"inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"}),(0,r.jsx)("button",{type:"button",onClick:function(){return t?p({existingContact:t,avatar:h}):v({key:"myAvatar",value:JSON.stringify(h)}),void x(!1)},className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Save"})]})]})};return t?(0,r.jsx)(r.Fragment,{children:JSON.parse(t.metadata).username?(0,r.jsx)(d.Z,{contact:t,className:"h-32 object-cover lg:h-48"}):(0,r.jsx)(N,{})}):(0,r.jsx)(N,{})}},84152:function(e,t,n){var r=n(85893),s=n(56141),a=n(19965),i=n(67294),c=n(6218);t.Z=function(e){var t=e.did,n=e.asMenuItem,o=(0,i.useState)(!1),l=o[0],d=o[1],u=(0,c.JA)().data,m=(0,c.ir)().mutate;(0,i.useEffect)((function(){u&&d(null===u||void 0===u?void 0:u.includes(t))}),[u,t]);var x=function(){var e=u;e||(e=[]),e.push(t),m({key:"blocklist",value:JSON.stringify(e)})},f=function(){var e=u.filter((function(e){return e!==t}));m({key:"blocklist",value:JSON.stringify(e)})};return(0,r.jsx)(r.Fragment,{children:n?(0,r.jsx)(r.Fragment,{children:l?(0,r.jsx)("div",{className:"w-full flex items-center ml-2",onClick:function(){return f()},children:(0,r.jsx)("p",{className:"text-gray-900 px-2 py-2 text-sm",children:"Unlock"})}):(0,r.jsx)("div",{className:"w-full flex items-center ml-2",onClick:function(){return x()},children:(0,r.jsx)("p",{className:"text-red-700 px-2 py-2 text-sm",children:"Block"})})}):(0,r.jsx)(r.Fragment,{children:l?(0,r.jsxs)("button",{type:"button",onClick:function(){return f()},className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[(0,r.jsx)(s.Z,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),"Unblock"]}):(0,r.jsxs)("button",{type:"button",onClick:function(){return x()},className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[(0,r.jsx)(a.Z,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),"Block"]})})})}},14887:function(e,t,n){var r=n(85893),s=n(67294);t.Z=function(e){var t=e.contact,n=e.className,a=(0,s.useState)(),i=a[0],c=a[1];return(0,s.useEffect)((function(){if(t){var e=JSON.parse(t.metadata).username;c(e)}}),[t]),(0,r.jsxs)(r.Fragment,{children:[i&&(0,r.jsx)("svg",{className:n,"aria-hidden":"true",focusable:"false","data-prefix":"fab","data-icon":"twitter",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:(0,r.jsx)("path",{fill:"#1D9BF0",d:"M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"})})," "]})}},96467:function(e,t,n){n.r(t),n.d(t,{ContactView:function(){return J},default:function(){return P}});var r=n(85893),s=n(67294),a=n(69641),i=n(36388),c=n(69065),o=n(33772),l=n(14898),d=n(33740),u=n(94323),m=n(40782),x=n(74855),f=n(41854),h=n(6218),g=n(60758),p=n(85528);var v=function(e){var t=e.contact,n=e.className,s=JSON.parse(t.metadata).username;return(0,r.jsxs)(r.Fragment,{children:[s&&(0,r.jsxs)("a",{className:n,target:"_blank",rel:"noreferrer",href:"https://twitter.com/".concat(s),children:["@",s]})," "]})},y=n(14887),b=n(46215),j=n(84152),N=n(61751),w=n(46249),C=n(20567),k=n(73210),S=n(11163),O=n(43101),Z=n(91131);function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,s=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(o){s=!0,a=o}finally{try{r||null==c.return||c.return()}finally{if(s)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function F(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var D=[{name:"Contact Info",href:"#",current:!0}];function E(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}var J=function(e){var t=e.selectedContact,n=e.setOpenAddContactForm,c=e.setSelectedContact,u=e.nickname,g=(0,s.useState)(!1),p=g[0],y=g[1],J=(0,s.useState)(),P=J[0],U=J[1],T=(0,h.jO)().mutate,B=(0,h.ff)().data,z=(0,w.LU)().data,I=(0,h.JA)().data,_=(0,k.p)().data,K=(0,N.mA)({myDid:z,contacts:null===B||void 0===B?void 0:B.data.contacts,blocklist:I,settings:_}).data,L=(0,S.useRouter)(),H=A((0,Z.KO)(O.w5),2)[1],M=A((0,Z.KO)(O.PF),2)[1],q=function(){m.Am.success("Contact successfully deleted!"),c&&c("")},Q=function(e){m.Am.error("Failed to delete contact. Please try again."),console.log("Failed to delete contact. Error: ",e)};return(0,r.jsxs)("article",{children:[(0,r.jsx)(f.Z,{open:p,setOpen:y,existingContact:null,defaultDid:P,defaultName:u}),(0,r.jsxs)("div",{children:["Unknown"===(null===t||void 0===t?void 0:t.name)&&(0,r.jsx)("div",{className:"rounded-md bg-green-50 p-4",children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)(o.Z,{className:"h-5 w-5 text-green-400","aria-hidden":"true"})}),(0,r.jsxs)("div",{className:"ml-3",children:[(0,r.jsx)("h3",{className:"text-sm font-medium text-green-800",children:"Unknown contact"}),(0,r.jsx)("div",{className:"mt-2 text-sm text-green-700",children:(0,r.jsx)("p",{children:"You do not have this contact saved and is unknown. Do you want to save this contact?"})}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)("div",{className:"-mx-2 -my-1.5 flex",children:(0,r.jsx)("button",{type:"button",onClick:function(){return function(){var e=K.conversations.find((function(e){return e.messages.find((function(e){return(0,C.Ho)(e.data.from)===t.did}))}));if(e){var n=e.messages.find((function(e){return(0,C.Ho)(e.data.from)===t.did})).data.from;n&&(U(n),y(!0))}}()},className:"rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50",children:"Save Contact"})})})]})]})}),(0,r.jsx)("div",{className:"pb-12 flex flex-col items-center mt-8 ",children:(0,r.jsx)(b.Z,{contact:t})}),(0,r.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsx)("div",{className:"-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5",children:(0,r.jsx)("div",{className:"mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 flex flex-col",children:(0,r.jsx)("div",{className:"sm:hidden 2xl:block mt-6 min-w-0 flex-1",children:(0,r.jsx)("div",{className:"text-2xl font-bold text-gray-900 truncate",children:null===t||void 0===t?void 0:t.name})})})})})]}),(0,r.jsxs)("div",{className:"flex items-center justify-center space-x-4 pt-2",children:[(0,r.jsxs)("button",{type:"button",onClick:function(){return H(t),void L.push("/d/chat")},className:"inline-flex items-center px-2.5 py-1.5 shadow-sm text-xs font-medium rounded text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:[(0,r.jsx)(a.Z,{className:"-ml-1 mr-2 h-5 w-5 text-white","aria-hidden":"true"}),"Chat"]}),(0,r.jsxs)("button",{type:"button",onClick:function(){return M((function(e){return F(e).concat([t])})),void L.push("/d/meeting")},className:"inline-flex items-center px-2.5 py-1.5 shadow-sm text-xs font-medium rounded text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:[(0,r.jsx)(i.Z,{className:"-ml-1 mr-2 h-5 w-5 text-white","aria-hidden":"true"}),"Call"]})]}),(0,r.jsx)("div",{className:"mt-6 sm:mt-2 2xl:mt-5",children:(0,r.jsx)("div",{className:"border-b border-gray-200",children:(0,r.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsx)("nav",{className:"-mb-px flex space-x-8","aria-label":"Tabs",children:D.map((function(e){return(0,r.jsx)("a",{href:e.href,className:E(e.current?"border-pink-500 text-gray-900":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"),"aria-current":e.current?"page":void 0,children:e.name},e.name)}))})})})}),(0,r.jsx)("div",{className:"mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("dl",{className:"grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2",children:[(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"Name"}),(0,r.jsx)(x.CopyToClipboard,{text:t.name,onCopy:function(){return m.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:t.name})})]}),(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-xs font-medium text-gray-500",children:"DID"}),(0,r.jsx)(x.CopyToClipboard,{text:t.did,onCopy:function(){return m.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-xs text-gray-900 hover:bg-gray-50",children:t.did})})]}),JSON.parse(t.metadata).username&&(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"Twitter"}),(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:(0,r.jsx)(v,{contact:t,className:"text-blue-500 font-medium"})})]}),(0,r.jsx)("br",{})]})}),(0,r.jsx)("div",{className:"relative pb-8",children:(0,r.jsx)("div",{className:"absolute inset-0 flex items-center pt-6","aria-hidden":"true",children:(0,r.jsx)("div",{className:"w-full border-t border-gray-300"})})}),(0,r.jsxs)("div",{className:"pt-4 pl-16 flex space-x-4",children:[(0,r.jsx)(j.Z,{did:t.did}),"Unknown"!==(null===t||void 0===t?void 0:t.name)&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("button",{type:"button",onClick:function(){return n(!0)},className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[(0,r.jsx)(l.Z,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),"Edit"]}),(0,r.jsxs)("button",{type:"button",onClick:function(){return e=t,void(0,m.Am)((function(t){var n=t.closeToast;return(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"pb-4",children:"Delete this contact?"}),(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){T(e.id,{onSuccess:q,onError:Q}),n()},className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Delete"}),(0,r.jsx)("button",{type:"button",onClick:n,className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})]})]})}),{autoClose:!1});var e},className:"inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg--50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:[(0,r.jsx)(d.Z,{className:"-ml-1 mr-2 h-5 w-5 text-red-400","aria-hidden":"true"}),"Delete"]})]})]})]})};function P(){var e=(0,s.useState)(!1),t=(e[0],e[1]),n=(0,s.useState)([]),a=n[0],i=n[1],o=(0,s.useState)(""),l=o[0],d=o[1],m=(0,s.useState)(!1),x=m[0],v=m[1],b=(0,h.ff)().data;return(0,s.useEffect)((function(){if(b){var e="abcdefghijklmnopqrstuvwxyz1234567890".split("").map((function(e){return b.data.contacts.filter((function(t){return("@"===t.name.charAt(0)?t.name.substring(1,t.name.length):t.name)[0].toLowerCase()===e.toLowerCase()}))})).filter((function(e){return e.length>0}));i(e)}}),[b]),(0,r.jsx)(g.Z,{currentPage:"Contacts",children:(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"h-full flex z-0",children:[(0,r.jsx)(f.Z,{open:x,setOpen:v,existingContact:l}),(0,r.jsxs)("div",{className:"flex flex-col min-w-0 flex-1 overflow-hidden",children:[(0,r.jsx)("div",{className:"lg:hidden",children:(0,r.jsx)("div",{className:"flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5",children:(0,r.jsx)("div",{children:(0,r.jsxs)("button",{type:"button",className:"-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",onClick:function(){return t(!0)},children:[(0,r.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,r.jsx)(c.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})})}),(0,r.jsxs)("div",{className:"flex-1 relative z-0 flex overflow-hidden",children:[(0,r.jsxs)("main",{className:"flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last",children:[(0,r.jsx)("nav",{className:"flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden","aria-label":"Breadcrumb",children:(0,r.jsxs)("a",{href:"#",className:"inline-flex items-center space-x-3 text-sm font-medium text-gray-900",children:[(0,r.jsx)(u.Z,{className:"-ml-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),(0,r.jsx)("span",{children:"Directory"})]})}),l&&(0,r.jsx)(J,{selectedContact:l,setOpenAddContactForm:v,setSelectedContact:d})]}),(0,r.jsxs)("aside",{className:"hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-80 border-r border-gray-200",children:[(0,r.jsxs)("div",{className:"px-6 pt-6 pb-4",children:[(0,r.jsxs)("h2",{className:"text-lg font-medium text-gray-900",children:["Directory (",null===b||void 0===b?void 0:b.data.contacts.length,")"]}),(0,r.jsx)("p",{className:"mt-1 text-sm text-gray-600",children:"Search contacts below"})]}),(0,r.jsx)("nav",{className:"flex-1 min-h-0 overflow-y-auto","aria-label":"Directory",children:a&&a.map((function(e,t){return(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("div",{className:"sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500",children:(0,r.jsx)("h3",{children:"@"===e[0].name[0]?e[0].name[1].toUpperCase():e[0].name[0].toUpperCase()})}),(0,r.jsx)("ul",{role:"list",className:"relative divide-y divide-gray-200",children:e.map((function(e,t){return(0,r.jsx)("li",{onClick:function(){return d(e)},children:(0,r.jsxs)("div",{className:"relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)(p.Z,{contact:e,className:"h-10 w-10"})}),(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsxs)("div",{className:"focus:outline-none",children:[(0,r.jsx)("span",{className:"absolute inset-0","aria-hidden":"true"}),(0,r.jsxs)("span",{className:"flex items-center space-x-2",children:[(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,r.jsx)(y.Z,{contact:e,className:"h-4 w-4"})]}),(0,r.jsx)("p",{className:"text-sm text-gray-500 truncate",children:e.did})]})})]})},t)}))})]},t)}))})]})]})]})]})})})}}}]);