"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[426],{85528:function(e,s,n){var t=n(85893),r=n(67294),a=n(6828);function i(e,s,n){return s in e?Object.defineProperty(e,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[s]=n,e}function o(e){for(var s=1;s<arguments.length;s++){var n=null!=arguments[s]?arguments[s]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(s){i(e,s,n[s])}))}return e}s.Z=function(e){var s=e.contact,n=e.className,i=(0,r.useState)(),l=i[0],c=i[1],d=(0,r.useState)(),u=d[0],m=d[1];return(0,r.useEffect)((function(){if(s){var e=JSON.parse(s.metadata),n=e.avatar,t=e.avatarUrl;c(n),m(t)}}),[s]),(0,t.jsx)(r.Fragment,{children:u?(0,t.jsx)("img",{className:"rounded-full ".concat(n),src:u,alt:"avatar"}):l?(0,t.jsx)(a.nQ,o({className:n},l)):(0,t.jsx)(a.nQ,{className:n})})}},18426:function(e,s,n){n.d(s,{Z:function(){return N}});var t=n(85893),r=n(67294),a=n(35079),i=n(11355),o=n(82546),l=n(73933),c=n(5506),d=n(10822),u=n(61782),m=n(40782),f=n(91013),x=n(58057),h=n(63750),g=n(89583),p=n(61751),b=n(6218),v=n(85528);function j(){for(var e=arguments.length,s=new Array(e),n=0;n<e;n++)s[n]=arguments[n];return s.filter(Boolean).join(" ")}var y=function(e){var s=e.selected,n=e.setSelected,o=(0,b.ff)().data,l=function(e){return s===e};return(0,t.jsx)(a.R,{value:s,onChange:function(e){return n(e)},children:function(e){var n=e.open;return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"mt-1 relative w-full",children:[(0,t.jsxs)(a.R.Button,{className:"relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsx)("span",{className:"ml-3 block truncate",children:s?s.name:"Select Peer"})}),(0,t.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,t.jsx)(f.Z,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),(0,t.jsx)(i.u,{show:n,as:r.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,t.jsx)(a.R.Options,{className:"absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",children:null===o||void 0===o?void 0:o.data.contacts.map((function(e,s){return(0,t.jsx)(a.R.Option,{className:function(e){return j(e.active?"text-white bg-indigo-600":"text-gray-900","cursor-default select-none relative py-2 pl-3 pr-9")},value:e,children:function(s){s.selected;var n=s.active;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)(v.Z,{contact:e,className:"h-4 w-4"}),(0,t.jsxs)("span",{className:j(l(e)?"font-semibold":"font-normal","ml-3 block truncate"),children:[e.name,(0,t.jsxs)("span",{className:"sr-only",children:[" ","is ","offline"]})]})]}),l(e)?(0,t.jsx)("span",{className:j(n?"text-white":"text-indigo-600","absolute inset-y-0 right-0 flex items-center pr-4"),children:(0,t.jsx)(x.Z,{className:"h-5 w-5","aria-hidden":"true"})}):null]})}},s)}))})})]})})}})};function N(e){var s=e.open,n=e.setOpen,a=e.selectedContact,f=(0,r.useState)(""),x=f[0],b=f[1],v=(0,r.useState)(100),N=v[0],w=v[1],k=(0,r.useState)(""),C=k[0],S=k[1],O=(0,r.useState)(!1),F=O[0],E=O[1],P=(0,p.$3)().mutate,Z=function(){m.Am.error("Error sending message. Please try again.")};(0,r.useEffect)((function(){a&&b(a)}),[a]);var _=function(){(0,m.Am)((function(e){var s=e.closeToast;return(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"pb-4",children:"Send these sats to this user?"}),(0,t.jsxs)("div",{className:"flex space-x-4",children:[(0,t.jsx)("button",{type:"button",onClick:function(){P({msg:C,did:x.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:parseInt(N),reply_to_id:"",isPayment:!0}),S(""),m.Am.success("You've just sent sats!"),s()},className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Confirm"}),(0,t.jsx)("button",{type:"button",onClick:s,className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})]})]})}),{autoClose:!1})};return(0,t.jsx)(i.u.Root,{show:s,as:r.Fragment,children:(0,t.jsx)(o.V,{as:"div",className:"absolute fixed overflow-hidden z-10",onClose:n,children:(0,t.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,t.jsx)(o.V.Overlay,{className:"absolute inset-0"}),(0,t.jsx)("div",{className:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16",children:(0,t.jsx)(i.u.Child,{as:r.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,t.jsx)("div",{className:"pointer-events-auto w-screen max-w-md",children:(0,t.jsxs)("form",{className:"flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",children:[(0,t.jsxs)("div",{className:"h-0 flex-1 overflow-y-auto",children:[(0,t.jsxs)("div",{className:"bg-primary py-6 px-4 sm:px-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(o.V.Title,{className:"text-lg font-medium text-white inline-flex items-center",children:["Send ",(0,t.jsx)(g.eJs,{className:"w-5 h-5 ml-1 mb-0.5"})]}),(0,t.jsx)("div",{className:"ml-3 flex h-7 items-center",children:(0,t.jsxs)("button",{type:"button",className:"rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",onClick:function(){return n(!1)},children:[(0,t.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,t.jsx)(c.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})]}),(0,t.jsx)("div",{className:"mt-1",children:(0,t.jsx)("p",{className:"text-sm text-indigo-300",children:"Instantly send sats to anyone via the Lightning Network."})})]}),(0,t.jsx)("div",{className:"flex flex-1 flex-col justify-between",children:(0,t.jsx)("div",{className:"divide-y divide-gray-200 px-4 sm:px-6",children:(0,t.jsxs)("div",{className:"space-y-6 pt-6 pb-5",children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900",children:[" ","Select Contact"," "]}),(0,t.jsx)(y,{selected:x,setSelected:b}),(0,t.jsxs)("div",{className:"pt-2",children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900",children:[" ","Amount (Satoshis)"," "]}),(0,t.jsxs)("div",{className:"mt-1 flex",children:[(0,t.jsx)("input",{type:"number",name:"name",value:N,onChange:function(e){return function(s){if(""!==s)try{(s=parseInt(s))>0&&w(s)}catch(e){console.log("Invalid input: ",e)}else w()}(e.target.value)},id:"name",className:"block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"}),(0,t.jsxs)("div",{className:"flex pl-4 space-x-2",children:[(0,t.jsx)("button",{type:"button",onClick:function(){return w(N+100)},className:"inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:(0,t.jsx)(d.Z,{className:"h-3 w-3","aria-hidden":"true"})}),(0,t.jsx)("button",{type:"button",onClick:function(){N>=100?w(N-100):N<100&&N>0&&w(0)},className:"inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:(0,t.jsx)(u.Z,{className:"h-3 w-3","aria-hidden":"true"})})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900 pb-4",children:[" ","Add a Message"," "]}),(0,t.jsx)("textarea",{id:"message",name:"message",onChange:function(e){return S(e.target.value)},rows:4,className:"block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"})]})]})})})]}),(0,t.jsx)("div",{className:"px-8 py-4",children:(0,t.jsxs)(l.r.Group,{as:"div",className:"flex items-center justify-between",children:[(0,t.jsxs)("span",{className:"flex-grow flex flex-col",children:[(0,t.jsx)(l.r.Label,{as:"span",className:"text-sm font-medium text-gray-900",passive:!0,children:"Quick Send"}),(0,t.jsx)(l.r.Description,{as:"span",className:"text-sm text-gray-500",children:"Enable one-click lightning payments!"})]}),(0,t.jsx)(l.r,{checked:F,onChange:E,className:j(F?"bg-indigo-600":"bg-gray-200","relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),children:(0,t.jsx)("span",{"aria-hidden":"true",className:j(F?"translate-x-5":"translate-x-0","pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")})})]})}),(0,t.jsx)("div",{className:"flex flex-shrink-0 justify-end px-4 py-4",children:(0,t.jsxs)("button",{type:"button",className:"w-full inline-flex text-center justify-center ml-4 rounded-md border border-gray-300 bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:function(){F?(P({msg:C,did:x.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:parseInt(N),reply_to_id:"",isPayment:!0},{onError:Z}),m.Am.success("You've just sent sats!")):_()},children:["Send Bitcoin"," ",(0,t.jsx)(h.XLv,{className:"w-4 h-4 ml-1 mt-0.5"})]})})]})})})})]})})})}}}]);