(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[843],{72848:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/d/chat",function(){return n(41436)}])},51079:function(e,t,n){"use strict";var s=n(85893),a=n(67294),r=n(42633);t.Z=function(e){var t=e.setFile,n=e.disabled,i=(0,a.useRef)(null);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{type:"button",onClick:function(e){i.current.click()},children:(0,s.jsx)(r.Z,{className:"h-10 w-10 text-gray-600 font-light","aria-hidden":"true"})}),(0,s.jsx)("input",{type:"file",ref:i,onChange:function(e){t(e.target.files[0]),i.current.value=null},style:{display:"none"},disabled:n})]})}},45192:function(e,t,n){"use strict";var s=n(85893),a=(n(67294),n(68163)),r=n(86588),i=n(13902),l=n(40782);t.Z=function(e){var t,n=e.fileInput,o=e.setFileInput,c=e.progress,d=function(){return o()};return(0,s.jsxs)("div",{children:[" ",(0,s.jsx)("div",{className:"my-3 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",children:(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"w-0 flex-1 flex justify-between",children:(0,s.jsxs)("p",{className:"w-0 flex-1 text-sm font-medium text-gray-900",children:[n.name," ",(0,s.jsxs)("span",{className:"font-light text-gray-500",children:["(",n.size," bytes)"]})]})}),(0,s.jsx)("div",{className:"ml-4 flex-shrink-0 flex",children:t>0?(0,s.jsx)(r.gy,{height:"20",width:"20",color:"#312e81",ariaLabel:"loading"}):n.isError?(0,s.jsx)(i.Z,{onClick:function(){l.Am.error("Unable to upload file. Please try again."),d(file.id)},className:"h-6 w-6 text-red-600","aria-hidden":"true"}):(0,s.jsxs)("button",{type:"button",className:"bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:function(){return d()},children:[(0,s.jsx)("span",{className:"sr-only",children:"Close"}),(0,s.jsx)(a.Z,{className:"h-5 w-5","aria-hidden":"true"})]})})]}),c>0&&(0,s.jsx)("div",{className:"flex items-center pt-2",children:(0,s.jsx)("div",{className:"w-full bg-gray-200 rounded-full dark:bg-gray-700 mx-20",children:(0,s.jsxs)("div",{className:"bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",style:{width:"".concat(Math.floor(c),"%")},children:[" ",Math.floor(c),"%"]})})})]})})]})}},59758:function(e,t,n){"use strict";var s=n(85893),a=(n(67294),n(42833)),r=n(63090),i=n(93162);t.Z=function(e){var t=e.message,n=e.myDid,l=e.fileObj;return(0,s.jsx)("div",{className:"bg-white px-4 py-5 border-2 border-gray-200 rounded-lg sm:px-6 mt-6",children:(0,s.jsxs)("div",{className:"-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap",children:[(0,s.jsx)("div",{className:"ml-4 mt-4",children:(0,s.jsx)("div",{className:"flex space-x-2 items-center",children:(0,s.jsxs)("div",{className:"flex flex-col",children:[(0,s.jsx)("h3",{className:"text-md leading-6 break-all font-medium text-gray-900",children:t.data?t.data.name:"No File Name"}),(0,s.jsx)("p",{className:"mt-1 text-sm font-light text-gray-500",children:t.data&&"(".concat(t.data.size," bytes)")})]})})}),(0,s.jsx)("div",{className:"ml-4 mt-4 flex-shrink-0",children:t.from!==n&&(0,s.jsx)("button",{type:"button",onClick:function(){return function(){var e=t.data,n=e.id,s=e.name,a=e.type;l?(0,i.saveAs)(l,s):(0,r.X$)("file-download-request",{id:n,name:s,type:a})}()},className:"relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-black",children:(0,s.jsx)(a.Z,{className:"h-6 w-6","aria-hidden":"true"})})})]})})}},49332:function(e,t,n){"use strict";var s=n(67294);t.Z=function(e,t){(0,s.useEffect)((function(){if(e){e.style.height="40px",e.style.minHeight="40px";var t=e.scrollHeight;e.style.height=t+"px"}}),[e,t])}},41436:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return ne}});var s=n(35666),a=n.n(s),r=n(85893),i=n(11240),l=n(67294),o=n(56727),c=n(13342),d=n(94323),u=n(57556),m=n(37051),f=n(5506),x=n(63750),v=n(40782),h=n(10267),g=(n(86588),n(30381)),p=n.n(g),y=n(18426),j=n(6218),b=n(46249),w=n(61751),N=n(37328),C=n(20567),k=n(59856),O=n(43101),S=n(91131),P=n(72045),Z=n(82130),E=n(5152),F=n(51079),z=n(45192),I=n(82628),D=n.n(I),_=n(88247),K=n(59758),T=n(49332),L=n(85528),M=n(24796);function A(e,t,n,s,a,r,i){try{var l=e[r](i),o=l.value}catch(c){return void n(c)}l.done?t(o):Promise.resolve(o).then(s,a)}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),s.forEach((function(t){U(e,t,n[t])}))}return e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],s=!0,a=!1,r=void 0;try{for(var i,l=e[Symbol.iterator]();!(s=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);s=!0);}catch(o){a=!0,r=o}finally{try{s||null==l.return||l.return()}finally{if(a)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var R=function(e){try{JSON.parse(e)}catch(t){return!1}return!0},V=(0,E.default)((function(){return Promise.all([n.e(314),n.e(787),n.e(420)]).then(n.bind(n,52843))}),{loadableGenerated:{webpack:function(){return[52843]},modules:["d/chat.jsx -> ../../components/EmojiPicker"]},ssr:!1});function J(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}var q=function(){var e=[{name:"Messages",href:"#",current:!0}];return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"sm:hidden",children:[(0,r.jsx)("label",{htmlFor:"tabs",className:"sr-only",children:"Select a tab"}),(0,r.jsx)("select",{id:"tabs",name:"tabs",className:"block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300",defaultValue:e.find((function(e){return e.current})).name,children:e.map((function(e){return(0,r.jsx)("option",{children:e.name},e.name)}))})]}),(0,r.jsx)("div",{className:"hidden sm:block",children:(0,r.jsx)("nav",{className:"relative z-0 shadow flex divide-x divide-gray-200","aria-label":"Tabs",children:e.map((function(e,t){return(0,r.jsxs)("a",{href:e.href,className:J(e.current?"text-gray-900":"text-gray-500 hover:text-gray-700","group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"),"aria-current":e.current?"page":void 0,children:[(0,r.jsx)("span",{children:e.name}),(0,r.jsx)("span",{"aria-hidden":"true",className:J(e.current?"bg-indigo-500":"bg-transparent","absolute inset-x-0 bottom-0 h-0.5")})]},e.name)}))})})]})},X=function(e){var t=e.unreadMessages,n=e.message,s=(0,l.useState)(),a=s[0],i=s[1],o=(0,j.ff)().data,c=(0,b.LU)().data;(0,l.useEffect)((function(){var e=(0,M.Lz)({message:n,contacts:null===o||void 0===o?void 0:o.data.contacts,myDid:c});i(e[0])}),[n,null===o||void 0===o?void 0:o.data.contacts,c]);return(0,r.jsxs)("div",{className:"flex items-center justify-between space-x-4",children:[(0,r.jsxs)("div",{className:"flex space-x-4",children:[a&&(0,r.jsx)(L.Z,{contact:a,className:"w-10 h-10"}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("p",{className:"".concat(t>0?"font-bold":"font-light"," text-md"),children:null===a||void 0===a?void 0:a.name}),(0,r.jsx)("p",{className:"".concat(t?"font-bold":"font-light"," text-sm"),children:function(){if("https://didcomm.org/webrtc/1.0/sdp"===(null===n||void 0===n?void 0:n.data.type)){if("offer"===(null===n||void 0===n?void 0:n.data.body.content).signal.type)return(0,r.jsx)("span",{children:"Sent an invite to connect"})}else{if("file-transfer-done"===(null===n||void 0===n?void 0:n.data.type))return"File sent.";var e;if(!R(null===n||void 0===n?void 0:n.data.body.content))return"".concat(null===(e=null===n||void 0===n?void 0:n.data.body.content)||void 0===e?void 0:e.slice(0,20));var t=JSON.parse(null===n||void 0===n?void 0:n.data.body.content),s=t.filename,a=t.dataUri;if(s&&a)return"File sent."}}()})]})]}),(0,r.jsx)("div",{className:"flex flex-col pb-4",children:(0,r.jsx)("p",{className:"text-sm font-light",children:p().unix(null===n||void 0===n?void 0:n.data.created_time).fromNow()})})]})},G=function(){var e=(0,l.useState)({}),t=e[0],n=e[1],s=(0,j.ff)().data,a=(0,b.LU)().data,i=(0,w.mA)({myDid:a,contacts:null===s||void 0===s?void 0:s.data.contacts}).data,o=H((0,S.KO)(O.D0),2)[1],c=H((0,S.KO)(O.Lu),1)[0];return(0,l.useEffect)((function(){var e={};(null===i||void 0===i?void 0:i.conversations)&&(null===i||void 0===i||i.conversations.forEach((function(t){var n=t.messages.filter((function(e){return-1===c.indexOf(e.id)})).length;e[t.groupId]=n}))),n(e)}),[c,i]),(0,r.jsxs)("div",{className:"bg-white lg:min-w-0 lg:flex-1",children:[(0,r.jsx)("div",{className:"pl-4 pr-6 py-2 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:border-t-0",children:(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)("h1",{className:"flex-1 text-md font-medium",children:"Messages"})})}),(0,r.jsx)("ul",{role:"list",className:"relative z-0 divide-y divide-gray-200 border-b border-gray-200",children:null===i||void 0===i?void 0:i.conversations.map((function(e,n){var s=e.groupId,a=e.messages;return(0,r.jsx)("li",{className:"relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue=",onClick:function(){return o(s)},children:(0,r.jsx)(X,{unreadMessages:t[s],message:a.slice(-1)[0]})},n)}))})]})},$=function(e){var t=e.setOpenContactPreview,n=e.setOpenPayment,s=e.sendInvite,a=e.activeConversation,i=H((0,S.KO)(Z._B),1)[0],d=H((0,S.KO)(O.D0),2)[1],m=H((0,S.KO)(O.w5),2),f=m[0],v=m[1],h=(0,w.bj)().mutate;return(0,r.jsx)("div",{className:"bg-white shadow",children:(0,r.jsx)("div",{className:"px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8",children:(0,r.jsxs)("div",{className:"py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"flex items-center",onClick:function(){return t(!0)},children:[(0,r.jsx)(L.Z,{contact:f,className:"w-10 h-10"}),(0,r.jsx)("div",{className:"flex flex-col ml-3",children:(0,r.jsxs)("h1",{className:"text-lg font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate",children:[null===f||void 0===f?void 0:f.name," "]})})]})})})}),(0,r.jsxs)("div",{className:"mt-6 flex space-x-3 md:mt-0 md:ml-4 space-x-4",children:[(null===i||void 0===i?void 0:i.peer)&&(0,r.jsx)(r.Fragment,{children:(null===i||void 0===i?void 0:i.peer.connected)?(0,r.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-blue-400",children:"Connected"}):(0,r.jsx)("span",{className:"inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-400",children:"Connecting ..."})}),(null===i||void 0===i?void 0:i.peer)?(0,r.jsx)("div",{className:"flex space-x-4",children:(0,r.jsxs)("button",{type:"button",onClick:function(){i.peer.destroy()},className:"inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",children:[(0,r.jsx)(u.Z,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),(null===i||void 0===i?void 0:i.peer.connected)?"Disconnect":"Cancel"]})}):(0,r.jsxs)("button",{type:"button",onClick:function(){return s()},className:"inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:[(0,r.jsx)(u.Z,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),"Connect"]}),(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsxs)("button",{type:"button",onClick:function(){return n(!0)},className:"inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,r.jsx)(x.mly,{className:"-ml-0.5 mr-2 h-4 w-4","aria-hidden":"true"}),"Send"]})}),(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsxs)(o.v2,{as:"div",className:"relative inline-block text-left",children:[(0,r.jsx)("div",{children:(0,r.jsxs)(o.v2.Button,{className:"flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",children:[(0,r.jsx)("span",{className:"sr-only",children:"Open options"}),(0,r.jsx)(c.Z,{className:"h-8 w-8","aria-hidden":"true"})]})}),(0,r.jsx)(o.uT,{as:l.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:(0,r.jsx)(o.v2.Items,{className:"origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10",children:(0,r.jsx)("div",{className:"py-1",children:(0,r.jsx)(o.v2.Item,{children:function(e){var t=e.active;return(0,r.jsx)("a",{onClick:function(){a&&(0,N.SJ)({groupId:a.groupId,deleteGroupMessage:h,callback:function(){d(),v()}})},className:J(t?"bg-gray-100 text-red-900":"text-red-700","block px-4 py-2 text-sm"),children:"Delete"})}})})})})]})})]})]})})})},Q=function(e){var t=e.setToggleNewContact,n=e.toggleNewContact;return(0,r.jsx)("div",{className:"bg-white shadow",children:(0,r.jsx)("div",{className:"px-4 sm:px-6 py-2 lg:max-w-6xl lg:mx-auto lg:px-8 flex justify-end",children:(0,r.jsx)("button",{type:"button",onClick:function(){return t(!n)},className:"inline-flex items-center px-3 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:n?(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(d.Z,{className:"w-4 h-4"}),"Back"]}):(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(m.Z,{className:"w-4 h-4"}),"New Message"]})})})})},W=function(e){var t=e.setToggleNewContact,n=e.setCurrentConversationContact,s=(0,j.ff)().data;return(0,r.jsxs)("div",{className:"bg-white lg:min-w-0 lg:flex-1",children:[(0,r.jsx)("div",{className:"pl-4 pr-6 py-4 border-b flex items-center justify-center border-primary sm:pl-6 lg:pl-8 xl:pl-6",children:(0,r.jsx)("h4",{className:"font-semibold text-sm",children:"Select a Contact"})}),(0,r.jsx)("ul",{role:"list",className:"relative z-0 divide-y divide-gray-200 border-b border-gray-200",children:s.data.contacts.map((function(e,s){return(0,r.jsx)("li",{onClick:function(){n(e),t(!1)},className:"relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-3 sm:pl-6 lg:pl-8 xl:pl-6 blue=",children:(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsx)(L.Z,{contact:e,className:"h-10 w-10"}),(0,r.jsx)("div",{className:"flex flex-col justify-center",children:(0,r.jsx)("p",{className:"font-base",children:e.name})})]})})},s)}))})]})},Y=function(e){var t=e.sendBasicMessage,n=e.myDid,s=65535,i=(0,l.useState)(""),o=i[0],c=i[1],d=(0,l.useState)(),u=d[0],m=d[1],f=(0,l.useState)(1),x=f[0],h=f[1],g=(0,l.useState)(),p=g[0],y=g[1],j=(0,l.useState)(0),b=j[0],N=j[1],C=(0,l.useState)(s),k=C[0],E=C[1],I=(0,l.useState)(0),D=I[0],K=I[1],L=(0,l.useState)(""),M=L[0],U=L[1],R=(0,l.useState)(0),J=R[0],q=R[1],X=(0,l.useState)(0),G=X[0],$=X[1],Q=H((0,S.KO)(O.r2),1)[0],W=H((0,S.KO)(Z._B),1)[0],Y=H((0,S.KO)(O.D0),1)[0],ee=H((0,S.KO)(Z.Uy),1)[0],te=H((0,S.KO)(O.w5),1)[0],ne=(0,w.de)().mutate,se=(0,l.useRef)(null);(0,T.Z)(se.current,o);var ae=function(){v.Am.error("Error sending message. Please try again.")};(0,l.useEffect)((function(){J>0&&le(x)}),[p,D]);var re,ie=(re=a().mark((function e(){var t,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return oe(),U((0,P.Z)()),e.next=4,u.arrayBuffer();case 4:t=e.sent,q(t.byteLength),n=t.byteLength%s==0?t.byteLength/s:Math.floor(t.byteLength/s)+1,$(n),y(t);case 9:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(n,s){var a=re.apply(e,t);function r(e){A(a,n,s,r,i,"next",e)}function i(e){A(a,n,s,r,i,"throw",e)}r(void 0)}))}),le=function(){if(h(x+1),x<=G){var e=p.slice(b,k);if(de({id:M,data:e},"file-transfer-chunk"),N(k),E(k+s),x==G)console.log("Process is complete, counter",x),K(100),ue();else K(x/G*100)}},oe=function(){K(0),h(1),N(0),E(s)},ce=function(e){t({msg:e||o,did:te.did,type:"https://didcomm.org/basicmessage/2.0/message",amount:Q?50:0,reply_to_id:"",isPayment:!1},{onError:ae})},de=function(e,t){if("file-transfer-chunk"!==t){var s=(null===W||void 0===W?void 0:W.metadata.networkId)!==ee?null===W||void 0===W?void 0:W.metadata.networkId:null,a={timestamp:(new Date).toString(),from:n.id,did:te.did,networkId:s,type:t},r=B("live-message"===t?{msg:e}:{data:e},a);null===W||void 0===W||W.peer.write(JSON.stringify(r))}else{var i="".concat(e.id,":").concat((0,_.c)(e.data));null===W||void 0===W||W.peer.write(i)}},ue=function(){var e=u.name,t=u.type,s=u.size;if(console.log("File transfer is complete: ",e),de({name:e,type:t,size:s,id:M},"file-transfer-done"),"image"===t.split("/")[0]){var a=new FileReader;a.readAsDataURL(u),a.onloadend=function(){ne({msg:{name:e,type:t,size:s,id:M,image:a.result},type:"file-transfer-done",from:n.id,did:te.did})}}else ne({msg:{name:e,type:t,size:s,id:M,image:""},type:"file-transfer-done",from:n.id,did:te.did});m(),y(),K(0)},me=function(){if(u&&function(){if(W)ie();else if(!W&&u.size>2e6)v.Am.error("File size is too large to send. (Max 2MB). Please connect with user to send larger files.");else{var e=new FileReader;e.readAsDataURL(u),e.onloadend=function(){ce(JSON.stringify({data:{name:u.name},dataUri:e.result})),m()}}}(),o.length>0&&(Y||te)){if(W)return de(o,"live-message"),ne({msg:o,type:"live-message",from:n.id,did:te.did}),void c("");ce()}c("")};return(0,r.jsxs)("div",{className:"bg-white shadow px-4",children:[u&&(0,r.jsx)(z.Z,{fileInput:u,setFileInput:m,progress:D}),(0,r.jsx)("div",{className:"px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8",children:(0,r.jsx)("div",{className:"py-2 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200",children:(0,r.jsxs)("div",{className:"mt-6 flex space-x-3 md:mt-0 md:ml-4 w-full items-end",children:[(0,r.jsx)(V,{onEmojiSelect:function(e){c((function(t){return t.concat(" ".concat(e.native," "))}))}}),(0,r.jsx)(F.Z,{setFile:m}),(0,r.jsx)("textarea",{name:"name",id:"name",ref:se,value:o,onKeyPress:function(e){e.shiftKey&&"Enter"===e.key?c("".concat(o)):"Enter"!==e.key||me()},onChange:function(e){"\n"!==e.target.value&&c(e.target.value)},className:"tracking-wide shadow-sm focus:ring-primary focus:border-primary border-primary border block w-full sm:text-sm border-gray-300 px-4 rounded-md pt-2",placeholder:"Start a new message"}),(0,r.jsx)("button",{type:"button",onClick:function(){return me()},className:"max-h-10 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",children:"Send"})]})})})]})},ee=function(e){var t=e.activeConversation,n=(0,l.useState)([]),s=n[0],a=n[1],i=(0,j.ff)().data,o=(0,b.LU)().data,c=H((0,S.KO)(O.Lu),2),d=c[0],u=c[1],m=H((0,S.KO)(Z._B),1)[0],f=(0,l.useRef)(null);(0,l.useEffect)((function(){var e;null===(e=f.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})})),(0,l.useEffect)((function(){t?(a(t.messages),u((0,N.MQ)(d,t.messages))):a([])}),[d,u,t]);var v=function(e){if("https://didcomm.org/webrtc/1.0/sdp"===e.data.type)return"offer"===e.data.body.content.signal.type?(0,r.jsxs)("p",{children:["Sent an invitiation to connect."," ",(0,N.qP)(e.data.created_time)&&(0,C.Ho)(e.data.from)!==o.id&&(0,r.jsx)("a",{className:"font-bold underline",onClick:function(){return(0,k.WV)({detail:{message:e.data.body.content,knownContact:(0,M.Er)({shortFormDid:(0,C.Ho)(e.data.from),contacts:i.data.contacts}),sourceType:"didcomm"}})},children:"Show"})]}):"Sent you an invite to connect.";if("file-transfer-done"===e.data.type)return e.data.body.content.image?(0,r.jsx)("img",{src:e.data.body.content.image,alt:"",width:500,height:500}):(0,r.jsx)(K.Z,{message:{data:e.data.body.content,from:(0,C.Ho)(e.data.from)},myDid:o.id});var t=e.data.body.content;if(R(t)){var n=JSON.parse(t),s=n.data.name,a=n.dataUri;if(s&&D()().test(a)){var l=atob(a.split(",")[1]),c=a.split(",")[0].split(":")[1].split(";")[0];if("image"===c.split("/")[0])return(0,r.jsx)("img",{src:a,alt:"",width:500,height:500});for(var d=new Uint8Array(l.length),u=0;u<l.length;u++)d[u]=l.charCodeAt(u);var m=new File([d],s,{type:c});return(0,r.jsx)(K.Z,{message:{data:{name:s,type:c,size:m.size,id:null},from:e.data.from},fileObj:m,myDid:o.id})}return t}return t};return(0,r.jsxs)("div",{className:"flex flex-col w-full h-full pt-6 overflow-y-auto",children:[s.map((function(e,t){return(0,r.jsx)("div",{className:"flex py-1 ".concat((0,C.Ho)(e.data.from)===o.id?"pl-4 flex-row-reverse":"pr-4"),children:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("span",{className:"px-4 py-2 rounded-lg inline-block rounded-br-none text-sm whitespace-pre-line ".concat((n=(0,C.Ho)(e.data.from),n===o.id?(null===m||void 0===m?void 0:m.peer.connected)?"bg-blue-600 text-white":"bg-secondary text-white":"bg-gray-200 text-gray-800")),children:v(e)}),e.data.body.payment&&(0,r.jsxs)("p",{className:"text-sm inline-flex text-center",children:[(0,C.Ho)(e.data.from)===o.id?"Sent":"Received",": +",parseInt(e.data.body.payment).toLocaleString()," sats"," ",(0,r.jsx)(x.mly,{className:"w-3 h-3 mt-1.5 ml-0.5"})]}),(0,r.jsx)("div",{className:"flex ".concat((0,C.Ho)(e.data.from)===o.id&&"flex-row-reverse"),children:(0,r.jsx)("p",{className:"text-primary opacity-30 text-xs",children:p().unix(e.data.created_time).fromNow()})})]})},t);var n})),(0,r.jsx)("div",{ref:f})]})},te=function(e){var t=e.openContactPreview,n=e.setOpenContactPreview,s=e.currentConversationContact;return(0,r.jsx)(o.uT.Root,{show:t,as:l.Fragment,children:(0,r.jsx)(o.Vq,{as:"div",className:"fixed inset-0 overflow-hidden z-10",onClose:n,children:(0,r.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,r.jsx)(o.Vq.Overlay,{className:"absolute inset-0"}),(0,r.jsx)("div",{className:"pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10",children:(0,r.jsx)(o.uT.Child,{as:l.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,r.jsx)("div",{className:"pointer-events-auto w-screen max-w-md",children:(0,r.jsxs)("div",{className:"flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl",children:[(0,r.jsx)("div",{className:"px-4 sm:px-6",children:(0,r.jsxs)("div",{className:"flex items-start justify-between",children:[(0,r.jsxs)(o.Vq.Title,{className:"text-lg font-medium text-gray-900",children:[" ","Contact"," "]}),(0,r.jsx)("div",{className:"ml-3 flex h-7 items-center",children:(0,r.jsxs)("button",{type:"button",className:"rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",onClick:function(){return n(!1)},children:[(0,r.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,r.jsx)(f.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})]})}),(0,r.jsx)("div",{className:"relative mt-6 flex-1 px-4 sm:px-6",children:(0,r.jsx)(h.ContactView,{selectedContact:s})})]})})})})]})})})};function ne(){var e=(0,l.useState)(!1),t=e[0],n=e[1],s=(0,l.useState)(!1),a=s[0],o=s[1],c=(0,l.useState)(!1),d=c[0],u=c[1],m=(0,l.useState)(),f=m[0],x=m[1],h=H((0,S.KO)(O.D0),2),g=h[0],p=h[1],N=H((0,S.KO)(O.w5),2),C=N[0],E=N[1],F=H((0,S.KO)(Z.fo),2)[1],z=H((0,S.KO)(O.r2),1)[0],I=(0,j.ff)().data,D=(0,b.LU)().data,_=(0,w.mA)({myDid:D,contacts:null===I||void 0===I?void 0:I.data.contacts}).data,K=(0,w.$3)().mutate;(0,l.useEffect)((function(){if(g){var e=null===_||void 0===_?void 0:_.conversations.find((function(e){return e.groupId===g}));if(e){var t=(0,M.Lz)({message:e.messages[0],contacts:null===I||void 0===I?void 0:I.data.contacts,myDid:D});x(e),E(t[0])}}}),[null===I||void 0===I?void 0:I.data.contacts,g,null===_||void 0===_?void 0:_.conversations,D,E]),(0,l.useEffect)((function(){if(C){var e=null===_||void 0===_?void 0:_.conversations.find((function(e){return e.messages.find((function(e){return e.recipients.includes(C.did)}))}));e?x(e):(x(),p())}}),[g,E,null===I||void 0===I?void 0:I.data.contacts,D,_,C,p]);return(0,r.jsxs)(i.Z,{currentPage:"Messaging",children:[(0,r.jsx)(y.Z,{open:a,setOpen:o,selectedContact:C||null}),(0,r.jsx)("div",{className:"z-20",children:(0,r.jsx)(te,{openContactPreview:t,setOpenContactPreview:n,currentConversationContact:C})}),(0,r.jsxs)("div",{className:"flex-1 relative z-0 flex overflow-hidden h-full lg:pr-96 lg:mr-16",children:[(0,r.jsx)("main",{className:"flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white border-r",children:(g||C)&&(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"flex flex-col h-full",children:[(0,r.jsx)("div",{className:"flex-none",children:(0,r.jsx)($,{setOpenContactPreview:n,setOpenPayment:o,sendInvite:function(){var e=(0,P.Z)(),t=(0,k.aH)({networkId:e,networkOwner:D.id,sendBasicMessage:K,lightningEnabled:z,src:D.id,contact:C,type:"live-messaging-invitation",localStream:!1});v.Am.success("Invite Sent"),F(t)},activeConversation:f})}),(0,r.jsx)("div",{className:"grow flex-1 pl-8 pr-4 overflow-hidden",children:(0,r.jsx)(ee,{activeConversation:f})}),(0,r.jsx)("div",{className:"flex-none",children:(0,r.jsx)(Y,{sendBasicMessage:K,myDid:D})})]})})}),(0,r.jsxs)("aside",{className:"hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto",children:[(0,r.jsx)(Q,{setToggleNewContact:u,toggleNewContact:d}),d?(0,r.jsx)(W,{setToggleNewContact:u,setCurrentConversationContact:E}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(q,{}),(0,r.jsx)(G,{})]})]})]})]})}}},function(e){e.O(0,[774,270,445,13,614,967,240,426,267,888,179],(function(){return t=72848,e(e.s=t);var t}));var t=e.O();_N_E=t}]);