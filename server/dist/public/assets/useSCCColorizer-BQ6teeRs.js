import{d as p,g as h,V as c,E as C,ai as v,o as f,c as z,a4 as T,e as _,t as E,I as x,X as g,z as r,x as N}from"./index-Wvoc3Gvc.js";import{r as u}from"./Graph.vue_vue_type_script_setup_true_lang-C7aWDySR.js";const R=p({__name:"GNode",props:{size:{default:60},node:{}},setup(s){const o=s,e=h(u(c.value.getTheme,o.node)),l=C(()=>Math.round(Math.max(1,Math.log(o.size)))),t=()=>{c.value.focus.set([o.node.id])},d=setInterval(()=>{e.value=u(c.value.getTheme,o.node)},100);return v(()=>{clearInterval(d)}),(n,a)=>(f(),z("div",{onClick:t,class:x(["flex","font-bold","items-center","justify-center","rounded-full","cursor-pointer"]),style:g({color:e.value.nodeTextColor,border:`${l.value}px solid ${e.value.nodeBorderColor}`,backgroundColor:e.value.nodeColor,height:`${n.size}px`,width:`${n.size}px`})},[T(n.$slots,"default",{},()=>[_(E(e.value.nodeText),1)])],4))}}),S="scc-colorizer",m=[r.RED_500,r.BLUE_500,r.GREEN_500,r.YELLOW_500,r.PURPLE_500,r.ORANGE_500],$=(s,o=S)=>{const{setTheme:e,removeAllThemes:l}=N(s,o),t=a=>{if(s.focus.isFocused(a.id))return;const i=s.characteristics.nodeIdToConnectedComponent.value.get(a.id);if(i!==void 0)return m[i%m.length]};return{colorize:()=>{e("nodeBorderColor",t),e("nodeAnchorColor",t)},decolorize:()=>{l()}}};export{R as _,$ as u};