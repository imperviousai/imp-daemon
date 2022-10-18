(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[843],{72848:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/d/chat",function(){return n(41436)}])},51079:function(e,t,n){"use strict";var s=n(85893),a=n(67294),i=n(42633);t.Z=function(e){var t=e.setFile,n=e.disabled,r=(0,a.useRef)(null);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{type:"button",onClick:function(e){r.current.click()},children:(0,s.jsx)(i.Z,{className:"h-10 w-10 text-gray-600 font-light","aria-hidden":"true"})}),(0,s.jsx)("input",{type:"file",ref:r,onChange:function(e){t(e.target.files[0]),r.current.value=null},style:{display:"none"},disabled:n})]})}},45192:function(e,t,n){"use strict";var s=n(85893),a=(n(67294),n(68163)),i=n(86588),r=n(13902),l=n(40782),o=n(47941);t.Z=function(e){var t,n=e.fileInput,d=e.setFileInput,c=e.progress,m=function(){return d()};return(0,s.jsxs)("div",{children:[" ",(0,s.jsx)("div",{className:"my-3 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",children:(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"w-0 flex-1 flex justify-between",children:(0,s.jsxs)("p",{className:"w-0 flex-1 text-sm font-medium text-gray-900",children:[n.name," ",(0,s.jsxs)("span",{className:"font-light text-gray-500",children:["(",(0,o.G)(n.size),")"]})]})}),(0,s.jsx)("div",{className:"ml-4 flex-shrink-0 flex",children:t>0?(0,s.jsx)(i.gy,{height:"20",width:"20",color:"#312e81",ariaLabel:"loading"}):n.isError?(0,s.jsx)(r.Z,{onClick:function(){l.Am.error("Unable to upload file. Please try again."),m(file.id)},className:"h-6 w-6 text-red-600","aria-hidden":"true"}):(0,s.jsxs)("button",{type:"button",className:"bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:function(){return m()},children:[(0,s.jsx)("span",{className:"sr-only",children:"Close"}),(0,s.jsx)(a.Z,{className:"h-5 w-5","aria-hidden":"true"})]})})]}),c>0&&(0,s.jsx)("div",{className:"flex items-center pt-2",children:(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full dark:bg-gray-700 mx-20",children:(0,s.jsxs)("div",{className:"bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",style:{width:"".concat(Math.floor(c),"%")},children:[" ",Math.floor(c),"%"]})})})]})})]})}},59758:function(e,t,n){"use strict";var s=n(85893),a=(n(67294),n(42833)),i=n(63090),r=n(93162),l=n(47941);t.Z=function(e){var t=e.message,n=e.myDid,o=e.fileObj;return(0,s.jsx)("div",{className:"bg-white px-4 py-5 border-2 border-gray-200 rounded-lg sm:px-6 mt-6",children:(0,s.jsxs)("div",{className:"-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap",children:[(0,s.jsx)("div",{className:"ml-4 mt-4",children:(0,s.jsx)("div",{className:"flex space-x-2 items-center",children:(0,s.jsxs)("div",{className:"flex flex-col",children:[(0,s.jsx)("h3",{className:"text-md leading-6 break-all font-medium text-gray-900",children:t.data?t.data.name:"No File Name"}),(0,s.jsx)("p",{className:"mt-1 text-sm font-light text-gray-500",children:t.data&&"(".concat((0,l.G)(t.data.size),")")})]})})}),(0,s.jsx)("div",{className:"ml-4 mt-4 flex-shrink-0",children:t.from!==n&&(0,s.jsx)("button",{type:"button",onClick:function(){return function(){var e=t.data,n=e.id,s=e.name,a=e.type;o?(0,r.saveAs)(o,s):(0,i.X$)("file-download-request",{id:n,name:s,type:a})}()},className:"relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-black",children:(0,s.jsx)(a.Z,{className:"h-6 w-6","aria-hidden":"true"})})})]})})}},40532:function(e,t,n){"use strict";var s=n(85893),a=n(67294),i=n(11355),r=n(82546),l=n(86588);t.Z=function(e){var t=e.open,n=e.setOpen,o=e.progress;e.error;return(0,s.jsx)(i.u.Root,{show:t,as:a.Fragment,children:(0,s.jsxs)(r.V,{as:"div",className:"relative z-10",onClose:n,children:[(0,s.jsx)(i.u.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,s.jsx)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"})}),(0,s.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:(0,s.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:(0,s.jsx)(i.u.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,s.jsx)(r.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100",children:(0,s.jsx)(l.gy,{height:"40",width:"40",color:"#312e81",ariaLabel:"loading"})}),(0,s.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,s.jsx)(r.V.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:"Transferring file. Do not close."}),(0,s.jsxs)("div",{className:"mt-2",children:[(0,s.jsx)("p",{className:"text-sm text-gray-500",children:"Peer to peer file transfer in progress. It make take some time for the recipient to receive the file (est. 1 min)."}),o>0&&(0,s.jsx)("div",{className:"flex items-center pt-2",children:(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full dark:bg-gray-700 mx-20",children:(0,s.jsxs)("div",{className:"bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",style:{width:"".concat(Math.floor(o),"%")},children:[" ",Math.floor(o),"%"]})})}),100===o&&(0,s.jsx)("div",{className:"mt-5 sm:mt-6",children:(0,s.jsx)("button",{type:"button",className:"inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",onClick:function(){return n(!1)},children:"File Transfer Complete!"})})]})]})]})})})})})]})})}},49332:function(e,t,n){"use strict";var s=n(67294);t.Z=function(e,t){(0,s.useEffect)((function(){if(e){e.style.height="40px",e.style.minHeight="40px";var t=e.scrollHeight;e.style.height=t+"px"}}),[e,t])}},41436:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return oe}});var s=n(35666),a=n.n(s),i=n(85893),r=n(60758),l=n(67294),o=n(30471),d=n(11355),c=n(82546),m=n(13342),u=n(94323),f=n(57556),x=n(37051),v=n(5506),h=n(63750),g=n(40782),p=n(10267),y=(n(86588),n(30381)),j=n.n(y),b=n(18426),N=n(6218),w=n(46249),C=n(61751),k=n(37328),O=n(20567),S=n(59856),F=n(43101),Z=n(91131),P=n(72045),E=n(82130),I=n(5152),z=n(51079),T=n(45192),D=n(82628),_=n.n(D),A=n(88247),M=n(59758),K=n(49332),L=n(85528),B=n(24796),U=n(40532),H=n(84152),J=n(73210),R=n(44156);function V(e,t,n,s,a,i,r){try{var l=e[i](r),o=l.value}catch(d){return void n(d)}l.done?t(o):Promise.resolve(o).then(s,a)}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),s.forEach((function(t){G(e,t,n[t])}))}return e}function q(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],s=!0,a=!1,i=void 0;try{for(var r,l=e[Symbol.iterator]();!(s=(r=l.next()).done)&&(n.push(r.value),!t||n.length!==t);s=!0);}catch(o){a=!0,i=o}finally{try{s||null==l.return||l.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var $=function(e){try{JSON.parse(e)}catch(t){return!1}return!0},Q=(0,I.default)((function(){return Promise.all([n.e(314),n.e(787),n.e(420)]).then(n.bind(n,52843))}),{loadableGenerated:{webpack:function(){return[52843]},modules:["d/chat.jsx -> ../../components/EmojiPicker"]},ssr:!1});function W(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}var Y=function(){var e=[{name:"Messages",href:"#",current:!0}];return(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"sm:hidden",children:[(0,i.jsx)("label",{htmlFor:"tabs",className:"sr-only",children:"Select a tab"}),(0,i.jsx)("select",{id:"tabs",name:"tabs",className:"block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",defaultValue:e.find((function(e){return e.current})).name,children:e.map((function(e){return(0,i.jsx)("option",{children:e.name},e.name)}))})]}),(0,i.jsx)("div",{className:"hidden sm:block",children:(0,i.jsx)("nav",{className:"relative z-0 shadow flex divide-x divide-gray-200","aria-label":"Tabs",children:e.map((function(e,t){return(0,i.jsxs)("a",{href:e.href,className:W(e.current?"text-gray-900":"text-gray-500 hover:text-gray-700","group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"),"aria-current":e.current?"page":void 0,children:[(0,i.jsx)("span",{children:e.name}),(0,i.jsx)("span",{"aria-hidden":"true",className:W(e.current?"bg-indigo-500":"bg-transparent","absolute inset-x-0 bottom-0 h-0.5")})]},e.name)}))})})]})},ee=function(e){var t=e.unreadMessages,n=e.message,s=(0,l.useState)(),a=s[0],r=s[1],o=(0,N.ff)().data,d=(0,w.LU)().data;(0,l.useEffect)((function(){var e=(0,B.Lz)({message:n,contacts:null===o||void 0===o?void 0:o.data.contacts,myDid:d});r(e[0])}),[n,null===o||void 0===o?void 0:o.data.contacts,d]);return(0,i.jsxs)("div",{className:"flex items-center justify-between space-x-4",children:[(0,i.jsxs)("div",{className:"flex space-x-4",children:[a&&(0,i.jsx)(L.Z,{contact:a,className:"w-10 h-10"}),(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("p",{className:"".concat(t>0?"font-bold":"font-light"," text-md"),children:null===a||void 0===a?void 0:a.name}),(0,i.jsx)("p",{className:"".concat(t?"font-bold":"font-light"," text-sm"),children:function(){if("https://didcomm.org/webrtc/1.0/sdp"===(null===n||void 0===n?void 0:n.data.type)){if("offer"===(null===n||void 0===n?void 0:n.data.body.content).signal.type)return(0,i.jsx)("span",{children:"Sent an invite to connect"})}else{if("file-transfer-done"===(null===n||void 0===n?void 0:n.data.type))return"File sent.";var e;if(!$(null===n||void 0===n?void 0:n.data.body.content))return"NaN"!==+(null===n||void 0===n?void 0:n.data.body.content)?null===n||void 0===n?void 0:n.data.body.content:"".concat(null===(e=null===n||void 0===n?void 0:n.data.body.content)||void 0===e?void 0:e.slice(0,20).toString());var t=JSON.parse(null===n||void 0===n?void 0:n.data.body.content),s=t.filename,a=t.dataUri;if(s&&a)return"File sent."}}()})]})]}),(0,i.jsx)("div",{className:"flex flex-col pb-4",children:(0,i.jsx)("p",{className:"text-sm font-light",children:j().unix(null===n||void 0===n?void 0:n.data.created_time).fromNow()})})]})},te=function(){var e=(0,l.useState)({}),t=e[0],n=e[1],s=(0,N.ff)().data,a=(0,w.LU)().data,r=(0,N.JA)().data,o=(0,J.p)().data,d=(0,C.mA)({myDid:a,contacts:null===s||void 0===s?void 0:s.data.contacts,blocklist:r,settings:o}).data,c=q((0,Z.KO)(F.D0),2)[1],m=q((0,Z.KO)(F.Lu),1)[0];return(0,l.useEffect)((function(){var e={};(null===d||void 0===d?void 0:d.conversations)&&(null===d||void 0===d||d.conversations.forEach((function(t){var n=t.messages.filter((function(e){return-1===m.indexOf(e.id)})).length;e[t.groupId]=n}))),n(e)}),[m,d]),(0,i.jsxs)("div",{className:"bg-white lg:min-w-0 lg:flex-1",children:[(0,i.jsx)("div",{className:"pl-4 pr-6 py-2 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:border-t-0",children:(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsx)("h1",{className:"flex-1 text-md font-medium",children:"Messages"})})}),(0,i.jsx)("ul",{role:"list",className:"relative z-0 divide-y divide-gray-200 border-b border-gray-200",children:null===d||void 0===d?void 0:d.conversations.map((function(e,n){var s=e.groupId,a=e.messages;return(0,i.jsx)("li",{className:"relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue=",onClick:function(){return c(s)},children:(0,i.jsx)(ee,{unreadMessages:t[s],message:a.slice(-1)[0]})},n)}))})]})},ne=function(e){var t=e.setOpenContactPreview,n=e.setOpenPayment,s=e.sendInvite,a=e.activeConversation,r=q((0,Z.KO)(E._B),1)[0],c=q((0,Z.KO)(F.D0),2)[1],u=q((0,Z.KO)(F.w5),2),x=u[0],v=u[1],p=(0,C.bj)().mutate,y=(0,N.JA)().data,j=(0,R.r)().data;return(0,i.jsx)("div",{className:"bg-white shadow",children:(0,i.jsx)("div",{className:"px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8",children:(0,i.jsxs)("div",{className:"py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200",children:[(0,i.jsx)("div",{className:"flex-1 min-w-0",children:(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsx)("div",{className:"hover:bg-gray-100 pl-1 pr-5 rounded-md",children:(0,i.jsxs)("div",{className:"flex items-center",onClick:function(){return t(!0)},children:[(0,i.jsx)(L.Z,{contact:x,className:"w-10 h-10"}),(0,i.jsx)("div",{className:"flex flex-col ml-3",children:(0,i.jsxs)("h1",{className:"text-lg font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate",children:[null===x||void 0===x?void 0:x.name," "]})}),(null===y||void 0===y?void 0:y.includes(null===x||void 0===x?void 0:x.did))&&(0,i.jsx)("span",{className:"ml-2 inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800",children:"Blocked"})]})})})}),(0,i.jsxs)("div",{className:"mt-6 flex space-x-3 md:mt-0 md:ml-4 space-x-4",children:[(null===r||void 0===r?void 0:r.peer)&&(0,i.jsx)(i.Fragment,{children:(null===r||void 0===r?void 0:r.peer.connected)?(0,i.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-blue-400",children:"Connected"}):(0,i.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-400",children:"Connecting ..."})}),(null===r||void 0===r?void 0:r.peer)?(0,i.jsx)("div",{className:"flex space-x-4",children:(0,i.jsxs)("button",{type:"button",onClick:function(){r.peer.destroy()},className:"inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",children:[(0,i.jsx)(f.Z,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),(null===r||void 0===r?void 0:r.peer.connected)?"Disconnect":"Cancel"]})}):(0,i.jsxs)("button",{type:"button",onClick:function(){(null===y||void 0===y?void 0:y.includes(null===x||void 0===x?void 0:x.did))?g.Am.error("This contact is blocked, you will not be able to connect."):s()},className:"inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:[(0,i.jsx)(f.Z,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),"Connect"]}),(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsxs)("button",{type:"button",onClick:function(){(null===j||void 0===j?void 0:j.data.lightningConfig.listening)?n(!0):g.Am.info("Connect to a lightning node to use this action.")},className:"inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,i.jsx)(h.mly,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),"Send"]})}),(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsxs)(o.v,{as:"div",className:"relative inline-block text-left",children:[(0,i.jsx)("div",{children:(0,i.jsxs)(o.v.Button,{className:"flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",children:[(0,i.jsx)("span",{className:"sr-only",children:"Open options"}),(0,i.jsx)(m.Z,{className:"h-8 w-8","aria-hidden":"true"})]})}),(0,i.jsx)(d.u,{as:l.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,i.jsxs)(o.v.Items,{className:"origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10",children:[(0,i.jsx)("div",{className:"py-1",children:(0,i.jsx)(o.v.Item,{children:function(e){var t=e.active;return(0,i.jsx)("div",{className:W(t&&"bg-gray-100","block py-2 text-sm"),children:(0,i.jsx)(H.Z,{did:x.did,asMenuItem:!0})})}})}),(0,i.jsx)("div",{className:"py-1",children:(0,i.jsx)(o.v.Item,{children:function(e){var t=e.active;return(0,i.jsx)("a",{onClick:function(){a&&(0,k.SJ)({groupId:a.groupId,deleteGroupMessage:p,callback:function(){c(),v()}})},className:W(t?"bg-gray-100 text-red-900":"text-red-700","block px-4 py-2 text-sm"),children:"Delete"})}})})]})})]})})]})]})})})},se=function(e){var t=e.setToggleNewContact,n=e.toggleNewContact;return(0,i.jsx)("div",{className:"bg-white shadow",children:(0,i.jsx)("div",{className:"px-4 sm:px-6 py-2 lg:max-w-6xl lg:mx-auto lg:px-8 flex justify-end",children:(0,i.jsx)("button",{type:"button",onClick:function(){return t(!n)},className:"inline-flex items-center px-3 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:n?(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)(u.Z,{className:"w-4 h-4"}),"Back"]}):(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)(x.Z,{className:"w-4 h-4"}),"New Message"]})})})})},ae=function(e){var t=e.setToggleNewContact,n=e.setCurrentConversationContact,s=(0,N.ff)().data;return(0,i.jsxs)("div",{className:"bg-white lg:min-w-0 lg:flex-1",children:[(0,i.jsx)("div",{className:"pl-4 pr-6 py-4 border-b flex items-center justify-center border-primary sm:pl-6 lg:pl-8 xl:pl-6",children:(0,i.jsx)("h4",{className:"font-semibold text-sm",children:"Select a Contact"})}),(0,i.jsx)("ul",{role:"list",className:"relative z-0 divide-y divide-gray-200 border-b border-gray-200",children:s.data.contacts.map((function(e,s){return(0,i.jsx)("li",{onClick:function(){n(e),t(!1)},className:"relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue=",children:(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsxs)("div",{className:"flex space-x-4",children:[(0,i.jsx)(L.Z,{contact:e,className:"h-10 w-10"}),(0,i.jsx)("div",{className:"flex flex-col justify-center",children:(0,i.jsx)("p",{className:"font-base",children:e.name})})]})})},s)}))})]})},ie=function(e){var t=e.sendBasicMessage,n=e.myDid,s=65535,r=(0,l.useState)(""),o=r[0],d=r[1],c=(0,l.useState)(),m=c[0],u=c[1],f=(0,l.useState)(1),x=f[0],v=f[1],h=(0,l.useState)(),p=h[0],y=h[1],j=(0,l.useState)(0),b=j[0],N=j[1],w=(0,l.useState)(s),k=w[0],O=w[1],S=(0,l.useState)(0),I=S[0],D=S[1],_=(0,l.useState)(""),M=_[0],L=_[1],B=(0,l.useState)(0),H=B[0],J=B[1],R=(0,l.useState)(0),G=R[0],$=R[1],W=(0,l.useState)(!1),Y=W[0],ee=W[1],te=q((0,Z.KO)(F.r2),1)[0],ne=q((0,Z.KO)(E._B),1)[0],se=q((0,Z.KO)(F.D0),1)[0],ae=q((0,Z.KO)(E.Uy),1)[0],ie=q((0,Z.KO)(F.w5),1)[0],re=(0,C.de)().mutate,le=(0,l.useRef)(null);(0,K.Z)(le.current,o);var oe=function(){g.Am.error("Error sending message. Please try again.")};(0,l.useEffect)((function(){H>0&&me(x)}),[p,I]);var de,ce=(de=a().mark((function e(){var t,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ue(),ee(!0),L((0,P.Z)()),e.next=5,m.arrayBuffer();case 5:t=e.sent,J(t.byteLength),n=t.byteLength%s==0?t.byteLength/s:Math.floor(t.byteLength/s)+1,$(n),y(t);case 10:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(n,s){var a=de.apply(e,t);function i(e){V(a,n,s,i,r,"next",e)}function r(e){V(a,n,s,i,r,"throw",e)}i(void 0)}))}),me=function(){if(v(x+1),x<=G){var e=p.slice(b,k);if(xe({id:M,data:e},"file-transfer-chunk"),N(k),O(k+s),x==G)console.log("Process is complete, counter",x),D(100),ve();else D(x/G*100)}},ue=function(){D(0),v(1),N(0),O(s)},fe=function(e){t({msg:e||o,did:ie.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:te?50:0,reply_to_id:"",isPayment:!1},{onError:oe})},xe=function(e,t){if("file-transfer-chunk"!==t){var s=(null===ne||void 0===ne?void 0:ne.metadata.networkId)!==ae?null===ne||void 0===ne?void 0:ne.metadata.networkId:null,a={timestamp:(new Date).toString(),from:n.id,did:ie.did,networkId:s,type:t},i=X("live-message"===t?{msg:e}:{data:e},a);null===ne||void 0===ne||ne.peer.write(JSON.stringify(i))}else{var r="".concat(e.id,":").concat((0,A.c)(e.data));null===ne||void 0===ne||ne.peer.write(r)}},ve=function(){var e=m.name,t=m.type,s=m.size;if(console.log("File transfer is complete: ",e),xe({name:e,type:t,size:s,id:M},"file-transfer-done"),"image"===t.split("/")[0]){var a=new FileReader;a.readAsDataURL(m),a.onloadend=function(){re({msg:{name:e,type:t,size:s,id:M,image:a.result},type:"file-transfer-done",from:n.id,did:ie.did})}}else re({msg:{name:e,type:t,size:s,id:M,image:""},type:"file-transfer-done",from:n.id,did:ie.did});u(),y(),ee(!1),D(0)},he=function(){if(m&&function(){if(ne)ce();else if(!ne&&m.size>2e6)g.Am.error("File size is too large to send. (Max 2MB). Please connect with user to send larger files.");else{var e=new FileReader;e.readAsDataURL(m),e.onloadend=function(){fe(JSON.stringify({data:{name:m.name},dataUri:e.result})),u()}}}(),o.length>0&&(se||ie)){if(ne)return xe(o,"live-message"),re({msg:o,type:"live-message",from:n.id,did:ie.did}),void d("");fe()}d("")};return(0,i.jsxs)("div",{className:"bg-white shadow px-4",children:[m&&(0,i.jsx)(T.Z,{fileInput:m,setFileInput:u,progress:I}),(0,i.jsxs)("div",{className:"px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8",children:[(0,i.jsx)("div",{className:"py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200",children:(0,i.jsxs)("div",{className:"mt-6 flex space-x-3 md:mt-0 md:ml-4 w-full items-end",children:[(0,i.jsx)(Q,{onEmojiSelect:function(e){d((function(t){return t.concat(" ".concat(e.native," "))}))}}),(0,i.jsx)(z.Z,{setFile:u}),(0,i.jsx)("textarea",{name:"name",id:"name",ref:le,value:o,onKeyPress:function(e){e.shiftKey&&"Enter"===e.key?d("".concat(o)):"Enter"!==e.key||he()},onChange:function(e){"\n"!==e.target.value&&d(e.target.value)},className:"tracking-wide shadow-sm focus:ring-primary focus:border-primary border-primary border block w-full sm:text-sm border-gray-300 px-4 rounded-md pt-2",placeholder:"Start a new message"}),(0,i.jsx)("button",{type:"button",onClick:function(){return he()},className:"max-h-10 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",children:"Send"})]})}),(0,i.jsx)(U.Z,{open:Y,setOpen:ee,progress:I})]})]})},re=function(e){var t=e.activeConversation,n=(0,l.useState)([]),s=n[0],a=n[1],r=(0,N.ff)().data,o=(0,w.LU)().data,d=q((0,Z.KO)(F.Lu),2),c=d[0],m=d[1],u=q((0,Z.KO)(E._B),1)[0],f=(0,l.useRef)(null);(0,l.useEffect)((function(){var e;null===(e=f.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})})),(0,l.useEffect)((function(){t?(a(t.messages),m((0,k.MQ)(c,t.messages))):a([])}),[c,m,t]);var x=function(e){if("https://didcomm.org/webrtc/1.0/sdp"===e.data.type)return"offer"===e.data.body.content.signal.type?(0,i.jsxs)("p",{children:["Sent an invitiation to connect."," ",(0,k.qP)(e.data.created_time)&&(0,O.Ho)(e.data.from)!==o.id&&(0,i.jsx)("a",{className:"font-bold underline",onClick:function(){return(0,S.WV)({detail:{message:e.data.body.content,knownContact:(0,B.Er)({shortFormDid:(0,O.Ho)(e.data.from),contacts:r.data.contacts}),sourceType:"didcomm"}})},children:"Show"})]}):"Sent you an invite to connect.";if("file-transfer-done"===e.data.type)return e.data.body.content.image?(0,i.jsx)("img",{src:e.data.body.content.image,alt:"",width:500,height:500}):(0,i.jsx)(M.Z,{message:{data:e.data.body.content,from:(0,O.Ho)(e.data.from)},myDid:o.id});var t=e.data.body.content;if("NaN"!==+t)return t;if(!$(t))return t;if(JSON.parse(t).data){var n=JSON.parse(t),s=n.data.name,a=n.dataUri;if(s&&_()().test(a)){var l=atob(a.split(",")[1]),d=a.split(",")[0].split(":")[1].split(";")[0];if("image"===d.split("/")[0])return(0,i.jsx)("img",{src:a,alt:"",width:500,height:500});for(var c=new Uint8Array(l.length),m=0;m<l.length;m++)c[m]=l.charCodeAt(m);var u=new File([c],s,{type:d});return(0,i.jsx)(M.Z,{message:{data:{name:s,type:d,size:u.size,id:null},from:e.data.from},fileObj:u,myDid:o.id})}return t}};return(0,i.jsxs)("div",{className:"flex flex-col w-full h-full pt-6 overflow-y-auto",children:[s.map((function(e,t){return(0,i.jsx)("div",{className:"flex py-1 ".concat((0,O.Ho)(e.data.from)===o.id?"pl-4 flex-row-reverse":"pr-4"),children:(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("span",{className:"px-4 py-2 rounded-lg inline-block rounded-br-none text-sm whitespace-pre-line ".concat((n=(0,O.Ho)(e.data.from),n===o.id?(null===u||void 0===u?void 0:u.peer.connected)?"bg-blue-600 text-white":"bg-secondary text-white":"bg-gray-200 text-gray-800")),children:x(e)}),e.data.body.payment&&(0,i.jsxs)("p",{className:"text-sm inline-flex text-center",children:[(0,O.Ho)(e.data.from)===o.id?"Sent":"Received",": +",parseInt(e.data.body.payment).toLocaleString()," sats"," ",(0,i.jsx)(h.mly,{className:"w-3 h-3 mt-1.5 ml-0.5"})]}),(0,i.jsx)("div",{className:"flex ".concat((0,O.Ho)(e.data.from)===o.id&&"flex-row-reverse"),children:(0,i.jsx)("p",{className:"text-primary opacity-30 text-xs",children:j().unix(e.data.created_time).fromNow()})})]})},t);var n})),(0,i.jsx)("div",{ref:f})]})},le=function(e){var t=e.openContactPreview,n=e.setOpenContactPreview,s=e.currentConversationContact;return(0,i.jsx)(d.u.Root,{show:t,as:l.Fragment,children:(0,i.jsx)(c.V,{as:"div",className:"fixed inset-0 overflow-hidden z-10",onClose:n,children:(0,i.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,i.jsx)(c.V.Overlay,{className:"absolute inset-0"}),(0,i.jsx)("div",{className:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10",children:(0,i.jsx)(d.u.Child,{as:l.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,i.jsx)("div",{className:"pointer-events-auto w-screen max-w-md",children:(0,i.jsxs)("div",{className:"flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl",children:[(0,i.jsx)("div",{className:"px-4 sm:px-6",children:(0,i.jsxs)("div",{className:"flex items-start justify-between",children:[(0,i.jsxs)(c.V.Title,{className:"text-lg font-medium text-gray-900",children:[" ","Contact"," "]}),(0,i.jsx)("div",{className:"ml-3 flex h-7 items-center",children:(0,i.jsxs)("button",{type:"button",className:"rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:function(){return n(!1)},children:[(0,i.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,i.jsx)(v.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})]})}),(0,i.jsx)("div",{className:"relative mt-6 flex-1 px-4 sm:px-6",children:(0,i.jsx)(p.ContactView,{selectedContact:s})})]})})})})]})})})};function oe(){var e=(0,l.useState)(!1),t=e[0],n=e[1],s=(0,l.useState)(!1),a=s[0],o=s[1],d=(0,l.useState)(!1),c=d[0],m=d[1],u=(0,l.useState)(),f=u[0],x=u[1],v=q((0,Z.KO)(F.D0),2),h=v[0],p=v[1],y=q((0,Z.KO)(F.w5),2),j=y[0],k=y[1],O=q((0,Z.KO)(E.fo),2)[1],I=q((0,Z.KO)(F.r2),1)[0],z=(0,N.ff)().data,T=(0,w.LU)().data,D=(0,N.JA)().data,_=(0,J.p)().data,A=(0,C.mA)({myDid:T,contacts:null===z||void 0===z?void 0:z.data.contacts,blocklist:D,settings:_}).data,M=(0,C.$3)().mutate;(0,l.useEffect)((function(){if(h){var e=null===A||void 0===A?void 0:A.conversations.find((function(e){return e.groupId===h}));if(e){var t=(0,B.Lz)({message:e.messages[0],contacts:null===z||void 0===z?void 0:z.data.contacts,myDid:T});x(e),k(t[0])}}}),[null===z||void 0===z?void 0:z.data.contacts,h,null===A||void 0===A?void 0:A.conversations,T,k]),(0,l.useEffect)((function(){if(j){var e=null===A||void 0===A?void 0:A.conversations.find((function(e){return e.messages.find((function(e){return e.recipients.includes(j.did)}))}));e?x(e):(x(),p())}}),[h,k,null===z||void 0===z?void 0:z.data.contacts,T,A,j,p]);return(0,i.jsxs)(r.Z,{currentPage:"Messaging",children:[(0,i.jsx)(b.Z,{open:a,setOpen:o,selectedContact:j||null}),(0,i.jsx)("div",{className:"z-20",children:(0,i.jsx)(le,{openContactPreview:t,setOpenContactPreview:n,currentConversationContact:j})}),(0,i.jsxs)("div",{className:"flex-1 relative z-0 flex overflow-hidden h-full lg:pr-52 lg:mr-16",children:[(0,i.jsx)("main",{className:"flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white border-r",children:(h||j)&&(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"flex flex-col h-full",children:[(0,i.jsx)("div",{className:"flex-none",children:(0,i.jsx)(ne,{setOpenContactPreview:n,setOpenPayment:o,sendInvite:function(){var e=(0,P.Z)(),t=(0,S.aH)({networkId:e,networkOwner:T.id,sendBasicMessage:M,lightningEnabled:I,src:T.id,contact:j,type:"live-messaging-invitation",localStream:!1});g.Am.success("Invite Sent"),O(t)},activeConversation:f})}),(0,i.jsx)("div",{className:"grow flex-1 pl-8 pr-4 overflow-hidden",children:(0,i.jsx)(re,{activeConversation:f})}),(0,i.jsx)("div",{className:"flex-none",children:(0,i.jsx)(ie,{sendBasicMessage:M,myDid:T})})]})})}),(0,i.jsxs)("aside",{className:"hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-80 border-r border-gray-200 overflow-y-auto",children:[(0,i.jsx)(se,{setToggleNewContact:m,toggleNewContact:c}),c?(0,i.jsx)(ae,{setToggleNewContact:m,setCurrentConversationContact:k}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Y,{}),(0,i.jsx)(te,{})]})]})]})]})}}},function(e){e.O(0,[774,445,13,270,905,609,758,267,888,179],(function(){return t=72848,e(e.s=t);var t}));var t=e.O();_N_E=t}]);