!function(){function n(n){return function(n){if(Array.isArray(n)){for(var e=0,r=new Array(n.length);e<n.length;e++)r[e]=n[e];return r}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var e=[];self.addEventListener("message",(function(r){var o=r.data,t=o.name,i=o.type,a=o.id,f=o.action,d=o.chunk,l=o.msgType,c=o.did,s=o.from;if(f){if("download"===f){console.log("prepping file for download: ",a);var u=e.find((function(n){return n.id===a}));if(!u)return void console.log("File is unavailable for download: ",a);var p=new Blob(u.chunks,{type:i}),g=new File([p],t,{type:i});self.postMessage({id:a,file:g,msgType:l,did:c,from:s})}"abort"===f&&(console.log("abording file transfer"),e=[])}else{var y=e.find((function(n){return n.id===a}));if(y)return y.chunks.push(d),void(e=e.map((function(n){return n.id===y.id?y:n})));e=n(e).concat([{id:a,chunks:[d]}])}})),_N_E={}}();