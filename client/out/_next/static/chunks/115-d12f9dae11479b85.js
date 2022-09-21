"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[115],{85115:function(e,t,s){s.r(t),s.d(t,{ContactView:function(){return N},default:function(){return w}});var r=s(85893),n=s(67294),a=s(71722),i=s(69065),l=s(14898),c=s(33740),o=s(94323),d=s(69743),x=s(6828),m=s(40782),u=s(74855),f=s(41854),h=s(6218),g=s(24796),p=s(13471);function b(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function j(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{},r=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(s).filter((function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable})))),r.forEach((function(t){b(e,t,s[t])}))}return e}var y=[{name:"Contact Info",href:"#",current:!0}];function v(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.filter(Boolean).join(" ")}var N=function(e){var t=e.selectedContact,s=e.setOpenAddContactForm,i=e.setSelectedContact,o=(0,n.useState)(!1),d=o[0],f=o[1],p=(0,n.useState)({}),b=p[0],N=p[1],w=(0,h.jO)().mutate,C=(0,h.ZK)((function(){return m.Am.success("Avatar saved!")}),(function(){return m.Am.error("Error saving avatar. Please try again later.")})).mutate;(0,n.useEffect)((function(){t&&N(j({},(0,g.rH)(t)))}),[t]);var k=function(){m.Am.success("Contact successfully deleted!"),i("")},S=function(e){m.Am.error("Failed to delete contact. Please try again."),console.log("Failed to delete contact. Error: ",e)};return(0,r.jsxs)("article",{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"pb-12 flex flex-col items-center",children:(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)(x.nQ,j({},b,{className:"h-32 w-full object-cover lg:h-48"})),(0,r.jsx)("button",{type:"button",onClick:function(){return f(!0),void N(j({},(0,g.nS)()))},className:"pt-2",children:(0,r.jsx)(a.Z,{className:"-ml-1 mr-2 h-6 w-6 text-gray-900","aria-hidden":"true"})}),d&&(0,r.jsxs)("div",{className:"flex space-x-2 pt-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){return f(!1),void N(j({},(0,g.rH)(t)))},className:"inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"}),(0,r.jsx)("button",{type:"button",onClick:function(){return C({existingContact:t,avatar:b}),void f(!1)},className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Save"})]})]})}),(0,r.jsxs)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,r.jsx)("div",{className:"-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5",children:(0,r.jsx)("div",{className:"mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 flex flex-col",children:(0,r.jsx)("div",{className:"sm:hidden 2xl:block mt-6 min-w-0 flex-1",children:(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900 truncate",children:t&&t.name})})})}),(0,r.jsx)("div",{className:"hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1",children:(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900 truncate",children:t.name})})]})]}),(0,r.jsx)("div",{className:"mt-6 sm:mt-2 2xl:mt-5",children:(0,r.jsx)("div",{className:"border-b border-gray-200",children:(0,r.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsx)("nav",{className:"-mb-px flex space-x-8","aria-label":"Tabs",children:y.map((function(e){return(0,r.jsx)("a",{href:e.href,className:v(e.current?"border-pink-500 text-gray-900":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"),"aria-current":e.current?"page":void 0,children:e.name},e.name)}))})})})}),(0,r.jsx)("div",{className:"mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("dl",{className:"grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2",children:[(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"DID"}),(0,r.jsx)(u.CopyToClipboard,{text:t.did,onCopy:function(){return m.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:t.did})})]}),(0,r.jsx)("br",{}),(0,r.jsxs)("div",{className:"sm:col-span-1",children:[(0,r.jsx)("dt",{className:"text-sm font-medium text-gray-500",children:"Name"}),(0,r.jsx)(u.CopyToClipboard,{text:t.name,onCopy:function(){return m.Am.info("Copied!")},children:(0,r.jsx)("dd",{className:"mt-1 text-sm text-gray-900 hover:bg-gray-50",children:t.name})})]})]})}),(0,r.jsx)("div",{className:"relative pb-8",children:(0,r.jsx)("div",{className:"absolute inset-0 flex items-center pt-6","aria-hidden":"true",children:(0,r.jsx)("div",{className:"w-full border-t border-gray-300"})})}),(0,r.jsxs)("div",{className:"pt-4 pl-16 flex space-x-4",children:[(0,r.jsxs)("button",{type:"button",onClick:function(){return s(!0)},className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",children:[(0,r.jsx)(l.Z,{className:"-ml-1 mr-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),"Edit"]}),(0,r.jsxs)("button",{type:"button",onClick:function(){return e=t,void(0,m.Am)((function(t){var s=t.closeToast;return(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"pb-4",children:"Delete this contact?"}),(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsx)("button",{type:"button",onClick:function(){w(e.id,{onSuccess:k,onError:S}),s()},className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Delete"}),(0,r.jsx)("button",{type:"button",onClick:s,className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})]})]})}),{autoClose:!1});var e},className:"inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:[(0,r.jsx)(c.Z,{className:"-ml-1 mr-2 h-5 w-5 text-red-400","aria-hidden":"true"}),"Delete"]})]})]})};function w(){var e=(0,n.useState)(!1),t=(e[0],e[1]),s=(0,n.useState)([]),a=s[0],l=s[1],c=(0,n.useState)(""),m=c[0],u=c[1],b=(0,n.useState)(!1),y=b[0],v=b[1],w=(0,h.ff)().data;return(0,n.useEffect)((function(){if(w){var e="abcdefghijklmnopqrstuvwxyz1234567890".split("").map((function(e){return w.data.contacts.filter((function(t){return t.name[0].toLowerCase()===e.toLowerCase()}))})).filter((function(e){return e.length>0}));l(e)}}),[w]),(0,r.jsx)(p.Z,{currentPage:"Contacts",children:(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"h-full flex z-0",children:[(0,r.jsx)(f.Z,{open:y,setOpen:v,existingContact:m}),(0,r.jsxs)("div",{className:"flex flex-col min-w-0 flex-1 overflow-hidden",children:[(0,r.jsx)("div",{className:"lg:hidden",children:(0,r.jsx)("div",{className:"flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5",children:(0,r.jsx)("div",{children:(0,r.jsxs)("button",{type:"button",className:"-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",onClick:function(){return t(!0)},children:[(0,r.jsx)("span",{className:"sr-only",children:"Open sidebar"}),(0,r.jsx)(i.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})})}),(0,r.jsxs)("div",{className:"flex-1 relative z-0 flex overflow-hidden",children:[(0,r.jsxs)("main",{className:"flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last",children:[(0,r.jsx)("nav",{className:"flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden","aria-label":"Breadcrumb",children:(0,r.jsxs)("a",{href:"#",className:"inline-flex items-center space-x-3 text-sm font-medium text-gray-900",children:[(0,r.jsx)(o.Z,{className:"-ml-2 h-5 w-5 text-gray-400","aria-hidden":"true"}),(0,r.jsx)("span",{children:"Directory"})]})}),m&&(0,r.jsx)(N,{selectedContact:m,setOpenAddContactForm:v,setSelectedContact:u})]}),(0,r.jsxs)("aside",{className:"hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200",children:[(0,r.jsxs)("div",{className:"px-6 pt-6 pb-4",children:[(0,r.jsxs)("h2",{className:"text-lg font-medium text-gray-900",children:["Directory (",null===w||void 0===w?void 0:w.data.contacts.length,")"]}),(0,r.jsx)("p",{className:"mt-1 text-sm text-gray-600",children:"Search contacts below"}),(0,r.jsx)("form",{className:"mt-6 flex space-x-4",action:"#",children:(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)("label",{htmlFor:"search",className:"sr-only",children:"Search"}),(0,r.jsxs)("div",{className:"relative rounded-md shadow-sm",children:[(0,r.jsx)("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:(0,r.jsx)(d.Z,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})}),(0,r.jsx)("input",{type:"search",name:"search",id:"search",className:"focus:ring-primaryfocus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md",placeholder:"Search"})]})]})})]}),(0,r.jsx)("nav",{className:"flex-1 min-h-0 overflow-y-auto","aria-label":"Directory",children:a&&a.map((function(e,t){return(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("div",{className:"z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500",children:(0,r.jsx)("h3",{children:e[0].name[0].toUpperCase()})}),(0,r.jsx)("ul",{role:"list",className:"relative z-0 divide-y divide-gray-200",children:e.map((function(e,t){return(0,r.jsx)("li",{onClick:function(){return u(e)},children:(0,r.jsxs)("div",{className:"relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)(x.nQ,j({},(0,g.rH)(e),{className:"h-10 w-10"}))}),(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsxs)("div",{className:"focus:outline-none",children:[(0,r.jsx)("span",{className:"absolute inset-0","aria-hidden":"true"}),(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,r.jsx)("p",{className:"text-sm text-gray-500 truncate",children:e.did})]})})]})},t)}))})]},t)}))})]})]})]})]})})})}}}]);