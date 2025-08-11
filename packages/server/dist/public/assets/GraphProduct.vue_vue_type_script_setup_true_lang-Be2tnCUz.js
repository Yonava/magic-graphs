var en=Object.defineProperty;var tn=(e,t,o)=>t in e?en(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var Te=(e,t,o)=>tn(e,typeof t!="symbol"?t+"":t,o);import{M as _e,u as on,t as nn,a as St,b as kt,_ as rn}from"./index-izglcM0V.js";import{am as nt,an as Qt,ao as sn,ap as an,y as S,E as we,h as T,aq as eo,ar as to,I as A,$ as me,as as it,at as We,au as oo,av as ln,aw as no,ax as un,ay as dn,az as cn,aA as pn,aB as fn,aC as bn,aD as vn,aE as gn,aF as mn,aG as hn,aH as yn,aI as Ie,af as ae,f as Et,D as _n,aJ as wn,aK as Ue,aL as Cn,aM as xn,aN as Sn,ac as kn,aO as Se,a6 as ro,_ as En,i as Tn,j as An,k as Ln,l as Bn,n as In,p as Dn,q as Mn,s as Nn,v as Pn,x as On,C as re,aP as $n,a7 as Rn,aQ as so,d as F,c as $,o as w,al as Y,O as H,a as M,t as q,K as ee,z as R,w as D,J as Z,u as O,Z as zn,e as L,m as j,F as se,g as de,a3 as ze,aR as Fn,aS as Hn,aT as ve,aU as Ae,aV as Un,aW as Tt,a1 as ao,aX as Gn,a2 as qe,aY as io,aZ as lt,a0 as Ye,a_ as lo,a$ as Kn,b0 as jn,b1 as Wn,b2 as qn,b3 as At,b4 as ut,b5 as uo,b6 as ye,b7 as co,r as De,a8 as dt,b8 as po,aa as Ze,b9 as fo,b as le,ba as Yn,ag as Lt,bb as Zn,bc as Vn,aj as Ce,bd as Xn,be as Jn,bf as Qn,bg as ct,bh as bo,a4 as Le,bi as rt,bj as er,bk as tr,bl as or,bm as nr,bn as rr,bo as sr,bp as ar,ak as ir,A as lr,B as ur,bq as dr}from"./index-8aSAdiyM.js";import{g as Me,d as cr,u as pr,a as fr,c as br,b as vr,_ as vo}from"./Button.vue_vue_type_script_setup_true_lang-Dszf8U0K.js";import{_ as oe}from"./Icon.vue_vue_type_script_setup_true_lang-wQn8swOT.js";const gr=e=>({subscribe:(t,o)=>e[t].add(o),unsubscribe:(t,o)=>e[t].delete(o),emit:(t,...o)=>{for(const n of e[t])n(...o)}}),mr=()=>({onStructureChange:new Set,onNodeAdded:new Set,onBulkNodeAdded:new Set,onNodeRemoved:new Set,onBulkNodeRemoved:new Set,onNodeMoved:new Set,onBulkNodeMoved:new Set,onEdgeAdded:new Set,onBulkEdgeAdded:new Set,onEdgeRemoved:new Set,onBulkEdgeRemoved:new Set,onEdgeLabelEdited:new Set,onDraw:new Set,onNodeHoverChange:new Set,onGraphLoaded:new Set,onGraphReset:new Set,onClick:new Set,onMouseDown:new Set,onMouseUp:new Set,onMouseMove:new Set,onDblClick:new Set,onContextMenu:new Set,onKeyDown:new Set,onKeyUp:new Set,onThemeChange:new Set,onSettingsChange:new Set,onUndo:new Set,onRedo:new Set,onFocusChange:new Set,onNodeDragStart:new Set,onNodeDrop:new Set,onNodeAnchorDragStart:new Set,onNodeAnchorDrop:new Set,onGroupDragStart:new Set,onGroupDrop:new Set,onMarqueeBeginSelection:new Set,onMarqueeEndSelection:new Set}),Bt=2,hr=(e,t)=>{const{displayEdgeLabels:o,isGraphDirected:n}=t.settings.value,[r,s]=nt(e.id,t),d=Qt(r.id,s.id,t).length>1,a=s===r,i=t.getTheme("nodeBorderWidth",r),u=t.getTheme("nodeBorderWidth",s),p=t.getTheme("nodeSize",r),c=t.getTheme("nodeSize",s),m=Math.atan2(s.y-r.y,s.x-r.x),C=u/2+Bt,I={x:(c+C)*Math.cos(m),y:(c+C)*Math.sin(m)},b={x:r.x,y:r.y},f={x:s.x-(n?I.x:0),y:s.y-(n?I.y:0)},x=t.getTheme("edgeWidth",e),E=Math.max(x*1.2,7);d&&(b.x+=Math.cos(m+Math.PI/2)*E,b.y+=Math.sin(m+Math.PI/2)*E,f.x+=Math.cos(m+Math.PI/2)*E,f.y+=Math.sin(m+Math.PI/2)*E);const h=sn(b,t.edges.value.filter(J=>(J.from===r.id||J.to===s.id)&&J.from!==J.to).map(J=>{const[fe,ke]=nt(J.id,t);return r.id===fe.id?ke:fe}).filter((J,fe,ke)=>fe===ke.findIndex(He=>He.x===J.x&&He.y===J.y))),y=t.getTheme("edgeColor",e),v=t.getTheme("edgeTextColor",e),_=t.getTheme("graphBgColor"),g=t.getTheme("edgeText",e),B=t.getTheme("edgeTextSize",e),k=t.getTheme("edgeTextFontWeight",e),P=o?{color:_,activeColor:_,textBlock:{content:g,color:v,fontSize:B,fontWeight:k}}:void 0,z=(p+i)*an,G=z-(p+i/2)-Bt;if(a)return{shape:t.shapes.uturn({id:e.id,spacing:x*1.2,at:{x:r.x,y:r.y},upDistance:z,downDistance:G,rotation:h,lineWidth:x,fillColor:y,textArea:P}),id:e.id,graphType:"edge"};const K=p+i/2+c+u/2,V=(r.x-s.x)**2+(r.y-s.y)**2;return K**2>V?void 0:n?{shape:t.shapes.arrow({id:e.id,start:b,end:f,lineWidth:x,textOffsetFromCenter:(p+i/2)/2,fillColor:y,textArea:P}),id:e.id,graphType:"edge"}:{shape:t.shapes.line({id:e.id,start:b,end:f,lineWidth:x,fillColor:y,textArea:P}),id:e.id,graphType:"edge"}},yr=(e,t)=>{const{getTheme:o}=t,n=o("nodeColor",e),r=o("nodeBorderColor",e),s=o("nodeSize",e),l=o("nodeBorderWidth",e),d=o("nodeText",e),a=o("nodeTextSize",e),i=o("nodeTextColor",e),u=o("nodeShape",e),p=t.shapes.circle({id:e.id,at:{x:e.x,y:e.y},radius:s,fillColor:n,stroke:{color:r,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:S.TRANSPARENT}}),c=t.shapes.square({id:e.id,at:{x:e.x-s,y:e.y-s},size:s*2,fillColor:n,stroke:{color:r,lineWidth:l},textArea:{textBlock:{content:d,fontSize:a,fontWeight:"bold",color:i},color:S.TRANSPARENT}});return{shape:u==="circle"?p:c,id:e.id,graphType:"node"}},It=e=>e==null,_r=e=>{const t=e.trim().split("/").filter(Boolean);if(t.length!==2)return!1;const[o,n]=t.map(Number);return!(It(o)||It(n))},wr=e=>{if(!_r(e))return;const t=e.split("/"),[o,n]=t.map(Number);return o/n},Cr={displayEdgeLabels:!0,edgeLabelsEditable:!0,edgeInputToLabel:e=>{var n;const t=e.trim();if(!t)return;const o=(n=wr(t))==null?void 0:n.toFixed(2);return o==="Infinity"?"∞":o==="-Infinity"?"-∞":o===void 0&&isNaN(Number(t))?void 0:o??t},newNodeLabelGetter:null,isGraphDirected:!0,animations:()=>({})},xr={focusable:!0,focusBlacklist:[]},Sr={draggable:!0},kr={nodeAnchors:!0},Er={marquee:!0,marqueeSelectableGraphTypes:["node","edge"]},Tr={interactive:!0,userAddedEdgeLabel:"1",userAddedEdgeRuleNoSelfLoops:!1,userAddedEdgeRuleOneEdgePerPath:!1},Ar={persistent:!0,persistentStorageKey:"graph",persistentBlacklist:new Set},Lr={shortcuts:!0,shortcutUndo:!0,shortcutRedo:!0,shortcutSelectAll:!0,shortcutDelete:!0,shortcutEscape:!0,shortcutZoomIn:!0,shortcutZoomOut:!0},Br={...Cr,...xr,...Sr,...kr,...Er,...Tr,...Ar,...Lr},pt={nodeShape:"circle",nodeSize:35,nodeBorderWidth:8,nodeTextSize:24,nodeAnchorRadius:Math.ceil(Math.sqrt(35)*2),edgeWidth:10,edgeTextSize:20,nodeText:({label:e})=>e,edgeText:({label:e})=>e,edgeTextFontWeight:"bold",linkPreviewWidth:10},Ir="rgb(100, 60, 70)",Dr={nodeBorderColor:S.BLACK,nodeColor:S.STONE_600,nodeTextColor:S.WHITE,nodeFocusBorderColor:S.RED_700,nodeFocusColor:Ir,nodeFocusTextColor:S.WHITE,edgeColor:S.STONE_900,edgeFocusColor:S.RED_700,edgeFocusTextColor:S.WHITE,edgeTextColor:S.WHITE,graphBgColor:S.GRAY_600,graphBgPatternColor:S.GRAY_500,nodeAnchorColorWhenParentFocused:S.RED_900,nodeAnchorColor:S.GRAY_900,linkPreviewColor:S.BLACK,marqueeSelectionBoxColor:S.WHITE+"15",marqueeSelectionBoxBorderColor:S.WHITE,marqueeEncapsulatedNodeBoxBorderColor:S.RED_700,marqueeEncapsulatedNodeBoxColor:S.RED_700+"20",...pt},Mr={nodeColor:S.GRAY_50,nodeBorderColor:S.GRAY_800,nodeFocusBorderColor:S.BLUE_600,nodeFocusColor:S.BLUE_100,nodeTextColor:S.GRAY_900,nodeFocusTextColor:S.GRAY_900,edgeColor:S.GRAY_800,edgeTextColor:S.GRAY_900,edgeFocusColor:S.BLUE_600,edgeFocusTextColor:S.BLACK,graphBgColor:S.GRAY_200,graphBgPatternColor:S.GRAY_500,nodeAnchorColor:S.BLACK,nodeAnchorColorWhenParentFocused:S.BLUE_900,linkPreviewColor:S.BLACK,marqueeSelectionBoxColor:S.BLUE_300+"15",marqueeSelectionBoxBorderColor:S.BLUE_500,marqueeEncapsulatedNodeBoxBorderColor:S.BLUE_700,marqueeEncapsulatedNodeBoxColor:S.BLUE_700+"05",...pt},Nr={nodeColor:S.PINK_100,nodeBorderColor:S.PINK_400,nodeFocusBorderColor:S.PURPLE_600,nodeFocusColor:S.PURPLE_200,nodeTextColor:S.PINK_600,nodeFocusTextColor:S.PURPLE_900,edgeColor:S.PINK_600,edgeTextColor:S.PINK_600,edgeFocusColor:S.PURPLE_600,edgeFocusTextColor:S.PURPLE_600,graphBgColor:S.PINK_300,graphBgPatternColor:S.PURPLE_200,nodeAnchorColor:S.PINK_500,nodeAnchorColorWhenParentFocused:S.PURPLE_700,linkPreviewColor:S.PINK_900,marqueeSelectionBoxColor:S.PINK_300+"15",marqueeSelectionBoxBorderColor:S.PINK_500,marqueeEncapsulatedNodeBoxBorderColor:S.PINK_700,marqueeEncapsulatedNodeBoxColor:S.PINK_700+"05",...pt},ft={light:Mr,dark:Dr,pink:Nr},Pr=Object.keys(ft),Rl=(e,t)=>({nodeSize:e("nodeSize",t),nodeBorderWidth:e("nodeBorderWidth",t),nodeColor:e("nodeColor",t),nodeBorderColor:e("nodeBorderColor",t),nodeTextSize:e("nodeTextSize",t),nodeTextColor:e("nodeTextColor",t),nodeText:e("nodeText",t),nodeShape:e("nodeShape",t)}),Dt=(e,...t)=>typeof e=="function"?e(...t):e,Or=(e,t)=>(o,...n)=>{const r=t[o].findLast(l=>{const d=l.value;return Dt(d,...n)!==void 0}),s=(r==null?void 0:r.value)??ft[e.value][o];if(!s)throw new Error(`Theme property "${o}" not found`);return Dt(s,...n)},$r=()=>({nodeSize:[],nodeBorderWidth:[],nodeColor:[],nodeBorderColor:[],nodeFocusColor:[],nodeFocusBorderColor:[],nodeText:[],nodeFocusTextColor:[],nodeTextSize:[],nodeTextColor:[],nodeShape:[],edgeColor:[],edgeWidth:[],edgeText:[],edgeTextSize:[],edgeTextColor:[],edgeFocusTextColor:[],edgeTextFontWeight:[],edgeFocusColor:[],graphBgColor:[],graphBgPatternColor:[],nodeAnchorRadius:[],nodeAnchorColor:[],nodeAnchorColorWhenParentFocused:[],linkPreviewColor:[],linkPreviewWidth:[],marqueeSelectionBoxColor:[],marqueeSelectionBoxBorderColor:[],marqueeEncapsulatedNodeBoxColor:[],marqueeEncapsulatedNodeBoxBorderColor:[]}),st=e=>{const t={...e};for(const o in t)typeof t[o]=="object"&&(t[o]=st(t[o]));return t},bt=500,Rr={forShapes:["arrow"],durationMs:bt,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,end:(e,{start:t})=>t,textArea:e=>({color:we(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.33,properties:{textArea:e=>({color:we(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}},{progress:.9,properties:{end:e=>e,lineWidth:e=>e}}]},Mt={forShapes:["line","uturn"],durationMs:bt,easing:{lineWidth:"in-out",textArea:"in-out"},keyframes:[{progress:0,properties:{lineWidth:0,textArea:e=>({color:we(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},zr={forShapes:["circle"],durationMs:bt,easing:{radius:"in-out"},keyframes:[{progress:0,properties:{radius:0,textArea:e=>({color:we(e.color).setAlpha(0).toRgbString(),textBlock:{color:"transparent"}})}}]},Fr=e=>({arrow:{edgeAdded:e(Rr)},line:{edgeAdded:e(Mt)},uturn:{edgeAdded:e(Mt)},circle:{nodeAdded:e(zr)}}),Hr={broadcast:!0,focus:!0,history:!0,animate:!1},Ur={broadcast:!0,focus:!1,history:!0,animate:!1},Nt={broadcast:!0,history:!0},Pt={broadcast:!0,focus:!1,history:!0,animate:!1},Gr={broadcast:!1,focus:!1,history:!1,animate:!0},Kr={history:!0},Ot={broadcast:!0,history:!0},jr={broadcast:!0},Wr={broadcast:!0},qr={label:""},Yr=({emit:e})=>{const t=T([]),o=[],n=()=>{const l=o.reduce((d,a)=>a(d),[]);t.value=[...l.sort((d,a)=>d.priority-a.priority)]};return{aggregator:t,subscribeToAggregator:o,updateAggregator:n,getSchemaItemsByCoordinates:l=>t.value.sort((d,a)=>d.priority-a.priority).filter(d=>{var a,i;return d.shape.shapeHitbox(l)||((i=(a=d.shape).textHitbox)==null?void 0:i.call(a,l))}),draw:l=>{var u,p,c,m;n();const d=t.value.findLastIndex(C=>C.graphType==="edge"),a=t.value.slice(0,d+1),i=t.value.slice(d+1);for(const C of a)C.shape.drawShape(l);for(const C of a)(p=(u=C.shape).drawTextAreaMatte)==null||p.call(u,l);for(const C of a)(m=(c=C.shape).drawText)==null||m.call(c,l);for(const C of i)C.shape.draw(l);e("onDraw",l)}}},Zr="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");Array.from({length:999},(e,t)=>(t+1).toString());const Vr=(e,t)=>()=>{let o=e.value.map(({label:d})=>d),n=0,r=0,s;const l=()=>n===0?"":t[(n-1)%t.length];for(;!s;){r>=t.length&&(o=o.slice(t.length),r=0,n++);const a=l()+t[r];o.includes(a)||(s=a),r++}return s},Xr=e=>Vr(e.nodes,Zr),Jr=({nodes:e,edges:t,nodeMap:o,edgeMap:n,emit:r,settings:s,updateGraphAtMousePosition:l,updateAggregator:d,animations:a,autoAnimate:i,activeAnimations:u,draw:p,magicCanvas:c})=>{const m=k=>o.value.get(k),C=k=>n.value.get(k),I=(k,U={})=>{if(k!=null&&k.id&&m(k.id)){console.warn("prevented adding a node with an existing id, this shouldn't happen");return}const P={...Hr,...U},z=s.value.newNodeLabelGetter??Xr({nodes:e}),G={id:k.id??Me(),label:k.label??z(),x:k.x??0,y:k.y??0};return P.animate&&a.circle.nodeAdded.play({shapeId:G.id,runCount:1}),e.value.push(G),d(),l(),r("onNodeAdded",G,P),r("onStructureChange"),G},b=(k,U={})=>{if(k.length===0)return;const P={...Ur,...U},z=[];for(const G of k){const K=I(G,{focus:!1,broadcast:!1,history:!1});K&&z.push(K)}z.length!==0&&r("onBulkNodeAdded",z,P)},f=(k,U={})=>{const P={...Pt,...U},{isGraphDirected:z}=s.value,[G,K]=[m(k.from),m(k.to)];if(!G||!K)return;if(z){if(t.value.find(Q=>Q.from===k.from&&Q.to===k.to))return}else if(t.value.find(Q=>Q.from===k.from&&Q.to===k.to||Q.from===k.to&&Q.to===k.from))return;const V={...qr,id:Me(),...k};if(P.animate){const Q=K.id===G.id?"uturn":z?"arrow":"line";a[Q].edgeAdded.play({shapeId:V.id,runCount:1})}return t.value.push(V),d(),l(),r("onEdgeAdded",V,P),r("onStructureChange"),V},x=(k,U={})=>{if(k.length===0)return;const P={...Gr,...U},z=[];for(const G of k){const K=f(G,{broadcast:!1,history:!1});K&&z.push(K)}z.length!==0&&r("onBulkEdgeAdded",z,P)},E=(k,U,P={})=>{const z=m(k);if(!z)return;const G={...jr,...P};z.x=U.x,z.y=U.y,r("onNodeMoved",z,G)},h=(k,U={})=>{const P={...Wr,...U},z=i.captureFrame(()=>p(to(c.canvas)));for(const{nodeId:G,coords:K}of k)E(G,K,P);z()},y=(k,U,P={})=>{const z={...Pt,...P},G=C(k);if(!G)return;const K=G.label;G.label=U,r("onEdgeLabelEdited",G,K,z),r("onStructureChange")},v=(k,U={})=>{const P=m(k);if(!P)return;const z={...Nt,...U},G=eo(P.id,{edges:t,getEdge:C,settings:s}),K=[];for(const V of G){const X=g(V.id,{broadcast:!1,history:!1});X&&K.push(X)}return e.value=e.value.filter(V=>V.id!==P.id),u.delete(P.id),d(),l(),r("onNodeRemoved",P,K,z),r("onStructureChange"),[P,K]},_=async(k,U={})=>{if(k.length===0)return;const P={...Nt,...U},z=[],G=[];for(const K of k){const V=v(K,{broadcast:!1,history:!1});if(!V)continue;const[X,Q]=V;z.push(X),G.push(...Q)}z.length!==0&&r("onBulkNodeRemoved",z,G,P)},g=(k,U={})=>{const P=C(k);if(!P)return;const z={...Ot,...U};return t.value=t.value.filter(G=>G.id!==P.id),u.delete(P.id),d(),l(),r("onEdgeRemoved",P,z),r("onStructureChange"),P};return{getNode:m,getEdge:C,addNode:I,addEdge:f,moveNode:E,bulkMoveNode:h,editEdgeLabel:y,removeNode:v,removeEdge:g,bulkAddNode:b,bulkRemoveNode:_,bulkAddEdge:x,bulkRemoveEdge:(k,U={})=>{if(k.length===0)return;const P={...Ot,...U},z=[];for(const G of k){const K=g(G,{broadcast:!1,history:!1});K&&z.push(K)}if(z.length!==0)return r("onBulkEdgeRemoved",z,P),z}}},Qr=({subscribe:e,canvas:t,graphAtMousePosition:o})=>{const n=T(!1),r=T(!1),s=T({node:"grab",edge:"pointer","node-anchor":"grab","encapsulated-node-box":"move"}),l=T(),d=A(()=>!!l.value),a=c=>{l.value=c},i=()=>{l.value=void 0},u=c=>{var C;if(!c)return"default";if(d.value)return((C=l.value)==null?void 0:C.call(l,c))??!1?"pointer":"default";const m=s.value[c.graphType]??"default";return m==="grab"&&n.value?"grabbing":m},p=()=>{if(!t.value||r.value)return;const c=o.value.items.at(-1);t.value.style.cursor=u(c)};return e("onMouseDown",()=>{n.value=!0,p()}),e("onMouseUp",()=>{n.value=!1,p()}),e("onClick",p),e("onDblClick",p),e("onKeyUp",p),e("onKeyDown",p),e("onMouseMove",p),me(s,p,{deep:!0}),{graphToCursorMap:s,activateCursorSelectMode:a,deactivateCursorSelectMode:i,graphCursorDisabled:r}},es=(e,t)=>{const o=A(()=>{const r=new Map;for(const s of e.value)r.set(s.id,s);return r}),n=A(()=>{const r=new Map;for(const s of t.value)r.set(s.id,s);return r});return{nodeIdToNodeMap:o,edgeIdToEdgeMap:n}},ts=e=>{const t=new Map,o=new Set,n=new Map;return s=>({hold:a=>{if(o.has(`${s}-${a}`))return;const u=t.get(a)??0;u===0&&(n.set(a,e.value[a]),e.value[a]=!1),t.set(a,u+1),o.add(`${s}-${a}`)},release:a=>{if(!o.has(`${s}-${a}`))return;const i=t.get(a)??0;if(i!==0){if(i===1){const u=n.get(a);if(u===void 0)throw new Error("holdState not found");e.value[a]=u,n.delete(a)}t.set(a,i-1),o.delete(`${s}-${a}`)}}})},os=(e,t={})=>{const{canvas:o,cursorCoordinates:n}=e,r=T("light"),s=$r(),l=Or(r,s),d=T({...Br,...t}),a=ts(d),i=mr(),{subscribe:u,unsubscribe:p,emit:c}=gr(i),m=T(!0);it(e.canvas,()=>{m.value=!1}),u("onMouseDown",()=>{const N=document.activeElement;N instanceof HTMLElement&&typeof N.blur=="function"&&N.blur(),m.value=!0});const C=T([]),I=T([]),b=T({coords:{x:0,y:0},items:[]}),f=Qr({canvas:o,subscribe:u,graphAtMousePosition:b}),x=()=>b.value={coords:n.value,items:B(n.value)},E=N=>({...b.value,event:N}),h={click:N=>{N.preventDefault(),c("onClick",E(N))},mousemove:N=>{N.preventDefault(),x(),c("onMouseMove",E(N))},mousedown:N=>{N.preventDefault(),x(),c("onMouseDown",E(N))},mouseup:N=>{N.preventDefault(),x(),c("onMouseUp",E(N))},dblclick:N=>{N.preventDefault(),c("onDblClick",E(N))},contextmenu:N=>{c("onContextMenu",E(N))}},y={keydown:N=>c("onKeyDown",N),keyup:N=>c("onKeyUp",N)},{aggregator:v,subscribeToAggregator:_,updateAggregator:g,getSchemaItemsByCoordinates:B,draw:k}=Yr({emit:c}),{shapes:U,autoAnimate:P,defineTimeline:z,activeAnimations:G}=pr(),K=cr(Fr(z),d.value.animations(z)),V=N=>{const W={edges:I,getNode:J,getEdge:fe,getTheme:l,settings:d,shapes:U},ie=I.value.map(be=>hr(be,W)).filter(Boolean).map((be,Qe)=>({...be,priority:Qe*10})),Je=C.value.map(be=>yr(be,W)).filter(Boolean).map((be,Qe)=>({...be,priority:Qe*10+1e3}));return N.push(...ie),N.push(...Je),N};_.push(V),We(()=>{if(!o.value)throw new Error("canvas element not found");for(const[N,W]of Object.entries(h))o.value.addEventListener(N,W);for(const[N,W]of Object.entries(y))document.addEventListener(N,W)}),oo(()=>{if(!o.value)throw new Error("Canvas element not found");for(const[N,W]of Object.entries(h))o.value.removeEventListener(N,W);for(const[N,W]of Object.entries(y))document.removeEventListener(N,W)});const{nodeIdToNodeMap:X,edgeIdToEdgeMap:Q}=es(C,I),{getNode:J,getEdge:fe,addNode:ke,addEdge:He,moveNode:Fo,bulkMoveNode:Ho,editEdgeLabel:Uo,removeNode:Go,removeEdge:Ko,bulkAddNode:jo,bulkRemoveNode:Wo,bulkAddEdge:qo,bulkRemoveEdge:Yo}=Jr({nodes:C,edges:I,nodeMap:X,edgeMap:Q,emit:c,settings:d,updateGraphAtMousePosition:x,updateAggregator:g,animations:K,autoAnimate:P,activeAnimations:G,draw:k,magicCanvas:e}),Zo=A(()=>C.value.reduce((N,W,ie)=>(N.set(W.id,ie),N),new Map)),Vo=A(()=>I.value.reduce((N,W,ie)=>(N.set(W.id,ie),N),new Map));let Ee;u("onMouseMove",({items:N})=>{const W=N.at(-1);if(!W||W.graphType!=="node")return;const ie=J(W.id);ie!==Ee&&(c("onNodeHoverChange",ie,Ee),Ee=ie)});const Xo=N=>(Ee&&no(Ee.id,N),N);_.push(Xo);const Jo=(N,W)=>{const ie={nodes:C.value,edges:I.value};C.value=N.nodes,I.value=N.edges;const Je={...Kr,...W};c("onGraphLoaded",ie,Je),c("onStructureChange")},Qo=()=>{C.value=[],I.value=[],c("onGraphReset"),c("onStructureChange")};me(r,async(N,W)=>{c("onThemeChange",N,W)});const xt=T(st(d.value));return me(d,N=>{const W=fr(xt.value,N);W&&(xt.value=st(d.value),c("onSettingsChange",W),"isGraphDirected"in W&&c("onStructureChange"))},{deep:!0}),{nodes:C,edges:I,nodeIdToIndex:Zo,edgeIdToIndex:Vo,getNode:J,getEdge:fe,addNode:ke,addEdge:He,moveNode:Fo,bulkMoveNode:Ho,editEdgeLabel:Uo,removeNode:Go,removeEdge:Ko,bulkAddNode:jo,bulkRemoveNode:Wo,bulkAddEdge:qo,bulkRemoveEdge:Yo,getSchemaItemsByCoordinates:B,eventBus:i,subscribe:u,unsubscribe:p,emit:c,subscribeToAggregator:_,aggregator:v,updateAggregator:g,pluginHoldController:a,shapes:U,autoAnimate:P,animations:K,defineTimeline:z,baseTheme:A(()=>ft[r.value]),themeName:r,getTheme:l,themeMap:s,settings:d,load:Jo,reset:Qo,magicCanvas:e,canvasFocused:m,canvasHovered:ln(e.canvas),draw:k,graphAtMousePosition:b,updateGraphAtMousePosition:x,...f}},ns=e=>({getParentsOfNode:t=>yn(t,e),getAncestorsOfNode:t=>hn(t,e),getChildrenOfNode:t=>mn(t,e),getDescendantsOfNode:t=>gn(t,e),getConnectedNodes:t=>nt(t,e),getConnectedEdges:t=>eo(t,e),getInboundEdges:t=>vn(t,e),getOutboundEdges:t=>bn(t,e),isEdgeFlowingIntoNode:(t,o)=>fn(t,o,e),isEdgeFlowingOutOfNode:(t,o)=>pn(t,o,e),getEdgesAlongPath:(t,o)=>Qt(t,o,e),getEdgeWeight:t=>cn(t,e),getEdgeWeightFraction:t=>dn(t,e),getWeightBetweenNodes:(t,o)=>un(t,o,e)}),rs=e=>{const t=T(),o=T(),n=()=>{t.value=void 0,o.value=void 0},r=h=>{if(e.settings.value.nodeAnchors===!1)return;const y=e.getNode(h);if(!y)throw new Error("node not found");t.value=y,i(y)},s=T(),l=({items:h})=>{const y=h.at(-1);if(!y)return s.value=void 0;s.value=y.id},d=h=>{var k,U;const{getTheme:y}=e,v=y("nodeAnchorColor",h),_=y("nodeAnchorColorWhenParentFocused",h),g=y("nodeAnchorRadius",h),B=[];for(const P of a.value){const{x:z,y:G,id:K}=P,V=K===s.value||K===((k=o.value)==null?void 0:k.id),X={id:K,at:{x:z,y:G},radius:g,fillColor:V?_:v};o.value&&o.value.direction===P.direction&&(X.at.x=o.value.x,X.at.y=o.value.y);const Q=e.shapes.circle(X),J=P.id===((U=o.value)==null?void 0:U.id);B.push({id:P.id,graphType:"node-anchor",shape:Q,priority:J?1/0:99999})}return B},a=T([]),i=h=>{if(!h)return a.value=[];const{getTheme:y}=e,v=y("nodeAnchorRadius",h),_=y("nodeSize",h),g=y("nodeBorderWidth",h),B=_-v/3+g/2;a.value=[{id:"n-anchor",x:h.x,y:h.y-B,direction:"north"},{id:"e-anchor",x:h.x+B,y:h.y,direction:"east"},{id:"s-anchor",x:h.x,y:h.y+B,direction:"south"},{id:"w-anchor",x:h.x-B,y:h.y,direction:"west"}]},u=({items:h,event:y})=>{if(y.button!==_e.left)return;const v=h.at(-1);if(!v||v.graphType!=="node-anchor")return;const{id:_}=v;return a.value.find(g=>g.id===_)},p=()=>{if(!t.value||!o.value)return;const{x:h,y}=o.value,v={x:t.value.x,y:t.value.y},_={x:h,y},{getTheme:g}=e,B=g("linkPreviewColor",t.value,o.value),k=g("linkPreviewWidth",t.value,o.value);return{id:"link-preview",graphType:"link-preview",shape:e.shapes.line({id:"link-preview",start:v,end:_,fillColor:B,lineWidth:k})}},c=()=>{var _;if(o.value)return;const{items:h}=e.graphAtMousePosition.value,y=h.at(-1);if(!y)return n();if(y.graphType==="node-anchor")return;if(y.graphType!=="node")return n();const v=e.getNode(y.id);if(!v)throw new Error("anchors: node shown on screen not in graph state");v.id!==((_=t.value)==null?void 0:_.id)&&r(v.id)},m=h=>{if(!t.value)return;const y=u(h);y&&(o.value=y,e.emit("onNodeAnchorDragStart",t.value,y))},C=({coords:h})=>{if(!o.value)return;const{x:y,y:v}=h;o.value.x=y,o.value.y=v},I=()=>{if(o.value){if(!t.value)throw new Error("active anchor without parent node")}else return;e.emit("onNodeAnchorDrop",t.value,o.value),n()},b=h=>{if(!t.value)return h;const y=d(t.value);for(const v of y)h.push(v);return h},f=h=>{var B;if(!t.value||!o.value)return h;const{id:y}=t.value;no(y,h);const v=(B=h.find(k=>k.id===y))==null?void 0:B.priority;if(!v)return h;const _=p();if(!_)return h;const g={..._,priority:v-.1};return h.push(g),h};e.subscribeToAggregator.push(b),e.subscribeToAggregator.push(f);const x=()=>{e.subscribe("onNodeAdded",c),e.subscribe("onNodeRemoved",c),e.subscribe("onNodeMoved",n),e.subscribe("onNodeDrop",i),e.subscribe("onMouseMove",c),e.subscribe("onMouseMove",C),e.subscribe("onMouseMove",l),e.subscribe("onMouseDown",m),e.subscribe("onMouseUp",I)},E=()=>{e.unsubscribe("onNodeAdded",c),e.unsubscribe("onNodeRemoved",c),e.unsubscribe("onNodeMoved",n),e.unsubscribe("onNodeDrop",i),e.unsubscribe("onMouseMove",c),e.unsubscribe("onMouseMove",C),e.unsubscribe("onMouseMove",l),e.unsubscribe("onMouseDown",m),e.unsubscribe("onMouseUp",I),n()};return e.subscribe("onSettingsChange",h=>{h.nodeAnchors===!0?x():h.nodeAnchors===!1&&E()}),e.settings.value.nodeAnchors&&x(),{currentDraggingAnchor:Ie(o),parentNode:Ie(t),setParentNode:r}},go=[S.RED_600,S.BLUE_600,S.GREEN_600,S.YELLOW_600],mo=[3,6,9,12],$t=100,ss=e=>{const t=T([]),o=T([]);return{clearHistory:()=>{t.value=[],o.value=[]},undo:()=>{const a=t.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value=e.value.filter(({id:c})=>!p.includes(c)):i==="remove"&&e.value.push(...u),o.value.push(a)},redo:()=>{const a=o.value.pop();if(!a)return;const{action:i,annotations:u}=a,p=u.map(({id:c})=>c);i==="add"?e.value.push(...u):i==="remove"&&(e.value=e.value.filter(({id:c})=>!p.includes(c))),t.value.push(a)},addToUndoStack:a=>{t.value.push(a),t.value.length>$t&&t.value.shift()},addToRedoStack:a=>{o.value.push(a),o.value.length>$t&&o.value.shift()},canUndo:A(()=>t.value.length!==0),canRedo:A(()=>o.value.length!==0)}},et=10,as=ae(),is=e=>{const t=T(go[0]),o=T(mo[1]),n=T(!1),r=T(!1),s=T(),l=T(Date.now()),d=T(new Set),a=T([]),i=T([]),u=T(!1),p=T(),c=T(!1),m=ss(i),C=()=>{i.value.length!==0&&(m.addToUndoStack({action:"remove",annotations:i.value}),i.value=[])},I=()=>{s.value||(s.value=setInterval(()=>{Date.now()-l.value>50&&r.value&&a.value.length>=2&&a.value.shift()},50))},b=({coords:g,event:B})=>{if(B.button===_e.left){if(n.value){const k=Et({at:g,radius:et}).getBoundingBox(),U=i.value.filter(P=>e.shapes.scribble(P).efficientHitbox(k));for(const P of U)d.value.add(P.id)}u.value=!0,p.value=g,a.value=[g]}},f=({coords:g})=>{if(!(!u.value||!p.value)&&a.value.length!==0){if(n.value){const B=Et({at:g,radius:et}).getBoundingBox(),k=i.value.filter(U=>e.shapes.scribble(U).efficientHitbox(B));for(const U of k)d.value.add(U.id);return}p.value=g,a.value.push(g),r.value&&a.value.length>10&&a.value.shift(),r.value&&I(),l.value=Date.now()}},x=()=>{if(!u.value)return;if(u.value=!1,p.value=void 0,n.value){const B=i.value.filter(k=>d.value.has(k.id));m.addToUndoStack({action:"remove",annotations:B}),i.value=i.value.filter(k=>!d.value.has(k.id)),d.value.clear();return}if(r.value){s.value=void 0;return}const g={id:Me(),type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value};i.value.push(g),m.addToUndoStack({action:"add",annotations:[g]}),a.value=[]},E=A(()=>n.value||r.value);me(E,()=>{const g=e.magicCanvas.canvas.value;g&&(g.style.cursor=E.value?"none":"crosshair")});const h=g=>{if(!c.value)return g;if(n.value&&e.canvasHovered.value){const B="annotation-eraser-cursor",k=e.shapes.circle({id:B,at:e.graphAtMousePosition.value.coords,radius:et,fillColor:S.TRANSPARENT,stroke:{color:as.value.contrast,lineWidth:2}});g.push({graphType:"annotation-eraser",id:B,shape:k,priority:5050})}else if(a.value.length>0&&u.value){const B="annotation-incomplete",k=e.shapes.scribble({id:B,type:"draw",points:a.value,fillColor:t.value,brushWeight:o.value});g.push({graphType:"annotation",id:B,shape:k,priority:5001})}else if(r.value&&e.canvasHovered.value){const B="laser-pointer-cursor",k=e.shapes.circle({id:B,at:e.graphAtMousePosition.value.coords,radius:o.value,fillColor:t.value});g.push({graphType:"annotation",id:B,shape:k,priority:5050})}for(const B of i.value){const k=d.value.has(B.id);g.push({graphType:"annotation",id:B.id,shape:e.shapes.scribble({...B,fillColor:B.fillColor+(k?"50":"")}),priority:5e3})}return g};return e.subscribeToAggregator.push(h),{clear:C,isActive:c,annotations:i,isLaserPointing:r,isErasing:n,color:t,brushWeight:o,activate:()=>{const g=e.magicCanvas.canvas.value;g&&(c.value=!0,e.settings.value.interactive=!1,e.settings.value.marquee=!1,e.settings.value.focusable=!1,e.settings.value.draggable=!1,e.graphCursorDisabled.value=!0,g.style.cursor="crosshair",e.subscribe("onMouseDown",b),e.subscribe("onMouseMove",f),e.subscribe("onMouseUp",x))},deactivate:()=>{const g=e.magicCanvas.canvas.value;g&&(c.value=!1,n.value=!1,e.settings.value.interactive=!0,e.settings.value.marquee=!0,e.settings.value.focusable=!0,e.settings.value.draggable=!0,e.graphCursorDisabled.value=!1,g.style.cursor="default",e.unsubscribe("onMouseDown",b),e.unsubscribe("onMouseMove",f),e.unsubscribe("onMouseUp",x))},load:g=>{i.value=g},undo:m.undo,redo:m.redo,canUndo:m.canUndo,canRedo:m.canRedo}},ls=e=>{const t=A(()=>{const n=e.edges.value;return n.filter(r=>r.from!==r.to).filter(r=>n.some(s=>r.from===s.to&&r.to===s.from))}),o=A(()=>t.value.length>0);return{bidirectionalEdges:t,hasBidirectionalEdges:o}},us=e=>{const t={},o=[[],[]],n={...e};Object.keys(e).forEach(l=>{n[l]||(n[l]=[])});const r={};Object.entries(n).forEach(([l,d])=>{d.forEach(a=>{r[a]||(r[a]=[]),r[a].push(l)})});const s=l=>{const d=[l];for(t[l]=0,o[0].push(l);d.length>0;){const a=d.shift(),i=t[a],u=i===0?1:0,p=n[a]||[],c=r[a]||[],m=[...new Set([...p,...c])];for(const C of m)if(t[C]===void 0)t[C]=u,o[u].push(C),d.push(C);else if(t[C]===i)return!1}return!0};for(const l of Object.keys(n))if(t[l]===void 0&&!s(l))return;return o},ds=e=>{const t=A(()=>us(e.value)),o=A(()=>{const r=t.value,s=new Map;if(!r)return s;const[l,d]=r;for(const a of l)s.set(a,0);for(const a of d)s.set(a,1);return s}),n=A(()=>t.value!==void 0);return{bipartitePartition:t,nodeIdToBipartitePartition:o,isBipartite:n}},cs=e=>({isComplete:A(()=>{const o=e.settings.value.isGraphDirected,n=e.nodes.value.length;return e.edges.value.length===(o?n*(n-1):n*(n-1)/2)})}),ps=({adjacencyList:e,undirectedAdjacencyList:t})=>{const o=(l,d)=>{const a=new Set,i=[];for(i.push(d);i.length>0;){const u=i.shift();if(!u)break;a.add(u),l[u].forEach(c=>{a.has(c)||i.push(c)})}return a},n=l=>Object.keys(l).every(d=>o(l,d).size===Object.keys(l).length),r=A(()=>n(e.value)),s=A(()=>n(t.value));return{isConnected:r,isWeaklyConnected:s}},fs=e=>{const t=new Set,o=[],n=[],r=new Set,s=(d,a)=>{t.add(d),n.push(d),r.add(d);for(const i of e[d]||[])if(!t.has(i))s(i,d);else if(i!==a&&r.has(i)){const u=n.indexOf(i),c=[...n.slice(u)].sort();o.some(m=>l(m,c))||o.push(c)}n.pop(),r.delete(d)},l=(d,a)=>d.length!==a.length?!1:d.every(i=>a.includes(i));for(const d in e)t.has(d)||s(d,null);return o},bs=e=>{const{settings:t,stronglyConnectedComponents:o,adjacencyList:n}=e,r=A(()=>{const{isGraphDirected:d}=t.value;return d?o.value.filter(a=>a.length>1).map(a=>a.map(i=>i.id)):fs(n.value).sort((i,u)=>i.length-u.length)}),s=A(()=>r.value.reduce((d,a,i)=>{for(const u of a)d.set(u,i);return d},new Map)),l=A(()=>r.value.length===0);return{cycles:r,nodeIdToCycle:s,isAcyclic:l}};class vs{constructor(t){Te(this,"V");Te(this,"adj");Te(this,"Time");Te(this,"SCCs",[]);this.V=t,this.adj=new Array(t).fill(0).map(()=>[]),this.Time=0}addEdge(t,o){this.adj[t].push(o)}SCCUtil(t,o,n,r,s){n[t]=this.Time,o[t]=this.Time,this.Time+=1,r[t]=!0,s.push(t);for(const l of this.adj[t])n[l]===-1?(this.SCCUtil(l,o,n,r,s),o[t]=Math.min(o[t],o[l])):r[l]&&(o[t]=Math.min(o[t],n[l]));if(o[t]===n[t]){let l;const d=[];do l=s.pop(),d.push(l),r[l]=!1;while(l!==t);this.SCCs.push(d)}}SCC(){const t=new Array(this.V).fill(-1),o=new Array(this.V).fill(-1),n=new Array(this.V).fill(!1),r=[];for(let s=0;s<this.V;s++)t[s]===-1&&this.SCCUtil(s,o,t,n,r);return this.SCCs}}const gs=(e,t)=>{const o=new vs(e.length),n=e.map(s=>s.id);for(const s of t)o.addEdge(n.indexOf(s.from),n.indexOf(s.to));return o.SCC().map(s=>s.map(l=>e[l]))},ms=e=>{const{nodes:t,edges:o,adjacencyList:n}=e,r=A(()=>gs(t.value,o.value)),s=A(()=>r.value.reduce((a,i,u)=>{for(const{id:p}of i)a.set(p,u);return a},new Map)),l=A(()=>{const d=r.value,a=n.value,i=s.value;return d.reduce((u,p,c)=>{const m=p.flatMap(C=>a[C.id]??[]).filter(C=>i.get(C)!==c).map(C=>i.get(C));return u.set(c,new Set(m)),u},new Map)});return{stronglyConnectedComponents:r,nodeIdToConnectedComponent:s,componentAdjacencyMap:l}},hs=e=>{const t=ps(e),o=ls(e),n=ms(e),r=ds(e.adjacencyList),s=bs({...e,...n});return{...cs(e),...s,...n,...o,...r,...t}},ys=e=>{const t=T(),{hold:o,release:n}=e.pluginHoldController("node-drag"),r=({items:i,coords:u,event:p})=>{if(p.button!==_e.left)return;const c=i.at(-1);if(!c||c.graphType!=="node")return;o("nodeAnchors");const m=e.getNode(c.id);m&&(t.value={nodeId:m.id,coords:u},e.emit("onNodeDragStart",m))},s=()=>{if(!t.value)return;const{nodeId:i}=t.value,u=e.getNode(i);if(!u)throw new Error("dropped node not found");t.value=void 0,e.emit("onNodeDrop",u),n("nodeAnchors");const{items:p}=e.graphAtMousePosition.value,c=p.at(-1);(c==null?void 0:c.id)===u.id&&e.nodeAnchors.setParentNode(u.id)},l=({coords:i})=>{if(!t.value)return;const{nodeId:u,coords:p}=t.value,c=e.getNode(u);if(!c)throw new Error("dragged node not found");const m=i.x-p.x,C=i.y-p.y;e.moveNode(u,{x:c.x+m,y:c.y+C}),t.value.coords=i},d=()=>{e.subscribe("onMouseDown",r),e.subscribe("onMouseUp",s),e.subscribe("onMouseMove",l),e.graphToCursorMap.value.node="grab"},a=()=>{e.unsubscribe("onMouseDown",r),e.unsubscribe("onMouseUp",s),e.unsubscribe("onMouseMove",l),e.graphToCursorMap.value.node="pointer",t.value&&s()};return e.subscribe("onSettingsChange",i=>{i.draggable===!1?a():i.draggable===!0&&d()}),e.settings.value.draggable&&d(),e.settings.value.draggable||a(),{currentlyDraggingNode:A(()=>t.value?e.getNode(t.value.nodeId):void 0)}},_s=["node","edge"],ws="use-focus-graph",Cs=e=>{const{setTheme:t}=_n(e,ws),o=T(new Set),n=b=>{const f=b.filter(y=>!e.settings.value.focusBlacklist.includes(y));if(f.length===o.value.size&&f.every(y=>o.value.has(y)))return;const h=new Set([...o.value]);o.value=new Set(f),e.emit("onFocusChange",o.value,h)},r=b=>{if(o.value.has(b)||e.settings.value.focusBlacklist.includes(b))return;const E=new Set([...o.value]);o.value.add(b),e.emit("onFocusChange",o.value,E)},s=b=>{var x,E;const f=to(e.magicCanvas.canvas);(E=(x=b.shape).startTextAreaEdit)==null||E.call(x,f,h=>{const y=e.getEdge(b.id);if(!y)throw new Error("textarea only implemented for edges");const v=e.settings.value.edgeInputToLabel(h);v===void 0||y.label===v||e.editEdgeLabel(y.id,v)})},l=()=>{const b=Array.from(o.value),f=b.filter(x=>e.getNode(x)||e.getEdge(x));f.length!==b.length&&n(f)},d=({items:b,coords:f,event:x})=>{var _,g;if(x.button!==_e.left)return;const E=b.at(-1);if(!E)return x.shiftKey?void 0:a();if(((g=(_=E.shape).textHitbox)==null?void 0:g.call(_,f))&&e.settings.value.edgeLabelsEditable&&E.graphType==="edge")return a(),s(E);_s.some(B=>B===E.graphType)&&(x.shiftKey?r(E.id):n([E.id]))},a=()=>n([]),i=()=>{const b=e.nodes.value.map(x=>x.id),f=e.edges.value.map(x=>x.id);n([...b,...f])},u=({id:b},{focus:f})=>{f&&n([b])},p=b=>o.value.has(b);t("nodeColor",b=>{if(p(b.id))return e.getTheme("nodeFocusColor",b)}),t("nodeBorderColor",b=>{if(p(b.id))return e.getTheme("nodeFocusBorderColor",b)}),t("nodeTextColor",b=>{if(p(b.id))return e.getTheme("nodeFocusTextColor",b)}),t("edgeColor",b=>{if(p(b.id))return e.getTheme("edgeFocusColor",b)}),t("edgeTextColor",b=>{if(p(b.id))return e.getTheme("edgeFocusTextColor",b)}),t("nodeAnchorColor",b=>{if(p(b.id))return e.getTheme("nodeAnchorColorWhenParentFocused",b)});const c=()=>{e.subscribe("onNodeAdded",u),e.subscribe("onEdgeAdded",u),e.subscribe("onMouseDown",d),e.subscribe("onStructureChange",l)},m=()=>{e.unsubscribe("onNodeAdded",u),e.unsubscribe("onEdgeAdded",u),e.unsubscribe("onMouseDown",d),e.unsubscribe("onStructureChange",l),a()},{hold:C,release:I}=e.pluginHoldController("focus");return e.subscribe("onSettingsChange",b=>{b.focusable===!1?(m(),C("marquee")):b.focusable===!0&&(c(),I("marquee"))}),e.settings.value.focusable&&c(),{set:n,reset:a,add:r,all:i,isFocused:p,focusedItemIds:Ie(o),focusedNodes:A(()=>e.nodes.value.filter(b=>p(b.id))),focusedEdges:A(()=>e.edges.value.filter(b=>p(b.id)))}},xs=(e,t)=>{let o;return()=>{clearTimeout(o),o=setTimeout(e,t)}},Ss={focus:!0},ks={focus:!0},Rt=100,zt=3,Es=e=>{const t=T([]),o=T([]),n=b=>{t.value.push(b),t.value.length>Rt&&t.value.shift()},r=b=>{o.value.push(b),o.value.length>Rt&&o.value.shift()},s=T([]),l=T([]),a=xs(()=>{if(s.value.length===0&&l.value.length===0)return;const b=s.value.map(x=>({graphType:"node",data:x})),f=l.value.map(x=>({graphType:"edge",data:x}));n({action:"remove",affectedItems:[...b,...f]}),s.value=[],l.value=[]},250);e.subscribe("onNodeAdded",(b,{history:f})=>{f&&n({action:"add",affectedItems:[{graphType:"node",data:b}]})}),e.subscribe("onBulkNodeAdded",(b,{history:f})=>{f&&n({action:"add",affectedItems:b.map(x=>({graphType:"node",data:x}))})}),e.subscribe("onNodeRemoved",(b,f,{history:x})=>{if(!x)return;const E=f.map(h=>({graphType:"edge",data:h}));n({action:"remove",affectedItems:[{graphType:"node",data:b},...E]})}),e.subscribe("onBulkNodeRemoved",(b,f,{history:x})=>{x&&(s.value.push(...b),l.value.push(...f),a())}),e.subscribe("onEdgeLabelEdited",(b,f,{history:x})=>{x&&n({action:"edit",affectedItems:[{graphType:"edge",data:{id:b.id,from:f,to:b.label}}]})}),e.subscribe("onEdgeAdded",(b,{history:f})=>{f&&n({action:"add",affectedItems:[{graphType:"edge",data:b}]})}),e.subscribe("onBulkEdgeAdded",(b,{history:f})=>{f&&n({action:"add",affectedItems:b.map(x=>({graphType:"edge",data:x}))})}),e.subscribe("onEdgeRemoved",(b,{history:f})=>{f&&n({action:"remove",affectedItems:[{graphType:"edge",data:b}]})}),e.subscribe("onBulkEdgeRemoved",(b,{history:f})=>{f&&(l.value.push(...b),a())}),e.subscribe("onGraphLoaded",(b,{history:f})=>{if(!f)return;const x=b.nodes.map(h=>({graphType:"node",data:h})),E=b.edges.map(h=>({graphType:"edge",data:h}));n({action:"load",affectedItems:[...e.nodes.value.map(h=>({graphType:"node",data:h})),...e.edges.value.map(h=>({graphType:"edge",data:h}))],previousState:{nodes:x,edges:E}})});const i=T();e.subscribe("onGroupDragStart",(b,f)=>{i.value={startingCoordinates:f,nodes:b}}),e.subscribe("onGroupDrop",(b,f)=>{if(!i.value)throw new Error("dropped a group we didn't know was being dragged");if(i.value.nodes.length!==b.length)throw new Error("group size mismatch");const x=i.value.startingCoordinates.y-f.y,E=i.value.startingCoordinates.x-f.x;Math.sqrt(x**2+E**2)<zt||n({action:"move",affectedItems:i.value.nodes.map(y=>({graphType:"node",data:{id:y.id,from:{x:y.x+E,y:y.y+x},to:{x:y.x,y:y.y}}}))})});const u=T();e.subscribe("onNodeDragStart",b=>{u.value={id:b.id,from:{x:b.x,y:b.y},to:{x:b.x,y:b.y}}}),e.subscribe("onNodeDrop",b=>{if(!u.value)throw new Error("dropped a node we didn't know was being dragged");if(u.value.id!==b.id)throw new Error("node ID mismatch");u.value.to={x:b.x,y:b.y};const f=u.value.from.y-u.value.to.y,x=u.value.from.x-u.value.to.x;Math.sqrt(f**2+x**2)<zt||n({action:"move",affectedItems:[{graphType:"node",data:u.value}]})});const p=(b={})=>{const f=t.value.pop();if(f)return r(f),m(f),e.emit("onUndo",f,{...Ss,...b}),f},c=(b={})=>{const f=o.value.pop();if(f)return n(f),C(f),e.emit("onRedo",f,{...ks,...b}),f},m=b=>{if(b.action==="load")e.load({nodes:b.previousState.nodes.map(f=>f.data),edges:b.previousState.edges.map(f=>f.data)},{history:!1});else if(b.action==="add")for(const f of b.affectedItems)f.graphType==="node"?e.removeNode(f.data.id,{history:!1}):f.graphType==="edge"&&e.removeEdge(f.data.id,{history:!1});else if(b.action==="remove")for(const f of b.affectedItems)f.graphType==="node"?e.addNode(f.data,{history:!1,focus:!1}):f.graphType==="edge"&&e.addEdge(f.data,{history:!1,focus:!1});else if(b.action==="move"){for(const f of b.affectedItems)if(f.graphType==="node"){const{from:x,id:E}=f.data;e.moveNode(E,{x:x.x,y:x.y})}}else if(b.action==="edit")for(const f of b.affectedItems)e.editEdgeLabel(f.data.id,f.data.from,{history:!1})},C=b=>{if(b.action==="load")e.load({nodes:b.affectedItems.filter(f=>f.graphType==="node").map(f=>f.data),edges:b.affectedItems.filter(f=>f.graphType==="edge").map(f=>f.data)},{history:!1});else if(b.action==="add")for(const f of b.affectedItems)f.graphType==="node"?e.addNode(f.data,{history:!1,focus:!1}):f.graphType==="edge"&&e.addEdge(f.data,{history:!1,focus:!1});else if(b.action==="remove")for(const f of b.affectedItems)f.graphType==="node"?e.removeNode(f.data.id,{history:!1}):f.graphType==="edge"&&e.removeEdge(f.data.id,{history:!1});else if(b.action==="move"){for(const f of b.affectedItems)if(f.graphType==="node"){const{to:x,id:E}=f.data;e.moveNode(E,{x:x.x,y:x.y})}}else if(b.action==="edit")for(const f of b.affectedItems)e.editEdgeLabel(f.data.id,f.data.to,{history:!1})},I=()=>{t.value=[],o.value=[]};return{undo:p,redo:c,canUndo:A(()=>t.value.length>0),canRedo:A(()=>o.value.length>0),undoStack:t,redoStack:o,addToUndoStack:n,addToRedoStack:r,clearHistory:I}},Ts=e=>{let t=0;const o=({coords:d,items:a})=>{var c;if(!(Date.now()-t<350))return t=Date.now();t=0,((c=a.at(-1))==null?void 0:c.graphType)!=="node"&&e.addNode(d)},n=(d,a)=>{if(e.settings.value.userAddedEdgeRuleNoSelfLoops&&d.id===a.id)return!1;if(e.settings.value.userAddedEdgeRuleOneEdgePerPath){const i=e.edges.value.find(c=>c.from===d.id&&c.to===a.id),u=e.edges.value.find(c=>c.from===a.id&&c.to===d.id);if(i||u)return!1}return!0},r=d=>{const{items:a}=e.graphAtMousePosition.value,i=a.findLast(c=>c.graphType==="node");if(!i)return;const u=e.getNode(i.id);!u||!n(d,u)||e.addEdge({from:d.id,to:u.id,label:e.settings.value.userAddedEdgeLabel})},s=()=>{e.subscribe("onClick",o),e.subscribe("onNodeAnchorDrop",r),e.settings.value.nodeAnchors=!0,e.settings.value.edgeLabelsEditable=!0},l=()=>{e.unsubscribe("onClick",o),e.unsubscribe("onNodeAnchorDrop",r),e.settings.value.nodeAnchors=!1,e.settings.value.edgeLabelsEditable=!1};e.settings.value.interactive&&s(),e.settings.value.interactive||l(),e.subscribe("onSettingsChange",d=>{d.interactive===!0?s():d.interactive===!1&&l()})},As=(e,t)=>{const o={at:{x:1/0,y:1/0},width:0,height:0};if(e.length<2)return o;let n=1/0,r=1/0,s=-1/0,l=-1/0;for(const d of e){const a=t.getTheme("nodeSize",d),i=t.getTheme("nodeBorderWidth",d),u=a+i/2,{x:p,y:c}=d;n=Math.min(n,p-u),r=Math.min(r,c-u),s=Math.max(s,p+u),l=Math.max(l,c+u)}return n<1/0&&r<1/0&&s>-1/0&&l>-1/0?(o.at.x=n,o.at.y=r,o.width=s-n,o.height=l-r):(o.width=0,o.height=0),o},Ls=e=>{const t=T(),o=T(),n=T(),{hold:r,release:s}=e.pluginHoldController("marquee"),l=v=>{const{width:_,height:g}=v;return Math.abs(_*g)},d=({items:v,coords:_,event:g})=>{if(g.button!==_e.left)return;const B=v.at(-1);(B==null?void 0:B.graphType)!=="encapsulated-node-box"&&s("nodeAnchors"),B||p(_)},a=({coords:v})=>{if(!n.value)return;const _=v.x-n.value.x,g=v.y-n.value.y;n.value=v;for(const B of e.focus.focusedNodes.value)e.moveNode(B.id,{x:B.x+_,y:B.y+g});C()},i=({items:v,coords:_,event:g})=>{if(g.button!==_e.left||t.value)return;const B=v.at(-1);(B==null?void 0:B.graphType)==="encapsulated-node-box"&&(n.value=_,e.emit("onGroupDragStart",e.focus.focusedNodes.value,_))},u=()=>{n.value&&(e.emit("onGroupDrop",e.focus.focusedNodes.value,n.value),n.value=void 0)},p=v=>{r("nodeAnchors"),e.graphCursorDisabled.value=!0,t.value={at:v,width:0,height:0},e.emit("onMarqueeBeginSelection",v)},c=()=>{if(!t.value)return;const v=t.value;t.value=void 0,e.graphCursorDisabled.value=!1,s("nodeAnchors"),e.emit("onMarqueeEndSelection",v)},m=v=>{if(l(v)<100)return;const g=[];for(const{id:B,shape:k,graphType:U}of e.aggregator.value){const{marqueeSelectableGraphTypes:P}=e.settings.value;if(!P.includes(U))continue;k.efficientHitbox(v)&&g.push(B)}e.focus.set(g)},C=()=>{o.value=As(e.focus.focusedNodes.value,e)},I=({coords:v})=>{if(!t.value)return;const{x:_,y:g}=v;t.value.width=_-t.value.at.x,t.value.height=g-t.value.at.y,m(t.value)},b=v=>{const _="marquee-box",g=e.shapes.rect({id:_,...wn(v),fillColor:e.getTheme("marqueeSelectionBoxColor"),stroke:{color:e.getTheme("marqueeSelectionBoxBorderColor"),lineWidth:2}});return{id:_,graphType:"marquee-box",shape:g,priority:1/0}},f=v=>{if(!t.value)return v;const{width:_,height:g}=t.value;if(_===0||g===0)return v;const B=b(t.value);return v.push(B),v},x=v=>{const _="encapsulated-node-box",g=e.shapes.rect({id:_,...v,fillColor:e.getTheme("marqueeEncapsulatedNodeBoxColor"),stroke:{color:e.getTheme("marqueeEncapsulatedNodeBoxBorderColor"),lineWidth:2}});return{id:_,graphType:"encapsulated-node-box",shape:g,priority:1/0}},E=v=>{if(!o.value)return v;const{width:_,height:g}=o.value;if(_===0||g===0)return v;const B=x(o.value);return v.push(B),v};e.subscribeToAggregator.push(E),e.subscribeToAggregator.push(f);const h=()=>{e.subscribe("onFocusChange",C),e.subscribe("onMouseDown",d),e.subscribe("onMouseUp",c),e.subscribe("onContextMenu",c),e.subscribe("onMouseMove",I),e.subscribe("onMouseDown",i),e.subscribe("onMouseUp",u),e.subscribe("onMouseMove",a),e.subscribe("onUndo",C),e.subscribe("onRedo",C)},y=()=>{e.unsubscribe("onFocusChange",C),e.unsubscribe("onMouseDown",d),e.unsubscribe("onMouseUp",c),e.unsubscribe("onContextMenu",c),e.unsubscribe("onMouseMove",I),e.unsubscribe("onMouseDown",i),e.unsubscribe("onMouseUp",u),e.unsubscribe("onMouseMove",a),e.unsubscribe("onUndo",C),e.unsubscribe("onRedo",C),t.value&&c()};return e.subscribe("onSettingsChange",v=>{v.marquee===!0?h():v.marquee===!1&&y()}),e.settings.value.marquee&&h(),{updateEncapsulatedNodeBox:C,activelySelecting:A(()=>!!t.value)}},Bs=e=>{const t=u=>!e.settings.value.persistentBlacklist.has(u.id),o=()=>e.settings.value.persistentStorageKey,n={get:()=>{const u=Ue.get(`nodes-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`nodes-${o()}`,p)}},r={get:()=>{const u=Ue.get(`edges-${o()}`)??"[]";return JSON.parse(u)},set:u=>{const p=JSON.stringify(u.filter(t));Ue.set(`edges-${o()}`,p)}},s=async()=>{await new Promise(u=>setTimeout(u,10)),n.set(e.nodes.value),r.set(e.edges.value)},l=()=>e.load({nodes:n.get(),edges:r.get()},{history:!1}),d=["onStructureChange","onNodeDrop","onGroupDrop"],a=()=>{d.forEach(u=>e.subscribe(u,s))},i=()=>{d.forEach(u=>e.unsubscribe(u,s))};return e.subscribe("onSettingsChange",u=>{if(i(),"persistent"in u&&!u.persistent)return;if("persistent"in u&&u.persistent){l(),a();return}"persistentStorageKey"in u&&l(),a()}),e.settings.value.persistent&&(queueMicrotask(l),a()),{trackGraphState:s}};var ho=["ctrl","alt","meta","shift"],yo="__0_1_2_3_4_5_6_7_8_9_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z_ _`_'_\"_~_!_@_#_$_%_^_&_*_(_)_._-_+_=_[_]_{_}_<_>_,_/_?_;_:_\\_|_capslock_numlock_enter_tab_arrowdown_arrowleft_arrowright_arrowup_end_home_pagedown_pageup_backspace_delete_insert_escape_f1_f2_f3_f4_f5_f6_f7_f8_f9_f10_f11_f12_f13_f14_f15_f16_f17_f18_f19_f20_f21_f22_f23".split("_");yo[1]="_";var vt={};for(let[e,t]of yo.entries())vt[t]=e;var Is={space:" ",plus:"+",up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright",esc:"escape"},gt=4,Ds=9,mt=Ds+gt,Ms=2**gt,_o=2**mt,Ns=2**(2*mt),Ps=2**(3*mt);function Os(e){let t;return e==="+"?["+"]:(e.slice(-1)=="+"?(t=e.slice(0,-2).split("+"),t.push("+")):t=e.split("+"),t.map(o=>Is[o]||o))}function $s(e){let t=new Set(e),o=vt[e[e.length-1].toLowerCase()]||0;for(let n of ho)o=2*o+(t.has(n)?1:0);return o}function Ft(e){return e>>gt}function tt(e){return e%Ms}function Rs(e,t){if(e===void 0||Ft(e)>0)return!1;let o=tt(e),n=tt(t);return o===n&&Ft(t)===0?!1:(o&tt(t))===o}function zs(e){let t=vt[e.key.toLowerCase()]||0;for(let o of ho)t=2*t+(e[`${o}Key`]?1:0);return t}function Ve(e){return e.map(Os)}function Xe(e){if(e.length>4)throw"Can't encode sequence of more than 4 keys!";let t=0;for(let o of e)t=t*_o+$s(o);return t}function Fs(e){return e<_o?1:e<Ns?2:e<Ps?3:4}function Hs(e){let t=[],o=0,n=0;for(let r=e.length-1;r>=0;r--)o=2**n*e[r]+o,n=n+13,t.push(o);return t}function Us(e={}){return{history:[],historySize:0,bindings:new Map,disabledSequenceCodes:new Set,...e}}function Gs(e,t,o){let n=Xe(Ve(t));return e.bindings.has(n)||e.bindings.set(n,new Set),e.bindings.get(n).add(o),wo(e)}function Ks(e,t,o){let n=Xe(Ve(t)),r=e.bindings.get(n);return r&&(r.delete(o),r.size==0&&e.bindings.delete(n)),wo(e)}function js(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.delete(o),e}function Ws(e,t){let o=Xe(Ve(t));return e.disabledSequenceCodes.add(o),e}function qs(e,t){let o=zs(t),n=e.history.at(-1);return Rs(n,o)&&e.history.pop(),e.history.push(o),e.history.length>e.historySize&&e.history.shift(),e}function Ys(e){let t=[];for(let o of Hs(e.history))e.disabledSequenceCodes.has(o)||t.push(...e.bindings.get(o)||[]);return t}function Zs(e,t){e=qs(e,t);let o=Ys(e);for(let n of o)n(t);return[e,o]}function wo(e){e.historySize=0;for(let t of e.bindings.keys())e.historySize=Math.max(e.historySize,Fs(t));return e}var Vs=class{constructor(e){this.state=e,this.add=this.add.bind(this),this.remove=this.remove.bind(this),this.handle=this.handle.bind(this)}add(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=Gs(this.state,t,o),this}remove(...e){let t=e.slice(0,-1),o=e.at(-1);return this.state=Ks(this.state,t,o),this}enable(...e){return this.state=js(this.state,e),this}disable(...e){return this.state=Ws(this.state,e),this}handle(e){let[t,o]=Zs(this.state,e);return this.state=t,o.length>0}};function Co(){return new Vs(Us())}var ht=Co;const at=window.navigator.userAgent.includes("Mac")?"Mac":"Windows",Xs=e=>{const{settings:t}=e,o=ht(),n=()=>{if(e.annotation.isActive.value&&e.annotation.undo(),t.value.interactive){const y=e.history.undo();if(!y)return;e.focus.set(y.affectedItems.map(v=>v.data.id))}},r=()=>{if(e.annotation.isActive.value){e.annotation.redo();return}if(t.value.interactive){const y=e.history.redo();if(!y)return;e.focus.set(y.affectedItems.map(v=>v.data.id))}},s=()=>e.focus.reset(),l=()=>e.focus.all(),d=()=>{t.value.interactive!==!1&&(e.bulkRemoveNode([...e.focus.focusedItemIds.value]),e.bulkRemoveEdge([...e.focus.focusedItemIds.value]))},a=(y,v)=>v===!1?()=>{}:typeof v=="function"?v:y,i={fn:()=>console.warn("not implemented")},u={fn:()=>console.warn("not implemented")},p={fn:()=>console.warn("not implemented")},c={fn:()=>console.warn("not implemented")},m={fn:()=>console.warn("not implemented")},C={fn:()=>console.warn("not implemented")},I={fn:()=>console.warn("not implemented")},b=()=>{i.fn=a(r,t.value.shortcutRedo),u.fn=a(n,t.value.shortcutUndo),p.fn=a(s,t.value.shortcutEscape),c.fn=a(l,t.value.shortcutSelectAll),m.fn=a(d,e.settings.value.shortcutDelete),C.fn=a(e.magicCanvas.camera.actions.zoomIn,t.value.shortcutZoomIn),I.fn=a(e.magicCanvas.camera.actions.zoomOut,t.value.shortcutZoomOut)},f={Mac:{Undo:{binding:"meta+z",trigger:()=>u.fn()},Redo:{binding:"meta+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>m.fn()},"Select All":{binding:"meta+a",trigger:()=>c.fn()},Deselect:{binding:"esc",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>C.fn()},"Zoom Out":{binding:"-",trigger:()=>I.fn()}},Windows:{Undo:{binding:"ctrl+z",trigger:()=>u.fn()},Redo:{binding:"ctrl+shift+z",trigger:()=>i.fn()},Delete:{binding:"backspace",trigger:()=>m.fn()},"Select All":{binding:"ctrl+a",trigger:()=>c.fn()},Deselect:{binding:"escape",trigger:()=>p.fn()},"Zoom In":{binding:"=",trigger:()=>C.fn()},"Zoom Out":{binding:"-",trigger:()=>I.fn()}}},x=Object.values(f[at]);for(const y of x){const v=y.binding;o.add(v,_=>{_==null||_.preventDefault(),y.trigger()})}const E=()=>{e.subscribe("onKeyDown",o.handle),e.subscribe("onSettingsChange",b)},h=()=>{e.unsubscribe("onKeyDown",o.handle),e.unsubscribe("onSettingsChange",b)};return t.value.shortcuts&&E(),e.subscribe("onSettingsChange",y=>{y.shortcuts===!0?E():y.shortcuts===!1&&h()}),{activeShortcuts:f[at],trigger:{delete:m,selectAll:c,escape:p,redo:i,undo:u}}},ot="auto",Js=e=>{const t=Cn(),o=xn(Sn.preferredTheme,ot);return me(t,()=>{o.value==="auto"&&(e.themeName.value=t.value?"dark":"light")},{immediate:!0}),me(o,()=>{[...Pr,"auto"].includes(o.value)||(console.warn("unrecognized preferred-theme in localStorage: falling back to",ot),o.value=ot),o.value==="auto"?e.themeName.value=t.value?"dark":"light":e.themeName.value=o.value},{immediate:!0}),{preferredTheme:o}},Ht=(e,t)=>{const o=Object.keys(e).length,n=Array.from({length:o},()=>Array(o).fill(0));for(const[r,s]of Object.entries(e)){const l=t.get(r);for(const d of s){const a=t.get(d.id);n[l][a]=d.weight}}return n},Qs=e=>{const{weightedAdjacencyList:t,weightedFracAdjacencyList:o}=e.adjacencyList,n=A(()=>Ht(t.value,e.nodeIdToIndex.value)),r=A(()=>Ht(o.value,e.nodeIdToIndex.value));return{transitionMatrix:n,fracTransitionMatrix:r}},ea=(e,t={})=>{const o=os(e,t),n=Cs(o),r=Es(o),s=Ls({...o,focus:n}),l=rs({...o,focus:n}),d=ys({...o,nodeAnchors:l}),a=is(o),i=Bs(o),u=Js(o),p=Xs({...o,history:r,focus:n,annotation:a}),c=kn(o),m=Qs({...o,adjacencyList:c}),C=hs({...o,...c});Ts(o);const I=ns(o);return{...o,focus:n,history:r,marquee:s,nodeDrag:d,nodeAnchors:l,annotation:a,persistent:i,...u,adjacencyList:c,transitionMatrix:m,characteristics:C,shortcut:p,helpers:I}},ta=e=>{const{subscribe:t,getTheme:o}=e,n=T(o("graphBgPatternColor")),r=T(o("graphBgColor"));return t("onThemeChange",async()=>{n.value=o("graphBgPatternColor"),r.value=o("graphBgColor")}),{patternColor:Ie(n),bgColor:Ie(r)}},zl=(e={})=>{const t=on({storageKey:e.persistentStorageKey}),o=ea(t,e),{bgColor:n,patternColor:r}=ta(o);t.draw.content.value=o.draw,t.draw.backgroundPattern.value=(l,d,a)=>br({at:d,size:12,lineWidth:1,fillColor:r.value+a}).draw(l);const s=A(()=>({style:{backgroundColor:n.value}}));return{canvas:t,graph:o,css:s}},xo=e=>({nodes:e.nodes.value,edges:e.edges.value,annotations:e.annotation.annotations.value,cameraPanX:e.magicCanvas.camera.state.panX.value,cameraPanY:e.magicCanvas.camera.state.panY.value,cameraZoom:e.magicCanvas.camera.state.zoom.value}),So=(e,t)=>{e.load({nodes:t.nodes,edges:t.edges}),e.annotation.load(t.annotations);const{state:o}=e.magicCanvas.camera;o.panX.value=t.cameraPanX,o.panY.value=t.cameraPanY,o.zoom.value=t.cameraZoom},pe=10,ko="1",Eo="",je="",he="",oa=e=>{const{nodes:t,edges:o,cameraPanX:n,cameraPanY:r,cameraZoom:s}=e,l=t.reduce((p,c)=>{const m=Math.round(c.x/pe),C=Math.round(c.y/pe);return p+`${je}${c.label}${he}${m}${he}${C}`},"").slice(1),d=o.reduce((p,c)=>{const m=t.findIndex(b=>b.id===c.from),C=t.findIndex(b=>b.id===c.to),I=c.label===ko?"":`${he}${c.label}`;return p+`${je}${m}${he}${C}`+I},"").slice(1),a=Math.round(n/pe),i=Math.round(r/pe),u=s.toFixed(2);return[l,d,a,i,u].join(Eo)},na=e=>{const[t,o,n,r,s]=e.split(Eo),l=t?t.split(je).map(a=>{const[i,u,p]=a.split(he);return{id:Me(),label:i,x:Number(u)*pe,y:Number(p)*pe}}):[],d=o?o.split(je).map(a=>{const[i,u,p]=a.split(he);return{id:Me(),label:p??ko,from:l[Number(i)].id,to:l[Number(u)].id}}):[];return{nodes:l,edges:d,cameraPanX:Number(n)*pe,cameraPanY:Number(r)*pe,cameraZoom:Number(s),annotations:[]}},ra=Object.assign({"/src/menu/info.ts":On,"/src/playground/shape/info.ts":Pn,"/src/products/basic-search/info.ts":Nn,"/src/products/binary-trees/info.ts":Mn,"/src/products/dijkstras/info.ts":Dn,"/src/products/markov-chains-legacy/info.ts":In,"/src/products/markov-chains/info.ts":Bn,"/src/products/min-spanning-tree/info.ts":Ln,"/src/products/network-flow/info.ts":An,"/src/products/sandbox/info.ts":Tn,"/src/products/set-visualizer/info.ts":En}),Fe=Object.values(ra).flatMap(e=>e.default);Fe.map(e=>e.route);const Fl=Fe.reduce((e,t)=>(e[t.productId]=t,e),{}),yt=Fe.reduce((e,t)=>(e[t.route.path]=t,e),{}),sa=e=>Fe.map(n=>n.simulations).filter(Boolean).map(n=>n(e)).flat(),aa=(e,t)=>{const o=Se();if(!t){const r=yt[o.path];if(!r)throw new Error(`product not found for ${o.path}`);t=r.simulations}return(t??sa)(e)},ia=()=>{const e=Se(),t=ro(),o=s=>{const l=e.query.rid;return typeof l=="string"&&l.length>0?`${s}?rid=${l}`:s},n=async s=>{var a,i;const l=(i=(a=s.route)==null?void 0:a.redirect)==null?void 0:i.toString(),d=l==null?void 0:l.startsWith("http");if(l&&d)return window.open(l,"_blank");await t.push(o(s.route.path))};return{navigate:n,navigateWithGraph:async s=>{const l=xo(re.value);await n(s),await new Promise(d=>setTimeout(d,0)),So(re.value,l)},productLink:o}},Ut=["sandbox","algorithms","data structures","math","developer tools"],la=()=>{const e=Se();return yt[e.path]},ua=e=>"redirect"in e.route;var To={exports:{}};(function(e){var t=function(){var o=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function l(a,i){if(!s[a]){s[a]={};for(var u=0;u<a.length;u++)s[a][a.charAt(u)]=u}return s[a][i]}var d={compressToBase64:function(a){if(a==null)return"";var i=d._compress(a,6,function(u){return n.charAt(u)});switch(i.length%4){default:case 0:return i;case 1:return i+"===";case 2:return i+"==";case 3:return i+"="}},decompressFromBase64:function(a){return a==null?"":a==""?null:d._decompress(a.length,32,function(i){return l(n,a.charAt(i))})},compressToUTF16:function(a){return a==null?"":d._compress(a,15,function(i){return o(i+32)})+" "},decompressFromUTF16:function(a){return a==null?"":a==""?null:d._decompress(a.length,16384,function(i){return a.charCodeAt(i)-32})},compressToUint8Array:function(a){for(var i=d.compress(a),u=new Uint8Array(i.length*2),p=0,c=i.length;p<c;p++){var m=i.charCodeAt(p);u[p*2]=m>>>8,u[p*2+1]=m%256}return u},decompressFromUint8Array:function(a){if(a==null)return d.decompress(a);for(var i=new Array(a.length/2),u=0,p=i.length;u<p;u++)i[u]=a[u*2]*256+a[u*2+1];var c=[];return i.forEach(function(m){c.push(o(m))}),d.decompress(c.join(""))},compressToEncodedURIComponent:function(a){return a==null?"":d._compress(a,6,function(i){return r.charAt(i)})},decompressFromEncodedURIComponent:function(a){return a==null?"":a==""?null:(a=a.replace(/ /g,"+"),d._decompress(a.length,32,function(i){return l(r,a.charAt(i))}))},compress:function(a){return d._compress(a,16,function(i){return o(i)})},_compress:function(a,i,u){if(a==null)return"";var p,c,m={},C={},I="",b="",f="",x=2,E=3,h=2,y=[],v=0,_=0,g;for(g=0;g<a.length;g+=1)if(I=a.charAt(g),Object.prototype.hasOwnProperty.call(m,I)||(m[I]=E++,C[I]=!0),b=f+I,Object.prototype.hasOwnProperty.call(m,b))f=b;else{if(Object.prototype.hasOwnProperty.call(C,f)){if(f.charCodeAt(0)<256){for(p=0;p<h;p++)v=v<<1,_==i-1?(_=0,y.push(u(v)),v=0):_++;for(c=f.charCodeAt(0),p=0;p<8;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1}else{for(c=1,p=0;p<h;p++)v=v<<1|c,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=0;for(c=f.charCodeAt(0),p=0;p<16;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1}x--,x==0&&(x=Math.pow(2,h),h++),delete C[f]}else for(c=m[f],p=0;p<h;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1;x--,x==0&&(x=Math.pow(2,h),h++),m[b]=E++,f=String(I)}if(f!==""){if(Object.prototype.hasOwnProperty.call(C,f)){if(f.charCodeAt(0)<256){for(p=0;p<h;p++)v=v<<1,_==i-1?(_=0,y.push(u(v)),v=0):_++;for(c=f.charCodeAt(0),p=0;p<8;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1}else{for(c=1,p=0;p<h;p++)v=v<<1|c,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=0;for(c=f.charCodeAt(0),p=0;p<16;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1}x--,x==0&&(x=Math.pow(2,h),h++),delete C[f]}else for(c=m[f],p=0;p<h;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1;x--,x==0&&(x=Math.pow(2,h),h++)}for(c=2,p=0;p<h;p++)v=v<<1|c&1,_==i-1?(_=0,y.push(u(v)),v=0):_++,c=c>>1;for(;;)if(v=v<<1,_==i-1){y.push(u(v));break}else _++;return y.join("")},decompress:function(a){return a==null?"":a==""?null:d._decompress(a.length,32768,function(i){return a.charCodeAt(i)})},_decompress:function(a,i,u){var p=[],c=4,m=4,C=3,I="",b=[],f,x,E,h,y,v,_,g={val:u(0),position:i,index:1};for(f=0;f<3;f+=1)p[f]=f;for(E=0,y=Math.pow(2,2),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;switch(E){case 0:for(E=0,y=Math.pow(2,8),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;_=o(E);break;case 1:for(E=0,y=Math.pow(2,16),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;_=o(E);break;case 2:return""}for(p[3]=_,x=_,b.push(_);;){if(g.index>a)return"";for(E=0,y=Math.pow(2,C),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;switch(_=E){case 0:for(E=0,y=Math.pow(2,8),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;p[m++]=o(E),_=m-1,c--;break;case 1:for(E=0,y=Math.pow(2,16),v=1;v!=y;)h=g.val&g.position,g.position>>=1,g.position==0&&(g.position=i,g.val=u(g.index++)),E|=(h>0?1:0)*v,v<<=1;p[m++]=o(E),_=m-1,c--;break;case 2:return b.join("")}if(c==0&&(c=Math.pow(2,C),C++),p[_])I=p[_];else if(_===m)I=x+x.charAt(0);else return null;b.push(I),p[m++]=x+I.charAt(0),c--,x=I,c==0&&(c=Math.pow(2,C),C++)}}};return d}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(To);var Ao=To.exports;const Lo="g",da=e=>{const t=yt[e];if(!t)throw new Error(`no product found for route ${e}`);return t},ca=(e,t)=>{const o=ro(),n=Se(),r=so(),s=()=>{const d=at==="Mac"?"⌘+Z":"Ctrl+Z";r.add({summary:`Loaded graph from link successfully. Press ${d} to undo.`,severity:"success",life:5e3})},l=()=>r.add({summary:"Failed to load graph from link 😕",severity:"error",life:5e3});if(o.replace({path:n.path,query:{}}),typeof t!="string"){console.error("graph share failed - serialized transit data not a string"),l();return}try{const d=Ao.decompressFromEncodedURIComponent(t),a=na(d);setTimeout(()=>So(e,a),0),s()}catch{console.error("graph share failed - could not parse graph transit data"),l()}},pa=(e,t)=>{const o=Se();t||(t=da(o.path));const{connectToRoom:n}=Rn,r=o.query.rid,{productId:s,name:l}=t;document.title=`${l} - Magic Graphs`,$n.value=e;const d=o.query[Lo];return d&&ca(e,d),We(()=>{if(r){if(typeof r!="string")return console.error("room id must be a string");n({graph:e,roomId:r,productId:s})}}),oo(()=>{var a;(a=t.state)==null||a.reset()}),t},Be=F({__name:"ToolbarButtonGroup",setup(e){const t=vr(),o=["flex","items-center","relative","gap-1"],n=A(()=>nn(o,t.value));return(r,s)=>(w(),$("div",{class:Y(n.value)},[H(r.$slots,"default")],2))}}),Hl="element-highlight",Ul=1e3,fa=1e3,ba={class:"text-3xl font-bold"},Gt=300,va=F({__name:"TutorialHint",props:{tutorial:{}},setup(e){const t=T(0),o=A(()=>{var s;return((s=e.tutorial.sequence.value[e.tutorial.step.value])==null?void 0:s.hint)??""}),n=T("");let r;return me(o,()=>{t.value=0,clearTimeout(r),r=setTimeout(()=>{n.value=o.value,t.value=1},Gt+fa)},{immediate:!0}),(s,l)=>(w(),$("div",{class:Y(["transition-opacity",`duration-[${Gt}ms]`,"select-none","text-center"]),style:ee({opacity:t.value})},[H(s.$slots,"default",{hint:n.value},()=>[M("h1",ba,q(n.value),1)])],6))}}),Bo=F({__name:"ToolbarHint",props:{color:{default:S.WHITE+"75"},tutorial:{}},setup(e){return(t,o)=>(w(),R(va,{tutorial:t.tutorial},{default:D(({hint:n})=>[M("h5",{style:ee({color:t.color}),class:"text-sm"},q(n),5)]),_:1},8,["tutorial"]))}}),ga={class:"flex flex-col gap-2"},ma=F({__name:"ToolbarBase",props:{color:{default:S.GRAY_800},hint:{default:void 0}},setup(e){return(t,o)=>(w(),$("div",ga,[M("div",{style:ee({backgroundColor:t.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[H(t.$slots,"default")],4),H(t.$slots,"hint",{},()=>[t.hint?(w(),R(Bo,{key:0,tutorial:t.hint},null,8,["tutorial"])):Z("",!0)])]))}}),ha=F({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const t=ae();return(o,n)=>(w(),R(Bo,{tutorial:o.tutorial,color:O(t).text+"75"},null,8,["tutorial","color"]))}}),ya={class:"absolute w-full translate-y-14 pointer-events-none"},_t=F({__name:"GToolbarBase",props:{hint:{}},setup(e){const t=ae();return(o,n)=>(w(),R(ma,{hint:o.hint,color:O(t).primary},{hint:D(()=>[M("div",ya,[o.hint?(w(),R(ha,{key:0,tutorial:o.hint},null,8,["tutorial"])):Z("",!0)])]),default:D(()=>[H(o.$slots,"default")]),_:3},8,["hint","color"]))}}),_a=e=>A(()=>{const t=we(e.value);if(!t.isValid())throw new Error("invalid color");return t}),wa=["disabled"],Ca=F({__name:"ToolbarButton",props:{color:{default:S.GRAY_800},active:{type:Boolean,default:!1},activeColor:{default:S.GRAY_900},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const t=e,o=zn(t,"color"),n=_a(o),r=A(()=>n.value.darken(5).toHexString()),s=A(()=>t.activeColor?t.activeColor:n.value.darken(10).toHexString()),l=A(()=>{if(!t.disabled)return t.active?s.value:u.value?r.value:t.color}),d=A(()=>{const p=n.value.isDark()?S.WHITE:S.BLACK;return t.disabled?p+"80":p}),a=A(()=>({color:d.value,backgroundColor:l.value,cursor:t.disabled?"not-allowed":"pointer"})),i=["p-1","rounded-md","grid","place-items-center","w-10","h-10"],u=T(!1);return(p,c)=>(w(),$("button",{onMouseenter:c[0]||(c[0]=m=>u.value=!0),onMouseleave:c[1]||(c[1]=m=>u.value=!1),disabled:p.disabled,class:Y(i),style:ee(a.value)},[H(p.$slots,"default",{},()=>[L(oe,{icon:p.icon},null,8,["icon"])])],44,wa))}}),ce=F({__name:"GToolbarButton",setup(e){const t=ae(),o=A(()=>t.value.primary),n=A(()=>re.value.themeName.value==="dark"?t.value.tertiary:t.value.secondary);return(r,s)=>(w(),R(Ca,j(r.$props,{color:o.value,"active-color":n.value}),{default:D(()=>[H(r.$slots,"default")]),_:3},16,["color","active-color"]))}}),xa=F({__name:"ToolbarDivider",props:{color:{default:S.GRAY_100+"20"}},setup(e){return(t,o)=>(w(),$("div",{style:ee({backgroundColor:t.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),Kt=F({__name:"GToolbarDivider",setup(e){const t=ae();return(o,n)=>(w(),R(xa,j(o.$props,{color:O(t).text+"30"}),null,16,["color"]))}}),Sa={class:Y(["rounded-full","p-[3px]"])},ka=F({__name:"AnnotationToolbar",setup(e){const{clear:t,brushWeight:o,isErasing:n,color:r,isLaserPointing:s}=re.value.annotation,l=c=>{r.value=c,n.value=!1,s.value=!1},d=c=>{o.value=c,n.value=!1,s.value=!1},a=c=>n.value||s.value?!1:r.value===c,i=c=>n.value?!1:o.value===c,u=()=>{n.value=!n.value,s.value=!1},p=()=>{s.value=!s.value,n.value=!1};return(c,m)=>(w(),R(_t,null,{default:D(()=>[L(Be,null,{default:D(()=>[(w(!0),$(se,null,de(O(go),C=>(w(),R(ce,{key:C,onClick:I=>l(C),active:a(C)},{default:D(()=>[M("div",Sa,[M("div",{style:ee({backgroundColor:C}),class:Y(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),L(Kt),L(Be,null,{default:D(()=>[(w(!0),$(se,null,de(O(mo),(C,I)=>(w(),R(ce,{key:C,onClick:b=>d(C),active:i(C)},{default:D(()=>[M("div",{class:Y(["bg-gray-400","rounded-md","w-[15px]"]),style:ee({height:`${I*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),L(Kt),L(Be,null,{default:D(()=>[L(ce,{onClick:p,active:O(s),icon:"laser-pointer"},null,8,["active"]),L(ce,{onClick:u,active:O(n),icon:"eraser"},null,8,["active"]),L(ce,{onClick:O(t),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var Ea=ze.extend({name:"focustrap-directive"}),Ta=Fn.extend({style:Ea});function Ne(e){"@babel/helpers - typeof";return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ne(e)}function jt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),o.push.apply(o,n)}return o}function Wt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?jt(Object(o),!0).forEach(function(n){Aa(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):jt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function Aa(e,t,o){return(t=La(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function La(e){var t=Ba(e,"string");return Ne(t)=="symbol"?t:t+""}function Ba(e,t){if(Ne(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Ne(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Io=Ta.extend("focustrap",{mounted:function(t,o){var n=o.value||{},r=n.disabled;r||(this.createHiddenFocusableElements(t,o),this.bind(t,o),this.autoElementFocus(t,o)),t.setAttribute("data-pd-focustrap",!0),this.$el=t},updated:function(t,o){var n=o.value||{},r=n.disabled;r&&this.unbind(t)},unmounted:function(t){this.unbind(t)},methods:{getComputedSelector:function(t){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(t??"")},bind:function(t,o){var n=this,r=o.value||{},s=r.onFocusIn,l=r.onFocusOut;t.$_pfocustrap_mutationobserver=new MutationObserver(function(d){d.forEach(function(a){if(a.type==="childList"&&!t.contains(document.activeElement)){var i=function(p){var c=Tt(p)?Tt(p,n.getComputedSelector(t.$_pfocustrap_focusableselector))?p:Ae(t,n.getComputedSelector(t.$_pfocustrap_focusableselector)):Ae(p);return ao(c)?c:p.nextSibling&&i(p.nextSibling)};ve(i(a.nextSibling))}})}),t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_mutationobserver.observe(t,{childList:!0}),t.$_pfocustrap_focusinlistener=function(d){return s&&s(d)},t.$_pfocustrap_focusoutlistener=function(d){return l&&l(d)},t.addEventListener("focusin",t.$_pfocustrap_focusinlistener),t.addEventListener("focusout",t.$_pfocustrap_focusoutlistener)},unbind:function(t){t.$_pfocustrap_mutationobserver&&t.$_pfocustrap_mutationobserver.disconnect(),t.$_pfocustrap_focusinlistener&&t.removeEventListener("focusin",t.$_pfocustrap_focusinlistener)&&(t.$_pfocustrap_focusinlistener=null),t.$_pfocustrap_focusoutlistener&&t.removeEventListener("focusout",t.$_pfocustrap_focusoutlistener)&&(t.$_pfocustrap_focusoutlistener=null)},autoFocus:function(t){this.autoElementFocus(this.$el,{value:Wt(Wt({},t),{},{autoFocus:!0})})},autoElementFocus:function(t,o){var n=o.value||{},r=n.autoFocusSelector,s=r===void 0?"":r,l=n.firstFocusableSelector,d=l===void 0?"":l,a=n.autoFocus,i=a===void 0?!1:a,u=Ae(t,"[autofocus]".concat(this.getComputedSelector(s)));i&&!u&&(u=Ae(t,this.getComputedSelector(d))),ve(u)},onFirstHiddenElementFocus:function(t){var o,n=t.currentTarget,r=t.relatedTarget,s=r===n.$_pfocustrap_lasthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(r))?Ae(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_lasthiddenfocusableelement;ve(s)},onLastHiddenElementFocus:function(t){var o,n=t.currentTarget,r=t.relatedTarget,s=r===n.$_pfocustrap_firsthiddenfocusableelement||!((o=this.$el)!==null&&o!==void 0&&o.contains(r))?Hn(n.parentElement,this.getComputedSelector(n.$_pfocustrap_focusableselector)):n.$_pfocustrap_firsthiddenfocusableelement;ve(s)},createHiddenFocusableElements:function(t,o){var n=this,r=o.value||{},s=r.tabIndex,l=s===void 0?0:s,d=r.firstFocusableSelector,a=d===void 0?"":d,i=r.lastFocusableSelector,u=i===void 0?"":i,p=function(I){return Un("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:l,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:I==null?void 0:I.bind(n)})},c=p(this.onFirstHiddenElementFocus),m=p(this.onLastHiddenElementFocus);c.$_pfocustrap_lasthiddenfocusableelement=m,c.$_pfocustrap_focusableselector=a,c.setAttribute("data-pc-section","firstfocusableelement"),m.$_pfocustrap_firsthiddenfocusableelement=c,m.$_pfocustrap_focusableselector=u,m.setAttribute("data-pc-section","lastfocusableelement"),t.prepend(c),t.append(m)}}}),Ge=Gn(),Ia=qe`
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
`,Da={root:"p-popover p-component",content:"p-popover-content"},Ma=ze.extend({name:"popover",style:Ia,classes:Da}),Na={name:"BasePopover",extends:Ye,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:Ma,provide:function(){return{$pcPopover:this,$parentInstance:this}}},Do={name:"Popover",extends:Na,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(t){t?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&ye.clear(this.container),this.overlayEventListener&&(Ge.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(t,o){this.visible?this.hide():this.show(t,o)},show:function(t,o){this.visible=!0,this.eventTarget=t.currentTarget,this.target=o||t.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(t){var o=this;co(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&ye.set("overlay",t,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(n){o.container.contains(n.target)&&(o.selfClick=!0)},this.focus(),Ge.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),Ge.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&ye.clear(t)},alignOverlay:function(){qn(this.container,this.target,!1);var t=At(this.container),o=At(this.target),n=0;t.left<o.left&&(n=o.left-t.left),this.container.style.setProperty(ut("popover.arrow.left").name,"".concat(n,"px")),t.top<o.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&uo(this.container,"p-popover-flipped"))},onContentKeydown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.hide(),ve(this.target))},onButtonKeydown:function(t){switch(t.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":t.preventDefault()}},focus:function(){var t=this.container.querySelector("[autofocus]");t&&t.focus()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var t=this;!this.outsideClickListener&&Wn()&&(this.outsideClickListener=function(o){t.visible&&!t.selfClick&&!t.isTargetClicked(o)&&(t.visible=!1),t.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new jn(this.target,function(){t.visible&&(t.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.visible&&!Kn()&&(t.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(t){return this.eventTarget&&(this.eventTarget===t.target||this.eventTarget.contains(t.target))},containerRef:function(t){this.container=t},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",lo(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(t){Ge.emit("overlay-click",{originalEvent:t,target:this.target})}},directives:{focustrap:Io,ripple:lt},components:{Portal:io}},Pa=["aria-modal"];function Oa(e,t,o,n,r,s){var l=De("Portal"),d=dt("focustrap");return w(),R(l,{appendTo:e.appendTo},{default:D(function(){return[L(po,j({name:"p-popover",onEnter:s.onEnter,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave},e.ptm("transition")),{default:D(function(){return[r.visible?Ze((w(),$("div",j({key:0,ref:s.containerRef,role:"dialog","aria-modal":r.visible,onClick:t[3]||(t[3]=function(){return s.onOverlayClick&&s.onOverlayClick.apply(s,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?H(e.$slots,"container",{key:0,closeCallback:s.hide,keydownCallback:function(i){return s.onButtonKeydown(i)}}):(w(),$("div",j({key:1,class:e.cx("content"),onClick:t[0]||(t[0]=function(){return s.onContentClick&&s.onContentClick.apply(s,arguments)}),onMousedown:t[1]||(t[1]=function(){return s.onContentClick&&s.onContentClick.apply(s,arguments)}),onKeydown:t[2]||(t[2]=function(){return s.onContentKeydown&&s.onContentKeydown.apply(s,arguments)})},e.ptm("content")),[H(e.$slots,"default")],16))],16,Pa)),[[d]]):Z("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}Do.render=Oa;const wt=F({__name:"Popover",props:{offset:{default:12}},setup(e){const t=T(),o=r=>{t.value.toggle(r)},n=T(!1);return(r,s)=>(w(),$(se,null,[H(r.$slots,"activator",{toggle:o,isOpen:n.value}),L(O(Do),{ref_key:"op",ref:t,onShow:s[0]||(s[0]=l=>n.value=!0),onHide:s[1]||(s[1]=l=>n.value=!1),unstyled:""},{default:D(()=>[M("div",{style:ee({transform:`translateY(${r.offset}px)`})},[H(r.$slots,"default")],4)]),_:3},512)],64))}}),ne=F({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const t=ae(),o=e,n=A(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:o.contrast?t.value.contrast:t.value.primary);return(r,s)=>(w(),R(vo,{color:n.value},{default:D(()=>[H(r.$slots,"default")]),_:3},8,["color"]))}}),$a=F({__name:"Well",props:{color:{default:S.GRAY_800},textColor:{default:S.WHITE}},setup(e){return(t,o)=>(w(),$("div",{style:ee({backgroundColor:t.color,color:t.textColor})},[H(t.$slots,"default")],4))}}),xe=F({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const t=ae(),o=e,n=A(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(r,s)=>(w(),R($a,j(r.$attrs,{color:n.value,"text-color":O(t).text}),{default:D(()=>[H(r.$slots,"default")]),_:3},16,["color","text-color"]))}}),Ra={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},za=["src"],Fa={class:"flex flex-col gap-1"},Ha={class:"text-lg font-bold"},Ua={class:"text-sm opacity-80"},Ga=F({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:S.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const t=e,o=A(()=>{if(t.hoverColor)return t.hoverColor;const s=we(t.color);return(s.isDark()?s.lighten(10):s.darken(10)).toHexString()}),n=A(()=>r.value?o.value:t.color),r=T(!1);return(s,l)=>(w(),$("button",{onMouseenter:l[0]||(l[0]=d=>r.value=!0),onMouseleave:l[1]||(l[1]=d=>r.value=!1),style:ee({backgroundColor:n.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[M("div",Ra,[s.imageSrc?(w(),$("img",{key:0,src:s.imageSrc,class:"rounded-md object-cover w-full h-full"},null,8,za)):Z("",!0)]),M("div",Fa,[M("h1",Ha,q(s.title),1),M("p",Ua,q(s.description),1)])],36))}}),Mo=F({__name:"GVerticalCardButton",setup(e){const t=ae();return(o,n)=>(w(),R(Ga,j(o.$attrs,{color:O(t).primary,"hover-color":O(t).secondary}),null,16,["color","hover-color"]))}}),Ka={key:0,class:"flex items-center gap-3"},ja=F({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:t,navigateWithGraph:o}=ia(),n=la(),r=e,s=T(!1),l=T("");setTimeout(()=>{l.value=r.product.menu.thumbnail},fo(0,100));const d=A(()=>{const a=r.product.menu.allowGoWithGraph??!0;return!ua(r.product)&&a});return(a,i)=>(w(),$("div",{onMouseenter:i[2]||(i[2]=u=>s.value=!0),onMouseleave:i[3]||(i[3]=u=>s.value=!1),class:"relative"},[M("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:ee({opacity:s.value?1:0})},[O(n).productId!==a.product.productId?(w(),$("div",Ka,[L(ne,{onClick:i[0]||(i[0]=u=>O(t)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:D(()=>[L(oe,{icon:"arrow-right"}),i[4]||(i[4]=le(" go "))]),_:1,__:[4]}),d.value?(w(),R(ne,{key:0,onClick:i[1]||(i[1]=u=>O(o)(a.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:D(()=>[L(oe,{icon:"debug-step-over"}),i[5]||(i[5]=le(" go with graph "))]),_:1,__:[5]})):Z("",!0)])):(w(),R(xe,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:D(()=>[L(oe,{icon:"star",class:"text-xl"}),i[6]||(i[6]=le(" you are here ")),L(oe,{icon:"star",class:"text-xl"})]),_:1,__:[6]}))],4),L(Mo,{"image-src":l.value,title:a.product.menu.name,description:a.product.menu.description,class:"rounded-md",style:ee({opacity:s.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),Wa={class:"flex flex-col gap-2"},qa=F({__name:"ProductDropdownMenu",setup(e){const t=Fe.filter(n=>n==null?void 0:n.menu),o=Ut.reduce((n,r)=>(n[r]=[],n),{});return t.forEach(n=>{o[n.menu.category].push(n)}),(n,r)=>(w(),R(xe,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:D(()=>[(w(!0),$(se,null,de(O(Ut),s=>(w(),$("div",{key:s},[O(o)[s].length>0?(w(),R(xe,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:D(()=>[le(q(s),1)]),_:2},1024)):Z("",!0),M("div",Wa,[(w(!0),$(se,null,de(O(o)[s],l=>(w(),R(ja,{key:l.productId,product:l},null,8,["product"]))),128))])]))),128))]),_:1}))}}),Ya=F({__name:"ProductDropdown",setup(e){const t=ae();return(o,n)=>(w(),R(wt,null,{activator:D(({toggle:r,isOpen:s})=>[L(ne,{onClick:r,tertiary:s,class:"px-4 py-2 text-xl rounded-lg"},{default:D(()=>[M("span",{class:Y(`text-${O(t).brand}`)},"Magic Graphs",2)]),_:2},1032,["onClick","tertiary"])]),default:D(()=>[L(qa)]),_:1}))}}),Za=["onMouseenter","onMouseleave"],Va=F({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(t,o)=>(w(),R(wt,{offset:t.offset},{activator:D(({toggle:n})=>[M("div",{onMouseenter:n,onMouseleave:n},[H(t.$slots,"default")],40,Za)]),default:D(()=>[H(t.$slots,"content")]),_:3},8,["offset"]))}}),Xa={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},Ja=["innerHTML"],Qa=F({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const t=e,o=A(()=>{var n;return(n=t.simulation.canRun)==null?void 0:n.check()});return(n,r)=>o.value?(w(),$("div",Xa,[L(Va,null,{content:D(()=>[L(xe,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:D(()=>[M("span",{innerHTML:o.value.description,class:"font-bold"},null,8,Ja)]),_:1})]),default:D(()=>[L(vo,{onMouseenter:r[0]||(r[0]=s=>{var l;return(l=o.value.themer)==null?void 0:l.theme()}),onMouseleave:r[1]||(r[1]=s=>{var l;return(l=o.value.themer)==null?void 0:l.untheme()}),color:O(S).GRAY_900,"text-color":O(S).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:D(()=>[le(q(o.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):Z("",!0)}}),ei=F({__name:"SimCard",props:{simulation:{}},setup(e){const t=e,o=T("");return setTimeout(()=>{o.value=t.simulation.thumbnail},fo(0,100)),(n,r)=>(w(),R(Mo,{"image-src":o.value,title:n.simulation.name,description:n.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),ti=F({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:t}){const o=e,n=t,r=A(()=>{const l=o.simulations,d=l.filter(i=>{var u;return(u=i.canRun)==null?void 0:u.check()});return[...l.filter(i=>{var u;return!((u=i.canRun)!=null&&u.check())}),...d]}),s=l=>{if(o.simulations.length===1){n("simulation-selected",o.simulations[0]);return}l()};return(l,d)=>(w(),R(wt,null,{activator:D(({toggle:a,isOpen:i})=>[L(ne,{onClick:u=>s(()=>a(u)),tertiary:i,disabled:l.disabled,class:"h-14 w-14 rounded-full"},{default:D(()=>[L(oe,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","tertiary","disabled"])]),default:D(()=>[L(xe,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:D(()=>[(w(!0),$(se,null,de(r.value,a=>(w(),$("div",{key:a.name,class:"relative"},[L(Qa,{simulation:a},null,8,["simulation"]),L(ei,{onClick:i=>n("simulation-selected",a),simulation:a},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),ge={Fullscreen:{binding:"f"},Help:{binding:"h"},"Pause/Play Simulation":{binding:"space"},"Simulation Step Forward":{binding:"arrowright"},"Simulation Step Backward":{binding:"arrowleft"},"Exit Simulation":{binding:"esc"}},oi=F({__name:"GText",setup(e){const t={light:S.GRAY_900,dark:S.GRAY_100,pink:S.PINK_800},o=A(()=>t[re.value.themeName.value]),n=A(()=>({color:o.value}));return(r,s)=>(w(),$("div",{style:ee(n.value)},[H(r.$slots,"default")],4))}}),ni={class:"w-12"},ri={class:"w-12"},si=F({__name:"GSpreadSelect",props:Yn({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const t=T(),o=e,n=Lt(e,"modelValue");if(n.value=o.items[o.initialItemIndex].value,n.value===void 0)throw new Error("invalid initialItemIndex");const r=A(()=>{var i;return(i=o.items.find(u=>u.value===n.value))==null?void 0:i.label}),s=Lt(e,"open"),l=()=>s.value=!s.value;it(t,()=>s.value=!1);const d=i=>{n.value=i.value,s.value=!1},a=i=>i.value===n.value;return(i,u)=>(w(),$("div",null,[s.value?(w(),$("div",{key:0,ref_key:"target",ref:t,class:"flex gap-2 justify-center"},[(w(!0),$(se,null,de(i.items,p=>(w(),R(ne,{key:p.label,onClick:c=>d(p),class:Y(["rounded-full",a(p)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:D(()=>[M("span",ni,q(p.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):r.value?(w(),R(ne,{key:1,onClick:l,class:"rounded-full"},{default:D(()=>[M("span",ri,q(r.value),1)]),_:1})):Z("",!0)]))}}),Ke=F({__name:"PlaybackButton",props:{icon:{}},setup(e){return(t,o)=>(w(),R(ne,{style:{"border-radius":"40px"}},{default:D(()=>[L(oe,{class:"py-1 px-6 text-5xl",icon:t.icon},null,8,["icon"])]),_:1}))}}),ai={transitionTimeMs:250,transitionEasing:"ease-in-out"},ii=F({__name:"ProgressBar",props:Zn({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},ai),setup(e){const t=ae(),o=e,n=A(()=>{const[a,i]=o.range;return i-a}),r=a=>{if(n.value===0)return 100;const[i]=o.range;return Math.min(Math.max(a-i,0),n.value)/n.value*100},s=a=>{const i=a.currentTarget;if(!(i instanceof HTMLElement))throw new Error("Invalid target");const u=a.offsetX,p=i.offsetWidth,c=u/p,m=o.range[0]+c*n.value;return Math.round(m)},l=a=>{var u;const i=s(a);(u=o.onProgressSet)==null||u.call(o,i)},d=a=>{var u;const i=s(a);(u=o.onHover)==null||u.call(o,i)};return(a,i)=>(w(),$("div",{onMousemove:d,onClick:l,class:"relative overflow-hidden h-4 w-full z-1 cursor-pointer"},[M("div",{class:Y("absolute top-0 left-0 h-full z-0"),style:ee({backgroundColor:o.color??O(t).tertiary,width:`${r(a.progress)}%`,transition:`width ${o.transitionTimeMs}ms ${o.transitionEasing}`})},null,4),M("div",{class:Y("absolute top-0 left-0 h-full z-10"),style:ee({backgroundColor:O(t).primary+"90",width:`${r(a.previewProgress??o.range[0])}%`})},null,4)],32))}}),li={class:"relative flex flex-col gap-5 items-center justify-center"},ui={class:"flex w-full justify-center gap-2"},di={class:"px-2"},ci={class:"flex gap-4 fill-white dark:fill-black"},pi=F({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const t=ae(),o=e,{isOver:n,paused:r,step:s,hasBegun:l,lastStep:d,playbackSpeed:a,explanationAtStep:i}=Vn(o.controls),{nextStep:u,prevStep:p,setStep:c,start:m,stop:C,showPlaybackSpeedControls:I,pauseOnStructureChange:b,defaultPlaybackSpeedMs:f}=o.controls,x=()=>{p(),r.value=!0},E=()=>{u(),r.value=!0},h=K=>{c(K),r.value=!0},y=()=>{r.value=!r.value},v=()=>{C(),m()},_=T(-1),g=K=>{_.value=K},B=()=>{_.value=-1},k=()=>{r.value=!0};b&&re.value.subscribe("onStructureChange",k),Ce(()=>{re.value.unsubscribe("onStructureChange",k)});const U=[{label:"0.25x",value:f/.25},{label:"0.5x",value:f/.5},{label:"1x",value:f},{label:"2x",value:f/2},{label:"4x",value:f/4}],P=T(!1),z=U.findIndex(K=>K.value===a.value)??2,G=ht();return G.add(ge["Pause/Play Simulation"].binding,()=>{n.value?v():y()}),G.add(ge["Simulation Step Backward"].binding,x),G.add(ge["Simulation Step Forward"].binding,E),window.addEventListener("keyup",G.handle),Ce(()=>window.removeEventListener("keyup",G.handle)),(K,V)=>(w(),$("div",li,[O(i)?(w(),R(oi,{key:0,class:"absolute font-bold text-xl w-[800px] text-center -top-12 pointer-events-none"},{default:D(()=>[le(q(O(i)),1)]),_:1})):Z("",!0),M("div",ui,[O(I)?(w(),R(si,{key:0,modelValue:O(a),"onUpdate:modelValue":V[0]||(V[0]=X=>Xn(a)?a.value=X:null),open:P.value,"onUpdate:open":V[1]||(V[1]=X=>P.value=X),items:U,"initial-item-index":O(z)},null,8,["modelValue","open","initial-item-index"])):Z("",!0),P.value?Z("",!0):(w(),R(ne,{key:1,class:"rounded-full"},{default:D(()=>[M("span",di," Step "+q(O(s)+1),1)]),_:1}))]),O(d)!==1/0?(w(),R(ii,{key:1,onMouseleave:B,range:[0,O(d)],progress:O(s),"on-progress-set":h,"preview-progress":_.value,"on-hover":g,style:ee({borderColor:O(t).tertiary}),class:"w-full border-2 rounded-lg"},null,8,["range","progress","preview-progress","style"])):Z("",!0),M("div",ci,[L(Ke,{onClick:x,disabled:!O(l),icon:"chevron-left"},null,8,["disabled"]),O(n)?(w(),R(Ke,{key:0,onClick:v,disabled:O(d)===0,icon:"restart"},null,8,["disabled"])):(w(),R(Ke,{key:1,onClick:y,icon:O(r)?"play":"pause"},null,8,["icon"])),L(Ke,{onClick:E,disabled:O(n),icon:"chevron-right"},null,8,["disabled"])])]))}}),fi=F({__name:"FullscreenButton",setup(e){const{toggle:t,isFullscreen:o}=Jn();return Qn(ge.Fullscreen.binding,t),(n,r)=>(w(),R(ne,{onClick:O(t),class:"h-12 w-12"},{default:D(()=>[L(oe,{class:"text-3xl",icon:O(o)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}});var No={name:"WindowMaximizeIcon",extends:ct};function bi(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}No.render=bi;var Po={name:"WindowMinimizeIcon",extends:ct};function vi(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}Po.render=vi;var Oo={name:"SpinnerIcon",extends:ct};function gi(e,t,o,n,r,s){return w(),$("svg",j({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[M("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}Oo.render=gi;var mi=qe`
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
`,hi={root:function(t){var o=t.props,n=t.instance;return["p-badge p-component",{"p-badge-circle":ao(o.value)&&String(o.value).length===1,"p-badge-dot":bo(o.value)&&!n.$slots.default,"p-badge-sm":o.size==="small","p-badge-lg":o.size==="large","p-badge-xl":o.size==="xlarge","p-badge-info":o.severity==="info","p-badge-success":o.severity==="success","p-badge-warn":o.severity==="warn","p-badge-danger":o.severity==="danger","p-badge-secondary":o.severity==="secondary","p-badge-contrast":o.severity==="contrast"}]}},yi=ze.extend({name:"badge",style:mi,classes:hi}),_i={name:"BaseBadge",extends:Ye,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:yi,provide:function(){return{$pcBadge:this,$parentInstance:this}}};function Pe(e){"@babel/helpers - typeof";return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(e)}function qt(e,t,o){return(t=wi(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function wi(e){var t=Ci(e,"string");return Pe(t)=="symbol"?t:t+""}function Ci(e,t){if(Pe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Pe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var $o={name:"Badge",extends:_i,inheritAttrs:!1,computed:{dataP:function(){return Le(qt(qt({circle:this.value!=null&&String(this.value).length===1,empty:this.value==null&&!this.$slots.default},this.severity,this.severity),this.size,this.size))}}},xi=["data-p"];function Si(e,t,o,n,r,s){return w(),$("span",j({class:e.cx("root"),"data-p":s.dataP},e.ptmi("root")),[H(e.$slots,"default",{},function(){return[le(q(e.value),1)]})],16,xi)}$o.render=Si;var ki=qe`
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
`;function Oe(e){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(e)}function ue(e,t,o){return(t=Ei(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Ei(e){var t=Ti(e,"string");return Oe(t)=="symbol"?t:t+""}function Ti(e,t){if(Oe(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Oe(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ai={root:function(t){var o=t.instance,n=t.props;return["p-button p-component",ue(ue(ue(ue(ue(ue(ue(ue(ue({"p-button-icon-only":o.hasIcon&&!n.label&&!n.badge,"p-button-vertical":(n.iconPos==="top"||n.iconPos==="bottom")&&n.label,"p-button-loading":n.loading,"p-button-link":n.link||n.variant==="link"},"p-button-".concat(n.severity),n.severity),"p-button-raised",n.raised),"p-button-rounded",n.rounded),"p-button-text",n.text||n.variant==="text"),"p-button-outlined",n.outlined||n.variant==="outlined"),"p-button-sm",n.size==="small"),"p-button-lg",n.size==="large"),"p-button-plain",n.plain),"p-button-fluid",o.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(t){var o=t.props;return["p-button-icon",ue({},"p-button-icon-".concat(o.iconPos),o.label)]},label:"p-button-label"},Li=ze.extend({name:"button",style:ki,classes:Ai}),Bi={name:"BaseButton",extends:Ye,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:Li,provide:function(){return{$pcButton:this,$parentInstance:this}}};function $e(e){"@babel/helpers - typeof";return $e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$e(e)}function te(e,t,o){return(t=Ii(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Ii(e){var t=Di(e,"string");return $e(t)=="symbol"?t:t+""}function Di(e,t){if($e(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if($e(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ro={name:"Button",extends:Bi,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(t){var o=t==="root"?this.ptmi:this.ptm;return o(t,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return j(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return bo(this.fluid)?!!this.$pcFluid:this.fluid},dataP:function(){return Le(te(te(te(te(te(te(te(te(te(te({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge),"loading",this.loading),"fluid",this.hasFluid),"rounded",this.rounded),"raised",this.raised),"outlined",this.outlined||this.variant==="outlined"),"text",this.text||this.variant==="text"),"link",this.link||this.variant==="link"),"vertical",(this.iconPos==="top"||this.iconPos==="bottom")&&this.label))},dataIconP:function(){return Le(te(te({},this.iconPos,this.iconPos),this.size,this.size))},dataLabelP:function(){return Le(te(te({},this.size,this.size),"icon-only",this.hasIcon&&!this.label&&!this.badge))}},components:{SpinnerIcon:Oo,Badge:$o},directives:{ripple:lt}},Mi=["data-p"],Ni=["data-p"];function Pi(e,t,o,n,r,s){var l=De("SpinnerIcon"),d=De("Badge"),a=dt("ripple");return e.asChild?H(e.$slots,"default",{key:1,class:Y(e.cx("root")),a11yAttrs:s.a11yAttrs}):Ze((w(),R(rt(e.as),j({key:0,class:e.cx("root"),"data-p":s.dataP},s.attrs),{default:D(function(){return[H(e.$slots,"default",{},function(){return[e.loading?H(e.$slots,"loadingicon",j({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(w(),$("span",j({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(w(),R(l,j({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):H(e.$slots,"icon",j({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(w(),$("span",j({key:0,class:[e.cx("icon"),e.icon,e.iconClass],"data-p":s.dataIconP},e.ptm("icon")),null,16,Mi)):Z("",!0)]}),M("span",j({class:e.cx("label")},e.ptm("label"),{"data-p":s.dataLabelP}),q(e.label||" "),17,Ni),e.badge?(w(),R(d,{key:2,value:e.badge,class:Y(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):Z("",!0)]})]}),_:3},16,["class","data-p"])),[[a]])}Ro.render=Pi;function Yt(){tr({variableName:ut("scrollbar.width").name})}function Zt(){er({variableName:ut("scrollbar.width").name})}var Oi=qe`
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
`,$i={mask:function(t){var o=t.position,n=t.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:o==="left"||o==="topleft"||o==="bottomleft"?"flex-start":o==="right"||o==="topright"||o==="bottomright"?"flex-end":"center",alignItems:o==="top"||o==="topleft"||o==="topright"?"flex-start":o==="bottom"||o==="bottomleft"||o==="bottomright"?"flex-end":"center",pointerEvents:n?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},Ri={mask:function(t){var o=t.props,n=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],r=n.find(function(s){return s===o.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":o.modal},r?"p-dialog-".concat(r):""]},root:function(t){var o=t.props,n=t.instance;return["p-dialog p-component",{"p-dialog-maximized":o.maximizable&&n.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},zi=ze.extend({name:"dialog",style:Oi,classes:Ri,inlineStyles:$i}),Fi={name:"BaseDialog",extends:Ye,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:zi,provide:function(){return{$pcDialog:this,$parentInstance:this}}},zo={name:"Dialog",extends:Fi,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var t=this;return{dialogRef:A(function(){return t._instance})}},data:function(){return{containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&ye.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&ye.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&uo(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),ve(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&ye.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(t){this.maskMouseDownTarget=t.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var t=function(r){return r&&r.querySelector("[autofocus]")},o=this.$slots.footer&&t(this.footerContainer);o||(o=this.$slots.header&&t(this.headerContainer),o||(o=this.$slots.default&&t(this.content),o||(this.maximizable?(this.focusableMax=!0,o=this.maximizableButton):(this.focusableClose=!0,o=this.closeButton)))),o&&ve(o,{focusVisible:!0})},maximize:function(t){this.maximized?(this.maximized=!1,this.$emit("unmaximize",t)):(this.maximized=!0,this.$emit("maximize",t)),this.modal||(this.maximized?Yt():Zt())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Yt()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Zt()},onKeyDown:function(t){t.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(t){this.container=t},maskRef:function(t){this.mask=t},contentRef:function(t){this.content=t},headerContainerRef:function(t){this.headerContainer=t},footerContainerRef:function(t){this.footerContainer=t},maximizableRef:function(t){this.maximizableButton=t?t.$el:void 0},closeButtonRef:function(t){this.closeButton=t?t.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var t;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",lo(this.styleElement,"nonce",(t=this.$primevue)===null||t===void 0||(t=t.config)===null||t===void 0||(t=t.csp)===null||t===void 0?void 0:t.nonce),document.head.appendChild(this.styleElement);var o="";for(var n in this.breakpoints)o+=`
                        @media screen and (max-width: `.concat(n,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[n],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=o}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(t){t.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=t.pageX,this.lastPageY=t.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&co(document.body,{"user-select":"none"}),this.$emit("dragstart",t))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var t=this;this.documentDragListener=function(o){if(t.dragging){var n=nr(t.container),r=rr(t.container),s=o.pageX-t.lastPageX,l=o.pageY-t.lastPageY,d=t.container.getBoundingClientRect(),a=d.left+s,i=d.top+l,u=sr(),p=getComputedStyle(t.container),c=parseFloat(p.marginLeft),m=parseFloat(p.marginTop);t.container.style.position="fixed",t.keepInViewport?(a>=t.minX&&a+n<u.width&&(t.lastPageX=o.pageX,t.container.style.left=a-c+"px"),i>=t.minY&&i+r<u.height&&(t.lastPageY=o.pageY,t.container.style.top=i-m+"px")):(t.lastPageX=o.pageX,t.container.style.left=a-c+"px",t.lastPageY=o.pageY,t.container.style.top=i-m+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var t=this;this.documentDragEndListener=function(o){t.dragging&&(t.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!t.isUnstyled&&(document.body.style["user-select"]=""),t.$emit("dragend",o))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.$id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return Le({maximized:this.maximized,modal:this.modal})}},directives:{ripple:lt,focustrap:Io},components:{Button:Ro,Portal:io,WindowMinimizeIcon:Po,WindowMaximizeIcon:No,TimesIcon:or}};function Re(e){"@babel/helpers - typeof";return Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Re(e)}function Vt(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),o.push.apply(o,n)}return o}function Xt(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?Vt(Object(o),!0).forEach(function(n){Hi(e,n,o[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):Vt(Object(o)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))})}return e}function Hi(e,t,o){return(t=Ui(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function Ui(e){var t=Gi(e,"string");return Re(t)=="symbol"?t:t+""}function Gi(e,t){if(Re(e)!="object"||!e)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t);if(Re(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ki=["data-p"],ji=["aria-labelledby","aria-modal","data-p"],Wi=["id"],qi=["data-p"];function Yi(e,t,o,n,r,s){var l=De("Button"),d=De("Portal"),a=dt("focustrap");return w(),R(d,{appendTo:e.appendTo},{default:D(function(){return[r.containerVisible?(w(),$("div",j({key:0,ref:s.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:t[1]||(t[1]=function(){return s.onMaskMouseDown&&s.onMaskMouseDown.apply(s,arguments)}),onMouseup:t[2]||(t[2]=function(){return s.onMaskMouseUp&&s.onMaskMouseUp.apply(s,arguments)}),"data-p":s.dataP},e.ptm("mask")),[L(po,j({name:"p-dialog",onEnter:s.onEnter,onAfterEnter:s.onAfterEnter,onBeforeLeave:s.onBeforeLeave,onLeave:s.onLeave,onAfterLeave:s.onAfterLeave,appear:""},e.ptm("transition")),{default:D(function(){return[e.visible?Ze((w(),$("div",j({key:0,ref:s.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":s.ariaLabelledById,"aria-modal":e.modal,"data-p":s.dataP},e.ptmi("root")),[e.$slots.container?H(e.$slots,"container",{key:0,closeCallback:s.close,maximizeCallback:function(u){return s.maximize(u)}}):(w(),$(se,{key:1},[e.showHeader?(w(),$("div",j({key:0,ref:s.headerContainerRef,class:e.cx("header"),onMousedown:t[0]||(t[0]=function(){return s.initDrag&&s.initDrag.apply(s,arguments)})},e.ptm("header")),[H(e.$slots,"header",{class:Y(e.cx("title"))},function(){return[e.header?(w(),$("span",j({key:0,id:s.ariaLabelledById,class:e.cx("title")},e.ptm("title")),q(e.header),17,Wi)):Z("",!0)]}),M("div",j({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?H(e.$slots,"maximizebutton",{key:0,maximized:r.maximized,maximizeCallback:function(u){return s.maximize(u)}},function(){return[L(l,j({ref:s.maximizableRef,autofocus:r.focusableMax,class:e.cx("pcMaximizeButton"),onClick:s.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:D(function(i){return[H(e.$slots,"maximizeicon",{maximized:r.maximized},function(){return[(w(),R(rt(s.maximizeIconComponent),j({class:[i.class,r.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])]}):Z("",!0),e.closable?H(e.$slots,"closebutton",{key:1,closeCallback:s.close},function(){return[L(l,j({ref:s.closeButtonRef,autofocus:r.focusableClose,class:e.cx("pcCloseButton"),onClick:s.close,"aria-label":s.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:D(function(i){return[H(e.$slots,"closeicon",{},function(){return[(w(),R(rt(e.closeIcon?"span":"TimesIcon"),j({class:[e.closeIcon,i.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])]}):Z("",!0)],16)],16)):Z("",!0),M("div",j({ref:s.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle,"data-p":s.dataP},Xt(Xt({},e.contentProps),e.ptm("content"))),[H(e.$slots,"default")],16,qi),e.footer||e.$slots.footer?(w(),$("div",j({key:1,ref:s.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[H(e.$slots,"footer",{},function(){return[le(q(e.footer),1)]})],16)):Z("",!0)],64))],16,ji)),[[a,{disabled:!e.modal}]]):Z("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16,Ki)):Z("",!0)]}),_:3},8,["appendTo"])}zo.render=Yi;const Zi=F({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1},header:{},footer:{},visible:{type:Boolean},modal:{type:Boolean},contentStyle:{},contentClass:{},contentProps:{},closable:{type:Boolean},dismissableMask:{type:Boolean},closeOnEscape:{type:Boolean},showHeader:{type:Boolean},blockScroll:{type:Boolean},baseZIndex:{},autoZIndex:{type:Boolean},position:{},maximizable:{type:Boolean},breakpoints:{},draggable:{type:Boolean},keepInViewport:{type:Boolean},minX:{},minY:{},appendTo:{},style:{},closeIcon:{},maximizeIcon:{},minimizeIcon:{},closeButtonProps:{},maximizeButtonProps:{},dt:{},pt:{},ptOptions:{},unstyled:{type:Boolean}},setup(e){const t=ae(),o=e,n=ar(),r=A(()=>({...n,...o})),s=A(()=>o.secondary?t.value.secondary:o.tertiary?t.value.tertiary:t.value.primary);return(l,d)=>(w(),R(O(zo),j(r.value,{style:{backgroundColor:s.value,color:O(t).text,borderColor:O(t).text},"pt:root:class":"!border-0"}),{default:D(()=>[H(l.$slots,"header"),H(l.$slots,"default"),H(l.$slots,"footer")]),_:3},16,["style"]))}}),Vi={class:"font-bold text-lg text-md mb-1"},Ct=F({__name:"HelpSection",props:{title:{}},setup(e){return(t,o)=>(w(),$("div",null,[M("h2",Vi,q(t.title),1),M("div",null,[H(t.$slots,"default")])]))}}),Xi={class:"flex gap-2 text-sm"},Jt="https://github.com/Yonava/magic-graphs",Ji=F({__name:"HelpLinks",setup(e){const t=n=>window.open(n,"_blank"),o=`${Jt}/issues/new?template=Blank%20issue`;return(n,r)=>(w(),R(Ct,{title:"Links To Have Handy"},{default:D(()=>[M("div",Xi,[L(ne,{onClick:r[0]||(r[0]=s=>t(o)),class:"flex gap-2",tertiary:""},{default:D(()=>[L(oe,{icon:"bug"}),r[2]||(r[2]=le(" I Found An Issue "))]),_:1,__:[2]}),L(ne,{onClick:r[1]||(r[1]=s=>t(Jt)),class:"flex gap-2",tertiary:""},{default:D(()=>[L(oe,{icon:"github"}),r[3]||(r[3]=le(" Star Us On GitHub "))]),_:1,__:[3]})])]),_:1}))}}),Qi={class:Y(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs","capitalize","border-current"])},el={key:1},tl={key:2},ol=F({__name:"HelpShortcutKey",props:{keyboardKey:{}},setup(e){const t=e,o={meta:"⌘"},n=Object.keys(o),r={arrowright:"arrow-right",arrowleft:"arrow-left"},s=Object.keys(r),l=A(()=>s.includes(t.keyboardKey)),d=A(()=>n.includes(t.keyboardKey));return(a,i)=>(w(),$("div",Qi,[l.value?(w(),R(oe,{key:0,icon:r[a.keyboardKey],class:"text-xs"},null,8,["icon"])):d.value?(w(),$("p",el,q(o[a.keyboardKey]),1)):(w(),$("p",tl,q(a.keyboardKey),1))]))}}),nl={class:"flex flex-col gap-1"},rl={class:"flex"},sl=F({__name:"HelpShortcuts",setup(e){const t=r=>r.split("+").map(s=>s.trim()).filter(s=>s!==""),{activeShortcuts:o}=re.value.shortcut,n=Object.assign(o,ge);return(r,s)=>(w(),R(Ct,{title:"Useful Shortcuts"},{default:D(()=>[M("div",nl,[(w(!0),$(se,null,de(O(n),(l,d)=>(w(),$("div",{key:d,class:"flex justify-between items-center"},[le(q(d)+" ",1),M("div",rl,[(w(!0),$(se,null,de(t(l.binding),a=>(w(),$("div",{key:a},[L(ol,{"keyboard-key":a},null,8,["keyboard-key"])]))),128))])]))),128))])]),_:1}))}}),al=F({__name:"HelpVideos",setup(e){return(t,o)=>(w(),R(Ct,{title:"Hungry For More? Watch Our Tutorials"},{default:D(()=>o[0]||(o[0]=[M("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/MvLXdpvDh90?si=y62b2TUkGWIZkDG8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1)])),_:1,__:[0]}))}}),il={class:"flex flex-col gap-4 h-[500px] overflow-auto"},ll=F({__name:"HelpContent",setup(e){return(t,o)=>(w(),$("div",null,[o[0]||(o[0]=M("h1",{class:"text-2xl font-bold mb-3 mt-4"},"Here's Some Help 👇",-1)),M("div",il,[L(sl),L(Ji),L(al)])]))}}),ul=F({__name:"HelpMenu",setup(e){const t=T(!1),o=T();it(o,()=>{t.value=!1});const n=()=>{t.value=!t.value},r=Co();return r.add(ge.Help.binding,n),r.add("escape",()=>t.value=!1),window.addEventListener("keydown",r.handle),Ce(()=>{window.removeEventListener("keydown",r.handle)}),(s,l)=>(w(),$(se,null,[L(ne,{onClick:n,class:"h-12 w-12"},{default:D(()=>[L(oe,{icon:"help"})]),_:1}),L(Zi,{visible:t.value,"onUpdate:visible":l[0]||(l[0]=d=>t.value=d)},{default:D(()=>[M("div",{ref_key:"dialogContent",ref:o},[L(ll)],512)]),_:1},8,["visible"])],64))}}),dl=F({__name:"ShareButton",setup(e){const t=Se(),o=T(!1),n=T(!1),r=so(),s=()=>{o.value=!1,n.value=!1},l=async()=>{if(!o.value)try{const a=xo(re.value),i=oa(a),u=Ao.compressToEncodedURIComponent(i),p=Lo,m=`${`${location.origin}${t.path}`}?${p}=${u}`;await navigator.clipboard.writeText(m),o.value=!0,r.add({summary:"Graph Share Link Copied to Clipboard!",life:3e3,severity:"success"})}catch(a){n.value=!0,r.add({summary:"Failed to copy share link to clipboard!",life:3e3,severity:"error"}),console.error(a)}finally{setTimeout(s,3e3)}},d=A(()=>o.value?"check":n.value?"alert":"share");return(a,i)=>(w(),R(ne,{onClick:l,disabled:o.value||n.value,class:"h-12 w-12"},{default:D(()=>[L(oe,{class:"text-3xl",icon:d.value},null,8,["icon"])]),_:1},8,["disabled"]))}}),cl=F({__name:"StopSimButton",setup(e){return(t,o)=>(w(),R(ne,{color:O(S).RED_500,class:"h-14 w-14 rounded-full"},{default:D(()=>[L(oe,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),pl=F({__name:"ThemeToolbar",setup(e){const t={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",pink:"flower-tulip-outline"};return(o,n)=>(w(),R(_t,null,{default:D(()=>[L(Be,null,{default:D(()=>[(w(),$(se,null,de(t,(r,s)=>L(ce,{key:s,onClick:l=>O(re).preferredTheme.value=s,icon:r,active:s===O(re).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}}),fl={class:"text-sm font-semibold"},bl=F({__name:"ZoomToolbar",props:{camera:{}},setup(e){const t=e,o=A(()=>t.camera.state.zoom.value),n=A(()=>{const s=Math.log(St),l=Math.log(kt);return(Math.log(o.value)-s)/(l-s)}),r=A(()=>Math.round(n.value*100));return(s,l)=>(w(),R(_t,null,{default:D(()=>[L(Be,null,{default:D(()=>[L(ce,{onClick:l[0]||(l[0]=d=>s.camera.actions.zoomOut()),disabled:o.value<=O(St),icon:"minus"},null,8,["disabled"]),L(xe,{class:"w-12 text-center"},{default:D(()=>[M("p",fl,q(r.value)+"%",1)]),_:1}),L(ce,{onClick:l[1]||(l[1]=d=>s.camera.actions.zoomIn()),disabled:o.value>=O(kt),icon:"plus"},null,8,["disabled"])]),_:1})]),_:1}))}});function vl(){const e=T(0),t=T(0),o=T(0),n=T(0);let r,s,l=performance.now(),d=performance.now(),a=0,i=0;const u=33.3,p=()=>{const m=performance.now(),C=m-d;t.value=C,d=m,C>u&&i++,a++,r=requestAnimationFrame(p)},c=()=>{const m=performance.now(),C=m-l;e.value=Math.round(a*1e3/C),o.value=i,n.value=a>0?i/a:0,a=0,i=0,l=m};return We(()=>{d=performance.now(),l=performance.now(),r=requestAnimationFrame(p),s=setInterval(c,500)}),Ce(()=>{cancelAnimationFrame(r),clearInterval(s)}),{fps:e,frameTime:t,slowFrameCount:o,slowFrameRatio:n}}const gl={class:"text-white text-end"},ml=F({__name:"BenchmarkingMetrics",setup(e){const{fps:t,slowFrameCount:o,slowFrameRatio:n}=vl();return(r,s)=>(w(),$("div",gl,[M("div",null,"FPS: "+q(O(t)),1),M("div",null,"Slow Frame Count: "+q(O(o)),1),M("div",null,"Slow Frame Ratio: "+q(O(n).toFixed(2)),1)]))}}),hl={class:"text-white text-end"},yl=F({__name:"GraphAtMousePositionData",setup(e){const t=A(()=>{const{coords:{x:n,y:r}}=re.value.graphAtMousePosition.value;return{x:Math.round(n),y:Math.round(r)}}),o=A(()=>{const{items:n}=re.value.graphAtMousePosition.value;return n.map(r=>`${r.graphType} - ${r.shape.name} (${r.id})`)});return(n,r)=>(w(),$("div",hl,[M("div",null,"Cursor At: (X = "+q(t.value.x)+", Y = "+q(t.value.y)+")",1),M("div",null,"Items Hovered: "+q(o.value),1)]))}}),_l=e=>{const t=ht();t.add(ge["Exit Simulation"].binding,e),window.addEventListener("keyup",t.handle),Ce(()=>window.removeEventListener("keyup",t.handle))},wl={class:Y(["absolute","top-6","left-6"])},Cl={class:Y(["absolute","flex","flex-col","justify-center","items-center","gap-2","left-1/2","-translate-x-1/2","translate-y-6"])},xl={class:Y(["absolute","top-6","right-6"])},Sl={class:Y(["absolute","grid","place-items-center","left-6","max-w-96","-translate-y-1/2","top-1/2"])},kl={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},El={class:Y(["absolute","grid","place-items-center","right-6","max-w-96","-translate-y-1/2","top-1/2"])},Tl={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},Al={class:Y(["absolute","flex","gap-2","bottom-6","left-6"])},Ll={class:Y(["absolute","bottom-6","-translate-x-1/2","left-1/2"])},Bl={key:0,class:Y(["absolute","flex","flex-col","gap-2","bottom-20","right-6","pointer-events-none"])},Il={class:Y(["absolute","flex","flex-col","gap-2","bottom-6","right-6"])},Dl={class:Y(["flex","gap-2"])},Gl=F({__name:"GraphProduct",props:{graph:{},canvas:{},css:{}},emits:["simulation-started","simulation-stopped"],setup(e,{emit:t}){const o=e,n=T(!1),r=t,s=aa(o.graph),l=T(s[0]),d=T(!1),a=A(()=>l.value.runner),i=A(()=>a.value.simControls.isActive),u=async()=>{d.value=!0,r("simulation-started",l.value),await a.value.start()},p=async()=>{d.value&&(await a.value.stop(),d.value=!1,r("simulation-stopped"),n.value&&o.graph.annotation.activate(),n.value=!1)};_l(p);const c=f=>{n.value=o.graph.annotation.isActive.value,o.graph.annotation.deactivate(),l.value=f,u()};pa(o.graph);const m=T(!1),C=A(()=>m.value?"pointer-events-none":""),I=()=>m.value=!0,b=()=>m.value=!1;return We(()=>{o.graph.subscribe("onMouseDown",I),o.graph.subscribe("onMouseUp",b)}),Ce(()=>{o.graph.unsubscribe("onMouseDown",I),o.graph.unsubscribe("onMouseUp",b)}),(f,x)=>(w(),$(se,null,[M("div",{class:Y([C.value])},[M("div",wl,[L(Ya)]),M("div",Cl,[d.value?H(f.$slots,"top-center-sim",{key:0}):H(f.$slots,"top-center",{key:1})]),M("div",xl,[d.value?H(f.$slots,"top-right-sim",{key:0},()=>[L(cl,{onClick:p})]):H(f.$slots,"top-right",{key:1},()=>[O(s).length>0?(w(),R(ti,{key:0,onSimulationSelected:c,simulations:O(s)},null,8,["simulations"])):Z("",!0)])]),M("div",Sl,[M("div",kl,[d.value?H(f.$slots,"center-left-sim",{key:0}):H(f.$slots,"center-left",{key:1})])]),M("div",El,[M("div",Tl,[d.value?H(f.$slots,"center-right-sim",{key:0}):H(f.$slots,"center-right",{key:1})])]),M("div",Al,[L(ul),L(dl),L(bl,{camera:f.canvas.camera},null,8,["camera"])]),M("div",Ll,[d.value&&i.value?H(f.$slots,"bottom-center-sim",{key:0},()=>[L(pi,{controls:a.value.simControls},null,8,["controls"])]):H(f.$slots,"bottom-center",{key:1},()=>[Ze(M("div",null,[L(ka)],512),[[dr,f.graph.annotation.isActive.value]])])]),O(ir)?(w(),$("div",Bl,[L(yl),L(ml)])):Z("",!0),M("div",Il,[M("div",Dl,[L(pl),L(fi)])])],2),L(rn,lr(ur({...o.canvas.ref,...o.css.value})),null,16)],64))}});export{Hl as D,Zr as L,Gl as _,Rr as a,xe as b,ne as c,_l as d,cl as e,pi as f,Vr as g,Ul as h,ia as i,wt as j,xs as k,Va as l,Qs as m,_t as n,ce as o,Fl as p,Kt as q,Be as r,Rl as s,zl as u};
