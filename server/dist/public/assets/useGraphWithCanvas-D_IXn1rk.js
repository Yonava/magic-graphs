var Qo=Object.defineProperty;var en=(e,t,o)=>t in e?Qo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var Ee=(e,t,o)=>en(e,typeof t!="symbol"?t+"":t,o);import{an as xe,ab as Jt,_ as tn,i as on,j as nn,k as rn,l as sn,n as an,p as ln,q as un,s as dn,v as cn,x as pn,D as te,ao as fn,ap as je,ac as bn,aq as Qt,ar as eo,d as z,a2 as ne,J as D,A as $,o as C,w as I,P as F,e as B,as as vn,c as O,a as M,L as X,am as j,u as P,at as gn,h as L,aj as xt,au as it,K as Y,F as oe,g as ue,t as W,y as S,av as mn,ai as De,b as se,aw as hn,a0 as be,G as _e,$ as yn,m as U,a8 as ze,ax as _n,ay as Cn,az as fe,aA as Te,aB as wn,aC as St,a6 as to,aD as xn,a7 as qe,aE as oo,aF as lt,a5 as Ye,aG as no,aH as Sn,aI as kn,aJ as En,aK as Tn,aL as kt,aM as ut,aN as ro,aO as he,aP as so,r as Be,ad as dt,aQ as ao,af as Ze,z as io,aR as An,aS as Ln,aT as ct,aU as lo,a9 as Ae,aV as nt,aW as Dn,aX as Bn,aY as In,aZ as Mn,a_ as Nn,a$ as Pn,b0 as On,al as $n,B as Rn,C as zn,b1 as Fn,b2 as rt,b3 as uo,b4 as Hn,b5 as Un,b6 as co,b7 as Gn,b8 as po,b9 as Kn,ba as Ie,f as Et,E as Wn,bb as jn,bc as Ue,bd as qn,be as Yn,bf as Zn,bg as Vn,bh as Xn,bi as Jn,bj as Qn,bk as er,bl as tr,bm as or,bn as nr,bo as rr,bp as sr,bq as ar,a1 as ir}from"./index-DZqqfzZN.js";import{g as Me,_ as fo,a as lr,d as ur,u as dr,c as cr}from"./Button.vue_vue_type_script_setup_true_lang-BljmUsSm.js";import{_ as Q}from"./Icon.vue_vue_type_script_setup_true_lang-CqUlvDnt.js";import{t as pr,M as Tt,a as At,_ as fr,b as Ce,u as br}from"./index-3Bhx9ktt.js";const bo=e=>({nodes:e.nodes.value,edges:e.edges.value,annotations:e.annotation.annotations.value,cameraPanX:e.magicCanvas.camera.state.panX.value,cameraPanY:e.magicCanvas.camera.state.panY.value,cameraZoom:e.magicCanvas.camera.state.zoom.value}),vo=(e,t)=>{e.load({nodes:t.nodes,edges:t.edges}),e.annotation.load(t.annotations);const{state:o}=e.magicCanvas.camera;o.panX.value=t.cameraPanX,o.panY.value=t.cameraPanY,o.zoom.value=t.cameraZoom},ce=10,go="1",mo="",We="",me="",vr=e=>{const{nodes:t,edges:o,cameraPanX:n,cameraPanY:s,cameraZoom:r}=e,l=t.reduce((p,c)=>{const _=Math.round(c.x/ce),g=Math.round(c.y/ce);return p+`${We}${c.label}${me}${_}${me}${g}`},"").slice(1),d=o.reduce((p,c)=>{const _=t.findIndex(h=>h.id===c.from),g=t.findIndex(h=>h.id===c.to),T=c.label===go?"":`${me}${c.label}`;return p+`${We}${_}${me}${g}`+T},"").slice(1),a=Math.round(n/ce),i=Math.round(s/ce),u=r.toFixed(2);return[l,d,a,i,u].join(mo)},gr=e=>{const[t,o,n,s,r]=e.split(mo),l=t?t.split(We).map(a=>{const[i,u,p]=a.split(me);return{id:Me(),label:i,x:Number(u)*ce,y:Number(p)*ce}}):[],d=o?o.split(We).map(a=>{const[i,u,p]=a.split(me);return{id:Me(),label:p??go,from:l[Number(i)].id,to:l[Number(u)].id}}):[];return{nodes:l,edges:d,cameraPanX:Number(n)*ce,cameraPanY:Number(s)*ce,cameraZoom:Number(r),annotations:[]}},mr=Object.assign({"/src/menu/info.ts":pn,"/src/playground/shape/info.ts":cn,"/src/products/basic-search/info.ts":dn,"/src/products/binary-trees/info.ts":un,"/src/products/dijkstras/info.ts":ln,"/src/products/markov-chains-legacy/info.ts":an,"/src/products/markov-chains/info.ts":sn,"/src/products/min-spanning-tree/info.ts":rn,"/src/products/network-flow/info.ts":nn,"/src/products/sandbox/info.ts":on,"/src/products/set-visualizer/info.ts":tn}),Fe=Object.values(mr).flatMap(e=>e.default);Fe.map(e=>e.route);const $l=Fe.reduce((e,t)=>(e[t.productId]=t,e),{}),pt=Fe.reduce((e,t)=>(e[t.route.path]=t,e),{}),hr=e=>Fe.map(n=>n.simulations).filter(Boolean).map(n=>n(e)).flat(),yr=(e,t)=>{const o=xe();if(!t){const s=pt[o.path];if(!s)throw new Error(`product not found for ${o.path}`);t=s.simulations}return(t??hr)(e)},_r=()=>{const e=xe(),t=Jt(),o=r=>{const l=e.query.rid;return typeof l=="string"&&l.length>0?`${r}?rid=${l}`:r},n=async r=>{var a,i;const l=(i=(a=r.route)==null?void 0:a.redirect)==null?void 0:i.toString(),d=l==null?void 0:l.startsWith("http");if(l&&d)return window.open(l,"_blank");await t.push(o(r.route.path))};return{navigate:n,navigateWithGraph:async r=>{const l=bo(te.value);await n(r),await new Promise(d=>setTimeout(d,0)),vo(te.value,l)},productLink:o}},Lt=["sandbox","algorithms","data structures","math","developer tools"],Cr=()=>{const e=xe();return pt[e.path]},wr=e=>"redirect"in e.route;var ho=["ctrl","alt","meta","shift"],yo="__0_1_2_3_4_5_6_7_8_9_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z_ _`_'_\"_~_!_@_#_$_%_^_&_*_(_)_._-_+_=_[_]_{_}_<_>_,_/_?_;_:_\\_|_capslock_numlock_enter_tab_arrowdown_arrowleft_arrowright_arrowup_end_home_pagedown_pageup_backspace_delete_insert_escape_f1_f2_f3_f4_f5_f6_f7_f8_f9_f10_f11_f12_f13_f14_f15_f16_f17_f18_f19_f20_f21_f22_f23".split("_");yo[1]="_";var ft={};for(let[e,t]of yo.entries())ft[t]=e;var xr={space:" ",plus:"+",up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright",esc:"escape"},bt=4,Sr=9,vt=Sr+bt,kr=2**bt,_o=2**vt,Er=2**(2*vt),Tr=2**(3*vt);function Ar(e){let t;return e==="+"?["+"]:(e.slice(-1)=="+"?(t=e.slice(0,-2).split("+"),t.push("+")):t=e.split("+"),t.map(o=>xr[o]||o))}function Lr(e){let t=new Set(e),o=ft[e[e.length-1].toLowerCase()]||0;for(let n of ho)o=2*o+(t.has(n)?1:0);return o}function Dt(e){return e>>bt}function et(e){return e%kr}function Dr(e,t){if(e===void 0||Dt(e)>0)return!1;let o=et(e),n=et(t);return o===n&&Dt(t)===0?!1:(o&et(t))===o}function Br(e){let t=ft[e.key.toLowerCase()]||0;for(let o of ho)t=2*t+(e[`${o}Key`]?1:0);return t}function Ve(e){return e.map(Ar)}function Xe(e){if(e.length>4)throw"Can't encode sequence of more than 4 keys!";let t=0;for(let o of e)t=t*_o+Lr(o);return t}function Ir(e){return e<_o?1:e<Er?2:e<Tr?3:4}function Mr(e){let t=[],o=0,n=0;for(let s=e.length-1;s>=0;s--)o=2**n*e[s]+o,n=n+13,t.push(o);return t}function Nr(e={}){return{history:[],historySize:0,bindings:new Map,disabledSequenceCodes:new Set,...e}}function Pr(e,t,o){let n=Xe(Ve(t));return e.bindings.has(n)||e.bindings.set(n,new Set),e.bindings.get(n).add(o),Co(e)}function Or(e,t,o){let n=Xe(Ve(t)),s=e.bindings.get(n);return s&&(s.delete(o),s.size==0&&e.bindings.delete(n)),Co(e)}function $r(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.delete(o),e}function Rr(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.add(o),e}function zr(e,t){let o=Br(t),n=e.history.at(-1);return Dr(n,o)&&e.history.pop(),e.history.push(o),e.history.length>e.historySize&&e.history.shift(),e}function Fr(e){let t=[];for(let o of Mr(e.history))e.disabledSequenceCodes.has(o)||t.push(...e.bindings.get(o)||[]);return t}function Hr(e,t){e=zr(e,t);let o=Fr(e);for(let n of o)n(t);return[e,o]}function Co(e){e.historySize=0;for(let t of e.bindings.keys())e.historySize=Math.max(e.historySize,Ir(t));return e}var Ur=class{constructor(e){this.state=e,this.add=this.add.bind(this),this.remove=this.remove.bind(this),this.handle=this.handle.bind(this)}add(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=Pr(this.state,t,o),this}remove(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=Or(this.state,t,o),this}enable(...e){return this.state=$r(this.state,e),this}disable(...e){return this.state=Rr(this.state,e),this}handle(e){let[t,o]=Hr(this.state,e);return this.state=t,o.length>0}};function wo(){return new Ur(Nr())}var xo=wo;const st=window.navigator.userAgent.includes("Mac")?"Mac":"Windows",Gr=e=>{const{settings:t}=e,o=xo(),n=()=>{if(e.annotation.isActive.value&&e.annotation.undo(),t.value.interactive){const w=e.history.undo();if(!w)return;e.focus.set(w.affectedItems.map(b=>b.data.id))}},s=()=>{if(e.annotation.isActive.value){e.annotation.redo();return}if(t.value.interactive){const w=e.history.redo();if(!w)return;e.focus.set(w.affectedItems.map(b=>b.data.id))}},r=()=>e.focus.reset(),l=()=>e.focus.all(),d=()=>{console.log("default delete"),t.value.interactive!==!1&&(e.bulkRemoveNode([...e.focus.focusedItemIds.value]),e.bulkRemoveEdge([...e.focus.focusedItemIds.value]))},a=(w,b)=>b===!1?()=>{}:typeof b=="function"?b:w,i={fn:()=>console.warn("not implemented")},u={fn:()=>console.warn("not implemented")},p={fn:()=>console.warn("not implemented")},c={fn:()=>console.warn("not implemented")},_={fn:()=>console.warn("not implemented")},g={fn:()=>console.warn("not implemented")},T={fn:()=>console.warn("not implemented")},h=()=>{i.fn=a(s,t.value.shortcutRedo),u.fn=a(n,t.value.shortcutUndo),p.fn=a(r,t.value.shortcutEscape),c.fn=a(l,t.value.shortcutSelectAll),_.fn=a(d,e.settings.value.shortcutDelete),g.fn=a(e.magicCanvas.camera.actions.zoomIn,t.value.shortcutZoomIn),T.fn=a(e.magicCanvas.camera.actions.zoomOut,t.value.shortcutZoomOut)},f={Mac:{Undo:{binding:"meta+z",trigger:()=>u.fn()},Redo:{binding:"meta+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>_.fn()},"Select All":{binding:"meta+a",trigger:()=>c.fn()},Deselect:{binding:"esc",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>g.fn()},"Zoom Out":{binding:"-",trigger:()=>T.fn()}},Windows:{Undo:{binding:"ctrl+z",trigger:()=>u.fn()},Redo:{binding:"ctrl+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>_.fn()},"Select All":{binding:"ctrl+a",trigger:()=>c.fn()},Deselect:{binding:"escape",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>g.fn()},"Zoom Out":{binding:"-",trigger:()=>T.fn()}}},k=Object.values(f[st]);for(const w of k){const b=w.binding;o.add(b,v=>{v==null||v.preventDefault(),w.trigger()})}const A=()=>{e.subscribe("onKeyDown",o.handle),e.subscribe("onSettingsChange",h)},y=()=>{e.unsubscribe("onKeyDown",o.handle),e.unsubscribe("onSettingsChange",h)};return t.value.shortcuts&&A(),e.subscribe("onSettingsChange",w=>{w.shortcuts===!0?A():w.shortcuts===!1&&y()}),{activeShortcuts:f[st],trigger:{delete:_,selectAll:c,escape:p,redo:i,undo:u}}};var So={exports:{}};(function(e){var t=function(){var o=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",r={};function l(a,i){if(!r[a]){r[a]={};for(var u=0;u<a.length;u++)r[a][a.charAt(u)]=u}return r[a][i]}var d={compressToBase64:function(a){if(a==null)return"";var i=d._compress(a,6,function(u){return n.charAt(u)});switch(i.length%4){default:case 0:return i;case 1:return i+"===";case 2:return i+"==";case 3:return i+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:d._decompress(a.length,32,function(i){return l(n,a.charAt(i))})},compressToUTF16:function(a){return a==null?"":d._compress(a,15,function(i){return o(i+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:d._decompress(a.length,16384,function(i){return a.charCodeAt(i)-32})},compressToUint8Array:function(a){for(var i=d.compress(a),u=new Uint8Array(i.length*2),p=0,c=i.length;p<c;p++){var _=i.charCodeAt(p);u[p*2]=_>>>8,u[p*2+1]=_%256}return u},decompressFromUint8Array:function(a){if(a==null)return d.decompress(a);for(var i=new Array(a.length/2),u=0,p=i.length;u<p;u++)i[u]=a[u*2]*256+a[u*2+1];var c=[];return i.forEach(function(_){c.push(o(_))}),d.decompress(c.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":d._compress(a,6,function(i){return s.charAt(i)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),d._decompress(a.length,32,function(i){return l(s,a.charAt(i))}))},compress:function(a){return d._compress(a,16,function(i){return o(i)})},_compress:function(a,i,u){if(a==null)return"";var p,c,_={},g={},T="",h="",f="",k=2,A=3,y=2,w=[],b=0,v=0,m;for(m=0;m<a.length;m+=1)if(T=a.charAt(m),Object.prototype.hasOwnProperty.call(_,T)||(_[T]=A++,g[T]=!0),h=f+T,Object.prototype.hasOwnProperty.call(_,h))f=h;else{if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(p=0;p<y;p++)b=b<<1,v==i-1?(v=0,w.push(u(b)),b=0):v++;for(c=f.charCodeAt(0),p=0;p<8;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1}else{for(c=1,p=0;p<y;p++)b=b<<1|c,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=0;for(c=f.charCodeAt(0),p=0;p<16;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1}k--,k==0&&(k=Math.pow(2,y),y++),delete g[f]}else for(c=_[f],p=0;p<y;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1;k--,k==0&&(k=Math.pow(2,y),y++),_[h]=A++,f=String(T)}if(f!==""){if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(p=0;p<y;p++)b=b<<1,v==i-1?(v=0,w.push(u(b)),b=0):v++;for(c=f.charCodeAt(0),p=0;p<8;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1}else{for(c=1,p=0;p<y;p++)b=b<<1|c,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=0;for(c=f.charCodeAt(0),p=0;p<16;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1}k--,k==0&&(k=Math.pow(2,y),y++),delete g[f]}else for(c=_[f],p=0;p<y;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1;k--,k==0&&(k=Math.pow(2,y),y++)}for(c=2,p=0;p<y;p++)b=b<<1|c&1,v==i-1?(v=0,w.push(u(b)),b=0):v++,c=c>>1;for(;;)if(b=b<<1,v==i-1){w.push(u(b));break}else v++;return w.join("")},decompress:function(a){return a==null?"":a==""?null:d._decompress(a.length,32768,function(i){return a.charCodeAt(i)})},_decompress:function(a,i,u){var p=[],c=4,_=4,g=3,T="",h=[],f,k,A,y,w,b,v,m={val:u(0),position:i,index:1};for(f=0;f<3;f+=1)p[f]=f;for(A=0,w=Math.pow(2,2),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;switch(A){case 0:for(A=0,w=Math.pow(2,8),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;v=o(A);break;case 1:for(A=0,w=Math.pow(2,16),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;v=o(A);break;case 2:return""}for(p[3]=v,k=v,h.push(v);;){if(m.index>a)return"";for(A=0,w=Math.pow(2,g),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;switch(v=A){case 0:for(A=0,w=Math.pow(2,8),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;p[_++]=o(A),v=_-1,c--;break;case 1:for(A=0,w=Math.pow(2,16),b=1;b!=w;)y=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),A|=(y>0?1:0)*b,b<<=1;p[_++]=o(A),v=_-1,c--;break;case 2:return h.join("")}if(c==0&&(c=Math.pow(2,g),g++),p[v])T=p[v];else if(v===_)T=k+k.charAt(0);else return null;h.push(T),p[_++]=k+T.charAt(0),c--,k=T,c==0&&(c=Math.pow(2,g),g++)}}};return d}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(So);var ko=So.exports;const Eo="g",Kr=e=>{const t=pt[e];if(!t)throw new Error(`no product found for route ${e}`);return t},Wr=(e,t)=>{const o=Jt(),n=xe(),s=eo(),r=()=>{const d=st==="Mac"?"⌘+Z":"Ctrl+Z";s.add({summary:`Loaded graph from link successfully. Press ${d} to undo.`,severity:"success",life:5e3})},l=()=>s.add({summary:"Failed to load graph from link 😕",severity:"error",life:5e3});if(o.replace({path:n.path,query:{}}),typeof t!="string"){console.error("graph share failed - serialized transit data not a string"),l();return}try{const d=ko.decompressFromEncodedURIComponent(t),a=gr(d);setTimeout(()=>vo(e,a),0),r()}catch{console.error("graph share failed - could not parse graph transit data"),l()}},jr=(e,t)=>{const o=xe();t||(t=Kr(o.path));const{connectToRoom:n}=bn,s=o.query.rid,{productId:r,name:l}=t;document.title=`${l} - Magic Graphs`,fn.value=e;const d=o.query[Eo];return d&&Wr(e,d),je(()=>{if(s){if(typeof s!="string")return console.error("room id must be a string");n({graph:e,roomId:s,productId:r})}}),Qt(()=>{var a;(a=t.state)==null||a.reset()}),t},ee=z({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const t=ne(),o=e,n=D(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:o.contrast?t.value.contrast:t.value.primary);return(s,r)=>(C(),$(fo,{color:n.value},{default:I(()=>[F(s.$slots,"default")]),_:3},8,["color"]))}}),Ge=z({__name:"PlaybackButton",props:{icon:{}},setup(e){return(t,o)=>(C(),$(ee,{style:{"border-radius":"40px"}},{default:I(()=>[B(Q,{class:"py-1 px-6 text-5xl",icon:t.icon},null,8,["icon"])]),_:1}))}}),qr={transitionTimeMs:250,transitionEasing:"ease-in-out"},Yr=z({__name:"Progressbar",props:vn({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},qr),setup(e){const t=ne(),o=e,n=D(()=>{const[a,i]=o.range;return i-a}),s=a=>{if(n.value===0)return 100;const[i]=o.range;return Math.min(Math.max(a-i,0),n.value)/n.value*100},r=a=>{const i=a.currentTarget;if(!(i instanceof HTMLElement))throw new Error("Invalid target");const u=a.offsetX,p=i.offsetWidth,c=u/p,_=o.range[0]+c*n.value;return Math.round(_)},l=a=>{var u;const i=r(a);(u=o.onProgressSet)==null||u.call(o,i)},d=a=>{var u;const i=r(a);(u=o.onHover)==null||u.call(o,i)};return(a,i)=>(C(),O("div",{onMousemove:d,onClick:l,class:"relative overflow-hidden h-4 w-full z-1 cursor-pointer"},[M("div",{class:j("absolute top-0 left-0 h-full z-0"),style:X({backgroundColor:o.color??P(t).tertiary,width:`${s(a.progress)}%`,transition:`width ${o.transitionTimeMs}ms ${o.transitionEasing}`})},null,4),M("div",{class:j("absolute top-0 left-0 h-full z-10"),style:X({backgroundColor:P(t).primary+"90",width:`${s(a.previewProgress??o.range[0])}%`})},null,4)],32))}}),Zr={class:"w-12"},Vr={class:"w-12"},Xr=z({__name:"GSpreadSelect",props:gn({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const t=L(),o=e,n=xt(e,"modelValue");if(n.value=o.items[o.initialItemIndex].value,n.value===void 0)throw new Error("invalid initialItemIndex");const s=D(()=>{var i;return(i=o.items.find(u=>u.value===n.value))==null?void 0:i.label}),r=xt(e,"open"),l=()=>r.value=!r.value;it(t,()=>r.value=!1);const d=i=>{n.value=i.value,r.value=!1},a=i=>i.value===n.value;return(i,u)=>(C(),O("div",null,[r.value?(C(),O("div",{key:0,ref_key:"target",ref:t,class:"flex gap-2 justify-center"},[(C(!0),O(oe,null,ue(i.items,p=>(C(),$(ee,{key:p.label,onClick:c=>d(p),class:j(["rounded-full",a(p)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:I(()=>[M("span",Zr,W(p.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):s.value?(C(),$(ee,{key:1,onClick:l,class:"rounded-full"},{default:I(()=>[M("span",Vr,W(s.value),1)]),_:1})):Y("",!0)]))}}),ye={Fullscreen:{binding:"f"},Help:{binding:"h"},"Pause/Play Simulation":{binding:"space"},"Simulation Step Forward":{binding:"arrowright"},"Simulation Step Backward":{binding:"arrowleft"}},Jr=z({__name:"GText",setup(e){const t={light:S.GRAY_900,dark:S.GRAY_100,pink:S.PINK_800},o=D(()=>t[te.value.themeName.value]),n=D(()=>({color:o.value}));return(s,r)=>(C(),O("div",{style:X(n.value)},[F(s.$slots,"default")],4))}}),Qr={class:"relative flex flex-col gap-5 items-center justify-center"},es={class:"flex w-full justify-center gap-2"},ts={class:"px-2"},os={class:"flex gap-4 fill-white dark:fill-black"},ns=z({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const t=ne(),o=e,{isOver:n,paused:s,step:r,hasBegun:l,lastStep:d,playbackSpeed:a,explanationAtStep:i}=mn(o.controls),{nextStep:u,prevStep:p,setStep:c,start:_,stop:g,showPlaybackSpeedControls:T,pauseOnStructureChange:h,defaultPlaybackSpeedMs:f}=o.controls,k=()=>{p(),s.value=!0},A=()=>{u(),s.value=!0},y=G=>{c(G),s.value=!0},w=()=>{s.value=!s.value},b=()=>{g(),_()},v=L(-1),m=G=>{v.value=G},x=()=>{v.value=-1},E=()=>{s.value=!0};h&&te.value.subscribe("onStructureChange",E),De(()=>{te.value.unsubscribe("onStructureChange",E)});const R=[{label:"0.25x",value:f/.25},{label:"0.5x",value:f/.5},{label:"1x",value:f},{label:"2x",value:f/2},{label:"4x",value:f/4}],H=L(!1),q=R.findIndex(G=>G.value===a.value)??2,Z=xo();return Z.add(ye["Pause/Play Simulation"].binding,()=>{n.value?b():w()}),Z.add(ye["Simulation Step Backward"].binding,k),Z.add(ye["Simulation Step Forward"].binding,A),window.addEventListener("keyup",Z.handle),De(()=>window.removeEventListener("keyup",Z.handle)),(G,ae)=>(C(),O("div",Qr,[P(i)?(C(),$(Jr,{key:0,class:"absolute font-bold text-xl w-[800px] text-center -top-12 pointer-events-none"},{default:I(()=>[se(W(P(i)),1)]),_:1})):Y("",!0),M("div",es,[P(T)?(C(),$(Xr,{key:0,modelValue:P(a),"onUpdate:modelValue":ae[0]||(ae[0]=ie=>hn(a)?a.value=ie:null),open:H.value,"onUpdate:open":ae[1]||(ae[1]=ie=>H.value=ie),items:R,"initial-item-index":P(q)},null,8,["modelValue","open","initial-item-index"])):Y("",!0),H.value?Y("",!0):(C(),$(ee,{key:1,class:"rounded-full"},{default:I(()=>[M("span",ts," Step "+W(P(r)+1),1)]),_:1}))]),P(d)!==1/0?(C(),$(Yr,{key:1,onMouseleave:x,range:[0,P(d)],progress:P(r),"on-progress-set":y,"preview-progress":v.value,"on-hover":m,style:X({borderColor:P(t).tertiary}),class:"w-full border-2 rounded-lg"},null,8,["range","progress","preview-progress","style"])):Y("",!0),M("div",os,[B(Ge,{onClick:k,disabled:!P(l),icon:"chevron-left"},null,8,["disabled"]),P(n)?(C(),$(Ge,{key:0,onClick:b,disabled:P(d)===0,icon:"restart"},null,8,["disabled"])):(C(),$(Ge,{key:1,onClick:w,icon:P(s)?"play":"pause"},null,8,["icon"])),B(Ge,{onClick:A,disabled:P(n),icon:"chevron-right"},null,8,["disabled"])])]))}}),To=[S.RED_600,S.BLUE_600,S.GREEN_600,S.YELLOW_600],Ao=[3,6,9,12],Rl="element-highlight",zl=1e3,rs=1e3,ss={class:"text-3xl font-bold"},Bt=300,as=z({__name:"TutorialHint",props:{tutorial:{}},setup(e){const t=L(0),o=D(()=>{var r;return((r=e.tutorial.sequence.value[e.tutorial.step.value])==null?void 0:r.hint)??""}),n=L("");let s;return be(o,()=>{t.value=0,clearTimeout(s),s=setTimeout(()=>{n.value=o.value,t.value=1},Bt+rs)},{immediate:!0}),(r,l)=>(C(),O("div",{class:j(["transition-opacity",`duration-[${Bt}ms]`,"select-none","text-center"]),style:X({opacity:t.value})},[F(r.$slots,"default",{hint:n.value},()=>[M("h1",ss,W(n.value),1)])],6))}}),Lo=z({__name:"ToolbarHint",props:{color:{default:S.WHITE+"75"},tutorial:{}},setup(e){return(t,o)=>(C(),$(as,{tutorial:t.tutorial},{default:I(({hint:n})=>[M("h5",{style:X({color:t.color}),class:"text-sm"},W(n),5)]),_:1},8,["tutorial"]))}}),is={class:"flex flex-col gap-2"},ls=z({__name:"ToolbarBase",props:{color:{default:S.GRAY_800},hint:{default:void 0}},setup(e){return(t,o)=>(C(),O("div",is,[M("div",{style:X({backgroundColor:t.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[F(t.$slots,"default")],4),F(t.$slots,"hint",{},()=>[t.hint?(C(),$(Lo,{key:0,tutorial:t.hint},null,8,["tutorial"])):Y("",!0)])]))}}),us=z({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const t=ne();return(o,n)=>(C(),$(Lo,{tutorial:o.tutorial,color:P(t).text+"75"},null,8,["tutorial","color"]))}}),ds={class:"absolute w-full translate-y-14 pointer-events-none"},gt=z({__name:"GToolbarBase",props:{hint:{}},setup(e){const t=ne();return(o,n)=>(C(),$(ls,{hint:o.hint,color:P(t).primary},{hint:I(()=>[M("div",ds,[o.hint?(C(),$(us,{key:0,tutorial:o.hint},null,8,["tutorial"])):Y("",!0)])]),default:I(()=>[F(o.$slots,"default")]),_:3},8,["hint","color"]))}}),cs=e=>D(()=>{const t=_e(e.value);if(!t.isValid())throw new Error("invalid color");return t}),ps=["disabled"],fs=z({__name:"ToolbarButton",props:{color:{default:S.GRAY_800},active:{type:Boolean,default:!1},activeColor:{default:S.GRAY_900},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const t=e,o=yn(t,"color"),n=cs(o),s=D(()=>n.value.darken(5).toHexString()),r=D(()=>t.activeColor?t.activeColor:n.value.darken(10).toHexString()),l=D(()=>{if(!t.disabled)return t.active?r.value:u.value?s.value:t.color}),d=D(()=>{const p=n.value.isDark()?S.WHITE:S.BLACK;return t.disabled?p+"80":p}),a=D(()=>({color:d.value,backgroundColor:l.value,cursor:t.disabled?"not-allowed":"pointer"})),i=["p-1","rounded-md","grid","place-items-center","w-10","h-10"],u=L(!1);return(p,c)=>(C(),O("button",{onMouseenter:c[0]||(c[0]=_=>u.value=!0),onMouseleave:c[1]||(c[1]=_=>u.value=!1),disabled:p.disabled,class:j(i),style:X(a.value)},[F(p.$slots,"default",{},()=>[B(Q,{icon:p.icon},null,8,["icon"])])],44,ps))}}),de=z({__name:"GToolbarButton",setup(e){const t=ne(),o=D(()=>t.value.primary),n=D(()=>te.value.themeName.value==="dark"?t.value.tertiary:t.value.secondary);return(s,r)=>(C(),$(fs,U(s.$props,{color:o.value,"active-color":n.value}),{default:I(()=>[F(s.$slots,"default")]),_:3},16,["color","active-color"]))}}),bs=z({__name:"ToolbarDivider",props:{color:{default:S.GRAY_100+"20"}},setup(e){return(t,o)=>(C(),O("div",{style:X({backgroundColor:t.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),It=z({__name:"GToolbarDivider",setup(e){const t=ne();return(o,n)=>(C(),$(bs,U(o.$props,{color:P(t).text+"30"}),null,16,["color"]))}}),Le=z({__name:"ToolbarButtonGroup",setup(e){const t=lr(),o=["flex","items-center","relative","gap-1"],n=D(()=>pr(o,t.value));return(s,r)=>(C(),O("div",{class:j(n.value)},[F(s.$slots,"default")],2))}}),vs={class:j(["rounded-full","p-[3px]"])},gs=z({__name:"AnnotationToolbar",setup(e){const{clear:t,brushWeight:o,isErasing:n,color:s,isLaserPointing:r}=te.value.annotation,l=c=>{s.value=c,n.value=!1,r.value=!1},d=c=>{o.value=c,n.value=!1,r.value=!1},a=c=>n.value||r.value?!1:s.value===c,i=c=>n.value?!1:o.value===c,u=()=>{n.value=!n.value,r.value=!1},p=()=>{r.value=!r.value,n.value=!1};return(c,_)=>(C(),$(gt,null,{default:I(()=>[B(Le,null,{default:I(()=>[(C(!0),O(oe,null,ue(P(To),g=>(C(),$(de,{key:g,onClick:T=>l(g),active:a(g)},{default:I(()=>[M("div",vs,[M("div",{style:X({backgroundColor:g}),class:j(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),B(It),B(Le,null,{default:I(()=>[(C(!0),O(oe,null,ue(P(Ao),(g,T)=>(C(),$(de,{key:g,onClick:h=>d(g),active:i(g)},{default:I(()=>[M("div",{class:j(["bg-gray-400","rounded-md","w-[15px]"]),style:X({height:`${T*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),B(It),B(Le,null,{default:I(()=>[B(de,{onClick:p,active:P(r),icon:"laser-pointer"},null,8,["active"]),B(de,{onClick:u,active:P(n),icon:"eraser"},null,8,["active"]),B(de,{onClick:P(t),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var ms=ze.extend({name:"focustrap-directive"}),hs=_n.extend({style:ms});function Ne(e){"@babel/helpers - typeof";return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ne(e)}function Mt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),o.push.apply(o,n)}return o}function Nt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Mt(Object(o),!0).forEach(function(n){ys(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Mt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function ys(e,t,o){return(t=_s(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function _s(e){var t=Cs(e,"string");return Ne(t)=="symbol"?t:t+""}function Cs(e,t){if(Ne(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Ne(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Do=hs.extend("focustrap",{mounted:function(t,o){var n=o.value||{},s=n.disabled;s||(this.createHiddenFocusableElements(t,o),this.bind(t,o),this.autoElementFocus(t,o)),t.setAttribute("data-pd-focustrap",!0),this.$el=t},updated:function(t,o){var n=o.value||{},s=n.disabled;s&&this.unbind(t)},unmounted:function(t){this.unbind(t)},methods:{getComputedSelector:function(t){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(t??"")},bind:function(t,o){var n=this,s=o.value||{},r=s.onFocusIn,l=s.onFocusOut;t.$_pfocustrap_mutationobserver=new MutationObserver(function(d){d.forEach(function(a){if(a.type==="childList"&&!t.contains(document.activeElement)){var i=function(p){var c=St(p)?St(p,n.getComputedSelector(t.$_pfocustrap_focusableselector))?p:Te(t,n.getComputedSelector(t.$_pfocustrap_focusableselector)):Te(p);return to(c)?c:p.nextSibling&&i(p.nextSibling)};fe(i(a.nextSibling))}})}),t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_mutationobserver.observe(t,{childList:!0}),t.$_pfocustrap_focusinlistener=function(d){return r&&r(d)},t.$_pfocustrap_focusoutlistener=function(d){return l&&l(d)},t.addEventListener("focusin",t.$_pfocustrap_focusinlistener),t.addEventListener("focusout",t.$_pfocustrap_focusoutlistener)},unbind:function(t){t.$_pfocustrap_mutationobserver&&t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_focusinlistener&&t.removeEventListener("focusin",t.$_pfocustrap_focusinlistener)&&(t.$_pfocustrap_focusinlistener=null),t.$_pfocustrap_focusoutlistener&&t.removeEventListener("focusout",t.$_pfocustrap_focusoutlistener)&&(t.$_pfocustrap_focusoutlistener=null)},autoFocus:function(t){this.autoElementFocus(this.$el,{value:Nt(Nt({},t),{},{autoFocus:!0})})},autoElementFocus:function(t,o){var n=o.value||{},s=n.autoFocusSelector,r=s===void 0?"":s,l=n.firstFocusableSelector,d=l===void 0?"":l,a=n.autoFocus,i=a===void 0?!1:a,u=Te(t,"[autofocus]".concat(this.getComputedSelector(r)));i&&!u&&(u=Te(t,this.getComputedSelector(d))),fe(u)},onFirstHiddenElementFocus:function(t){var o,n=t.currentTarget,s=t.relatedTarget,r=s===n.$_pfocustrap_lasthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(s))?Te(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_lasthiddenfocusableelement;fe(r)},onLastHiddenElementFocus:function(t){var o,n=t.currentTarget,s=t.relatedTarget,r=s===n.$_pfocustrap_firsthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(s))?Cn(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_firsthiddenfocusableelement;fe(r)},createHiddenFocusableElements:function(t,o){var n=this,s=o.value||{},r=s.tabIndex,l=r===void 0?0:r,d=s.firstFocusableSelector,a=d===void 0?"":d,i=s.lastFocusableSelector,u=i===void 0?"":i,p=function(T){return wn("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:l,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:T==null?void 0:T.bind(n)})},c=p(this.onFirstHiddenElementFocus),_=p(this.onLastHiddenElementFocus);c.$_pfocustrap_lasthiddenfocusableelement=_,c.$_pfocustrap_focusableselector=a,c.setAttribute("data-pc-section","firstfocusableelement"),_.$_pfocustrap_firsthiddenfocusableelement=c,_.$_pfocustrap_focusableselector=u,_.setAttribute("data-pc-section","lastfocusableelement"),t.prepend(c),t.append(_)}}}),Ke=xn(),ws=qe`
    .p-popover {
        margin-block-start: dt('popover.gutter');
        background: dt('popover.background');
        color: dt('popover.color');
        border: 1px solid dt('popover.border.color');
        border-radius: dt('popover.border.radius');
        box-shadow: dt('popover.shadow');
    }

    .p-popover-content {
        padding: dt('popover.content.padding');
    }

    .p-popover-flipped {
        margin-block-start: calc(dt('popover.gutter') * -1);
        margin-block-end: dt('popover.gutter');
    }

    .p-popover-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-popover-leave-to {
        opacity: 0;
    }

    .p-popover-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-popover-leave-active {
        transition: opacity 0.1s linear;
    }

    .p-popover:after,
    .p-popover:before {
        bottom: 100%;
        left: calc(dt('popover.arrow.offset') + dt('popover.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-popover:after {
        border-width: calc(dt('popover.gutter') - 2px);
        margin-left: calc(-1 * (dt('popover.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.background');
    }

    .p-popover:before {
        border-width: dt('popover.gutter');
        margin-left: calc(-1 * dt('popover.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('popover.border.color');
    }

    .p-popover-flipped:after,
    .p-popover-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-popover.p-popover-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('popover.background');
    }

    .p-popover.p-popover-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('popover.border.color');
    }
`,xs={root:"p-popover p-component",content:"p-popover-content"},Ss=ze.extend({name:"popover",style:ws,classes:xs}),ks={name:"BasePopover",extends:Ye,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:Ss,provide:function(){return{$pcPopover:this,$parentInstance:this}}},Bo={name:"Popover",extends:ks,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(t){t?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&he.clear(this.container),this.overlayEventListener&&(Ke.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(t,o){this.visible?this.hide():this.show(t,o)},show:function(t,o){this.visible=!0,this.eventTarget=t.currentTarget,this.target=o||t.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(t){var o=this;so(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&he.set("overlay",t,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(n){o.container.contains(n.target)&&(o.selfClick=!0)},this.focus(),Ke.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),Ke.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&he.clear(t)},alignOverlay:function(){Tn(this.container,this.target,!1);var t=kt(this.container),o=kt(this.target),n=0;t.left<o.left&&(n=o.left-t.left),this.container.style.setProperty(ut("popover.arrow.left").name,"".concat(n,"px")),t.top<o.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&ro(this.container,"p-popover-flipped"))},onContentKeydown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.hide(),fe(this.target))},onButtonKeydown:function(t){switch(t.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":t.preventDefault()}},focus:function(){var t=this.container.querySelector("[autofocus]");t&&t.focus()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var t=this;!this.outsideClickListener&&En()&&(this.outsideClickListener=function(o){t.visible&&!t.selfClick&&!t.isTargetClicked(o)&&(t.visible=!1),t.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new kn(this.target,function(){t.visible&&(t.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.visible&&!Sn()&&(t.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(t){return this.eventTarget&&(this.eventTarget===t.target||this.eventTarget.contains(t.target))},containerRef:function(t){this.container=t},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",no(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(t){Ke.emit("overlay-click",{originalEvent:t,target:this.target})}},directives:{focustrap:Do,ripple:lt},components:{Portal:oo}},Es=["aria-modal"];function Ts(e,t,o,n,s,r){var l=Be("Portal"),d=dt("focustrap");return C(),$(l,{appendTo:e.appendTo},{default:I(function(){return[B(ao,U({name:"p-popover",onEnter:r.onEnter,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave},e.ptm("transition")),{default:I(function(){return[s.visible?Ze((C(),O("div",U({key:0,ref:r.containerRef,role:"dialog","aria-modal":s.visible,onClick:t[3]||(t[3]=function(){return r.onOverlayClick&&r.onOverlayClick.apply(r,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?F(e.$slots,"container",{key:0,closeCallback:r.hide,keydownCallback:function(i){return r.onButtonKeydown(i)}}):(C(),O("div",U({key:1,class:e.cx("content"),onClick:t[0]||(t[0]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onMousedown:t[1]||(t[1]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onKeydown:t[2]||(t[2]=function(){return r.onContentKeydown&&r.onContentKeydown.apply(r,arguments)})},e.ptm("content")),[F(e.$slots,"default")],16))],16,Es)),[[d]]):Y("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}Bo.render=Ts;const mt=z({__name:"Popover",props:{offset:{default:12}},setup(e){const t=L(),o=s=>{t.value.toggle(s)},n=L(!1);return(s,r)=>(C(),O(oe,null,[F(s.$slots,"activator",{toggle:o,isOpen:n.value}),B(P(Bo),{ref_key:"op",ref:t,onShow:r[0]||(r[0]=l=>n.value=!0),onHide:r[1]||(r[1]=l=>n.value=!1),unstyled:""},{default:I(()=>[M("div",{style:X({transform:`translateY(${s.offset}px)`})},[F(s.$slots,"default")],4)]),_:3},512)],64))}}),As=z({__name:"Well",props:{color:{default:S.GRAY_800},textColor:{default:S.WHITE}},setup(e){return(t,o)=>(C(),O("div",{style:X({backgroundColor:t.color,color:t.textColor})},[F(t.$slots,"default")],4))}}),we=z({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const t=ne(),o=e,n=D(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(s,r)=>(C(),$(As,U(s.$attrs,{color:n.value,"text-color":P(t).text}),{default:I(()=>[F(s.$slots,"default")]),_:3},16,["color","text-color"]))}}),Ls={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},Ds=["src"],Bs={class:"flex flex-col gap-1"},Is={class:"text-lg font-bold"},Ms={class:"text-sm opacity-80"},Ns=z({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:S.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const t=e,o=D(()=>{if(t.hoverColor)return t.hoverColor;const r=_e(t.color);return(r.isDark()?r.lighten(10):r.darken(10)).toHexString()}),n=D(()=>s.value?o.value:t.color),s=L(!1);return(r,l)=>(C(),O("button",{onMouseenter:l[0]||(l[0]=d=>s.value=!0),onMouseleave:l[1]||(l[1]=d=>s.value=!1),style:X({backgroundColor:n.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[M("div",Ls,[r.imageSrc?(C(),O("img",{key:0,src:r.imageSrc,class:"rounded-md object-cover w-full h-full"},null,8,Ds)):Y("",!0)]),M("div",Bs,[M("h1",Is,W(r.title),1),M("p",Ms,W(r.description),1)])],36))}}),Io=z({__name:"GVerticalCardButton",setup(e){const t=ne();return(o,n)=>(C(),$(Ns,U(o.$attrs,{color:P(t).primary,"hover-color":P(t).secondary}),null,16,["color","hover-color"]))}}),Ps={key:0,class:"flex items-center gap-3"},Os=z({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:t,navigateWithGraph:o}=_r(),n=Cr(),s=e,r=L(!1),l=L("");setTimeout(()=>{l.value=s.product.menu.thumbnail},io(0,100));const d=D(()=>{const a=s.product.menu.allowGoWithGraph??!0;return!wr(s.product)&&a});return(a,i)=>(C(),O("div",{onMouseenter:i[2]||(i[2]=u=>r.value=!0),onMouseleave:i[3]||(i[3]=u=>r.value=!1),class:"relative"},[M("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:X({opacity:r.value?1:0})},[P(n).productId!==a.product.productId?(C(),O("div",Ps,[B(ee,{onClick:i[0]||(i[0]=u=>P(t)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:I(()=>[B(Q,{icon:"arrow-right"}),i[4]||(i[4]=se(" go "))]),_:1,__:[4]}),d.value?(C(),$(ee,{key:0,onClick:i[1]||(i[1]=u=>P(o)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:I(()=>[B(Q,{icon:"debug-step-over"}),i[5]||(i[5]=se(" go with graph "))]),_:1,__:[5]})):Y("",!0)])):(C(),$(we,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:I(()=>[B(Q,{icon:"star",class:"text-xl"}),i[6]||(i[6]=se(" you are here ")),B(Q,{icon:"star",class:"text-xl"})]),_:1,__:[6]}))],4),B(Io,{"image-src":l.value,title:a.product.menu.name,description:a.product.menu.description,class:"rounded-md",style:X({opacity:r.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),$s={class:"flex flex-col gap-2"},Rs=z({__name:"ProductDropdownMenu",setup(e){const t=Fe.filter(n=>n==null?void 0:n.menu),o=Lt.reduce((n,s)=>(n[s]=[],n),{});return t.forEach(n=>{o[n.menu.category].push(n)}),(n,s)=>(C(),$(we,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:I(()=>[(C(!0),O(oe,null,ue(P(Lt),r=>(C(),O("div",{key:r},[P(o)[r].length>0?(C(),$(we,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:I(()=>[se(W(r),1)]),_:2},1024)):Y("",!0),M("div",$s,[(C(!0),O(oe,null,ue(P(o)[r],l=>(C(),$(Os,{key:l.productId,product:l},null,8,["product"]))),128))])]))),128))]),_:1}))}}),zs=z({__name:"ProductDropdown",setup(e){const t=ne();return(o,n)=>(C(),$(mt,null,{activator:I(({toggle:s,isOpen:r})=>[B(ee,{onClick:s,tertiary:r,class:"px-4 py-2 text-xl rounded-lg"},{default:I(()=>[M("span",{class:j(`text-${P(t).brand}`)},"Magic Graphs",2)]),_:2},1032,["onClick","tertiary"])]),default:I(()=>[B(Rs)]),_:1}))}}),Fs=["onMouseenter","onMouseleave"],Hs=z({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(t,o)=>(C(),$(mt,{offset:t.offset},{activator:I(({toggle:n})=>[M("div",{onMouseenter:n,onMouseleave:n},[F(t.$slots,"default")],40,Fs)]),default:I(()=>[F(t.$slots,"content")]),_:3},8,["offset"]))}}),Us={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},Gs=["innerHTML"],Ks=z({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const t=e,o=D(()=>{var n;return(n=t.simulation.canRun)==null?void 0:n.check()});return(n,s)=>o.value?(C(),O("div",Us,[B(Hs,null,{content:I(()=>[B(we,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:I(()=>[M("span",{innerHTML:o.value.description,class:"font-bold"},null,8,Gs)]),_:1})]),default:I(()=>[B(fo,{onMouseenter:s[0]||(s[0]=r=>{var l;return(l=o.value.themer)==null?void 0:l.theme()}),onMouseleave:s[1]||(s[1]=r=>{var l;return(l=o.value.themer)==null?void 0:l.untheme()}),color:P(S).GRAY_900,"text-color":P(S).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:I(()=>[se(W(o.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):Y("",!0)}}),Ws=z({__name:"SimCard",props:{simulation:{}},setup(e){const t=e,o=L("");return setTimeout(()=>{o.value=t.simulation.thumbnail},io(0,100)),(n,s)=>(C(),$(Io,{"image-src":o.value,title:n.simulation.name,description:n.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),js=z({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:t}){const o=e,n=t,s=D(()=>{const l=o.simulations,d=l.filter(i=>{var u;return(u=i.canRun)==null?void 0:u.check()});return[...l.filter(i=>{var u;return!((u=i.canRun)!=null&&u.check())}),...d]}),r=l=>{if(o.simulations.length===1){n("simulation-selected",o.simulations[0]);return}l()};return(l,d)=>(C(),$(mt,null,{activator:I(({toggle:a,isOpen:i})=>[B(ee,{onClick:u=>r(()=>a(u)),tertiary:i,disabled:l.disabled,class:"h-14 w-14 rounded-full"},{default:I(()=>[B(Q,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","tertiary","disabled"])]),default:I(()=>[B(we,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:I(()=>[(C(!0),O(oe,null,ue(s.value,a=>(C(),O("div",{key:a.name,class:"relative"},[B(Ks,{simulation:a},null,8,["simulation"]),B(Ws,{onClick:i=>n("simulation-selected",a),simulation:a},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),qs=z({__name:"StopSimButton",setup(e){return(t,o)=>(C(),$(ee,{color:P(S).RED_500,class:"h-14 w-14 rounded-full"},{default:I(()=>[B(Q,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),Ys=z({__name:"FullscreenButton",setup(e){const{toggle:t,isFullscreen:o}=An();return Ln(ye.Fullscreen.binding,t),(n,s)=>(C(),$(ee,{onClick:P(t),class:"h-12 w-12"},{default:I(()=>[B(Q,{class:"text-3xl",icon:P(o)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}}),Zs=z({__name:"ThemeToolbar",setup(e){const t={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",pink:"flower-tulip-outline"};return(o,n)=>(C(),$(gt,null,{default:I(()=>[B(Le,null,{default:I(()=>[(C(),O(oe,null,ue(t,(s,r)=>B(de,{key:r,onClick:l=>P(te).preferredTheme.value=r,icon:s,active:r===P(te).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}}),Vs={class:"text-sm font-semibold"},Xs=z({__name:"ZoomToolbar",props:{camera:{}},setup(e){const t=e,o=D(()=>t.camera.state.zoom.value),n=D(()=>{const r=Math.log(Tt),l=Math.log(At);return(Math.log(o.value)-r)/(l-r)}),s=D(()=>Math.round(n.value*100));return(r,l)=>(C(),$(gt,null,{default:I(()=>[B(Le,null,{default:I(()=>[B(de,{onClick:l[0]||(l[0]=d=>r.camera.actions.zoomOut()),disabled:o.value<=P(Tt),icon:"minus"},null,8,["disabled"]),B(we,{class:"w-12 text-center"},{default:I(()=>[M("p",Vs,W(s.value)+"%",1)]),_:1}),B(de,{onClick:l[1]||(l[1]=d=>r.camera.actions.zoomIn()),disabled:o.value>=P(At),icon:"plus"},null,8,["disabled"])]),_:1})]),_:1}))}});var Mo={name:"WindowMaximizeIcon",extends:ct};function Js(e,t,o,n,s,r){return C(),O("svg",U({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}Mo.render=Js;var No={name:"WindowMinimizeIcon",extends:ct};function Qs(e,t,o,n,s,r){return C(),O("svg",U({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}No.render=Qs;var Po={name:"SpinnerIcon",extends:ct};function ea(e,t,o,n,s,r){return C(),O("svg",U({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}Po.render=ea;var ta=qe`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`,oa={root:function(t){var o=t.props,n=t.instance;return["p-badge p-component",{"p-badge-circle":to(o.value)&&String(o.value).length===1,"p-badge-dot":lo(o.value)&&!n.$slots.default,"p-badge-sm":o.size==="small","p-badge-lg":o.size==="large","p-badge-xl":o.size==="xlarge","p-badge-info":o.severity==="info","p-badge-success":o.severity==="success","p-badge-warn":o.severity==="warn","p-badge-danger":o.severity==="danger","p-badge-secondary":o.severity==="secondary","p-badge-contrast":o.severity==="contrast"}]}},na=ze.extend({name:"badge",style:ta,classes:oa}),ra={name:"BaseBadge",extends:Ye,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:na,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function Pe(e){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(e)}function Pt(e,t,o){return(t=sa(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function sa(e){var t=aa(e,"string");return Pe(t)=="symbol"?t:t+""}function aa(e,t){if(Pe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Pe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Oo={name:"Badge",extends:ra,inheritAttrs:!1,computed:{dataP:function(){return Ae(Pt(Pt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},ia=["data-p"];function la(e,t,o,n,s,r){return C(),O("span",U({class:e.cx("root"),"data-p":r.dataP},e.ptmi("root")),[F(e.$slots,"default",{},function(){return[se(W(e.value),1)]})],16,ia)}Oo.render=la;var ua=qe`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;function Oe(e){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(e)}function le(e,t,o){return(t=da(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function da(e){var t=ca(e,"string");return Oe(t)=="symbol"?t:t+""}function ca(e,t){if(Oe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Oe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var pa={root:function(t){var o=t.instance,n=t.props;return["p-button p-component",le(le(le(le(le(le(le(le(le({"p-button-icon-only":o.hasIcon&&!n.label&&!n.badge,"p-button-vertical":(n.iconPos==="top"||n.iconPos==="bottom")&&n.label,"p-button-loading":n.loading,"p-button-link":n.link||n.variant==="link"},"p-button-".concat(n.severity),n.severity),"p-button-raised",n.raised),"p-button-rounded",n.rounded),"p-button-text",n.text||n.variant==="text"),"p-button-outlined",n.outlined||n.variant==="outlined"),"p-button-sm",n.size==="small"),"p-button-lg",n.size==="large"),"p-button-plain",n.plain),"p-button-fluid",o.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(t){var o=t.props;return["p-button-icon",le({},"p-button-icon-".concat(o.iconPos),o.label)]},label:"p-button-label"},fa=ze.extend({name:"button",style:ua,classes:pa}),ba={name:"BaseButton",extends:Ye,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:fa,provide:function(){return{$pcButton:this,$parentInstance:this}}};function $e(e){"@babel/helpers - typeof";return $e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$e(e)}function J(e,t,o){return(t=va(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function va(e){var t=ga(e,"string");return $e(t)=="symbol"?t:t+""}function ga(e,t){if($e(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if($e(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var $o={name:"Button",extends:ba,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(t){var o=t==="root"?this.ptmi:this.ptm;return o(t,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return U(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return lo(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return Ae(J(J(J(J(J(J(J(J(J(J({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge),"loading",this.loading),"fluid",this.hasFluid),"rounded",this.rounded),"raised",this.raised),"outlined",this.outlined||this.variant==="outlined"),"text",this.text||this.variant==="text"),"link",this.link||this.variant==="link"),"vertical",(this.iconPos==="top"||this.iconPos==="bottom")&&this.label))},dataIconP:function(){return Ae(J(J({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return Ae(J(J({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:Po,Badge:Oo},directives:{ripple:lt}},ma=["data-p"],ha=["data-p"];function ya(e,t,o,n,s,r){var l=Be("SpinnerIcon"),d=Be("Badge"),a=dt("ripple");return e.asChild?F(e.$slots,"default",{key:1,class:j(e.cx("root")),a11yAttrs:r.a11yAttrs}):Ze((C(),$(nt(e.as),U({key:0,class:e.cx("root"),"data-p":r.dataP},r.attrs),{default:I(function(){return[F(e.$slots,"default",{},function(){return[e.loading?F(e.$slots,"loadingicon",U({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(C(),O("span",U({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(C(),$(l,U({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):F(e.$slots,"icon",U({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(C(),O("span",U({key:0,class:[e.cx("icon"),e.icon,e.iconClass],"data-p":r.dataIconP},e.ptm("icon")),null,16,ma)):Y("",!0)]}),M("span",U({class:e.cx("label")},e.ptm("label"),{"data-p":r.dataLabelP}),W(e.label||" "),17,ha),e.badge?(C(),$(d,{key:2,value:e.badge,class:j(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):Y("",!0)]})]}),_:3},16,["class","data-p"])),[[a]])}$o.render=ya;function Ot(){Bn({variableName:ut("scrollbar.width").name})}function $t(){Dn({variableName:ut("scrollbar.width").name})}var _a=qe`
    .p-dialog {
        max-height: 90%;
        transform: scale(1);
        border-radius: dt('dialog.border.radius');
        box-shadow: dt('dialog.shadow');
        background: dt('dialog.background');
        border: 1px solid dt('dialog.border.color');
        color: dt('dialog.color');
    }

    .p-dialog-content {
        overflow-y: auto;
        padding: dt('dialog.content.padding');
    }

    .p-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('dialog.header.padding');
    }

    .p-dialog-title {
        font-weight: dt('dialog.title.font.weight');
        font-size: dt('dialog.title.font.size');
    }

    .p-dialog-footer {
        flex-shrink: 0;
        padding: dt('dialog.footer.padding');
        display: flex;
        justify-content: flex-end;
        gap: dt('dialog.footer.gap');
    }

    .p-dialog-header-actions {
        display: flex;
        align-items: center;
        gap: dt('dialog.header.gap');
    }

    .p-dialog-enter-active {
        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
    }

    .p-dialog-leave-active {
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-dialog-enter-from,
    .p-dialog-leave-to {
        opacity: 0;
        transform: scale(0.7);
    }

    .p-dialog-top .p-dialog,
    .p-dialog-bottom .p-dialog,
    .p-dialog-left .p-dialog,
    .p-dialog-right .p-dialog,
    .p-dialog-topleft .p-dialog,
    .p-dialog-topright .p-dialog,
    .p-dialog-bottomleft .p-dialog,
    .p-dialog-bottomright .p-dialog {
        margin: 0.75rem;
        transform: translate3d(0px, 0px, 0px);
    }

    .p-dialog-top .p-dialog-enter-active,
    .p-dialog-top .p-dialog-leave-active,
    .p-dialog-bottom .p-dialog-enter-active,
    .p-dialog-bottom .p-dialog-leave-active,
    .p-dialog-left .p-dialog-enter-active,
    .p-dialog-left .p-dialog-leave-active,
    .p-dialog-right .p-dialog-enter-active,
    .p-dialog-right .p-dialog-leave-active,
    .p-dialog-topleft .p-dialog-enter-active,
    .p-dialog-topleft .p-dialog-leave-active,
    .p-dialog-topright .p-dialog-enter-active,
    .p-dialog-topright .p-dialog-leave-active,
    .p-dialog-bottomleft .p-dialog-enter-active,
    .p-dialog-bottomleft .p-dialog-leave-active,
    .p-dialog-bottomright .p-dialog-enter-active,
    .p-dialog-bottomright .p-dialog-leave-active {
        transition: all 0.3s ease-out;
    }

    .p-dialog-top .p-dialog-enter-from,
    .p-dialog-top .p-dialog-leave-to {
        transform: translate3d(0px, -100%, 0px);
    }

    .p-dialog-bottom .p-dialog-enter-from,
    .p-dialog-bottom .p-dialog-leave-to {
        transform: translate3d(0px, 100%, 0px);
    }

    .p-dialog-left .p-dialog-enter-from,
    .p-dialog-left .p-dialog-leave-to,
    .p-dialog-topleft .p-dialog-enter-from,
    .p-dialog-topleft .p-dialog-leave-to,
    .p-dialog-bottomleft .p-dialog-enter-from,
    .p-dialog-bottomleft .p-dialog-leave-to {
        transform: translate3d(-100%, 0px, 0px);
    }

    .p-dialog-right .p-dialog-enter-from,
    .p-dialog-right .p-dialog-leave-to,
    .p-dialog-topright .p-dialog-enter-from,
    .p-dialog-topright .p-dialog-leave-to,
    .p-dialog-bottomright .p-dialog-enter-from,
    .p-dialog-bottomright .p-dialog-leave-to {
        transform: translate3d(100%, 0px, 0px);
    }

    .p-dialog-left:dir(rtl) .p-dialog-enter-from,
    .p-dialog-left:dir(rtl) .p-dialog-leave-to,
    .p-dialog-topleft:dir(rtl) .p-dialog-enter-from,
    .p-dialog-topleft:dir(rtl) .p-dialog-leave-to,
    .p-dialog-bottomleft:dir(rtl) .p-dialog-enter-from,
    .p-dialog-bottomleft:dir(rtl) .p-dialog-leave-to {
        transform: translate3d(100%, 0px, 0px);
    }

    .p-dialog-right:dir(rtl) .p-dialog-enter-from,
    .p-dialog-right:dir(rtl) .p-dialog-leave-to,
    .p-dialog-topright:dir(rtl) .p-dialog-enter-from,
    .p-dialog-topright:dir(rtl) .p-dialog-leave-to,
    .p-dialog-bottomright:dir(rtl) .p-dialog-enter-from,
    .p-dialog-bottomright:dir(rtl) .p-dialog-leave-to {
        transform: translate3d(-100%, 0px, 0px);
    }

    .p-dialog-maximized {
        width: 100vw !important;
        height: 100vh !important;
        top: 0px !important;
        left: 0px !important;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
    }

    .p-dialog-maximized .p-dialog-content {
        flex-grow: 1;
    }
`,Ca={mask:function(t){var o=t.position,n=t.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:o==="left"||o==="topleft"||o==="bottomleft"?"flex-start":o==="right"||o==="topright"||o==="bottomright"?"flex-end":"center",alignItems:o==="top"||o==="topleft"||o==="topright"?"flex-start":o==="bottom"||o==="bottomleft"||o==="bottomright"?"flex-end":"center",pointerEvents:n?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},wa={mask:function(t){var o=t.props,n=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],s=n.find(function(r){return r===o.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":o.modal},s?"p-dialog-".concat(s):""]},root:function(t){var o=t.props,n=t.instance;return["p-dialog p-component",{"p-dialog-maximized":o.maximizable&&n.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},xa=ze.extend({name:"dialog",style:_a,classes:wa,inlineStyles:Ca}),Sa={name:"BaseDialog",extends:Ye,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:xa,provide:function(){return{$pcDialog:this,$parentInstance:this}}},Ro={name:"Dialog",extends:Sa,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var t=this;return{dialogRef:D(function(){return t._instance})}},data:function(){return{containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&he.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&he.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&ro(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),fe(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&he.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(t){this.maskMouseDownTarget=t.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var t=function(s){return s&&s.querySelector("[autofocus]")},o=this.$slots.footer&&t(this.footerContainer);o||(o=this.$slots.header&&t(this.headerContainer),o||(o=this.$slots.default&&t(this.content),o||(this.maximizable?(this.focusableMax=!0,o=this.maximizableButton):(this.focusableClose=!0,o=this.closeButton)))),o&&fe(o,{focusVisible:!0})},maximize:function(t){this.maximized?(this.maximized=!1,this.$emit("unmaximize",t)):(this.maximized=!0,this.$emit("maximize",t)),this.modal||(this.maximized?Ot():$t())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Ot()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&$t()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},contentRef:function(t){this.content=t},headerContainerRef:function(t){this.headerContainer=t},footerContainerRef:function(t){this.footerContainer=t},maximizableRef:function(t){this.maximizableButton=t?t.$el:void 0},closeButtonRef:function(t){this.closeButton=t?t.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",no(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(t){t.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=t.pageX,this.lastPageY=t.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&so(document.body,{"user-select":"none"}),this.$emit("dragstart",t))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var t=this;this.documentDragListener=function(o){if(t.dragging){var n=Mn(t.container),s=Nn(t.container),r=o.pageX-t.lastPageX,l=o.pageY-t.lastPageY,d=t.container.getBoundingClientRect(),a=d.left+r,i=d.top+l,u=Pn(),p=getComputedStyle(t.container),c=parseFloat(p.marginLeft),_=parseFloat(p.marginTop);t.container.style.position="fixed",t.keepInViewport?(a>=t.minX&&a+n<u.width&&(t.lastPageX=o.pageX,t.container.style.left=a-c+"px"),i>=t.minY&&i+s<u.height&&(t.lastPageY=o.pageY,t.container.style.top=i-_+"px")):(t.lastPageX=o.pageX,t.container.style.left=a-c+"px",t.lastPageY=o.pageY,t.container.style.top=i-_+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var t=this;this.documentDragEndListener=function(o){t.dragging&&(t.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!t.isUnstyled&&(document.body.style["user-select"]=""),t.$emit("dragend",o))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.$id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return Ae({maximized:this.maximized,modal:this.modal})}},directives:{ripple:lt,focustrap:Do},components:{Button:$o,Portal:oo,WindowMinimizeIcon:No,WindowMaximizeIcon:Mo,TimesIcon:In}};function Re(e){"@babel/helpers - typeof";return Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Re(e)}function Rt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),o.push.apply(o,n)}return o}function zt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Rt(Object(o),!0).forEach(function(n){ka(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Rt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function ka(e,t,o){return(t=Ea(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Ea(e){var t=Ta(e,"string");return Re(t)=="symbol"?t:t+""}function Ta(e,t){if(Re(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Re(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Aa=["data-p"],La=["aria-labelledby","aria-modal","data-p"],Da=["id"],Ba=["data-p"];function Ia(e,t,o,n,s,r){var l=Be("Button"),d=Be("Portal"),a=dt("focustrap");return C(),$(d,{appendTo:e.appendTo},{default:I(function(){return[s.containerVisible?(C(),O("div",U({key:0,ref:r.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:t[1]||(t[1]=function(){return r.onMaskMouseDown&&r.onMaskMouseDown.apply(r,arguments)}),onMouseup:t[2]||(t[2]=function(){return r.onMaskMouseUp&&r.onMaskMouseUp.apply(r,arguments)}),"data-p":r.dataP},e.ptm("mask")),[B(ao,U({name:"p-dialog",onEnter:r.onEnter,onAfterEnter:r.onAfterEnter,onBeforeLeave:r.onBeforeLeave,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave,appear:""},e.ptm("transition")),{default:I(function(){return[e.visible?Ze((C(),O("div",U({key:0,ref:r.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":r.ariaLabelledById,"aria-modal":e.modal,"data-p":r.dataP},e.ptmi("root")),[e.$slots.container?F(e.$slots,"container",{key:0,closeCallback:r.close,maximizeCallback:function(u){return r.maximize(u)}}):(C(),O(oe,{key:1},[e.showHeader?(C(),O("div",U({key:0,ref:r.headerContainerRef,class:e.cx("header"),onMousedown:t[0]||(t[0]=function(){return r.initDrag&&r.initDrag.apply(r,arguments)})},e.ptm("header")),[F(e.$slots,"header",{class:j(e.cx("title"))},function(){return[e.header?(C(),O("span",U({key:0,id:r.ariaLabelledById,class:e.cx("title")},e.ptm("title")),W(e.header),17,Da)):Y("",!0)]}),M("div",U({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?F(e.$slots,"maximizebutton",{key:0,maximized:s.maximized,maximizeCallback:function(u){return r.maximize(u)}},function(){return[B(l,U({ref:r.maximizableRef,autofocus:s.focusableMax,class:e.cx("pcMaximizeButton"),onClick:r.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:I(function(i){return[F(e.$slots,"maximizeicon",{maximized:s.maximized},function(){return[(C(),$(nt(r.maximizeIconComponent),U({class:[i.class,s.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])]}):Y("",!0),e.closable?F(e.$slots,"closebutton",{key:1,closeCallback:r.close},function(){return[B(l,U({ref:r.closeButtonRef,autofocus:s.focusableClose,class:e.cx("pcCloseButton"),onClick:r.close,"aria-label":r.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:I(function(i){return[F(e.$slots,"closeicon",{},function(){return[(C(),$(nt(e.closeIcon?"span":"TimesIcon"),U({class:[e.closeIcon,i.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])]}):Y("",!0)],16)],16)):Y("",!0),M("div",U({ref:r.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle,"data-p":r.dataP},zt(zt({},e.contentProps),e.ptm("content"))),[F(e.$slots,"default")],16,Ba),e.footer||e.$slots.footer?(C(),O("div",U({key:1,ref:r.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[F(e.$slots,"footer",{},function(){return[se(W(e.footer),1)]})],16)):Y("",!0)],64))],16,La)),[[a,{disabled:!e.modal}]]):Y("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,Aa)):Y("",!0)]}),_:3},8,["appendTo"])}Ro.render=Ia;const Ma=z({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1},header:{},footer:{},visible:{type:Boolean},modal:{type:Boolean},contentStyle:{},contentClass:{},contentProps:{},closable:{type:Boolean},dismissableMask:{type:Boolean},closeOnEscape:{type:Boolean},showHeader:{type:Boolean},blockScroll:{type:Boolean},baseZIndex:{},autoZIndex:{type:Boolean},position:{},maximizable:{type:Boolean},breakpoints:{},draggable:{type:Boolean},keepInViewport:{type:Boolean},minX:{},minY:{},appendTo:{},style:{},closeIcon:{},maximizeIcon:{},minimizeIcon:{},closeButtonProps:{},maximizeButtonProps:{},dt:{},pt:{},ptOptions:{},unstyled:{type:Boolean}},setup(e){const t=ne(),o=e,n=On(),s=D(()=>({...n,...o})),r=D(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(l,d)=>(C(),$(P(Ro),U(s.value,{style:{backgroundColor:r.value,color:P(t).text,borderColor:P(t).text},"pt:root:class":"!border-0"}),{default:I(()=>[F(l.$slots,"header"),F(l.$slots,"default"),F(l.$slots,"footer")]),_:3},16,["style"]))}}),Na={class:"font-bold text-lg text-md mb-1"},ht=z({__name:"HelpSection",props:{title:{}},setup(e){return(t,o)=>(C(),O("div",null,[M("h2",Na,W(t.title),1),M("div",null,[F(t.$slots,"default")])]))}}),Pa={class:"flex gap-2 text-sm"},Ft="https://github.com/Yonava/magic-graphs",Oa=z({__name:"HelpLinks",setup(e){const t=n=>window.open(n,"_blank"),o=`${Ft}/issues/new?template=Blank%20issue`;return(n,s)=>(C(),$(ht,{title:"Links To Have Handy"},{default:I(()=>[M("div",Pa,[B(ee,{onClick:s[0]||(s[0]=r=>t(o)),class:"flex gap-2",tertiary:""},{default:I(()=>[B(Q,{icon:"bug"}),s[2]||(s[2]=se(" I Found An Issue "))]),_:1,__:[2]}),B(ee,{onClick:s[1]||(s[1]=r=>t(Ft)),class:"flex gap-2",tertiary:""},{default:I(()=>[B(Q,{icon:"github"}),s[3]||(s[3]=se(" Star Us On GitHub "))]),_:1,__:[3]})])]),_:1}))}}),$a={class:j(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs","capitalize","border-current"])},Ra={key:1},za={key:2},Fa=z({__name:"HelpShortcutKey",props:{keyboardKey:{}},setup(e){const t=e,o={meta:"⌘"},n=Object.keys(o),s={arrowright:"arrow-right",arrowleft:"arrow-left"},r=Object.keys(s),l=D(()=>r.includes(t.keyboardKey)),d=D(()=>n.includes(t.keyboardKey));return(a,i)=>(C(),O("div",$a,[l.value?(C(),$(Q,{key:0,icon:s[a.keyboardKey],class:"text-xs"},null,8,["icon"])):d.value?(C(),O("p",Ra,W(o[a.keyboardKey]),1)):(C(),O("p",za,W(a.keyboardKey),1))]))}}),Ha={class:"flex flex-col gap-1"},Ua={class:"flex"},Ga=z({__name:"HelpShortcuts",setup(e){const t=s=>s.split("+").map(r=>r.trim()).filter(r=>r!==""),{activeShortcuts:o}=te.value.shortcut,n=Object.assign(o,ye);return(s,r)=>(C(),$(ht,{title:"Useful Shortcuts"},{default:I(()=>[M("div",Ha,[(C(!0),O(oe,null,ue(P(n),(l,d)=>(C(),O("div",{key:d,class:"flex justify-between items-center"},[se(W(d)+" ",1),M("div",Ua,[(C(!0),O(oe,null,ue(t(l.binding),a=>(C(),O("div",{key:a},[B(Fa,{"keyboard-key":a},null,8,["keyboard-key"])]))),128))])]))),128))])]),_:1}))}}),Ka=z({__name:"HelpVideos",setup(e){return(t,o)=>(C(),$(ht,{title:"Hungry For More? Watch Our Tutorials"},{default:I(()=>o[0]||(o[0]=[M("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/MvLXdpvDh90?si=y62b2TUkGWIZkDG8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1)])),_:1,__:[0]}))}}),Wa={class:"flex flex-col gap-4 h-[500px] overflow-auto"},ja=z({__name:"HelpContent",setup(e){return(t,o)=>(C(),O("div",null,[o[0]||(o[0]=M("h1",{class:"text-2xl font-bold mb-3 mt-4"},"Here's Some Help 👇",-1)),M("div",Wa,[B(Ga),B(Oa),B(Ka)])]))}}),qa=z({__name:"HelpMenu",setup(e){const t=L(!1),o=L();it(o,()=>{t.value=!1});const n=()=>{t.value=!t.value},s=wo();return s.add(ye.Help.binding,n),s.add("escape",()=>t.value=!1),window.addEventListener("keydown",s.handle),De(()=>{window.removeEventListener("keydown",s.handle)}),(r,l)=>(C(),O(oe,null,[B(ee,{onClick:n,class:"h-12 w-12"},{default:I(()=>[B(Q,{icon:"help"})]),_:1}),B(Ma,{visible:t.value,"onUpdate:visible":l[0]||(l[0]=d=>t.value=d)},{default:I(()=>[M("div",{ref_key:"dialogContent",ref:o},[B(ja)],512)]),_:1},8,["visible"])],64))}});function Ya(){const e=L(0),t=L(0),o=L(0),n=L(0);let s,r,l=performance.now(),d=performance.now(),a=0,i=0;const u=33.3,p=()=>{const _=performance.now(),g=_-d;t.value=g,d=_,g>u&&i++,a++,s=requestAnimationFrame(p)},c=()=>{const _=performance.now(),g=_-l;e.value=Math.round(a*1e3/g),o.value=i,n.value=a>0?i/a:0,a=0,i=0,l=_};return je(()=>{d=performance.now(),l=performance.now(),s=requestAnimationFrame(p),r=setInterval(c,500)}),De(()=>{cancelAnimationFrame(s),clearInterval(r)}),{fps:e,frameTime:t,slowFrameCount:o,slowFrameRatio:n}}const Za={class:"text-white text-end"},Va=z({__name:"BenchmarkingMetrics",setup(e){const{fps:t,slowFrameCount:o,slowFrameRatio:n}=Ya();return(s,r)=>(C(),O("div",Za,[M("div",null,"FPS: "+W(P(t)),1),M("div",null,"Slow Frame Count: "+W(P(o)),1),M("div",null,"Slow Frame Ratio: "+W(P(n).toFixed(2)),1)]))}}),Xa=z({__name:"ShareButton",setup(e){const t=xe(),o=L(!1),n=L(!1),s=eo(),r=()=>{o.value=!1,n.value=!1},l=async()=>{if(!o.value)try{const a=bo(te.value),i=vr(a),u=ko.compressToEncodedURIComponent(i),p=Eo,_=`${`${location.origin}${t.path}`}?${p}=${u}`;await navigator.clipboard.writeText(_),o.value=!0,s.add({summary:"Graph Share Link Copied to Clipboard!",life:3e3,severity:"success"})}catch(a){n.value=!0,s.add({summary:"Failed to copy share link to clipboard!",life:3e3,severity:"error"}),console.error(a)}finally{setTimeout(r,3e3)}},d=D(()=>o.value?"check":n.value?"alert":"share");return(a,i)=>(C(),$(ee,{onClick:l,disabled:o.value||n.value,class:"h-12 w-12"},{default:I(()=>[B(Q,{class:"text-3xl",icon:d.value},null,8,["icon"])]),_:1},8,["disabled"]))}}),Ja={class:"text-white text-end"},Qa=z({__name:"GraphAtMousePositionData",setup(e){const t=D(()=>{const{coords:{x:n,y:s}}=te.value.graphAtMousePosition.value;return{x:Math.round(n),y:Math.round(s)}}),o=D(()=>{const{items:n}=te.value.graphAtMousePosition.value;return n.map(s=>`${s.graphType} - ${s.shape.name} (${s.priority})`)});return(n,s)=>(C(),O("div",Ja,[M("div",null,"Cursor At: (X = "+W(t.value.x)+", Y = "+W(t.value.y)+")",1),M("div",null,"Items Hovered: "+W(o.value),1)]))}}),ei={class:j(["absolute","top-6","left-6"])},ti={class:j(["absolute","flex","flex-col","justify-center","items-center","gap-2","left-1/2","-translate-x-1/2","translate-y-6"])},oi={class:j(["absolute","top-6","right-6"])},ni={class:j(["absolute","grid","place-items-center","left-6","max-w-96","-translate-y-1/2","top-1/2"])},ri={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},si={class:j(["absolute","grid","place-items-center","right-6","max-w-96","-translate-y-1/2","top-1/2"])},ai={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},ii={class:j(["absolute","flex","gap-2","bottom-6","left-6"])},li={class:j(["absolute","bottom-6","-translate-x-1/2","left-1/2"])},ui={key:0,class:j(["absolute","flex","flex-col","gap-2","bottom-20","right-6","pointer-events-none"])},di={class:j(["absolute","flex","flex-col","gap-2","bottom-6","right-6"])},ci={class:j(["flex","gap-2"])},Fl=z({__name:"GraphProduct",props:{graph:{},canvas:{},css:{}},emits:["simulation-started","simulation-stopped"],setup(e,{emit:t}){const o=e,n=L(!1),s=t,r=yr(o.graph),l=L(r[0]),d=L(!1),a=D(()=>l.value.runner),i=D(()=>a.value.simControls.isActive),u=async()=>{d.value=!0,s("simulation-started",l.value),await a.value.start()},p=async()=>{await a.value.stop(),d.value=!1,s("simulation-stopped"),n.value&&o.graph.annotation.activate(),n.value=!1},c=f=>{n.value=o.graph.annotation.isActive.value,o.graph.annotation.deactivate(),l.value=f,u()};jr(o.graph);const _=L(!1),g=D(()=>_.value?"pointer-events-none":""),T=()=>_.value=!0,h=()=>_.value=!1;return je(()=>{o.graph.subscribe("onMouseDown",T),o.graph.subscribe("onMouseUp",h)}),De(()=>{o.graph.unsubscribe("onMouseDown",T),o.graph.unsubscribe("onMouseUp",h)}),(f,k)=>(C(),O(oe,null,[M("div",{class:j([g.value])},[M("div",ei,[B(zs)]),M("div",ti,[d.value?F(f.$slots,"top-center-sim",{key:0}):F(f.$slots,"top-center",{key:1})]),M("div",oi,[d.value?F(f.$slots,"top-right-sim",{key:0},()=>[B(qs,{onClick:p})]):F(f.$slots,"top-right",{key:1},()=>[P(r).length>0?(C(),$(js,{key:0,onSimulationSelected:c,simulations:P(r)},null,8,["simulations"])):Y("",!0)])]),M("div",ni,[M("div",ri,[d.value?F(f.$slots,"center-left-sim",{key:0}):F(f.$slots,"center-left",{key:1})])]),M("div",si,[M("div",ai,[d.value?F(f.$slots,"center-right-sim",{key:0}):F(f.$slots,"center-right",{key:1})])]),M("div",ii,[B(qa),B(Xa),B(Xs,{camera:f.canvas.camera},null,8,["camera"])]),M("div",li,[d.value&&i.value?F(f.$slots,"bottom-center-sim",{key:0},()=>[B(ns,{controls:a.value.simControls},null,8,["controls"])]):F(f.$slots,"bottom-center",{key:1},()=>[Ze(M("div",null,[B(gs)],512),[[Fn,f.graph.annotation.isActive.value]])])]),P($n)?(C(),O("div",ui,[B(Qa),B(Va)])):Y("",!0),M("div",di,[M("div",ci,[B(Zs),B(Ys)])])],2),B(fr,Rn(zn({...o.canvas.ref,...o.css.value})),null,16)],64))}}),pi=(e,t)=>{const{getTheme:o}=t,n=o("nodeColor",e),s=o("nodeBorderColor",e),r=o("nodeSize",e),l=o("nodeBorderWidth",e),d=o("nodeText",e),a=o("nodeTextSize",e),i=o("nodeTextColor",e),u=o("nodeShape",e),p=t.shapes.circle({id:e.id,at:{x:e.x,y:e.y},radius:r,fillColor:n,stroke:{color:s,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:S.TRANSPARENT}}),c=t.shapes.square({id:e.id,at:{x:e.x-r,y:e.y-r},size:r*2,fillColor:n,stroke:{color:s,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:S.TRANSPARENT}});return{shape:u==="circle"?p:c,id:e.id,graphType:"node"}},Ht=2,fi=(e,t)=>{const{displayEdgeLabels:o,isGraphDirected:n}=t.settings.value,[s,r]=rt(e.id,t),d=uo(s.id,r.id,t).length>1,a=r===s,i=t.getTheme("nodeBorderWidth",s),u=t.getTheme("nodeBorderWidth",r),p=t.getTheme("nodeSize",s),c=t.getTheme("nodeSize",r),_=Math.atan2(r.y-s.y,r.x-s.x),g=u/2+Ht,T={x:(c+g)*Math.cos(_),y:(c+g)*Math.sin(_)},h={x:s.x,y:s.y},f={x:r.x-(n?T.x:0),y:r.y-(n?T.y:0)},k=t.getTheme("edgeWidth",e),A=Math.max(k*1.2,7);d&&(h.x+=Math.cos(_+Math.PI/2)*A,h.y+=Math.sin(_+Math.PI/2)*A,f.x+=Math.cos(_+Math.PI/2)*A,f.y+=Math.sin(_+Math.PI/2)*A);const y=Hn(h,t.edges.value.filter(V=>(V.from===s.id||V.to===r.id)&&V.from!==V.to).map(V=>{const[ge,Se]=rt(V.id,t);return s.id===ge.id?Se:ge}).filter((V,ge,Se)=>ge===Se.findIndex(He=>He.x===V.x&&He.y===V.y))),w=t.getTheme("edgeColor",e),b=t.getTheme("edgeTextColor",e),v=t.getTheme("graphBgColor"),m=t.getTheme("edgeText",e),x=t.getTheme("edgeTextSize",e),E=t.getTheme("edgeTextFontWeight",e),H=o?{color:v,activeColor:v,textBlock:{content:m,color:b,fontSize:x,fontWeight:E}}:void 0,q=(p+i)*Un,Z=q-(p+i/2)-Ht;if(a)return{shape:t.shapes.uturn({id:e.id,spacing:k*1.2,at:{x:s.x,y:s.y},upDistance:q,downDistance:Z,rotation:y,lineWidth:k,fillColor:w,textArea:H}),id:e.id,graphType:"edge"};const G=p+i/2+c+u/2,ae=(s.x-r.x)**2+(s.y-r.y)**2;return G**2>ae?void 0:n?{shape:t.shapes.arrow({id:e.id,start:h,end:f,lineWidth:k,textOffsetFromCenter:(p+i/2)/2,fillColor:w,textArea:H}),id:e.id,graphType:"edge"}:{shape:t.shapes.line({id:e.id,start:h,end:f,lineWidth:k,fillColor:w,textArea:H}),id:e.id,graphType:"edge"}},yt={nodeShape:"circle",nodeSize:35,nodeBorderWidth:8,nodeTextSize:24,nodeAnchorRadius:Math.ceil(Math.sqrt(35)*2),edgeWidth:10,edgeTextSize:20,nodeText:({label:e})=>e,edgeText:({label:e})=>e,edgeTextFontWeight:"bold",linkPreviewWidth:10},bi="rgb(100, 60, 70)",vi={nodeBorderColor:S.BLACK,nodeColor:S.STONE_600,nodeTextColor:S.WHITE,nodeFocusBorderColor:S.RED_700,nodeFocusColor:bi,nodeFocusTextColor:S.WHITE,edgeColor:S.STONE_900,edgeFocusColor:S.RED_700,edgeFocusTextColor:S.WHITE,edgeTextColor:S.WHITE,graphBgColor:S.GRAY_600,graphBgPatternColor:S.GRAY_500,nodeAnchorColorWhenParentFocused:S.RED_900,nodeAnchorColor:S.GRAY_900,linkPreviewColor:S.BLACK,marqueeSelectionBoxColor:S.WHITE+"15",marqueeSelectionBoxBorderColor:S.WHITE,marqueeEncapsulatedNodeBoxBorderColor:S.RED_700,marqueeEncapsulatedNodeBoxColor:S.RED_700+"20",...yt},gi={nodeColor:S.GRAY_50,nodeBorderColor:S.GRAY_800,nodeFocusBorderColor:S.BLUE_600,nodeFocusColor:S.BLUE_100,nodeTextColor:S.GRAY_900,nodeFocusTextColor:S.GRAY_900,edgeColor:S.GRAY_800,edgeTextColor:S.GRAY_900,edgeFocusColor:S.BLUE_600,edgeFocusTextColor:S.BLACK,graphBgColor:S.GRAY_200,graphBgPatternColor:S.GRAY_500,nodeAnchorColor:S.BLACK,nodeAnchorColorWhenParentFocused:S.BLUE_900,linkPreviewColor:S.BLACK,marqueeSelectionBoxColor:S.BLUE_300+"15",marqueeSelectionBoxBorderColor:S.BLUE_500,marqueeEncapsulatedNodeBoxBorderColor:S.BLUE_700,marqueeEncapsulatedNodeBoxColor:S.BLUE_700+"05",...yt},mi={nodeColor:S.PINK_100,nodeBorderColor:S.PINK_400,nodeFocusBorderColor:S.PURPLE_600,nodeFocusColor:S.PURPLE_200,nodeTextColor:S.PINK_600,nodeFocusTextColor:S.PURPLE_900,edgeColor:S.PINK_600,edgeTextColor:S.PINK_600,edgeFocusColor:S.PURPLE_600,edgeFocusTextColor:S.PURPLE_600,graphBgColor:S.PINK_300,graphBgPatternColor:S.PURPLE_200,nodeAnchorColor:S.PINK_500,nodeAnchorColorWhenParentFocused:S.PURPLE_700,linkPreviewColor:S.PINK_900,marqueeSelectionBoxColor:S.PINK_300+"15",marqueeSelectionBoxBorderColor:S.PINK_500,marqueeEncapsulatedNodeBoxBorderColor:S.PINK_700,marqueeEncapsulatedNodeBoxColor:S.PINK_700+"05",...yt},_t={light:gi,dark:vi,pink:mi},hi=Object.keys(_t),Hl=(e,t)=>({nodeSize:e("nodeSize",t),nodeBorderWidth:e("nodeBorderWidth",t),nodeColor:e("nodeColor",t),nodeBorderColor:e("nodeBorderColor",t),nodeTextSize:e("nodeTextSize",t),nodeTextColor:e("nodeTextColor",t),nodeText:e("nodeText",t),nodeShape:e("nodeShape",t)}),yi=()=>({nodeSize:[],nodeBorderWidth:[],nodeColor:[],nodeBorderColor:[],nodeFocusColor:[],nodeFocusBorderColor:[],nodeText:[],nodeFocusTextColor:[],nodeTextSize:[],nodeTextColor:[],nodeShape:[],edgeColor:[],edgeWidth:[],edgeText:[],edgeTextSize:[],edgeTextColor:[],edgeFocusTextColor:[],edgeTextFontWeight:[],edgeFocusColor:[],graphBgColor:[],graphBgPatternColor:[],nodeAnchorRadius:[],nodeAnchorColor:[],nodeAnchorColorWhenParentFocused:[],linkPreviewColor:[],linkPreviewWidth:[],marqueeSelectionBoxColor:[],marqueeSelectionBoxBorderColor:[],marqueeEncapsulatedNodeBoxColor:[],marqueeEncapsulatedNodeBoxBorderColor:[]}),_i=e=>Object.prototype.toString.call(e)==="[object Object]",zo=(e,t)=>{const o={};if(!e)return t;if(!t)return null;const n=Object.keys(e),s=Object.keys(t);for(const r of s)n.includes(r)||(o[r]=t[r]);for(const r of n){if(_i(e[r])){const l=zo(e[r],t[r]);l&&(o[r]=l);continue}if(Array.isArray(e[r])){JSON.stringify(e[r])!==JSON.stringify(t[r])&&(o[r]=t[r]);continue}else e[r]!==t[r]&&(o[r]=t[r])}return Object.keys(o).length?o:null},at=e=>{const t={...e};for(const o in t)typeof t[o]=="object"&&(t[o]=at(t[o]));return t},Ci=e=>({subscribe:(t,o)=>e[t].add(o),unsubscribe:(t,o)=>e[t].delete(o),emit:(t,...o)=>{for(const n of e[t])n(...o)}}),wi=()=>({onStructureChange:new Set,onNodeAdded:new Set,onBulkNodeAdded:new Set,onNodeRemoved:new Set,onBulkNodeRemoved:new Set,onNodeMoved:new Set,onBulkNodeMoved:new Set,onEdgeAdded:new Set,onBulkEdgeAdded:new Set,onEdgeRemoved:new Set,onBulkEdgeRemoved:new Set,onEdgeLabelEdited:new Set,onDraw:new Set,onNodeHoverChange:new Set,onGraphLoaded:new Set,onGraphReset:new Set,onClick:new Set,onMouseDown:new Set,onMouseUp:new Set,onMouseMove:new Set,onDblClick:new Set,onContextMenu:new Set,onKeyDown:new Set,onKeyUp:new Set,onThemeChange:new Set,onSettingsChange:new Set,onUndo:new Set,onRedo:new Set,onFocusChange:new Set,onNodeDragStart:new Set,onNodeDrop:new Set,onNodeAnchorDragStart:new Set,onNodeAnchorDrop:new Set,onGroupDragStart:new Set,onGroupDrop:new Set,onMarqueeBeginSelection:new Set,onMarqueeEndSelection:new Set}),Ut=e=>e==null,xi=e=>{const t=e.trim().split("/").filter(Boolean);if(t.length!==2)return!1;const[o,n]=t.map(Number);return!(Ut(o)||Ut(n))},Si=e=>{if(!xi(e))return;const t=e.split("/"),[o,n]=t.map(Number);return o/n},ki={displayEdgeLabels:!0,edgeLabelsEditable:!0,edgeInputToLabel:e=>{var n;const t=e.trim();if(!t)return;const o=(n=Si(t))==null?void 0:n.toFixed(2);return o==="Infinity"?"∞":o==="-Infinity"?"-∞":o===void 0&&isNaN(Number(t))?void 0:o??t},newNodeLabelGetter:null,isGraphDirected:!0,animations:()=>({})},Ei={focusable:!0,focusBlacklist:[]},Ti={draggable:!0},Ai={nodeAnchors:!0},Li={marquee:!0,marqueeSelectableGraphTypes:["node","edge"]},Di={interactive:!0,userAddedEdgeLabel:"1",userAddedEdgeRuleNoSelfLoops:!1,userAddedEdgeRuleOneEdgePerPath:!1},Bi={persistent:!0,persistentStorageKey:"graph",persistentBlacklist:new Set},Ii={shortcuts:!0,shortcutUndo:!0,shortcutRedo:!0,shortcutSelectAll:!0,shortcutDelete:!0,shortcutEscape:!0,shortcutZoomIn:!0,shortcutZoomOut:!0},Mi={...ki,...Ei,...Ti,...Ai,...Li,...Di,...Bi,...Ii},Gt=(e,...t)=>typeof e=="function"?e(...t):e,Ni=(e,t)=>(o,...n)=>{const s=t[o].findLast(l=>{const d=l.value;return Gt(d,...n)!==void 0}),r=(s==null?void 0:s.value)??_t[e.value][o];if(!r)throw new Error(`Theme property "${o}" not found`);return Gt(r,...n)},Pi=(e,t)=>{const o=D(()=>{const s=new Map;for(const r of e.value)s.set(r.id,r);return s}),n=D(()=>{const s=new Map;for(const r of t.value)s.set(r.id,r);return s});return{nodeIdToNodeMap:o,edgeIdToEdgeMap:n}},Oi=({emit:e})=>{const t=L([]),o=[],n=()=>{const l=o.reduce((d,a)=>a(d),[]);t.value=[...l.sort((d,a)=>d.priority-a.priority)]};return{aggregator:t,subscribeToAggregator:o,updateAggregator:n,getSchemaItemsByCoordinates:l=>t.value.sort((d,a)=>d.priority-a.priority).filter(d=>{var a,i;return d.shape.shapeHitbox(l)||((i=(a=d.shape).textHitbox)==null?void 0:i.call(a,l))}),draw:l=>{var u,p,c,_;n();const d=t.value.findLastIndex(g=>g.graphType==="edge"),a=t.value.slice(0,d+1),i=t.value.slice(d+1);for(const g of a)g.shape.drawShape(l);for(const g of a)(p=(u=g.shape).drawTextAreaMatte)==null||p.call(u,l);for(const g of a)(_=(c=g.shape).drawText)==null||_.call(c,l);for(const g of i)g.shape.draw(l);e("onDraw",l)}}},$i={broadcast:!0,focus:!0,history:!0,animate:!1},Ri={broadcast:!0,focus:!1,history:!0,animate:!1},Kt={broadcast:!0,history:!0},Wt={broadcast:!0,focus:!1,history:!0,animate:!1},zi={broadcast:!1,focus:!1,history:!1,animate:!0},Fi={history:!0},jt={broadcast:!0,history:!0},Hi={broadcast:!0},Ui={broadcast:!0},Gi={label:""},Ki="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");Array.from({length:999},(e,t)=>(t+1).toString());const Wi=(e,t)=>()=>{let o=e.value.map(({label:d})=>d),n=0,s=0,r;const l=()=>n===0?"":t[(n-1)%t.length];for(;!r;){s>=t.length&&(o=o.slice(t.length),s=0,n++);const a=l()+t[s];o.includes(a)||(r=a),s++}return r},ji=e=>Wi(e.nodes,Ki),qi=({nodes:e,edges:t,nodeMap:o,edgeMap:n,emit:s,settings:r,updateGraphAtMousePosition:l,updateAggregator:d,animations:a,autoAnimate:i})=>{const u=v=>o.value.get(v),p=v=>n.value.get(v),c=(v,m={})=>{if(v!=null&&v.id&&u(v.id)){console.warn("prevented adding a node with an existing id, this shouldn't happen");return}const x={...$i,...m},E=r.value.newNodeLabelGetter??ji({nodes:e}),R={id:v.id??Me(),label:v.label??E(),x:v.x??0,y:v.y??0};return x.animate&&a.circle.nodeAdded.play({shapeId:R.id,runCount:1}),e.value.push(R),d(),l(),s("onNodeAdded",R,x),s("onStructureChange"),R},_=(v,m={})=>{if(v.length===0)return;const x={...Ri,...m},E=[];for(const R of v){const H=c(R,{focus:!1,broadcast:!1,history:!1});H&&E.push(H)}E.length!==0&&s("onBulkNodeAdded",E,x)},g=(v,m={})=>{const x={...Wt,...m},{isGraphDirected:E}=r.value,[R,H]=[u(v.from),u(v.to)];if(!R||!H)return;if(E){if(t.value.find(G=>G.from===v.from&&G.to===v.to))return}else if(t.value.find(G=>G.from===v.from&&G.to===v.to||G.from===v.to&&G.to===v.from))return;const q={...Gi,id:Me(),...v};if(x.animate){const G=H.id===R.id?"uturn":E?"arrow":"line";a[G].edgeAdded.play({shapeId:q.id,runCount:1})}return t.value.push(q),d(),l(),s("onEdgeAdded",q,x),s("onStructureChange"),q},T=(v,m={})=>{if(v.length===0)return;const x={...zi,...m},E=[];for(const R of v){const H=g(R,{broadcast:!1,history:!1});H&&E.push(H)}E.length!==0&&s("onBulkEdgeAdded",E,x)},h=(v,m,x={})=>{const E=u(v);if(!E)return;const R={...Hi,...x};E.x=m.x,E.y=m.y,s("onNodeMoved",E,R)},f=async(v,m={})=>{const x={...Ui,...m};for(const{id:E}of t.value)i.start(E);for(const{nodeId:E}of v)i.start(E);for(const{nodeId:E,coords:R}of v)h(E,R,x);await new Promise(E=>setTimeout(E,250));for(const{id:E}of t.value)i.stop(E);for(const{nodeId:E}of v)i.stop(E)},k=(v,m,x={})=>{const E={...Wt,...x},R=p(v);if(!R)return;const H=R.label;R.label=m,s("onEdgeLabelEdited",R,H,E),s("onStructureChange")},A=(v,m={})=>{const x=u(v);if(!x)return;const E={...Kt,...m},R=co(x.id,{edges:t,getEdge:p,settings:r}),H=[];for(const q of R){const Z=w(q.id,{broadcast:!1,history:!1});Z&&H.push(Z)}return e.value=e.value.filter(q=>q.id!==x.id),d(),l(),s("onNodeRemoved",x,H,E),s("onStructureChange"),[x,H]},y=async(v,m={})=>{if(v.length===0)return;const x={...Kt,...m},E=[],R=[];for(const H of v){const q=A(H,{broadcast:!1,history:!1});if(!q)continue;const[Z,G]=q;E.push(Z),R.push(...G)}E.length!==0&&s("onBulkNodeRemoved",E,R,x)},w=(v,m={})=>{const x=p(v);if(!x)return;const E={...jt,...m};return t.value=t.value.filter(R=>R.id!==x.id),d(),l(),s("onEdgeRemoved",x,E),s("onStructureChange"),x};return{getNode:u,getEdge:p,addNode:c,addEdge:g,moveNode:h,bulkMoveNode:f,editEdgeLabel:k,removeNode:A,removeEdge:w,bulkAddNode:_,bulkRemoveNode:y,bulkAddEdge:T,bulkRemoveEdge:(v,m={})=>{if(v.length===0)return;const x={...jt,...m},E=[];for(const R of v){const H=w(R,{broadcast:!1,history:!1});H&&E.push(H)}if(E.length!==0)return s("onBulkEdgeRemoved",E,x),E}}},Yi=({subscribe:e,canvas:t,graphAtMousePosition:o})=>{const n=L(!1),s=L(!1),r=L({node:"grab",edge:"pointer","node-anchor":"grab","encapsulated-node-box":"move"}),l=L(),d=D(()=>!!l.value),a=c=>{l.value=c},i=()=>{l.value=void 0},u=c=>{var g;if(!c)return"default";if(d.value)return((g=l.value)==null?void 0:g.call(l,c))??!1?"pointer":"default";const _=r.value[c.graphType]??"default";return _==="grab"&&n.value?"grabbing":_},p=()=>{if(!t.value||s.value)return;const c=o.value.items.at(-1);t.value.style.cursor=u(c)};return e("onMouseDown",()=>{n.value=!0,p()}),e("onMouseUp",()=>{n.value=!1,p()}),e("onClick",p),e("onDblClick",p),e("onKeyUp",p),e("onKeyDown",p),e("onMouseMove",p),be(r,p,{deep:!0}),{graphToCursorMap:r,activateCursorSelectMode:a,deactivateCursorSelectMode:i,graphCursorDisabled:s}},Zi=e=>{const t=new Map,o=new Set,n=new Map;return r=>({hold:a=>{if(o.has(`${r}-${a}`))return;const u=t.get(a)??0;u===0&&(n.set(a,e.value[a]),e.value[a]=!1),t.set(a,u+1),o.add(`${r}-${a}`)},release:a=>{if(!o.has(`${r}-${a}`))return;const i=t.get(a)??0;if(i!==0){if(i===1){const u=n.get(a);if(u===void 0)throw new Error("holdState not found");e.value[a]=u,n.delete(a)}t.set(a,i-1),o.delete(`${r}-${a}`)}}})},Ct=500,Vi={forShapes:["arrow"],durationMs:Ct,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,end:(e,{start:t})=>t,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.33,properties:{textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.9,properties:{end:e=>e,lineWidth:e=>e}}]},qt={forShapes:["line","uturn"],durationMs:Ct,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},Xi={forShapes:["circle"],durationMs:Ct,easing:{radius:"in-out"},keyframes:[{progress:0,properties:{radius:0,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},Ji=e=>({arrow:{edgeAdded:e(Vi)},line:{edgeAdded:e(qt)},uturn:{edgeAdded:e(qt)},circle:{nodeAdded:e(Xi)}}),Qi=(e,t={})=>{const{canvas:o,cursorCoordinates:n}=e,s=L("light"),r=yi(),l=Ni(s,r),d=L({...Mi,...t}),a=Zi(d),i=wi(),{subscribe:u,unsubscribe:p,emit:c}=Ci(i),_=L(!0);it(e.canvas,()=>{_.value=!1}),u("onMouseDown",()=>{const N=document.activeElement;N instanceof HTMLElement&&typeof N.blur=="function"&&N.blur(),_.value=!0});const g=L([]),T=L([]),h=L({coords:{x:0,y:0},items:[]}),f=Yi({canvas:o,subscribe:u,graphAtMousePosition:h}),k=()=>h.value={coords:n.value,items:x(n.value)},A=N=>({...h.value,event:N}),y={click:N=>{N.preventDefault(),c("onClick",A(N))},mousemove:N=>{N.preventDefault(),k(),c("onMouseMove",A(N))},mousedown:N=>{N.preventDefault(),k(),c("onMouseDown",A(N))},mouseup:N=>{N.preventDefault(),k(),c("onMouseUp",A(N))},dblclick:N=>{N.preventDefault(),c("onDblClick",A(N))},contextmenu:N=>{c("onContextMenu",A(N))}},w={keydown:N=>c("onKeyDown",N),keyup:N=>c("onKeyUp",N)},{aggregator:b,subscribeToAggregator:v,updateAggregator:m,getSchemaItemsByCoordinates:x,draw:E}=Oi({emit:c}),{shapes:R,autoAnimate:H,defineTimeline:q}=dr(),Z=ur(Ji(q),d.value.animations(q)),G=N=>{const K={edges:T,getNode:ve,getEdge:V,getTheme:l,settings:d,shapes:R},re=T.value.map(pe=>fi(pe,K)).filter(Boolean).map((pe,Qe)=>({...pe,priority:Qe*10})),Je=g.value.map(pe=>pi(pe,K)).filter(Boolean).map((pe,Qe)=>({...pe,priority:Qe*10+1e3}));return N.push(...re),N.push(...Je),N};v.push(G),je(()=>{if(!o.value)throw new Error("canvas element not found");for(const[N,K]of Object.entries(y))o.value.addEventListener(N,K);for(const[N,K]of Object.entries(w))document.addEventListener(N,K)}),Qt(()=>{if(!o.value)throw new Error("Canvas element not found");for(const[N,K]of Object.entries(y))o.value.removeEventListener(N,K);for(const[N,K]of Object.entries(w))document.removeEventListener(N,K)});const{nodeIdToNodeMap:ae,edgeIdToEdgeMap:ie}=Pi(g,T),{getNode:ve,getEdge:V,addNode:ge,addEdge:Se,moveNode:He,bulkMoveNode:Fo,editEdgeLabel:Ho,removeNode:Uo,removeEdge:Go,bulkAddNode:Ko,bulkRemoveNode:Wo,bulkAddEdge:jo,bulkRemoveEdge:qo}=qi({nodes:g,edges:T,nodeMap:ae,edgeMap:ie,emit:c,settings:d,updateGraphAtMousePosition:k,updateAggregator:m,animations:Z,autoAnimate:H}),Yo=D(()=>g.value.reduce((N,K,re)=>(N.set(K.id,re),N),new Map)),Zo=D(()=>T.value.reduce((N,K,re)=>(N.set(K.id,re),N),new Map));let ke;u("onMouseMove",({items:N})=>{const K=N.at(-1);if(!K||K.graphType!=="node")return;const re=ve(K.id);re!==ke&&(c("onNodeHoverChange",re,ke),ke=re)});const Vo=N=>(ke&&po(ke.id,N),N);v.push(Vo);const Xo=(N,K)=>{const re={nodes:g.value,edges:T.value};g.value=N.nodes,T.value=N.edges;const Je={...Fi,...K};c("onGraphLoaded",re,Je),c("onStructureChange")},Jo=()=>{g.value=[],T.value=[],c("onGraphReset"),c("onStructureChange")};be(s,async(N,K)=>{c("onThemeChange",N,K)});const wt=L(at(d.value));return be(d,N=>{const K=zo(wt.value,N);K&&(wt.value=at(d.value),c("onSettingsChange",K),"isGraphDirected"in K&&c("onStructureChange"))},{deep:!0}),{nodes:g,edges:T,nodeIdToIndex:Yo,edgeIdToIndex:Zo,getNode:ve,getEdge:V,addNode:ge,addEdge:Se,moveNode:He,bulkMoveNode:Fo,editEdgeLabel:Ho,removeNode:Uo,removeEdge:Go,bulkAddNode:Ko,bulkRemoveNode:Wo,bulkAddEdge:jo,bulkRemoveEdge:qo,getSchemaItemsByCoordinates:x,eventBus:i,subscribe:u,unsubscribe:p,emit:c,subscribeToAggregator:v,aggregator:b,updateAggregator:m,pluginHoldController:a,shapes:R,autoAnimate:H,animations:Z,defineTimeline:q,baseTheme:D(()=>_t[s.value]),themeName:s,getTheme:l,themeMap:r,settings:d,load:Xo,reset:Jo,magicCanvas:e,canvasFocused:_,canvasHovered:Gn(e.canvas),draw:E,graphAtMousePosition:h,updateGraphAtMousePosition:k,...f}},el=(e,t)=>{const o={at:{x:1/0,y:1/0},width:0,height:0};if(e.length<2)return o;let n=1/0,s=1/0,r=-1/0,l=-1/0;for(const d of e){const a=t.getTheme("nodeSize",d),i=t.getTheme("nodeBorderWidth",d),u=a+i/2,{x:p,y:c}=d;n=Math.min(n,p-u),s=Math.min(s,c-u),r=Math.max(r,p+u),l=Math.max(l,c+u)}return n<1/0&&s<1/0&&r>-1/0&&l>-1/0?(o.at.x=n,o.at.y=s,o.width=r-n,o.height=l-s):(o.width=0,o.height=0),o},tl=e=>{const t=L(),o=L(),n=L(),{hold:s,release:r}=e.pluginHoldController("marquee"),l=b=>{const{width:v,height:m}=b;return Math.abs(v*m)},d=({items:b,coords:v,event:m})=>{if(m.button!==Ce.left)return;const x=b.at(-1);(x==null?void 0:x.graphType)!=="encapsulated-node-box"&&r("nodeAnchors"),x||p(v)},a=({coords:b})=>{if(!n.value)return;const v=b.x-n.value.x,m=b.y-n.value.y;n.value=b;for(const x of e.focus.focusedNodes.value)e.moveNode(x.id,{x:x.x+v,y:x.y+m});g()},i=({items:b,coords:v,event:m})=>{if(m.button!==Ce.left||t.value)return;const x=b.at(-1);(x==null?void 0:x.graphType)==="encapsulated-node-box"&&(n.value=v,e.emit("onGroupDragStart",e.focus.focusedNodes.value,v))},u=()=>{n.value&&(e.emit("onGroupDrop",e.focus.focusedNodes.value,n.value),n.value=void 0)},p=b=>{s("nodeAnchors"),e.graphCursorDisabled.value=!0,t.value={at:b,width:0,height:0},e.emit("onMarqueeBeginSelection",b)},c=()=>{if(!t.value)return;const b=t.value;t.value=void 0,e.graphCursorDisabled.value=!1,r("nodeAnchors"),e.emit("onMarqueeEndSelection",b)},_=b=>{if(l(b)<100)return;const m=[];for(const{id:x,shape:E,graphType:R}of e.aggregator.value){const{marqueeSelectableGraphTypes:H}=e.settings.value;if(!H.includes(R))continue;E.efficientHitbox(b)&&m.push(x)}e.focus.set(m)},g=()=>{o.value=el(e.focus.focusedNodes.value,e)},T=({coords:b})=>{if(!t.value)return;const{x:v,y:m}=b;t.value.width=v-t.value.at.x,t.value.height=m-t.value.at.y,_(t.value)},h=b=>{const v="marquee-box",m=e.shapes.rect({id:v,...Kn(b),fillColor:e.getTheme("marqueeSelectionBoxColor"),stroke:{color:e.getTheme("marqueeSelectionBoxBorderColor"),lineWidth:2}});return{id:v,graphType:"marquee-box",shape:m,priority:1/0}},f=b=>{if(!t.value)return b;const{width:v,height:m}=t.value;if(v===0||m===0)return b;const x=h(t.value);return b.push(x),b},k=b=>{const v="encapsulated-node-box",m=e.shapes.rect({id:v,...b,fillColor:e.getTheme("marqueeEncapsulatedNodeBoxColor"),stroke:{color:e.getTheme("marqueeEncapsulatedNodeBoxBorderColor"),lineWidth:2}});return{id:v,graphType:"encapsulated-node-box",shape:m,priority:1/0}},A=b=>{if(!o.value)return b;const{width:v,height:m}=o.value;if(v===0||m===0)return b;const x=k(o.value);return b.push(x),b};e.subscribeToAggregator.push(A),e.subscribeToAggregator.push(f);const y=()=>{e.subscribe("onFocusChange",g),e.subscribe("onMouseDown",d),e.subscribe("onMouseUp",c),e.subscribe("onContextMenu",c),e.subscribe("onMouseMove",T),e.subscribe("onMouseDown",i),e.subscribe("onMouseUp",u),e.subscribe("onMouseMove",a),e.subscribe("onUndo",g),e.subscribe("onRedo",g)},w=()=>{e.unsubscribe("onFocusChange",g),e.unsubscribe("onMouseDown",d),e.unsubscribe("onMouseUp",c),e.unsubscribe("onContextMenu",c),e.unsubscribe("onMouseMove",T),e.unsubscribe("onMouseDown",i),e.unsubscribe("onMouseUp",u),e.unsubscribe("onMouseMove",a),e.unsubscribe("onUndo",g),e.unsubscribe("onRedo",g),t.value&&c()};return e.subscribe("onSettingsChange",b=>{b.marquee===!0?y():b.marquee===!1&&w()}),e.settings.value.marquee&&y(),{updateEncapsulatedNodeBox:g,activelySelecting:D(()=>!!t.value)}},ol=e=>{const t=L(),{hold:o,release:n}=e.pluginHoldController("node-drag"),s=({items:i,coords:u,event:p})=>{if(p.button!==Ce.left)return;const c=i.at(-1);if(!c||c.graphType!=="node")return;o("nodeAnchors");const _=e.getNode(c.id);_&&(t.value={node:_,coords:u},e.emit("onNodeDragStart",_))},r=()=>{if(!t.value)return;const{node:i}=t.value;t.value=void 0,e.emit("onNodeDrop",i),n("nodeAnchors");const{items:u}=e.graphAtMousePosition.value,p=u.at(-1);(p==null?void 0:p.id)===i.id&&e.nodeAnchors.setParentNode(i.id)},l=({coords:i})=>{if(!t.value)return;const{node:u,coords:p}=t.value,c=i.x-p.x,_=i.y-p.y;e.moveNode(u.id,{x:u.x+c,y:u.y+_}),t.value.coords=i},d=()=>{e.subscribe("onMouseDown",s),e.subscribe("onMouseUp",r),e.subscribe("onMouseMove",l),e.graphToCursorMap.value.node="grab"},a=()=>{e.unsubscribe("onMouseDown",s),e.unsubscribe("onMouseUp",r),e.unsubscribe("onMouseMove",l),e.graphToCursorMap.value.node="pointer",t.value&&r()};return e.subscribe("onSettingsChange",i=>{i.draggable===!1?a():i.draggable===!0&&d()}),e.settings.value.draggable&&d(),e.settings.value.draggable||a(),{currentlyDraggingNode:D(()=>{var i;return(i=t.value)==null?void 0:i.node})}},nl=e=>{const t=L(),o=L(),n=()=>{t.value=void 0,o.value=void 0},s=y=>{if(e.settings.value.nodeAnchors===!1)return;const w=e.getNode(y);if(!w)throw new Error("node not found");t.value=w,i(w)},r=L(),l=({items:y})=>{const w=y.at(-1);if(!w)return r.value=void 0;r.value=w.id},d=y=>{var E,R;const{getTheme:w}=e,b=w("nodeAnchorColor",y),v=w("nodeAnchorColorWhenParentFocused",y),m=w("nodeAnchorRadius",y),x=[];for(const H of a.value){const{x:q,y:Z,id:G}=H,ae=G===r.value||G===((E=o.value)==null?void 0:E.id),ie={id:G,at:{x:q,y:Z},radius:m,fillColor:ae?v:b};o.value&&o.value.direction===H.direction&&(ie.at.x=o.value.x,ie.at.y=o.value.y);const ve=e.shapes.circle(ie),V=H.id===((R=o.value)==null?void 0:R.id);x.push({id:H.id,graphType:"node-anchor",shape:ve,priority:V?1/0:99999})}return x},a=L([]),i=y=>{if(!y)return a.value=[];const{getTheme:w}=e,b=w("nodeAnchorRadius",y),v=w("nodeSize",y),m=w("nodeBorderWidth",y),x=v-b/3+m/2;a.value=[{id:"n-anchor",x:y.x,y:y.y-x,direction:"north"},{id:"e-anchor",x:y.x+x,y:y.y,direction:"east"},{id:"s-anchor",x:y.x,y:y.y+x,direction:"south"},{id:"w-anchor",x:y.x-x,y:y.y,direction:"west"}]},u=({items:y,event:w})=>{if(w.button!==Ce.left)return;const b=y.at(-1);if(!b||b.graphType!=="node-anchor")return;const{id:v}=b;return a.value.find(m=>m.id===v)},p=()=>{if(!t.value||!o.value)return;const{x:y,y:w}=o.value,b={x:t.value.x,y:t.value.y},v={x:y,y:w},{getTheme:m}=e,x=m("linkPreviewColor",t.value,o.value),E=m("linkPreviewWidth",t.value,o.value);return{id:"link-preview",graphType:"link-preview",shape:e.shapes.line({id:"link-preview",start:b,end:v,fillColor:x,lineWidth:E})}},c=()=>{var v;if(o.value)return;const{items:y}=e.graphAtMousePosition.value,w=y.at(-1);if(!w)return n();if(w.graphType==="node-anchor")return;if(w.graphType!=="node")return n();const b=e.getNode(w.id);if(!b)throw new Error("anchors: node shown on screen not in graph state");b.id!==((v=t.value)==null?void 0:v.id)&&s(b.id)},_=y=>{if(!t.value)return;const w=u(y);w&&(o.value=w,e.emit("onNodeAnchorDragStart",t.value,w))},g=({coords:y})=>{if(!o.value)return;const{x:w,y:b}=y;o.value.x=w,o.value.y=b},T=()=>{if(o.value){if(!t.value)throw new Error("active anchor without parent node")}else return;e.emit("onNodeAnchorDrop",t.value,o.value),n()},h=y=>{if(!t.value)return y;const w=d(t.value);for(const b of w)y.push(b);return y},f=y=>{var x;if(!t.value||!o.value)return y;const{id:w}=t.value;po(w,y);const b=(x=y.find(E=>E.id===w))==null?void 0:x.priority;if(!b)return y;const v=p();if(!v)return y;const m={...v,priority:b-.1};return y.push(m),y};e.subscribeToAggregator.push(h),e.subscribeToAggregator.push(f);const k=()=>{e.subscribe("onNodeAdded",c),e.subscribe("onNodeRemoved",c),e.subscribe("onNodeMoved",n),e.subscribe("onNodeDrop",i),e.subscribe("onMouseMove",c),e.subscribe("onMouseMove",g),e.subscribe("onMouseMove",l),e.subscribe("onMouseDown",_),e.subscribe("onMouseUp",T)},A=()=>{e.unsubscribe("onNodeAdded",c),e.unsubscribe("onNodeRemoved",c),e.unsubscribe("onNodeMoved",n),e.unsubscribe("onNodeDrop",i),e.unsubscribe("onMouseMove",c),e.unsubscribe("onMouseMove",g),e.unsubscribe("onMouseMove",l),e.unsubscribe("onMouseDown",_),e.unsubscribe("onMouseUp",T),n()};return e.subscribe("onSettingsChange",y=>{y.nodeAnchors===!0?k():y.nodeAnchors===!1&&A()}),e.settings.value.nodeAnchors&&k(),{currentDraggingAnchor:Ie(o),parentNode:Ie(t),setParentNode:s}},Yt=100,rl=e=>{const t=L([]),o=L([]);return{clearHistory:()=>{t.value=[],o.value=[]},undo:()=>{const a=t.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value=e.value.filter(({id:c})=>!p.includes(c)):i==="remove"&&e.value.push(...u),o.value.push(a)},redo:()=>{const a=o.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value.push(...u):i==="remove"&&(e.value=e.value.filter(({id:c})=>!p.includes(c))),t.value.push(a)},addToUndoStack:a=>{t.value.push(a),t.value.length>Yt&&t.value.shift()},addToRedoStack:a=>{o.value.push(a),o.value.length>Yt&&o.value.shift()},canUndo:D(()=>t.value.length!==0),canRedo:D(()=>o.value.length!==0)}},tt=10,sl=ne(),al=e=>{const t=L(To[0]),o=L(Ao[1]),n=L(!1),s=L(!1),r=L(),l=L(Date.now()),d=L(new Set),a=L([]),i=L([]),u=L(!1),p=L(),c=L(!1),_=rl(i),g=()=>{i.value.length!==0&&(_.addToUndoStack({action:"remove",annotations:i.value}),i.value=[])},T=()=>{r.value||(r.value=setInterval(()=>{Date.now()-l.value>50&&s.value&&a.value.length>=2&&a.value.shift()},50))},h=({coords:m,event:x})=>{if(x.button===Ce.left){if(n.value){const E=Et({at:m,radius:tt}).getBoundingBox(),R=i.value.filter(H=>e.shapes.scribble(H).efficientHitbox(E));for(const H of R)d.value.add(H.id)}u.value=!0,p.value=m,a.value=[m]}},f=({coords:m})=>{if(!(!u.value||!p.value)&&a.value.length!==0){if(n.value){const x=Et({at:m,radius:tt}).getBoundingBox(),E=i.value.filter(R=>e.shapes.scribble(R).efficientHitbox(x));for(const R of E)d.value.add(R.id);return}p.value=m,a.value.push(m),s.value&&a.value.length>10&&a.value.shift(),s.value&&T(),l.value=Date.now()}},k=()=>{if(!u.value)return;if(u.value=!1,p.value=void 0,n.value){const x=i.value.filter(E=>d.value.has(E.id));_.addToUndoStack({action:"remove",annotations:x}),i.value=i.value.filter(E=>!d.value.has(E.id)),d.value.clear();return}if(s.value){r.value=void 0;return}const m={id:Me(),type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value};i.value.push(m),_.addToUndoStack({action:"add",annotations:[m]}),a.value=[]},A=D(()=>n.value||s.value);be(A,()=>{const m=e.magicCanvas.canvas.value;m&&(m.style.cursor=A.value?"none":"crosshair")});const y=m=>{if(!c.value)return m;if(n.value&&e.canvasHovered.value){const x="annotation-eraser-cursor",E=e.shapes.circle({id:x,at:e.graphAtMousePosition.value.coords,radius:tt,fillColor:S.TRANSPARENT,stroke:{color:sl.value.contrast,lineWidth:2}});m.push({graphType:"annotation-eraser",id:x,shape:E,priority:5050})}else if(a.value.length>0&&u.value){const x="annotation-incomplete",E=e.shapes.scribble({id:x,type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value});m.push({graphType:"annotation",id:x,shape:E,priority:5001})}else if(s.value&&e.canvasHovered.value){const x="laser-pointer-cursor",E=e.shapes.circle({id:x,at:e.graphAtMousePosition.value.coords,radius:o.value,fillColor:t.value});m.push({graphType:"annotation",id:x,shape:E,priority:5050})}for(const x of i.value){const E=d.value.has(x.id);m.push({graphType:"annotation",id:x.id,shape:e.shapes.scribble({...x,fillColor:x.fillColor+(E?"50":"")}),priority:5e3})}return m};return e.subscribeToAggregator.push(y),{clear:g,isActive:c,annotations:i,isLaserPointing:s,isErasing:n,color:t,brushWeight:o,activate:()=>{const m=e.magicCanvas.canvas.value;m&&(c.value=!0,e.settings.value.interactive=!1,e.settings.value.marquee=!1,e.settings.value.focusable=!1,e.settings.value.draggable=!1,e.graphCursorDisabled.value=!0,m.style.cursor="crosshair",e.subscribe("onMouseDown",h),e.subscribe("onMouseMove",f),e.subscribe("onMouseUp",k))},deactivate:()=>{const m=e.magicCanvas.canvas.value;m&&(c.value=!1,n.value=!1,e.settings.value.interactive=!0,e.settings.value.marquee=!0,e.settings.value.focusable=!0,e.settings.value.draggable=!0,e.graphCursorDisabled.value=!1,m.style.cursor="default",e.unsubscribe("onMouseDown",h),e.unsubscribe("onMouseMove",f),e.unsubscribe("onMouseUp",k))},load:m=>{i.value=m},undo:_.undo,redo:_.redo,canUndo:_.canUndo,canRedo:_.canRedo}},il=["node","edge"],ll="use-focus-graph",ul=e=>{const{setTheme:t}=Wn(e,ll),o=L(new Set),n=g=>{const T=g.filter(A=>!e.settings.value.focusBlacklist.includes(A));if(T.length===o.value.size&&T.every(A=>o.value.has(A)))return;const k=new Set([...o.value]);o.value=new Set(T),e.emit("onFocusChange",o.value,k)},s=g=>{if(o.value.has(g)||e.settings.value.focusBlacklist.includes(g))return;const f=new Set([...o.value]);o.value.add(g),e.emit("onFocusChange",o.value,f)},r=g=>{var h,f;const T=jn(e.magicCanvas.canvas);(f=(h=g.shape).startTextAreaEdit)==null||f.call(h,T,k=>{const A=e.getEdge(g.id);if(!A)throw new Error("textarea only implemented for edges");const y=e.settings.value.edgeInputToLabel(k);y===void 0||A.label===y||e.editEdgeLabel(A.id,y)})},l=()=>{const g=Array.from(o.value),T=g.filter(h=>e.getNode(h)||e.getEdge(h));T.length!==g.length&&n(T)},d=({items:g,coords:T,event:h})=>{var w,b;if(h.button!==Ce.left)return;const f=g.at(-1);if(!f)return h.shiftKey?void 0:a();if(((b=(w=f.shape).textHitbox)==null?void 0:b.call(w,T))&&e.settings.value.edgeLabelsEditable&&f.graphType==="edge")return a(),r(f);il.some(v=>v===f.graphType)&&(h.shiftKey?s(f.id):n([f.id]))},a=()=>n([]),i=()=>{const g=e.nodes.value.map(h=>h.id),T=e.edges.value.map(h=>h.id);n([...g,...T])},u=({id:g},{focus:T})=>{T&&n([g])},p=g=>o.value.has(g);t("nodeColor",g=>{if(p(g.id))return e.getTheme("nodeFocusColor",g)}),t("nodeBorderColor",g=>{if(p(g.id))return e.getTheme("nodeFocusBorderColor",g)}),t("nodeTextColor",g=>{if(p(g.id))return e.getTheme("nodeFocusTextColor",g)}),t("edgeColor",g=>{if(p(g.id))return e.getTheme("edgeFocusColor",g)}),t("edgeTextColor",g=>{if(p(g.id))return e.getTheme("edgeFocusTextColor",g)}),t("nodeAnchorColor",g=>{if(p(g.id))return e.getTheme("nodeAnchorColorWhenParentFocused",g)});const c=()=>{e.subscribe("onNodeAdded",u),e.subscribe("onEdgeAdded",u),e.subscribe("onMouseDown",d),e.subscribe("onStructureChange",l)},_=()=>{e.unsubscribe("onNodeAdded",u),e.unsubscribe("onEdgeAdded",u),e.unsubscribe("onMouseDown",d),e.unsubscribe("onStructureChange",l),a()};return e.subscribe("onSettingsChange",g=>{g.focusable===!1?_():g.focusable===!0&&c()}),e.settings.value.focusable&&c(),{set:n,reset:a,add:s,all:i,isFocused:p,focusedItemIds:Ie(o),focusedNodes:D(()=>e.nodes.value.filter(g=>p(g.id))),focusedEdges:D(()=>e.edges.value.filter(g=>p(g.id)))}},dl={focus:!0},cl={focus:!0},pl=(e,t)=>{let o;return()=>{clearTimeout(o),o=setTimeout(e,t)}},Zt=100,Vt=3,fl=e=>{const t=L([]),o=L([]),n=h=>{t.value.push(h),t.value.length>Zt&&t.value.shift()},s=h=>{o.value.push(h),o.value.length>Zt&&o.value.shift()},r=L([]),l=L([]),a=pl(()=>{if(r.value.length===0&&l.value.length===0)return;const h=r.value.map(k=>({graphType:"node",data:k})),f=l.value.map(k=>({graphType:"edge",data:k}));n({action:"remove",affectedItems:[...h,...f]}),r.value=[],l.value=[]},250);e.subscribe("onNodeAdded",(h,{history:f})=>{f&&n({action:"add",affectedItems:[{graphType:"node",data:h}]})}),e.subscribe("onBulkNodeAdded",(h,{history:f})=>{f&&n({action:"add",affectedItems:h.map(k=>({graphType:"node",data:k}))})}),e.subscribe("onNodeRemoved",(h,f,{history:k})=>{if(!k)return;const A=f.map(y=>({graphType:"edge",data:y}));n({action:"remove",affectedItems:[{graphType:"node",data:h},...A]})}),e.subscribe("onBulkNodeRemoved",(h,f,{history:k})=>{k&&(r.value.push(...h),l.value.push(...f),a())}),e.subscribe("onEdgeLabelEdited",(h,f,{history:k})=>{k&&n({action:"edit",affectedItems:[{graphType:"edge",data:{id:h.id,from:f,to:h.label}}]})}),e.subscribe("onEdgeAdded",(h,{history:f})=>{f&&n({action:"add",affectedItems:[{graphType:"edge",data:h}]})}),e.subscribe("onBulkEdgeAdded",(h,{history:f})=>{f&&n({action:"add",affectedItems:h.map(k=>({graphType:"edge",data:k}))})}),e.subscribe("onEdgeRemoved",(h,{history:f})=>{f&&n({action:"remove",affectedItems:[{graphType:"edge",data:h}]})}),e.subscribe("onBulkEdgeRemoved",(h,{history:f})=>{f&&(l.value.push(...h),a())}),e.subscribe("onGraphLoaded",(h,{history:f})=>{if(!f)return;const k=h.nodes.map(y=>({graphType:"node",data:y})),A=h.edges.map(y=>({graphType:"edge",data:y}));n({action:"load",affectedItems:[...e.nodes.value.map(y=>({graphType:"node",data:y})),...e.edges.value.map(y=>({graphType:"edge",data:y}))],previousState:{nodes:k,edges:A}})});const i=L();e.subscribe("onGroupDragStart",(h,f)=>{i.value={startingCoordinates:f,nodes:h}}),e.subscribe("onGroupDrop",(h,f)=>{if(!i.value)throw new Error("dropped a group we didn't know was being dragged");if(i.value.nodes.length!==h.length)throw new Error("group size mismatch");const k=i.value.startingCoordinates.y-f.y,A=i.value.startingCoordinates.x-f.x;Math.sqrt(k**2+A**2)<Vt||n({action:"move",affectedItems:i.value.nodes.map(w=>({graphType:"node",data:{id:w.id,from:{x:w.x+A,y:w.y+k},to:{x:w.x,y:w.y}}}))})});const u=L();e.subscribe("onNodeDragStart",h=>{u.value={id:h.id,from:{x:h.x,y:h.y},to:{x:h.x,y:h.y}}}),e.subscribe("onNodeDrop",h=>{if(!u.value)throw new Error("dropped a node we didn't know was being dragged");if(u.value.id!==h.id)throw new Error("node ID mismatch");u.value.to={x:h.x,y:h.y};const f=u.value.from.y-u.value.to.y,k=u.value.from.x-u.value.to.x;Math.sqrt(f**2+k**2)<Vt||n({action:"move",affectedItems:[{graphType:"node",data:u.value}]})});const p=(h={})=>{const f=t.value.pop();if(f)return s(f),_(f),e.emit("onUndo",f,{...dl,...h}),f},c=(h={})=>{const f=o.value.pop();if(f)return n(f),g(f),e.emit("onRedo",f,{...cl,...h}),f},_=h=>{if(h.action==="load")e.load({nodes:h.previousState.nodes.map(f=>f.data),edges:h.previousState.edges.map(f=>f.data)},{history:!1});else if(h.action==="add")for(const f of h.affectedItems)f.graphType==="node"?e.removeNode(f.data.id,{history:!1}):f.graphType==="edge"&&e.removeEdge(f.data.id,{history:!1});else if(h.action==="remove")for(const f of h.affectedItems)f.graphType==="node"?e.addNode(f.data,{history:!1,focus:!1}):f.graphType==="edge"&&e.addEdge(f.data,{history:!1,focus:!1});else if(h.action==="move"){for(const f of h.affectedItems)if(f.graphType==="node"){const{from:k,id:A}=f.data;e.moveNode(A,{x:k.x,y:k.y})}}else if(h.action==="edit")for(const f of h.affectedItems)e.editEdgeLabel(f.data.id,f.data.from,{history:!1})},g=h=>{if(h.action==="load")e.load({nodes:h.affectedItems.filter(f=>f.graphType==="node").map(f=>f.data),edges:h.affectedItems.filter(f=>f.graphType==="edge").map(f=>f.data)},{history:!1});else if(h.action==="add")for(const f of h.affectedItems)f.graphType==="node"?e.addNode(f.data,{history:!1,focus:!1}):f.graphType==="edge"&&e.addEdge(f.data,{history:!1,focus:!1});else if(h.action==="remove")for(const f of h.affectedItems)f.graphType==="node"?e.removeNode(f.data.id,{history:!1}):f.graphType==="edge"&&e.removeEdge(f.data.id,{history:!1});else if(h.action==="move"){for(const f of h.affectedItems)if(f.graphType==="node"){const{to:k,id:A}=f.data;e.moveNode(A,{x:k.x,y:k.y})}}else if(h.action==="edit")for(const f of h.affectedItems)e.editEdgeLabel(f.data.id,f.data.to,{history:!1})},T=()=>{t.value=[],o.value=[]};return{undo:p,redo:c,canUndo:D(()=>t.value.length>0),canRedo:D(()=>o.value.length>0),undoStack:t,redoStack:o,addToUndoStack:n,addToRedoStack:s,clearHistory:T}},bl=e=>{const t=u=>!e.settings.value.persistentBlacklist.has(u.id),o=()=>e.settings.value.persistentStorageKey,n={get:()=>{const u=Ue.get(`nodes-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`nodes-${o()}`,p)}},s={get:()=>{const u=Ue.get(`edges-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`edges-${o()}`,p)}},r=async()=>{await new Promise(u=>setTimeout(u,10)),n.set(e.nodes.value),s.set(e.edges.value)},l=()=>e.load({nodes:n.get(),edges:s.get()},{history:!1}),d=["onStructureChange","onNodeDrop","onGroupDrop"],a=()=>{d.forEach(u=>e.subscribe(u,r))},i=()=>{d.forEach(u=>e.unsubscribe(u,r))};return e.subscribe("onSettingsChange",u=>{if(i(),"persistent"in u&&!u.persistent)return;if("persistent"in u&&u.persistent){l(),a();return}"persistentStorageKey"in u&&l(),a()}),e.settings.value.persistent&&(queueMicrotask(l),a()),{trackGraphState:r}},vl=e=>{let t=0;const o=({coords:d,items:a})=>{var c;if(!(Date.now()-t<350))return t=Date.now();t=0,((c=a.at(-1))==null?void 0:c.graphType)!=="node"&&e.addNode(d)},n=(d,a)=>{if(e.settings.value.userAddedEdgeRuleNoSelfLoops&&d.id===a.id)return!1;if(e.settings.value.userAddedEdgeRuleOneEdgePerPath){const i=e.edges.value.find(c=>c.from===d.id&&c.to===a.id),u=e.edges.value.find(c=>c.from===a.id&&c.to===d.id);if(i||u)return!1}return!0},s=d=>{const{items:a}=e.graphAtMousePosition.value,i=a.findLast(c=>c.graphType==="node");if(!i)return;const u=e.getNode(i.id);!u||!n(d,u)||e.addEdge({from:d.id,to:u.id,label:e.settings.value.userAddedEdgeLabel})},r=()=>{e.subscribe("onClick",o),e.subscribe("onNodeAnchorDrop",s),e.settings.value.nodeAnchors=!0,e.settings.value.edgeLabelsEditable=!0},l=()=>{e.unsubscribe("onClick",o),e.unsubscribe("onNodeAnchorDrop",s),e.settings.value.nodeAnchors=!1,e.settings.value.edgeLabelsEditable=!1};e.settings.value.interactive&&r(),e.settings.value.interactive||l(),e.subscribe("onSettingsChange",d=>{d.interactive===!0?r():d.interactive===!1&&l()})},gl=({adjacencyList:e,undirectedAdjacencyList:t})=>{const o=(l,d)=>{const a=new Set,i=[];for(i.push(d);i.length>0;){const u=i.shift();if(!u)break;a.add(u),l[u].forEach(c=>{a.has(c)||i.push(c)})}return a},n=l=>Object.keys(l).every(d=>o(l,d).size===Object.keys(l).length),s=D(()=>n(e.value)),r=D(()=>n(t.value));return{isConnected:s,isWeaklyConnected:r}};class ml{constructor(t){Ee(this,"V");Ee(this,"adj");Ee(this,"Time");Ee(this,"SCCs",[]);this.V=t,this.adj=new Array(t).fill(0).map(()=>[]),this.Time=0}addEdge(t,o){this.adj[t].push(o)}SCCUtil(t,o,n,s,r){n[t]=this.Time,o[t]=this.Time,this.Time+=1,s[t]=!0,r.push(t);for(const l of this.adj[t])n[l]===-1?(this.SCCUtil(l,o,n,s,r),o[t]=Math.min(o[t],o[l])):s[l]&&(o[t]=Math.min(o[t],n[l]));if(o[t]===n[t]){let l;const d=[];do l=r.pop(),d.push(l),s[l]=!1;while(l!==t);this.SCCs.push(d)}}SCC(){const t=new Array(this.V).fill(-1),o=new Array(this.V).fill(-1),n=new Array(this.V).fill(!1),s=[];for(let r=0;r<this.V;r++)t[r]===-1&&this.SCCUtil(r,o,t,n,s);return this.SCCs}}const hl=(e,t)=>{const o=new ml(e.length),n=e.map(r=>r.id);for(const r of t)o.addEdge(n.indexOf(r.from),n.indexOf(r.to));return o.SCC().map(r=>r.map(l=>e[l]))},yl=e=>{const{nodes:t,edges:o,adjacencyList:n}=e,s=D(()=>hl(t.value,o.value)),r=D(()=>s.value.reduce((a,i,u)=>{for(const{id:p}of i)a.set(p,u);return a},new Map)),l=D(()=>{const d=s.value,a=n.value,i=r.value;return d.reduce((u,p,c)=>{const _=p.flatMap(g=>a[g.id]??[]).filter(g=>i.get(g)!==c).map(g=>i.get(g));return u.set(c,new Set(_)),u},new Map)});return{stronglyConnectedComponents:s,nodeIdToConnectedComponent:r,componentAdjacencyMap:l}},_l=e=>{const t={},o=[[],[]],n={...e};Object.keys(e).forEach(l=>{n[l]||(n[l]=[])});const s={};Object.entries(n).forEach(([l,d])=>{d.forEach(a=>{s[a]||(s[a]=[]),s[a].push(l)})});const r=l=>{const d=[l];for(t[l]=0,o[0].push(l);d.length>0;){const a=d.shift(),i=t[a],u=i===0?1:0,p=n[a]||[],c=s[a]||[],_=[...new Set([...p,...c])];for(const g of _)if(t[g]===void 0)t[g]=u,o[u].push(g),d.push(g);else if(t[g]===i)return!1}return!0};for(const l of Object.keys(n))if(t[l]===void 0&&!r(l))return;return o},Cl=e=>{const t=D(()=>_l(e.value)),o=D(()=>{const s=t.value,r=new Map;if(!s)return r;const[l,d]=s;for(const a of l)r.set(a,0);for(const a of d)r.set(a,1);return r}),n=D(()=>t.value!==void 0);return{bipartitePartition:t,nodeIdToBipartitePartition:o,isBipartite:n}},wl=e=>{const t=new Set,o=[],n=[],s=new Set,r=(d,a)=>{t.add(d),n.push(d),s.add(d);for(const i of e[d]||[])if(!t.has(i))r(i,d);else if(i!==a&&s.has(i)){const u=n.indexOf(i),c=[...n.slice(u)].sort();o.some(_=>l(_,c))||o.push(c)}n.pop(),s.delete(d)},l=(d,a)=>d.length!==a.length?!1:d.every(i=>a.includes(i));for(const d in e)t.has(d)||r(d,null);return o},xl=e=>{const{settings:t,stronglyConnectedComponents:o,adjacencyList:n}=e,s=D(()=>{const{isGraphDirected:d}=t.value;return d?o.value.filter(a=>a.length>1).map(a=>a.map(i=>i.id)):wl(n.value).sort((i,u)=>i.length-u.length)}),r=D(()=>s.value.reduce((d,a,i)=>{for(const u of a)d.set(u,i);return d},new Map)),l=D(()=>s.value.length===0);return{cycles:s,nodeIdToCycle:r,isAcyclic:l}},Sl=e=>{const t=D(()=>{const n=e.edges.value;return n.filter(s=>s.from!==s.to).filter(s=>n.some(r=>s.from===r.to&&s.to===r.from))}),o=D(()=>t.value.length>0);return{bidirectionalEdges:t,hasBidirectionalEdges:o}},kl=e=>({isComplete:D(()=>{const o=e.settings.value.isGraphDirected,n=e.nodes.value.length;return e.edges.value.length===(o?n*(n-1):n*(n-1)/2)})}),El=e=>{const t=gl(e),o=Sl(e),n=yl(e),s=Cl(e.adjacencyList),r=xl({...e,...n});return{...kl(e),...r,...n,...o,...s,...t}},ot="auto",Tl=e=>{const t=qn(),o=Yn(Zn.preferredTheme,ot);return be(t,()=>{o.value==="auto"&&(e.themeName.value=t.value?"dark":"light")},{immediate:!0}),be(o,()=>{[...hi,"auto"].includes(o.value)||(console.warn("unrecognized preferred-theme in localStorage: falling back to",ot),o.value=ot),o.value==="auto"?e.themeName.value=t.value?"dark":"light":e.themeName.value=o.value},{immediate:!0}),{preferredTheme:o}},Al=e=>({getParentsOfNode:t=>ar(t,e),getAncestorsOfNode:t=>sr(t,e),getChildrenOfNode:t=>rr(t,e),getDescendantsOfNode:t=>nr(t,e),getConnectedNodes:t=>rt(t,e),getConnectedEdges:t=>co(t,e),getInboundEdges:t=>or(t,e),getOutboundEdges:t=>tr(t,e),isEdgeFlowingIntoNode:(t,o)=>er(t,o,e),isEdgeFlowingOutOfNode:(t,o)=>Qn(t,o,e),getEdgesAlongPath:(t,o)=>uo(t,o,e),getEdgeWeight:t=>Jn(t,e),getEdgeWeightFraction:t=>Xn(t,e),getWeightBetweenNodes:(t,o)=>Vn(t,o,e)}),Xt=(e,t)=>{const o=Object.keys(e).length,n=Array.from({length:o},()=>Array(o).fill(0));for(const[s,r]of Object.entries(e)){const l=t.get(s);for(const d of r){const a=t.get(d.id);n[l][a]=d.weight}}return n},Ll=e=>{const{weightedAdjacencyList:t,weightedFracAdjacencyList:o}=e.adjacencyList,n=D(()=>Xt(t.value,e.nodeIdToIndex.value)),s=D(()=>Xt(o.value,e.nodeIdToIndex.value));return{transitionMatrix:n,fracTransitionMatrix:s}},Dl=(e,t={})=>{const o=Qi(e,t),n=ul(o),s=fl(o),r=tl({...o,focus:n}),l=nl({...o,focus:n}),d=ol({...o,nodeAnchors:l}),a=al(o),i=bl(o),u=Tl(o),p=Gr({...o,history:s,focus:n,annotation:a}),c=ir(o),_=Ll({...o,adjacencyList:c}),g=El({...o,...c});vl(o);const T=Al(o);return{...o,focus:n,history:s,marquee:r,nodeDrag:d,nodeAnchors:l,annotation:a,persistent:i,...u,adjacencyList:c,transitionMatrix:_,characteristics:g,shortcut:p,helpers:T}},Bl=e=>{const{subscribe:t,getTheme:o}=e,n=L(o("graphBgPatternColor")),s=L(o("graphBgColor"));return t("onThemeChange",async()=>{n.value=o("graphBgPatternColor"),s.value=o("graphBgColor")}),{patternColor:Ie(n),bgColor:Ie(s)}},Ul=(e={})=>{const t=br({storageKey:e.persistentStorageKey}),o=Dl(t,e),{bgColor:n,patternColor:s}=Bl(o);t.draw.content.value=o.draw,t.draw.backgroundPattern.value=(l,d,a)=>cr({at:d,size:12,lineWidth:1,fillColor:s.value+a}).draw(l);const r=D(()=>({style:{backgroundColor:n.value}}));return{canvas:t,graph:o,css:r}};export{Rl as D,Ki as L,Fl as _,Vi as a,we as b,ee as c,qs as d,ns as e,zl as f,Wi as g,Hs as h,Ll as i,mt as j,_r as k,pl as l,gt as m,de as n,It as o,$l as p,Le as q,Hl as r,Ul as u};
