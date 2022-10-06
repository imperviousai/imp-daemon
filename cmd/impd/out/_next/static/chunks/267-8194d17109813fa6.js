"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[267],{46215:function(e,t,s){var r=s(85893),n=s(67294),a=s(6828),i=s(71722),c=s(24796),l=s(6218),o=s(46249),d=s(85528);function x(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function m(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{},r=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(s).filter((function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable})))),r.forEach((function(t){x(e,t,s[t])}))}return e}t.Z=function(e){var t=e.contact,s=(0,n.useState)(!1),x=s[0],u=s[1],f=(0,n.useState)({}),h=f[0],g=f[1],p=(0,l.ZK)(v,y).mutate,j=(0,o.nk)().mutate,b=(0,o.OX)().data,v=function(){return toast.success("Avatar saved!")},y=function(){return toast.error("Error saving avatar. Please try again later.")};(0,n.useEffect)((function(){g(t?JSON.parse(t.metadata).avatar:b?JSON.parse(b):m({},(0,c.nS)()))}),[t,b]);var N=function(){return(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)(a.nQ,m({},h,{className:"h-32 w-full object-cover lg:h-48"})),(0,r.jsx)("button",{type:"button",onClick:function(){return u(!0),void g(m({},(0,c.nS)()))},className:"pt-2",children:(0,r.jsx)(i.Z,{className:"-ml-1 mr-2 h-6 w-6 text-gray-900","aria-hidden":"true"})}),x&&(0,r.jsxs)("div",{className:"flex space-x-2 pt-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){return u(!1),void g(b)},className:"inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"}),(0,r.jsx)("button",{type:"button",onClick:function(){return t?p({existingContact:t,avatar:h}):j({key:"myAvatar",value:JSON.stringify(h)}),void u(!1)},className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Save"})]})]})};return t?(0,r.jsx)(r.Fragment,{children:JSON.parse(t.metadata).twitterUsername?(0,r.jsx)(d.Z,{contact:t,className:"h-32 object-cover lg:h-48 pt-5"}):(0,r.jsx)(N,{})}):(0,r.jsx)(N,{})}},10267:function(e,t,s){s.r(t),s.d(t,{ContactView:function(){return v},default:function(){return y}});var r=s(85893),n=s(67294),a=s(69065),i=s(14898),c=s(33740),l=s(94323),o=s(40782),d=s(74855),x=s(41854),m=s(6218),u=s(11240),f=s(85528);var h=function(e){var t=e.contact,s=e.className,n=JSON.parse(t.metadata).twitterUsername;return(0,r.jsxs)(r.Fragment,{children:[n&&(0,r.jsxs)("a",{className:s,target:"_blank",rel:"noreferrer",href:"https://twitter.com/".concat(n),children:["@",n]})," "]})};var g=function(e){var t=e.contact,s=e.className,n=JSON.parse(t.metadata).twitterUsername;return(0,r.jsxs)(r.Fragment,{children:[n&&(0,r.jsx)("svg",{className:s,"aria-hidden":"true",focusable:"false","data-prefix":"fab","data-icon":"twitter",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",children:(0,r.jsx)("path",{fill:"#1D9BF0",d:"M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"})})," "]})},p=s(46215),j=[{name:"Contact Info",href:"#",current:!0}];function b(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.filter(Boolean).join(" ")}var v=function(e){var t=e.selectedContact,s=e.setOpenAddContactForm,n=e.setSelectedContact,a=(0,m.jO)().mutate,l=function(){o.Am.success("Contact successfully deleted!"),n("")},x=function(e){o.Am.error("Failed to delete contact. Please try again."),console.log("Failed to delete contact. Error: ",e)};return(0,r.jsxs)("article",{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"pb-12 flex flex-col items-center mt-8 ",children:(0,r.jsx)(p.Z,{contact:t})}),(0,r.jsxs)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,r.jsx)("div",{className:"-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5",children:(0,r.jsx)("div",{className:"mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 flex flex-col",children:(0,r.jsx)("div",{className:"sm:hidden 2xl:block mt-6 min-w-0 flex-1",children:(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900 truncate",children:t&&t.name})})})}),(0,r.jsx)("div",{className:"hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1",children:(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900 truncate",children:t.name})})]})]}),(0,r.jsx)("div",{className:"mt-6 sm:mt-2 2xl:mt-5",children:(0,r.jsx)("div",{className:"border-b border-gray-200",children:(0,r.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsx)("nav",{className:"-mb-px flex space-x-8","aria-label":"Tabs",children:j.map((function(e){return(0,r.jsx)("a",{href:e.href,className:b(e.current?"border-pink-500 text-gray-900":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"),"aria-current":e.current?"page":void 0,children:e.name},e.name)}))})})})}),(0,r.jsx)("div",{className:"mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("dl",{className:"grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2",children:[(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"Name"}),(0,r.jsx)(d.CopyToClipboard,{text:t.name,onCopy:function(){return o.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:t.name})})]}),(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-xs font-medium text-gray-500",children:"DID"}),(0,r.jsx)(d.CopyToClipboard,{text:t.did,onCopy:function(){return o.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-xs text-gray-900 hover:bg-gray-50",children:t.did})})]}),JSON.parse(t.metadata).twitterUsername&&(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"Twitter"}),(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:(0,r.jsx)(h,{contact:t,className:"text-blue-500 font-medium"})})]}),(0,r.jsx)("br",{})]})}),(0,r.jsx)("div",{className:"relative pb-8",children:(0,r.jsx)("div",{className:"absolute inset-0 flex items-center pt-6","aria-hidden":"true",children:(0,r.jsx)("div",{className:"w-full border-t border-gray-300"})})}),(0,r.jsxs)("div",{className:"pt-4 pl-16 flex space-x-4",children:[(0,r.jsxs)("button",{type:"button",onClick:function(){return s(!0)},className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[(0,r.jsx)(i.Z,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),"Edit"]}),(0,r.jsxs)("button",{type:"button",onClick:function(){return e=t,void(0,o.Am)((function(t){var s=t.closeToast;return(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"pb-4",children:"Delete this contact?"}),(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){a(e.id,{onSuccess:l,onError:x}),s()},className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Delete"}),(0,r.jsx)("button",{type:"button",onClick:s,className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})]})]})}),{autoClose:!1});var e},className:"inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:[(0,r.jsx)(c.Z,{className:"-ml-1 mr-2 h-5 w-5 text-red-400","aria-hidden":"true"}),"Delete"]})]})]})};function y(){var e=(0,n.useState)(!1),t=(e[0],e[1]),s=(0,n.useState)([]),i=s[0],c=s[1],o=(0,n.useState)(""),d=o[0],h=o[1],p=(0,n.useState)(!1),j=p[0],b=p[1],y=(0,m.ff)().data;return(0,n.useEffect)((function(){if(y){var e="abcdefghijklmnopqrstuvwxyz1234567890".split("").map((function(e){return y.data.contacts.filter((function(t){return t.name[0].toLowerCase()===e.toLowerCase()}))})).filter((function(e){return e.length>0}));c(e)}}),[y]),(0,r.jsx)(u.Z,{currentPage:"Contacts",children:(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"h-full flex z-0",children:[(0,r.jsx)(x.Z,{open:j,setOpen:b,existingContact:d}),(0,r.jsxs)("div",{className:"flex flex-col min-w-0 flex-1 overflow-hidden",children:[(0,r.jsx)("div",{className:"lg:hidden",children:(0,r.jsx)("div",{className:"flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5",children:(0,r.jsx)("div",{children:(0,r.jsxs)("button",{type:"button",className:"-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",onClick:function(){return t(!0)},children:[(0,r.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,r.jsx)(a.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})})}),(0,r.jsxs)("div",{className:"flex-1 relative z-0 flex overflow-hidden",children:[(0,r.jsxs)("main",{className:"flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last",children:[(0,r.jsx)("nav",{className:"flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden","aria-label":"Breadcrumb",children:(0,r.jsxs)("a",{href:"#",className:"inline-flex items-center space-x-3 text-sm font-medium text-gray-900",children:[(0,r.jsx)(l.Z,{className:"-ml-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),(0,r.jsx)("span",{children:"Directory"})]})}),d&&(0,r.jsx)(v,{selectedContact:d,setOpenAddContactForm:b,setSelectedContact:h})]}),(0,r.jsxs)("aside",{className:"hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-80 border-r border-gray-200",children:[(0,r.jsxs)("div",{className:"px-6 pt-6 pb-4",children:[(0,r.jsxs)("h2",{className:"text-lg font-medium text-gray-900",children:["Directory (",null===y||void 0===y?void 0:y.data.contacts.length,")"]}),(0,r.jsx)("p",{className:"mt-1 text-sm text-gray-600",children:"Search contacts below"})]}),(0,r.jsx)("nav",{className:"flex-1 min-h-0 overflow-y-auto","aria-label":"Directory",children:i&&i.map((function(e,t){return(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("div",{className:"sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500",children:(0,r.jsx)("h3",{children:e[0].name[0].toUpperCase()})}),(0,r.jsx)("ul",{role:"list",className:"relative divide-y divide-gray-200",children:e.map((function(e,t){return(0,r.jsx)("li",{onClick:function(){return h(e)},children:(0,r.jsxs)("div",{className:"relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)(f.Z,{contact:e,className:"h-10 w-10"})}),(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsxs)("div",{className:"focus:outline-none",children:[(0,r.jsx)("span",{className:"absolute inset-0","aria-hidden":"true"}),(0,r.jsxs)("span",{className:"flex items-center space-x-2",children:[(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,r.jsx)(g,{contact:e,className:"h-4 w-4"})]}),(0,r.jsx)("p",{className:"text-sm text-gray-500 truncate",children:e.did})]})})]})},t)}))})]},t)}))})]})]})]})]})})})}}}]);