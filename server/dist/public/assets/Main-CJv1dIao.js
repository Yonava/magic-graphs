import{u as z,b as M,_ as G}from"./Graph.vue_vue_type_script_setup_true_lang-DZdbGwNi.js";import{d as $,r as F,o as v,c as h,e as r,w as n,L as w,q as B,M as x,B as D,a as c,t as L,z as C,F as k,A as f,G as H,f as R,b as P,y as V}from"./index-jfH_lu32.js";import{_ as q,u as K}from"./TutorialHint.vue_vue_type_script_setup_true_lang-DMvtvGtR.js";import{u as O,c as g,i as U,j as N}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-BuzAFiyo.js";const j={persistentStorageKey:"graph-sandbox"},W=["disabled"],m=$({__name:"ToolbarButton",props:{active:{type:Boolean},disabled:{type:Boolean}},setup(l){return(e,i)=>{const d=F("v-icon");return v(),h("button",{disabled:e.disabled,class:B(["text-white","p-2","rounded-md",e.disabled?"text-opacity-50":"",e.disabled?"":"hover:bg-gray-900",e.disabled?"cursor-not-allowed":"cursor-pointer",e.active?"bg-gray-900":"bg-gray-800"])},[r(d,null,{default:n(()=>[w(e.$slots,"default")]),_:3})],10,W)}}}),X={},Y={class:"w-[1px] h-6 bg-white bg-opacity-20 mx-1"};function J(l,e){return v(),h("div",Y)}const A=x(X,[["render",J]]),Q={},Z={class:"flex items-center relative"};function ee(l,e){return v(),h("div",Z,[w(l.$slots,"default")])}const E=x(Q,[["render",ee]]),oe={class:"text-white text-opacity-60 text-sm"},te=$({__name:"ToolbarHint",props:{tutorial:{}},setup(l){return(e,i)=>(v(),D(q,{tutorial:e.tutorial},{default:n(({hint:d})=>[c("h5",oe,L(d),1)]),_:1},8,["tutorial"]))}}),re={class:"flex items-center gap-2 bg-gray-800 py-1 px-1 rounded-lg"},se=$({__name:"IslandToolbar",props:{graph:{}},setup(l){const e=l,i=K(e.graph,[{dismiss:"onNodeAdded",hint:"Double click on the canvas to add a node."},{dismiss:"onEdgeAdded",hint:"Hover node to show anchors, drag between them to add an edge."}]);i.start();const d=()=>{e.graph.bulkRemoveNode([...e.graph.focusedItemIds.value]),e.graph.bulkRemoveEdge([...e.graph.focusedItemIds.value])};return(t,o)=>(v(),h(k,null,[c("div",re,[r(E,null,{default:n(()=>[r(m,{onClick:o[0]||(o[0]=u=>t.graph.settings.value.displayEdgeLabels=!0),active:t.graph.settings.value.displayEdgeLabels},{default:n(()=>o[6]||(o[6]=[f(" mdi-label-outline ")])),_:1},8,["active"]),r(A),r(m,{onClick:o[1]||(o[1]=u=>t.graph.settings.value.displayEdgeLabels=!1),active:!t.graph.settings.value.displayEdgeLabels},{default:n(()=>o[7]||(o[7]=[f(" mdi-label-off-outline ")])),_:1},8,["active"])]),_:1}),r(E,null,{default:n(()=>[r(m,{onClick:o[2]||(o[2]=u=>t.graph.settings.value.userAddedEdgeType="directed"),active:t.graph.settings.value.userAddedEdgeType==="directed"},{default:n(()=>o[8]||(o[8]=[f(" mdi-arrow-right-thin ")])),_:1},8,["active"]),r(A),r(m,{onClick:o[3]||(o[3]=u=>t.graph.settings.value.userAddedEdgeType="undirected"),active:t.graph.settings.value.userAddedEdgeType==="undirected"},{default:n(()=>o[9]||(o[9]=[f(" mdi-minus ")])),_:1},8,["active"])]),_:1}),r(E,null,{default:n(()=>[r(m,{onClick:o[4]||(o[4]=u=>t.graph.undo()),disabled:!t.graph.canUndo.value},{default:n(()=>o[10]||(o[10]=[f(" mdi-undo ")])),_:1},8,["disabled"]),r(A),r(m,{onClick:o[5]||(o[5]=u=>t.graph.redo()),disabled:!t.graph.canRedo.value},{default:n(()=>o[11]||(o[11]=[f(" mdi-redo ")])),_:1},8,["disabled"])]),_:1}),r(E,null,{default:n(()=>[r(m,{onClick:d,disabled:t.graph.focusedItemIds.value.size===0},{default:n(()=>o[12]||(o[12]=[f(" mdi-eraser ")])),_:1},8,["disabled"])]),_:1}),r(E,null,{default:n(()=>[r(m,null,{default:n(()=>o[13]||(o[13]=[f("mdi-account-group")])),_:1})]),_:1})]),r(te,{tutorial:C(i)},null,8,["tutorial"])],64))}}),ae="markup",ne=l=>{const{setTheme:e,removeAllThemes:i}=z(l,ae),d=O("markup-color-map",new Map),t=s=>{if(d.value.get(s.id))return U(l.theme.value.nodeColor,s)},o=s=>{const a=d.value.get(s.id);if(a)return l.isFocused(s.id)?N(a,30):a},u=s=>{const a=d.value.get(s.id);if(a)return l.isFocused(s.id)?N(a,30):a};return{colorize:()=>{e("nodeColor",t),e("nodeBorderColor",o),e("nodeFocusBorderColor",o),e("nodeAnchorColor",o),e("nodeAnchorColorWhenParentFocused",o),e("edgeColor",u),e("marqueeSelectionBoxColor",g.TRANSPARENT),e("marqueeEncapsulatedNodeBoxBorderColor",g.WHITE+"80"),e("marqueeEncapsulatedNodeBoxColor",g.TRANSPARENT)},decolorize:()=>{i()},colorMap:d}},le={key:0,class:"bg-gray-800 p-3 w-60 flex flex-col gap-3 rounded-r-xl"},de={class:"text-white font-bold text-2xl"},ie={class:"flex gap-1"},ue=["onClick"],ce=$({__name:"MarkupMenu",props:{graph:{}},setup(l){const e=l,i=[g.BLUE_600,g.RED_600,g.GREEN_600,g.YELLOW_600],{colorize:d,colorMap:t}=ne(e.graph);d();const o=H(()=>{const s=Array.from(e.graph.focusedItemIds.value);if(s.length===1){const[a]=s,p=e.graph.getNode(a);if(p)return`Node ${p.label}`;const _=e.graph.getEdge(a);if(!_)return"?";const y=e.graph.getNode(_.to),T=e.graph.getNode(_.from),S=_.type==="directed"?"→":"↔";return`Edge ${(T==null?void 0:T.label)??"?"} ${S} ${(y==null?void 0:y.label)??"?"}`}return`${s.length} Nodes & Edges`}),u=()=>{const s=Array.from(e.graph.focusedItemIds.value),a=new Set(s.map(p=>t.value.get(p)));return a.has(void 0)?g.BLACK:a.size>1?g.BLACK:a.values().next().value},b=R(u()),I=s=>{for(const a of e.graph.focusedItemIds.value)t.value.set(a,s);b.value=s};return e.graph.subscribe("onFocusChange",()=>{b.value=u()}),(s,a)=>e.graph.focusedItemIds.value.size>0?(v(),h("div",le,[c("h1",de,L(o.value),1),c("div",null,[c("div",ie,[(v(),h(k,null,P(i,p=>c("button",{onClick:_=>I(p),class:B(["cursor-pointer","rounded-xl","p-1","border-2",b.value===p?"border-white":"border-transparent",b.value===p?"hover:border-white":"hover:border-gray-400"])},[c("div",{class:B(["w-8","h-8","rounded-md",`bg-[${p}]`])},null,2)],10,ue)),64))])])])):V("",!0)}}),pe={class:"absolute top-6 w-full flex flex-col justify-center items-center gap-2"},ge={class:"absolute top-0 w-0 h-full flex items-center"},be=$({__name:"Main",setup(l){const e=R(),i=M(e,{settings:j});return(d,t)=>(v(),h(k,null,[r(G,{onGraphRef:t[0]||(t[0]=o=>e.value=o),graph:C(i)},null,8,["graph"]),c("div",pe,[r(se,{graph:C(i)},null,8,["graph"])]),c("div",ge,[c("div",null,[r(ce,{graph:C(i)},null,8,["graph"])])])],64))}});export{be as default};