"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[426],{18426:function(e,s,n){n.d(s,{Z:function(){return v}});var t=n(85893),i=n(67294),r=n(56727),a=n(5506),o=n(10822),l=n(61782),c=n(40782),d=n(91013),u=n(58057),m=n(63750),x=n(89583),f=n(6828),h=n(61751),g=n(6218);function p(){for(var e=arguments.length,s=new Array(e),n=0;n<e;n++)s[n]=arguments[n];return s.filter(Boolean).join(" ")}var b=function(e){var s=e.selected,n=e.setSelected,a=(0,g.ff)().data,o=function(e){return s===e};return(0,t.jsx)(r.Ri,{value:s,onChange:function(e){return n(e)},children:function(e){var n=e.open;return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"mt-1 relative w-full",children:[(0,t.jsxs)(r.Ri.Button,{className:"relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsx)("span",{className:"ml-3 block truncate",children:s?s.name:"Select Peer"})}),(0,t.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,t.jsx)(d.Z,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),(0,t.jsx)(r.uT,{show:n,as:i.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,t.jsx)(r.Ri.Options,{className:"absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",children:null===a||void 0===a?void 0:a.data.contacts.map((function(e,s){return(0,t.jsx)(r.Ri.Option,{className:function(e){return p(e.active?"text-white bg-indigo-600":"text-gray-900","cursor-default select-none relative py-2 pl-3 pr-9")},value:e,children:function(s){s.selected;var n=s.active;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"flex items-center",children:[(0,t.jsx)(f.nQ,{className:"h-4 w-4"}),(0,t.jsxs)("span",{className:p(o(e)?"font-semibold":"font-normal","ml-3 block truncate"),children:[e.name,(0,t.jsxs)("span",{className:"sr-only",children:[" ","is ","offline"]})]})]}),o(e)?(0,t.jsx)("span",{className:p(n?"text-white":"text-indigo-600","absolute inset-y-0 right-0 flex items-center pr-4"),children:(0,t.jsx)(u.Z,{className:"h-5 w-5","aria-hidden":"true"})}):null]})}},s)}))})})]})})}})};function v(e){var s=e.open,n=e.setOpen,d=e.selectedContact,u=(0,i.useState)(""),f=u[0],g=u[1],v=(0,i.useState)(100),j=v[0],y=v[1],N=(0,i.useState)(""),w=N[0],k=N[1],C=(0,i.useState)(!1),S=C[0],F=C[1],T=(0,h.$3)().mutate,_=function(){c.Am.error("Error sending message. Please try again.")};(0,i.useEffect)((function(){d&&g(d)}),[d]);var A=function(){(0,c.Am)((function(e){var s=e.closeToast;return(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"pb-4",children:"Send these sats to this user?"}),(0,t.jsxs)("div",{className:"flex space-x-4",children:[(0,t.jsx)("button",{type:"button",onClick:function(){T({msg:w,did:f.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:parseInt(j),reply_to_id:"",isPayment:!0}),k(""),c.Am.success("You've just send sats!"),s()},className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Confirm"}),(0,t.jsx)("button",{type:"button",onClick:s,className:"inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Cancel"})]})]})}),{autoClose:!1})};return(0,t.jsx)(r.uT.Root,{show:s,as:i.Fragment,children:(0,t.jsx)(r.Vq,{as:"div",className:"absolute fixed overflow-hidden z-10",onClose:n,children:(0,t.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,t.jsx)(r.Vq.Overlay,{className:"absolute inset-0"}),(0,t.jsx)("div",{className:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16",children:(0,t.jsx)(r.uT.Child,{as:i.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,t.jsx)("div",{className:"pointer-events-auto w-screen max-w-md",children:(0,t.jsxs)("form",{className:"flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl",children:[(0,t.jsxs)("div",{className:"h-0 flex-1 overflow-y-auto",children:[(0,t.jsxs)("div",{className:"bg-primary py-6 px-4 sm:px-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(r.Vq.Title,{className:"text-lg font-medium text-white inline-flex items-center",children:["Send ",(0,t.jsx)(x.eJs,{className:"w-5 h-5 ml-1 mb-0.5"})]}),(0,t.jsx)("div",{className:"ml-3 flex h-7 items-center",children:(0,t.jsxs)("button",{type:"button",className:"rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",onClick:function(){return n(!1)},children:[(0,t.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,t.jsx)(a.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})]}),(0,t.jsx)("div",{className:"mt-1",children:(0,t.jsx)("p",{className:"text-sm text-indigo-300",children:"Instantly send sats to anyone via the Lightning Network."})})]}),(0,t.jsx)("div",{className:"flex flex-1 flex-col justify-between",children:(0,t.jsx)("div",{className:"divide-y divide-gray-200 px-4 sm:px-6",children:(0,t.jsxs)("div",{className:"space-y-6 pt-6 pb-5",children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900",children:[" ","Select Contact"," "]}),(0,t.jsx)(b,{selected:f,setSelected:g}),(0,t.jsxs)("div",{className:"pt-2",children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900",children:[" ","Amount (Satoshis)"," "]}),(0,t.jsxs)("div",{className:"mt-1 flex",children:[(0,t.jsx)("input",{type:"number",name:"name",value:j,onChange:function(e){return function(s){if(""!==s)try{(s=parseInt(s))>0&&y(s)}catch(e){console.log("Invalid input: ",e)}else y()}(e.target.value)},id:"name",className:"block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"}),(0,t.jsxs)("div",{className:"flex pl-4 space-x-2",children:[(0,t.jsx)("button",{type:"button",onClick:function(){return y(j+100)},className:"inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:(0,t.jsx)(o.Z,{className:"h-3 w-3","aria-hidden":"true"})}),(0,t.jsx)("button",{type:"button",onClick:function(){j>=100?y(j-100):j<100&&j>0&&y(0)},className:"inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:(0,t.jsx)(l.Z,{className:"h-3 w-3","aria-hidden":"true"})})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{htmlFor:"sats",className:"block text-sm font-medium text-gray-900 pb-4",children:[" ","Add a Message"," "]}),(0,t.jsx)("textarea",{id:"message",name:"message",onChange:function(e){return k(e.target.value)},rows:4,className:"block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"})]})]})})})]}),(0,t.jsx)("div",{className:"px-8 py-4",children:(0,t.jsxs)(r.rs.Group,{as:"div",className:"flex items-center justify-between",children:[(0,t.jsxs)("span",{className:"flex-grow flex flex-col",children:[(0,t.jsx)(r.rs.Label,{as:"span",className:"text-sm font-medium text-gray-900",passive:!0,children:"Quick Send"}),(0,t.jsx)(r.rs.Description,{as:"span",className:"text-sm text-gray-500",children:"Enable one-click lightning payments!"})]}),(0,t.jsx)(r.rs,{checked:S,onChange:F,className:p(S?"bg-indigo-600":"bg-gray-200","relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),children:(0,t.jsx)("span",{"aria-hidden":"true",className:p(S?"translate-x-5":"translate-x-0","pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")})})]})}),(0,t.jsx)("div",{className:"flex flex-shrink-0 justify-end px-4 py-4",children:(0,t.jsxs)("button",{type:"button",className:"w-full inline-flex text-center justify-center ml-4 rounded-md border border-gray-300 bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:function(){S?(T({msg:w,did:f.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:parseInt(j),reply_to_id:"",isPayment:!0},{onError:_}),c.Am.success("You've just send sats!")):A()},children:["Send Bitcoin"," ",(0,t.jsx)(m.XLv,{className:"w-4 h-4 ml-1 mt-0.5"})]})})]})})})})]})})})}}}]);