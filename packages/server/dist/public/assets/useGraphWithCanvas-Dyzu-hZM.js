var en=Object.defineProperty;var tn=(e,t,o)=>t in e?en(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var Ee=(e,t,o)=>tn(e,typeof t!="symbol"?t+"":t,o);import{am as xe,aa as Jt,_ as on,i as nn,j as rn,k as sn,l as an,n as ln,p as un,q as dn,s as cn,v as pn,x as fn,C as re,an as bn,ao as We,ab as vn,ap as Qt,aq as eo,d as F,a1 as ie,I as L,z as R,w as I,o as w,O as H,e as A,ar as gn,c as $,a as M,K as ee,al as Y,u as O,as as mn,h as D,ai as xt,at as it,J as Z,F as se,g as de,t as q,y as k,au as hn,ah as Le,b as ae,av as yn,$ as ge,E as _e,Z as _n,m as j,a7 as ze,aw as wn,ax as Cn,ay as ve,az as Te,aA as xn,aB as St,a5 as to,aC as Sn,a6 as qe,aD as oo,aE as lt,a4 as Ye,aF as no,aG as kn,aH as En,aI as Tn,aJ as An,aK as kt,aL as ut,aM as ro,aN as he,aO as so,r as Be,ac as dt,aP as ao,ae as Ze,aQ as io,aR as Dn,aS as Ln,aT as ct,aU as lo,a8 as Ae,aV as nt,aW as Bn,aX as In,aY as Mn,aZ as Nn,a_ as Pn,a$ as On,b0 as $n,ak as Rn,A as zn,B as Fn,b1 as Hn,b2 as rt,b3 as uo,b4 as Un,b5 as Gn,b6 as co,b7 as po,b8 as Kn,b9 as fo,ba as jn,bb as Ie,f as Et,D as Wn,bc as Ue,bd as qn,be as Yn,bf as Zn,bg as Vn,bh as Xn,bi as Jn,bj as Qn,bk as er,bl as tr,bm as or,bn as nr,bo as rr,bp as sr,bq as ar,a0 as ir}from"./index-EG8pfFaR.js";import{g as Me,_ as bo,a as lr,d as ur,u as dr,b as cr,c as pr}from"./Button.vue_vue_type_script_setup_true_lang-DDmZaL4I.js";import{_ as ne}from"./Icon.vue_vue_type_script_setup_true_lang-5zBpnLcm.js";import{t as fr,M as Tt,a as At,_ as br,b as we,u as vr}from"./index-DGfQ7BLa.js";const vo=e=>({nodes:e.nodes.value,edges:e.edges.value,annotations:e.annotation.annotations.value,cameraPanX:e.magicCanvas.camera.state.panX.value,cameraPanY:e.magicCanvas.camera.state.panY.value,cameraZoom:e.magicCanvas.camera.state.zoom.value}),go=(e,t)=>{e.load({nodes:t.nodes,edges:t.edges}),e.annotation.load(t.annotations);const{state:o}=e.magicCanvas.camera;o.panX.value=t.cameraPanX,o.panY.value=t.cameraPanY,o.zoom.value=t.cameraZoom},pe=10,mo="1",ho="",je="",me="",gr=e=>{const{nodes:t,edges:o,cameraPanX:n,cameraPanY:r,cameraZoom:s}=e,l=t.reduce((p,c)=>{const y=Math.round(c.x/pe),v=Math.round(c.y/pe);return p+`${je}${c.label}${me}${y}${me}${v}`},"").slice(1),d=o.reduce((p,c)=>{const y=t.findIndex(g=>g.id===c.from),v=t.findIndex(g=>g.id===c.to),T=c.label===mo?"":`${me}${c.label}`;return p+`${je}${y}${me}${v}`+T},"").slice(1),a=Math.round(n/pe),i=Math.round(r/pe),u=s.toFixed(2);return[l,d,a,i,u].join(ho)},mr=e=>{const[t,o,n,r,s]=e.split(ho),l=t?t.split(je).map(a=>{const[i,u,p]=a.split(me);return{id:Me(),label:i,x:Number(u)*pe,y:Number(p)*pe}}):[],d=o?o.split(je).map(a=>{const[i,u,p]=a.split(me);return{id:Me(),label:p??mo,from:l[Number(i)].id,to:l[Number(u)].id}}):[];return{nodes:l,edges:d,cameraPanX:Number(n)*pe,cameraPanY:Number(r)*pe,cameraZoom:Number(s),annotations:[]}},hr=Object.assign({"/src/menu/info.ts":fn,"/src/playground/shape/info.ts":pn,"/src/products/basic-search/info.ts":cn,"/src/products/binary-trees/info.ts":dn,"/src/products/dijkstras/info.ts":un,"/src/products/markov-chains-legacy/info.ts":ln,"/src/products/markov-chains/info.ts":an,"/src/products/min-spanning-tree/info.ts":sn,"/src/products/network-flow/info.ts":rn,"/src/products/sandbox/info.ts":nn,"/src/products/set-visualizer/info.ts":on}),Fe=Object.values(hr).flatMap(e=>e.default);Fe.map(e=>e.route);const $l=Fe.reduce((e,t)=>(e[t.productId]=t,e),{}),pt=Fe.reduce((e,t)=>(e[t.route.path]=t,e),{}),yr=e=>Fe.map(n=>n.simulations).filter(Boolean).map(n=>n(e)).flat(),_r=(e,t)=>{const o=xe();if(!t){const r=pt[o.path];if(!r)throw new Error(`product not found for ${o.path}`);t=r.simulations}return(t??yr)(e)},wr=()=>{const e=xe(),t=Jt(),o=s=>{const l=e.query.rid;return typeof l=="string"&&l.length>0?`${s}?rid=${l}`:s},n=async s=>{var a,i;const l=(i=(a=s.route)==null?void 0:a.redirect)==null?void 0:i.toString(),d=l==null?void 0:l.startsWith("http");if(l&&d)return window.open(l,"_blank");await t.push(o(s.route.path))};return{navigate:n,navigateWithGraph:async s=>{const l=vo(re.value);await n(s),await new Promise(d=>setTimeout(d,0)),go(re.value,l)},productLink:o}},Dt=["sandbox","algorithms","data structures","math","developer tools"],Cr=()=>{const e=xe();return pt[e.path]},xr=e=>"redirect"in e.route;var yo=["ctrl","alt","meta","shift"],_o="__0_1_2_3_4_5_6_7_8_9_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z_ _`_'_\"_~_!_@_#_$_%_^_&_*_(_)_._-_+_=_[_]_{_}_<_>_,_/_?_;_:_\\_|_capslock_numlock_enter_tab_arrowdown_arrowleft_arrowright_arrowup_end_home_pagedown_pageup_backspace_delete_insert_escape_f1_f2_f3_f4_f5_f6_f7_f8_f9_f10_f11_f12_f13_f14_f15_f16_f17_f18_f19_f20_f21_f22_f23".split("_");_o[1]="_";var ft={};for(let[e,t]of _o.entries())ft[t]=e;var Sr={space:" ",plus:"+",up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright",esc:"escape"},bt=4,kr=9,vt=kr+bt,Er=2**bt,wo=2**vt,Tr=2**(2*vt),Ar=2**(3*vt);function Dr(e){let t;return e==="+"?["+"]:(e.slice(-1)=="+"?(t=e.slice(0,-2).split("+"),t.push("+")):t=e.split("+"),t.map(o=>Sr[o]||o))}function Lr(e){let t=new Set(e),o=ft[e[e.length-1].toLowerCase()]||0;for(let n of yo)o=2*o+(t.has(n)?1:0);return o}function Lt(e){return e>>bt}function et(e){return e%Er}function Br(e,t){if(e===void 0||Lt(e)>0)return!1;let o=et(e),n=et(t);return o===n&&Lt(t)===0?!1:(o&et(t))===o}function Ir(e){let t=ft[e.key.toLowerCase()]||0;for(let o of yo)t=2*t+(e[`${o}Key`]?1:0);return t}function Ve(e){return e.map(Dr)}function Xe(e){if(e.length>4)throw"Can't encode sequence of more than 4 keys!";let t=0;for(let o of e)t=t*wo+Lr(o);return t}function Mr(e){return e<wo?1:e<Tr?2:e<Ar?3:4}function Nr(e){let t=[],o=0,n=0;for(let r=e.length-1;r>=0;r--)o=2**n*e[r]+o,n=n+13,t.push(o);return t}function Pr(e={}){return{history:[],historySize:0,bindings:new Map,disabledSequenceCodes:new Set,...e}}function Or(e,t,o){let n=Xe(Ve(t));return e.bindings.has(n)||e.bindings.set(n,new Set),e.bindings.get(n).add(o),Co(e)}function $r(e,t,o){let n=Xe(Ve(t)),r=e.bindings.get(n);return r&&(r.delete(o),r.size==0&&e.bindings.delete(n)),Co(e)}function Rr(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.delete(o),e}function zr(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.add(o),e}function Fr(e,t){let o=Ir(t),n=e.history.at(-1);return Br(n,o)&&e.history.pop(),e.history.push(o),e.history.length>e.historySize&&e.history.shift(),e}function Hr(e){let t=[];for(let o of Nr(e.history))e.disabledSequenceCodes.has(o)||t.push(...e.bindings.get(o)||[]);return t}function Ur(e,t){e=Fr(e,t);let o=Hr(e);for(let n of o)n(t);return[e,o]}function Co(e){e.historySize=0;for(let t of e.bindings.keys())e.historySize=Math.max(e.historySize,Mr(t));return e}var Gr=class{constructor(e){this.state=e,this.add=this.add.bind(this),this.remove=this.remove.bind(this),this.handle=this.handle.bind(this)}add(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=Or(this.state,t,o),this}remove(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=$r(this.state,t,o),this}enable(...e){return this.state=Rr(this.state,e),this}disable(...e){return this.state=zr(this.state,e),this}handle(e){let[t,o]=Ur(this.state,e);return this.state=t,o.length>0}};function xo(){return new Gr(Pr())}var So=xo;const st=window.navigator.userAgent.includes("Mac")?"Mac":"Windows",Kr=e=>{const{settings:t}=e,o=So(),n=()=>{if(e.annotation.isActive.value&&e.annotation.undo(),t.value.interactive){const C=e.history.undo();if(!C)return;e.focus.set(C.affectedItems.map(f=>f.data.id))}},r=()=>{if(e.annotation.isActive.value){e.annotation.redo();return}if(t.value.interactive){const C=e.history.redo();if(!C)return;e.focus.set(C.affectedItems.map(f=>f.data.id))}},s=()=>e.focus.reset(),l=()=>e.focus.all(),d=()=>{t.value.interactive!==!1&&(e.bulkRemoveNode([...e.focus.focusedItemIds.value]),e.bulkRemoveEdge([...e.focus.focusedItemIds.value]))},a=(C,f)=>f===!1?()=>{}:typeof f=="function"?f:C,i={fn:()=>console.warn("not implemented")},u={fn:()=>console.warn("not implemented")},p={fn:()=>console.warn("not implemented")},c={fn:()=>console.warn("not implemented")},y={fn:()=>console.warn("not implemented")},v={fn:()=>console.warn("not implemented")},T={fn:()=>console.warn("not implemented")},g=()=>{i.fn=a(r,t.value.shortcutRedo),u.fn=a(n,t.value.shortcutUndo),p.fn=a(s,t.value.shortcutEscape),c.fn=a(l,t.value.shortcutSelectAll),y.fn=a(d,e.settings.value.shortcutDelete),v.fn=a(e.magicCanvas.camera.actions.zoomIn,t.value.shortcutZoomIn),T.fn=a(e.magicCanvas.camera.actions.zoomOut,t.value.shortcutZoomOut)},b={Mac:{Undo:{binding:"meta+z",trigger:()=>u.fn()},Redo:{binding:"meta+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>y.fn()},"Select All":{binding:"meta+a",trigger:()=>c.fn()},Deselect:{binding:"esc",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>v.fn()},"Zoom Out":{binding:"-",trigger:()=>T.fn()}},Windows:{Undo:{binding:"ctrl+z",trigger:()=>u.fn()},Redo:{binding:"ctrl+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>y.fn()},"Select All":{binding:"ctrl+a",trigger:()=>c.fn()},Deselect:{binding:"escape",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>v.fn()},"Zoom Out":{binding:"-",trigger:()=>T.fn()}}},S=Object.values(b[st]);for(const C of S){const f=C.binding;o.add(f,_=>{_==null||_.preventDefault(),C.trigger()})}const x=()=>{e.subscribe("onKeyDown",o.handle),e.subscribe("onSettingsChange",g)},h=()=>{e.unsubscribe("onKeyDown",o.handle),e.unsubscribe("onSettingsChange",g)};return t.value.shortcuts&&x(),e.subscribe("onSettingsChange",C=>{C.shortcuts===!0?x():C.shortcuts===!1&&h()}),{activeShortcuts:b[st],trigger:{delete:y,selectAll:c,escape:p,redo:i,undo:u}}};var ko={exports:{}};(function(e){var t=function(){var o=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function l(a,i){if(!s[a]){s[a]={};for(var u=0;u<a.length;u++)s[a][a.charAt(u)]=u}return s[a][i]}var d={compressToBase64:function(a){if(a==null)return"";var i=d._compress(a,6,function(u){return n.charAt(u)});switch(i.length%4){default:case 0:return i;case 1:return i+"===";case 2:return i+"==";case 3:return i+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:d._decompress(a.length,32,function(i){return l(n,a.charAt(i))})},compressToUTF16:function(a){return a==null?"":d._compress(a,15,function(i){return o(i+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:d._decompress(a.length,16384,function(i){return a.charCodeAt(i)-32})},compressToUint8Array:function(a){for(var i=d.compress(a),u=new Uint8Array(i.length*2),p=0,c=i.length;p<c;p++){var y=i.charCodeAt(p);u[p*2]=y>>>8,u[p*2+1]=y%256}return u},decompressFromUint8Array:function(a){if(a==null)return d.decompress(a);for(var i=new Array(a.length/2),u=0,p=i.length;u<p;u++)i[u]=a[u*2]*256+a[u*2+1];var c=[];return i.forEach(function(y){c.push(o(y))}),d.decompress(c.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":d._compress(a,6,function(i){return r.charAt(i)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),d._decompress(a.length,32,function(i){return l(r,a.charAt(i))}))},compress:function(a){return d._compress(a,16,function(i){return o(i)})},_compress:function(a,i,u){if(a==null)return"";var p,c,y={},v={},T="",g="",b="",S=2,x=3,h=2,C=[],f=0,_=0,m;for(m=0;m<a.length;m+=1)if(T=a.charAt(m),Object.prototype.hasOwnProperty.call(y,T)||(y[T]=x++,v[T]=!0),g=b+T,Object.prototype.hasOwnProperty.call(y,g))b=g;else{if(Object.prototype.hasOwnProperty.call(v,b)){if(b.charCodeAt(0)<256){for(p=0;p<h;p++)f=f<<1,_==i-1?(_=0,C.push(u(f)),f=0):_++;for(c=b.charCodeAt(0),p=0;p<8;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1}else{for(c=1,p=0;p<h;p++)f=f<<1|c,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=0;for(c=b.charCodeAt(0),p=0;p<16;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1}S--,S==0&&(S=Math.pow(2,h),h++),delete v[b]}else for(c=y[b],p=0;p<h;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1;S--,S==0&&(S=Math.pow(2,h),h++),y[g]=x++,b=String(T)}if(b!==""){if(Object.prototype.hasOwnProperty.call(v,b)){if(b.charCodeAt(0)<256){for(p=0;p<h;p++)f=f<<1,_==i-1?(_=0,C.push(u(f)),f=0):_++;for(c=b.charCodeAt(0),p=0;p<8;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1}else{for(c=1,p=0;p<h;p++)f=f<<1|c,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=0;for(c=b.charCodeAt(0),p=0;p<16;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1}S--,S==0&&(S=Math.pow(2,h),h++),delete v[b]}else for(c=y[b],p=0;p<h;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1;S--,S==0&&(S=Math.pow(2,h),h++)}for(c=2,p=0;p<h;p++)f=f<<1|c&1,_==i-1?(_=0,C.push(u(f)),f=0):_++,c=c>>1;for(;;)if(f=f<<1,_==i-1){C.push(u(f));break}else _++;return C.join("")},decompress:function(a){return a==null?"":a==""?null:d._decompress(a.length,32768,function(i){return a.charCodeAt(i)})},_decompress:function(a,i,u){var p=[],c=4,y=4,v=3,T="",g=[],b,S,x,h,C,f,_,m={val:u(0),position:i,index:1};for(b=0;b<3;b+=1)p[b]=b;for(x=0,C=Math.pow(2,2),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;switch(x){case 0:for(x=0,C=Math.pow(2,8),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;_=o(x);break;case 1:for(x=0,C=Math.pow(2,16),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;_=o(x);break;case 2:return""}for(p[3]=_,S=_,g.push(_);;){if(m.index>a)return"";for(x=0,C=Math.pow(2,v),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;switch(_=x){case 0:for(x=0,C=Math.pow(2,8),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;p[y++]=o(x),_=y-1,c--;break;case 1:for(x=0,C=Math.pow(2,16),f=1;f!=C;)h=m.val&m.position,m.position>>=1,m.position==0&&(m.position=i,m.val=u(m.index++)),x|=(h>0?1:0)*f,f<<=1;p[y++]=o(x),_=y-1,c--;break;case 2:return g.join("")}if(c==0&&(c=Math.pow(2,v),v++),p[_])T=p[_];else if(_===y)T=S+S.charAt(0);else return null;g.push(T),p[y++]=S+T.charAt(0),c--,S=T,c==0&&(c=Math.pow(2,v),v++)}}};return d}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(ko);var Eo=ko.exports;const To="g",jr=e=>{const t=pt[e];if(!t)throw new Error(`no product found for route ${e}`);return t},Wr=(e,t)=>{const o=Jt(),n=xe(),r=eo(),s=()=>{const d=st==="Mac"?"⌘+Z":"Ctrl+Z";r.add({summary:`Loaded graph from link successfully. Press ${d} to undo.`,severity:"success",life:5e3})},l=()=>r.add({summary:"Failed to load graph from link 😕",severity:"error",life:5e3});if(o.replace({path:n.path,query:{}}),typeof t!="string"){console.error("graph share failed - serialized transit data not a string"),l();return}try{const d=Eo.decompressFromEncodedURIComponent(t),a=mr(d);setTimeout(()=>go(e,a),0),s()}catch{console.error("graph share failed - could not parse graph transit data"),l()}},qr=(e,t)=>{const o=xe();t||(t=jr(o.path));const{connectToRoom:n}=vn,r=o.query.rid,{productId:s,name:l}=t;document.title=`${l} - Magic Graphs`,bn.value=e;const d=o.query[To];return d&&Wr(e,d),We(()=>{if(r){if(typeof r!="string")return console.error("room id must be a string");n({graph:e,roomId:r,productId:s})}}),Qt(()=>{var a;(a=t.state)==null||a.reset()}),t},te=F({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const t=ie(),o=e,n=L(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:o.contrast?t.value.contrast:t.value.primary);return(r,s)=>(w(),R(bo,{color:n.value},{default:I(()=>[H(r.$slots,"default")]),_:3},8,["color"]))}}),Ge=F({__name:"PlaybackButton",props:{icon:{}},setup(e){return(t,o)=>(w(),R(te,{style:{"border-radius":"40px"}},{default:I(()=>[A(ne,{class:"py-1 px-6 text-5xl",icon:t.icon},null,8,["icon"])]),_:1}))}}),Yr={transitionTimeMs:250,transitionEasing:"ease-in-out"},Zr=F({__name:"Progressbar",props:gn({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},Yr),setup(e){const t=ie(),o=e,n=L(()=>{const[a,i]=o.range;return i-a}),r=a=>{if(n.value===0)return 100;const[i]=o.range;return Math.min(Math.max(a-i,0),n.value)/n.value*100},s=a=>{const i=a.currentTarget;if(!(i instanceof HTMLElement))throw new Error("Invalid target");const u=a.offsetX,p=i.offsetWidth,c=u/p,y=o.range[0]+c*n.value;return Math.round(y)},l=a=>{var u;const i=s(a);(u=o.onProgressSet)==null||u.call(o,i)},d=a=>{var u;const i=s(a);(u=o.onHover)==null||u.call(o,i)};return(a,i)=>(w(),$("div",{onMousemove:d,onClick:l,class:"relative overflow-hidden h-4 w-full z-1 cursor-pointer"},[M("div",{class:Y("absolute top-0 left-0 h-full z-0"),style:ee({backgroundColor:o.color??O(t).tertiary,width:`${r(a.progress)}%`,transition:`width ${o.transitionTimeMs}ms ${o.transitionEasing}`})},null,4),M("div",{class:Y("absolute top-0 left-0 h-full z-10"),style:ee({backgroundColor:O(t).primary+"90",width:`${r(a.previewProgress??o.range[0])}%`})},null,4)],32))}}),Vr={class:"w-12"},Xr={class:"w-12"},Jr=F({__name:"GSpreadSelect",props:mn({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const t=D(),o=e,n=xt(e,"modelValue");if(n.value=o.items[o.initialItemIndex].value,n.value===void 0)throw new Error("invalid initialItemIndex");const r=L(()=>{var i;return(i=o.items.find(u=>u.value===n.value))==null?void 0:i.label}),s=xt(e,"open"),l=()=>s.value=!s.value;it(t,()=>s.value=!1);const d=i=>{n.value=i.value,s.value=!1},a=i=>i.value===n.value;return(i,u)=>(w(),$("div",null,[s.value?(w(),$("div",{key:0,ref_key:"target",ref:t,class:"flex gap-2 justify-center"},[(w(!0),$(se,null,de(i.items,p=>(w(),R(te,{key:p.label,onClick:c=>d(p),class:Y(["rounded-full",a(p)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:I(()=>[M("span",Vr,q(p.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):r.value?(w(),R(te,{key:1,onClick:l,class:"rounded-full"},{default:I(()=>[M("span",Xr,q(r.value),1)]),_:1})):Z("",!0)]))}}),ye={Fullscreen:{binding:"f"},Help:{binding:"h"},"Pause/Play Simulation":{binding:"space"},"Simulation Step Forward":{binding:"arrowright"},"Simulation Step Backward":{binding:"arrowleft"}},Qr=F({__name:"GText",setup(e){const t={light:k.GRAY_900,dark:k.GRAY_100,pink:k.PINK_800},o=L(()=>t[re.value.themeName.value]),n=L(()=>({color:o.value}));return(r,s)=>(w(),$("div",{style:ee(n.value)},[H(r.$slots,"default")],4))}}),es={class:"relative flex flex-col gap-5 items-center justify-center"},ts={class:"flex w-full justify-center gap-2"},os={class:"px-2"},ns={class:"flex gap-4 fill-white dark:fill-black"},rs=F({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const t=ie(),o=e,{isOver:n,paused:r,step:s,hasBegun:l,lastStep:d,playbackSpeed:a,explanationAtStep:i}=hn(o.controls),{nextStep:u,prevStep:p,setStep:c,start:y,stop:v,showPlaybackSpeedControls:T,pauseOnStructureChange:g,defaultPlaybackSpeedMs:b}=o.controls,S=()=>{p(),r.value=!0},x=()=>{u(),r.value=!0},h=K=>{c(K),r.value=!0},C=()=>{r.value=!r.value},f=()=>{v(),y()},_=D(-1),m=K=>{_.value=K},B=()=>{_.value=-1},E=()=>{r.value=!0};g&&re.value.subscribe("onStructureChange",E),Le(()=>{re.value.unsubscribe("onStructureChange",E)});const U=[{label:"0.25x",value:b/.25},{label:"0.5x",value:b/.5},{label:"1x",value:b},{label:"2x",value:b/2},{label:"4x",value:b/4}],P=D(!1),z=U.findIndex(K=>K.value===a.value)??2,G=So();return G.add(ye["Pause/Play Simulation"].binding,()=>{n.value?f():C()}),G.add(ye["Simulation Step Backward"].binding,S),G.add(ye["Simulation Step Forward"].binding,x),window.addEventListener("keyup",G.handle),Le(()=>window.removeEventListener("keyup",G.handle)),(K,V)=>(w(),$("div",es,[O(i)?(w(),R(Qr,{key:0,class:"absolute font-bold text-xl w-[800px] text-center -top-12 pointer-events-none"},{default:I(()=>[ae(q(O(i)),1)]),_:1})):Z("",!0),M("div",ts,[O(T)?(w(),R(Jr,{key:0,modelValue:O(a),"onUpdate:modelValue":V[0]||(V[0]=X=>yn(a)?a.value=X:null),open:P.value,"onUpdate:open":V[1]||(V[1]=X=>P.value=X),items:U,"initial-item-index":O(z)},null,8,["modelValue","open","initial-item-index"])):Z("",!0),P.value?Z("",!0):(w(),R(te,{key:1,class:"rounded-full"},{default:I(()=>[M("span",os," Step "+q(O(s)+1),1)]),_:1}))]),O(d)!==1/0?(w(),R(Zr,{key:1,onMouseleave:B,range:[0,O(d)],progress:O(s),"on-progress-set":h,"preview-progress":_.value,"on-hover":m,style:ee({borderColor:O(t).tertiary}),class:"w-full border-2 rounded-lg"},null,8,["range","progress","preview-progress","style"])):Z("",!0),M("div",ns,[A(Ge,{onClick:S,disabled:!O(l),icon:"chevron-left"},null,8,["disabled"]),O(n)?(w(),R(Ge,{key:0,onClick:f,disabled:O(d)===0,icon:"restart"},null,8,["disabled"])):(w(),R(Ge,{key:1,onClick:C,icon:O(r)?"play":"pause"},null,8,["icon"])),A(Ge,{onClick:x,disabled:O(n),icon:"chevron-right"},null,8,["disabled"])])]))}}),Ao=[k.RED_600,k.BLUE_600,k.GREEN_600,k.YELLOW_600],Do=[3,6,9,12],Rl="element-highlight",zl=1e3,ss=1e3,as={class:"text-3xl font-bold"},Bt=300,is=F({__name:"TutorialHint",props:{tutorial:{}},setup(e){const t=D(0),o=L(()=>{var s;return((s=e.tutorial.sequence.value[e.tutorial.step.value])==null?void 0:s.hint)??""}),n=D("");let r;return ge(o,()=>{t.value=0,clearTimeout(r),r=setTimeout(()=>{n.value=o.value,t.value=1},Bt+ss)},{immediate:!0}),(s,l)=>(w(),$("div",{class:Y(["transition-opacity",`duration-[${Bt}ms]`,"select-none","text-center"]),style:ee({opacity:t.value})},[H(s.$slots,"default",{hint:n.value},()=>[M("h1",as,q(n.value),1)])],6))}}),Lo=F({__name:"ToolbarHint",props:{color:{default:k.WHITE+"75"},tutorial:{}},setup(e){return(t,o)=>(w(),R(is,{tutorial:t.tutorial},{default:I(({hint:n})=>[M("h5",{style:ee({color:t.color}),class:"text-sm"},q(n),5)]),_:1},8,["tutorial"]))}}),ls={class:"flex flex-col gap-2"},us=F({__name:"ToolbarBase",props:{color:{default:k.GRAY_800},hint:{default:void 0}},setup(e){return(t,o)=>(w(),$("div",ls,[M("div",{style:ee({backgroundColor:t.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[H(t.$slots,"default")],4),H(t.$slots,"hint",{},()=>[t.hint?(w(),R(Lo,{key:0,tutorial:t.hint},null,8,["tutorial"])):Z("",!0)])]))}}),ds=F({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const t=ie();return(o,n)=>(w(),R(Lo,{tutorial:o.tutorial,color:O(t).text+"75"},null,8,["tutorial","color"]))}}),cs={class:"absolute w-full translate-y-14 pointer-events-none"},gt=F({__name:"GToolbarBase",props:{hint:{}},setup(e){const t=ie();return(o,n)=>(w(),R(us,{hint:o.hint,color:O(t).primary},{hint:I(()=>[M("div",cs,[o.hint?(w(),R(ds,{key:0,tutorial:o.hint},null,8,["tutorial"])):Z("",!0)])]),default:I(()=>[H(o.$slots,"default")]),_:3},8,["hint","color"]))}}),ps=e=>L(()=>{const t=_e(e.value);if(!t.isValid())throw new Error("invalid color");return t}),fs=["disabled"],bs=F({__name:"ToolbarButton",props:{color:{default:k.GRAY_800},active:{type:Boolean,default:!1},activeColor:{default:k.GRAY_900},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const t=e,o=_n(t,"color"),n=ps(o),r=L(()=>n.value.darken(5).toHexString()),s=L(()=>t.activeColor?t.activeColor:n.value.darken(10).toHexString()),l=L(()=>{if(!t.disabled)return t.active?s.value:u.value?r.value:t.color}),d=L(()=>{const p=n.value.isDark()?k.WHITE:k.BLACK;return t.disabled?p+"80":p}),a=L(()=>({color:d.value,backgroundColor:l.value,cursor:t.disabled?"not-allowed":"pointer"})),i=["p-1","rounded-md","grid","place-items-center","w-10","h-10"],u=D(!1);return(p,c)=>(w(),$("button",{onMouseenter:c[0]||(c[0]=y=>u.value=!0),onMouseleave:c[1]||(c[1]=y=>u.value=!1),disabled:p.disabled,class:Y(i),style:ee(a.value)},[H(p.$slots,"default",{},()=>[A(ne,{icon:p.icon},null,8,["icon"])])],44,fs))}}),ce=F({__name:"GToolbarButton",setup(e){const t=ie(),o=L(()=>t.value.primary),n=L(()=>re.value.themeName.value==="dark"?t.value.tertiary:t.value.secondary);return(r,s)=>(w(),R(bs,j(r.$props,{color:o.value,"active-color":n.value}),{default:I(()=>[H(r.$slots,"default")]),_:3},16,["color","active-color"]))}}),vs=F({__name:"ToolbarDivider",props:{color:{default:k.GRAY_100+"20"}},setup(e){return(t,o)=>(w(),$("div",{style:ee({backgroundColor:t.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),It=F({__name:"GToolbarDivider",setup(e){const t=ie();return(o,n)=>(w(),R(vs,j(o.$props,{color:O(t).text+"30"}),null,16,["color"]))}}),De=F({__name:"ToolbarButtonGroup",setup(e){const t=lr(),o=["flex","items-center","relative","gap-1"],n=L(()=>fr(o,t.value));return(r,s)=>(w(),$("div",{class:Y(n.value)},[H(r.$slots,"default")],2))}}),gs={class:Y(["rounded-full","p-[3px]"])},ms=F({__name:"AnnotationToolbar",setup(e){const{clear:t,brushWeight:o,isErasing:n,color:r,isLaserPointing:s}=re.value.annotation,l=c=>{r.value=c,n.value=!1,s.value=!1},d=c=>{o.value=c,n.value=!1,s.value=!1},a=c=>n.value||s.value?!1:r.value===c,i=c=>n.value?!1:o.value===c,u=()=>{n.value=!n.value,s.value=!1},p=()=>{s.value=!s.value,n.value=!1};return(c,y)=>(w(),R(gt,null,{default:I(()=>[A(De,null,{default:I(()=>[(w(!0),$(se,null,de(O(Ao),v=>(w(),R(ce,{key:v,onClick:T=>l(v),active:a(v)},{default:I(()=>[M("div",gs,[M("div",{style:ee({backgroundColor:v}),class:Y(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),A(It),A(De,null,{default:I(()=>[(w(!0),$(se,null,de(O(Do),(v,T)=>(w(),R(ce,{key:v,onClick:g=>d(v),active:i(v)},{default:I(()=>[M("div",{class:Y(["bg-gray-400","rounded-md","w-[15px]"]),style:ee({height:`${T*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),A(It),A(De,null,{default:I(()=>[A(ce,{onClick:p,active:O(s),icon:"laser-pointer"},null,8,["active"]),A(ce,{onClick:u,active:O(n),icon:"eraser"},null,8,["active"]),A(ce,{onClick:O(t),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var hs=ze.extend({name:"focustrap-directive"}),ys=wn.extend({style:hs});function Ne(e){"@babel/helpers - typeof";return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ne(e)}function Mt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),o.push.apply(o,n)}return o}function Nt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Mt(Object(o),!0).forEach(function(n){_s(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Mt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function _s(e,t,o){return(t=ws(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function ws(e){var t=Cs(e,"string");return Ne(t)=="symbol"?t:t+""}function Cs(e,t){if(Ne(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Ne(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Bo=ys.extend("focustrap",{mounted:function(t,o){var n=o.value||{},r=n.disabled;r||(this.createHiddenFocusableElements(t,o),this.bind(t,o),this.autoElementFocus(t,o)),t.setAttribute("data-pd-focustrap",!0),this.$el=t},updated:function(t,o){var n=o.value||{},r=n.disabled;r&&this.unbind(t)},unmounted:function(t){this.unbind(t)},methods:{getComputedSelector:function(t){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(t??"")},bind:function(t,o){var n=this,r=o.value||{},s=r.onFocusIn,l=r.onFocusOut;t.$_pfocustrap_mutationobserver=new MutationObserver(function(d){d.forEach(function(a){if(a.type==="childList"&&!t.contains(document.activeElement)){var i=function(p){var c=St(p)?St(p,n.getComputedSelector(t.$_pfocustrap_focusableselector))?p:Te(t,n.getComputedSelector(t.$_pfocustrap_focusableselector)):Te(p);return to(c)?c:p.nextSibling&&i(p.nextSibling)};ve(i(a.nextSibling))}})}),t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_mutationobserver.observe(t,{childList:!0}),t.$_pfocustrap_focusinlistener=function(d){return s&&s(d)},t.$_pfocustrap_focusoutlistener=function(d){return l&&l(d)},t.addEventListener("focusin",t.$_pfocustrap_focusinlistener),t.addEventListener("focusout",t.$_pfocustrap_focusoutlistener)},unbind:function(t){t.$_pfocustrap_mutationobserver&&t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_focusinlistener&&t.removeEventListener("focusin",t.$_pfocustrap_focusinlistener)&&(t.$_pfocustrap_focusinlistener=null),t.$_pfocustrap_focusoutlistener&&t.removeEventListener("focusout",t.$_pfocustrap_focusoutlistener)&&(t.$_pfocustrap_focusoutlistener=null)},autoFocus:function(t){this.autoElementFocus(this.$el,{value:Nt(Nt({},t),{},{autoFocus:!0})})},autoElementFocus:function(t,o){var n=o.value||{},r=n.autoFocusSelector,s=r===void 0?"":r,l=n.firstFocusableSelector,d=l===void 0?"":l,a=n.autoFocus,i=a===void 0?!1:a,u=Te(t,"[autofocus]".concat(this.getComputedSelector(s)));i&&!u&&(u=Te(t,this.getComputedSelector(d))),ve(u)},onFirstHiddenElementFocus:function(t){var o,n=t.currentTarget,r=t.relatedTarget,s=r===n.$_pfocustrap_lasthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(r))?Te(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_lasthiddenfocusableelement;ve(s)},onLastHiddenElementFocus:function(t){var o,n=t.currentTarget,r=t.relatedTarget,s=r===n.$_pfocustrap_firsthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(r))?Cn(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_firsthiddenfocusableelement;ve(s)},createHiddenFocusableElements:function(t,o){var n=this,r=o.value||{},s=r.tabIndex,l=s===void 0?0:s,d=r.firstFocusableSelector,a=d===void 0?"":d,i=r.lastFocusableSelector,u=i===void 0?"":i,p=function(T){return xn("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:l,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:T==null?void 0:T.bind(n)})},c=p(this.onFirstHiddenElementFocus),y=p(this.onLastHiddenElementFocus);c.$_pfocustrap_lasthiddenfocusableelement=y,c.$_pfocustrap_focusableselector=a,c.setAttribute("data-pc-section","firstfocusableelement"),y.$_pfocustrap_firsthiddenfocusableelement=c,y.$_pfocustrap_focusableselector=u,y.setAttribute("data-pc-section","lastfocusableelement"),t.prepend(c),t.append(y)}}}),Ke=Sn(),xs=qe`
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
`,Ss={root:"p-popover p-component",content:"p-popover-content"},ks=ze.extend({name:"popover",style:xs,classes:Ss}),Es={name:"BasePopover",extends:Ye,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:ks,provide:function(){return{$pcPopover:this,$parentInstance:this}}},Io={name:"Popover",extends:Es,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(t){t?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&he.clear(this.container),this.overlayEventListener&&(Ke.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(t,o){this.visible?this.hide():this.show(t,o)},show:function(t,o){this.visible=!0,this.eventTarget=t.currentTarget,this.target=o||t.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(t){var o=this;so(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&he.set("overlay",t,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(n){o.container.contains(n.target)&&(o.selfClick=!0)},this.focus(),Ke.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),Ke.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&he.clear(t)},alignOverlay:function(){An(this.container,this.target,!1);var t=kt(this.container),o=kt(this.target),n=0;t.left<o.left&&(n=o.left-t.left),this.container.style.setProperty(ut("popover.arrow.left").name,"".concat(n,"px")),t.top<o.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&ro(this.container,"p-popover-flipped"))},onContentKeydown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.hide(),ve(this.target))},onButtonKeydown:function(t){switch(t.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":t.preventDefault()}},focus:function(){var t=this.container.querySelector("[autofocus]");t&&t.focus()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var t=this;!this.outsideClickListener&&Tn()&&(this.outsideClickListener=function(o){t.visible&&!t.selfClick&&!t.isTargetClicked(o)&&(t.visible=!1),t.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new En(this.target,function(){t.visible&&(t.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.visible&&!kn()&&(t.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(t){return this.eventTarget&&(this.eventTarget===t.target||this.eventTarget.contains(t.target))},containerRef:function(t){this.container=t},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",no(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(t){Ke.emit("overlay-click",{originalEvent:t,target:this.target})}},directives:{focustrap:Bo,ripple:lt},components:{Portal:oo}},Ts=["aria-modal"];function As(e,t,o,n,r,s){var l=Be("Portal"),d=dt("focustrap");return w(),R(l,{appendTo:e.appendTo},{default:I(function(){return[A(ao,j({name:"p-popover",onEnter:s.onEnter,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave},e.ptm("transition")),{default:I(function(){return[r.visible?Ze((w(),$("div",j({key:0,ref:s.containerRef,role:"dialog","aria-modal":r.visible,onClick:t[3]||(t[3]=function(){return s.onOverlayClick&&s.onOverlayClick.apply(s,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?H(e.$slots,"container",{key:0,closeCallback:s.hide,keydownCallback:function(i){return s.onButtonKeydown(i)}}):(w(),$("div",j({key:1,class:e.cx("content"),onClick:t[0]||(t[0]=function(){return s.onContentClick&&s.onContentClick.apply(s,arguments)}),onMousedown:t[1]||(t[1]=function(){return s.onContentClick&&s.onContentClick.apply(s,arguments)}),onKeydown:t[2]||(t[2]=function(){return s.onContentKeydown&&s.onContentKeydown.apply(s,arguments)})},e.ptm("content")),[H(e.$slots,"default")],16))],16,Ts)),[[d]]):Z("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}Io.render=As;const mt=F({__name:"Popover",props:{offset:{default:12}},setup(e){const t=D(),o=r=>{t.value.toggle(r)},n=D(!1);return(r,s)=>(w(),$(se,null,[H(r.$slots,"activator",{toggle:o,isOpen:n.value}),A(O(Io),{ref_key:"op",ref:t,onShow:s[0]||(s[0]=l=>n.value=!0),onHide:s[1]||(s[1]=l=>n.value=!1),unstyled:""},{default:I(()=>[M("div",{style:ee({transform:`translateY(${r.offset}px)`})},[H(r.$slots,"default")],4)]),_:3},512)],64))}}),Ds=F({__name:"Well",props:{color:{default:k.GRAY_800},textColor:{default:k.WHITE}},setup(e){return(t,o)=>(w(),$("div",{style:ee({backgroundColor:t.color,color:t.textColor})},[H(t.$slots,"default")],4))}}),Ce=F({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const t=ie(),o=e,n=L(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(r,s)=>(w(),R(Ds,j(r.$attrs,{color:n.value,"text-color":O(t).text}),{default:I(()=>[H(r.$slots,"default")]),_:3},16,["color","text-color"]))}}),Ls={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},Bs=["src"],Is={class:"flex flex-col gap-1"},Ms={class:"text-lg font-bold"},Ns={class:"text-sm opacity-80"},Ps=F({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:k.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const t=e,o=L(()=>{if(t.hoverColor)return t.hoverColor;const s=_e(t.color);return(s.isDark()?s.lighten(10):s.darken(10)).toHexString()}),n=L(()=>r.value?o.value:t.color),r=D(!1);return(s,l)=>(w(),$("button",{onMouseenter:l[0]||(l[0]=d=>r.value=!0),onMouseleave:l[1]||(l[1]=d=>r.value=!1),style:ee({backgroundColor:n.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[M("div",Ls,[s.imageSrc?(w(),$("img",{key:0,src:s.imageSrc,class:"rounded-md object-cover w-full h-full"},null,8,Bs)):Z("",!0)]),M("div",Is,[M("h1",Ms,q(s.title),1),M("p",Ns,q(s.description),1)])],36))}}),Mo=F({__name:"GVerticalCardButton",setup(e){const t=ie();return(o,n)=>(w(),R(Ps,j(o.$attrs,{color:O(t).primary,"hover-color":O(t).secondary}),null,16,["color","hover-color"]))}}),Os={key:0,class:"flex items-center gap-3"},$s=F({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:t,navigateWithGraph:o}=wr(),n=Cr(),r=e,s=D(!1),l=D("");setTimeout(()=>{l.value=r.product.menu.thumbnail},io(0,100));const d=L(()=>{const a=r.product.menu.allowGoWithGraph??!0;return!xr(r.product)&&a});return(a,i)=>(w(),$("div",{onMouseenter:i[2]||(i[2]=u=>s.value=!0),onMouseleave:i[3]||(i[3]=u=>s.value=!1),class:"relative"},[M("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:ee({opacity:s.value?1:0})},[O(n).productId!==a.product.productId?(w(),$("div",Os,[A(te,{onClick:i[0]||(i[0]=u=>O(t)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:I(()=>[A(ne,{icon:"arrow-right"}),i[4]||(i[4]=ae(" go "))]),_:1,__:[4]}),d.value?(w(),R(te,{key:0,onClick:i[1]||(i[1]=u=>O(o)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:I(()=>[A(ne,{icon:"debug-step-over"}),i[5]||(i[5]=ae(" go with graph "))]),_:1,__:[5]})):Z("",!0)])):(w(),R(Ce,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:I(()=>[A(ne,{icon:"star",class:"text-xl"}),i[6]||(i[6]=ae(" you are here ")),A(ne,{icon:"star",class:"text-xl"})]),_:1,__:[6]}))],4),A(Mo,{"image-src":l.value,title:a.product.menu.name,description:a.product.menu.description,class:"rounded-md",style:ee({opacity:s.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),Rs={class:"flex flex-col gap-2"},zs=F({__name:"ProductDropdownMenu",setup(e){const t=Fe.filter(n=>n==null?void 0:n.menu),o=Dt.reduce((n,r)=>(n[r]=[],n),{});return t.forEach(n=>{o[n.menu.category].push(n)}),(n,r)=>(w(),R(Ce,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:I(()=>[(w(!0),$(se,null,de(O(Dt),s=>(w(),$("div",{key:s},[O(o)[s].length>0?(w(),R(Ce,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:I(()=>[ae(q(s),1)]),_:2},1024)):Z("",!0),M("div",Rs,[(w(!0),$(se,null,de(O(o)[s],l=>(w(),R($s,{key:l.productId,product:l},null,8,["product"]))),128))])]))),128))]),_:1}))}}),Fs=F({__name:"ProductDropdown",setup(e){const t=ie();return(o,n)=>(w(),R(mt,null,{activator:I(({toggle:r,isOpen:s})=>[A(te,{onClick:r,tertiary:s,class:"px-4 py-2 text-xl rounded-lg"},{default:I(()=>[M("span",{class:Y(`text-${O(t).brand}`)},"Magic Graphs",2)]),_:2},1032,["onClick","tertiary"])]),default:I(()=>[A(zs)]),_:1}))}}),Hs=["onMouseenter","onMouseleave"],Us=F({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(t,o)=>(w(),R(mt,{offset:t.offset},{activator:I(({toggle:n})=>[M("div",{onMouseenter:n,onMouseleave:n},[H(t.$slots,"default")],40,Hs)]),default:I(()=>[H(t.$slots,"content")]),_:3},8,["offset"]))}}),Gs={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},Ks=["innerHTML"],js=F({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const t=e,o=L(()=>{var n;return(n=t.simulation.canRun)==null?void 0:n.check()});return(n,r)=>o.value?(w(),$("div",Gs,[A(Us,null,{content:I(()=>[A(Ce,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:I(()=>[M("span",{innerHTML:o.value.description,class:"font-bold"},null,8,Ks)]),_:1})]),default:I(()=>[A(bo,{onMouseenter:r[0]||(r[0]=s=>{var l;return(l=o.value.themer)==null?void 0:l.theme()}),onMouseleave:r[1]||(r[1]=s=>{var l;return(l=o.value.themer)==null?void 0:l.untheme()}),color:O(k).GRAY_900,"text-color":O(k).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:I(()=>[ae(q(o.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):Z("",!0)}}),Ws=F({__name:"SimCard",props:{simulation:{}},setup(e){const t=e,o=D("");return setTimeout(()=>{o.value=t.simulation.thumbnail},io(0,100)),(n,r)=>(w(),R(Mo,{"image-src":o.value,title:n.simulation.name,description:n.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),qs=F({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:t}){const o=e,n=t,r=L(()=>{const l=o.simulations,d=l.filter(i=>{var u;return(u=i.canRun)==null?void 0:u.check()});return[...l.filter(i=>{var u;return!((u=i.canRun)!=null&&u.check())}),...d]}),s=l=>{if(o.simulations.length===1){n("simulation-selected",o.simulations[0]);return}l()};return(l,d)=>(w(),R(mt,null,{activator:I(({toggle:a,isOpen:i})=>[A(te,{onClick:u=>s(()=>a(u)),tertiary:i,disabled:l.disabled,class:"h-14 w-14 rounded-full"},{default:I(()=>[A(ne,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","tertiary","disabled"])]),default:I(()=>[A(Ce,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:I(()=>[(w(!0),$(se,null,de(r.value,a=>(w(),$("div",{key:a.name,class:"relative"},[A(js,{simulation:a},null,8,["simulation"]),A(Ws,{onClick:i=>n("simulation-selected",a),simulation:a},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),Ys=F({__name:"StopSimButton",setup(e){return(t,o)=>(w(),R(te,{color:O(k).RED_500,class:"h-14 w-14 rounded-full"},{default:I(()=>[A(ne,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),Zs=F({__name:"FullscreenButton",setup(e){const{toggle:t,isFullscreen:o}=Dn();return Ln(ye.Fullscreen.binding,t),(n,r)=>(w(),R(te,{onClick:O(t),class:"h-12 w-12"},{default:I(()=>[A(ne,{class:"text-3xl",icon:O(o)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}}),Vs=F({__name:"ThemeToolbar",setup(e){const t={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",pink:"flower-tulip-outline"};return(o,n)=>(w(),R(gt,null,{default:I(()=>[A(De,null,{default:I(()=>[(w(),$(se,null,de(t,(r,s)=>A(ce,{key:s,onClick:l=>O(re).preferredTheme.value=s,icon:r,active:s===O(re).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}}),Xs={class:"text-sm font-semibold"},Js=F({__name:"ZoomToolbar",props:{camera:{}},setup(e){const t=e,o=L(()=>t.camera.state.zoom.value),n=L(()=>{const s=Math.log(Tt),l=Math.log(At);return(Math.log(o.value)-s)/(l-s)}),r=L(()=>Math.round(n.value*100));return(s,l)=>(w(),R(gt,null,{default:I(()=>[A(De,null,{default:I(()=>[A(ce,{onClick:l[0]||(l[0]=d=>s.camera.actions.zoomOut()),disabled:o.value<=O(Tt),icon:"minus"},null,8,["disabled"]),A(Ce,{class:"w-12 text-center"},{default:I(()=>[M("p",Xs,q(r.value)+"%",1)]),_:1}),A(ce,{onClick:l[1]||(l[1]=d=>s.camera.actions.zoomIn()),disabled:o.value>=O(At),icon:"plus"},null,8,["disabled"])]),_:1})]),_:1}))}});var No={name:"WindowMaximizeIcon",extends:ct};function Qs(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}No.render=Qs;var Po={name:"WindowMinimizeIcon",extends:ct};function ea(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}Po.render=ea;var Oo={name:"SpinnerIcon",extends:ct};function ta(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}Oo.render=ta;var oa=qe`
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
`,na={root:function(t){var o=t.props,n=t.instance;return["p-badge p-component",{"p-badge-circle":to(o.value)&&String(o.value).length===1,"p-badge-dot":lo(o.value)&&!n.$slots.default,"p-badge-sm":o.size==="small","p-badge-lg":o.size==="large","p-badge-xl":o.size==="xlarge","p-badge-info":o.severity==="info","p-badge-success":o.severity==="success","p-badge-warn":o.severity==="warn","p-badge-danger":o.severity==="danger","p-badge-secondary":o.severity==="secondary","p-badge-contrast":o.severity==="contrast"}]}},ra=ze.extend({name:"badge",style:oa,classes:na}),sa={name:"BaseBadge",extends:Ye,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:ra,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function Pe(e){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(e)}function Pt(e,t,o){return(t=aa(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function aa(e){var t=ia(e,"string");return Pe(t)=="symbol"?t:t+""}function ia(e,t){if(Pe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Pe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var $o={name:"Badge",extends:sa,inheritAttrs:!1,computed:{dataP:function(){return Ae(Pt(Pt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},la=["data-p"];function ua(e,t,o,n,r,s){return w(),$("span",j({class:e.cx("root"),"data-p":s.dataP},e.ptmi("root")),[H(e.$slots,"default",{},function(){return[ae(q(e.value),1)]})],16,la)}$o.render=ua;var da=qe`
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
`;function Oe(e){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(e)}function ue(e,t,o){return(t=ca(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function ca(e){var t=pa(e,"string");return Oe(t)=="symbol"?t:t+""}function pa(e,t){if(Oe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Oe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var fa={root:function(t){var o=t.instance,n=t.props;return["p-button p-component",ue(ue(ue(ue(ue(ue(ue(ue(ue({"p-button-icon-only":o.hasIcon&&!n.label&&!n.badge,"p-button-vertical":(n.iconPos==="top"||n.iconPos==="bottom")&&n.label,"p-button-loading":n.loading,"p-button-link":n.link||n.variant==="link"},"p-button-".concat(n.severity),n.severity),"p-button-raised",n.raised),"p-button-rounded",n.rounded),"p-button-text",n.text||n.variant==="text"),"p-button-outlined",n.outlined||n.variant==="outlined"),"p-button-sm",n.size==="small"),"p-button-lg",n.size==="large"),"p-button-plain",n.plain),"p-button-fluid",o.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(t){var o=t.props;return["p-button-icon",ue({},"p-button-icon-".concat(o.iconPos),o.label)]},label:"p-button-label"},ba=ze.extend({name:"button",style:da,classes:fa}),va={name:"BaseButton",extends:Ye,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:ba,provide:function(){return{$pcButton:this,$parentInstance:this}}};function $e(e){"@babel/helpers - typeof";return $e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$e(e)}function oe(e,t,o){return(t=ga(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function ga(e){var t=ma(e,"string");return $e(t)=="symbol"?t:t+""}function ma(e,t){if($e(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if($e(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ro={name:"Button",extends:va,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(t){var o=t==="root"?this.ptmi:this.ptm;return o(t,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return j(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return lo(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return Ae(oe(oe(oe(oe(oe(oe(oe(oe(oe(oe({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge),"loading",this.loading),"fluid",this.hasFluid),"rounded",this.rounded),"raised",this.raised),"outlined",this.outlined||this.variant==="outlined"),"text",this.text||this.variant==="text"),"link",this.link||this.variant==="link"),"vertical",(this.iconPos==="top"||this.iconPos==="bottom")&&this.label))},dataIconP:function(){return Ae(oe(oe({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return Ae(oe(oe({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:Oo,Badge:$o},directives:{ripple:lt}},ha=["data-p"],ya=["data-p"];function _a(e,t,o,n,r,s){var l=Be("SpinnerIcon"),d=Be("Badge"),a=dt("ripple");return e.asChild?H(e.$slots,"default",{key:1,class:Y(e.cx("root")),a11yAttrs:s.a11yAttrs}):Ze((w(),R(nt(e.as),j({key:0,class:e.cx("root"),"data-p":s.dataP},s.attrs),{default:I(function(){return[H(e.$slots,"default",{},function(){return[e.loading?H(e.$slots,"loadingicon",j({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(w(),$("span",j({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(w(),R(l,j({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):H(e.$slots,"icon",j({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(w(),$("span",j({key:0,class:[e.cx("icon"),e.icon,e.iconClass],"data-p":s.dataIconP},e.ptm("icon")),null,16,ha)):Z("",!0)]}),M("span",j({class:e.cx("label")},e.ptm("label"),{"data-p":s.dataLabelP}),q(e.label||" "),17,ya),e.badge?(w(),R(d,{key:2,value:e.badge,class:Y(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):Z("",!0)]})]}),_:3},16,["class","data-p"])),[[a]])}Ro.render=_a;function Ot(){In({variableName:ut("scrollbar.width").name})}function $t(){Bn({variableName:ut("scrollbar.width").name})}var wa=qe`
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
`,Ca={mask:function(t){var o=t.position,n=t.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:o==="left"||o==="topleft"||o==="bottomleft"?"flex-start":o==="right"||o==="topright"||o==="bottomright"?"flex-end":"center",alignItems:o==="top"||o==="topleft"||o==="topright"?"flex-start":o==="bottom"||o==="bottomleft"||o==="bottomright"?"flex-end":"center",pointerEvents:n?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},xa={mask:function(t){var o=t.props,n=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],r=n.find(function(s){return s===o.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":o.modal},r?"p-dialog-".concat(r):""]},root:function(t){var o=t.props,n=t.instance;return["p-dialog p-component",{"p-dialog-maximized":o.maximizable&&n.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},Sa=ze.extend({name:"dialog",style:wa,classes:xa,inlineStyles:Ca}),ka={name:"BaseDialog",extends:Ye,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:Sa,provide:function(){return{$pcDialog:this,$parentInstance:this}}},zo={name:"Dialog",extends:ka,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var t=this;return{dialogRef:L(function(){return t._instance})}},data:function(){return{containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&he.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&he.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&ro(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),ve(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&he.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(t){this.maskMouseDownTarget=t.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var t=function(r){return r&&r.querySelector("[autofocus]")},o=this.$slots.footer&&t(this.footerContainer);o||(o=this.$slots.header&&t(this.headerContainer),o||(o=this.$slots.default&&t(this.content),o||(this.maximizable?(this.focusableMax=!0,o=this.maximizableButton):(this.focusableClose=!0,o=this.closeButton)))),o&&ve(o,{focusVisible:!0})},maximize:function(t){this.maximized?(this.maximized=!1,this.$emit("unmaximize",t)):(this.maximized=!0,this.$emit("maximize",t)),this.modal||(this.maximized?Ot():$t())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Ot()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&$t()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},contentRef:function(t){this.content=t},headerContainerRef:function(t){this.headerContainer=t},footerContainerRef:function(t){this.footerContainer=t},maximizableRef:function(t){this.maximizableButton=t?t.$el:void 0},closeButtonRef:function(t){this.closeButton=t?t.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",no(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(t){t.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=t.pageX,this.lastPageY=t.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&so(document.body,{"user-select":"none"}),this.$emit("dragstart",t))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var t=this;this.documentDragListener=function(o){if(t.dragging){var n=Nn(t.container),r=Pn(t.container),s=o.pageX-t.lastPageX,l=o.pageY-t.lastPageY,d=t.container.getBoundingClientRect(),a=d.left+s,i=d.top+l,u=On(),p=getComputedStyle(t.container),c=parseFloat(p.marginLeft),y=parseFloat(p.marginTop);t.container.style.position="fixed",t.keepInViewport?(a>=t.minX&&a+n<u.width&&(t.lastPageX=o.pageX,t.container.style.left=a-c+"px"),i>=t.minY&&i+r<u.height&&(t.lastPageY=o.pageY,t.container.style.top=i-y+"px")):(t.lastPageX=o.pageX,t.container.style.left=a-c+"px",t.lastPageY=o.pageY,t.container.style.top=i-y+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var t=this;this.documentDragEndListener=function(o){t.dragging&&(t.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!t.isUnstyled&&(document.body.style["user-select"]=""),t.$emit("dragend",o))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.$id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return Ae({maximized:this.maximized,modal:this.modal})}},directives:{ripple:lt,focustrap:Bo},components:{Button:Ro,Portal:oo,WindowMinimizeIcon:Po,WindowMaximizeIcon:No,TimesIcon:Mn}};function Re(e){"@babel/helpers - typeof";return Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Re(e)}function Rt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),o.push.apply(o,n)}return o}function zt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Rt(Object(o),!0).forEach(function(n){Ea(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Rt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function Ea(e,t,o){return(t=Ta(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Ta(e){var t=Aa(e,"string");return Re(t)=="symbol"?t:t+""}function Aa(e,t){if(Re(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Re(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Da=["data-p"],La=["aria-labelledby","aria-modal","data-p"],Ba=["id"],Ia=["data-p"];function Ma(e,t,o,n,r,s){var l=Be("Button"),d=Be("Portal"),a=dt("focustrap");return w(),R(d,{appendTo:e.appendTo},{default:I(function(){return[r.containerVisible?(w(),$("div",j({key:0,ref:s.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:t[1]||(t[1]=function(){return s.onMaskMouseDown&&s.onMaskMouseDown.apply(s,arguments)}),onMouseup:t[2]||(t[2]=function(){return s.onMaskMouseUp&&s.onMaskMouseUp.apply(s,arguments)}),"data-p":s.dataP},e.ptm("mask")),[A(ao,j({name:"p-dialog",onEnter:s.onEnter,onAfterEnter:s.onAfterEnter,onBeforeLeave:s.onBeforeLeave,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave,appear:""},e.ptm("transition")),{default:I(function(){return[e.visible?Ze((w(),$("div",j({key:0,ref:s.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":s.ariaLabelledById,"aria-modal":e.modal,"data-p":s.dataP},e.ptmi("root")),[e.$slots.container?H(e.$slots,"container",{key:0,closeCallback:s.close,maximizeCallback:function(u){return s.maximize(u)}}):(w(),$(se,{key:1},[e.showHeader?(w(),$("div",j({key:0,ref:s.headerContainerRef,class:e.cx("header"),onMousedown:t[0]||(t[0]=function(){return s.initDrag&&s.initDrag.apply(s,arguments)})},e.ptm("header")),[H(e.$slots,"header",{class:Y(e.cx("title"))},function(){return[e.header?(w(),$("span",j({key:0,id:s.ariaLabelledById,class:e.cx("title")},e.ptm("title")),q(e.header),17,Ba)):Z("",!0)]}),M("div",j({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?H(e.$slots,"maximizebutton",{key:0,maximized:r.maximized,maximizeCallback:function(u){return s.maximize(u)}},function(){return[A(l,j({ref:s.maximizableRef,autofocus:r.focusableMax,class:e.cx("pcMaximizeButton"),onClick:s.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:I(function(i){return[H(e.$slots,"maximizeicon",{maximized:r.maximized},function(){return[(w(),R(nt(s.maximizeIconComponent),j({class:[i.class,r.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])]}):Z("",!0),e.closable?H(e.$slots,"closebutton",{key:1,closeCallback:s.close},function(){return[A(l,j({ref:s.closeButtonRef,autofocus:r.focusableClose,class:e.cx("pcCloseButton"),onClick:s.close,"aria-label":s.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:I(function(i){return[H(e.$slots,"closeicon",{},function(){return[(w(),R(nt(e.closeIcon?"span":"TimesIcon"),j({class:[e.closeIcon,i.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])]}):Z("",!0)],16)],16)):Z("",!0),M("div",j({ref:s.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle,"data-p":s.dataP},zt(zt({},e.contentProps),e.ptm("content"))),[H(e.$slots,"default")],16,Ia),e.footer||e.$slots.footer?(w(),$("div",j({key:1,ref:s.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[H(e.$slots,"footer",{},function(){return[ae(q(e.footer),1)]})],16)):Z("",!0)],64))],16,La)),[[a,{disabled:!e.modal}]]):Z("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,Da)):Z("",!0)]}),_:3},8,["appendTo"])}zo.render=Ma;const Na=F({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1},header:{},footer:{},visible:{type:Boolean},modal:{type:Boolean},contentStyle:{},contentClass:{},contentProps:{},closable:{type:Boolean},dismissableMask:{type:Boolean},closeOnEscape:{type:Boolean},showHeader:{type:Boolean},blockScroll:{type:Boolean},baseZIndex:{},autoZIndex:{type:Boolean},position:{},maximizable:{type:Boolean},breakpoints:{},draggable:{type:Boolean},keepInViewport:{type:Boolean},minX:{},minY:{},appendTo:{},style:{},closeIcon:{},maximizeIcon:{},minimizeIcon:{},closeButtonProps:{},maximizeButtonProps:{},dt:{},pt:{},ptOptions:{},unstyled:{type:Boolean}},setup(e){const t=ie(),o=e,n=$n(),r=L(()=>({...n,...o})),s=L(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(l,d)=>(w(),R(O(zo),j(r.value,{style:{backgroundColor:s.value,color:O(t).text,borderColor:O(t).text},"pt:root:class":"!border-0"}),{default:I(()=>[H(l.$slots,"header"),H(l.$slots,"default"),H(l.$slots,"footer")]),_:3},16,["style"]))}}),Pa={class:"font-bold text-lg text-md mb-1"},ht=F({__name:"HelpSection",props:{title:{}},setup(e){return(t,o)=>(w(),$("div",null,[M("h2",Pa,q(t.title),1),M("div",null,[H(t.$slots,"default")])]))}}),Oa={class:"flex gap-2 text-sm"},Ft="https://github.com/Yonava/magic-graphs",$a=F({__name:"HelpLinks",setup(e){const t=n=>window.open(n,"_blank"),o=`${Ft}/issues/new?template=Blank%20issue`;return(n,r)=>(w(),R(ht,{title:"Links To Have Handy"},{default:I(()=>[M("div",Oa,[A(te,{onClick:r[0]||(r[0]=s=>t(o)),class:"flex gap-2",tertiary:""},{default:I(()=>[A(ne,{icon:"bug"}),r[2]||(r[2]=ae(" I Found An Issue "))]),_:1,__:[2]}),A(te,{onClick:r[1]||(r[1]=s=>t(Ft)),class:"flex gap-2",tertiary:""},{default:I(()=>[A(ne,{icon:"github"}),r[3]||(r[3]=ae(" Star Us On GitHub "))]),_:1,__:[3]})])]),_:1}))}}),Ra={class:Y(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs","capitalize","border-current"])},za={key:1},Fa={key:2},Ha=F({__name:"HelpShortcutKey",props:{keyboardKey:{}},setup(e){const t=e,o={meta:"⌘"},n=Object.keys(o),r={arrowright:"arrow-right",arrowleft:"arrow-left"},s=Object.keys(r),l=L(()=>s.includes(t.keyboardKey)),d=L(()=>n.includes(t.keyboardKey));return(a,i)=>(w(),$("div",Ra,[l.value?(w(),R(ne,{key:0,icon:r[a.keyboardKey],class:"text-xs"},null,8,["icon"])):d.value?(w(),$("p",za,q(o[a.keyboardKey]),1)):(w(),$("p",Fa,q(a.keyboardKey),1))]))}}),Ua={class:"flex flex-col gap-1"},Ga={class:"flex"},Ka=F({__name:"HelpShortcuts",setup(e){const t=r=>r.split("+").map(s=>s.trim()).filter(s=>s!==""),{activeShortcuts:o}=re.value.shortcut,n=Object.assign(o,ye);return(r,s)=>(w(),R(ht,{title:"Useful Shortcuts"},{default:I(()=>[M("div",Ua,[(w(!0),$(se,null,de(O(n),(l,d)=>(w(),$("div",{key:d,class:"flex justify-between items-center"},[ae(q(d)+" ",1),M("div",Ga,[(w(!0),$(se,null,de(t(l.binding),a=>(w(),$("div",{key:a},[A(Ha,{"keyboard-key":a},null,8,["keyboard-key"])]))),128))])]))),128))])]),_:1}))}}),ja=F({__name:"HelpVideos",setup(e){return(t,o)=>(w(),R(ht,{title:"Hungry For More? Watch Our Tutorials"},{default:I(()=>o[0]||(o[0]=[M("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/MvLXdpvDh90?si=y62b2TUkGWIZkDG8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1)])),_:1,__:[0]}))}}),Wa={class:"flex flex-col gap-4 h-[500px] overflow-auto"},qa=F({__name:"HelpContent",setup(e){return(t,o)=>(w(),$("div",null,[o[0]||(o[0]=M("h1",{class:"text-2xl font-bold mb-3 mt-4"},"Here's Some Help 👇",-1)),M("div",Wa,[A(Ka),A($a),A(ja)])]))}}),Ya=F({__name:"HelpMenu",setup(e){const t=D(!1),o=D();it(o,()=>{t.value=!1});const n=()=>{t.value=!t.value},r=xo();return r.add(ye.Help.binding,n),r.add("escape",()=>t.value=!1),window.addEventListener("keydown",r.handle),Le(()=>{window.removeEventListener("keydown",r.handle)}),(s,l)=>(w(),$(se,null,[A(te,{onClick:n,class:"h-12 w-12"},{default:I(()=>[A(ne,{icon:"help"})]),_:1}),A(Na,{visible:t.value,"onUpdate:visible":l[0]||(l[0]=d=>t.value=d)},{default:I(()=>[M("div",{ref_key:"dialogContent",ref:o},[A(qa)],512)]),_:1},8,["visible"])],64))}});function Za(){const e=D(0),t=D(0),o=D(0),n=D(0);let r,s,l=performance.now(),d=performance.now(),a=0,i=0;const u=33.3,p=()=>{const y=performance.now(),v=y-d;t.value=v,d=y,v>u&&i++,a++,r=requestAnimationFrame(p)},c=()=>{const y=performance.now(),v=y-l;e.value=Math.round(a*1e3/v),o.value=i,n.value=a>0?i/a:0,a=0,i=0,l=y};return We(()=>{d=performance.now(),l=performance.now(),r=requestAnimationFrame(p),s=setInterval(c,500)}),Le(()=>{cancelAnimationFrame(r),clearInterval(s)}),{fps:e,frameTime:t,slowFrameCount:o,slowFrameRatio:n}}const Va={class:"text-white text-end"},Xa=F({__name:"BenchmarkingMetrics",setup(e){const{fps:t,slowFrameCount:o,slowFrameRatio:n}=Za();return(r,s)=>(w(),$("div",Va,[M("div",null,"FPS: "+q(O(t)),1),M("div",null,"Slow Frame Count: "+q(O(o)),1),M("div",null,"Slow Frame Ratio: "+q(O(n).toFixed(2)),1)]))}}),Ja=F({__name:"ShareButton",setup(e){const t=xe(),o=D(!1),n=D(!1),r=eo(),s=()=>{o.value=!1,n.value=!1},l=async()=>{if(!o.value)try{const a=vo(re.value),i=gr(a),u=Eo.compressToEncodedURIComponent(i),p=To,y=`${`${location.origin}${t.path}`}?${p}=${u}`;await navigator.clipboard.writeText(y),o.value=!0,r.add({summary:"Graph Share Link Copied to Clipboard!",life:3e3,severity:"success"})}catch(a){n.value=!0,r.add({summary:"Failed to copy share link to clipboard!",life:3e3,severity:"error"}),console.error(a)}finally{setTimeout(s,3e3)}},d=L(()=>o.value?"check":n.value?"alert":"share");return(a,i)=>(w(),R(te,{onClick:l,disabled:o.value||n.value,class:"h-12 w-12"},{default:I(()=>[A(ne,{class:"text-3xl",icon:d.value},null,8,["icon"])]),_:1},8,["disabled"]))}}),Qa={class:"text-white text-end"},ei=F({__name:"GraphAtMousePositionData",setup(e){const t=L(()=>{const{coords:{x:n,y:r}}=re.value.graphAtMousePosition.value;return{x:Math.round(n),y:Math.round(r)}}),o=L(()=>{const{items:n}=re.value.graphAtMousePosition.value;return n.map(r=>`${r.graphType} - ${r.shape.name} (${r.id})`)});return(n,r)=>(w(),$("div",Qa,[M("div",null,"Cursor At: (X = "+q(t.value.x)+", Y = "+q(t.value.y)+")",1),M("div",null,"Items Hovered: "+q(o.value),1)]))}}),ti={class:Y(["absolute","top-6","left-6"])},oi={class:Y(["absolute","flex","flex-col","justify-center","items-center","gap-2","left-1/2","-translate-x-1/2","translate-y-6"])},ni={class:Y(["absolute","top-6","right-6"])},ri={class:Y(["absolute","grid","place-items-center","left-6","max-w-96","-translate-y-1/2","top-1/2"])},si={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},ai={class:Y(["absolute","grid","place-items-center","right-6","max-w-96","-translate-y-1/2","top-1/2"])},ii={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},li={class:Y(["absolute","flex","gap-2","bottom-6","left-6"])},ui={class:Y(["absolute","bottom-6","-translate-x-1/2","left-1/2"])},di={key:0,class:Y(["absolute","flex","flex-col","gap-2","bottom-20","right-6","pointer-events-none"])},ci={class:Y(["absolute","flex","flex-col","gap-2","bottom-6","right-6"])},pi={class:Y(["flex","gap-2"])},Fl=F({__name:"GraphProduct",props:{graph:{},canvas:{},css:{}},emits:["simulation-started","simulation-stopped"],setup(e,{emit:t}){const o=e,n=D(!1),r=t,s=_r(o.graph),l=D(s[0]),d=D(!1),a=L(()=>l.value.runner),i=L(()=>a.value.simControls.isActive),u=async()=>{d.value=!0,r("simulation-started",l.value),await a.value.start()},p=async()=>{await a.value.stop(),d.value=!1,r("simulation-stopped"),n.value&&o.graph.annotation.activate(),n.value=!1},c=x=>{n.value=o.graph.annotation.isActive.value,o.graph.annotation.deactivate(),l.value=x,u()};qr(o.graph);const y=D(!1),v=L(()=>y.value?"pointer-events-none":""),T=()=>y.value=!0,g=()=>y.value=!1;We(()=>{o.graph.subscribe("onMouseDown",T),o.graph.subscribe("onMouseUp",g)}),Le(()=>{o.graph.unsubscribe("onMouseDown",T),o.graph.unsubscribe("onMouseUp",g)});let b=!1;const S=()=>{b=!b;const x=b?250:-250;o.graph.bulkMoveNode(o.graph.nodes.value.map(h=>({nodeId:h.id,coords:{...h,x:h.x+x}})))};return(x,h)=>(w(),$(se,null,[M("div",{class:Y([v.value])},[M("div",ti,[A(Fs)]),M("div",oi,[d.value?H(x.$slots,"top-center-sim",{key:0}):H(x.$slots,"top-center",{key:1})]),M("div",ni,[d.value?H(x.$slots,"top-right-sim",{key:0},()=>[A(Ys,{onClick:p})]):H(x.$slots,"top-right",{key:1},()=>[O(s).length>0?(w(),R(qs,{key:0,onSimulationSelected:c,simulations:O(s)},null,8,["simulations"])):Z("",!0)])]),M("div",ri,[M("div",si,[d.value?H(x.$slots,"center-left-sim",{key:0}):H(x.$slots,"center-left",{key:1})])]),M("div",ai,[M("div",ii,[d.value?H(x.$slots,"center-right-sim",{key:0}):H(x.$slots,"center-right",{key:1})])]),M("div",li,[A(Ya),A(Ja),A(Js,{camera:x.canvas.camera},null,8,["camera"]),A(te,{onClick:S},{default:I(()=>h[0]||(h[0]=[ae(" Move ")])),_:1,__:[0]})]),M("div",ui,[d.value&&i.value?H(x.$slots,"bottom-center-sim",{key:0},()=>[A(rs,{controls:a.value.simControls},null,8,["controls"])]):H(x.$slots,"bottom-center",{key:1},()=>[Ze(M("div",null,[A(ms)],512),[[Hn,x.graph.annotation.isActive.value]])])]),O(Rn)?(w(),$("div",di,[A(ei),A(Xa)])):Z("",!0),M("div",ci,[M("div",pi,[A(Vs),A(Zs)])])],2),A(br,zn(Fn({...o.canvas.ref,...o.css.value})),null,16)],64))}}),fi=(e,t)=>{const{getTheme:o}=t,n=o("nodeColor",e),r=o("nodeBorderColor",e),s=o("nodeSize",e),l=o("nodeBorderWidth",e),d=o("nodeText",e),a=o("nodeTextSize",e),i=o("nodeTextColor",e),u=o("nodeShape",e),p=t.shapes.circle({id:e.id,at:{x:e.x,y:e.y},radius:s,fillColor:n,stroke:{color:r,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:k.TRANSPARENT}}),c=t.shapes.square({id:e.id,at:{x:e.x-s,y:e.y-s},size:s*2,fillColor:n,stroke:{color:r,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:k.TRANSPARENT}});return{shape:u==="circle"?p:c,id:e.id,graphType:"node"}},Ht=2,bi=(e,t)=>{const{displayEdgeLabels:o,isGraphDirected:n}=t.settings.value,[r,s]=rt(e.id,t),d=uo(r.id,s.id,t).length>1,a=s===r,i=t.getTheme("nodeBorderWidth",r),u=t.getTheme("nodeBorderWidth",s),p=t.getTheme("nodeSize",r),c=t.getTheme("nodeSize",s),y=Math.atan2(s.y-r.y,s.x-r.x),v=u/2+Ht,T={x:(c+v)*Math.cos(y),y:(c+v)*Math.sin(y)},g={x:r.x,y:r.y},b={x:s.x-(n?T.x:0),y:s.y-(n?T.y:0)},S=t.getTheme("edgeWidth",e),x=Math.max(S*1.2,7);d&&(g.x+=Math.cos(y+Math.PI/2)*x,g.y+=Math.sin(y+Math.PI/2)*x,b.x+=Math.cos(y+Math.PI/2)*x,b.y+=Math.sin(y+Math.PI/2)*x);const h=Un(g,t.edges.value.filter(J=>(J.from===r.id||J.to===s.id)&&J.from!==J.to).map(J=>{const[fe,Se]=rt(J.id,t);return r.id===fe.id?Se:fe}).filter((J,fe,Se)=>fe===Se.findIndex(He=>He.x===J.x&&He.y===J.y))),C=t.getTheme("edgeColor",e),f=t.getTheme("edgeTextColor",e),_=t.getTheme("graphBgColor"),m=t.getTheme("edgeText",e),B=t.getTheme("edgeTextSize",e),E=t.getTheme("edgeTextFontWeight",e),P=o?{color:_,activeColor:_,textBlock:{content:m,color:f,fontSize:B,fontWeight:E}}:void 0,z=(p+i)*Gn,G=z-(p+i/2)-Ht;if(a)return{shape:t.shapes.uturn({id:e.id,spacing:S*1.2,at:{x:r.x,y:r.y},upDistance:z,downDistance:G,rotation:h,lineWidth:S,fillColor:C,textArea:P}),id:e.id,graphType:"edge"};const K=p+i/2+c+u/2,V=(r.x-s.x)**2+(r.y-s.y)**2;return K**2>V?void 0:n?{shape:t.shapes.arrow({id:e.id,start:g,end:b,lineWidth:S,textOffsetFromCenter:(p+i/2)/2,fillColor:C,textArea:P}),id:e.id,graphType:"edge"}:{shape:t.shapes.line({id:e.id,start:g,end:b,lineWidth:S,fillColor:C,textArea:P}),id:e.id,graphType:"edge"}},yt={nodeShape:"circle",nodeSize:35,nodeBorderWidth:8,nodeTextSize:24,nodeAnchorRadius:Math.ceil(Math.sqrt(35)*2),edgeWidth:10,edgeTextSize:20,nodeText:({label:e})=>e,edgeText:({label:e})=>e,edgeTextFontWeight:"bold",linkPreviewWidth:10},vi="rgb(100, 60, 70)",gi={nodeBorderColor:k.BLACK,nodeColor:k.STONE_600,nodeTextColor:k.WHITE,nodeFocusBorderColor:k.RED_700,nodeFocusColor:vi,nodeFocusTextColor:k.WHITE,edgeColor:k.STONE_900,edgeFocusColor:k.RED_700,edgeFocusTextColor:k.WHITE,edgeTextColor:k.WHITE,graphBgColor:k.GRAY_600,graphBgPatternColor:k.GRAY_500,nodeAnchorColorWhenParentFocused:k.RED_900,nodeAnchorColor:k.GRAY_900,linkPreviewColor:k.BLACK,marqueeSelectionBoxColor:k.WHITE+"15",marqueeSelectionBoxBorderColor:k.WHITE,marqueeEncapsulatedNodeBoxBorderColor:k.RED_700,marqueeEncapsulatedNodeBoxColor:k.RED_700+"20",...yt},mi={nodeColor:k.GRAY_50,nodeBorderColor:k.GRAY_800,nodeFocusBorderColor:k.BLUE_600,nodeFocusColor:k.BLUE_100,nodeTextColor:k.GRAY_900,nodeFocusTextColor:k.GRAY_900,edgeColor:k.GRAY_800,edgeTextColor:k.GRAY_900,edgeFocusColor:k.BLUE_600,edgeFocusTextColor:k.BLACK,graphBgColor:k.GRAY_200,graphBgPatternColor:k.GRAY_500,nodeAnchorColor:k.BLACK,nodeAnchorColorWhenParentFocused:k.BLUE_900,linkPreviewColor:k.BLACK,marqueeSelectionBoxColor:k.BLUE_300+"15",marqueeSelectionBoxBorderColor:k.BLUE_500,marqueeEncapsulatedNodeBoxBorderColor:k.BLUE_700,marqueeEncapsulatedNodeBoxColor:k.BLUE_700+"05",...yt},hi={nodeColor:k.PINK_100,nodeBorderColor:k.PINK_400,nodeFocusBorderColor:k.PURPLE_600,nodeFocusColor:k.PURPLE_200,nodeTextColor:k.PINK_600,nodeFocusTextColor:k.PURPLE_900,edgeColor:k.PINK_600,edgeTextColor:k.PINK_600,edgeFocusColor:k.PURPLE_600,edgeFocusTextColor:k.PURPLE_600,graphBgColor:k.PINK_300,graphBgPatternColor:k.PURPLE_200,nodeAnchorColor:k.PINK_500,nodeAnchorColorWhenParentFocused:k.PURPLE_700,linkPreviewColor:k.PINK_900,marqueeSelectionBoxColor:k.PINK_300+"15",marqueeSelectionBoxBorderColor:k.PINK_500,marqueeEncapsulatedNodeBoxBorderColor:k.PINK_700,marqueeEncapsulatedNodeBoxColor:k.PINK_700+"05",...yt},_t={light:mi,dark:gi,pink:hi},yi=Object.keys(_t),Hl=(e,t)=>({nodeSize:e("nodeSize",t),nodeBorderWidth:e("nodeBorderWidth",t),nodeColor:e("nodeColor",t),nodeBorderColor:e("nodeBorderColor",t),nodeTextSize:e("nodeTextSize",t),nodeTextColor:e("nodeTextColor",t),nodeText:e("nodeText",t),nodeShape:e("nodeShape",t)}),_i=()=>({nodeSize:[],nodeBorderWidth:[],nodeColor:[],nodeBorderColor:[],nodeFocusColor:[],nodeFocusBorderColor:[],nodeText:[],nodeFocusTextColor:[],nodeTextSize:[],nodeTextColor:[],nodeShape:[],edgeColor:[],edgeWidth:[],edgeText:[],edgeTextSize:[],edgeTextColor:[],edgeFocusTextColor:[],edgeTextFontWeight:[],edgeFocusColor:[],graphBgColor:[],graphBgPatternColor:[],nodeAnchorRadius:[],nodeAnchorColor:[],nodeAnchorColorWhenParentFocused:[],linkPreviewColor:[],linkPreviewWidth:[],marqueeSelectionBoxColor:[],marqueeSelectionBoxBorderColor:[],marqueeEncapsulatedNodeBoxColor:[],marqueeEncapsulatedNodeBoxBorderColor:[]}),at=e=>{const t={...e};for(const o in t)typeof t[o]=="object"&&(t[o]=at(t[o]));return t},wi=e=>({subscribe:(t,o)=>e[t].add(o),unsubscribe:(t,o)=>e[t].delete(o),emit:(t,...o)=>{for(const n of e[t])n(...o)}}),Ci=()=>({onStructureChange:new Set,onNodeAdded:new Set,onBulkNodeAdded:new Set,onNodeRemoved:new Set,onBulkNodeRemoved:new Set,onNodeMoved:new Set,onBulkNodeMoved:new Set,onEdgeAdded:new Set,onBulkEdgeAdded:new Set,onEdgeRemoved:new Set,onBulkEdgeRemoved:new Set,onEdgeLabelEdited:new Set,onDraw:new Set,onNodeHoverChange:new Set,onGraphLoaded:new Set,onGraphReset:new Set,onClick:new Set,onMouseDown:new Set,onMouseUp:new Set,onMouseMove:new Set,onDblClick:new Set,onContextMenu:new Set,onKeyDown:new Set,onKeyUp:new Set,onThemeChange:new Set,onSettingsChange:new Set,onUndo:new Set,onRedo:new Set,onFocusChange:new Set,onNodeDragStart:new Set,onNodeDrop:new Set,onNodeAnchorDragStart:new Set,onNodeAnchorDrop:new Set,onGroupDragStart:new Set,onGroupDrop:new Set,onMarqueeBeginSelection:new Set,onMarqueeEndSelection:new Set}),Ut=e=>e==null,xi=e=>{const t=e.trim().split("/").filter(Boolean);if(t.length!==2)return!1;const[o,n]=t.map(Number);return!(Ut(o)||Ut(n))},Si=e=>{if(!xi(e))return;const t=e.split("/"),[o,n]=t.map(Number);return o/n},ki={displayEdgeLabels:!0,edgeLabelsEditable:!0,edgeInputToLabel:e=>{var n;const t=e.trim();if(!t)return;const o=(n=Si(t))==null?void 0:n.toFixed(2);return o==="Infinity"?"∞":o==="-Infinity"?"-∞":o===void 0&&isNaN(Number(t))?void 0:o??t},newNodeLabelGetter:null,isGraphDirected:!0,animations:()=>({})},Ei={focusable:!0,focusBlacklist:[]},Ti={draggable:!0},Ai={nodeAnchors:!0},Di={marquee:!0,marqueeSelectableGraphTypes:["node","edge"]},Li={interactive:!0,userAddedEdgeLabel:"1",userAddedEdgeRuleNoSelfLoops:!1,userAddedEdgeRuleOneEdgePerPath:!1},Bi={persistent:!0,persistentStorageKey:"graph",persistentBlacklist:new Set},Ii={shortcuts:!0,shortcutUndo:!0,shortcutRedo:!0,shortcutSelectAll:!0,shortcutDelete:!0,shortcutEscape:!0,shortcutZoomIn:!0,shortcutZoomOut:!0},Mi={...ki,...Ei,...Ti,...Ai,...Di,...Li,...Bi,...Ii},Gt=(e,...t)=>typeof e=="function"?e(...t):e,Ni=(e,t)=>(o,...n)=>{const r=t[o].findLast(l=>{const d=l.value;return Gt(d,...n)!==void 0}),s=(r==null?void 0:r.value)??_t[e.value][o];if(!s)throw new Error(`Theme property "${o}" not found`);return Gt(s,...n)},Pi=(e,t)=>{const o=L(()=>{const r=new Map;for(const s of e.value)r.set(s.id,s);return r}),n=L(()=>{const r=new Map;for(const s of t.value)r.set(s.id,s);return r});return{nodeIdToNodeMap:o,edgeIdToEdgeMap:n}},Oi=({emit:e})=>{const t=D([]),o=[],n=()=>{const l=o.reduce((d,a)=>a(d),[]);t.value=[...l.sort((d,a)=>d.priority-a.priority)]};return{aggregator:t,subscribeToAggregator:o,updateAggregator:n,getSchemaItemsByCoordinates:l=>t.value.sort((d,a)=>d.priority-a.priority).filter(d=>{var a,i;return d.shape.shapeHitbox(l)||((i=(a=d.shape).textHitbox)==null?void 0:i.call(a,l))}),draw:l=>{var u,p,c,y;n();const d=t.value.findLastIndex(v=>v.graphType==="edge"),a=t.value.slice(0,d+1),i=t.value.slice(d+1);for(const v of a)v.shape.drawShape(l);for(const v of a)(p=(u=v.shape).drawTextAreaMatte)==null||p.call(u,l);for(const v of a)(y=(c=v.shape).drawText)==null||y.call(c,l);for(const v of i)v.shape.draw(l);e("onDraw",l)}}},$i={broadcast:!0,focus:!0,history:!0,animate:!1},Ri={broadcast:!0,focus:!1,history:!0,animate:!1},Kt={broadcast:!0,history:!0},jt={broadcast:!0,focus:!1,history:!0,animate:!1},zi={broadcast:!1,focus:!1,history:!1,animate:!0},Fi={history:!0},Wt={broadcast:!0,history:!0},Hi={broadcast:!0},Ui={broadcast:!0},Gi={label:""},Ki="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");Array.from({length:999},(e,t)=>(t+1).toString());const ji=(e,t)=>()=>{let o=e.value.map(({label:d})=>d),n=0,r=0,s;const l=()=>n===0?"":t[(n-1)%t.length];for(;!s;){r>=t.length&&(o=o.slice(t.length),r=0,n++);const a=l()+t[r];o.includes(a)||(s=a),r++}return s},Wi=e=>ji(e.nodes,Ki),qi=({nodes:e,edges:t,nodeMap:o,edgeMap:n,emit:r,settings:s,updateGraphAtMousePosition:l,updateAggregator:d,animations:a,autoAnimate:i,activeAnimations:u,draw:p,magicCanvas:c})=>{const y=E=>o.value.get(E),v=E=>n.value.get(E),T=(E,U={})=>{if(E!=null&&E.id&&y(E.id)){console.warn("prevented adding a node with an existing id, this shouldn't happen");return}const P={...$i,...U},z=s.value.newNodeLabelGetter??Wi({nodes:e}),G={id:E.id??Me(),label:E.label??z(),x:E.x??0,y:E.y??0};return P.animate&&a.circle.nodeAdded.play({shapeId:G.id,runCount:1}),e.value.push(G),d(),l(),r("onNodeAdded",G,P),r("onStructureChange"),G},g=(E,U={})=>{if(E.length===0)return;const P={...Ri,...U},z=[];for(const G of E){const K=T(G,{focus:!1,broadcast:!1,history:!1});K&&z.push(K)}z.length!==0&&r("onBulkNodeAdded",z,P)},b=(E,U={})=>{const P={...jt,...U},{isGraphDirected:z}=s.value,[G,K]=[y(E.from),y(E.to)];if(!G||!K)return;if(z){if(t.value.find(Q=>Q.from===E.from&&Q.to===E.to))return}else if(t.value.find(Q=>Q.from===E.from&&Q.to===E.to||Q.from===E.to&&Q.to===E.from))return;const V={...Gi,id:Me(),...E};if(P.animate){const Q=K.id===G.id?"uturn":z?"arrow":"line";a[Q].edgeAdded.play({shapeId:V.id,runCount:1})}return t.value.push(V),d(),l(),r("onEdgeAdded",V,P),r("onStructureChange"),V},S=(E,U={})=>{if(E.length===0)return;const P={...zi,...U},z=[];for(const G of E){const K=b(G,{broadcast:!1,history:!1});K&&z.push(K)}z.length!==0&&r("onBulkEdgeAdded",z,P)},x=(E,U,P={})=>{const z=y(E);if(!z)return;const G={...Hi,...P};z.x=U.x,z.y=U.y,r("onNodeMoved",z,G)},h=(E,U={})=>{const P={...Ui,...U},z=i.captureFrame(()=>p(po(c.canvas)));for(const{nodeId:G,coords:K}of E)x(G,K,P);z()},C=(E,U,P={})=>{const z={...jt,...P},G=v(E);if(!G)return;const K=G.label;G.label=U,r("onEdgeLabelEdited",G,K,z),r("onStructureChange")},f=(E,U={})=>{const P=y(E);if(!P)return;const z={...Kt,...U},G=co(P.id,{edges:t,getEdge:v,settings:s}),K=[];for(const V of G){const X=m(V.id,{broadcast:!1,history:!1});X&&K.push(X)}return e.value=e.value.filter(V=>V.id!==P.id),u.delete(P.id),d(),l(),r("onNodeRemoved",P,K,z),r("onStructureChange"),[P,K]},_=async(E,U={})=>{if(E.length===0)return;const P={...Kt,...U},z=[],G=[];for(const K of E){const V=f(K,{broadcast:!1,history:!1});if(!V)continue;const[X,Q]=V;z.push(X),G.push(...Q)}z.length!==0&&r("onBulkNodeRemoved",z,G,P)},m=(E,U={})=>{const P=v(E);if(!P)return;const z={...Wt,...U};return t.value=t.value.filter(G=>G.id!==P.id),u.delete(P.id),d(),l(),r("onEdgeRemoved",P,z),r("onStructureChange"),P};return{getNode:y,getEdge:v,addNode:T,addEdge:b,moveNode:x,bulkMoveNode:h,editEdgeLabel:C,removeNode:f,removeEdge:m,bulkAddNode:g,bulkRemoveNode:_,bulkAddEdge:S,bulkRemoveEdge:(E,U={})=>{if(E.length===0)return;const P={...Wt,...U},z=[];for(const G of E){const K=m(G,{broadcast:!1,history:!1});K&&z.push(K)}if(z.length!==0)return r("onBulkEdgeRemoved",z,P),z}}},Yi=({subscribe:e,canvas:t,graphAtMousePosition:o})=>{const n=D(!1),r=D(!1),s=D({node:"grab",edge:"pointer","node-anchor":"grab","encapsulated-node-box":"move"}),l=D(),d=L(()=>!!l.value),a=c=>{l.value=c},i=()=>{l.value=void 0},u=c=>{var v;if(!c)return"default";if(d.value)return((v=l.value)==null?void 0:v.call(l,c))??!1?"pointer":"default";const y=s.value[c.graphType]??"default";return y==="grab"&&n.value?"grabbing":y},p=()=>{if(!t.value||r.value)return;const c=o.value.items.at(-1);t.value.style.cursor=u(c)};return e("onMouseDown",()=>{n.value=!0,p()}),e("onMouseUp",()=>{n.value=!1,p()}),e("onClick",p),e("onDblClick",p),e("onKeyUp",p),e("onKeyDown",p),e("onMouseMove",p),ge(s,p,{deep:!0}),{graphToCursorMap:s,activateCursorSelectMode:a,deactivateCursorSelectMode:i,graphCursorDisabled:r}},Zi=e=>{const t=new Map,o=new Set,n=new Map;return s=>({hold:a=>{if(o.has(`${s}-${a}`))return;const u=t.get(a)??0;u===0&&(n.set(a,e.value[a]),e.value[a]=!1),t.set(a,u+1),o.add(`${s}-${a}`)},release:a=>{if(!o.has(`${s}-${a}`))return;const i=t.get(a)??0;if(i!==0){if(i===1){const u=n.get(a);if(u===void 0)throw new Error("holdState not found");e.value[a]=u,n.delete(a)}t.set(a,i-1),o.delete(`${s}-${a}`)}}})},wt=500,Vi={forShapes:["arrow"],durationMs:wt,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,end:(e,{start:t})=>t,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.33,properties:{textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.9,properties:{end:e=>e,lineWidth:e=>e}}]},qt={forShapes:["line","uturn"],durationMs:wt,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},Xi={forShapes:["circle"],durationMs:wt,easing:{radius:"in-out"},keyframes:[{progress:0,properties:{radius:0,textArea:e=>({color:_e(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},Ji=e=>({arrow:{edgeAdded:e(Vi)},line:{edgeAdded:e(qt)},uturn:{edgeAdded:e(qt)},circle:{nodeAdded:e(Xi)}}),Qi=(e,t={})=>{const{canvas:o,cursorCoordinates:n}=e,r=D("light"),s=_i(),l=Ni(r,s),d=D({...Mi,...t}),a=Zi(d),i=Ci(),{subscribe:u,unsubscribe:p,emit:c}=wi(i),y=D(!0);it(e.canvas,()=>{y.value=!1}),u("onMouseDown",()=>{const N=document.activeElement;N instanceof HTMLElement&&typeof N.blur=="function"&&N.blur(),y.value=!0});const v=D([]),T=D([]),g=D({coords:{x:0,y:0},items:[]}),b=Yi({canvas:o,subscribe:u,graphAtMousePosition:g}),S=()=>g.value={coords:n.value,items:B(n.value)},x=N=>({...g.value,event:N}),h={click:N=>{N.preventDefault(),c("onClick",x(N))},mousemove:N=>{N.preventDefault(),S(),c("onMouseMove",x(N))},mousedown:N=>{N.preventDefault(),S(),c("onMouseDown",x(N))},mouseup:N=>{N.preventDefault(),S(),c("onMouseUp",x(N))},dblclick:N=>{N.preventDefault(),c("onDblClick",x(N))},contextmenu:N=>{c("onContextMenu",x(N))}},C={keydown:N=>c("onKeyDown",N),keyup:N=>c("onKeyUp",N)},{aggregator:f,subscribeToAggregator:_,updateAggregator:m,getSchemaItemsByCoordinates:B,draw:E}=Oi({emit:c}),{shapes:U,autoAnimate:P,defineTimeline:z,activeAnimations:G}=dr(),K=ur(Ji(z),d.value.animations(z)),V=N=>{const W={edges:T,getNode:J,getEdge:fe,getTheme:l,settings:d,shapes:U},le=T.value.map(be=>bi(be,W)).filter(Boolean).map((be,Qe)=>({...be,priority:Qe*10})),Je=v.value.map(be=>fi(be,W)).filter(Boolean).map((be,Qe)=>({...be,priority:Qe*10+1e3}));return N.push(...le),N.push(...Je),N};_.push(V),We(()=>{if(!o.value)throw new Error("canvas element not found");for(const[N,W]of Object.entries(h))o.value.addEventListener(N,W);for(const[N,W]of Object.entries(C))document.addEventListener(N,W)}),Qt(()=>{if(!o.value)throw new Error("Canvas element not found");for(const[N,W]of Object.entries(h))o.value.removeEventListener(N,W);for(const[N,W]of Object.entries(C))document.removeEventListener(N,W)});const{nodeIdToNodeMap:X,edgeIdToEdgeMap:Q}=Pi(v,T),{getNode:J,getEdge:fe,addNode:Se,addEdge:He,moveNode:Fo,bulkMoveNode:Ho,editEdgeLabel:Uo,removeNode:Go,removeEdge:Ko,bulkAddNode:jo,bulkRemoveNode:Wo,bulkAddEdge:qo,bulkRemoveEdge:Yo}=qi({nodes:v,edges:T,nodeMap:X,edgeMap:Q,emit:c,settings:d,updateGraphAtMousePosition:S,updateAggregator:m,animations:K,autoAnimate:P,activeAnimations:G,draw:E,magicCanvas:e}),Zo=L(()=>v.value.reduce((N,W,le)=>(N.set(W.id,le),N),new Map)),Vo=L(()=>T.value.reduce((N,W,le)=>(N.set(W.id,le),N),new Map));let ke;u("onMouseMove",({items:N})=>{const W=N.at(-1);if(!W||W.graphType!=="node")return;const le=J(W.id);le!==ke&&(c("onNodeHoverChange",le,ke),ke=le)});const Xo=N=>(ke&&fo(ke.id,N),N);_.push(Xo);const Jo=(N,W)=>{const le={nodes:v.value,edges:T.value};v.value=N.nodes,T.value=N.edges;const Je={...Fi,...W};c("onGraphLoaded",le,Je),c("onStructureChange")},Qo=()=>{v.value=[],T.value=[],c("onGraphReset"),c("onStructureChange")};ge(r,async(N,W)=>{c("onThemeChange",N,W)});const Ct=D(at(d.value));return ge(d,N=>{const W=cr(Ct.value,N);W&&(Ct.value=at(d.value),c("onSettingsChange",W),"isGraphDirected"in W&&c("onStructureChange"))},{deep:!0}),{nodes:v,edges:T,nodeIdToIndex:Zo,edgeIdToIndex:Vo,getNode:J,getEdge:fe,addNode:Se,addEdge:He,moveNode:Fo,bulkMoveNode:Ho,editEdgeLabel:Uo,removeNode:Go,removeEdge:Ko,bulkAddNode:jo,bulkRemoveNode:Wo,bulkAddEdge:qo,bulkRemoveEdge:Yo,getSchemaItemsByCoordinates:B,eventBus:i,subscribe:u,unsubscribe:p,emit:c,subscribeToAggregator:_,aggregator:f,updateAggregator:m,pluginHoldController:a,shapes:U,autoAnimate:P,animations:K,defineTimeline:z,baseTheme:L(()=>_t[r.value]),themeName:r,getTheme:l,themeMap:s,settings:d,load:Jo,reset:Qo,magicCanvas:e,canvasFocused:y,canvasHovered:Kn(e.canvas),draw:E,graphAtMousePosition:g,updateGraphAtMousePosition:S,...b}},el=(e,t)=>{const o={at:{x:1/0,y:1/0},width:0,height:0};if(e.length<2)return o;let n=1/0,r=1/0,s=-1/0,l=-1/0;for(const d of e){const a=t.getTheme("nodeSize",d),i=t.getTheme("nodeBorderWidth",d),u=a+i/2,{x:p,y:c}=d;n=Math.min(n,p-u),r=Math.min(r,c-u),s=Math.max(s,p+u),l=Math.max(l,c+u)}return n<1/0&&r<1/0&&s>-1/0&&l>-1/0?(o.at.x=n,o.at.y=r,o.width=s-n,o.height=l-r):(o.width=0,o.height=0),o},tl=e=>{const t=D(),o=D(),n=D(),{hold:r,release:s}=e.pluginHoldController("marquee"),l=f=>{const{width:_,height:m}=f;return Math.abs(_*m)},d=({items:f,coords:_,event:m})=>{if(m.button!==we.left)return;const B=f.at(-1);(B==null?void 0:B.graphType)!=="encapsulated-node-box"&&s("nodeAnchors"),B||p(_)},a=({coords:f})=>{if(!n.value)return;const _=f.x-n.value.x,m=f.y-n.value.y;n.value=f;for(const B of e.focus.focusedNodes.value)e.moveNode(B.id,{x:B.x+_,y:B.y+m});v()},i=({items:f,coords:_,event:m})=>{if(m.button!==we.left||t.value)return;const B=f.at(-1);(B==null?void 0:B.graphType)==="encapsulated-node-box"&&(n.value=_,e.emit("onGroupDragStart",e.focus.focusedNodes.value,_))},u=()=>{n.value&&(e.emit("onGroupDrop",e.focus.focusedNodes.value,n.value),n.value=void 0)},p=f=>{r("nodeAnchors"),e.graphCursorDisabled.value=!0,t.value={at:f,width:0,height:0},e.emit("onMarqueeBeginSelection",f)},c=()=>{if(!t.value)return;const f=t.value;t.value=void 0,e.graphCursorDisabled.value=!1,s("nodeAnchors"),e.emit("onMarqueeEndSelection",f)},y=f=>{if(l(f)<100)return;const m=[];for(const{id:B,shape:E,graphType:U}of e.aggregator.value){const{marqueeSelectableGraphTypes:P}=e.settings.value;if(!P.includes(U))continue;E.efficientHitbox(f)&&m.push(B)}e.focus.set(m)},v=()=>{o.value=el(e.focus.focusedNodes.value,e)},T=({coords:f})=>{if(!t.value)return;const{x:_,y:m}=f;t.value.width=_-t.value.at.x,t.value.height=m-t.value.at.y,y(t.value)},g=f=>{const _="marquee-box",m=e.shapes.rect({id:_,...jn(f),fillColor:e.getTheme("marqueeSelectionBoxColor"),stroke:{color:e.getTheme("marqueeSelectionBoxBorderColor"),lineWidth:2}});return{id:_,graphType:"marquee-box",shape:m,priority:1/0}},b=f=>{if(!t.value)return f;const{width:_,height:m}=t.value;if(_===0||m===0)return f;const B=g(t.value);return f.push(B),f},S=f=>{const _="encapsulated-node-box",m=e.shapes.rect({id:_,...f,fillColor:e.getTheme("marqueeEncapsulatedNodeBoxColor"),stroke:{color:e.getTheme("marqueeEncapsulatedNodeBoxBorderColor"),lineWidth:2}});return{id:_,graphType:"encapsulated-node-box",shape:m,priority:1/0}},x=f=>{if(!o.value)return f;const{width:_,height:m}=o.value;if(_===0||m===0)return f;const B=S(o.value);return f.push(B),f};e.subscribeToAggregator.push(x),e.subscribeToAggregator.push(b);const h=()=>{e.subscribe("onFocusChange",v),e.subscribe("onMouseDown",d),e.subscribe("onMouseUp",c),e.subscribe("onContextMenu",c),e.subscribe("onMouseMove",T),e.subscribe("onMouseDown",i),e.subscribe("onMouseUp",u),e.subscribe("onMouseMove",a),e.subscribe("onUndo",v),e.subscribe("onRedo",v)},C=()=>{e.unsubscribe("onFocusChange",v),e.unsubscribe("onMouseDown",d),e.unsubscribe("onMouseUp",c),e.unsubscribe("onContextMenu",c),e.unsubscribe("onMouseMove",T),e.unsubscribe("onMouseDown",i),e.unsubscribe("onMouseUp",u),e.unsubscribe("onMouseMove",a),e.unsubscribe("onUndo",v),e.unsubscribe("onRedo",v),t.value&&c()};return e.subscribe("onSettingsChange",f=>{f.marquee===!0?h():f.marquee===!1&&C()}),e.settings.value.marquee&&h(),{updateEncapsulatedNodeBox:v,activelySelecting:L(()=>!!t.value)}},ol=e=>{const t=D(),{hold:o,release:n}=e.pluginHoldController("node-drag"),r=({items:i,coords:u,event:p})=>{if(p.button!==we.left)return;const c=i.at(-1);if(!c||c.graphType!=="node")return;o("nodeAnchors");const y=e.getNode(c.id);y&&(t.value={node:y,coords:u},e.emit("onNodeDragStart",y))},s=()=>{if(!t.value)return;const{node:i}=t.value;t.value=void 0,e.emit("onNodeDrop",i),n("nodeAnchors");const{items:u}=e.graphAtMousePosition.value,p=u.at(-1);(p==null?void 0:p.id)===i.id&&e.nodeAnchors.setParentNode(i.id)},l=({coords:i})=>{if(!t.value)return;const{node:u,coords:p}=t.value,c=i.x-p.x,y=i.y-p.y;e.moveNode(u.id,{x:u.x+c,y:u.y+y}),t.value.coords=i},d=()=>{e.subscribe("onMouseDown",r),e.subscribe("onMouseUp",s),e.subscribe("onMouseMove",l),e.graphToCursorMap.value.node="grab"},a=()=>{e.unsubscribe("onMouseDown",r),e.unsubscribe("onMouseUp",s),e.unsubscribe("onMouseMove",l),e.graphToCursorMap.value.node="pointer",t.value&&s()};return e.subscribe("onSettingsChange",i=>{i.draggable===!1?a():i.draggable===!0&&d()}),e.settings.value.draggable&&d(),e.settings.value.draggable||a(),{currentlyDraggingNode:L(()=>{var i;return(i=t.value)==null?void 0:i.node})}},nl=e=>{const t=D(),o=D(),n=()=>{t.value=void 0,o.value=void 0},r=h=>{if(e.settings.value.nodeAnchors===!1)return;const C=e.getNode(h);if(!C)throw new Error("node not found");t.value=C,i(C)},s=D(),l=({items:h})=>{const C=h.at(-1);if(!C)return s.value=void 0;s.value=C.id},d=h=>{var E,U;const{getTheme:C}=e,f=C("nodeAnchorColor",h),_=C("nodeAnchorColorWhenParentFocused",h),m=C("nodeAnchorRadius",h),B=[];for(const P of a.value){const{x:z,y:G,id:K}=P,V=K===s.value||K===((E=o.value)==null?void 0:E.id),X={id:K,at:{x:z,y:G},radius:m,fillColor:V?_:f};o.value&&o.value.direction===P.direction&&(X.at.x=o.value.x,X.at.y=o.value.y);const Q=e.shapes.circle(X),J=P.id===((U=o.value)==null?void 0:U.id);B.push({id:P.id,graphType:"node-anchor",shape:Q,priority:J?1/0:99999})}return B},a=D([]),i=h=>{if(!h)return a.value=[];const{getTheme:C}=e,f=C("nodeAnchorRadius",h),_=C("nodeSize",h),m=C("nodeBorderWidth",h),B=_-f/3+m/2;a.value=[{id:"n-anchor",x:h.x,y:h.y-B,direction:"north"},{id:"e-anchor",x:h.x+B,y:h.y,direction:"east"},{id:"s-anchor",x:h.x,y:h.y+B,direction:"south"},{id:"w-anchor",x:h.x-B,y:h.y,direction:"west"}]},u=({items:h,event:C})=>{if(C.button!==we.left)return;const f=h.at(-1);if(!f||f.graphType!=="node-anchor")return;const{id:_}=f;return a.value.find(m=>m.id===_)},p=()=>{if(!t.value||!o.value)return;const{x:h,y:C}=o.value,f={x:t.value.x,y:t.value.y},_={x:h,y:C},{getTheme:m}=e,B=m("linkPreviewColor",t.value,o.value),E=m("linkPreviewWidth",t.value,o.value);return{id:"link-preview",graphType:"link-preview",shape:e.shapes.line({id:"link-preview",start:f,end:_,fillColor:B,lineWidth:E})}},c=()=>{var _;if(o.value)return;const{items:h}=e.graphAtMousePosition.value,C=h.at(-1);if(!C)return n();if(C.graphType==="node-anchor")return;if(C.graphType!=="node")return n();const f=e.getNode(C.id);if(!f)throw new Error("anchors: node shown on screen not in graph state");f.id!==((_=t.value)==null?void 0:_.id)&&r(f.id)},y=h=>{if(!t.value)return;const C=u(h);C&&(o.value=C,e.emit("onNodeAnchorDragStart",t.value,C))},v=({coords:h})=>{if(!o.value)return;const{x:C,y:f}=h;o.value.x=C,o.value.y=f},T=()=>{if(o.value){if(!t.value)throw new Error("active anchor without parent node")}else return;e.emit("onNodeAnchorDrop",t.value,o.value),n()},g=h=>{if(!t.value)return h;const C=d(t.value);for(const f of C)h.push(f);return h},b=h=>{var B;if(!t.value||!o.value)return h;const{id:C}=t.value;fo(C,h);const f=(B=h.find(E=>E.id===C))==null?void 0:B.priority;if(!f)return h;const _=p();if(!_)return h;const m={..._,priority:f-.1};return h.push(m),h};e.subscribeToAggregator.push(g),e.subscribeToAggregator.push(b);const S=()=>{e.subscribe("onNodeAdded",c),e.subscribe("onNodeRemoved",c),e.subscribe("onNodeMoved",n),e.subscribe("onNodeDrop",i),e.subscribe("onMouseMove",c),e.subscribe("onMouseMove",v),e.subscribe("onMouseMove",l),e.subscribe("onMouseDown",y),e.subscribe("onMouseUp",T)},x=()=>{e.unsubscribe("onNodeAdded",c),e.unsubscribe("onNodeRemoved",c),e.unsubscribe("onNodeMoved",n),e.unsubscribe("onNodeDrop",i),e.unsubscribe("onMouseMove",c),e.unsubscribe("onMouseMove",v),e.unsubscribe("onMouseMove",l),e.unsubscribe("onMouseDown",y),e.unsubscribe("onMouseUp",T),n()};return e.subscribe("onSettingsChange",h=>{h.nodeAnchors===!0?S():h.nodeAnchors===!1&&x()}),e.settings.value.nodeAnchors&&S(),{currentDraggingAnchor:Ie(o),parentNode:Ie(t),setParentNode:r}},Yt=100,rl=e=>{const t=D([]),o=D([]);return{clearHistory:()=>{t.value=[],o.value=[]},undo:()=>{const a=t.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value=e.value.filter(({id:c})=>!p.includes(c)):i==="remove"&&e.value.push(...u),o.value.push(a)},redo:()=>{const a=o.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value.push(...u):i==="remove"&&(e.value=e.value.filter(({id:c})=>!p.includes(c))),t.value.push(a)},addToUndoStack:a=>{t.value.push(a),t.value.length>Yt&&t.value.shift()},addToRedoStack:a=>{o.value.push(a),o.value.length>Yt&&o.value.shift()},canUndo:L(()=>t.value.length!==0),canRedo:L(()=>o.value.length!==0)}},tt=10,sl=ie(),al=e=>{const t=D(Ao[0]),o=D(Do[1]),n=D(!1),r=D(!1),s=D(),l=D(Date.now()),d=D(new Set),a=D([]),i=D([]),u=D(!1),p=D(),c=D(!1),y=rl(i),v=()=>{i.value.length!==0&&(y.addToUndoStack({action:"remove",annotations:i.value}),i.value=[])},T=()=>{s.value||(s.value=setInterval(()=>{Date.now()-l.value>50&&r.value&&a.value.length>=2&&a.value.shift()},50))},g=({coords:m,event:B})=>{if(B.button===we.left){if(n.value){const E=Et({at:m,radius:tt}).getBoundingBox(),U=i.value.filter(P=>e.shapes.scribble(P).efficientHitbox(E));for(const P of U)d.value.add(P.id)}u.value=!0,p.value=m,a.value=[m]}},b=({coords:m})=>{if(!(!u.value||!p.value)&&a.value.length!==0){if(n.value){const B=Et({at:m,radius:tt}).getBoundingBox(),E=i.value.filter(U=>e.shapes.scribble(U).efficientHitbox(B));for(const U of E)d.value.add(U.id);return}p.value=m,a.value.push(m),r.value&&a.value.length>10&&a.value.shift(),r.value&&T(),l.value=Date.now()}},S=()=>{if(!u.value)return;if(u.value=!1,p.value=void 0,n.value){const B=i.value.filter(E=>d.value.has(E.id));y.addToUndoStack({action:"remove",annotations:B}),i.value=i.value.filter(E=>!d.value.has(E.id)),d.value.clear();return}if(r.value){s.value=void 0;return}const m={id:Me(),type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value};i.value.push(m),y.addToUndoStack({action:"add",annotations:[m]}),a.value=[]},x=L(()=>n.value||r.value);ge(x,()=>{const m=e.magicCanvas.canvas.value;m&&(m.style.cursor=x.value?"none":"crosshair")});const h=m=>{if(!c.value)return m;if(n.value&&e.canvasHovered.value){const B="annotation-eraser-cursor",E=e.shapes.circle({id:B,at:e.graphAtMousePosition.value.coords,radius:tt,fillColor:k.TRANSPARENT,stroke:{color:sl.value.contrast,lineWidth:2}});m.push({graphType:"annotation-eraser",id:B,shape:E,priority:5050})}else if(a.value.length>0&&u.value){const B="annotation-incomplete",E=e.shapes.scribble({id:B,type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value});m.push({graphType:"annotation",id:B,shape:E,priority:5001})}else if(r.value&&e.canvasHovered.value){const B="laser-pointer-cursor",E=e.shapes.circle({id:B,at:e.graphAtMousePosition.value.coords,radius:o.value,fillColor:t.value});m.push({graphType:"annotation",id:B,shape:E,priority:5050})}for(const B of i.value){const E=d.value.has(B.id);m.push({graphType:"annotation",id:B.id,shape:e.shapes.scribble({...B,fillColor:B.fillColor+(E?"50":"")}),priority:5e3})}return m};return e.subscribeToAggregator.push(h),{clear:v,isActive:c,annotations:i,isLaserPointing:r,isErasing:n,color:t,brushWeight:o,activate:()=>{const m=e.magicCanvas.canvas.value;m&&(c.value=!0,e.settings.value.interactive=!1,e.settings.value.marquee=!1,e.settings.value.focusable=!1,e.settings.value.draggable=!1,e.graphCursorDisabled.value=!0,m.style.cursor="crosshair",e.subscribe("onMouseDown",g),e.subscribe("onMouseMove",b),e.subscribe("onMouseUp",S))},deactivate:()=>{const m=e.magicCanvas.canvas.value;m&&(c.value=!1,n.value=!1,e.settings.value.interactive=!0,e.settings.value.marquee=!0,e.settings.value.focusable=!0,e.settings.value.draggable=!0,e.graphCursorDisabled.value=!1,m.style.cursor="default",e.unsubscribe("onMouseDown",g),e.unsubscribe("onMouseMove",b),e.unsubscribe("onMouseUp",S))},load:m=>{i.value=m},undo:y.undo,redo:y.redo,canUndo:y.canUndo,canRedo:y.canRedo}},il=["node","edge"],ll="use-focus-graph",ul=e=>{const{setTheme:t}=Wn(e,ll),o=D(new Set),n=v=>{const T=v.filter(x=>!e.settings.value.focusBlacklist.includes(x));if(T.length===o.value.size&&T.every(x=>o.value.has(x)))return;const S=new Set([...o.value]);o.value=new Set(T),e.emit("onFocusChange",o.value,S)},r=v=>{if(o.value.has(v)||e.settings.value.focusBlacklist.includes(v))return;const b=new Set([...o.value]);o.value.add(v),e.emit("onFocusChange",o.value,b)},s=v=>{var g,b;const T=po(e.magicCanvas.canvas);(b=(g=v.shape).startTextAreaEdit)==null||b.call(g,T,S=>{const x=e.getEdge(v.id);if(!x)throw new Error("textarea only implemented for edges");const h=e.settings.value.edgeInputToLabel(S);h===void 0||x.label===h||e.editEdgeLabel(x.id,h)})},l=()=>{const v=Array.from(o.value),T=v.filter(g=>e.getNode(g)||e.getEdge(g));T.length!==v.length&&n(T)},d=({items:v,coords:T,event:g})=>{var C,f;if(g.button!==we.left)return;const b=v.at(-1);if(!b)return g.shiftKey?void 0:a();if(((f=(C=b.shape).textHitbox)==null?void 0:f.call(C,T))&&e.settings.value.edgeLabelsEditable&&b.graphType==="edge")return a(),s(b);il.some(_=>_===b.graphType)&&(g.shiftKey?r(b.id):n([b.id]))},a=()=>n([]),i=()=>{const v=e.nodes.value.map(g=>g.id),T=e.edges.value.map(g=>g.id);n([...v,...T])},u=({id:v},{focus:T})=>{T&&n([v])},p=v=>o.value.has(v);t("nodeColor",v=>{if(p(v.id))return e.getTheme("nodeFocusColor",v)}),t("nodeBorderColor",v=>{if(p(v.id))return e.getTheme("nodeFocusBorderColor",v)}),t("nodeTextColor",v=>{if(p(v.id))return e.getTheme("nodeFocusTextColor",v)}),t("edgeColor",v=>{if(p(v.id))return e.getTheme("edgeFocusColor",v)}),t("edgeTextColor",v=>{if(p(v.id))return e.getTheme("edgeFocusTextColor",v)}),t("nodeAnchorColor",v=>{if(p(v.id))return e.getTheme("nodeAnchorColorWhenParentFocused",v)});const c=()=>{e.subscribe("onNodeAdded",u),e.subscribe("onEdgeAdded",u),e.subscribe("onMouseDown",d),e.subscribe("onStructureChange",l)},y=()=>{e.unsubscribe("onNodeAdded",u),e.unsubscribe("onEdgeAdded",u),e.unsubscribe("onMouseDown",d),e.unsubscribe("onStructureChange",l),a()};return e.subscribe("onSettingsChange",v=>{v.focusable===!1?y():v.focusable===!0&&c()}),e.settings.value.focusable&&c(),{set:n,reset:a,add:r,all:i,isFocused:p,focusedItemIds:Ie(o),focusedNodes:L(()=>e.nodes.value.filter(v=>p(v.id))),focusedEdges:L(()=>e.edges.value.filter(v=>p(v.id)))}},dl={focus:!0},cl={focus:!0},pl=(e,t)=>{let o;return()=>{clearTimeout(o),o=setTimeout(e,t)}},Zt=100,Vt=3,fl=e=>{const t=D([]),o=D([]),n=g=>{t.value.push(g),t.value.length>Zt&&t.value.shift()},r=g=>{o.value.push(g),o.value.length>Zt&&o.value.shift()},s=D([]),l=D([]),a=pl(()=>{if(s.value.length===0&&l.value.length===0)return;const g=s.value.map(S=>({graphType:"node",data:S})),b=l.value.map(S=>({graphType:"edge",data:S}));n({action:"remove",affectedItems:[...g,...b]}),s.value=[],l.value=[]},250);e.subscribe("onNodeAdded",(g,{history:b})=>{b&&n({action:"add",affectedItems:[{graphType:"node",data:g}]})}),e.subscribe("onBulkNodeAdded",(g,{history:b})=>{b&&n({action:"add",affectedItems:g.map(S=>({graphType:"node",data:S}))})}),e.subscribe("onNodeRemoved",(g,b,{history:S})=>{if(!S)return;const x=b.map(h=>({graphType:"edge",data:h}));n({action:"remove",affectedItems:[{graphType:"node",data:g},...x]})}),e.subscribe("onBulkNodeRemoved",(g,b,{history:S})=>{S&&(s.value.push(...g),l.value.push(...b),a())}),e.subscribe("onEdgeLabelEdited",(g,b,{history:S})=>{S&&n({action:"edit",affectedItems:[{graphType:"edge",data:{id:g.id,from:b,to:g.label}}]})}),e.subscribe("onEdgeAdded",(g,{history:b})=>{b&&n({action:"add",affectedItems:[{graphType:"edge",data:g}]})}),e.subscribe("onBulkEdgeAdded",(g,{history:b})=>{b&&n({action:"add",affectedItems:g.map(S=>({graphType:"edge",data:S}))})}),e.subscribe("onEdgeRemoved",(g,{history:b})=>{b&&n({action:"remove",affectedItems:[{graphType:"edge",data:g}]})}),e.subscribe("onBulkEdgeRemoved",(g,{history:b})=>{b&&(l.value.push(...g),a())}),e.subscribe("onGraphLoaded",(g,{history:b})=>{if(!b)return;const S=g.nodes.map(h=>({graphType:"node",data:h})),x=g.edges.map(h=>({graphType:"edge",data:h}));n({action:"load",affectedItems:[...e.nodes.value.map(h=>({graphType:"node",data:h})),...e.edges.value.map(h=>({graphType:"edge",data:h}))],previousState:{nodes:S,edges:x}})});const i=D();e.subscribe("onGroupDragStart",(g,b)=>{i.value={startingCoordinates:b,nodes:g}}),e.subscribe("onGroupDrop",(g,b)=>{if(!i.value)throw new Error("dropped a group we didn't know was being dragged");if(i.value.nodes.length!==g.length)throw new Error("group size mismatch");const S=i.value.startingCoordinates.y-b.y,x=i.value.startingCoordinates.x-b.x;Math.sqrt(S**2+x**2)<Vt||n({action:"move",affectedItems:i.value.nodes.map(C=>({graphType:"node",data:{id:C.id,from:{x:C.x+x,y:C.y+S},to:{x:C.x,y:C.y}}}))})});const u=D();e.subscribe("onNodeDragStart",g=>{u.value={id:g.id,from:{x:g.x,y:g.y},to:{x:g.x,y:g.y}}}),e.subscribe("onNodeDrop",g=>{if(!u.value)throw new Error("dropped a node we didn't know was being dragged");if(u.value.id!==g.id)throw new Error("node ID mismatch");u.value.to={x:g.x,y:g.y};const b=u.value.from.y-u.value.to.y,S=u.value.from.x-u.value.to.x;Math.sqrt(b**2+S**2)<Vt||n({action:"move",affectedItems:[{graphType:"node",data:u.value}]})});const p=(g={})=>{const b=t.value.pop();if(b)return r(b),y(b),e.emit("onUndo",b,{...dl,...g}),b},c=(g={})=>{const b=o.value.pop();if(b)return n(b),v(b),e.emit("onRedo",b,{...cl,...g}),b},y=g=>{if(g.action==="load")e.load({nodes:g.previousState.nodes.map(b=>b.data),edges:g.previousState.edges.map(b=>b.data)},{history:!1});else if(g.action==="add")for(const b of g.affectedItems)b.graphType==="node"?e.removeNode(b.data.id,{history:!1}):b.graphType==="edge"&&e.removeEdge(b.data.id,{history:!1});else if(g.action==="remove")for(const b of g.affectedItems)b.graphType==="node"?e.addNode(b.data,{history:!1,focus:!1}):b.graphType==="edge"&&e.addEdge(b.data,{history:!1,focus:!1});else if(g.action==="move"){for(const b of g.affectedItems)if(b.graphType==="node"){const{from:S,id:x}=b.data;e.moveNode(x,{x:S.x,y:S.y})}}else if(g.action==="edit")for(const b of g.affectedItems)e.editEdgeLabel(b.data.id,b.data.from,{history:!1})},v=g=>{if(g.action==="load")e.load({nodes:g.affectedItems.filter(b=>b.graphType==="node").map(b=>b.data),edges:g.affectedItems.filter(b=>b.graphType==="edge").map(b=>b.data)},{history:!1});else if(g.action==="add")for(const b of g.affectedItems)b.graphType==="node"?e.addNode(b.data,{history:!1,focus:!1}):b.graphType==="edge"&&e.addEdge(b.data,{history:!1,focus:!1});else if(g.action==="remove")for(const b of g.affectedItems)b.graphType==="node"?e.removeNode(b.data.id,{history:!1}):b.graphType==="edge"&&e.removeEdge(b.data.id,{history:!1});else if(g.action==="move"){for(const b of g.affectedItems)if(b.graphType==="node"){const{to:S,id:x}=b.data;e.moveNode(x,{x:S.x,y:S.y})}}else if(g.action==="edit")for(const b of g.affectedItems)e.editEdgeLabel(b.data.id,b.data.to,{history:!1})},T=()=>{t.value=[],o.value=[]};return{undo:p,redo:c,canUndo:L(()=>t.value.length>0),canRedo:L(()=>o.value.length>0),undoStack:t,redoStack:o,addToUndoStack:n,addToRedoStack:r,clearHistory:T}},bl=e=>{const t=u=>!e.settings.value.persistentBlacklist.has(u.id),o=()=>e.settings.value.persistentStorageKey,n={get:()=>{const u=Ue.get(`nodes-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`nodes-${o()}`,p)}},r={get:()=>{const u=Ue.get(`edges-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`edges-${o()}`,p)}},s=async()=>{await new Promise(u=>setTimeout(u,10)),n.set(e.nodes.value),r.set(e.edges.value)},l=()=>e.load({nodes:n.get(),edges:r.get()},{history:!1}),d=["onStructureChange","onNodeDrop","onGroupDrop"],a=()=>{d.forEach(u=>e.subscribe(u,s))},i=()=>{d.forEach(u=>e.unsubscribe(u,s))};return e.subscribe("onSettingsChange",u=>{if(i(),"persistent"in u&&!u.persistent)return;if("persistent"in u&&u.persistent){l(),a();return}"persistentStorageKey"in u&&l(),a()}),e.settings.value.persistent&&(queueMicrotask(l),a()),{trackGraphState:s}},vl=e=>{let t=0;const o=({coords:d,items:a})=>{var c;if(!(Date.now()-t<350))return t=Date.now();t=0,((c=a.at(-1))==null?void 0:c.graphType)!=="node"&&e.addNode(d)},n=(d,a)=>{if(e.settings.value.userAddedEdgeRuleNoSelfLoops&&d.id===a.id)return!1;if(e.settings.value.userAddedEdgeRuleOneEdgePerPath){const i=e.edges.value.find(c=>c.from===d.id&&c.to===a.id),u=e.edges.value.find(c=>c.from===a.id&&c.to===d.id);if(i||u)return!1}return!0},r=d=>{const{items:a}=e.graphAtMousePosition.value,i=a.findLast(c=>c.graphType==="node");if(!i)return;const u=e.getNode(i.id);!u||!n(d,u)||e.addEdge({from:d.id,to:u.id,label:e.settings.value.userAddedEdgeLabel})},s=()=>{e.subscribe("onClick",o),e.subscribe("onNodeAnchorDrop",r),e.settings.value.nodeAnchors=!0,e.settings.value.edgeLabelsEditable=!0},l=()=>{e.unsubscribe("onClick",o),e.unsubscribe("onNodeAnchorDrop",r),e.settings.value.nodeAnchors=!1,e.settings.value.edgeLabelsEditable=!1};e.settings.value.interactive&&s(),e.settings.value.interactive||l(),e.subscribe("onSettingsChange",d=>{d.interactive===!0?s():d.interactive===!1&&l()})},gl=({adjacencyList:e,undirectedAdjacencyList:t})=>{const o=(l,d)=>{const a=new Set,i=[];for(i.push(d);i.length>0;){const u=i.shift();if(!u)break;a.add(u),l[u].forEach(c=>{a.has(c)||i.push(c)})}return a},n=l=>Object.keys(l).every(d=>o(l,d).size===Object.keys(l).length),r=L(()=>n(e.value)),s=L(()=>n(t.value));return{isConnected:r,isWeaklyConnected:s}};class ml{constructor(t){Ee(this,"V");Ee(this,"adj");Ee(this,"Time");Ee(this,"SCCs",[]);this.V=t,this.adj=new Array(t).fill(0).map(()=>[]),this.Time=0}addEdge(t,o){this.adj[t].push(o)}SCCUtil(t,o,n,r,s){n[t]=this.Time,o[t]=this.Time,this.Time+=1,r[t]=!0,s.push(t);for(const l of this.adj[t])n[l]===-1?(this.SCCUtil(l,o,n,r,s),o[t]=Math.min(o[t],o[l])):r[l]&&(o[t]=Math.min(o[t],n[l]));if(o[t]===n[t]){let l;const d=[];do l=s.pop(),d.push(l),r[l]=!1;while(l!==t);this.SCCs.push(d)}}SCC(){const t=new Array(this.V).fill(-1),o=new Array(this.V).fill(-1),n=new Array(this.V).fill(!1),r=[];for(let s=0;s<this.V;s++)t[s]===-1&&this.SCCUtil(s,o,t,n,r);return this.SCCs}}const hl=(e,t)=>{const o=new ml(e.length),n=e.map(s=>s.id);for(const s of t)o.addEdge(n.indexOf(s.from),n.indexOf(s.to));return o.SCC().map(s=>s.map(l=>e[l]))},yl=e=>{const{nodes:t,edges:o,adjacencyList:n}=e,r=L(()=>hl(t.value,o.value)),s=L(()=>r.value.reduce((a,i,u)=>{for(const{id:p}of i)a.set(p,u);return a},new Map)),l=L(()=>{const d=r.value,a=n.value,i=s.value;return d.reduce((u,p,c)=>{const y=p.flatMap(v=>a[v.id]??[]).filter(v=>i.get(v)!==c).map(v=>i.get(v));return u.set(c,new Set(y)),u},new Map)});return{stronglyConnectedComponents:r,nodeIdToConnectedComponent:s,componentAdjacencyMap:l}},_l=e=>{const t={},o=[[],[]],n={...e};Object.keys(e).forEach(l=>{n[l]||(n[l]=[])});const r={};Object.entries(n).forEach(([l,d])=>{d.forEach(a=>{r[a]||(r[a]=[]),r[a].push(l)})});const s=l=>{const d=[l];for(t[l]=0,o[0].push(l);d.length>0;){const a=d.shift(),i=t[a],u=i===0?1:0,p=n[a]||[],c=r[a]||[],y=[...new Set([...p,...c])];for(const v of y)if(t[v]===void 0)t[v]=u,o[u].push(v),d.push(v);else if(t[v]===i)return!1}return!0};for(const l of Object.keys(n))if(t[l]===void 0&&!s(l))return;return o},wl=e=>{const t=L(()=>_l(e.value)),o=L(()=>{const r=t.value,s=new Map;if(!r)return s;const[l,d]=r;for(const a of l)s.set(a,0);for(const a of d)s.set(a,1);return s}),n=L(()=>t.value!==void 0);return{bipartitePartition:t,nodeIdToBipartitePartition:o,isBipartite:n}},Cl=e=>{const t=new Set,o=[],n=[],r=new Set,s=(d,a)=>{t.add(d),n.push(d),r.add(d);for(const i of e[d]||[])if(!t.has(i))s(i,d);else if(i!==a&&r.has(i)){const u=n.indexOf(i),c=[...n.slice(u)].sort();o.some(y=>l(y,c))||o.push(c)}n.pop(),r.delete(d)},l=(d,a)=>d.length!==a.length?!1:d.every(i=>a.includes(i));for(const d in e)t.has(d)||s(d,null);return o},xl=e=>{const{settings:t,stronglyConnectedComponents:o,adjacencyList:n}=e,r=L(()=>{const{isGraphDirected:d}=t.value;return d?o.value.filter(a=>a.length>1).map(a=>a.map(i=>i.id)):Cl(n.value).sort((i,u)=>i.length-u.length)}),s=L(()=>r.value.reduce((d,a,i)=>{for(const u of a)d.set(u,i);return d},new Map)),l=L(()=>r.value.length===0);return{cycles:r,nodeIdToCycle:s,isAcyclic:l}},Sl=e=>{const t=L(()=>{const n=e.edges.value;return n.filter(r=>r.from!==r.to).filter(r=>n.some(s=>r.from===s.to&&r.to===s.from))}),o=L(()=>t.value.length>0);return{bidirectionalEdges:t,hasBidirectionalEdges:o}},kl=e=>({isComplete:L(()=>{const o=e.settings.value.isGraphDirected,n=e.nodes.value.length;return e.edges.value.length===(o?n*(n-1):n*(n-1)/2)})}),El=e=>{const t=gl(e),o=Sl(e),n=yl(e),r=wl(e.adjacencyList),s=xl({...e,...n});return{...kl(e),...s,...n,...o,...r,...t}},ot="auto",Tl=e=>{const t=qn(),o=Yn(Zn.preferredTheme,ot);return ge(t,()=>{o.value==="auto"&&(e.themeName.value=t.value?"dark":"light")},{immediate:!0}),ge(o,()=>{[...yi,"auto"].includes(o.value)||(console.warn("unrecognized preferred-theme in localStorage: falling back to",ot),o.value=ot),o.value==="auto"?e.themeName.value=t.value?"dark":"light":e.themeName.value=o.value},{immediate:!0}),{preferredTheme:o}},Al=e=>({getParentsOfNode:t=>ar(t,e),getAncestorsOfNode:t=>sr(t,e),getChildrenOfNode:t=>rr(t,e),getDescendantsOfNode:t=>nr(t,e),getConnectedNodes:t=>rt(t,e),getConnectedEdges:t=>co(t,e),getInboundEdges:t=>or(t,e),getOutboundEdges:t=>tr(t,e),isEdgeFlowingIntoNode:(t,o)=>er(t,o,e),isEdgeFlowingOutOfNode:(t,o)=>Qn(t,o,e),getEdgesAlongPath:(t,o)=>uo(t,o,e),getEdgeWeight:t=>Jn(t,e),getEdgeWeightFraction:t=>Xn(t,e),getWeightBetweenNodes:(t,o)=>Vn(t,o,e)}),Xt=(e,t)=>{const o=Object.keys(e).length,n=Array.from({length:o},()=>Array(o).fill(0));for(const[r,s]of Object.entries(e)){const l=t.get(r);for(const d of s){const a=t.get(d.id);n[l][a]=d.weight}}return n},Dl=e=>{const{weightedAdjacencyList:t,weightedFracAdjacencyList:o}=e.adjacencyList,n=L(()=>Xt(t.value,e.nodeIdToIndex.value)),r=L(()=>Xt(o.value,e.nodeIdToIndex.value));return{transitionMatrix:n,fracTransitionMatrix:r}},Ll=(e,t={})=>{const o=Qi(e,t),n=ul(o),r=fl(o),s=tl({...o,focus:n}),l=nl({...o,focus:n}),d=ol({...o,nodeAnchors:l}),a=al(o),i=bl(o),u=Tl(o),p=Kr({...o,history:r,focus:n,annotation:a}),c=ir(o),y=Dl({...o,adjacencyList:c}),v=El({...o,...c});vl(o);const T=Al(o);return{...o,focus:n,history:r,marquee:s,nodeDrag:d,nodeAnchors:l,annotation:a,persistent:i,...u,adjacencyList:c,transitionMatrix:y,characteristics:v,shortcut:p,helpers:T}},Bl=e=>{const{subscribe:t,getTheme:o}=e,n=D(o("graphBgPatternColor")),r=D(o("graphBgColor"));return t("onThemeChange",async()=>{n.value=o("graphBgPatternColor"),r.value=o("graphBgColor")}),{patternColor:Ie(n),bgColor:Ie(r)}},Ul=(e={})=>{const t=vr({storageKey:e.persistentStorageKey}),o=Ll(t,e),{bgColor:n,patternColor:r}=Bl(o);t.draw.content.value=o.draw,t.draw.backgroundPattern.value=(l,d,a)=>pr({at:d,size:12,lineWidth:1,fillColor:r.value+a}).draw(l);const s=L(()=>({style:{backgroundColor:n.value}}));return{canvas:t,graph:o,css:s}};export{Rl as D,Ki as L,Fl as _,Vi as a,Ce as b,te as c,Ys as d,rs as e,zl as f,ji as g,Us as h,Dl as i,mt as j,wr as k,pl as l,gt as m,ce as n,It as o,$l as p,De as q,Hl as r,Ul as u};
