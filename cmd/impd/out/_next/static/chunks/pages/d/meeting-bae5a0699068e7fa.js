(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[783],{7309:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/d/meeting",function(){return n(45392)}])},51079:function(e,t,n){"use strict";var r=n(85893),a=n(67294),s=n(42633);t.Z=function(e){var t=e.setFile,n=e.disabled,i=(0,a.useRef)(null);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{type:"button",onClick:function(e){i.current.click()},children:(0,r.jsx)(s.Z,{className:"h-10 w-10 text-gray-600 font-light","aria-hidden":"true"})}),(0,r.jsx)("input",{type:"file",ref:i,onChange:function(e){t(e.target.files[0]),i.current.value=null},style:{display:"none"},disabled:n})]})}},45192:function(e,t,n){"use strict";var r=n(85893),a=(n(67294),n(68163)),s=n(86588),i=n(13902),l=n(40782);t.Z=function(e){var t,n=e.fileInput,o=e.setFileInput,c=e.progress,d=function(){return o()};return(0,r.jsxs)("div",{children:[" ",(0,r.jsx)("div",{className:"my-3 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",children:(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{className:"w-0 flex-1 flex justify-between",children:(0,r.jsxs)("p",{className:"w-0 flex-1 text-sm font-medium text-gray-900",children:[n.name," ",(0,r.jsxs)("span",{className:"font-light text-gray-500",children:["(",n.size," bytes)"]})]})}),(0,r.jsx)("div",{className:"ml-4 flex-shrink-0 flex",children:t>0?(0,r.jsx)(s.gy,{height:"20",width:"20",color:"#312e81",ariaLabel:"loading"}):n.isError?(0,r.jsx)(i.Z,{onClick:function(){l.Am.error("Unable to upload file. Please try again."),d(file.id)},className:"h-6 w-6 text-red-600","aria-hidden":"true"}):(0,r.jsxs)("button",{type:"button",className:"bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",onClick:function(){return d()},children:[(0,r.jsx)("span",{className:"sr-only",children:"Close"}),(0,r.jsx)(a.Z,{className:"h-5 w-5","aria-hidden":"true"})]})})]}),c>0&&(0,r.jsx)("div",{className:"flex items-center pt-2",children:(0,r.jsx)("div",{className:"w-full bg-gray-200 rounded-full dark:bg-gray-700 mx-20",children:(0,r.jsxs)("div",{className:"bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",style:{width:"".concat(Math.floor(c),"%")},children:[" ",Math.floor(c),"%"]})})})]})})]})}},59758:function(e,t,n){"use strict";var r=n(85893),a=(n(67294),n(42833)),s=n(63090),i=n(93162);t.Z=function(e){var t=e.message,n=e.myDid,l=e.fileObj;return(0,r.jsx)("div",{className:"bg-white px-4 py-5 border-2 border-gray-200 rounded-lg sm:px-6 mt-6",children:(0,r.jsxs)("div",{className:"-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap",children:[(0,r.jsx)("div",{className:"ml-4 mt-4",children:(0,r.jsx)("div",{className:"flex space-x-2 items-center",children:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("h3",{className:"text-md leading-6 break-all font-medium text-gray-900",children:t.data?t.data.name:"No File Name"}),(0,r.jsx)("p",{className:"mt-1 text-sm font-light text-gray-500",children:t.data&&"(".concat(t.data.size," bytes)")})]})})}),(0,r.jsx)("div",{className:"ml-4 mt-4 flex-shrink-0",children:t.from!==n&&(0,r.jsx)("button",{type:"button",onClick:function(){return function(){var e=t.data,n=e.id,r=e.name,a=e.type;l?(0,i.saveAs)(l,r):(0,s.X$)("file-download-request",{id:n,name:r,type:a})}()},className:"relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-black",children:(0,r.jsx)(a.Z,{className:"h-6 w-6","aria-hidden":"true"})})})]})})}},49332:function(e,t,n){"use strict";var r=n(67294);t.Z=function(e,t){(0,r.useEffect)((function(){if(e){e.style.height="40px",e.style.minHeight="40px";var t=e.scrollHeight;e.style.height=t+"px"}}),[e,t])}},45392:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return L}});var r=n(85893),a=n(67294),s=n(56727),i=n(5506),l=function(){return(0,r.jsxs)("div",{className:"flex flex-row w-full h-full justify-between",children:[(0,r.jsx)("div",{})," ",(0,r.jsx)("div",{className:"flex justify-items-center",children:(0,r.jsx)("span",{className:"inline-flex items-center text-sm text-primary font-semibold font-medium",children:"Chat"})}),(0,r.jsx)("div",{})," "]})},o=n(30381),c=n.n(o),d=n(59758),u=n(6218),f=function(e){var t=e.myDid,n=e.messages,s=e.setHasUnreadVideoMessages,i=(0,a.useRef)(null),l=(0,u.ff)().data;(0,a.useEffect)((function(){var e;null===(e=i.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),[n]),(0,a.useEffect)((function(){n.length&&s(!1)}),[n,s]);var o=function(e){var t=null===l||void 0===l?void 0:l.data.contacts.find((function(t){return t.did===e}));return t?"".concat(t.name,": "):""};return(0,r.jsxs)("div",{className:"flex flex-col w-full h-full overflow-y-auto",children:[n.map((function(e,n){return(0,r.jsx)("div",{children:"file-transfer-done"===e.type?(0,r.jsx)(d.Z,{message:e,myDid:t}):(0,r.jsx)("div",{className:"flex py-1 ".concat(e.from===t?"pl-4 flex-row-reverse":"pr-4"),children:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("span",{className:"px-4 py-2 rounded-lg inline-block rounded-br-none whitespace-pre-line ".concat(e.from===t?"bg-primary bg-opacity-10 text-primary text-sm":"bg-secondary text-white text-sm"),children:e.data}),(0,r.jsx)("div",{className:"flex ".concat(e.from===t&&"flex-row-reverse"),children:(0,r.jsx)("p",{className:"text-primary opacity-80 text-xs",children:"".concat(o(e.from)).concat(c()(e.timestamp).fromNow())})})]})},n)},n)})),(0,r.jsx)("div",{ref:i})]})};var m=a.forwardRef((function(e,t){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),a.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z",clipRule:"evenodd"}))})),x=n(40782),h=n(51079),g=n(45192),p=n(49332),v=n(72045),y=function(e){var t=e.sendPeerMessage,n=e.peers,s=3145728,i=(0,a.useState)(""),l=i[0],o=i[1],c=(0,a.useState)(),d=c[0],u=c[1],f=(0,a.useState)(1),y=f[0],w=f[1],j=(0,a.useState)({}),b=j[0],N=j[1],E=(0,a.useState)(0),k=E[0],C=E[1],O=(0,a.useState)(s),S=O[0],R=O[1],M=(0,a.useState)(0),T=M[0],z=M[1],F=(0,a.useState)(""),Z=F[0],V=F[1],P=(0,a.useState)(0),I=P[0],L=P[1],_=(0,a.useState)(0),A=_[0],H=_[1],K=(0,a.useRef)(null);(0,p.Z)(K.current,l),(0,a.useEffect)((function(){I>0&&B(y)}),[b,T]);var B=function(){if(w(y+1),y<=A){var e=b.name,n=b.type,r=b.slice(k,S);if(t({name:e,type:n,id:Z,data:r},"file-transfer-chunk"),C(S),R(S+s),y==A)console.log("Process is complete, counter",y),z(100),q();else{var a=y/A*100;z(a),console.log("SENDING FILE TRANSFER, PERCENTILE",a),console.log("CHUNK: ",r)}}},D=function(){z(0),w(1),C(0),R(s)},U=function(e){d&&W(),0!==n.length?(l.length>0&&t(l,"chat-message"),o("")):x.Am.error("Start a call with someone to use ephemeral chat.")},q=function(){var e=d.name,n=d.type,r=d.size;console.log("File transfer is complete: ",d),t({name:e,type:n,size:r,id:Z},"file-transfer-done"),u(),N(),z(0)},W=function(){console.log("Sending file: ",d.name),function(){D(),L(d.size);var e=d.size%s==0?d.size/s:Math.floor(d.size/s)+1;H(e),console.log("fileInput",d),N(d),V((0,v.Z)())}()};return(0,r.jsxs)(r.Fragment,{children:[d&&(0,r.jsx)(g.Z,{fileInput:d,setFileInput:u,progress:T}),(0,r.jsxs)("div",{className:"flex flex-row w-full items-end",children:[(0,r.jsx)("textarea",{type:"text",name:"message",id:"message",ref:K,className:"shadow-sm pl-2 pt-2 block w-full sm:text-sm border border-grey-100 rounded-md",placeholder:"Type message here ...",onKeyDown:function(e){e.shiftKey&&"Enter"===e.key?o("".concat(l)):"Enter"!==e.key||U()},value:l,onChange:function(e){"\n"!==e.target.value&&o(e.target.value)}}),(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)(h.Z,{setFile:u}),(0,r.jsx)("button",{type:"button",onClick:function(){return U()},disabled:0===n.length,className:"mx-1",children:(0,r.jsx)(m,{className:"h-10 w-10 text-secondary","aria-hidden":"true"})})]})]})]})},w=n(91131),j=n(46249),b=n(82130);function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,s=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(o){a=!0,s=o}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function E(e){var t=e.peers,n=e.openMessaging,o=e.toggleMessaging,c=e.id,d=(0,j.LU)().data,u=N((0,w.KO)(b.A2),1)[0],m=N((0,w.KO)(b.hi),2)[1],x=N((0,w.KO)(b.cN),2)[1];return(0,r.jsx)(s.uT.Root,{show:n,as:a.Fragment,children:(0,r.jsx)(s.Vq,{as:"div",className:"fixed inset-0 overflow-hidden z-10",onClose:o,children:(0,r.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,r.jsx)(s.Vq.Overlay,{className:"absolute inset-0 bg-gray-500 bg-opacity-10 transition-opacity"})}),(0,r.jsx)("div",{className:"fixed inset-y-0 right-0 pl-10 max-w-full flex",children:(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,r.jsxs)("div",{className:"relative w-96 max-w-full",children:[(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,r.jsx)("div",{className:"absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4",children:(0,r.jsxs)("button",{type:"button",className:"rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",onClick:function(){return o()},children:[(0,r.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,r.jsx)(i.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})}),(0,r.jsxs)("div",{className:"h-full flex flex-col bg-white shadow-xl overflow-y-scroll",children:[(0,r.jsx)("div",{className:"grow-0 px-4 py-6 bg-gray-50 sm:px-6",children:(0,r.jsx)(l,{})}),(0,r.jsx)("div",{className:"grow h-full px-4 overflow-hidden",children:(0,r.jsx)(f,{messages:u,myDid:null===d||void 0===d?void 0:d.id,setHasUnreadVideoMessages:x})}),(0,r.jsx)("div",{className:"grow-0 px-4 border-t border-gray-200 py-4 sm:px-6",children:(0,r.jsx)(y,{peers:t,sendPeerMessage:function(e,n){var r={data:e,timestamp:(new Date).toString(),from:d.id,networkId:c,type:n};"chat-message"!==n&&"file-transfer-done"!==n||m(r),t.map((function(e){e.peer.write(JSON.stringify(r))}))}})})]})]})})})]})})})}function k(e){var t=e.openParticipants,n=e.toggleParticipants,l=e.peers,o=(e.id,(0,a.useState)(!1)),c=(o[0],o[1]);return(0,r.jsx)(s.uT.Root,{show:t,as:a.Fragment,children:(0,r.jsx)(s.Vq,{as:"div",className:"fixed inset-0 overflow-hidden",onClose:n,children:(0,r.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,r.jsx)(s.Vq.Overlay,{className:"absolute inset-0 bg-gray-500 bg-opacity-0 transition-opacity"})}),(0,r.jsx)("div",{className:"fixed inset-y-0 right-0 pl-10 max-w-full flex",children:(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"transform transition ease-in-out duration-500 sm:duration-700",enterFrom:"translate-x-full",enterTo:"translate-x-0",leave:"transform transition ease-in-out duration-500 sm:duration-700",leaveFrom:"translate-x-0",leaveTo:"translate-x-full",children:(0,r.jsxs)("div",{className:"relative w-screen max-w-lg",children:[(0,r.jsx)(s.uT.Child,{as:a.Fragment,enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,r.jsx)("div",{className:"absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4",children:(0,r.jsxs)("button",{type:"button",className:"rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",onClick:function(){return n()},children:[(0,r.jsx)("span",{className:"sr-only",children:"Close panel"}),(0,r.jsx)(i.Z,{className:"h-6 w-6","aria-hidden":"true"})]})})}),(0,r.jsxs)("div",{className:"h-full flex flex-col bg-white shadow-xl overflow-y-scroll",children:[(0,r.jsx)("div",{className:"grow-0 px-4 py-6 bg-gray-50 sm:px-6 flex justify-center",children:(0,r.jsx)("div",{className:"hidden sm:block flex space-x-4",children:(0,r.jsx)("div",{className:"flex",children:(0,r.jsx)("p",{className:"px-3 py-2 font-medium text-sm rounded-md",children:"Participants"})})})}),(0,r.jsx)("div",{className:"grow px-4 h-full",children:(0,r.jsx)("div",{className:"flow-root mt-6",children:(0,r.jsx)("ul",{className:"-my-5 divide-y divide-gray-200 px-5",children:l.map((function(e,t){return(0,r.jsx)("li",{className:"py-3",children:(0,r.jsx)("div",{className:"flex items-center space-x-4",children:(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate",children:e.destDid})})})},t)}))})})}),(0,r.jsx)("div",{className:"grow-0 px-4 border-t border-gray-200 py-4 sm:px-6",children:(0,r.jsxs)("div",{className:"flex space-x-4 justify-center",children:[(0,r.jsx)("button",{type:"button",className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Mute All"}),(0,r.jsx)("button",{onClick:function(){return c(!0)},type:"button",className:"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Invite"})]})})]})]})})})]})})})}var C=n(78757);var O=a.forwardRef((function(e,t){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),a.createElement("path",{fillRule:"evenodd",d:"M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z",clipRule:"evenodd"}))}));var S=a.forwardRef((function(e,t){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),a.createElement("path",{fillRule:"evenodd",d:"M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z",clipRule:"evenodd"}))})),R=n(63750),M=n(89583),T=n(64449),z=n(18426);function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,s=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(o){a=!0,s=o}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Z=function(e){var t=e.peer,n=(0,a.useRef)();return(0,a.useEffect)((function(){t.peer.on("stream",(function(e){n.current&&(n.current.srcObject=e)}))}),[t.peer]),(0,a.useEffect)((function(){t.peer._remoteStreams&&t.peer._remoteStreams.length>0&&(n.current.srcObject=t.peer._remoteStreams[0])}),[t.peer._remoteStreams]),(0,r.jsx)("div",{className:"flex justify-center bg-gray-100 rounded-lg m-2 px-2",children:(0,r.jsx)("video",{className:"h-full",playsInline:!0,ref:n,autoPlay:!0})})},V=function(e){var t=e.toggleMessaging,n=e.peers,s=e.id,i=(0,a.useState)(!0),l=i[0],o=i[1],c=(0,a.useState)(!0),d=c[0],u=c[1],f=(0,a.useState)(!1),m=f[0],x=f[1],h=(0,a.useState)(!1),g=h[0],p=h[1],v=(0,a.useState)(!1),y=v[0],j=v[1],N=(0,a.useRef)(),E=F((0,w.KO)(b.g7),2),k=E[0],V=E[1],P=F((0,w.KO)(b.Vl),2),I=P[0],L=P[1],_=F((0,w.KO)(b.Uy),1)[0],A=F((0,w.KO)(b.cN),1)[0];(0,a.useEffect)((function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(e){N.current&&(N.current.srcObject=e),V(e)}))}),[V]),(0,a.useEffect)((function(){0===n.length&&(null===k||void 0===k||k.getVideoTracks().forEach((function(e){e.enabled=!0})),o(!0),u(!0))}),[n,k]);var H,K=function(e){var t=e.getVideoTracks()[0];n.forEach((function(e){var n;(null===(n=e.peer._pc)||void 0===n?void 0:n.getSenders().find((function(e){return e.track.kind===t.kind}))).replaceTrack(t)})),x(!m)};return(0,r.jsxs)("div",{className:"bg-gray-50 w-full h-full flex items-center flex-col",children:[(0,r.jsx)("div",{className:"h-5/6 w-full pl-12 pr-12 mt-8",children:(0,r.jsxs)("div",{className:"grid w-full h-full ".concat((H=n.length,H<1?"":1===H?"grid-cols-2":H>1&&H<=3?"grid-cols-2 grid-rows-2":H>3&&H<=5?"grid-cols-3 grid-rows-2":H>5&&H<=7?"grid-cols-4 grid-rows-2":void 0)),children:[(0,r.jsx)("div",{className:"flex justify-center bg-gray-100 rounded-lg m-2 px-2",children:(0,r.jsx)("video",{className:"h-full",playsInline:!0,muted:!0,ref:N,autoPlay:!0})}),n.map((function(e,t){return(0,r.jsx)(Z,{peer:e},t)}))]})}),(0,r.jsx)("div",{className:"absolute bottom-0 w-11/12 mb-4 px-6",children:(0,r.jsxs)("div",{className:"px-10 h-16 bg-black bg-opacity-40 inset-x-0 bottom-0 flex justify-between items-center rounded-lg",children:[(0,r.jsx)("div",{className:"flex space-x-4",children:n.length>0&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("button",{type:"button",onClick:function(){n.forEach((function(e){e.peer.streams.length>0&&e.peer.streams.forEach((function(e){e.getAudioTracks().length>0&&e.getAudioTracks().forEach((function(e){e.enabled=!l,o(!l)}))}))}))},className:"flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[l?(0,r.jsx)(R.fr_,{className:"mb-2 h-6 w-6","aria-hidden":"true"}):(0,r.jsx)(R.$Jr,{className:"mb-2 h-6 w-6","aria-hidden":"true"}),l?"Mute":"Unmute"]}),(0,r.jsxs)("button",{type:"button",onClick:function(){n.forEach((function(e){e.peer.streams.length>0&&e.peer.streams.forEach((function(e){e.getVideoTracks().length>0&&e.getVideoTracks().forEach((function(e){e.enabled=!d,u(!d)}))}))}))},className:"flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[d?(0,r.jsx)(M.KoQ,{className:"mb-2 h-6 w-6","aria-hidden":"true"}):(0,r.jsx)(M.uCi,{className:"mb-2 h-6 w-6","aria-hidden":"true"}),d?"Stop Video":"Start Video"]})]})}),(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsxs)("button",{onClick:function(){return p(!0)},type:"button",className:"flex flex-col items-center px-2 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[(0,r.jsx)(C.Z,{className:"mb-2 h-6 w-6","aria-hidden":"true"}),n.length?"Participants (".concat(n.length,")"):"Participants"]}),(0,r.jsxs)("div",{className:"flex items-center px-6 py-2 ",children:[A&&(0,r.jsx)("div",{className:"bg-red-500 flex-shrink-0 w-3 h-3 rounded-full","aria-hidden":"true"}),(0,r.jsxs)("button",{onClick:function(){return t()},type:"button",className:"flex flex-col items-center px-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[(0,r.jsx)(O,{className:"mb-2 h-6 w-6","aria-hidden":"true"}),"Chat"]})]}),(0,r.jsx)("div",{className:"flex items-center px-6 py-2 ",children:(0,r.jsxs)("button",{onClick:function(){return console.log(k.getVideoTracks()[0]),void(m?navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(e){N.current&&(N.current.srcObject=e),V(e),K(e)})):navigator.mediaDevices.getDisplayMedia({audio:!0,video:!0,cursor:!0}).then((function(e){N.current&&(N.current.srcObject=e),V(e),K(e)})))},type:"button",className:"flex flex-col items-center px-2 text-sm leading-4 font-medium rounded-md text-green-400 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[(0,r.jsx)(S,{className:"mb-2 h-6 w-6","aria-hidden":"true"}),m?"Stop Screen Share":"Share Screen"]})}),(0,r.jsxs)("button",{type:"button",onClick:function(){return j(!0)},className:"flex flex-col items-center px-4 py-2 text-sm leading-4 font-medium rounded-md text-gray-50 bg-opacity-100 hover:bg-opacity-20 hover:bg-gray-100",children:[(0,r.jsx)(R.mly,{className:"mb-2 h-6 w-6 text-yellow-400","aria-hidden":"true"}),"Send/Receive"]})]}),(0,r.jsx)("div",{className:"flex space-x-4",children:(0,r.jsx)("button",{type:"button",onClick:function(){return L(I.filter((function(e){return e.networkId!==_}))),void n.forEach((function(e){e.peer.destroy()}))},className:"inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200",children:"End"})}),(0,r.jsx)(z.Z,{open:y,setOpen:j,selectedContact:null}),(0,r.jsx)(T.Z,{open:g,setOpen:p,networkId:s,localStream:k,title:"Invite Users to Meeting",subtitle:"Invite people to join this meeting.",type:"video-call-invitation"})]})})]})},P=n(11240);function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,s=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(o){a=!0,s=o}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var L=function(){var e=function(){return i(!s)},t=function(){return c(!o)},n=(0,a.useState)(!1),s=n[0],i=n[1],l=(0,a.useState)(!1),o=l[0],c=l[1],d=I((0,w.KO)(b.Uy),2),u=d[0],f=d[1],m=I((0,w.KO)(b.C3),1)[0];return(0,a.useEffect)((function(){if(!u){console.log("Creating a new meeting room.");var e=(0,v.Z)();f(e)}}),[u,f]),(0,r.jsxs)(P.Z,{currentPage:"Meeting",hideNav:!0,children:[(0,r.jsx)(V,{peers:m,id:u,toggleParticipants:t,toggleMessaging:e}),(0,r.jsx)(E,{peers:m,id:u,openMessaging:s,toggleMessaging:e}),(0,r.jsx)(k,{peers:m,id:u,openParticipants:o,toggleParticipants:t})]})}},88357:function(e,t,n){"use strict";n.d(t,{w_:function(){return c}});var r=n(67294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=r.createContext&&r.createContext(a),i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function o(e){return e&&e.map((function(e,t){return r.createElement(e.tag,i({key:t},e.attr),o(e.child))}))}function c(e){return function(t){return r.createElement(d,i({attr:i({},e.attr)},t),o(e.child))}}function d(e){var t=function(t){var n,a=e.attr,s=e.size,o=e.title,c=l(e,["attr","size","title"]),d=s||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,c,{className:n,style:i(i({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),o&&r.createElement("title",null,o),e.children)};return void 0!==s?r.createElement(s.Consumer,null,(function(e){return t(e)})):t(a)}},61782:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"}))}));t.Z=a},10822:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"}))}));t.Z=a},13902:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}))}));t.Z=a},58057:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"}))}));t.Z=a},42833:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"}))}));t.Z=a},42633:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",clipRule:"evenodd"}))}));t.Z=a},91013:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"}))}));t.Z=a},78757:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{d:"M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"}))}));t.Z=a},68163:function(e,t,n){"use strict";var r=n(67294);const a=r.forwardRef((function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"}))}));t.Z=a}},function(e){e.O(0,[270,445,13,614,240,426,449,774,888,179],(function(){return t=7309,e(e.s=t);var t}));var t=e.O();_N_E=t}]);