import{u as T,_ as G}from"./Graph.vue_vue_type_script_setup_true_lang-ByjxfhA-.js";import{_ as S}from"./Button.vue_vue_type_script_setup_true_lang-QM2HECh5.js";import{u as O,_ as w}from"./productBoot-D8_gDlL_.js";import{e as k,o as i,c as d,f as B,F as y,a as l,t as E,X as R,B as o,Y as p,g as I,Z as L,b as _,M as r,N as v,w as C,d as N,E as b}from"./index-DYB8OflK.js";import{_ as A}from"./ProductDropdown.vue_vue_type_script_setup_true_lang-TMS_c62X.js";import"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-DRGxupBk.js";const D=["onClick"],P={class:"text-2xl w-6 text-center font-bold"},$=k({__name:"CostDisplay",props:{graph:{}},setup(g){const t=g,n=e=>t.graph.getTheme("nodeText",e),h=e=>{if(e==="Inf")return o.RED_800;const s=Number(e);return s===1/0||isNaN(s)?o.GRAY_500:s===0?o.GREEN_700:s<3?o.GREEN_500:s<5?o.YELLOW_500:s<7?o.ORANGE_500:s<9?o.RED_400:o.RED_600},f=e=>t.graph.getTheme("nodeBorderColor",e)===p.EXPLORED,m=e=>t.graph.getTheme("nodeBorderColor",e)===p.EXPLORING,u=e=>t.graph.getTheme("nodeBorderColor",e)===p.SOURCE,x=e=>f(e)?p.EXPLORED:m(e)?p.EXPLORING:u(e)?p.SOURCE:t.graph.isFocused(e.id)?t.graph.getTheme("nodeBorderColor",e):o.GRAY_600,a=e=>f(e)?"Explored":m(e)?"Exploring":u(e)?"Source":t.graph.isFocused(e.id)?"Highlighted":"Unexplored";return(e,s)=>(i(!0),d(y,null,B(e.graph.nodes.value,c=>(i(),d("div",{onClick:U=>e.graph.setFocus([c.id]),class:"text-white flex items-center gap-3 p-2 hover:bg-gray-900 cursor-pointer rounded-lg"},[l("span",P,E(c.label),1),s[0]||(s[0]=l("span",{class:"font-bold"},"→",-1)),l("div",{class:"text-lg rounded-lg h-8 w-16 grid place-items-center",style:R({backgroundColor:h(n(c))})},E(n(c)),5),l("div",{class:"text-lg rounded-lg h-8 w-32 grid place-items-center font-bold",style:R({backgroundColor:x(c)})},E(a(c)),5)],8,D))),256))}}),F={persistentStorageKey:"dijkstras",userAddedEdgeRuleNoSelfLoops:!0,userAddedEdgeRuleOneEdgePerPath:!0,edgeInputToLabel:g=>{const t=parseInt(g);if(!(isNaN(t)||t<0))return t.toString()}},X={class:"w-full h-full relative"},V={class:"absolute top-6 left-6"},Y={class:"absolute top-0 right-0 p-3 flex gap-3"},H={key:0,class:"absolute p-3 my-3 top-12 right-0 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl max-h-[calc(100%-1.5rem)] overflow-auto"},M={key:1,class:"absolute bottom-8 w-full flex justify-center items-center p-3"},q=k({__name:"Main",setup(g){const t=I(),n=T(t,{settings:F}),{start:h,stop:f,running:m,simControls:u}=L(n);return O(n),(x,a)=>(i(),d(y,null,[l("div",X,[_(G,{onGraphRef:a[0]||(a[0]=e=>t.value=e),graph:r(n)},null,8,["graph"])]),l("div",V,[_(A)]),l("div",Y,[r(m)?(i(),v(S,{key:1,onClick:r(f),color:r(o).RED_600,"text-color":r(o).WHITE},{default:C(()=>a[2]||(a[2]=[N(" Stop Simulation ")])),_:1},8,["onClick","color","text-color"])):(i(),v(S,{key:0,onClick:r(h)},{default:C(()=>a[1]||(a[1]=[N(" Start Simulation ")])),_:1},8,["onClick"]))]),r(u).isActive.value&&r(n).nodes.value.length>0?(i(),d("div",H,[_($,{graph:r(n)},null,8,["graph"])])):b("",!0),r(u).isActive.value?(i(),d("div",M,[_(w,{controls:r(u)},null,8,["controls"])])):b("",!0)],64))}});export{q as default};