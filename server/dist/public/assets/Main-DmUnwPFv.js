import{u as b,_ as h}from"./Graph.vue_vue_type_script_setup_true_lang-CG7EnnjR.js";import{_ as N}from"./SimulationPlaybackControls.vue_vue_type_script_setup_true_lang-D6SDaoXP.js";import{b as E}from"./CollabControls.vue_vue_type_script_setup_true_lang-ZjQXtMWz.js";import{d as v,B as F,o as r,c as p,v as i,w as u,x as f,y as o,z as a,L as S,A as c,a as _,t as x,a7 as A,I as T,f as $,a8 as L,a9 as P,aa as R,ab as I,ac as B,e as k}from"./index-DksC2spm.js";import{_ as d}from"./Button.vue_vue_type_script_setup_true_lang-D_ipOFbs.js";import"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-CQ1wqdWz.js";const G={class:"flex gap-3"},V={key:2,class:"flex gap-3"},H=v({__name:"SourceSinkControls",props:{simControls:{},sourceSink:{}},setup(n){const l=n,e=F(()=>l.simControls.isActive.value);return(s,t)=>(r(),p("div",G,[e.value?(r(),i(d,{key:1,style:f({backgroundColor:o(a).RED_600,color:o(a).WHITE}),onClick:s.simControls.stop},{default:u(()=>t[1]||(t[1]=[c(" Stop Simulation ")])),_:1},8,["style","onClick"])):(r(),i(d,{key:0,onClick:s.simControls.start,style:f({backgroundColor:o(a).BLUE_500,color:o(a).WHITE})},{default:u(()=>t[0]||(t[0]=[c(" Run Flow Simulation ")])),_:1},8,["onClick","style"])),e.value?S("",!0):(r(),p("div",V,[s.sourceSink.cancelSetSourceNode.value?(r(),i(d,{key:1,onClick:s.sourceSink.cancelSetSourceNode.value,style:f({backgroundColor:o(a).RED_500,color:o(a).WHITE})},{default:u(()=>t[3]||(t[3]=[c(" Cancel ")])),_:1},8,["onClick","style"])):(r(),i(d,{key:0,onClick:s.sourceSink.setSourceNode},{default:u(()=>t[2]||(t[2]=[c(" Switch Source ")])),_:1},8,["onClick"])),s.sourceSink.cancelSetSinkNode.value?(r(),i(d,{key:3,onClick:s.sourceSink.cancelSetSinkNode.value,style:f({backgroundColor:o(a).RED_500,color:o(a).WHITE})},{default:u(()=>t[5]||(t[5]=[c(" Cancel ")])),_:1},8,["onClick","style"])):(r(),i(d,{key:2,onClick:s.sourceSink.setSinkNode},{default:u(()=>t[4]||(t[4]=[c(" Switch Sink ")])),_:1},8,["onClick"]))]))]))}}),W={persistent:!0,persistentStorageKey:"network-flow",userAddedEdgeLabel:"5",userAddedEdgeRuleNoSelfLoops:!0,userAddedEdgeRuleOneEdgePerPath:!0,edgeInputToLabel:n=>{const l=Number(n);return!isNaN(l)&&l>=0&&l<100?n:void 0}},z={class:"flex gap-3"},D={class:"font-bold text-xl"},M=v({__name:"FlowProperties",props:{flowProperties:{}},setup(n){return(l,e)=>(r(),p("div",z,[_("span",D," Max Flow: "+x(l.flowProperties.maxFlow??"N/A"),1)]))}}),O=(n,{source:l,sink:e})=>{const{maxFlow:s}=A(n,{source:l,sink:e});return{maxFlow:T(s)}},j={class:"w-full h-full relative"},K={class:"absolute w-full h-full"},U={class:"absolute top-0 p-3"},q={class:"absolute top-0 right-0 p-3 text-white flex gap-3"},J={key:0,class:"absolute bottom-8 w-full flex justify-center items-center p-3"},Q={key:1,class:"absolute right-0 p-3 h-14 flex gap-3 bottom-0"},le=v({__name:"Main",setup(n){const l=$(),e=b(l,{settings:W});e.settings.value.newNodeLabelGetter=L(e);const s=P(e),t=O(e,s),m=R(e,s),{activate:g}=I(e),{stylize:w}=B(e,s);return g(),w(),(X,C)=>(r(),p("div",j,[_("div",K,[k(h,{onGraphRef:C[0]||(C[0]=y=>l.value=y),graph:o(e)},null,8,["graph"])]),_("div",U,[k(H,{sourceSink:o(s),"sim-controls":o(m)},null,8,["sourceSink","sim-controls"])]),_("div",q,[k(M,{"flow-properties":o(t)},null,8,["flow-properties"])]),o(m).isActive.value?(r(),p("div",J,[k(N,{controls:o(m)},null,8,["controls"])])):S("",!0),o(m).isActive.value?S("",!0):(r(),p("div",Q,[k(E,{graph:o(e)},null,8,["graph"])]))]))}});export{le as default};