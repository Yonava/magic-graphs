import{P as Y,R as Z,c as _,g as G,u as X}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-BF8QVsLo.js";import{u as P,g as O,C as K,a as ee,T as oe,b as te,_ as se,i as le}from"./Graph.vue_vue_type_script_setup_true_lang-Nyy1gMg2.js";import{T as ne,u as ae,_ as re}from"./TutorialHint.vue_vue_type_script_setup_true_lang-D0Lxntcq.js";import{d as L,o as a,c as d,a as r,q as T,F as x,f as k,s as M,u as U,v as de,b as N,x as ie,t as S,y as C,z as u,e as v,w as ue,A as ce,B as A,C as ge,D as be,E as pe}from"./index-fWF74cCw.js";import{u as me}from"./useAdjacencyList-DECrt7DZ.js";import{_ as W,a as j,b as ve}from"./CollabControls.vue_vue_type_script_setup_true_lang-DEfZVpKy.js";import{_ as he}from"./InputRange.vue_vue_type_script_setup_true_lang-BjvsHrTf.js";import{_ as fe}from"./Button.vue_vue_type_script_setup_true_lang-B-rXJPQE.js";const c={reset:"reset",draggable:"draggable",nodeAnchors:"node-anchors",edgeLabels:"edge-labels",edgeLabelsEditable:"edge-labels-editable",userEditable:"user-editable",edgeType:"edge-type",edgeWeight:"edge-weight",nodeSize:"node-size",storageKey:"storage-key",clearLocalStorage:"clear-local-storage",persistentGraphClone:"persistent-graph-clone",testRoom:"test-room",log:"log",bfsColorize:"toggle-bfs-colorize"},_e=e=>({greeting:{hint:"Welcome to the graph editor tutorial",dismiss:"onClick"},goodbye:{hint:"Have fun editing graphs!",dismiss:"onTimeout",after:3e3},createNode:{hint:"Double click anywhere to add a node",dismiss:"onNodeAdded"},moveNode:{hint:"Drag a node to move it",dismiss:"onNodeDrop"},createEdge:{hint:"Create an edge by dragging an anchor onto another node",dismiss:"onEdgeAdded"},createUndirectedEdge:{hint:"Now create an undirected edge by toggling the edge type",highlightElement:c.edgeType,dismiss:{event:"onEdgeAdded",predicate:o=>o.type==="undirected"}},createSelfDirectedEdge:{hint:'You can even create self directed edges! Make sure you are in "directed" mode and drag an anchor inwards',highlightElement:c.edgeType,dismiss:{event:"onEdgeAdded",predicate:o=>o.to===o.from}},editEdgeWeight:{hint:"Edit the edge weight by clicking on it and typing a number",dismiss:"onEdgeLabelChange"},removeElement:Ee(e)}),Ee=e=>{let o=!1;const t=()=>o=!0,{setTheme:l,removeAllThemes:s}=P(e,ne);return{hint:"Remove an edge or node by clicking on it and hitting backspace/delete",dismiss:{event:"onInterval",predicate:()=>o},onInit:()=>{o=!1,l("nodeAnchorColor",n=>n.label==="1"?Y:Z),e.subscribe("onEdgeRemoved",t),e.subscribe("onNodeRemoved",t)},onDismiss:()=>{s(),e.unsubscribe("onEdgeRemoved",t),e.unsubscribe("onNodeRemoved",t)}}},ye=e=>{const{greeting:o,createNode:t,moveNode:l,createEdge:s,createUndirectedEdge:n,editEdgeWeight:i,removeElement:b,goodbye:m}=_e(e);return[o,t,l,s,n,i,b,m]},Ce=e=>({basics:ye(e)}),Se=e=>ae(e,Ce(e).basics),Le=L({__name:"TutorialControls",props:{tutorial:{}},setup(e){return(o,t)=>(a(),d(x,null,[r("button",{onClick:t[0]||(t[0]=(...l)=>o.tutorial.prevStep&&o.tutorial.prevStep(...l)),class:T("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[4]||(t[4]=[r("span",{class:"select-none"},"Previous Step",-1)])),r("button",{onClick:t[1]||(t[1]=(...l)=>o.tutorial.nextStep&&o.tutorial.nextStep(...l)),class:T("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[5]||(t[5]=[r("span",{class:"select-none"},"Next Step",-1)])),r("button",{onClick:t[2]||(t[2]=(...l)=>o.tutorial.stop&&o.tutorial.stop(...l)),class:T("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[6]||(t[6]=[r("span",{class:"select-none"},"End Tutorial",-1)])),r("button",{onClick:t[3]||(t[3]=(...l)=>o.tutorial.start&&o.tutorial.start(...l)),class:T("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[7]||(t[7]=[r("span",{class:"select-none"},"Restart Tutorial",-1)]))],64))}}),Ae="product/search-visualizer",xe=(e,o)=>{const t=k({}),l=k(o),{adjacencyList:s}=me(e),n=()=>{if(t.value={},!l.value||!s.value[l.value])return;let i=[l.value];const b=new Set(i);let m=0;for(;i.length>0;){const E=[];for(const y of i){t.value[y]=m;for(const h of s.value[y])b.has(h)||(b.add(h),E.push(h))}i=[],i.push(...E),m++}};return e.subscribe("onStructureChange",n),M(()=>e.unsubscribe("onStructureChange",n)),U(l,n),{bfsLevelRecord:de(t),startNode:l}},Re=[_.RED_600,_.ORANGE_600,_.YELLOW_600,_.GREEN_600,_.TEAL_600,_.BLUE_600,_.INDIGO_600,_.PURPLE_600],Te=e=>{var y;const o=k(!1),{setTheme:t,removeTheme:l}=P(e,Ae),{bfsLevelRecord:s,startNode:n}=xe(e,(y=e.nodes.value[0])==null?void 0:y.id),i=()=>{if(n.value===void 0){const[p]=e.nodes.value;p&&(n.value=p.id)}if(!e.nodes.value.find(p=>p.id===n.value)){const[p]=e.nodes.value;n.value=p?p.id:void 0}},b=h=>{if(e.isFocused(h.id))return;const p=s.value[h.id];if(p===void 0)return;const w=Re;return w[p%w.length]},m=()=>{t("nodeBorderColor",b),t("nodeAnchorColor",b),o.value=!0},E=()=>{l("nodeBorderColor"),l("nodeAnchorColor"),o.value=!1};return U(o,()=>{o.value?m():E()}),e.subscribe("onNodeRemoved",i),e.subscribe("onNodeAdded",i),M(()=>{e.unsubscribe("onNodeRemoved",i),e.unsubscribe("onNodeAdded",i)}),{isColorized:o,colorize:m,decolorize:E,toggleColorize:()=>o.value=!o.value,bfsLevelRecord:s,startNode:n}},z=e=>e.charAt(0).toUpperCase()+e.slice(1),V=e=>{const o=e.replace(/([A-Z])/g," $1");return z(o)},Ne=e=>{const o={label:()=>"Reset",action:()=>e.reset(),color:()=>"red",id:c.reset},t={label:()=>e.settings.value.draggable?"Draggable":"Not Draggable",action:()=>e.settings.value.draggable=!e.settings.value.draggable,color:()=>e.settings.value.draggable?"green":"orange",id:c.draggable},l={label:()=>e.settings.value.nodeAnchors?"Anchors":"No Anchors",action:()=>e.settings.value.nodeAnchors=!e.settings.value.nodeAnchors,color:()=>e.settings.value.nodeAnchors?"green":"orange",id:c.nodeAnchors},s={label:()=>e.settings.value.displayEdgeLabels?"Edge Labels":"No Edge Labels",action:()=>e.settings.value.displayEdgeLabels=!e.settings.value.displayEdgeLabels,color:()=>e.settings.value.displayEdgeLabels?"green":"orange",id:c.edgeLabels},n={label:()=>e.settings.value.edgeLabelsEditable?"Edge Labels Editable":"Edge Labels Not Editable",action:()=>e.settings.value.edgeLabelsEditable=!e.settings.value.edgeLabelsEditable,color:()=>e.settings.value.edgeLabelsEditable?"green":"orange",id:c.edgeLabelsEditable},i={label:()=>e.settings.value.userEditable?"Editable":"Not Editable",action:()=>e.settings.value.userEditable=!e.settings.value.userEditable,color:()=>e.settings.value.userEditable?"green":"orange",id:c.userEditable},b={cond:()=>!!e.settings.value.userEditable,label:()=>z(e.settings.value.userAddedEdgeType),action:()=>{e.settings.value.userAddedEdgeType==="directed"?e.settings.value.userAddedEdgeType="undirected":e.settings.value.userAddedEdgeType="directed"},color:()=>{const{userAddedEdgeType:g}=e.settings.value;return g==="directed"?"blue":"purple"},id:c.edgeType},m={cond:()=>!!e.settings.value.userEditable,label:()=>{const{userAddedEdgeLabel:g}=e.settings.value;return`Change Added Edge Weight (${g})`},action:()=>{e.settings.value.userAddedEdgeLabel=G(1,10).toString()},color:()=>"green",id:c.edgeWeight},E={label:()=>`Change Node Size (${e.theme.value.nodeSize})`,action:()=>e.theme.value.nodeSize=G(20,50),color:()=>"pink",id:c.nodeSize},y={label:()=>{const{persistentStorageKey:g}=e.settings.value;return`Change Storage Key (${g})`},action:()=>{const{persistentStorageKey:g}=e.settings.value,f=g==="graph"?"graph2":"graph";e.settings.value.persistentStorageKey=f},color:()=>"blue",id:c.storageKey},h={label:()=>"Clear Local Storage",action:()=>localStorage.clear(),color:()=>"red",id:c.clearLocalStorage},p={label:()=>"Clone Search Visualizer Graph",action:()=>{e.settings.value.persistentStorageKey="search-visualizer-graph"},color:()=>"amber",id:c.persistentGraphClone},w={label:()=>{const{collaborativeRoomId:g,collaboratorCount:f,inCollaborativeRoom:R}=e,$=`Leave ${g.value} Room (${f.value+1} In Room)`;return R.value?$:"Join Test Room"},action:()=>{const g=O(K),f=O(ee);e.meAsACollaborator.value.name=g,e.meAsACollaborator.value.color=f;const{joinCollaborativeRoom:R,leaveCollaborativeRoom:$,inCollaborativeRoom:D}=e;D.value?$():R("Test")},color:()=>e.inCollaborativeRoom.value?"red":"green",id:c.testRoom},H={label:()=>"Log",action:()=>{console.log(JSON.stringify(e.collaborators.value,null,2)),console.log(JSON.stringify(e.collaboratorCount.value,null,2)),console.log(JSON.stringify(e.meAsACollaborator.value,null,2))},color:()=>"blue",id:c.log},{toggleColorize:J,isColorized:I,startNode:Q}=Te(e),B={reset:o,clearLocalStorage:h,changeNodeSize:E,toggleEdgeLabelDisplay:s,toggleEdgeLabelsEditable:n,toggleDraggable:t,toggleNodeAnchors:l,toggleUserEditable:i,toggleEdgeType:b,changeEdgeWeight:m,changeStorageKey:y,persistentGraphClone:p,toggleTestRoom:w,bfsColorize:{label:()=>{const g="Colorize",f=e.getNode(Q.value),R=`Stop Colorizing (${f==null?void 0:f.label})`;return I.value?R:g},color:()=>I.value?"red":"pink",action:J,id:"toggle-bfs-colorize"},log:H},q=Object.values(B);return{...B,btnArr:q}},we=["onClick","id"],ke={class:"select-none"},$e=L({__name:"GraphBtns",props:{btns:{}},setup(e){const o=t=>t?t():!0;return(t,l)=>(a(!0),d(x,null,N(t.btns,s=>(a(),d("div",null,[o(s.cond)?(a(),d("button",{key:0,onClick:ie(s.action,["stop"]),class:T(`bg-${s.color()}-600 text-white px-3 py-1 rounded-lg font-bold`),id:s.id},[r("span",ke,S(s.label()),1)],10,we)):C("",!0)]))),256))}}),Ve={class:"px-4 my-2"},Ue={class:"my-2"},ze={class:"flex flex-wrap gap-3"},Ie=["onClick"],Be={class:"my-2"},De={class:"text-white mb-2"},Ge={class:"font-bold text-lg"},Oe={class:"text-md"},Pe={key:3,class:"text-red-500 font-bold"},Me=L({__name:"ThemeControls",props:{graph:{}},setup(e){return(o,t)=>(a(),d("div",Ve,[t[1]||(t[1]=r("div",null,[r("h2",{class:"text-2xl font-bold text-white"},"Theme Controls")],-1)),r("div",Ue,[t[0]||(t[0]=r("div",{class:"mb-2"},[r("h1",{class:"text-xl font-bold text-white"},"Presets")],-1)),r("div",ze,[(a(!0),d(x,null,N(u(oe),(l,s)=>(a(),d("div",{onClick:n=>o.graph.theme.value=l},[v(fe,{color:l.secondaryColor,"text-color":l.secondaryTextColor,style:{width:"120px","text-align":"center"}},{default:ue(()=>[ce(S(u(V)(s)),1)]),_:2},1032,["color","text-color"])],8,Ie))),256))])]),(a(!0),d(x,null,N(o.graph.theme.value,(l,s)=>(a(),d("div",Be,[r("div",De,[r("h3",Ge,S(u(V)(s)),1),r("h4",Oe,S(l),1)]),typeof l=="string"&&s.toLowerCase().includes("color")?(a(),A(W,{key:0,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="string"?(a(),A(j,{key:1,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="number"?(a(),A(he,{key:2,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n,style:{width:"100%"},min:0,max:100},null,8,["modelValue","onUpdate:modelValue"])):(a(),d("h5",Pe," Not Supported "))]))),256))]))}}),F=L({__name:"InputCheckbox",props:{modelValue:{type:Boolean},modelModifiers:{}},emits:["update:modelValue"],setup(e){const o=ge(e,"modelValue");return(t,l)=>be((a(),d("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>o.value=s),type:"checkbox"},null,512)),[[pe,o.value]])}}),We=["onClick"],je={class:"text-white font-bold"},Fe=L({__name:"GraphPlaygroundControls",props:{playgroundControls:{}},setup(e){return(o,t)=>(a(!0),d(x,null,N(o.playgroundControls,(l,s)=>(a(),d("div",{class:"flex gap-3 items-center pl-3 py-2 hover:bg-gray-800 cursor-pointer",onClick:n=>o.playgroundControls[s]=!o.playgroundControls[s]},[v(F,{modelValue:o.playgroundControls[s],"onUpdate:modelValue":n=>o.playgroundControls[s]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"]),r("h2",je,S(u(z)(s)),1)],8,We))),256))}}),He={class:"my-2 px-4"},Je={class:"text-white mb-2"},Qe={class:"font-bold text-lg"},qe={class:"text-md"},Ye={key:3,class:"text-red-500 font-bold"},Ze=L({__name:"SettingsControls",props:{graph:{}},setup(e){return(o,t)=>(a(!0),d(x,null,N(o.graph.settings.value,(l,s)=>(a(),d("div",He,[r("div",Je,[r("h3",Qe,S(u(V)(s)),1),r("h4",qe,S(l),1)]),typeof l=="string"&&s.toLowerCase().includes("color")?(a(),A(W,{key:0,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="string"?(a(),A(j,{key:1,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="boolean"?(a(),A(F,{key:2,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"])):(a(),d("h5",Ye," Not Supported "))]))),256))}}),Xe={class:"relative w-full h-full"},Ke={class:"w-full h-full absolute"},eo={key:0,class:"absolute flex gap-2 m-2 flex flex-wrap w-[85%]"},oo={key:1,class:"absolute bottom-0 right-0 flex gap-2 h-8 m-2"},to={key:2,class:"bottom-0 absolute flex gap-2 m-2"},so={key:3,class:"absolute w-full dark:text-white bottom-[10%] grid place-items-center pointer-events-none"},lo={class:"absolute h-3/4 top-[100px] right-0"},no={key:0,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl mb-3"},ao={key:1,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl"},ro={class:"absolute w-[150px] top-1/4 overflow-auto bg-gray-800 bg-opacity-80 rounded-r-xl"},fo=L({__name:"GraphPlayground",setup(e){const o=k(),t=te(o,{settings:{edgeInputToLabel:i=>{if(le(i))return i;if(!isNaN(Number(i)))return i}}}),l=Se(t),{btnArr:s}=Ne(t),n=X("graph-playground-controls",{tutorial:!0,theme:!0,settings:!0,collab:!0,buttons:!0});return U(n,()=>{n.value.tutorial?l.start():l.stop()},{immediate:!0,deep:!0}),(i,b)=>(a(),d("div",Xe,[r("div",Ke,[v(se,{onGraphRef:b[0]||(b[0]=m=>o.value=m),graph:u(t)},null,8,["graph"])]),u(n).buttons?(a(),d("div",eo,[v($e,{btns:u(s)},null,8,["btns"])])):C("",!0),u(n).collab?(a(),d("div",oo,[v(ve,{graph:u(t)},null,8,["graph"])])):C("",!0),u(n).tutorial?(a(),d("div",to,[v(Le,{tutorial:u(l)},null,8,["tutorial"])])):C("",!0),u(n).tutorial?(a(),d("div",so,[v(re,{tutorial:u(l)},null,8,["tutorial"])])):C("",!0),r("div",lo,[u(n).theme?(a(),d("div",no,[v(Me,{graph:u(t)},null,8,["graph"])])):C("",!0),u(n).settings?(a(),d("div",ao,[v(Ze,{graph:u(t)},null,8,["graph"])])):C("",!0)]),r("div",ro,[v(Fe,{playgroundControls:u(n)},null,8,["playgroundControls"])])]))}});export{fo as default};